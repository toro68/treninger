import { Exercise, getExerciseCode } from "@/data/exercises";
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
          <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1 rounded bg-zinc-100 text-xs font-medium text-zinc-500 shrink-0">
            {getExerciseCode(exercise)}
          </span>
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
            {exercise.playersMin}–{exercise.playersMax} spillere
          </span>
          <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium capitalize text-zinc-600">
            {exercise.theme}
          </span>
          {exercise.source === "tiim" && (
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
              tiim
            </span>
          )}
          {exercise.source === "eggen" && (
            <span className="rounded-md bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
              Eggen
            </span>
          )}
          {exercise.source === "dbu" && (
            <span className="rounded-md bg-red-100 px-2 py-0.5 font-medium text-red-700">
              DBU
            </span>
          )}
          {exercise.source === "rondo" && (
            <span className="rounded-md bg-purple-100 px-2 py-0.5 font-medium text-purple-700">
              Rondo
            </span>
          )}
          {exercise.source === "hyballa" && (
            <span className="rounded-md bg-blue-100 px-2 py-0.5 font-medium text-blue-700">
              Hyballa
            </span>
          )}
          {exercise.source === "bangsbo" && (
            <span className="rounded-md bg-cyan-100 px-2 py-0.5 font-medium text-cyan-700">
              Bangsbo
            </span>
          )}
          {exercise.source === "dugger" && (
            <span className="rounded-md bg-rose-100 px-2 py-0.5 font-medium text-rose-700">
              Dugger
            </span>
          )}
          {exercise.source === "prickett" && (
            <span className="rounded-md bg-lime-100 px-2 py-0.5 font-medium text-lime-700">
              Prickett
            </span>
          )}
          {exercise.source === "101youth" && (
            <span className="rounded-md bg-orange-100 px-2 py-0.5 font-medium text-orange-700">
              101 Youth
            </span>
          )}
          {exercise.source === "seeger" && (
            <span className="rounded-md bg-indigo-100 px-2 py-0.5 font-medium text-indigo-700">
              Seeger
            </span>
          )}
          {exercise.source === "matkovich" && (
            <span className="rounded-md bg-teal-100 px-2 py-0.5 font-medium text-teal-700">
              Matkovich
            </span>
          )}
          {exercise.source === "worldclass" && (
            <span className="rounded-md bg-sky-100 px-2 py-0.5 font-medium text-sky-700">
              World Class
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-3">
          {!exercise.alwaysIncluded && (exercise.coachingPoints.length > 0 || exercise.variations.length > 0) && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setShowDetails((prev) => !prev);
              }}
              className="text-xs text-zinc-500 underline-offset-2 hover:underline"
            >
              {showDetails ? "Skjul" : "Mer info"}
            </button>
          )}
          {exercise.sourceUrl && (
            <a
              href={exercise.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className={`inline-flex items-center gap-1 text-xs hover:underline ${
                exercise.source === "eggen" 
                  ? "text-amber-600 hover:text-amber-700" 
                  : exercise.source === "rondo"
                  ? "text-purple-600 hover:text-purple-700"
                  : exercise.source === "hyballa"
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-emerald-600 hover:text-emerald-700"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                <path d="M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z" />
                <path d="M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z" />
              </svg>
              {exercise.source === "eggen" 
                ? "Se PDF (Eggen)" 
                : exercise.source === "rondo"
                ? "The Science of Rondo"
                : exercise.source === "hyballa"
                ? "German Soccer Passing Drills"
                : "Se på tiim.no"}
            </a>
          )}
        </div>
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
              <div className="mb-2">
                <p className="font-medium text-zinc-800">Varianter</p>
                <ul className="ml-4 list-disc space-y-1">
                  {exercise.variations.map((variation) => (
                    <li key={variation}>{variation}</li>
                  ))}
                </ul>
              </div>
            )}
            {exercise.sourceRef && (
              <div className="print:hidden">
                <p className="font-medium text-zinc-800">📚 Kilde</p>
                <p className="ml-4 text-zinc-600">{exercise.sourceRef}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </label>
  );
};
