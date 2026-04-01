import { allExercises, Exercise, isExerciseTheme, type ExerciseSource } from "@/data/exercises";
import { sessionTheoryItems } from "@/data/sessionTheory";
import { getOutfieldPlayerCount } from "@/store/sessionStore";
import type { DurationUnit, SessionBlock } from "@/store/sessionStore";

const EXERCISE_CATEGORIES = new Set<Exercise["category"]>([
  "fixed-warmup",
  "warmup",
  "aktivisering",
  "rondo",
  "station",
  "game",
  "cooldown",
]);

const EXERCISE_SOURCES = new Set<ExerciseSource>([
  "egen",
  "tiim",
  "eggen",
  "godfoten",
  "dbu",
  "rondo",
  "hyballa",
  "bangsbo",
  "dugger",
  "drillo",
  "prickett",
  "101youth",
  "seeger",
  "matkovich",
  "worldclass",
  "uefa",
  "manc",
]);
const SESSION_THEORY_IDS = new Set(sessionTheoryItems.map((item) => item.id));

type SharedBlock = {
  id: string;
  planningMode?: "single" | "station";
  sectionStationCount?: number;
  sectionComment?: string;
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
  keeperCount?: number;
  stationCount: number;
  coachNames?: string[];
  selectedExerciseIds: string[];
  selectedTheoryIds?: string[];
  plannedBlocks?: null;
};

type SharedSessionPayloadV2 = {
  version: 2;
  sessionTitle?: string;
  sessionComment?: string;
  playerCount: number;
  keeperCount?: number;
  stationCount: number;
  coachNames?: string[];
  selectedExerciseIds: string[];
  selectedTheoryIds: string[];
  plannedBlocks: SharedBlock[] | null;
};

type SharedSessionPayloadV3 = {
  version: 3;
  sessionTitle?: string;
  sessionComment?: string;
  playerCount: number;
  keeperCount?: number;
  stationCount: number;
  coachNames?: string[];
  selectedExerciseIds: string[];
  selectedTheoryIds: string[];
  plannedBlocks: SharedBlock[] | null;
  sharedExercises?: Exercise[];
};

type SharedSessionPayload = SharedSessionPayloadV1 | SharedSessionPayloadV2 | SharedSessionPayloadV3;

export type SharedSessionData = {
  sessionTitle?: string;
  sessionComment?: string;
  playerCount: number;
  keeperCount: number;
  stationCount: number;
  coachNames: string[];
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  exerciseLibrary: Exercise[];
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

const normalizeStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeOptionalBoolean = (value: unknown) =>
  typeof value === "boolean" ? value : undefined;

const normalizeOptionalNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const isExerciseCategory = (value: unknown): value is Exercise["category"] =>
  typeof value === "string" && EXERCISE_CATEGORIES.has(value as Exercise["category"]);

const isExerciseSource = (value: unknown): value is ExerciseSource =>
  typeof value === "string" && EXERCISE_SOURCES.has(value as ExerciseSource);

const hydrateSharedExercise = (value: unknown): Exercise | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const candidate = value as Record<string, unknown>;
  const id = normalizeOptionalText(candidate.id);
  const name = normalizeOptionalText(candidate.name);
  const category = candidate.category;
  const themeValue = normalizeOptionalText(candidate.theme);
  const exerciseNumber = normalizeOptionalNumber(candidate.exerciseNumber);
  const duration = normalizeOptionalNumber(candidate.duration);
  const playersMin = normalizeOptionalNumber(candidate.playersMin);
  const playersMax = normalizeOptionalNumber(candidate.playersMax);

  if (!id || !name || !isExerciseCategory(category) || !themeValue || !isExerciseTheme(themeValue)) {
    return null;
  }

  if (
    exerciseNumber === undefined ||
    duration === undefined ||
    playersMin === undefined ||
    playersMax === undefined
  ) {
    return null;
  }

  const source = candidate.source;
  if (source !== undefined && !isExerciseSource(source)) {
    return null;
  }

  return {
    id,
    exerciseNumber: Math.max(0, Math.floor(exerciseNumber)),
    name,
    category,
    duration: Math.max(0, Math.floor(duration)),
    playersMin: Math.max(0, Math.floor(playersMin)),
    playersMax: Math.max(0, Math.floor(playersMax)),
    theme: themeValue,
    equipment: normalizeStringArray(candidate.equipment),
    description: normalizeOptionalText(candidate.description) ?? "",
    coachingPoints: normalizeStringArray(candidate.coachingPoints),
    variations: normalizeStringArray(candidate.variations),
    tags: normalizeStringArray(candidate.tags),
    displayName: normalizeOptionalText(candidate.displayName),
    alwaysIncluded: normalizeOptionalBoolean(candidate.alwaysIncluded),
    scalable: normalizeOptionalBoolean(candidate.scalable),
    imageUrl: normalizeOptionalText(candidate.imageUrl),
    svgDiagram: normalizeOptionalText(candidate.svgDiagram),
    source,
    sourceUrl: normalizeOptionalText(candidate.sourceUrl),
    sourceRef: normalizeOptionalText(candidate.sourceRef),
  };
};

const normalizeCoachNames = (names?: Iterable<string>) => {
  const normalized: string[] = [];
  const seen = new Set<string>();

  for (const rawName of names ?? []) {
    if (typeof rawName !== "string") continue;
    const name = rawName.trim();
    if (!name) continue;
    const key = name.toLocaleLowerCase("nb-NO");
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(name);
  }

  return normalized;
};

const normalizeTheoryIds = (ids?: Iterable<string>) => {
  const normalized: string[] = [];
  const seen = new Set<string>();

  for (const value of ids ?? []) {
    const theoryId = normalizeOptionalText(value);
    if (!theoryId || !SESSION_THEORY_IDS.has(theoryId) || seen.has(theoryId)) continue;
    seen.add(theoryId);
    normalized.push(theoryId);
  }

  return normalized;
};

const sortExercises = (exercises: Exercise[]) =>
  [...exercises].sort((a, b) => a.name.localeCompare(b.name, "nb"));

const buildSharedExerciseLibrary = (sharedExercises: Exercise[] = []) => {
  const library = [...allExercises];
  const seenIds = new Set(library.map((exercise) => exercise.id));

  sharedExercises.forEach((exercise) => {
    if (seenIds.has(exercise.id)) return;
    seenIds.add(exercise.id);
    library.push(exercise);
  });

  return sortExercises(library);
};

const collectSharedExercises = ({
  selectedExerciseIds,
  plannedBlocks,
  exerciseLibrary,
}: {
  selectedExerciseIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
  exerciseLibrary?: Exercise[];
}) => {
  if (!exerciseLibrary || exerciseLibrary.length === 0) return [];

  const knownIds = new Set(allExercises.map((exercise) => exercise.id));
  const referencedIds = new Set<string>(selectedExerciseIds);

  plannedBlocks?.forEach((block) => {
    referencedIds.add(block.exercise.id);
    block.alternativeExerciseIds?.forEach((id) => referencedIds.add(id));
  });

  return exerciseLibrary.filter((exercise) => referencedIds.has(exercise.id) && !knownIds.has(exercise.id));
};

const serializePlannedBlocks = (blocks: SessionBlock[] | null): SharedBlock[] | null => {
  if (!blocks || blocks.length === 0) return null;
  return blocks.map(({
    id,
    planningMode,
    sectionStationCount,
    sectionComment,
    stationRoundStart,
    customDuration,
    customUnit,
    customTitle,
    customComment,
    alternativeExerciseIds,
    assignedCoachNames,
  }) => {
    const normalizedAssignedCoachNames = normalizeCoachNames(assignedCoachNames);

    return {
      id,
      planningMode,
      sectionStationCount:
        typeof sectionStationCount === "number" ? Math.max(2, Math.min(4, sectionStationCount)) : undefined,
      sectionComment: normalizeOptionalText(sectionComment),
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
        normalizedAssignedCoachNames.length > 0
          ? normalizedAssignedCoachNames
          : undefined,
    };
  });
};

const hydratePlannedBlocks = (
  blocks: SharedBlock[] | null,
  exerciseLibrary: Exercise[]
): SessionBlock[] | null => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  const hydrated: SessionBlock[] = [];

  blocks.forEach((entry) => {
    const exercise = exerciseLibrary.find((item) => item.id === entry.id);
    if (!exercise) return;

    const alternativeExerciseIds = (entry.alternativeExerciseIds ?? []).filter(
      (id) => id !== exercise.id && exerciseLibrary.some((candidate) => candidate.id === id)
    );
    const assignedCoachNames = normalizeCoachNames(entry.assignedCoachNames);

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
      sectionComment: normalizeOptionalText(entry.sectionComment),
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
        assignedCoachNames.length > 0 ? assignedCoachNames : undefined,
    });
  });

  return hydrated.length > 0 ? hydrated : null;
};

const buildTimeline = (selectedExerciseIds: Set<string>, exerciseLibrary: Exercise[]) => {
  const chosen = exerciseLibrary.filter((exercise) => {
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
  plannedBlocks: SessionBlock[] | null,
  exerciseLibrary: Exercise[]
) => {
  const base = buildTimeline(selectedExerciseIds, exerciseLibrary);
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
        sectionComment: normalizeOptionalText(block.sectionComment),
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
  keeperCount,
  stationCount,
  coachNames,
  selectedExerciseIds,
  selectedTheoryIds,
  plannedBlocks,
  exerciseLibrary,
}: {
  sessionTitle: string;
  sessionComment: string;
  playerCount: number;
  keeperCount: number;
  stationCount: number;
  coachNames: Iterable<string>;
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
  exerciseLibrary?: Exercise[];
}) => {
  const payload: SharedSessionPayloadV3 = {
    version: 3,
    sessionTitle: normalizeOptionalText(sessionTitle),
    sessionComment: normalizeOptionalText(sessionComment),
    playerCount,
    keeperCount,
    stationCount,
    coachNames: normalizeCoachNames(coachNames),
    selectedExerciseIds: [...selectedExerciseIds],
    selectedTheoryIds: normalizeTheoryIds(selectedTheoryIds),
    plannedBlocks: serializePlannedBlocks(plannedBlocks),
    sharedExercises: collectSharedExercises({ selectedExerciseIds, plannedBlocks, exerciseLibrary }),
  };

  return encodeBase64Url(JSON.stringify(payload));
};

export const buildSharedSessionUrl = ({
  origin,
  sessionTitle,
  sessionComment,
  playerCount,
  keeperCount,
  stationCount,
  coachNames,
  selectedExerciseIds,
  selectedTheoryIds,
  plannedBlocks,
  exerciseLibrary,
}: {
  origin: string;
  sessionTitle: string;
  sessionComment: string;
  playerCount: number;
  keeperCount: number;
  stationCount: number;
  coachNames: Iterable<string>;
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
  exerciseLibrary?: Exercise[];
}) => {
  const token = createSharedSessionToken({
    sessionTitle,
    sessionComment,
    playerCount,
    keeperCount,
    stationCount,
    coachNames,
    selectedExerciseIds,
    selectedTheoryIds,
    plannedBlocks,
    exerciseLibrary,
  });

  return `${origin}/okt?s=${encodeURIComponent(token)}`;
};

export const decodeSharedSessionToken = (token: string | null): SharedSessionData | null => {
  if (!token) return null;

  try {
    const parsed = JSON.parse(decodeBase64Url(token)) as Partial<SharedSessionPayload>;
    if (parsed.version !== 1 && parsed.version !== 2 && parsed.version !== 3) return null;
    if (typeof parsed.playerCount !== "number" || typeof parsed.stationCount !== "number") {
      return null;
    }
    const keeperCount =
      typeof parsed.keeperCount === "number"
        ? Math.max(0, Math.min(parsed.playerCount - 1, Math.floor(parsed.keeperCount)))
        : 0;

    const sharedExercises =
      parsed.version === 3 && Array.isArray(parsed.sharedExercises)
        ? parsed.sharedExercises.map(hydrateSharedExercise).filter((exercise): exercise is Exercise => !!exercise)
        : [];

    const exerciseLibrary = buildSharedExerciseLibrary(sharedExercises);

    const selectedExerciseIds = new Set(
      Array.isArray(parsed.selectedExerciseIds)
        ? parsed.selectedExerciseIds.filter(
            (id): id is string =>
              typeof id === "string" && exerciseLibrary.some((exercise) => exercise.id === id)
          )
        : []
    );
    const selectedTheoryIds = new Set(
      normalizeTheoryIds(
        Array.isArray(parsed.selectedTheoryIds)
          ? parsed.selectedTheoryIds
          : undefined
      )
    );

    const plannedBlocks = hydratePlannedBlocks(
      Array.isArray(parsed.plannedBlocks) ? (parsed.plannedBlocks as SharedBlock[]) : null
      , exerciseLibrary
    );
    const coachNames = normalizeCoachNames([
      ...(Array.isArray(parsed.coachNames) ? parsed.coachNames : []),
      ...(plannedBlocks?.flatMap((block) => block.assignedCoachNames ?? []) ?? []),
    ]);

    return {
      sessionTitle: normalizeOptionalText(parsed.sessionTitle),
      sessionComment: normalizeOptionalText(parsed.sessionComment),
      playerCount: parsed.playerCount,
      keeperCount,
      stationCount: parsed.stationCount,
      coachNames,
      selectedExerciseIds,
      selectedTheoryIds,
      exerciseLibrary,
      sessionBlocks: mergeWithPlannedOrder(selectedExerciseIds, plannedBlocks, exerciseLibrary),
    };
  } catch {
    return null;
  }
};
