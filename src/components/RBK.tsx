import { eggenExercises } from '@/data/eggen-exercises';
import type { Exercise, ExerciseCategory } from '@/data/exercises';

const CATEGORY_ORDER: ExerciseCategory[] = ['warmup', 'rondo', 'station', 'game'];

const categoryLabels: Record<ExerciseCategory, string> = {
  'fixed-warmup': 'Fast oppvarming',
  warmup: 'Oppvarming',
  aktivisering: 'Aktivisering',
  rondo: 'Rondo',
  station: 'Stasjoner',
  game: 'Spill',
  cooldown: 'Avslutning',
};

const groupedExercises = CATEGORY_ORDER.map((category) => ({
  category,
  title: categoryLabels[category],
  exercises: eggenExercises.filter((exercise) => exercise.category === category) as Exercise[],
})).filter((group) => group.exercises.length > 0);

export const RBK = () => {
  return (
    <section className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">K.T. Eggen / Godfoten</p>
          <h2 className="text-2xl font-bold text-zinc-900">RBK-øvelser og Godfoten-notater</h2>
          <p className="text-sm leading-6 text-zinc-600">
            Denne siden skiller mellom to spor: øvelsene fra Knut Torbjørn Eggens treningshefte og
            Godfoten-notater knyttet til Nils Arne Eggen og RBK-miljøet. Den er ment som en ren
            kildeoversikt, ikke som en erstatning for hovedfilteret på treningssiden.
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Øvelser</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{eggenExercises.length}</p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Kilde</p>
            <p className="mt-1 text-sm font-medium text-zinc-900">Knut Torbjørn Eggen: Treningsøvelser 2003/2004</p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Dokumentasjon</p>
            <p className="mt-1 text-sm font-medium text-zinc-900">Godfoten: Nils Arne. Øvelseshefte: Knut Torbjørn.</p>
          </article>
        </div>
      </section>

      {groupedExercises.map((group) => (
        <section key={group.category} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-baseline justify-between gap-3 border-b border-zinc-100 pb-3">
            <h3 className="text-lg font-semibold text-zinc-900">{group.title}</h3>
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              {group.exercises.length} øvelser
            </span>
          </div>

          <div className="mt-4 grid gap-4">
            {group.exercises.map((exercise) => (
              <article key={exercise.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-zinc-900">{exercise.name}</h4>
                    <p className="mt-1 text-sm leading-6 text-zinc-700">{exercise.description}</p>
                  </div>
                  <div className="shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600">
                    {exercise.duration} min · {exercise.playersMin}-{exercise.playersMax} spillere
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Coaching points</p>
                    <ul className="mt-2 space-y-1 text-sm leading-6 text-zinc-700">
                      {exercise.coachingPoints.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Variasjoner</p>
                    <ul className="mt-2 space-y-1 text-sm leading-6 text-zinc-700">
                      {exercise.variations.map((variation) => (
                        <li key={variation}>• {variation}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500">
                  <span className="rounded-full bg-white px-2.5 py-1">Tema: {exercise.theme}</span>
                  <span className="rounded-full bg-white px-2.5 py-1">Utstyr: {exercise.equipment.join(', ')}</span>
                  {exercise.sourceRef ? (
                    <span className="rounded-full bg-white px-2.5 py-1">{exercise.sourceRef}</span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
};

export default RBK;