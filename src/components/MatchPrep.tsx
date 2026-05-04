"use client";

import { useEffect, useState } from "react";

import {
  checklistItems,
  drilloFocusItems,
  godfotenAttackPostulates,
  godfotenDefensePostulates,
  matchPrepFocusItems,
  rbkFocusItems,
  type MatchPrepFocusItem,
} from "@/data/kamp/matchPrep";

const storageKey = "match-prep-checked";

const readStoredChecked = () => {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  const stored = window.localStorage.getItem(storageKey);
  if (!stored) return new Set<string>();

  try {
    const parsed = JSON.parse(stored);
    return new Set<string>(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
};

const focusTextClassName = (isChecked: boolean) =>
  `text-xs ${isChecked ? "text-zinc-400 line-through" : "text-zinc-700"}`;

const MatchPrepFocusList = ({
  items,
  checked,
  onToggle,
  checkedClassName,
  uncheckedClassName,
}: {
  items: MatchPrepFocusItem[];
  checked: Set<string>;
  onToggle: (id: string) => void;
  checkedClassName: string;
  uncheckedClassName: string;
}) => (
  <div className="space-y-2">
    {items.map((item) => {
      const isChecked = checked.has(item.id);
      return (
        <label
          key={item.id}
          className={`block rounded-lg border px-3 py-2 cursor-pointer transition ${
            isChecked ? checkedClassName : uncheckedClassName
          }`}
        >
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(item.id)}
              className="mt-0.5 h-4 w-4 accent-black"
            />
            <p className={focusTextClassName(isChecked)}>{item.text}</p>
          </div>
        </label>
      );
    })}
  </div>
);

export const MatchPrep = () => {
  const [checked, setChecked] = useState<Set<string>>(readStoredChecked);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify([...checked]));
  }, [checked]);

  const toggleChecked = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setChecked(next);
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
          isOpen
            ? "border-sky-200/70 bg-gradient-to-r from-sky-50 to-blue-50"
            : "border-zinc-200 bg-white"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Kamp</h2>
          <p className="text-xs text-zinc-500">Fokus og huskeliste før avspark</p>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-700">
          {isOpen ? "Skjul" : "Vis"}
          <span className="text-lg leading-none">{isOpen ? "−" : "+"}</span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Huskeliste</h3>
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
              <ul className="text-xs text-zinc-700 space-y-1">
                {checklistItems.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Oppmann</h3>
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
              <p className="text-xs text-zinc-700">
                Kommunikasjon med dommer og motstander - kampvert
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Fokus</h3>
            <MatchPrepFocusList
              items={matchPrepFocusItems}
              checked={checked}
              onToggle={toggleChecked}
              checkedClassName="border-zinc-300 bg-zinc-50"
              uncheckedClassName="border-zinc-100 bg-white"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">RBK-fokus</h3>
            <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3">
              <MatchPrepFocusList
                items={rbkFocusItems}
                checked={checked}
                onToggle={toggleChecked}
                checkedClassName="border-amber-300 bg-amber-100/70"
                uncheckedClassName="border-amber-100 bg-white/80"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Godfoten: angrepspostulatene</h3>
            <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3">
              <MatchPrepFocusList
                items={godfotenAttackPostulates}
                checked={checked}
                onToggle={toggleChecked}
                checkedClassName="border-rose-300 bg-rose-100/70"
                uncheckedClassName="border-rose-100 bg-white/80"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Godfoten: forsvarspostulatene</h3>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
              <MatchPrepFocusList
                items={godfotenDefensePostulates}
                checked={checked}
                onToggle={toggleChecked}
                checkedClassName="border-emerald-300 bg-emerald-100/70"
                uncheckedClassName="border-emerald-100 bg-white/80"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-zinc-700 mb-2">Drillo: effektiv fotball</h3>
            <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3">
              <MatchPrepFocusList
                items={drilloFocusItems}
                checked={checked}
                onToggle={toggleChecked}
                checkedClassName="border-sky-300 bg-sky-100/70"
                uncheckedClassName="border-sky-100 bg-white/80"
              />
            </div>
          </div>

          {checked.size > 0 && (
            <button
              type="button"
              onClick={() => setChecked(new Set())}
              className="text-xs text-zinc-500 hover:underline"
            >
              Nullstill avhuking
            </button>
          )}
        </div>
      )}
    </section>
  );
};
