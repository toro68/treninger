import { Exercise } from "@/data/exercises";
import { useSessionStore } from "@/store/sessionStore";
import { useState } from "react";

interface ExerciseCardProps {
  exercise: Exercise;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.5}
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

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
      className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-3 sm:p-4 transition-all duration-200 hover:shadow-md ${
        selected
          ? "border-black bg-zinc-50 ring-1 ring-black/5"
          : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50"
      } ${disabled ? "cursor-not-allowed bg-zinc-100 opacity-75" : ""}`}
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
            className={`p-1 rounded-full transition hover:scale-110 ${
              isFavorite ? "text-amber-500" : "text-zinc-300 hover:text-amber-400"
            }`}
            title={isFavorite ? "Fjern fra favoritter" : "Legg til favoritter"}
          >
            <StarIcon filled={isFavorite} />
          </button>
        </div>
        <p className="mt-1 text-sm text-zinc-600 line-clamp-2 group-hover:text-zinc-700">{exercise.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" />
            </svg>
            {exercise.duration} min
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.156 11.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 1 2.015-1.043h4.032a2.5 2.5 0 0 1 2.015 1.043c.373.51.653 1.091.813 1.72A6.968 6.968 0 0 1 8 15a6.968 6.968 0 0 1-4.844-1.237Z" />
            </svg>
            {exercise.playersMin}-{exercise.playersMax}
          </span>
          <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium capitalize text-zinc-600">
            {exercise.theme}
          </span>
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
