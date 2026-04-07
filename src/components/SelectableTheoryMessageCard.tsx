"use client";

import { useSessionStore } from "@/store/sessionStore";

type SelectableTheoryMessageCardProps = {
  theoryId: string;
  title: string;
  summary: string;
  playerMessage?: string;
  sourceLabel?: string;
  showPlayerMessage?: boolean;
};

export const SelectableTheoryMessageCard = ({
  theoryId,
  title,
  summary,
  playerMessage,
  sourceLabel,
  showPlayerMessage = true,
}: SelectableTheoryMessageCardProps) => {
  const selectedTheoryIds = useSessionStore((state) => state.selectedTheoryIds);
  const toggleTheory = useSessionStore((state) => state.toggleTheory);
  const checked = selectedTheoryIds.has(theoryId);

  return (
    <article
      className={`rounded-2xl border p-4 transition ${
        checked
          ? "border-sky-300 bg-white shadow-sm"
          : "border-sky-200 bg-sky-50/70 hover:border-sky-300"
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggleTheory(theoryId)}
          className="mt-0.5 h-4 w-4 rounded border-sky-300 text-sky-600 focus:ring-sky-500"
        />
        <span className="min-w-0 flex-1">
          {sourceLabel ? (
            <span className="block text-xs font-semibold uppercase tracking-wide text-sky-700">
              {sourceLabel}
            </span>
          ) : null}
          <span className="mt-0.5 block text-sm font-semibold text-zinc-900">{title}</span>
          <span className="mt-1 block text-xs leading-5 text-zinc-600">{summary}</span>
          {showPlayerMessage && playerMessage ? (
            <span className="mt-2 block text-sm leading-6 text-zinc-700">{playerMessage}</span>
          ) : null}
        </span>
      </label>
    </article>
  );
};
