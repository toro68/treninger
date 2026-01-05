import { ExerciseCard } from "./ExerciseCard";
import { useMemo, useState } from "react";
import type { Exercise, ExerciseCategory } from "@/data/exercises";

interface ExerciseListProps {
  category?: ExerciseCategory;
  title: string;
  exercises: Exercise[];
}

export const ExerciseList = ({
  category,
  title,
  exercises,
}: ExerciseListProps) => {
  const [open, setOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(24);
  const sectionAccent = useMemo(() => {
    const styles: Record<NonNullable<ExerciseListProps["category"]> | "default", string> = {
      warmup: "border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-950 shadow-sm",
      aktivisering: "border-orange-200/70 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-900 shadow-sm",
      rondo: "border-purple-200/70 bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-900 shadow-sm",
      station: "border-sky-200/70 bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-900 shadow-sm",
      game: "border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-lime-50 text-emerald-900 shadow-sm",
      cooldown: "border-rose-200/70 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-900 shadow-sm",
      "fixed-warmup": "border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-950 shadow-sm",
      default: "border-zinc-200 bg-zinc-50 text-zinc-900",
    };
    return styles[category ?? "default"];
  }, [category]);
  const exerciseCount = exercises.length;
  const exercisesToRender = open ? exercises.slice(0, visibleCount) : [];

  return (
    <section>
      <button
        type="button"
        aria-expanded={open}
        onClick={() =>
          setOpen((prev) => {
            const next = !prev;
            if (!next) setVisibleCount(24);
            return next;
          })
        }
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${sectionAccent}`}
      >
        <div className="flex flex-col gap-0.5">
          <span>{title}</span>
          <span className="text-xs font-normal text-zinc-500/80">
            {exerciseCount > 0 ? `${exerciseCount} øvelse${exerciseCount === 1 ? "" : "r"}` : "Ingen øvelser"}
          </span>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {open ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{open ? "−" : "+"}</span>
        </span>
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          {exercisesToRender.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
          {exerciseCount > visibleCount && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(exerciseCount, count + 24))}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              Vis flere ({exerciseCount - visibleCount})
            </button>
          )}
          {exercises.length === 0 && (
            <p className="text-sm text-zinc-500">
              Ingen øvelser i denne kategorien.
            </p>
          )}
        </div>
      )}
    </section>
  );
};
