import { allExercises, Exercise } from "@/data/exercises";
import type { DurationUnit, SessionBlock } from "@/store/sessionStore";

type SharedBlock = {
  id: string;
  customDuration?: number;
  customUnit?: DurationUnit;
  alternativeExerciseIds?: string[];
};

type SharedSessionPayload = {
  version: 1;
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: string[];
  selectedTheoryIds: string[];
  plannedBlocks: SharedBlock[] | null;
};

export type SharedSessionData = {
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

const serializePlannedBlocks = (blocks: SessionBlock[] | null): SharedBlock[] | null => {
  if (!blocks || blocks.length === 0) return null;
  return blocks.map(({ id, customDuration, customUnit, alternativeExerciseIds }) => ({
    id,
    customDuration,
    customUnit,
    alternativeExerciseIds:
      Array.isArray(alternativeExerciseIds) && alternativeExerciseIds.length > 0
        ? alternativeExerciseIds
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
      customDuration:
        typeof entry.customDuration === "number" ? entry.customDuration : undefined,
      customUnit:
        entry.customUnit === "min" || entry.customUnit === "reps"
          ? entry.customUnit
          : undefined,
      alternativeExerciseIds:
        alternativeExerciseIds.length > 0 ? alternativeExerciseIds : undefined,
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
  if (!plannedBlocks) return base;

  const baseIds = new Set(base.map((block) => block.id));
  const plannedIds = new Set(plannedBlocks.map((block) => block.id));

  if (baseIds.size !== plannedIds.size) return base;
  if (![...baseIds].every((id) => plannedIds.has(id))) return base;

  return plannedBlocks;
};

export const createSharedSessionToken = ({
  playerCount,
  stationCount,
  selectedExerciseIds,
  selectedTheoryIds,
  plannedBlocks,
}: {
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
}) => {
  const payload: SharedSessionPayload = {
    version: 1,
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
  playerCount,
  stationCount,
  selectedExerciseIds,
  selectedTheoryIds,
  plannedBlocks,
}: {
  origin: string;
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
}) => {
  const token = createSharedSessionToken({
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
    if (parsed.version !== 1) return null;
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
