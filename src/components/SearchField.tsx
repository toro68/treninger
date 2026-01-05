import { useSessionStore } from "@/store/sessionStore";
import { useDeferredValue, useEffect, useState } from "react";

export const SearchField = () => {
  const searchQuery = useSessionStore((state) => state.searchQuery);
  const setSearchQuery = useSessionStore((state) => state.setSearchQuery);
  const [draft, setDraft] = useState(searchQuery);
  const deferredDraft = useDeferredValue(draft);

  useEffect(() => {
    setDraft(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === deferredDraft) return;
    setSearchQuery(deferredDraft);
  }, [deferredDraft, searchQuery, setSearchQuery]);

  return (
    <label className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 shadow-sm focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-black/5">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-zinc-400" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
      </svg>
      <input
        type="search"
        placeholder="Søk etter øvelse, tema eller utstyr"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
      />
      {draft && (
        <button
          type="button"
          onClick={() => setDraft("")}
          className="text-xs text-zinc-400 hover:text-zinc-600"
        >
          Nullstill
        </button>
      )}
    </label>
  );
};
