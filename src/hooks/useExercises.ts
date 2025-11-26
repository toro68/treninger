import { useSessionStore } from "@/store/sessionStore";
import type { Exercise } from "@/data/exercises";
import { useMemo } from "react";

export const useExercises = (): Exercise[] => {
  return useSessionStore((state) => state.exerciseLibrary);
};

export const useExerciseById = (id?: string) => {
  const exercises = useExercises();
  return useMemo(() => exercises.find((exercise) => exercise.id === id), [
    exercises,
    id,
  ]);
};
