"use client";

import { useState } from "react";
import { getGlossaryTerm } from "@/data/glossaryTerms";

interface GlossaryTooltipProps {
  termId: string;
  children: React.ReactNode;
}

export const GlossaryTooltip = ({ termId, children }: GlossaryTooltipProps) => {
  const [open, setOpen] = useState(false);
  const term = getGlossaryTerm(termId);

  if (!term) {
    return <>{children}</>;
  }

  return (
    <span className="relative inline-flex items-center">
      <span className="mr-1">{children}</span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={`Forklaring: ${term.term}`}
        className="text-xs font-semibold text-blue-600 hover:text-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        ?
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-64 rounded-lg border border-zinc-200 bg-white p-3 text-left shadow-lg">
          <p className="text-xs font-semibold text-zinc-900">{term.term}</p>
          <p className="mt-1 text-xs text-zinc-700">{term.definition}</p>
          {term.example && (
            <p className="mt-1 text-[11px] text-zinc-500 italic">Eksempel: {term.example}</p>
          )}
        </div>
      )}
    </span>
  );
};
