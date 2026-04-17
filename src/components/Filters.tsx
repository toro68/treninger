import { useMemo, useState } from "react";

import { SearchField } from "@/components/SearchField";
import { getSectionPlayerCounts, useSessionStore } from "@/store/sessionStore";

import {
  type FacetFilterParams,
  getActiveFilterSummary,
  getAvailableSources,
  getAvailableThemes,
  getThemeResetCount,
  humanizeTheme,
  MAX_VISIBLE_SOURCES,
  MAX_VISIBLE_THEMES,
} from "./filtersShared";
import type { SourceFilter, SourceFilterValue, ThemeFilter } from "./filtersShared";

export type { SourceFilter, SourceFilterValue, ThemeFilter } from "./filtersShared";

type FiltersProps = {
  activeThemes: ThemeFilter;
  onThemeChange: (value: ThemeFilter) => void;
  sourceFilter: SourceFilter;
  onSourceFilterChange: (value: SourceFilter) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (value: boolean) => void;
  filterByPlayerCount: boolean;
  onFilterByPlayerCountChange: (value: boolean) => void;
};

export const Filters = ({
  activeThemes,
  onThemeChange,
  sourceFilter,
  onSourceFilterChange,
  favoritesOnly,
  onFavoritesOnlyChange,
  filterByPlayerCount,
  onFilterByPlayerCountChange,
}: FiltersProps) => {
  const [showAllSources, setShowAllSources] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const playerCount = useSessionStore((state) => state.playerCount);
  const keeperCount = useSessionStore((state) => state.keeperCount);
  const stationCount = useSessionStore((state) => state.stationCount);
  const planningSectionMode = useSessionStore((state) => state.planningSectionMode);
  const exerciseLibrary = useSessionStore((state) => state.exerciseLibrary);
  const favoriteIds = useSessionStore((state) => state.favoriteIds);
  const searchQuery = useSessionStore((state) => state.searchQuery);
  const setSearchQuery = useSessionStore((state) => state.setSearchQuery);
  const outfieldPlayerCount = Math.max(1, playerCount - keeperCount);
  const playersPerStation = stationCount > 0 ? Math.floor(outfieldPlayerCount / stationCount) : outfieldPlayerCount;
  const hasThemeFilter = activeThemes.length > 0;

  const sectionPlayerCounts = useMemo(
    () => getSectionPlayerCounts(playerCount, planningSectionMode, stationCount, keeperCount),
    [keeperCount, planningSectionMode, playerCount, stationCount]
  );

  const sectionFilterLabel =
    sectionPlayerCounts.length === 1
      ? `${sectionPlayerCounts[0]} utespillere i seksjonen`
      : `${sectionPlayerCounts.join(" + ")} utespillere i seksjonen`;

  const facetParams: FacetFilterParams = useMemo(
    () => ({
      exerciseLibrary,
      filterByPlayerCount,
      playerCount,
      playersPerStation,
      sectionPlayerCounts,
      keeperCount,
      sourceFilter,
      activeThemes,
      favoritesOnly,
      favoriteIds,
      searchQuery,
    }),
    [
      exerciseLibrary,
      filterByPlayerCount,
      playerCount,
      playersPerStation,
      sectionPlayerCounts,
      keeperCount,
      sourceFilter,
      activeThemes,
      favoritesOnly,
      favoriteIds,
      searchQuery,
    ]
  );

  const availableThemes = useMemo(
    () => getAvailableThemes(facetParams),
    [facetParams]
  );

  const totalThemeCount = useMemo(
    () => getThemeResetCount(facetParams),
    [facetParams]
  );

  const favoriteCount = useMemo(
    () => exerciseLibrary.filter((exercise) => favoriteIds.has(exercise.id)).length,
    [exerciseLibrary, favoriteIds]
  );

  const availableSources = useMemo(
    () => getAvailableSources(facetParams),
    [facetParams]
  );

  const visibleSources = showAllSources ? availableSources : availableSources.slice(0, MAX_VISIBLE_SOURCES);
  const visibleThemes = showAllThemes ? availableThemes : availableThemes.slice(0, MAX_VISIBLE_THEMES);

  const activeFilterSummary = useMemo(
    () =>
      getActiveFilterSummary({
        sourceFilter,
        activeThemes,
        searchQuery,
        favoritesOnly,
        filterByPlayerCount,
        sectionFilterLabel,
      }),
    [activeThemes, favoritesOnly, filterByPlayerCount, searchQuery, sectionFilterLabel, sourceFilter]
  );

  const resetAllFilters = () => {
    onSourceFilterChange([]);
    onThemeChange([]);
    if (favoritesOnly) onFavoritesOnlyChange(false);
    if (filterByPlayerCount) onFilterByPlayerCountChange(false);
    if (searchQuery) setSearchQuery("");
  };

  const removeActiveFilter = (entry: (typeof activeFilterSummary)[number]) => {
    switch (entry.kind) {
      case "source":
        onSourceFilterChange(sourceFilter.filter((value) => value !== entry.value));
        return;
      case "theme":
        onThemeChange(activeThemes.filter((value) => value !== entry.value));
        return;
      case "search":
        setSearchQuery("");
        return;
      case "favorites":
        onFavoritesOnlyChange(false);
        return;
      case "playerCount":
        onFilterByPlayerCountChange(false);
        return;
    }
  };

  return (
    <div className="space-y-3">
      <SearchField />

      {activeFilterSummary.length > 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Aktive filtre</p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs text-zinc-600 underline-offset-2 hover:underline"
            >
              Nullstill alle
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {activeFilterSummary.map((entry) => (
              <button
                key={entry.key}
                type="button"
                onClick={() => removeActiveFilter(entry)}
                className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1"
                aria-label={`Fjern filter ${entry.label}`}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Kilder</p>
          {availableSources.length > MAX_VISIBLE_SOURCES && (
            <button
              type="button"
              onClick={() => setShowAllSources((prev) => !prev)}
              className="text-xs text-zinc-600 underline-offset-2 hover:underline"
            >
              {showAllSources ? "Vis færre" : `Vis alle (${availableSources.length})`}
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {visibleSources.map(({ key, label, activeClass, dotClass, count }) => {
            const isActive = sourceFilter.includes(key as SourceFilterValue);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  onSourceFilterChange(
                    isActive
                      ? sourceFilter.filter((value) => value !== key)
                      : [...sourceFilter, key as SourceFilterValue]
                  )
                }
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1 sm:py-1.5 sm:text-sm ${
                  isActive ? activeClass : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                }`}
              >
                <span className={`inline-block h-2 w-2 rounded-full ${isActive ? dotClass : "bg-zinc-300"}`} />
                {label} ({count})
              </button>
            );
          })}
          {sourceFilter.length > 0 && (
            <button
              type="button"
              onClick={() => onSourceFilterChange([])}
              className="ml-1 text-xs text-zinc-500 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1"
            >
              Nullstill kilder
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={favoritesOnly}
          onClick={() => onFavoritesOnlyChange(!favoritesOnly)}
          className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1 sm:py-1.5 sm:text-sm ${
            favoritesOnly
              ? "border-amber-500 bg-amber-50 text-amber-800 shadow-sm"
              : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 .75l2.072 4.2 4.636.674-3.354 3.268.792 4.618L8 11.332 3.854 13.51l.792-4.618L1.292 5.624l4.636-.674L8 .75Z" />
          </svg>
          {`Kun favoritter (${favoriteCount})`}
        </button>
        <button
          type="button"
          aria-pressed={filterByPlayerCount}
          onClick={() => onFilterByPlayerCountChange(!filterByPlayerCount)}
          className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1 sm:py-1.5 sm:text-sm ${
            filterByPlayerCount
              ? "border-black bg-black text-white shadow-sm"
              : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.156 11.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 1 2.015-1.043h4.032a2.5 2.5 0 0 1 2.015 1.043c.373.51.653 1.091.813 1.72A6.968 6.968 0 0 1 8 15a6.968 6.968 0 0 1-4.844-1.237Z" />
          </svg>
          Filtrer på spillertall
        </button>
        {filterByPlayerCount && (
          <span className="text-xs text-zinc-600">
            {planningSectionMode === "stations"
              ? `(${outfieldPlayerCount} utespillere fordeles som ${sectionPlayerCounts.join(" + ")}${keeperCount > 0 ? `, + ${keeperCount} keepere` : ""})`
              : `(${outfieldPlayerCount} utespillere i én felles øvelse${keeperCount > 0 ? `, + ${keeperCount} keepere` : ""})`}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">Tema</p>
          {availableThemes.length > MAX_VISIBLE_THEMES && (
            <button
              type="button"
              onClick={() => setShowAllThemes((prev) => !prev)}
              className="text-xs text-zinc-600 underline-offset-2 hover:underline"
            >
              {showAllThemes ? "Vis færre" : `Vis alle (${availableThemes.length})`}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            key="alle"
            type="button"
            aria-pressed={!hasThemeFilter}
            onClick={() => onThemeChange([])}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1 sm:text-sm ${
              !hasThemeFilter
                ? "border-black bg-black text-white shadow-sm"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
            }`}
          >
            {`Alle (${totalThemeCount})`}
          </button>
          {visibleThemes.map(({ theme, count }) => {
            const isActive = activeThemes.includes(theme);
            return (
              <button
                key={theme}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  onThemeChange(
                    isActive
                      ? activeThemes.filter((value) => value !== theme)
                      : [...activeThemes, theme]
                  )
                }
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-1 sm:text-sm ${
                  isActive
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
                }`}
              >
                {`${humanizeTheme(theme)} (${count})`}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
