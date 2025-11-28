import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allExercises, Exercise, ExerciseSource } from "@/data/exercises";

export type DurationUnit = "min" | "reps";

export type SessionBlock = {
  id: string;
  exercise: Exercise;
  customDuration?: number;
  customUnit?: DurationUnit;
};

type SessionState = {
  exerciseLibrary: Exercise[];
  playerCount: number;
  stationCount: number;
  selectedExerciseIds: Set<string>;
  favoriteIds: Set<string>;
  setPlayerCount: (count: number) => void;
  setStationCount: (count: number) => void;
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
  const stations = chosen.filter((ex) => ex.category === "station");
  const games = chosen.filter((ex) => ex.category === "game");
  const cooldowns = chosen.filter((ex) => ex.category === "cooldown");

  const timeline: SessionBlock[] = [];
  fixed.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  warmups.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  stations.forEach((exercise) =>
    timeline.push({ id: exercise.id, exercise })
  );

  games.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  cooldowns.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  return timeline;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      exerciseLibrary: [...allExercises],
      playerCount: 12,
      stationCount: 3,
      selectedExerciseIds: new Set(),
      favoriteIds: new Set(),
      setPlayerCount: (count) => set({ playerCount: count }),
      setStationCount: (count) => set({ stationCount: count }),
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
          // Finn høyeste exerciseNumber og legg til 1
          const maxNumber = state.exerciseLibrary.reduce(
            (max, ex) => Math.max(max, ex.exerciseNumber || 0),
            0
          );
          const exerciseWithNumber = {
            ...exercise,
            exerciseNumber: exercise.exerciseNumber || maxNumber + 1,
          };
          const next = [...state.exerciseLibrary, exerciseWithNumber].sort((a, b) =>
            a.name.localeCompare(b.name, "nb")
          );
          return { exerciseLibrary: next };
        }),
      updateExercise: (id, updated) =>
        set((state) => {
          const next = state.exerciseLibrary
            .map((exercise) => (exercise.id === id ? updated : exercise))
            .sort((a, b) => a.name.localeCompare(b.name, "nb"));
          return { exerciseLibrary: next };
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
        // Lagre kun brukerdata, ikke hele exerciseLibrary (den hentes fra koden)
        playerCount: state.playerCount,
        stationCount: state.stationCount,
        selectedExerciseIds: state.selectedExerciseIds,
        favoriteIds: state.favoriteIds,
        plannedBlocks: state.plannedBlocks,
      }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          
          // Oppdater plannedBlocks med ferske øvelsesdata
          let updatedPlannedBlocks = parsed.state.plannedBlocks;
          if (updatedPlannedBlocks && Array.isArray(updatedPlannedBlocks)) {
            updatedPlannedBlocks = updatedPlannedBlocks.map((block: SessionBlock) => {
              // Finn fersk øvelse fra allExercises-arrayen
              const freshExercise = allExercises.find(ex => ex.id === block.exercise?.id);
              if (freshExercise) {
                return {
                  ...block,
                  exercise: freshExercise,
                };
              }
              return block;
            });
          }
          
          return {
            ...parsed,
            state: {
              ...parsed.state,
              // Bruk alltid den nyeste exerciseLibrary fra koden
              exerciseLibrary: [...allExercises],
              plannedBlocks: updatedPlannedBlocks,
              selectedExerciseIds: new Set(parsed.state.selectedExerciseIds || []),
              favoriteIds: new Set(parsed.state.favoriteIds || []),
            },
          };
        },
        setItem: (name, value) => {
          const toStore = {
            ...value,
            state: {
              ...value.state,
              selectedExerciseIds: Array.from(value.state.selectedExerciseIds || []),
              favoriteIds: Array.from(value.state.favoriteIds || []),
            },
          };
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
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
  filterByPlayerCount?: boolean
) => {
  // Beregn spillere per stasjon for stasjonskategorien
  const playersPerStation = stationCount && stationCount > 0 
    ? Math.floor(playerCount / stationCount) 
    : undefined;

  return exerciseLibrary
    .filter((exercise) => {
      // Filtrer kun på kategori og tema, IKKE på spillerantall
      const categoryMatch = category ? exercise.category === category : true;
      const themeMatch = theme ? exercise.theme === theme : true;
      
      // Filtrer på spillerantall hvis aktivert
      let playerCountMatch = true;
      if (filterByPlayerCount) {
        // For stasjoner: bruk spillere per stasjon
        const targetCount = category === "station" && playersPerStation 
          ? playersPerStation 
          : playerCount;
        playerCountMatch = targetCount >= exercise.playersMin && targetCount <= exercise.playersMax;
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
      
      return categoryMatch && themeMatch && sourceMatch && playerCountMatch;
    })
    .sort((a, b) => {
      // 1. Favoritter først
      const aFav = favoriteIds?.has(a.id) ? 0 : 1;
      const bFav = favoriteIds?.has(b.id) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;

      // 2. For stasjoner: Bruk spillere per stasjon, ellers totalt antall
      const targetCount = category === "station" && playersPerStation 
        ? playersPerStation 
        : playerCount;

      // 3. Sorter etter hvor godt øvelsen passer
      const aScore = getExerciseFitScore(a, playerCount, category === "station" ? playersPerStation : undefined);
      const bScore = getExerciseFitScore(b, playerCount, category === "station" ? playersPerStation : undefined);
      if (aScore !== bScore) return aScore - bScore;

      // 4. Alfabetisk
      return a.name.localeCompare(b.name, "nb");
    });
};
