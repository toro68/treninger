import { allExercises, isExerciseTheme, type Exercise, type ExerciseSource } from "@/data/exercises";
import { sessionTheoryItems } from "@/data/sessionTheory";

import { normalizeKeeperCount } from "./sessionPlayerCounts";
import { normalizeStationSectionMetadata } from "./sessionSections";
import type { DurationUnit, SavedSession, SessionBlock } from "./sessionStore";

export const DEFAULT_COACH_NAMES = [
  "Tor Inge",
  "Tor Harald",
  "Dawid",
  "Rune",
  "John Arne",
] as const;

export const serializeSet = (value?: Set<string>) => Array.from(value ?? new Set<string>());

export const hydrateSet = (value?: string[] | Set<string>) => {
  if (!value) return new Set<string>();
  if (value instanceof Set) return value;
  return new Set(value);
};

export const normalizeCoachNames = (names?: Iterable<string>) => {
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

export const normalizeOptionalText = (value: unknown) => {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized ? normalized : undefined;
};

export const defaultCoachNames = () => normalizeCoachNames(DEFAULT_COACH_NAMES);

export const mergeCoachNames = (...groups: Array<Iterable<string> | undefined>) =>
  normalizeCoachNames(groups.flatMap((group) => (group ? [...group] : [])));

export const safeJsonParse = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

const BUILTIN_EXERCISE_IDS = new Set(allExercises.map((exercise) => exercise.id));
const SESSION_THEORY_IDS = new Set(sessionTheoryItems.map((item) => item.id));
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
  "staal",
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

const normalizeStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (typeof item !== "string") return [];
    const normalized = item.trim();
    return normalized ? [normalized] : [];
  });
};

const normalizeTrimmedText = (value: unknown) =>
  typeof value === "string" ? value.trim() : undefined;

const normalizeFiniteNumber = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const normalizeInteger = (value: unknown, minimum = 0) => {
  const number = normalizeFiniteNumber(value);
  return number === undefined ? undefined : Math.max(minimum, Math.floor(number));
};

const normalizeBoolean = (value: unknown) =>
  typeof value === "boolean" ? value : undefined;

const isExerciseCategory = (value: unknown): value is Exercise["category"] =>
  typeof value === "string" && EXERCISE_CATEGORIES.has(value as Exercise["category"]);

const isExerciseSource = (value: unknown): value is ExerciseSource =>
  typeof value === "string" && EXERCISE_SOURCES.has(value as ExerciseSource);

const sanitizePersistedExercise = (value: unknown): Exercise | null => {
  if (!isRecord(value)) return null;

  const id = normalizeOptionalText(value.id);
  const name = normalizeOptionalText(value.name);
  const theme = normalizeOptionalText(value.theme);
  const exerciseNumber = normalizeInteger(value.exerciseNumber, 0);
  const duration = normalizeInteger(value.duration, 0);
  const playersMin = normalizeInteger(value.playersMin, 1);
  const playersMaxValue = normalizeInteger(value.playersMax, 1);

  if (
    !id ||
    !name ||
    !isExerciseCategory(value.category) ||
    !theme ||
    !isExerciseTheme(theme) ||
    exerciseNumber === undefined ||
    duration === undefined ||
    playersMin === undefined ||
    playersMaxValue === undefined
  ) {
    return null;
  }

  if (value.source !== undefined && !isExerciseSource(value.source)) {
    return null;
  }

  return {
    id,
    exerciseNumber,
    name,
    displayName: normalizeOptionalText(value.displayName),
    tags: normalizeStringArray(value.tags),
    category: value.category,
    duration,
    playersMin,
    playersMax: Math.max(playersMin, playersMaxValue),
    theme,
    equipment: normalizeStringArray(value.equipment),
    description: normalizeTrimmedText(value.description) ?? "",
    coachingPoints: normalizeStringArray(value.coachingPoints),
    variations: normalizeStringArray(value.variations),
    alwaysIncluded: normalizeBoolean(value.alwaysIncluded),
    scalable: normalizeBoolean(value.scalable),
    imageUrl: normalizeOptionalText(value.imageUrl),
    svgDiagram: normalizeOptionalText(value.svgDiagram),
    source: value.source,
    sourceUrl: normalizeOptionalText(value.sourceUrl),
    sourceRef: normalizeOptionalText(value.sourceRef),
  };
};

const sanitizePersistedExerciseOverride = (
  value: unknown,
  baseExercise: Exercise
): Partial<Exercise> => {
  if (!isRecord(value)) return {};

  const override: Partial<Exercise> = {};
  const name = normalizeOptionalText(value.name);
  const displayName = normalizeOptionalText(value.displayName);
  const theme = normalizeOptionalText(value.theme);
  const exerciseNumber = normalizeInteger(value.exerciseNumber, 0);
  const duration = normalizeInteger(value.duration, 0);
  const playersMin = normalizeInteger(value.playersMin, 1);
  const playersMax = normalizeInteger(value.playersMax, 1);
  const alwaysIncluded = normalizeBoolean(value.alwaysIncluded);
  const scalable = normalizeBoolean(value.scalable);
  const imageUrl = normalizeOptionalText(value.imageUrl);
  const svgDiagram = normalizeOptionalText(value.svgDiagram);
  const sourceUrl = normalizeOptionalText(value.sourceUrl);
  const sourceRef = normalizeOptionalText(value.sourceRef);

  if (name) override.name = name;
  if (displayName !== undefined) override.displayName = displayName;
  if (Array.isArray(value.tags)) override.tags = normalizeStringArray(value.tags);
  if (isExerciseCategory(value.category)) override.category = value.category;
  if (exerciseNumber !== undefined) override.exerciseNumber = exerciseNumber;
  if (duration !== undefined) override.duration = duration;
  if (playersMin !== undefined) {
    override.playersMin = Math.min(playersMin, playersMax ?? baseExercise.playersMax);
  }
  if (playersMax !== undefined) {
    override.playersMax = Math.max(playersMax, playersMin ?? baseExercise.playersMin);
  }
  if (theme && isExerciseTheme(theme)) override.theme = theme;
  if (Array.isArray(value.equipment)) override.equipment = normalizeStringArray(value.equipment);
  if (typeof value.description === "string") override.description = value.description.trim();
  if (Array.isArray(value.coachingPoints)) {
    override.coachingPoints = normalizeStringArray(value.coachingPoints);
  }
  if (Array.isArray(value.variations)) override.variations = normalizeStringArray(value.variations);
  if (alwaysIncluded !== undefined) override.alwaysIncluded = alwaysIncluded;
  if (scalable !== undefined) override.scalable = scalable;
  if (imageUrl !== undefined) override.imageUrl = imageUrl;
  if (svgDiagram !== undefined) override.svgDiagram = svgDiagram;
  if (value.source !== undefined && isExerciseSource(value.source)) override.source = value.source;
  if (sourceUrl !== undefined) override.sourceUrl = sourceUrl;
  if (sourceRef !== undefined) override.sourceRef = sourceRef;

  return override;
};

export const sanitizePersistedCustomExercises = (value: unknown): Exercise[] => {
  if (!Array.isArray(value)) return [];

  const seenIds = new Set<string>();
  const sanitized: Exercise[] = [];

  value.forEach((entry) => {
    const exercise = sanitizePersistedExercise(entry);
    if (!exercise) return;
    if (BUILTIN_EXERCISE_IDS.has(exercise.id) || seenIds.has(exercise.id)) return;
    seenIds.add(exercise.id);
    sanitized.push(exercise);
  });

  return sanitized;
};

export const sanitizePersistedExerciseOverrides = (value: unknown): Record<string, Partial<Exercise>> => {
  if (!isRecord(value)) return {};

  const sanitized: Record<string, Partial<Exercise>> = {};

  Object.entries(value).forEach(([id, overrideValue]) => {
    if (!BUILTIN_EXERCISE_IDS.has(id)) return;

    const baseExercise = allExercises.find((exercise) => exercise.id === id);
    if (!baseExercise) return;

    const override = sanitizePersistedExerciseOverride(overrideValue, baseExercise);
    if (Object.keys(override).length === 0) return;
    sanitized[id] = override;
  });

  return sanitized;
};

export const sanitizeExerciseIds = (
  ids: Iterable<string> | undefined,
  exerciseLibrary: Exercise[]
) => {
  const allowedIds = new Set(exerciseLibrary.map((exercise) => exercise.id));
  const sanitized: string[] = [];
  const seenIds = new Set<string>();

  for (const value of ids ?? []) {
    if (typeof value !== "string") continue;
    const id = value.trim();
    if (!id || !allowedIds.has(id) || seenIds.has(id)) continue;
    seenIds.add(id);
    sanitized.push(id);
  }

  return sanitized;
};

export const sanitizeTheoryIds = (ids?: Iterable<string>) => {
  const sanitized: string[] = [];
  const seenIds = new Set<string>();

  for (const value of ids ?? []) {
    if (typeof value !== "string") continue;
    const id = value.trim();
    if (!id || !SESSION_THEORY_IDS.has(id) || seenIds.has(id)) continue;
    seenIds.add(id);
    sanitized.push(id);
  }

  return sanitized;
};

const ensureDurationUnit = (unit?: unknown): DurationUnit | undefined => {
  if (unit === "min" || unit === "reps") return unit;
  return undefined;
};

const ensureAlternativeExerciseIds = (
  ids: unknown,
  exerciseLibrary: Exercise[],
  currentExerciseId?: string
) => {
  if (!Array.isArray(ids)) return undefined;

  const nextIds = ids.filter(
    (id): id is string =>
      typeof id === "string" &&
      id !== currentExerciseId &&
      exerciseLibrary.some((exercise) => exercise.id === id)
  );

  return nextIds.length > 0 ? nextIds : undefined;
};

const ensureAssignedCoachNames = (
  names: unknown,
  coachNames?: Iterable<string>
) => {
  const normalized = normalizeCoachNames(Array.isArray(names) ? names : []);
  if (!coachNames) return normalized.length > 0 ? normalized : undefined;

  const allowed = new Set(
    normalizeCoachNames(coachNames).map((name) => name.toLocaleLowerCase("nb-NO"))
  );
  const filtered = normalized.filter((name) => allowed.has(name.toLocaleLowerCase("nb-NO")));
  return filtered.length > 0 ? filtered : undefined;
};

export const serializePlannedBlocks = (blocks?: SessionBlock[] | null) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

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
  }) => ({
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
      Array.isArray(assignedCoachNames) && assignedCoachNames.length > 0
        ? normalizeCoachNames(assignedCoachNames)
        : undefined,
  }));
};

export const toSavedSession = ({
  id,
  name,
  sessionTitle,
  sessionComment,
  playerCount,
  keeperCount,
  stationCount,
  coachNames,
  selectedExerciseIds,
  selectedTheoryIds,
  plannedBlocks,
  createdAt,
  updatedAt,
}: {
  id: string;
  name: string;
  sessionTitle: string;
  sessionComment: string;
  playerCount: number;
  keeperCount: number;
  stationCount: number;
  coachNames: string[];
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
  createdAt: string;
  updatedAt: string;
}): SavedSession => ({
  id,
  name,
  sessionTitle: normalizeOptionalText(sessionTitle),
  sessionComment: normalizeOptionalText(sessionComment),
  playerCount,
  keeperCount,
  stationCount,
  coachNames: normalizeCoachNames(coachNames),
  selectedExerciseIds: serializeSet(selectedExerciseIds),
  selectedTheoryIds: serializeSet(selectedTheoryIds),
  plannedBlocks: serializePlannedBlocks(plannedBlocks),
  createdAt,
  updatedAt,
});

export const hydratePlannedBlocks = (
  value: unknown,
  exerciseLibrary: Exercise[],
  coachNames?: Iterable<string>
): SessionBlock[] | null => {
  if (!Array.isArray(value)) return null;

  const hydrated: SessionBlock[] = [];

  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;

    if ("id" in entry && typeof entry.id === "string") {
      const exercise = exerciseLibrary.find((candidate) => candidate.id === entry.id);
      if (!exercise) return;

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
        customUnit: ensureDurationUnit(entry.customUnit),
        customTitle: normalizeOptionalText(entry.customTitle),
        customComment: normalizeOptionalText(entry.customComment),
        alternativeExerciseIds: ensureAlternativeExerciseIds(
          entry.alternativeExerciseIds,
          exerciseLibrary,
          exercise.id
        ),
        assignedCoachNames: ensureAssignedCoachNames(entry.assignedCoachNames, coachNames),
      });
      return;
    }

    if (!("exercise" in entry) || !entry.exercise || typeof entry.exercise !== "object") {
      return;
    }

    const exerciseId = "id" in entry.exercise && typeof entry.exercise.id === "string"
      ? entry.exercise.id
      : undefined;
    if (!exerciseId) return;

    const exercise = exerciseLibrary.find((candidate) => candidate.id === exerciseId);
    if (!exercise) return;

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
      customUnit: ensureDurationUnit(entry.customUnit),
      customTitle: normalizeOptionalText(entry.customTitle),
      customComment: normalizeOptionalText(entry.customComment),
      alternativeExerciseIds: ensureAlternativeExerciseIds(
        entry.alternativeExerciseIds,
        exerciseLibrary,
        exercise.id
      ),
      assignedCoachNames: ensureAssignedCoachNames(entry.assignedCoachNames, coachNames),
    });
  });

  if (hydrated.length === 0) return null;
  return normalizeStationSectionMetadata(hydrated) ?? hydrated;
};

export const hydrateSavedSessions = (
  value: unknown,
  exerciseLibrary: Exercise[]
): SavedSession[] => {
  if (!Array.isArray(value)) return [];

  return value
    .flatMap((entry) => {
      if (!isRecord(entry)) return [];

      const id =
        typeof entry.id === "string"
          ? entry.id.trim()
          : typeof entry.id === "number" && Number.isFinite(entry.id)
            ? `saved-${entry.id}`
            : typeof entry.createdAt === "string" && entry.createdAt.trim()
              ? `saved-${entry.createdAt.trim()}`
              : "";
      const name =
        typeof entry.name === "string" && entry.name.trim()
          ? entry.name.trim()
          : normalizeOptionalText(entry.sessionTitle) ?? "";
      if (!id || !name) return [];

      const coachNames = mergeCoachNames(
        defaultCoachNames(),
        Array.isArray(entry.coachNames) ? entry.coachNames : [],
        Array.isArray(entry.plannedBlocks)
          ? entry.plannedBlocks.flatMap((block) =>
              isRecord(block) && Array.isArray(block.assignedCoachNames)
                ? block.assignedCoachNames
                : []
            )
          : []
      );
      const plannedBlocks = hydratePlannedBlocks(entry.plannedBlocks, exerciseLibrary, coachNames);
      const selectedExerciseIdsFromEntry = sanitizeExerciseIds(
        Array.isArray(entry.selectedExerciseIds) ? entry.selectedExerciseIds : undefined,
        exerciseLibrary
      );
      const selectedExerciseIds = Array.from(
        new Set(
          selectedExerciseIdsFromEntry.length > 0
            ? selectedExerciseIdsFromEntry
            : (plannedBlocks?.map((block) => block.id) ?? [])
        )
      );
      const selectedTheoryIds = sanitizeTheoryIds(
        Array.isArray(entry.selectedTheoryIds) ? entry.selectedTheoryIds : undefined
      );

      return [{
        id,
        name,
        sessionTitle: normalizeOptionalText(entry.sessionTitle),
        sessionComment: normalizeOptionalText(entry.sessionComment),
        createdAt: typeof entry.createdAt === "string" ? entry.createdAt : new Date().toISOString(),
        updatedAt: typeof entry.updatedAt === "string" ? entry.updatedAt : new Date().toISOString(),
        playerCount: typeof entry.playerCount === "number" ? entry.playerCount : 12,
        keeperCount:
          typeof entry.keeperCount === "number"
            ? normalizeKeeperCount(
                typeof entry.playerCount === "number" ? entry.playerCount : 12,
                entry.keeperCount
              )
            : 0,
        stationCount: typeof entry.stationCount === "number" ? entry.stationCount : 3,
        coachNames,
        selectedExerciseIds,
        selectedTheoryIds,
        plannedBlocks: plannedBlocks ? serializePlannedBlocks(plannedBlocks) : null,
      }];
    })
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
};

export const isQuotaExceededError = (error: unknown) => {
  if (typeof window === "undefined") return false;
  return (
    error instanceof DOMException &&
    (error.name === "QuotaExceededError" || error.code === 22 || error.code === 1014)
  );
};
