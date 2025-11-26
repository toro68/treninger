import { create } from "zustand";
import { persist } from "zustand/middleware";
import { exercises, Exercise } from "@/data/exercises";

export type SessionBlock = {
  id: string;
  exercise: Exercise;
  customDuration?: number;
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

  const timeline: SessionBlock[] = [];
  fixed.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  warmups.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  stations.forEach((exercise) =>
    timeline.push({ id: exercise.id, exercise })
  );

  games.forEach((exercise) => timeline.push({ id: exercise.id, exercise }));

  return timeline;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      exerciseLibrary: [...exercises],
      playerCount: 12,
      stationCount: 2,
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
          const next = [...state.exerciseLibrary, exercise].sort((a, b) =>
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
      resetPlan: () => set({ plannedBlocks: null }),
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
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
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
  return block.exercise.duration;
};

export const filterExercises = (
  exerciseLibrary: Exercise[],
  playerCount: number,
  category?: string,
  theme?: string,
  favoriteIds?: Set<string>
) =>
  exerciseLibrary
    .filter((exercise) => {
      const capacityMatch =
        playerCount >= exercise.playersMin && playerCount <= exercise.playersMax;

      if (!capacityMatch) return false;

      const categoryMatch = category ? exercise.category === category : true;
      const themeMatch = theme ? exercise.theme === theme : true;

      return categoryMatch && themeMatch;
    })
    .sort((a, b) => {
      // Favoritter først
      const aFav = favoriteIds?.has(a.id) ? 0 : 1;
      const bFav = favoriteIds?.has(b.id) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;
      return a.name.localeCompare(b.name, "nb");
    });
