import { getExerciseCode, type Exercise } from "@/data/exercises";
import {
  getUnit,
  recommendedDuration,
  type DurationUnit,
  type SessionBlock,
} from "@/store/sessionStore";
import type { SessionPart } from "@/utils/sessionParts";
import { getAlternativeExercises } from "@/utils/sessionTimelineShare";
import type { DragEvent, SyntheticEvent } from "react";

type SessionTimelineBlockRowProps = {
  alternativeMenuForBlockId: string | null;
  availableAlternatives: Exercise[];
  block: SessionBlock;
  blockIndex: number;
  canMoveDown: boolean;
  canMoveUp: boolean;
  canToggleStationRoundStart: boolean;
  categoryLabels: Record<Exercise["category"], string>;
  coachNames: string[];
  customizeMenuForBlockId: string | null;
  dragIndex: number | null;
  exerciseLibrary: Exercise[];
  globalIndex: number;
  onAddAlternativeExercise: (index: number, alternativeExerciseId: string) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragStart: (index: number) => void;
  onDrop: (index: number) => void;
  onDurationChange: (index: number, value: number) => void;
  onMoveBlock: (index: number, direction: "up" | "down") => void;
  onPreventNestedDrag: (event: SyntheticEvent<HTMLElement>) => void;
  onRemoveAlternativeExercise: (index: number, alternativeExerciseId: string) => void;
  onRemoveBlock: (index: number) => void;
  onTextChange: (
    index: number,
    field: "customTitle" | "customComment",
    value: string
  ) => void;
  onToggleAlternativeMenu: (blockId: string) => void;
  onToggleCoachAssignment: (index: number, coachName: string) => void;
  onToggleCustomizeMenu: (blockId: string) => void;
  onToggleStationRoundStart: (index: number) => void;
  onUnitChange: (index: number, unit: DurationUnit) => void;
  partBaseKey: SessionPart["baseKey"];
};

export const SessionTimelineBlockRow = ({
  alternativeMenuForBlockId,
  availableAlternatives,
  block,
  blockIndex,
  canMoveDown,
  canMoveUp,
  canToggleStationRoundStart,
  categoryLabels,
  coachNames,
  customizeMenuForBlockId,
  dragIndex,
  exerciseLibrary,
  globalIndex,
  onAddAlternativeExercise,
  onDragOver,
  onDragStart,
  onDrop,
  onDurationChange,
  onMoveBlock,
  onPreventNestedDrag,
  onRemoveAlternativeExercise,
  onRemoveBlock,
  onTextChange,
  onToggleAlternativeMenu,
  onToggleCoachAssignment,
  onToggleCustomizeMenu,
  onToggleStationRoundStart,
  onUnitChange,
  partBaseKey,
}: SessionTimelineBlockRowProps) => {
  const alternativeExercises = getAlternativeExercises(block, exerciseLibrary);

  return (
    <div
      role="group"
      aria-label={`${block.exercise.name} blokk`}
      onDragOver={onDragOver}
      onDrop={() => onDrop(globalIndex)}
      className={`rounded-lg border bg-zinc-50 px-3 py-2 transition ${
        dragIndex === globalIndex ? "border-black" : "border-zinc-100"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-0.5 sm:hidden">
          <button
            onClick={() => onMoveBlock(globalIndex, "up")}
            disabled={!canMoveUp}
            className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs disabled:opacity-30"
          >
            ↑
          </button>
          <button
            onClick={() => onMoveBlock(globalIndex, "down")}
            disabled={!canMoveDown}
            className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs disabled:opacity-30"
          >
            ↓
          </button>
        </div>

        <div className="min-w-0 flex-1">
          {partBaseKey === "stasjoner" ? (
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              {`Stasjon ${blockIndex + 1}`}
            </p>
          ) : null}
          <p className="truncate text-sm text-zinc-900">
            <span className="mr-1.5 inline-flex h-5 min-w-[24px] items-center justify-center rounded bg-zinc-200 px-1 text-[10px] font-medium text-zinc-600">
              {getExerciseCode(block.exercise)}
            </span>
            {block.customTitle?.trim() || block.exercise.name}
          </p>
          {block.customTitle?.trim() && block.customTitle.trim() !== block.exercise.name ? (
            <p className="mt-1 text-xs text-zinc-500">Basert på: {block.exercise.name}</p>
          ) : null}
          {block.exercise.category === "fixed-warmup" ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-900">
                Spillerstyrt
              </span>
            </div>
          ) : null}
          {block.assignedCoachNames?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {block.assignedCoachNames.map((coachName) => (
                <span
                  key={coachName}
                  className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-900"
                >
                  {coachName}
                </span>
              ))}
            </div>
          ) : null}
          {block.customComment?.trim() ? (
            <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-950">
              <span className="font-semibold">Kommentar:</span> {block.customComment.trim()}
            </div>
          ) : null}
          {alternativeExercises.length > 0 ? (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Alternativer til denne øvelsen
              </p>
              <div className="mt-2 space-y-2">
                {alternativeExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-100 bg-white px-3 py-2 text-xs text-amber-950"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-zinc-900">
                        <span className="mr-1.5 inline-flex min-w-[24px] items-center justify-center rounded bg-amber-100 px-1 py-0.5 text-[10px] font-semibold text-amber-900">
                          {getExerciseCode(exercise)}
                        </span>
                        {exercise.name}
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-500">
                        {categoryLabels[exercise.category]} · {exercise.theme}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveAlternativeExercise(globalIndex, exercise.id)}
                      className="rounded-full border border-amber-200 bg-white px-2 py-1 text-[11px] text-amber-900 transition hover:border-amber-400"
                      title="Fjern alternativ"
                    >
                      Fjern
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {!block.exercise.alwaysIncluded ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {canToggleStationRoundStart ? (
                <button
                  type="button"
                  onClick={() => onToggleStationRoundStart(globalIndex)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                    block.stationRoundStart
                      ? "border-sky-300 bg-sky-50 text-sky-900"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                  }`}
                >
                  {block.stationRoundStart
                    ? "Slå sammen med forrige runde"
                    : "Ny stasjonsrunde"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => onToggleAlternativeMenu(block.id)}
                className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] text-zinc-600 transition hover:border-zinc-400"
              >
                Legg til alternativ
              </button>
              {alternativeMenuForBlockId === block.id ? (
                <select
                  defaultValue=""
                  onChange={(event) => {
                    onAddAlternativeExercise(globalIndex, event.target.value);
                    event.currentTarget.value = "";
                  }}
                  className="max-w-full rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-700 focus:border-black focus:outline-none"
                >
                  <option value="">Velg alternativ fra hele biblioteket</option>
                  {Object.entries(
                    availableAlternatives.reduce<Record<string, Exercise[]>>((groups, exercise) => {
                      const label = categoryLabels[exercise.category];
                      groups[label] ??= [];
                      groups[label].push(exercise);
                      return groups;
                    }, {})
                  ).map(([label, exercises]) => (
                    <optgroup key={label} label={label}>
                      {exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                          {getExerciseCode(exercise)} {exercise.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ) : null}
              <button
                type="button"
                onClick={() => onToggleCustomizeMenu(block.id)}
                className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[11px] text-amber-900 transition hover:border-amber-400"
              >
                {customizeMenuForBlockId === block.id ? "Skjul tekstfelt" : "Tilpass tekst"}
              </button>
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleCustomizeMenu(block.id)}
                className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[11px] text-amber-900 transition hover:border-amber-400"
              >
                {customizeMenuForBlockId === block.id ? "Skjul tekstfelt" : "Tilpass tekst"}
              </button>
            </div>
          )}
          {customizeMenuForBlockId === block.id || block.customTitle?.trim() || block.customComment?.trim() ? (
            <div className="mt-3 rounded-xl border border-amber-200 bg-white p-3">
              <div className="grid gap-3">
                <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Egen tittel
                  <input
                    type="text"
                    draggable={false}
                    onDragStart={onPreventNestedDrag}
                    onPointerDown={onPreventNestedDrag}
                    value={block.customTitle ?? ""}
                    onChange={(event) =>
                      onTextChange(globalIndex, "customTitle", event.target.value)
                    }
                    placeholder={block.exercise.name}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-normal normal-case tracking-normal text-zinc-900 focus:border-amber-500 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2">
                  Kommentar til blokka
                  <textarea
                    draggable={false}
                    onDragStart={onPreventNestedDrag}
                    onPointerDown={onPreventNestedDrag}
                    value={block.customComment ?? ""}
                    onChange={(event) =>
                      onTextChange(globalIndex, "customComment", event.target.value)
                    }
                    rows={3}
                    placeholder="Tilpasninger, fokus eller praktiske beskjeder for denne øvelsen"
                    className="resize-y rounded-lg border border-zinc-200 px-3 py-2 text-sm font-normal normal-case tracking-normal text-zinc-900 focus:border-amber-500 focus:outline-none"
                  />
                </label>
              </div>
            </div>
          ) : null}
          {coachNames.length > 0 && block.exercise.category !== "fixed-warmup" ? (
            <div className="mt-3 rounded-xl border border-zinc-200 bg-white/80 p-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                Ansvarlige trenere
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {coachNames.map((coachName) => {
                  const checked = block.assignedCoachNames?.includes(coachName) ?? false;
                  return (
                    <label
                      key={coachName}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] transition ${
                        checked
                          ? "border-sky-300 bg-sky-50 text-sky-900"
                          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        draggable={false}
                        onDragStart={onPreventNestedDrag}
                        onPointerDown={onPreventNestedDrag}
                        checked={checked}
                        onChange={() => onToggleCoachAssignment(globalIndex, coachName)}
                        className="h-3.5 w-3.5 rounded border-zinc-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span>{coachName}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="shrink-0 self-start flex items-center gap-1.5">
          <button
            type="button"
            draggable
            onDragStart={() => onDragStart(globalIndex)}
            className="cursor-grab rounded border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-500 transition hover:border-zinc-400 active:cursor-grabbing"
            title="Dra for å flytte øvelsen"
            aria-label={`Dra ${block.exercise.name}`}
          >
            ::
          </button>
          <input
            type="number"
            draggable={false}
            onDragStart={onPreventNestedDrag}
            onPointerDown={onPreventNestedDrag}
            min={1}
            max={99}
            value={recommendedDuration(block)}
            onChange={(event) => onDurationChange(globalIndex, Number(event.target.value))}
            className="w-12 rounded border border-zinc-200 px-1.5 py-1 text-center text-xs focus:border-black focus:outline-none"
          />
          <select
            draggable={false}
            onDragStart={onPreventNestedDrag}
            onPointerDown={onPreventNestedDrag}
            value={getUnit(block)}
            onChange={(event) => onUnitChange(globalIndex, event.target.value as DurationUnit)}
            className="cursor-pointer rounded border border-zinc-200 bg-white px-1 py-1 text-xs text-zinc-600 focus:border-black focus:outline-none"
          >
            <option value="min">min</option>
            <option value="reps">reps</option>
          </select>
          {!block.exercise.alwaysIncluded ? (
            <button
              onClick={() => onRemoveBlock(globalIndex)}
              className="rounded p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600"
              title="Fjern"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};