import { useSessionStore } from "@/store/sessionStore";

export const SearchField = () => {
  const searchQuery = useSessionStore((state) => state.searchQuery);
  const setSearchQuery = useSessionStore((state) => state.setSearchQuery);

  return (
    <label className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 shadow-sm focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-black/5">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-zinc-400" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
      </svg>
      <input
        type="search"
        placeholder="Søk etter øvelse, tema eller utstyr"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          className="text-xs text-zinc-400 hover:text-zinc-600"
        >
          Nullstill
        </button>
      )}
    </label>
  );
};
