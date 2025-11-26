import { Exercise } from "@/data/exercises";
import { useSessionStore } from "@/store/sessionStore";
import { useState } from "react";

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const toggleExercise = useSessionStore((state) => state.toggleExercise);
  const toggleFavorite = useSessionStore((state) => state.toggleFavorite);
  const selected = useSessionStore((state) =>
    state.selectedExerciseIds.has(exercise.id)
  );
  const isFavorite = useSessionStore((state) =>
    state.favoriteIds.has(exercise.id)
  );

  const [showDetails, setShowDetails] = useState(false);

  const disabled = exercise.alwaysIncluded;

  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 sm:p-4 transition active:bg-zinc-50 ${
        selected ? "border-black bg-zinc-50" : "border-zinc-200"
      } ${disabled ? "cursor-not-allowed bg-zinc-100" : ""}`}
    >
      <input
        type="checkbox"
        checked={selected}
        disabled={disabled}
        onChange={() => toggleExercise(exercise.id)}
        className="mt-0.5 h-5 w-5 accent-black"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-zinc-900 flex-1">{exercise.name}</p>
          {exercise.alwaysIncluded && (
            <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600">
              Fast
            </span>
          )}
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              toggleFavorite(exercise.id);
            }}
            className={`p-1 rounded transition ${
              isFavorite ? "text-amber-500" : "text-zinc-300 hover:text-amber-400"
            }`}
            title={isFavorite ? "Fjern fra favoritter" : "Legg til favoritter"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
        <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{exercise.description}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500">
          <span className="rounded bg-zinc-100 px-2 py-0.5">{exercise.duration} min</span>
          <span className="rounded bg-zinc-100 px-2 py-0.5">{exercise.playersMin}-{exercise.playersMax} sp</span>
          <span className="rounded bg-zinc-100 px-2 py-0.5">{exercise.theme}</span>
        </div>
        {!exercise.alwaysIncluded && (exercise.coachingPoints.length > 0 || exercise.variations.length > 0) && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setShowDetails((prev) => !prev);
            }}
            className="mt-2 text-xs text-zinc-500 underline-offset-2 hover:underline"
          >
            {showDetails ? "Skjul" : "Mer info"}
          </button>
        )}
        {showDetails && (
          <div className="mt-2 rounded-xl bg-zinc-100 p-3 text-xs text-zinc-600">
            {exercise.coachingPoints.length > 0 && (
              <div className="mb-2">
                <p className="font-medium text-zinc-800">Coaching</p>
                <ul className="ml-4 list-disc space-y-1">
                  {exercise.coachingPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            {exercise.variations.length > 0 && (
              <div>
                <p className="font-medium text-zinc-800">Varianter</p>
                <ul className="ml-4 list-disc space-y-1">
                  {exercise.variations.map((variation) => (
                    <li key={variation}>{variation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </label>
  );
};
