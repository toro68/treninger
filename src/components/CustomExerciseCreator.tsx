import { useState, type FormEvent } from "react";

import {
  EXERCISE_THEMES,
  type Exercise,
  type ExerciseCategory,
  type ExerciseTheme,
} from "@/data/exercises";

type CustomExerciseCreatorProps = {
  onSubmitExercise: (exercise: Exercise) => void;
  title?: string;
  description?: string;
  submitLabel?: string;
  successMessage?: string;
};

type FormState = {
  name: string;
  category: ExerciseCategory;
  duration: number;
  playersMin: number;
  playersMax: number;
  theme: ExerciseTheme;
  equipment: string;
  description: string;
  coachingPoints: string;
  variations: string;
  scalable: boolean;
  sourceRef: string;
};

const DEFAULT_FORM_STATE: FormState = {
  name: "",
  category: "station",
  duration: 12,
  playersMin: 4,
  playersMax: 12,
  theme: "pasning",
  equipment: "baller, kjegler",
  description: "",
  coachingPoints: "",
  variations: "",
  scalable: false,
  sourceRef: "",
};

const SESSION_PART_OPTIONS: Array<{ value: ExerciseCategory; label: string }> = [
  { value: "warmup", label: "Oppvarming" },
  { value: "aktivisering", label: "Aktivisering" },
  { value: "rondo", label: "Rondo" },
  { value: "station", label: "Stasjon" },
  { value: "game", label: "Spill" },
  { value: "cooldown", label: "Avslutning" },
];

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const splitCommaValues = (value: string) =>
  value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48) || "egen-ovelse";

export const CustomExerciseCreator = ({
  onSubmitExercise,
  title = "Legg til egen øvelse",
  description = "Opprett øvelser som ikke finnes i databanken, og bruk dem direkte i øktplanen.",
  submitLabel = "Legg til øvelse",
  successMessage = "Egen øvelse er lagt til.",
}: CustomExerciseCreatorProps) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<FormState>(DEFAULT_FORM_STATE);

  const updateField = <T extends keyof FormState>(field: T, value: FormState[T]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();
    const sourceRef = form.sourceRef.trim();

    if (!name || !description) {
      setStatus("error");
      setErrorMessage("Navn og beskrivelse må fylles ut.");
      return;
    }

    if (form.playersMin < 1 || form.playersMax < form.playersMin) {
      setStatus("error");
      setErrorMessage("Spillerminimum må være minst 1, og maksimum kan ikke være lavere enn minimum.");
      return;
    }

    if (form.duration < 1) {
      setStatus("error");
      setErrorMessage("Varighet må være minst 1 minutt.");
      return;
    }

    const exercise: Exercise = {
      id: `custom-${Date.now()}-${slugify(name)}`,
      exerciseNumber: 0,
      name,
      category: form.category,
      duration: form.duration,
      playersMin: form.playersMin,
      playersMax: form.playersMax,
      theme: form.theme,
      equipment: splitCommaValues(form.equipment),
      description,
      coachingPoints: splitLines(form.coachingPoints),
      variations: splitLines(form.variations),
      scalable: form.scalable,
      source: "egen",
      sourceRef: sourceRef || undefined,
    };

    onSubmitExercise(exercise);
    setForm(DEFAULT_FORM_STATE);
    setStatus("saved");
    setErrorMessage("");
    setOpen(false);
  };

  return (
    <section className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-amber-950">{title}</h3>
          <p className="mt-1 text-sm text-amber-900/80">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen((current) => !current);
            setStatus("idle");
            setErrorMessage("");
          }}
          className="rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-950 transition hover:border-amber-500"
        >
          {open ? "Skjul skjema" : "Ny øvelse"}
        </button>
      </div>

      {status === "saved" ? (
        <p className="mt-3 text-sm text-emerald-700">{successMessage}</p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      ) : null}

      {open ? (
        <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 sm:col-span-2">
              Navn
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="F.eks. 6v4 med overgang til avslutning"
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
              Øktdel
              <select
                value={form.category}
                onChange={(event) => updateField("category", event.target.value as ExerciseCategory)}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              >
                {SESSION_PART_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
              Type / fokus
              <select
                value={form.theme}
                onChange={(event) => updateField("theme", event.target.value as ExerciseTheme)}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              >
                {EXERCISE_THEMES.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
              Varighet (min)
              <input
                type="number"
                min={1}
                max={99}
                value={form.duration}
                onChange={(event) => updateField("duration", Number(event.target.value))}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
              Minimum spillere
              <input
                type="number"
                min={1}
                max={40}
                value={form.playersMin}
                onChange={(event) => updateField("playersMin", Number(event.target.value))}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
              Maksimum spillere
              <input
                type="number"
                min={1}
                max={40}
                value={form.playersMax}
                onChange={(event) => updateField("playersMax", Number(event.target.value))}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 sm:col-span-2">
              Utstyr
              <input
                type="text"
                value={form.equipment}
                onChange={(event) => updateField("equipment", event.target.value)}
                placeholder="baller, kjegler, vester"
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 sm:col-span-2">
              Beskrivelse
              <textarea
                rows={3}
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Kort forklaring på organisering og mål med øvelsen"
                className="resize-y rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
              Coachingpunkter
              <textarea
                rows={4}
                value={form.coachingPoints}
                onChange={(event) => updateField("coachingPoints", event.target.value)}
                placeholder="Ett punkt per linje"
                className="resize-y rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
              Variasjoner
              <textarea
                rows={4}
                value={form.variations}
                onChange={(event) => updateField("variations", event.target.value)}
                placeholder="Ett forslag per linje"
                className="resize-y rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800 sm:col-span-2">
              Kilde eller notat
              <input
                type="text"
                value={form.sourceRef}
                onChange={(event) => updateField("sourceRef", event.target.value)}
                placeholder="Valgfritt: hvor øvelsen kommer fra eller hva som bør huskes"
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"
              />
            </label>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={form.scalable}
              onChange={(event) => updateField("scalable", event.target.checked)}
              className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            Øvelsen kan kjøres i flere parallelle grupper
          </label>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="submit"
              className="rounded-full border border-amber-950 bg-amber-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
            >
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(DEFAULT_FORM_STATE);
                setStatus("idle");
                setErrorMessage("");
              }}
              className="rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-950 transition hover:border-amber-500"
            >
              Nullstill skjema
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
};