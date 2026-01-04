import { create } from "zustand";
import { persist, type PersistStorage, type StorageValue } from "zustand/middleware";
import { allExercises, Exercise, ExerciseSource, getExerciseCode } from "@/data/exercises";

export type DurationUnit = "min" | "reps";

export type SessionBlock = {
  id: string;
  exercise: Exercise;
  customDuration?: number;
  customUnit?: DurationUnit;
};

type SerializedBlock = {
  id: string;
  customDuration?: number;
  customUnit?: DurationUnit;
};

type SessionState = {
  customExercises: Exercise[];
  exerciseOverrides: Record<string, Partial<Exercise>>;
  exerciseLibrary: Exercise[];
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: Set<string>;
  favoriteIds: Set<string>;
  searchQuery: string;
  highlightExerciseId: string | null;
  setPlayerCount: (count: number) => void;
  setStationCount: (count: number) => void;
  setSearchQuery: (query: string) => void;
  setHighlightExercise: (id: string | null) => void;
  toggleExercise: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Exercise) => void;
  plannedBlocks: SessionBlock[] | null;
  setPlannedBlocks: (blocks: SessionBlock[]) => void;
  resetPlan: () => void;
  generateSession: () => SessionBlock[];
};

const warmupTarget = 10;
const activationTarget = 8;
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
  const warmups = chosen.filter((ex) => ex.category === "warmup");
  const activation = chosen.filter((ex) => ex.category === "aktivisering");
  const rondos = chosen.filter((ex) => ex.category === "rondo");
  const stations = chosen.filter((ex) => ex.category === "station");
  const games = chosen.filter((ex) => ex.category === "game");
  const cooldowns = chosen.filter((ex) => ex.category === "cooldown");

  const timeline: SessionBlock[] = [];
  fixed.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  warmups.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  activation.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  rondos.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  stations.forEach((exercise) =>
    timeline.push({ id: exercise.id, exercise })
  );

  games.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  cooldowns.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  return timeline;
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

const buildExerciseLibrary = (
  custom: Exercise[] = [],
  overrides: Record<string, Partial<Exercise>> = {}
) => sortExercises([...applyOverrides(allExercises, overrides), ...custom]);

const serializeSet = (value?: Set<string>) => Array.from(value ?? new Set());
const hydrateSet = (value?: string[] | Set<string>) => {
  if (!value) return new Set<string>();
  if (value instanceof Set) return value;
  return new Set(value);
};

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
  selectedExerciseIds: Set<string>;
  favoriteIds: Set<string>;
  plannedBlocks: SessionBlock[] | null;
  searchQuery: string;
  customExercises: Exercise[];
  exerciseOverrides: Record<string, Partial<Exercise>>;
  exerciseLibrary: Exercise[];
};

type PersistedSessionStorageValue = StorageValue<PersistedSessionState>;

const serializePlannedBlocks = (blocks?: SessionBlock[] | null): SerializedBlock[] | null => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return blocks.map(({ id, customDuration, customUnit }) => ({
    id,
    customDuration,
    customUnit,
  }));
};

const hydratePlannedBlocks = (
  value: unknown,
  exerciseLibrary: Exercise[]
): SessionBlock[] | null => {
  if (!value) return null;
  const ensureUnit = (unit?: unknown): DurationUnit | undefined => {
    if (unit === "min" || unit === "reps") return unit;
    return undefined;
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
      playerCount: 12,
      stationCount: 3,
      searchQuery: "",
      highlightExerciseId: null,
      selectedExerciseIds: new Set(),
      favoriteIds: new Set(),
      setPlayerCount: (count) => set({ playerCount: count }),
      setStationCount: (count) => set({ stationCount: count }),
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
      resetPlan: () => set({ plannedBlocks: null, selectedExerciseIds: new Set() }),
      generateSession: () => {
        const state = get();
        const base = buildTimeline({
          selectedExerciseIds: state.selectedExerciseIds,
          exerciseLibrary: state.exerciseLibrary,
        });
        const plan = state.plannedBlocks;
        if (!plan) return base;

        // Sjekk at plan matcher base (samme øvelser)
        const baseIds = new Set(base.map((block) => block.id));
        const planIds = new Set(plan.map((block) => block.id));

        // Hvis øvelser er lagt til eller fjernet, reset plan
        const sameSize = baseIds.size === planIds.size;
        const allMatch = [...baseIds].every((id) => planIds.has(id));

        if (!sameSize || !allMatch) {
          set({ plannedBlocks: null });
          return base;
        }

        // Behold tilpasset rekkefølge og varigheter fra plan
        return plan;
      },
    }),
    {
      name: "treninger-session",
      partialize: (state) => ({
        playerCount: state.playerCount,
        stationCount: state.stationCount,
        selectedExerciseIds: state.selectedExerciseIds,
        favoriteIds: state.favoriteIds,
        plannedBlocks: state.plannedBlocks,
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

          // Oppdater plannedBlocks med ferske øvelsesdata
          const hydratedPlannedBlocks = hydratePlannedBlocks(
            parsedState.plannedBlocks,
            exerciseLibrary
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
          const favoriteIds = hydrateSet(
            Array.isArray(parsedState.favoriteIds)
              ? (parsedState.favoriteIds as string[])
              : undefined
          );

          return {
            state: {
              exerciseLibrary,
              playerCount,
              stationCount,
              customExercises: persistedCustom,
              exerciseOverrides: persistedOverrides,
              plannedBlocks: hydratedPlannedBlocks,
              selectedExerciseIds,
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
              plannedBlocks: serializePlannedBlocks(value.state.plannedBlocks),
              selectedExerciseIds: serializeSet(value.state.selectedExerciseIds),
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
  if (block.exercise.category === "warmup" && !block.exercise.alwaysIncluded) {
    return warmupTarget;
  }
  if (block.exercise.category === "aktivisering") {
    return activationTarget;
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
  // Standard: cooldown bruker reps, alt annet bruker min
  return block.exercise.category === "cooldown" ? "reps" : "min";
};

// Hjelpefunksjon: Sjekker om et tall går opp i et annet (divisor match)
const isDivisorMatch = (total: number, groupSize: number): boolean => {
  return total % groupSize === 0;
};

// Hjelpefunksjon: Beregner hvor godt en øvelse passer til antallet
// Returnerer: 0 = perfekt match, 1 = nesten (1-2 rest), 2 = passer ikke
const getExerciseFitScore = (
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

export const filterExercises = (
  exerciseLibrary: Exercise[],
  playerCount: number,
  category?: string,
  theme?: string,
  favoriteIds?: Set<string>,
  stationCount?: number,
  sourceFilter?: ExerciseSource | "egen" | null,
  filterByPlayerCount?: boolean,
  searchQuery?: string
) => {
  // Beregn spillere per stasjon - brukes for alle kategorier når filter er aktivt
  const playersPerStation = stationCount && stationCount > 0 
    ? Math.floor(playerCount / stationCount) 
    : playerCount;
  const normalizedSearch = searchQuery?.trim().toLowerCase();

  return exerciseLibrary
    .filter((exercise) => {
      // Filtrer kun på kategori og tema, IKKE på spillerantall
      const categoryMatch = category ? exercise.category === category : true;
      const themeMatch = theme ? exercise.theme === theme : true;
      
      // Filtrer på spillerantall hvis aktivert - bruk alltid spillere per stasjon
      let playerCountMatch = true;
      if (filterByPlayerCount) {
        playerCountMatch = playersPerStation >= exercise.playersMin && playersPerStation <= exercise.playersMax;
      }
      
      // Filtrer på kilde
      let sourceMatch = true;
      if (sourceFilter !== null && sourceFilter !== undefined) {
        const exerciseSource = exercise.source || "egen";
        if (sourceFilter === "egen") {
          // "Egne" inkluderer øvelser uten source og eggen-øvelser
          sourceMatch = !exercise.source || exercise.source === "eggen";
        } else {
          sourceMatch = exerciseSource === sourceFilter;
        }
      }

      let searchMatch = true;
      if (normalizedSearch) {
        // Inkluder øvelseskode i søket (f.eks. "S45", "K12", "R3")
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
        searchMatch = haystack.includes(normalizedSearch);
      }
      
      return categoryMatch && themeMatch && sourceMatch && playerCountMatch && searchMatch;
    })
    .sort((a, b) => {
      // 1. Favoritter først
      const aFav = favoriteIds?.has(a.id) ? 0 : 1;
      const bFav = favoriteIds?.has(b.id) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;

      // 2. Sorter etter hvor godt øvelsen passer
      const relevantPlayersPerStation = (category === "station" || category === "rondo") ? playersPerStation : undefined;
      const aScore = getExerciseFitScore(a, playerCount, relevantPlayersPerStation);
      const bScore = getExerciseFitScore(b, playerCount, relevantPlayersPerStation);
      if (aScore !== bScore) return aScore - bScore;

      // 4. Alfabetisk
      return a.name.localeCompare(b.name, "nb");
    });
};
