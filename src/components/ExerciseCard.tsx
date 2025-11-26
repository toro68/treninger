import { Exercise } from "@/data/exercises";
import { useSessionStore } from "@/store/sessionStore";
import { useState } from "react";

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const toggleExercise = useSessionStore((state) => state.toggleExercise);
  const selected = useSessionStore((state) =>
    state.selectedExerciseIds.has(exercise.id)
  );

  const [showDetails, setShowDetails] = useState(false);

  const disabled = exercise.alwaysIncluded;

  return (
    <label
      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition hover:border-zinc-400 ${
        selected ? "border-black bg-zinc-50" : "border-zinc-200"
      } ${disabled ? "cursor-not-allowed bg-zinc-100" : ""}`}
    >
      <input
        type="checkbox"
        checked={selected}
        disabled={disabled}
        onChange={() => toggleExercise(exercise.id)}
        className="mt-1 accent-black"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-zinc-900">{exercise.name}</p>
          {exercise.alwaysIncluded && (
            <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-600">
              Alltid inkludert
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-600">{exercise.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>{`${exercise.duration} min`}</span>
          <span>{`${exercise.playersMin}-${exercise.playersMax} spillere`}</span>
          <span>{exercise.theme}</span>
        </div>
        {!exercise.alwaysIncluded && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setShowDetails((prev) => !prev);
            }}
            className="self-start text-xs font-medium text-zinc-600 underline-offset-2 hover:underline"
          >
            {showDetails ? "Skjul detaljer" : "Vis flere detaljer"}
          </button>
        )}
        {showDetails && (
          <div className="rounded-2xl bg-zinc-100 p-3 text-xs text-zinc-600">
            {exercise.coachingPoints.length > 0 && (
              <div className="mb-2">
                <p className="font-semibold text-zinc-800">Coaching</p>
                <ul className="ml-4 list-disc space-y-1">
                  {exercise.coachingPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            {exercise.variations.length > 0 && (
              <div>
                <p className="font-semibold text-zinc-800">Varianter</p>
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
