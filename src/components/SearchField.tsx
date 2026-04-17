import { useSessionStore } from "@/store/sessionStore";
import { useDeferredValue, useEffect, useRef, useState } from "react";

export const SearchField = () => {
  const searchQuery = useSessionStore((state) => state.searchQuery);
  const setSearchQuery = useSessionStore((state) => state.setSearchQuery);
  const [draft, setDraft] = useState(searchQuery);
  const deferredDraft = useDeferredValue(draft);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === deferredDraft) return;
    setSearchQuery(deferredDraft);
  }, [deferredDraft, searchQuery, setSearchQuery]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
          return;
        }
      }
      event.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <label className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 shadow-sm focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-black/5">
      <span className="sr-only">Søk i øvelsesbiblioteket</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-zinc-400" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
      </svg>
      <input
        ref={inputRef}
        type="search"
        aria-label="Søk i øvelsesbiblioteket (trykk / for å fokusere)"
        placeholder="Søk etter øvelse, kode, tema, utstyr, tagg eller kilde"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && draft) {
            event.preventDefault();
            setDraft("");
          }
        }}
        className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
      />
      {draft ? (
        <button
          type="button"
          onClick={() => {
            setDraft("");
            inputRef.current?.focus();
          }}
          className="text-xs text-zinc-400 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1 rounded"
        >
          Nullstill
        </button>
      ) : (
        <kbd
          aria-hidden="true"
          className="hidden rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 sm:inline-block"
        >
          /
        </kbd>
      )}
    </label>
  );
};
