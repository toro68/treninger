import { useExercises } from "@/hooks/useExercises";
import { useSessionStore } from "@/store/sessionStore";
import type { Exercise, ExerciseCategory } from "@/data/exercises";
import { getExerciseCode } from "@/data/exercises";
import { useMemo, useState, useEffect } from "react";
import { sanitizeSvgMarkup } from "@/utils/sanitizeSvg";

const CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  "fixed-warmup": "Skadefri oppvarming",
  warmup: "Oppvarming",
  aktivisering: "Aktivisering",
  rondo: "Rondo",
  station: "Stasjoner",
  game: "Spill",
  cooldown: "Avslutning",
};

export const ExerciseManager = ({ highlightExerciseId, onHighlightConsumed }: { highlightExerciseId?: string | null; onHighlightConsumed?: () => void; }) => {
  const exercises = useExercises();
  const updateExercise = useSessionStore((state) => state.updateExercise);

  const [isOpen, setIsOpen] = useState(false);
  const searchQuery = useSessionStore((state) => state.searchQuery);
  const setSearchQuery = useSessionStore((state) => state.setSearchQuery);
  const [editing, setEditing] = useState<Exercise | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return exercises;
    const needle = searchQuery.toLowerCase();
    return exercises.filter((exercise) => {
      // Søk i navn
      if (exercise.name.toLowerCase().includes(needle)) return true;
      // Søk i øvelseskode (f.eks. "S12", "K45", "R3")
      const code = getExerciseCode(exercise).toLowerCase();
      if (code.includes(needle)) return true;
      return false;
    });
  }, [exercises, searchQuery]);


  useEffect(() => {
    if (!highlightExerciseId) return;

    const match = exercises.find((exercise) => exercise.id === highlightExerciseId);
    if (!match) return;

    if (searchQuery !== match.name) {
      setSearchQuery(match.name);
    }
    onHighlightConsumed?.();
  }, [highlightExerciseId, exercises, searchQuery, setSearchQuery, onHighlightConsumed]);

  const handleEdit = (exercise: Exercise) => {
    setEditing(exercise);
  };

  const handleChange = (field: keyof Exercise, value: Exercise[keyof Exercise]) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const handleListChange = (
    field: "coachingPoints" | "variations" | "equipment",
    index: number,
    value: string
  ) => {
    if (!editing) return;
    const next = [...editing[field]];
    next[index] = value;
    setEditing({ ...editing, [field]: next });
  };

  const handleAddListItem = (
    field: "coachingPoints" | "variations" | "equipment"
  ) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...editing[field], ""] });
  };

  const validateExercise = (exercise: Exercise) => {
    const errors: string[] = [];
    if (!exercise.name.trim()) {
      errors.push('Øvelsen må ha navn');
    }
    if (!Number.isFinite(exercise.duration) || exercise.duration <= 0) {
      errors.push('Varighet må være et positivt tall');
    }
    if (exercise.playersMin <= 0 || exercise.playersMax <= 0) {
      errors.push('Antall spillere må være større enn 0');
    }
    if (exercise.playersMin > exercise.playersMax) {
      errors.push('Min. antall spillere kan ikke være større enn maks.');
    }
    return errors;
  };

  const handleSubmit = () => {
    if (!editing) return;
    const errors = validateExercise(editing);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    updateExercise(editing.id, editing);
    setEditing(null);
  };

  const handleSvgFile = async (file: File | null) => {
    if (!editing) return;
    if (!file) return;
    const text = await file.text();
    setEditing({ ...editing, svgDiagram: text });
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <h2 className="text-lg font-semibold text-zinc-900">Administrer øvelser</h2>
        <span className="text-sm text-zinc-500">{isOpen ? "Skjul" : "Vis"}</span>
      </button>

      {isOpen && (
        <>
          <p className="mt-2 text-sm text-zinc-500">
            Søk etter øvelser. Kontakt admin for å få lagt til øvelse.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <input
              type="search"
              placeholder="Søk etter øvelse"
              className="flex-1 min-w-[150px] rounded-full border border-zinc-200 px-4 py-2 text-sm"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="mt-4 max-h-64 overflow-auto rounded-xl border border-zinc-100" role="region" aria-live="polite">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-2">Navn</th>
              <th className="px-4 py-2">Kategori</th>
              <th className="px-4 py-2">Tema</th>
              <th className="px-4 py-2">Spillere</th>
              <th className="px-4 py-2">Utstyr</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((exercise) => (
              <tr key={exercise.id} className="border-t border-zinc-100">
                <td className="px-4 py-2 font-medium">{exercise.name}</td>
                <td className="px-4 py-2 text-zinc-600">
                  {CATEGORY_LABELS[exercise.category] ?? exercise.category}
                </td>
                <td className="px-4 py-2 text-zinc-600">{exercise.theme}</td>
                <td className="px-4 py-2 text-zinc-600">
                  {exercise.playersMin}-{exercise.playersMax}
                </td>
                <td className="px-4 py-2 text-zinc-600">
                  {exercise.equipment.join(", ")}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(exercise)}
                    className="text-sm text-black underline-offset-2 hover:underline"
                  >
                    Rediger
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-zinc-500">
                  Ingen øvelser funnet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
          </div>
          {editing && (
            <div className="mt-6 space-y-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
          <h3 className="text-base font-semibold text-zinc-900">
            Rediger øvelse
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Navn
              <input
                value={editing.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className="rounded-lg border border-zinc-200 px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Kategori
              <select
                value={editing.category}
                onChange={(event) =>
                  handleChange("category", event.target.value as ExerciseCategory)
                }
                className="rounded-lg border border-zinc-200 px-3 py-2"
              >
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Tema
              <input
                value={editing.theme}
                onChange={(event) => handleChange("theme", event.target.value)}
                className="rounded-lg border border-zinc-200 px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Varighet (min)
              <input
                type="number"
                value={editing.duration}
                onChange={(event) => handleChange("duration", Number(event.target.value))}
                className="rounded-lg border border-zinc-200 px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Spillere (min)
              <input
                type="number"
                value={editing.playersMin}
                onChange={(event) =>
                  handleChange("playersMin", Number(event.target.value))
                }
                className="rounded-lg border border-zinc-200 px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Spillere (max)
              <input
                type="number"
                value={editing.playersMax}
                onChange={(event) =>
                  handleChange("playersMax", Number(event.target.value))
                }
                className="rounded-lg border border-zinc-200 px-3 py-2"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm text-zinc-700">
            Beskrivelse
            <textarea
              value={editing.description}
              onChange={(event) => handleChange("description", event.target.value)}
              className="rounded-lg border border-zinc-200 px-3 py-2"
            />
          </label>

          <div className="space-y-2 text-sm text-zinc-700">
            <div className="flex items-center justify-between gap-3">
              <span>Diagram (SVG)</span>
              {editing.svgDiagram && (
                <button
                  type="button"
                  onClick={() => handleChange("svgDiagram", "")}
                  className="text-xs text-black underline-offset-2 hover:underline"
                >
                  Fjern
                </button>
              )}
            </div>
            <input
              type="file"
              accept=".svg,image/svg+xml"
              onChange={(event) => {
                void handleSvgFile(event.target.files?.[0] ?? null);
                // allow re-uploading same file
                event.currentTarget.value = "";
              }}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2"
            />
            <textarea
              placeholder="Lim inn SVG-markup her (valgfritt)"
              value={editing.svgDiagram ?? ""}
              onChange={(event) => handleChange("svgDiagram", event.target.value)}
              className="min-h-[120px] w-full rounded-lg border border-zinc-200 px-3 py-2 font-mono text-xs"
            />
            {editing.svgDiagram && (
              <div
                className="rounded-xl border border-zinc-200 bg-white p-2 [&_svg]:block [&_svg]:h-auto [&_svg]:max-h-[220px] [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: sanitizeSvgMarkup(editing.svgDiagram) }}
              />
            )}
          </div>

          {(["equipment", "coachingPoints", "variations"] as const).map(
            (field) => (
              <div key={field} className="space-y-2 text-sm text-zinc-700">
                <div className="flex items-center justify-between">
                  <span>
                    {field === "equipment"
                      ? "Utstyr"
                      : field === "coachingPoints"
                      ? "Coaching"
                      : "Variasjoner"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddListItem(field)}
                    className="text-xs text-black underline-offset-2 hover:underline"
                  >
                    Legg til
                  </button>
                </div>
                {editing[field].map((value, index) => (
                  <input
                    key={`${field}-${index}`}
                    value={value}
                    onChange={(event) =>
                      handleListChange(field, index, event.target.value)
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2"
                  />
                ))}
                {editing[field].length === 0 && (
                  <p className="text-xs text-zinc-500">Ingen elementer lagt til.</p>
                )}
              </div>
            )
          )}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(null)}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-600"
            >
              Avbryt
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-full bg-black px-4 py-2 text-sm text-white"
            >
              Lagre
            </button>
            </div>
          </div>
          )}
        </>
      )}
    </section>
  );
};
