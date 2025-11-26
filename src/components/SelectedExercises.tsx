import { useSessionStore } from "@/store/sessionStore";
import { exercises } from "@/data/exercises";

export const SelectedExercises = () => {
  const selectedExerciseIds = useSessionStore((state) => state.selectedExerciseIds);
  const selected = exercises.filter((exercise) =>
    selectedExerciseIds.has(exercise.id)
  );

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Skadefri plan</h2>
        <span className="text-sm text-zinc-500">
          {selectedExerciseIds.size} {selectedExerciseIds.size === 1 ? "øvelse" : "øvelser"}
        </span>
      </div>
      {selected.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-600">
          Ingen valgte øvelser ennå. Marker øvelser i lista for å se dem her.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {selected.map((exercise) => (
            <div
              key={exercise.id}
              className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3"
            >
              <div className="flex items-center justify-between text-sm text-zinc-600">
                <span>{exercise.name}</span>
                <span>{exercise.duration} min</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                {exercise.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
