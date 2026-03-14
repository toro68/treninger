import { create } from "zustand";
import { persist, type PersistStorage, type StorageValue } from "zustand/middleware";
import { allExercises, Exercise, ExerciseSource, getExerciseCode } from "@/data/exercises";

export type DurationUnit = "min" | "reps";

export const DEFAULT_COACH_NAMES = [
  "Tor Inge",
  "Tor Harald",
  "Dawid",
  "Rune",
  "John Arne",
] as const;

export type SessionBlock = {
  id: string;
  exercise: Exercise;
  customDuration?: number;
  customUnit?: DurationUnit;
  alternativeExerciseIds?: string[];
  assignedCoachNames?: string[];
};

type SerializedBlock = {
  id: string;
  customDuration?: number;
  customUnit?: DurationUnit;
  alternativeExerciseIds?: string[];
  assignedCoachNames?: string[];
};

export type SavedSession = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  playerCount: number;
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
  playerCount: number;
  stationCount: number;
  coachNames: string[];
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  favoriteIds: Set<string>;
  searchQuery: string;
  highlightExerciseId: string | null;
  setPlayerCount: (count: number) => void;
  setStationCount: (count: number) => void;
  addCoachName: (name: string) => void;
  removeCoachName: (name: string) => void;
  setSearchQuery: (query: string) => void;
  setHighlightExercise: (id: string | null) => void;
  toggleExercise: (id: string) => void;
  toggleTheory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addExercise: (exercise: Exercise) => void;
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
        customDuration: block.customDuration,
        customUnit: block.customUnit,
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
const buildExerciseLibrary = (
  custom: Exercise[] = [],
  overrides: Record<string, Partial<Exercise>> = {}
) => sortExercises([...applyOverrides(allExercises, overrides), ...custom]);

const serializeSet = (value?: Set<string>) => Array.from(value ?? new Set<string>());
const hydrateSet = (value?: string[] | Set<string>) => {
  if (!value) return new Set<string>();
  if (value instanceof Set) return value;
  return new Set(value);
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

const defaultCoachNames = () => normalizeCoachNames(DEFAULT_COACH_NAMES);

const mergeCoachNames = (...groups: Array<Iterable<string> | undefined>) =>
  normalizeCoachNames(groups.flatMap((group) => (group ? [...group] : [])));

const safeJsonParse = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

type PersistedSessionState = {
  playerCount: number;
  stationCount: number;
  coachNames: string[];
  selectedExerciseIds: Set<string>;
  selectedTheoryIds: Set<string>;
  favoriteIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
  savedSessions: SavedSession[];
  searchQuery: string;
  customExercises: Exercise[];
  exerciseOverrides: Record<string, Partial<Exercise>>;
  exerciseLibrary: Exercise[];
};

type PersistedSessionStorageValue = StorageValue<PersistedSessionState>;

const serializePlannedBlocks = (blocks?: SessionBlock[] | null): SerializedBlock[] | null => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return blocks.map(({ id, customDuration, customUnit, alternativeExerciseIds, assignedCoachNames }) => ({
    id,
    customDuration,
    customUnit,
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

const toSavedSession = ({
  id,
  name,
  playerCount,
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
  playerCount: number;
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
  playerCount,
  stationCount,
  coachNames: normalizeCoachNames(coachNames),
  selectedExerciseIds: serializeSet(selectedExerciseIds),
  selectedTheoryIds: serializeSet(selectedTheoryIds),
  plannedBlocks: serializePlannedBlocks(plannedBlocks),
  createdAt,
  updatedAt,
});

const hydrateSavedSessions = (
  value: unknown,
  exerciseLibrary: Exercise[]
): SavedSession[] => {
  if (!Array.isArray(value)) return [];

  return value
    .flatMap((entry) => {
      if (!isRecord(entry)) return [];
      const id = typeof entry.id === "string" ? entry.id : "";
      const name = typeof entry.name === "string" ? entry.name.trim() : "";
      if (!id || !name) return [];

      const selectedExerciseIds = Array.isArray(entry.selectedExerciseIds)
        ? entry.selectedExerciseIds.filter(
            (exerciseId): exerciseId is string =>
              typeof exerciseId === "string" && exerciseLibrary.some((exercise) => exercise.id === exerciseId)
          )
        : [];
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
      const selectedTheoryIds = Array.isArray(entry.selectedTheoryIds)
        ? entry.selectedTheoryIds.filter(
            (theoryId): theoryId is string => typeof theoryId === "string"
          )
        : [];

      return [
        {
          id,
          name,
          createdAt: typeof entry.createdAt === "string" ? entry.createdAt : new Date().toISOString(),
          updatedAt: typeof entry.updatedAt === "string" ? entry.updatedAt : new Date().toISOString(),
          playerCount: typeof entry.playerCount === "number" ? entry.playerCount : 12,
          stationCount: typeof entry.stationCount === "number" ? entry.stationCount : 3,
          coachNames,
          selectedExerciseIds,
          selectedTheoryIds,
          plannedBlocks: hydratePlannedBlocks(entry.plannedBlocks, exerciseLibrary, coachNames)
            ? serializePlannedBlocks(hydratePlannedBlocks(entry.plannedBlocks, exerciseLibrary, coachNames))
            : null,
        },
      ];
    })
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
};

const hydratePlannedBlocks = (
  value: unknown,
  exerciseLibrary: Exercise[],
  coachNames?: Iterable<string>
): SessionBlock[] | null => {
  if (!value) return null;
  const ensureUnit = (unit?: unknown): DurationUnit | undefined => {
    if (unit === "min" || unit === "reps") return unit;
    return undefined;
  };
  const ensureAlternativeExerciseIds = (ids?: unknown, currentExerciseId?: string) => {
    if (!Array.isArray(ids)) return undefined;
    const nextIds = ids.filter(
      (id): id is string =>
        typeof id === "string" &&
        id !== currentExerciseId &&
        exerciseLibrary.some((exercise) => exercise.id === id)
    );
    return nextIds.length > 0 ? nextIds : undefined;
  };
  const ensureAssignedCoachNames = (names?: unknown) => {
    const normalized = normalizeCoachNames(Array.isArray(names) ? names : []);
    if (!coachNames) return normalized.length > 0 ? normalized : undefined;
    const allowed = new Set(
      normalizeCoachNames(coachNames).map((name) => name.toLocaleLowerCase("nb-NO"))
    );
    const filtered = normalized.filter((name) =>
      allowed.has(name.toLocaleLowerCase("nb-NO"))
    );
    return filtered.length > 0 ? filtered : undefined;
  };

  if (Array.isArray(value)) {
    const hydrated: SessionBlock[] = [];
    value.forEach((entry) => {
      if (!entry) return;
      if (typeof entry === "object" && "id" in entry && typeof entry.id === "string") {
        const exercise = exerciseLibrary.find((ex) => ex.id === entry.id);
        if (!exercise) return;
        hydrated.push({
          id: exercise.id,
          exercise,
          customDuration:
            typeof (entry as SerializedBlock).customDuration === "number"
              ? (entry as SerializedBlock).customDuration
              : undefined,
          customUnit: ensureUnit((entry as SerializedBlock).customUnit),
          alternativeExerciseIds: ensureAlternativeExerciseIds(
            (entry as SerializedBlock).alternativeExerciseIds,
            exercise.id
          ),
          assignedCoachNames: ensureAssignedCoachNames(
            (entry as SerializedBlock).assignedCoachNames
          ),
        });
      } else if (
        typeof entry === "object" &&
        "exercise" in entry &&
        (entry as SessionBlock).exercise
      ) {
        const exercise = exerciseLibrary.find(
          (ex) => ex.id === (entry as SessionBlock).exercise.id
        );
        if (!exercise) return;
        hydrated.push({
          id: exercise.id,
          exercise,
          customDuration:
            typeof (entry as SessionBlock).customDuration === "number"
              ? (entry as SessionBlock).customDuration
              : undefined,
          customUnit: ensureUnit((entry as SessionBlock).customUnit),
          alternativeExerciseIds: ensureAlternativeExerciseIds(
            (entry as SessionBlock).alternativeExerciseIds,
            exercise.id
          ),
          assignedCoachNames: ensureAssignedCoachNames(
            (entry as SessionBlock).assignedCoachNames
          ),
        });
      }
    });
    return hydrated.length > 0 ? hydrated : null;
  }

  return null;
};

const isQuotaExceededError = (error: unknown) => {
  if (typeof window === "undefined") return false;
  return (
    error instanceof DOMException &&
    (error.name === "QuotaExceededError" || error.code === 22 || error.code === 1014)
  );
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      customExercises: [],
      exerciseOverrides: {},
      exerciseLibrary: buildExerciseLibrary(),
      savedSessions: [],
      playerCount: 12,
      stationCount: 3,
      coachNames: defaultCoachNames(),
      searchQuery: "",
      highlightExerciseId: null,
      selectedExerciseIds: new Set(),
      selectedTheoryIds: new Set(),
      favoriteIds: new Set(),
      setPlayerCount: (count) => set({ playerCount: count }),
      setStationCount: (count) => set({ stationCount: count }),
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
      toggleExercise: (id) =>
        set((state) => {
          const next = new Set(state.selectedExerciseIds);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { selectedExerciseIds: next };
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
          const maxNumber = state.exerciseLibrary.reduce(
            (max, ex) => Math.max(max, ex.exerciseNumber || 0),
            0
          );
          const exerciseWithNumber = {
            ...exercise,
            exerciseNumber: exercise.exerciseNumber || maxNumber + 1,
          };
          const updatedCustom = sortExercises([
            ...state.customExercises,
            exerciseWithNumber,
          ]);
          return {
            customExercises: updatedCustom,
            exerciseLibrary: buildExerciseLibrary(updatedCustom),
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
      setPlannedBlocks: (blocks) => set({ plannedBlocks: blocks }),
      resetPlan: () =>
        set({
          plannedBlocks: null,
          selectedExerciseIds: new Set(),
          selectedTheoryIds: new Set(),
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
        const existing = state.savedSessions.find(
          (session) => session.name.toLocaleLowerCase("nb-NO") === trimmedName.toLocaleLowerCase("nb-NO")
        );

        const savedSession = toSavedSession({
          id: existing?.id ?? `saved-${Date.now()}`,
          name: trimmedName,
          playerCount: state.playerCount,
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

        set({ savedSessions: nextSavedSessions });
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
          playerCount: saved.playerCount,
          stationCount: saved.stationCount,
          coachNames,
          selectedExerciseIds,
          selectedTheoryIds: new Set(saved.selectedTheoryIds),
          plannedBlocks,
          searchQuery: "",
          highlightExerciseId: null,
        });
        return true;
      },
      deleteSavedSession: (id) =>
        set((state) => ({
          savedSessions: state.savedSessions.filter((session) => session.id !== id),
        })),
    }),
    {
      name: "treninger-session",
      partialize: (state) => ({
        playerCount: state.playerCount,
        stationCount: state.stationCount,
        coachNames: state.coachNames,
        selectedExerciseIds: state.selectedExerciseIds,
        selectedTheoryIds: state.selectedTheoryIds,
        favoriteIds: state.favoriteIds,
        plannedBlocks: state.plannedBlocks,
        savedSessions: state.savedSessions,
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
          const stationCount =
            typeof parsedState.stationCount === "number" ? parsedState.stationCount : 3;

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

          return {
            state: {
              exerciseLibrary,
              playerCount,
              stationCount,
              coachNames,
              customExercises: persistedCustom,
              exerciseOverrides: persistedOverrides,
              plannedBlocks: hydratedPlannedBlocks,
              savedSessions,
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
              playerCount: value.state.playerCount,
              stationCount: value.state.stationCount,
              coachNames: value.state.coachNames ?? defaultCoachNames(),
              plannedBlocks: serializePlannedBlocks(value.state.plannedBlocks),
              savedSessions: value.state.savedSessions ?? [],
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

export const getUnit = (block: SessionBlock): DurationUnit => {
  if (block.customUnit) {
    return block.customUnit;
  }
  if (block.exercise.category === "cooldown" && block.exercise.theme === "styrke") {
    return "min";
  }
  // Standard: cooldown bruker reps, alt annet bruker min
  return block.exercise.category === "cooldown" ? "reps" : "min";
};

// Hjelpefunksjon: Sjekker om et tall går opp i et annet (divisor match)
const isDivisorMatch = (total: number, groupSize: number): boolean => {
  return total % groupSize === 0;
};

// Hjelpefunksjon: Beregner hvor godt en øvelse passer til antallet
// Returnerer: 0 = perfekt match, 1 = nesten (1-2 rest), 2 = passer ikke
export const getExerciseFitScore = (
  exercise: Exercise,
  playerCount: number,
  playersPerStation?: number
): number => {
  const targetCount = playersPerStation ?? playerCount;
  
  if (exercise.scalable) {
    // For skalerbare øvelser, sjekk om gruppestørrelsen går opp
    const groupSize = exercise.playersMin; // Gruppestørrelse (f.eks. 2 for 1v1)
    if (isDivisorMatch(targetCount, groupSize)) {
      return 0; // Perfekt match
    }
    const remainder = targetCount % groupSize;
    if (remainder <= 2 || (groupSize - remainder) <= 2) {
      return 1; // Nesten (1-2 spillere til overs)
    }
    return 2; // Passer ikke så bra
  } else {
    // For ikke-skalerbare øvelser, sjekk om antallet er innenfor min/max
    if (targetCount >= exercise.playersMin && targetCount <= exercise.playersMax) {
      return 0; // Passer
    }
    // Sjekk hvor langt unna vi er
    const diff = Math.min(
      Math.abs(targetCount - exercise.playersMin),
      Math.abs(targetCount - exercise.playersMax)
    );
    if (diff <= 2) {
      return 1; // Nesten
    }
    return 2; // Passer ikke
  }
};


export const filterAndGroupExercises = ({
  exerciseLibrary,
  playerCount,
  stationCount,
  favoriteIds,
  theme,
  sourceFilter,
  filterByPlayerCount,
  searchQuery,
  categories,
}: {
  exerciseLibrary: Exercise[];
  playerCount: number;
  stationCount?: number;
  favoriteIds?: Set<string>;
  theme?: string;
  sourceFilter?: ExerciseSource | "egen" | null;
  filterByPlayerCount?: boolean;
  searchQuery?: string;
  categories: Set<string>;
}): Record<string, Exercise[]> => {
  const playersPerStation =
    stationCount && stationCount > 0 ? Math.floor(playerCount / stationCount) : playerCount;
  const normalizedSearch = searchQuery?.trim().toLowerCase();

  const grouped: Record<string, Exercise[]> = {};

  const getRelevantPlayerCount = (exercise: Exercise) =>
    exercise.category === "station" || exercise.category === "rondo"
      ? playersPerStation
      : playerCount;

  const matchesSearch = (exercise: Exercise) => {
    if (!normalizedSearch) return true;
    const exerciseCode = getExerciseCode(exercise).toLowerCase();
    const haystack = [
      exercise.name,
      exercise.description,
      exercise.theme,
      exercise.equipment?.join(" "),
      exercise.coachingPoints?.join(" "),
      exercise.variations?.join(" "),
      exercise.source,
      exerciseCode,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedSearch);
  };

  const matchesSource = (exercise: Exercise) => {
    if (sourceFilter === null || sourceFilter === undefined) return true;
    const exerciseSource = exercise.source || "egen";
    if (sourceFilter === "egen") {
      // "Egne" skal fortsatt bety interne øvelser og K.T. Eggen-sporet.
      return !exercise.source || exercise.source === "eggen";
    }
    return exerciseSource === sourceFilter;
  };

  const matchesPlayerCount = (exercise: Exercise) => {
    if (!filterByPlayerCount) return true;
    const relevantPlayerCount = getRelevantPlayerCount(exercise);
    return relevantPlayerCount >= exercise.playersMin && relevantPlayerCount <= exercise.playersMax;
  };

  for (const exercise of exerciseLibrary) {
    const effectiveCategory =
      exercise.category === "aktivisering" ? "warmup" : exercise.category;
    if (!categories.has(effectiveCategory)) continue;
    if (theme && exercise.theme !== theme) continue;
    if (!matchesSource(exercise)) continue;
    if (!matchesPlayerCount(exercise)) continue;
    if (!matchesSearch(exercise)) continue;

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
      const aRelevantPlayers =
        category === "station" || category === "rondo" ? playersPerStation : undefined;
      const bRelevantPlayers =
        category === "station" || category === "rondo" ? playersPerStation : undefined;
      const aScore = getExerciseFitScore(a, playerCount, aRelevantPlayers);
      const bScore = getExerciseFitScore(b, playerCount, bRelevantPlayers);
      if (aScore !== bScore) return aScore - bScore;

      // 3. Alfabetisk
      return a.name.localeCompare(b.name, "nb");
    });
  }

  return grouped;
};
