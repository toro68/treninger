import { filterExercises } from "@/store/sessionStore";
import { ExerciseCard } from "./ExerciseCard";
import { useSessionStore } from "@/store/sessionStore";
import { useState } from "react";

interface ExerciseListProps {
  category?: "warmup" | "station" | "game" | "cooldown";
  title: string;
  theme?: string;
}

export const ExerciseList = ({ category, title, theme }: ExerciseListProps) => {
  const playerCount = useSessionStore((state) => state.playerCount);
  const exerciseLibrary = useSessionStore((state) => state.exerciseLibrary);
  const favoriteIds = useSessionStore((state) => state.favoriteIds);
  const exercises = filterExercises(exerciseLibrary, playerCount, category, theme, favoriteIds);
  const [open, setOpen] = useState(true);

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-2 text-left text-base font-semibold text-zinc-900"
      >
        {title}
        <span className="text-sm text-zinc-500">{open ? "Skjul" : "Vis"}</span>
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
          {exercises.length === 0 && (
            <p className="text-sm text-zinc-500">
              Ingen øvelser tilgjengelig for dette antallet spillere.
            </p>
          )}
        </div>
      )}
    </section>
  );
};
