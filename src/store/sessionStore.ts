import { create } from "zustand";
import { persist, type PersistStorage, type StorageValue } from "zustand/middleware";
import { allExercises, Exercise, ExerciseSource, getExerciseCode, isTiimSituationalExercise } from "@/data/exercises";
import {
  buildTimelineSections,
  getExplicitSectionNumber,
  getStationSectionInfoByNumber,
  getTrailingStationSectionInfo,
  normalizeStationSectionMetadata,
  retuneTrailingStationSectionCount,
} from "./sessionSections";
import {
  getExerciseFitScore,
  getOutfieldPlayerCount,
  getSectionPlayerCounts,
  getWorstExerciseFitScore,
  matchesExercisePlayerCountFilter,
  normalizeKeeperCount,
} from "./sessionPlayerCounts";
import { appendBlockForPlanningSection, getActivePlanningSection } from "./sessionPlanning";
import {
  DEFAULT_COACH_NAMES,
  defaultCoachNames,
  hydratePlannedBlocks,
  hydrateSavedSessions,
  hydrateSet,
  isQuotaExceededError,
  isRecord,
  mergeCoachNames,
  normalizeCoachNames,
  normalizeOptionalText,
  safeJsonParse,
  serializePlannedBlocks,
  serializeSet,
  toSavedSession,
} from "./sessionPersistence";

export { getActivePlanningSection } from "./sessionPlanning";
export {
  getExerciseFitScore,
  getOutfieldPlayerCount,
  getSectionPlayerCounts,
  matchesExercisePlayerCountFilter,
} from "./sessionPlayerCounts";

const normalizeSearchText = (value: string) => value.trim().toLowerCase();

const compactSearchText = (value: string) =>
  normalizeSearchText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

export const matchesExerciseSearchQuery = (exercise: Exercise, searchQuery?: string) => {
  const normalizedSearch = searchQuery ? normalizeSearchText(searchQuery) : "";
  if (!normalizedSearch) return true;

  const compactSearch = compactSearchText(searchQuery ?? "");
  const exerciseCode = getExerciseCode(exercise).toLowerCase();
  const haystackParts = [
    exercise.name,
    exercise.description,
    exercise.theme,
    exercise.tags?.join(" "),
    exercise.equipment?.join(" "),
    exercise.coachingPoints?.join(" "),
    exercise.variations?.join(" "),
    exercise.source,
    exercise.sourceRef,
    exerciseCode,
  ].filter((part): part is string => Boolean(part));

  const haystack = haystackParts.join(" ").toLowerCase();
  if (haystack.includes(normalizedSearch)) return true;
  if (!compactSearch) return false;

  const compactHaystack = haystackParts.map((part) => compactSearchText(part)).join("");
  return compactHaystack.includes(compactSearch);
};

export type DurationUnit = "min" | "reps";
export type PlanningSectionMode = "single" | "stations";
export type PlanningSectionTarget = "auto" | "next-section" | `section-${number}`;

export type SessionBlock = {
  id: string;
  exercise: Exercise;
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

type SerializedBlock = {
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

export type SavedSession = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sessionTitle?: string;
  sessionComment?: string;
  playerCount: number;
  keeperCount?: number;
  stationCount: number;
  coachNames: string[];
  selectedExerciseIds: string[];
  selectedTheoryIds: string[];
  plannedBlocks: SerializedBlock[] | null;
};

type SessionState = {
  customExercises: Exercise[];
  exerciseOverrides: Record<string, Partial<Exercise>>;
  exerciseLibrary: Exercise[];
  savedSessions: SavedSession[];
  activeSavedSessionId: string | null;
  sessionTitle: string;
  sessionComment: string;
  playerCount: number;
  keeperCount: number;
  stationCount: number;
  nextSectionStationCount: number;
  planningSectionMode: PlanningSectionMode;
  planningSectionTarget: PlanningSectionTarget;
  coachNames: string[];
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  favoriteIds: Set<string>;
  searchQuery: string;
  highlightExerciseId: string | null;
  setPlayerCount: (count: number) => void;
  setKeeperCount: (count: number) => void;
  setStationCount: (count: number) => void;
  setPlanningSectionMode: (mode: PlanningSectionMode) => void;
  setPlanningSectionTarget: (target: PlanningSectionTarget) => void;
  setSessionTitle: (title: string) => void;
  setSessionComment: (comment: string) => void;
  addCoachName: (name: string) => void;
  removeCoachName: (name: string) => void;
  setSearchQuery: (query: string) => void;
  setHighlightExercise: (id: string | null) => void;
  setSelectedContent: (exerciseIds: string[], theoryIds: string[]) => void;
  toggleExercise: (id: string) => void;
  toggleTheory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addExercise: (exercise: Exercise) => void;
  addExerciseToPlan: (exercise: Exercise) => void;
  appendExerciseToPlan: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Exercise) => void;
  plannedBlocks: SessionBlock[] | null;
  setPlannedBlocks: (blocks: SessionBlock[]) => void;
  resetPlan: () => void;
  generateSession: () => SessionBlock[];
  saveCurrentSession: (name: string) => { ok: boolean; reason?: string; id?: string };
  loadSavedSession: (id: string) => boolean;
  deleteSavedSession: (id: string) => void;
};

const warmupTarget = 10;
const stationDuration = 12;
const gameTarget = 20;
const cooldownDuration = 1;

const buildTimeline = ({
  selectedExerciseIds,
  exerciseLibrary,
}: {
  selectedExerciseIds: Set<string>;
  exerciseLibrary: Exercise[];
}) => {
  const chosen = exerciseLibrary.filter((ex) => {
    if (ex.category === "fixed-warmup" && ex.alwaysIncluded) {
      return true;
    }
    return selectedExerciseIds.has(ex.id);
  });

  const fixed = chosen.filter((ex) => ex.category === "fixed-warmup");
  const warmups = chosen.filter(
    (ex) => ex.category === "warmup" || ex.category === "aktivisering"
  );
  const rondos = chosen.filter((ex) => ex.category === "rondo");
  const stations = chosen.filter((ex) => ex.category === "station");
  const games = chosen.filter((ex) => ex.category === "game");
  const cooldowns = chosen.filter((ex) => ex.category === "cooldown");

  const timeline: SessionBlock[] = [];
  fixed.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  warmups.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  rondos.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  stations.forEach((exercise) =>
    timeline.push({ id: exercise.id, exercise })
  );

  games.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  cooldowns.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  return timeline;
};

export const deriveSessionBlocks = ({
  selectedExerciseIds,
  exerciseLibrary,
  plannedBlocks,
}: {
  selectedExerciseIds: Set<string>;
  exerciseLibrary: Exercise[];
  plannedBlocks: SessionBlock[] | null;
}): SessionBlock[] => {
  const base = buildTimeline({ selectedExerciseIds, exerciseLibrary });
  return mergePlannedBlockMetadata(base, plannedBlocks);
};

const sortExercises = (exercises: Exercise[]) =>
  [...exercises].sort((a, b) => a.name.localeCompare(b.name, "nb"));

const applyOverrides = (
  exercises: Exercise[],
  overrides: Record<string, Partial<Exercise>>
): Exercise[] =>
  exercises.map((exercise) => {
    const override = overrides[exercise.id];
    if (!override) return exercise;
    return { ...exercise, ...override };
  });

const mergePlannedBlockMetadata = (
  base: SessionBlock[],
  plannedBlocks: SessionBlock[] | null
) => {
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

  return normalizeStationSectionMetadata(merged) ?? merged;
};
const buildExerciseLibrary = (
  custom: Exercise[] = [],
  overrides: Record<string, Partial<Exercise>> = {}
) => sortExercises([...applyOverrides(allExercises, overrides), ...custom]);

const withExerciseNumber = (exercise: Exercise, exerciseLibrary: Exercise[]) => {
  const maxNumber = exerciseLibrary.reduce(
    (max, currentExercise) => Math.max(max, currentExercise.exerciseNumber || 0),
    0
  );

  return {
    ...exercise,
    exerciseNumber: exercise.exerciseNumber || maxNumber + 1,
  };
};

type PersistedSessionState = {
  sessionTitle: string;
  sessionComment: string;
  playerCount: number;
  keeperCount: number;
  stationCount: number;
  nextSectionStationCount: number;
  planningSectionMode: PlanningSectionMode;
  coachNames: string[];
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  favoriteIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
  savedSessions: SavedSession[];
  activeSavedSessionId: string | null;
  searchQuery: string;
  customExercises: Exercise[];
  exerciseOverrides: Record<string, Partial<Exercise>>;
  exerciseLibrary: Exercise[];
};

type PersistedSessionStorageValue = StorageValue<PersistedSessionState>;

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      customExercises: [],
      exerciseOverrides: {},
      exerciseLibrary: buildExerciseLibrary(),
      savedSessions: [],
      activeSavedSessionId: null,
      sessionTitle: "",
      sessionComment: "",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      nextSectionStationCount: 2,
      planningSectionMode: "single",
      planningSectionTarget: "auto",
      coachNames: defaultCoachNames(),
      searchQuery: "",
      highlightExerciseId: null,
      selectedExerciseIds: new Set(),
      selectedTheoryIds: new Set(),
      favoriteIds: new Set(),
      setPlayerCount: (count) =>
        set((state) => ({
          playerCount: count,
          keeperCount: normalizeKeeperCount(count, state.keeperCount),
        })),
      setKeeperCount: (count) =>
        set((state) => ({
          keeperCount: normalizeKeeperCount(state.playerCount, count),
        })),
      setStationCount: (count) =>
        set((state) => {
          const normalizedStationCount = Math.max(2, Math.min(4, count));
          const explicitSectionNumber = getExplicitSectionNumber(
            state.planningSectionTarget
          );

          if (
            state.planningSectionMode !== "stations" ||
            state.planningSectionTarget === "next-section"
          ) {
            return {
              stationCount: normalizedStationCount,
              nextSectionStationCount: normalizedStationCount,
            };
          }

          if (explicitSectionNumber !== null) {
            return {
              stationCount: normalizedStationCount,
              nextSectionStationCount: state.nextSectionStationCount,
              plannedBlocks:
                retuneStationSectionCount(
                  state.plannedBlocks,
                  explicitSectionNumber,
                  normalizedStationCount
                ) ?? state.plannedBlocks,
            };
          }

          return {
            stationCount: normalizedStationCount,
            nextSectionStationCount: state.nextSectionStationCount,
            plannedBlocks:
              retuneTrailingStationSectionCount(
                state.plannedBlocks,
                normalizedStationCount
              ) ?? state.plannedBlocks,
          };
        }),
      setPlanningSectionMode: (mode) => set({ planningSectionMode: mode }),
      setPlanningSectionTarget: (target) =>
        set((state) => {
          const explicitSectionNumber = getExplicitSectionNumber(target);

          if (target === "next-section") {
            return {
              planningSectionTarget: target,
              stationCount: state.nextSectionStationCount,
            };
          }

          if (explicitSectionNumber !== null) {
            const explicitSection = getStationSectionInfoByNumber(
              state.plannedBlocks ?? [],
              explicitSectionNumber
            );

            return {
              planningSectionTarget: target,
              stationCount:
                explicitSection?.requiredCount ?? state.stationCount,
            };
          }

          const currentSectionStationCount = getIncompleteTrailingStationSectionCount(
            state.plannedBlocks
          );

          return {
            planningSectionTarget: target,
            stationCount: currentSectionStationCount ?? state.stationCount,
          };
        }),
      setSessionTitle: (title) => set({ sessionTitle: title }),
      setSessionComment: (comment) => set({ sessionComment: comment }),
      addCoachName: (name) =>
        set((state) => ({
          coachNames: mergeCoachNames(state.coachNames, [name]),
        })),
      removeCoachName: (name) =>
        set((state) => {
          const target = name.trim().toLocaleLowerCase("nb-NO");
          return {
            coachNames: state.coachNames.filter(
              (coachName) => coachName.toLocaleLowerCase("nb-NO") !== target
            ),
            plannedBlocks: state.plannedBlocks?.map((block) => ({
              ...block,
              assignedCoachNames: (block.assignedCoachNames ?? []).filter(
                (coachName) => coachName.toLocaleLowerCase("nb-NO") !== target
              ),
            })),
          };
        }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setHighlightExercise: (id) => set({ highlightExerciseId: id }),
      setSelectedContent: (exerciseIds, theoryIds) =>
        set({
          plannedBlocks: null,
          activeSavedSessionId: null,
          sessionTitle: "",
          sessionComment: "",
          selectedExerciseIds: new Set(exerciseIds),
          selectedTheoryIds: new Set(theoryIds),
          nextSectionStationCount: 2,
          planningSectionTarget: "auto",
          highlightExerciseId: null,
        }),
      toggleExercise: (id) =>
        set((state) => {
          const next = new Set(state.selectedExerciseIds);
          if (next.has(id)) {
            next.delete(id);
            const remainingPlannedBlocks = state.plannedBlocks?.filter(
              (block) => block.id !== id
            );

            return {
              selectedExerciseIds: next,
              plannedBlocks:
                remainingPlannedBlocks && remainingPlannedBlocks.length > 0
                  ? remainingPlannedBlocks
                  : null,
              planningSectionTarget: "auto",
            };
          }

          next.add(id);

          const exercise = state.exerciseLibrary.find((entry) => entry.id === id);
          if (!exercise) {
            return { selectedExerciseIds: next };
          }

          const cleanedPlannedBlocks = state.plannedBlocks?.filter(
            (block) => block.id !== id
          ) ?? null;

          const baseBlocks = deriveSessionBlocks({
            selectedExerciseIds: state.selectedExerciseIds,
            exerciseLibrary: state.exerciseLibrary,
            plannedBlocks: cleanedPlannedBlocks,
          });

          return {
            selectedExerciseIds: next,
            plannedBlocks: appendBlockForPlanningSection({
              blocks: baseBlocks,
              exercise,
              planningSectionMode: state.planningSectionMode,
              stationCount: state.stationCount,
              planningSectionTarget: state.planningSectionTarget,
            }),
            planningSectionTarget: "auto",
          };
        }),
      toggleTheory: (id) =>
        set((state) => {
          const next = new Set(state.selectedTheoryIds);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { selectedTheoryIds: next };
        }),
      toggleFavorite: (id) =>
        set((state) => {
          const next = new Set(state.favoriteIds);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { favoriteIds: next };
        }),
      addExercise: (exercise) =>
        set((state) => {
          const exerciseWithNumber = withExerciseNumber(exercise, state.exerciseLibrary);
          const updatedCustom = sortExercises([
            ...state.customExercises,
            exerciseWithNumber,
          ]);
          return {
            customExercises: updatedCustom,
            exerciseLibrary: buildExerciseLibrary(updatedCustom),
          };
        }),
      addExerciseToPlan: (exercise) =>
        set((state) => {
          const exerciseWithNumber = withExerciseNumber(exercise, state.exerciseLibrary);
          const updatedCustom = sortExercises([
            ...state.customExercises,
            exerciseWithNumber,
          ]);
          const updatedLibrary = buildExerciseLibrary(updatedCustom, state.exerciseOverrides);
          const nextSelectedExerciseIds = new Set(state.selectedExerciseIds);
          nextSelectedExerciseIds.add(exerciseWithNumber.id);

          const baseBlocks = deriveSessionBlocks({
            selectedExerciseIds: state.selectedExerciseIds,
            exerciseLibrary: state.exerciseLibrary,
            plannedBlocks: state.plannedBlocks,
          });

          return {
            customExercises: updatedCustom,
            exerciseLibrary: updatedLibrary,
            selectedExerciseIds: nextSelectedExerciseIds,
            plannedBlocks: appendBlockForPlanningSection({
              blocks: baseBlocks,
              exercise: exerciseWithNumber,
              planningSectionMode: state.planningSectionMode,
              stationCount: state.stationCount,
              planningSectionTarget: state.planningSectionTarget,
            }),
            planningSectionTarget: "auto",
          };
        }),
      appendExerciseToPlan: (exercise) =>
        set((state) => {
          const existingExercise = state.exerciseLibrary.find((entry) => entry.id === exercise.id) ?? exercise;
          const nextSelectedExerciseIds = new Set(state.selectedExerciseIds);
          nextSelectedExerciseIds.add(existingExercise.id);

          const baseBlocks = deriveSessionBlocks({
            selectedExerciseIds: state.selectedExerciseIds,
            exerciseLibrary: state.exerciseLibrary,
            plannedBlocks: state.plannedBlocks,
          });

          if (baseBlocks.some((block) => block.exercise.id === existingExercise.id)) {
            return {
              selectedExerciseIds: nextSelectedExerciseIds,
              planningSectionTarget: "auto",
            };
          }

          return {
            selectedExerciseIds: nextSelectedExerciseIds,
            plannedBlocks: appendBlockForPlanningSection({
              blocks: baseBlocks,
              exercise: existingExercise,
              planningSectionMode: state.planningSectionMode,
              stationCount: state.stationCount,
              planningSectionTarget: state.planningSectionTarget,
            }),
            planningSectionTarget: "auto",
          };
        }),
      updateExercise: (id, updated) =>
        set((state) => {
          const updateList = (list: Exercise[]) =>
            list.map((exercise) => (exercise.id === id ? updated : exercise));

          const isCustom = state.customExercises.some((exercise) => exercise.id === id);

          if (isCustom) {
            const nextCustom = sortExercises(updateList(state.customExercises));
            return {
              customExercises: nextCustom,
              exerciseLibrary: buildExerciseLibrary(nextCustom, state.exerciseOverrides),
            };
          }

          const nextOverrides = {
            ...state.exerciseOverrides,
            [id]: updated,
          };

          return {
            exerciseOverrides: nextOverrides,
            exerciseLibrary: buildExerciseLibrary(state.customExercises, nextOverrides),
          };
        }),
      plannedBlocks: null,
      setPlannedBlocks: (blocks) =>
        set({ plannedBlocks: normalizeStationSectionMetadata(blocks) ?? blocks }),
      resetPlan: () =>
        set({
          plannedBlocks: null,
          activeSavedSessionId: null,
          sessionTitle: "",
          sessionComment: "",
          selectedExerciseIds: new Set(),
          selectedTheoryIds: new Set(),
          nextSectionStationCount: 2,
          planningSectionTarget: "auto",
          searchQuery: "",
          highlightExerciseId: null,
        }),
      generateSession: () => {
        const state = get();
        return deriveSessionBlocks({
          selectedExerciseIds: state.selectedExerciseIds,
          exerciseLibrary: state.exerciseLibrary,
          plannedBlocks: state.plannedBlocks ?? null,
        });
      },
      saveCurrentSession: (name) => {
        const trimmedName = name.trim();
        if (!trimmedName) {
          return { ok: false, reason: "Mangler navn" };
        }

        const state = get();
        const hasPlan = state.selectedExerciseIds.size > 0 || (state.plannedBlocks?.length ?? 0) > 0;
        if (!hasPlan) {
          return { ok: false, reason: "Økten er tom" };
        }

        const now = new Date().toISOString();
        const activeSession = state.activeSavedSessionId
          ? state.savedSessions.find((session) => session.id === state.activeSavedSessionId)
          : undefined;
        const conflictingName = state.savedSessions.find(
          (session) =>
            session.name.toLocaleLowerCase("nb-NO") === trimmedName.toLocaleLowerCase("nb-NO") &&
            session.id !== activeSession?.id
        );
        if (conflictingName) {
          return { ok: false, reason: "Navnet er allerede i bruk" };
        }

        const existing = activeSession ?? state.savedSessions.find(
          (session) => session.name.toLocaleLowerCase("nb-NO") === trimmedName.toLocaleLowerCase("nb-NO")
        );

        const savedSession = toSavedSession({
          id: existing?.id ?? `saved-${Date.now()}`,
          name: trimmedName,
          sessionTitle: state.sessionTitle,
          sessionComment: state.sessionComment,
          playerCount: state.playerCount,
          keeperCount: state.keeperCount,
          stationCount: state.stationCount,
          coachNames: state.coachNames,
          selectedExerciseIds: state.selectedExerciseIds,
          selectedTheoryIds: state.selectedTheoryIds,
          plannedBlocks: state.plannedBlocks,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        });

        const nextSavedSessions = [savedSession, ...state.savedSessions.filter((session) => session.id !== savedSession.id)]
          .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

        set({
          savedSessions: nextSavedSessions,
          activeSavedSessionId: savedSession.id,
        });
        return { ok: true, id: savedSession.id };
      },
      loadSavedSession: (id) => {
        const state = get();
        const saved = state.savedSessions.find((session) => session.id === id);
        if (!saved) return false;

        const selectedExerciseIds = new Set(
          saved.selectedExerciseIds.filter((exerciseId) =>
            state.exerciseLibrary.some((exercise) => exercise.id === exerciseId)
          )
        );
        const coachNames = mergeCoachNames(
          defaultCoachNames(),
          saved.coachNames,
          saved.plannedBlocks?.flatMap((block) => block.assignedCoachNames ?? [])
        );
        const plannedBlocks = hydratePlannedBlocks(saved.plannedBlocks, state.exerciseLibrary, coachNames);

        set({
          sessionTitle: saved.sessionTitle ?? "",
          sessionComment: saved.sessionComment ?? "",
          playerCount: saved.playerCount,
          keeperCount: normalizeKeeperCount(saved.playerCount, saved.keeperCount ?? 0),
          stationCount: saved.stationCount,
          nextSectionStationCount: saved.stationCount,
          planningSectionMode: "single",
          planningSectionTarget: "auto",
          coachNames,
          selectedExerciseIds,
          selectedTheoryIds: new Set(saved.selectedTheoryIds),
          plannedBlocks,
          activeSavedSessionId: saved.id,
          searchQuery: "",
          highlightExerciseId: null,
        });
        return true;
      },
      deleteSavedSession: (id) =>
        set((state) => ({
          savedSessions: state.savedSessions.filter((session) => session.id !== id),
          activeSavedSessionId:
            state.activeSavedSessionId === id ? null : state.activeSavedSessionId,
        })),
    }),
    {
      name: "treninger-session",
      partialize: (state) => ({
        sessionTitle: state.sessionTitle,
        sessionComment: state.sessionComment,
        playerCount: state.playerCount,
        keeperCount: state.keeperCount,
        stationCount: state.stationCount,
        nextSectionStationCount: state.nextSectionStationCount,
        planningSectionMode: state.planningSectionMode,
        coachNames: state.coachNames,
        selectedExerciseIds: state.selectedExerciseIds,
        selectedTheoryIds: state.selectedTheoryIds,
        favoriteIds: state.favoriteIds,
        plannedBlocks: state.plannedBlocks,
        savedSessions: state.savedSessions,
        activeSavedSessionId: state.activeSavedSessionId,
        searchQuery: state.searchQuery,
        customExercises: state.customExercises,
        exerciseOverrides: state.exerciseOverrides,
        exerciseLibrary: state.exerciseLibrary,
      }),
      storage: {
        getItem: (name): PersistedSessionStorageValue | null => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = safeJsonParse(str);
          if (!isRecord(parsed)) return null;

          const version = typeof parsed.version === "number" ? parsed.version : undefined;

          const parsedState = isRecord(parsed.state) ? parsed.state : {};
          const persistedCustom = Array.isArray(parsedState.customExercises)
            ? (parsedState.customExercises as Exercise[])
            : [];

          const persistedOverridesRaw = parsedState.exerciseOverrides;
          const persistedOverrides: Record<string, Partial<Exercise>> =
            persistedOverridesRaw && isRecord(persistedOverridesRaw)
              ? (persistedOverridesRaw as Record<string, Partial<Exercise>>)
              : {};
          const exerciseLibrary = buildExerciseLibrary(persistedCustom, persistedOverrides);
          const coachNames = mergeCoachNames(
            defaultCoachNames(),
            Array.isArray(parsedState.coachNames) ? (parsedState.coachNames as string[]) : []
          );

          // Oppdater plannedBlocks med ferske øvelsesdata
          const hydratedPlannedBlocks = hydratePlannedBlocks(
            parsedState.plannedBlocks,
            exerciseLibrary,
            coachNames
          );

          const playerCount =
            typeof parsedState.playerCount === "number" ? parsedState.playerCount : 12;
          const keeperCount =
            typeof parsedState.keeperCount === "number"
              ? normalizeKeeperCount(playerCount, parsedState.keeperCount)
              : 0;
          const stationCount =
            typeof parsedState.stationCount === "number" ? parsedState.stationCount : 2;
          const nextSectionStationCount =
            typeof parsedState.nextSectionStationCount === "number"
              ? Math.max(2, Math.min(4, parsedState.nextSectionStationCount))
              : stationCount;
          const planningSectionMode =
            parsedState.planningSectionMode === "stations" ? "stations" : "single";
          const sessionTitle =
            typeof parsedState.sessionTitle === "string" ? parsedState.sessionTitle : "";
          const sessionComment =
            typeof parsedState.sessionComment === "string" ? parsedState.sessionComment : "";

          const searchQuery =
            typeof parsedState.searchQuery === "string" ? parsedState.searchQuery : "";

          const selectedExerciseIds = hydrateSet(
            Array.isArray(parsedState.selectedExerciseIds)
              ? (parsedState.selectedExerciseIds as string[])
              : undefined
          );
          const selectedTheoryIds = hydrateSet(
            Array.isArray(parsedState.selectedTheoryIds)
              ? (parsedState.selectedTheoryIds as string[])
              : undefined
          );
          const favoriteIds = hydrateSet(
            Array.isArray(parsedState.favoriteIds)
              ? (parsedState.favoriteIds as string[])
              : undefined
          );
          const savedSessions = hydrateSavedSessions(parsedState.savedSessions, exerciseLibrary);
          const activeSavedSessionId =
            typeof parsedState.activeSavedSessionId === "string" &&
            savedSessions.some((session) => session.id === parsedState.activeSavedSessionId)
              ? parsedState.activeSavedSessionId
              : null;

          return {
            state: {
              exerciseLibrary,
              sessionTitle,
              sessionComment,
              playerCount,
              keeperCount,
              stationCount,
              nextSectionStationCount,
              planningSectionMode,
              coachNames,
              customExercises: persistedCustom,
              exerciseOverrides: persistedOverrides,
              plannedBlocks: hydratedPlannedBlocks,
              savedSessions,
              activeSavedSessionId,
              selectedExerciseIds,
              selectedTheoryIds,
              favoriteIds,
              searchQuery,
            },
            ...(typeof version === "number" ? { version } : {}),
          };
        },
        setItem: (name, value: PersistedSessionStorageValue) => {
          const toStore = {
            state: {
              sessionTitle: value.state.sessionTitle ?? "",
              sessionComment: value.state.sessionComment ?? "",
              playerCount: value.state.playerCount,
              keeperCount: value.state.keeperCount ?? 0,
              stationCount: value.state.stationCount,
              nextSectionStationCount: value.state.nextSectionStationCount ?? value.state.stationCount,
              planningSectionMode: value.state.planningSectionMode ?? "single",
              coachNames: value.state.coachNames ?? defaultCoachNames(),
              plannedBlocks: serializePlannedBlocks(value.state.plannedBlocks),
              savedSessions: value.state.savedSessions ?? [],
              activeSavedSessionId: value.state.activeSavedSessionId ?? null,
              selectedExerciseIds: serializeSet(value.state.selectedExerciseIds),
              selectedTheoryIds: serializeSet(value.state.selectedTheoryIds),
              favoriteIds: serializeSet(value.state.favoriteIds),
              searchQuery: value.state.searchQuery ?? "",
              customExercises: value.state.customExercises ?? [],
              exerciseOverrides: value.state.exerciseOverrides ?? {},
            },
            ...(typeof value.version === "number" ? { version: value.version } : {}),
          };
          try {
            localStorage.setItem(name, JSON.stringify(toStore));
          } catch (error) {
            if (isQuotaExceededError(error)) {
              console.warn(
                "Kunne ikke lagre øktdata: lokal lagring er full. Fjern noen planlagte økter eller tøm nettleserdata.",
                error
              );
            } else {
              console.error("Kunne ikke lagre øktdata", error);
            }
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      } satisfies PersistStorage<PersistedSessionState>,
    }
  )
);

export const recommendedDuration = (block: SessionBlock) => {
  if (typeof block.customDuration === "number") {
    return block.customDuration;
  }
  if (block.exercise.id === "skudd-generic") {
    return block.exercise.duration;
  }
  if (block.exercise.category === "cooldown" && block.exercise.theme === "styrke") {
    return block.exercise.duration;
  }
  if (
    (block.exercise.category === "warmup" || block.exercise.category === "aktivisering") &&
    !block.exercise.alwaysIncluded
  ) {
    return warmupTarget;
  }
  if (block.exercise.category === "rondo") {
    return stationDuration;
  }
  if (block.exercise.category === "station") {
    return stationDuration;
  }
  if (block.exercise.category === "game") {
    return gameTarget;
  }
  if (block.exercise.category === "cooldown") {
    return cooldownDuration;
  }
  return block.exercise.duration;
};

const getIncompleteTrailingStationSectionCount = (blocks: SessionBlock[] | null) => {
  if (!blocks || blocks.length === 0) return null;

  const trailingSection = getTrailingStationSectionInfo(blocks);
  if (!trailingSection || trailingSection.count >= trailingSection.requiredCount) {
    return null;
  }

  return trailingSection.requiredCount;
};

const retuneStationSectionCount = (
  blocks: SessionBlock[] | null,
  sectionNumber: number,
  stationCount: number
) => {
  if (!blocks || blocks.length === 0) return blocks;

  const section = getStationSectionInfoByNumber(blocks, sectionNumber);
  if (!section) return blocks;

  const normalizedStationCount = Math.max(2, Math.min(4, stationCount));

  return normalizeStationSectionMetadata(
    blocks.map((block, index) => {
      if (index < section.startIndex || index > section.endIndex) return block;

      return {
        ...block,
        planningMode: "station",
        sectionStationCount: normalizedStationCount,
      };
    })
  );
};

export const getUnit = (block: SessionBlock): DurationUnit => {
  if (block.customUnit) {
    return block.customUnit;
  }
  if (block.exercise.id === "skudd-generic") {
    return "min";
  }
  if (block.exercise.category === "cooldown" && block.exercise.theme === "styrke") {
    return "min";
  }
  // Standard: cooldown bruker reps, alt annet bruker min
  return block.exercise.category === "cooldown" ? "reps" : "min";
};

export const filterAndGroupExercises = ({
  exerciseLibrary,
  playerCount,
  keeperCount = 0,
  stationCount,
  planningSectionMode,
  favoriteIds,
  favoritesOnly,
  theme,
  tags,
  sourceFilter,
  filterByPlayerCount,
  searchQuery,
  categories,
}: {
  exerciseLibrary: Exercise[];
  playerCount: number;
  keeperCount?: number;
  stationCount?: number;
  planningSectionMode?: PlanningSectionMode;
  favoriteIds?: Set<string>;
  favoritesOnly?: boolean;
  theme?: string | string[];
  tags?: string[];
  sourceFilter?: ExerciseSource | "egen" | "tiim-situasjon" | Array<ExerciseSource | "egen" | "tiim-situasjon"> | null;
  filterByPlayerCount?: boolean;
  searchQuery?: string;
  categories: Set<string>;
}): Record<string, Exercise[]> => {
  const outfieldPlayerCount = getOutfieldPlayerCount(playerCount, keeperCount);
  const playersPerStation =
    stationCount && stationCount > 0
      ? Math.floor(outfieldPlayerCount / stationCount)
      : outfieldPlayerCount;
  const sectionPlayerCounts = planningSectionMode
    ? getSectionPlayerCounts(playerCount, planningSectionMode, stationCount ?? 2, keeperCount)
    : undefined;
  const activeThemes = Array.isArray(theme) ? theme : theme ? [theme] : [];
  const activeTags = tags ?? [];
  const activeSourceFilters = Array.isArray(sourceFilter)
    ? sourceFilter
    : sourceFilter
      ? [sourceFilter]
      : [];

  const grouped: Record<string, Exercise[]> = {};

  const matchesSource = (exercise: Exercise) => {
    if (activeSourceFilters.length === 0) return true;
    const exerciseSource = exercise.source || "egen";
    return activeSourceFilters.some((filter) => {
      if (filter === "egen") {
        return !exercise.source;
      }
      if (filter === "tiim-situasjon") {
        return isTiimSituationalExercise(exercise);
      }
      return exerciseSource === filter;
    });
  };

  const matchesPlayerCount = (exercise: Exercise) => {
    if (!filterByPlayerCount) return true;
    return matchesExercisePlayerCountFilter(
      exercise,
      playerCount,
      playersPerStation,
      sectionPlayerCounts,
      keeperCount
    );
  };

  const matchesFavorites = (exercise: Exercise) => {
    if (!favoritesOnly) return true;
    return favoriteIds?.has(exercise.id) ?? false;
  };

  const matchesTags = (exercise: Exercise) => {
    if (activeTags.length === 0) return true;
    if (!exercise.tags || exercise.tags.length === 0) return false;
    return activeTags.every((tag) => exercise.tags?.includes(tag));
  };

  for (const exercise of exerciseLibrary) {
    const effectiveCategory =
      exercise.category === "aktivisering" ? "warmup" : exercise.category;
    if (!categories.has(effectiveCategory)) continue;
    if (activeThemes.length > 0 && !activeThemes.includes(exercise.theme)) continue;
    if (!matchesTags(exercise)) continue;
    if (!matchesFavorites(exercise)) continue;
    if (!matchesSource(exercise)) continue;
    if (!matchesPlayerCount(exercise)) continue;
    if (!matchesExerciseSearchQuery(exercise, searchQuery)) continue;

    (grouped[effectiveCategory] ??= []).push(exercise);
  }

  for (const category of categories) {
    const list = grouped[category];
    if (!list) continue;
    list.sort((a, b) => {
      // 1. Favoritter først
      const aFav = favoriteIds?.has(a.id) ? 0 : 1;
      const bFav = favoriteIds?.has(b.id) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;

      // 2. Sorter etter hvor godt øvelsen passer
      const aScore = getWorstExerciseFitScore(a, playerCount, sectionPlayerCounts, keeperCount);
      const bScore = getWorstExerciseFitScore(b, playerCount, sectionPlayerCounts, keeperCount);
      if (aScore !== bScore) return aScore - bScore;

      // 3. Alfabetisk
      return a.name.localeCompare(b.name, "nb");
    });
  }

  return grouped;
};
