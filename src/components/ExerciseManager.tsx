import { useExercises } from "@/hooks/useExercises";
import { useSessionStore } from "@/store/sessionStore";
import type { Exercise, ExerciseCategory } from "@/data/exercises";
import { getExerciseCode } from "@/data/exercises";
import { useMemo, useState, useEffect } from "react";

const emptyExercise: Exercise = {
  id: "",
  exerciseNumber: 0, // Settes automatisk ved lagring
  name: "",
  category: "warmup",
  duration: 10,
  playersMin: 4,
  playersMax: 16,
  theme: "",
  equipment: [],
  description: "",
  coachingPoints: [],
  variations: [],
};

const CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  "fixed-warmup": "Skadefri oppvarming",
  warmup: "Oppvarming",
  aktivisering: "Aktivisering",
  rondo: "Rondo",
  station: "Stasjoner",
  game: "Spill",
  cooldown: "Avslutning",
};

export const ExerciseManager = () => {
  const exercises = useExercises();
  const addExercise = useSessionStore((state) => state.addExercise);
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

  // DEBUG: Logg søkeresultater
  useEffect(() => {
    if (searchQuery.trim()) {
      console.log('[DEBUG] Søk:', searchQuery);
      console.log('[DEBUG] Antall øvelser i bibliotek:', exercises.length);
      console.log('[DEBUG] Antall treff:', filtered.length);
      // Vis de første 5 treffene
      filtered.slice(0, 5).forEach(e => {
        console.log(`  - ${getExerciseCode(e)}: ${e.name}`);
      });
      // Sjekk om S45 finnes i biblioteket
      const s45 = exercises.find(e => getExerciseCode(e) === 'S45');
      console.log('[DEBUG] S45 i bibliotek:', s45 ? `${s45.name} (id: ${s45.id})` : 'IKKE FUNNET');
    }
  }, [searchQuery, exercises, filtered]);

  const handleEdit = (exercise: Exercise) => {
    setEditing(exercise);
  };

  const handleCreate = () => {
    setEditing({ ...emptyExercise, id: crypto.randomUUID() });
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

  const handleSubmit = () => {
    if (!editing) return;
    if (!editing.id) {
      handleChange("id", crypto.randomUUID());
    }
    if (exercises.some((ex) => ex.id === editing.id)) {
      updateExercise(editing.id, editing);
    } else {
      addExercise(editing);
    }
    setEditing(null);
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
            Opprett, rediger eller søk etter øvelser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <input
              type="search"
              placeholder="Søk etter øvelse"
              className="flex-1 min-w-[150px] rounded-full border border-zinc-200 px-4 py-2 text-sm"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button
              onClick={handleCreate}
              className="rounded-full bg-black px-4 py-2 text-sm text-white"
            >
              Ny øvelse
            </button>
          </div>
          <div className="mt-4 max-h-64 overflow-auto rounded-xl border border-zinc-100">
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
            {exercises.some((ex) => ex.id === editing.id)
              ? "Rediger øvelse"
              : "Ny øvelse"}
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
