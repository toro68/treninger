import type { Exercise } from "@/data/exercises";

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
      const selectedExerciseIdsFromEntry = Array.isArray(entry.selectedExerciseIds)
        ? entry.selectedExerciseIds.filter(
            (exerciseId): exerciseId is string =>
              typeof exerciseId === "string" &&
              exerciseLibrary.some((exercise) => exercise.id === exerciseId)
          )
        : [];
      const selectedExerciseIds = Array.from(
        new Set(
          selectedExerciseIdsFromEntry.length > 0
            ? selectedExerciseIdsFromEntry
            : (plannedBlocks?.map((block) => block.id) ?? [])
        )
      );
      const selectedTheoryIds = Array.isArray(entry.selectedTheoryIds)
        ? entry.selectedTheoryIds.filter(
            (theoryId): theoryId is string => typeof theoryId === "string"
          )
        : [];

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