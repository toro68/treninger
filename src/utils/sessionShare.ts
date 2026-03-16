import { allExercises, Exercise } from "@/data/exercises";
import type { DurationUnit, SessionBlock } from "@/store/sessionStore";

type SharedBlock = {
  id: string;
  planningMode?: "single" | "station";
  sectionStationCount?: number;
  stationRoundStart?: boolean;
  customDuration?: number;
  customUnit?: DurationUnit;
  customTitle?: string;
  customComment?: string;
  alternativeExerciseIds?: string[];
  assignedCoachNames?: string[];
};

type SharedSessionPayloadV1 = {
  version: 1;
  sessionTitle?: string;
  sessionComment?: string;
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: string[];
  selectedTheoryIds?: string[];
  plannedBlocks?: null;
};

type SharedSessionPayloadV2 = {
  version: 2;
  sessionTitle?: string;
  sessionComment?: string;
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: string[];
  selectedTheoryIds: string[];
  plannedBlocks: SharedBlock[] | null;
};

type SharedSessionPayload = SharedSessionPayloadV1 | SharedSessionPayloadV2;

export type SharedSessionData = {
  sessionTitle?: string;
  sessionComment?: string;
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  sessionBlocks: SessionBlock[];
};

const toBase64Url = (value: string) =>
  value.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

const fromBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
};

const encodeBase64Url = (value: string) => {
  if (typeof window === "undefined" && typeof Buffer !== "undefined") {
    return toBase64Url(Buffer.from(value, "utf8").toString("base64"));
  }

  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return toBase64Url(btoa(binary));
};

const decodeBase64Url = (value: string) => {
  const padded = fromBase64Url(value);

  if (typeof window === "undefined" && typeof Buffer !== "undefined") {
    return Buffer.from(padded, "base64").toString("utf8");
  }

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const normalizeOptionalText = (value: unknown) => {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized ? normalized : undefined;
};

const serializePlannedBlocks = (blocks: SessionBlock[] | null): SharedBlock[] | null => {
  if (!blocks || blocks.length === 0) return null;
  return blocks.map(({
    id,
    planningMode,
    sectionStationCount,
    stationRoundStart,
    customDuration,
    customUnit,
    customTitle,
    customComment,
    alternativeExerciseIds,
    assignedCoachNames,
  }) => ({
    id,
    planningMode,
    sectionStationCount:
      typeof sectionStationCount === "number" ? Math.max(2, Math.min(4, sectionStationCount)) : undefined,
    stationRoundStart: stationRoundStart === true ? true : undefined,
    customDuration,
    customUnit,
    customTitle: normalizeOptionalText(customTitle),
    customComment: normalizeOptionalText(customComment),
    alternativeExerciseIds:
      Array.isArray(alternativeExerciseIds) && alternativeExerciseIds.length > 0
        ? alternativeExerciseIds
        : undefined,
    assignedCoachNames:
      Array.isArray(assignedCoachNames) && assignedCoachNames.length > 0
        ? assignedCoachNames
        : undefined,
  }));
};

const hydratePlannedBlocks = (blocks: SharedBlock[] | null): SessionBlock[] | null => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  const hydrated: SessionBlock[] = [];

  blocks.forEach((entry) => {
    const exercise = allExercises.find((item) => item.id === entry.id);
    if (!exercise) return;

    const alternativeExerciseIds = (entry.alternativeExerciseIds ?? []).filter(
      (id) => id !== exercise.id && allExercises.some((candidate) => candidate.id === id)
    );

    hydrated.push({
      id: exercise.id,
      exercise,
      planningMode:
        entry.planningMode === "single" || entry.planningMode === "station"
          ? entry.planningMode
          : undefined,
      sectionStationCount:
        typeof entry.sectionStationCount === "number"
          ? Math.max(2, Math.min(4, entry.sectionStationCount))
          : undefined,
      stationRoundStart: entry.stationRoundStart === true ? true : undefined,
      customDuration:
        typeof entry.customDuration === "number" ? entry.customDuration : undefined,
      customUnit:
        entry.customUnit === "min" || entry.customUnit === "reps"
          ? entry.customUnit
          : undefined,
      customTitle: normalizeOptionalText(entry.customTitle),
      customComment: normalizeOptionalText(entry.customComment),
      alternativeExerciseIds:
        alternativeExerciseIds.length > 0 ? alternativeExerciseIds : undefined,
      assignedCoachNames:
        Array.isArray(entry.assignedCoachNames) && entry.assignedCoachNames.length > 0
          ? entry.assignedCoachNames
          : undefined,
    });
  });

  return hydrated.length > 0 ? hydrated : null;
};

const buildTimeline = (selectedExerciseIds: Set<string>) => {
  const chosen = allExercises.filter((exercise) => {
    if (exercise.category === "fixed-warmup" && exercise.alwaysIncluded) {
      return true;
    }
    return selectedExerciseIds.has(exercise.id);
  });

  const categories: Array<Exercise["category"]> = [
    "fixed-warmup",
    "warmup",
    "aktivisering",
    "rondo",
    "station",
    "game",
    "cooldown",
  ];

  return categories.flatMap((category) =>
    chosen
      .filter((exercise) => exercise.category === category)
      .map((exercise) => ({ id: exercise.id, exercise }))
  );
};

const mergeWithPlannedOrder = (
  selectedExerciseIds: Set<string>,
  plannedBlocks: SessionBlock[] | null
) => {
  const base = buildTimeline(selectedExerciseIds);
  if (!plannedBlocks || plannedBlocks.length === 0) return base;

  const baseMap = new Map(base.map((block) => [block.id, block]));
  const plannedMap = new Map(plannedBlocks.map((block) => [block.id, block]));

  const merged: SessionBlock[] = plannedBlocks
    .filter((block) => baseMap.has(block.id))
    .map((block) => {
      const current = baseMap.get(block.id)!;
      return {
        ...current,
        planningMode: block.planningMode,
        sectionStationCount: block.sectionStationCount,
        stationRoundStart: block.stationRoundStart,
        customDuration: block.customDuration,
        customUnit: block.customUnit,
        customTitle: normalizeOptionalText(block.customTitle),
        customComment: normalizeOptionalText(block.customComment),
        alternativeExerciseIds: block.alternativeExerciseIds,
        assignedCoachNames: block.assignedCoachNames,
      };
    });

  base.forEach((block) => {
    if (!plannedMap.has(block.id)) {
      merged.push(block);
    }
  });

  return merged;
};

export const createSharedSessionToken = ({
  sessionTitle,
  sessionComment,
  playerCount,
  stationCount,
  selectedExerciseIds,
  selectedTheoryIds,
  plannedBlocks,
}: {
  sessionTitle: string;
  sessionComment: string;
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
}) => {
  const payload: SharedSessionPayloadV2 = {
    version: 2,
    sessionTitle: normalizeOptionalText(sessionTitle),
    sessionComment: normalizeOptionalText(sessionComment),
    playerCount,
    stationCount,
    selectedExerciseIds: [...selectedExerciseIds],
    selectedTheoryIds: [...selectedTheoryIds],
    plannedBlocks: serializePlannedBlocks(plannedBlocks),
  };

  return encodeBase64Url(JSON.stringify(payload));
};

export const buildSharedSessionUrl = ({
  origin,
  sessionTitle,
  sessionComment,
  playerCount,
  stationCount,
  selectedExerciseIds,
  selectedTheoryIds,
  plannedBlocks,
}: {
  origin: string;
  sessionTitle: string;
  sessionComment: string;
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
}) => {
  const token = createSharedSessionToken({
    sessionTitle,
    sessionComment,
    playerCount,
    stationCount,
    selectedExerciseIds,
    selectedTheoryIds,
    plannedBlocks,
  });

  return `${origin}/okt?s=${encodeURIComponent(token)}`;
};

export const decodeSharedSessionToken = (token: string | null): SharedSessionData | null => {
  if (!token) return null;

  try {
    const parsed = JSON.parse(decodeBase64Url(token)) as Partial<SharedSessionPayload>;
    if (parsed.version !== 1 && parsed.version !== 2) return null;
    if (typeof parsed.playerCount !== "number" || typeof parsed.stationCount !== "number") {
      return null;
    }

    const selectedExerciseIds = new Set(
      Array.isArray(parsed.selectedExerciseIds)
        ? parsed.selectedExerciseIds.filter(
            (id): id is string =>
              typeof id === "string" && allExercises.some((exercise) => exercise.id === id)
          )
        : []
    );
    const selectedTheoryIds = new Set(
      Array.isArray(parsed.selectedTheoryIds)
        ? parsed.selectedTheoryIds.filter((id): id is string => typeof id === "string")
        : []
    );

    const plannedBlocks = hydratePlannedBlocks(
      Array.isArray(parsed.plannedBlocks) ? (parsed.plannedBlocks as SharedBlock[]) : null
    );

    return {
      sessionTitle: normalizeOptionalText(parsed.sessionTitle),
      sessionComment: normalizeOptionalText(parsed.sessionComment),
      playerCount: parsed.playerCount,
      stationCount: parsed.stationCount,
      selectedExerciseIds,
      selectedTheoryIds,
      sessionBlocks: mergeWithPlannedOrder(selectedExerciseIds, plannedBlocks),
    };
  } catch {
    return null;
  }
};
