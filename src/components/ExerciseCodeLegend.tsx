"use client";

import { useState } from "react";

export const ExerciseCodeLegend = () => {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowLegend(!showLegend)}
        className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition"
        title="Øvelseskoder"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
        </svg>
        Koder
      </button>

      {showLegend && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowLegend(false)}
          />
          <div className="absolute left-0 top-full mt-2 z-50 w-56 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">Øvelseskoder</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded bg-amber-100 text-xs font-medium text-amber-700">F1</span>
                <span className="text-zinc-600">Fast oppvarming</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded bg-orange-100 text-xs font-medium text-orange-700">O1</span>
                <span className="text-zinc-600">Oppvarming</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded bg-sky-100 text-xs font-medium text-sky-700">S1</span>
                <span className="text-zinc-600">Stasjon</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded bg-emerald-100 text-xs font-medium text-emerald-700">K1</span>
                <span className="text-zinc-600">Kamp/spill</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded bg-rose-100 text-xs font-medium text-rose-700">A1</span>
                <span className="text-zinc-600">Avslutning</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-zinc-400">
              Bruk kodene for å finne øvelser i kortversjonen.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
