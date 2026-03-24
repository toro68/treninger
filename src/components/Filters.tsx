import { getSectionPlayerCounts, matchesExercisePlayerCountFilter, useSessionStore } from "@/store/sessionStore";
import { ExerciseSource, isTiimSituationalExercise } from "@/data/exercises";
import { useMemo, useState } from "react";
import { SearchField } from "@/components/SearchField";

export type SourceFilterValue = ExerciseSource | "egen" | "tiim-situasjon";
export type ThemeFilter = string[];
export type SourceFilter = SourceFilterValue[];

const MAX_VISIBLE_SOURCES = 8;
const MAX_VISIBLE_THEMES = 10;
const MAX_VISIBLE_TAGS = 8;

// Konfigurasjon for hver kilde
const sourceConfig: Record<string, { label: string; description: string; activeClass: string; dotClass: string }> = {
  egen: {
    label: "Egne",
    description: "Våre egne øvelser",
    activeClass: "border-zinc-600 bg-zinc-100 text-zinc-800",
    dotClass: "bg-zinc-600"
  },
  tiim: {
    label: "tiim.no",
    description: "Øvelser fra NFF",
    activeClass: "border-emerald-500 bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500"
  },
  "tiim-situasjon": {
    label: "Tiim situasjon",
    description: "Situasjonsøvelser fra tiim.no",
    activeClass: "border-emerald-700 bg-emerald-100 text-emerald-900",
    dotClass: "bg-emerald-700"
  },
  eggen: {
    label: "Eggen",
    description: "Knut Torbjørn Eggen",
    activeClass: "border-amber-500 bg-amber-50 text-amber-700",
    dotClass: "bg-amber-500"
  },
  godfoten: {
    label: "Godfoten",
    description: "Nils Arne Eggen",
    activeClass: "border-orange-500 bg-orange-50 text-orange-700",
    dotClass: "bg-orange-500"
  },
  dbu: {
    label: "DBU",
    description: "Den røde tråd",
    activeClass: "border-red-500 bg-red-50 text-red-700",
    dotClass: "bg-red-500"
  },
  rondo: {
    label: "DiBernardo",
    description: "The Science of Rondo",
    activeClass: "border-purple-500 bg-purple-50 text-purple-700",
    dotClass: "bg-purple-500"
  },
  hyballa: {
    label: "Hyballa",
    description: "German Passing Drills",
    activeClass: "border-blue-500 bg-blue-50 text-blue-700",
    dotClass: "bg-blue-500"
  },
  bangsbo: {
    label: "Bangsbo",
    description: "Forsvar",
    activeClass: "border-cyan-500 bg-cyan-50 text-cyan-700",
    dotClass: "bg-cyan-500"
  },
  dugger: {
    label: "Dugger",
    description: "World Class Defense",
    activeClass: "border-rose-500 bg-rose-50 text-rose-700",
    dotClass: "bg-rose-500"
  },
  drillo: {
    label: "Drillo",
    description: "Effektiv fotball",
    activeClass: "border-sky-600 bg-sky-50 text-sky-700",
    dotClass: "bg-sky-600"
  },
  prickett: {
    label: "Prickett",
    description: "3v3 Soccer Coaching",
    activeClass: "border-lime-500 bg-lime-50 text-lime-700",
    dotClass: "bg-lime-500"
  },
  "101youth": {
    label: "101 Youth",
    description: "Youth Football Coaching",
    activeClass: "border-orange-500 bg-orange-50 text-orange-700",
    dotClass: "bg-orange-500"
  },
  seeger: {
    label: "Seeger",
    description: "Soccer Games Compendium",
    activeClass: "border-indigo-500 bg-indigo-50 text-indigo-700",
    dotClass: "bg-indigo-500"
  },
  matkovich: {
    label: "Matkovich",
    description: "Elite Soccer Drills",
    activeClass: "border-teal-500 bg-teal-50 text-teal-700",
    dotClass: "bg-teal-500"
  },
  worldclass: {
    label: "50 Games",
    description: "50 Small-Sided Games",
    activeClass: "border-sky-500 bg-sky-50 text-sky-700",
    dotClass: "bg-sky-500"
  },
  uefa: {
    label: "UEFA",
    description: "UEFA A-analyser",
    activeClass: "border-blue-600 bg-blue-50 text-blue-700",
    dotClass: "bg-blue-600"
  },
  manc: {
    label: "ManC",
    description: "Manchester City Academy",
    activeClass: "border-sky-700 bg-sky-50 text-sky-800",
    dotClass: "bg-sky-700"
  }
};

export const Filters = ({
  activeThemes,
  onThemeChange,
  activeTags,
  onTagChange,
  sourceFilter,
  onSourceFilterChange,
  favoritesOnly,
  onFavoritesOnlyChange,
  filterByPlayerCount,
  onFilterByPlayerCountChange,
}: {
  activeThemes: ThemeFilter;
  onThemeChange: (value: ThemeFilter) => void;
  activeTags: string[];
  onTagChange: (value: string[]) => void;
  sourceFilter: SourceFilter;
  onSourceFilterChange: (value: SourceFilter) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (value: boolean) => void;
  filterByPlayerCount: boolean;
  onFilterByPlayerCountChange: (value: boolean) => void;
}) => {
  const [showAllSources, setShowAllSources] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const playerCount = useSessionStore((state) => state.playerCount);
  const keeperCount = useSessionStore((state) => state.keeperCount);
  const stationCount = useSessionStore((state) => state.stationCount);
  const planningSectionMode = useSessionStore((state) => state.planningSectionMode);
  const exerciseLibrary = useSessionStore((state) => state.exerciseLibrary);
  const favoriteIds = useSessionStore((state) => state.favoriteIds);
  const outfieldPlayerCount = Math.max(1, playerCount - keeperCount);
  const sectionPlayerCounts = useMemo(
    () => getSectionPlayerCounts(playerCount, planningSectionMode, stationCount, keeperCount),
    [playerCount, planningSectionMode, stationCount, keeperCount]
  );
  const sectionFilterLabel =
    sectionPlayerCounts.length === 1
      ? `${sectionPlayerCounts[0]} utespillere i seksjonen`
      : `${sectionPlayerCounts.join(" + ")} utespillere i seksjonen`;
  const hasSourceFilter = sourceFilter.length > 0;
  const hasThemeFilter = activeThemes.length > 0;

  const matchesSelectedSource = (exercise: { source?: ExerciseSource; sourceUrl?: string; tags?: string[]; name: string }) => {
    if (!hasSourceFilter) return true;
    const exerciseSource = exercise.source || "egen";
    return sourceFilter.some((filter) => {
      if (filter === "egen") {
        return !exercise.source;
      }
      if (filter === "tiim-situasjon") {
        return isTiimSituationalExercise({
          source: exercise.source,
          sourceUrl: exercise.sourceUrl,
          tags: exercise.tags,
          name: exercise.name,
        });
      }
      return exerciseSource === filter;
    });
  };

  const matchesSelectedTheme = (exercise: { theme: string }) =>
    !hasThemeFilter || activeThemes.includes(exercise.theme);

  const matchesFavoriteSelection = (exercise: { id: string }) =>
    !favoritesOnly || favoriteIds.has(exercise.id);

  // Tell øvelser per kilde
  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    exerciseLibrary.forEach((exercise) => {
      // "egen" er øvelser uten eksplisitt source
      const key = exercise.source || "egen";
      counts[key] = (counts[key] ?? 0) + 1;
      if (isTiimSituationalExercise(exercise)) {
        counts["tiim-situasjon"] = (counts["tiim-situasjon"] ?? 0) + 1;
      }
    });
    return counts;
  }, [exerciseLibrary]);

  // Beregn tilgjengelige temaer basert på kildefilter
  const availableThemes = useMemo(() => {
    const themeCounts: Record<string, number> = {};
    exerciseLibrary.forEach((exercise) => {
      if (
        filterByPlayerCount &&
        !matchesExercisePlayerCountFilter(exercise, playerCount, undefined, sectionPlayerCounts, keeperCount)
      ) {
        return;
      }
      
      // Filtrer på kilde
      if (!matchesSelectedSource(exercise)) return;
      
      const key = exercise.theme;
      themeCounts[key] = (themeCounts[key] ?? 0) + 1;
    });
    return Object.entries(themeCounts)
      .sort(([themeA], [themeB]) => {
        if (themeA === "rondo") return -1;
        if (themeB === "rondo") return 1;
        return themeA.localeCompare(themeB, "nb");
      })
      .map(([theme, count]) => ({ theme, count }));
  }, [exerciseLibrary, playerCount, sectionPlayerCounts, sourceFilter, hasSourceFilter, filterByPlayerCount, keeperCount]);

  const totalThemeCount = useMemo(
    () => availableThemes.reduce((sum, entry) => sum + entry.count, 0),
    [availableThemes]
  );
  const favoriteCount = useMemo(
    () => exerciseLibrary.filter((exercise) => favoriteIds.has(exercise.id)).length,
    [exerciseLibrary, favoriteIds]
  );
  const availableTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    exerciseLibrary.forEach((exercise) => {
      if (
        filterByPlayerCount &&
        !matchesExercisePlayerCountFilter(exercise, playerCount, undefined, sectionPlayerCounts, keeperCount)
      ) {
        return;
      }
      if (!matchesSelectedSource(exercise)) return;
      if (!matchesSelectedTheme(exercise)) return;
      if (!matchesFavoriteSelection(exercise)) return;

      for (const tag of exercise.tags ?? []) {
        tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
      }
    });

    return Object.entries(tagCounts)
      .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB, "nb"))
      .map(([tag, count]) => ({ tag, count }));
  }, [
    exerciseLibrary,
    playerCount,
    sectionPlayerCounts,
    keeperCount,
    filterByPlayerCount,
    favoritesOnly,
    favoriteIds,
    sourceFilter,
    activeThemes,
    hasSourceFilter,
    hasThemeFilter,
  ]);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const humanizeTag = (tag: string) =>
    tag
      .split("-")
      .map((segment) => (segment.length <= 3 || /^\d+$/.test(segment) ? segment.toUpperCase() : capitalize(segment)))
      .join(" ");

  // Kilder som skal vises (med antall > 0)
  const availableSources = useMemo(() => {
    return Object.entries(sourceConfig)
      .map(([key, config]) => ({
        key,
        ...config,
        count: sourceCounts[key] ?? 0,
        isActive: sourceFilter.includes(key as SourceFilterValue),
      }))
      .filter((entry) => entry.count > 0 || entry.isActive)
      .sort((a, b) => {
        if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
        if (a.count !== b.count) return b.count - a.count;
        return a.label.localeCompare(b.label, "nb");
      });
  }, [sourceCounts, sourceFilter]);

  const visibleSources = showAllSources ? availableSources : availableSources.slice(0, MAX_VISIBLE_SOURCES);
  const visibleThemes = showAllThemes ? availableThemes : availableThemes.slice(0, MAX_VISIBLE_THEMES);
  const visibleTags = showAllTags ? availableTags : availableTags.slice(0, MAX_VISIBLE_TAGS);

  const activeFilterSummary = useMemo(() => {
    const sourceLabels = sourceFilter.map((value) => sourceConfig[value]?.label ?? value);
    const themeLabels = activeThemes.map(capitalize);
    const tagLabels = activeTags.map(humanizeTag);
    const summary = [
      ...sourceLabels.map((label) => ({ key: `source-${label}`, label })),
      ...themeLabels.map((label) => ({ key: `theme-${label}`, label })),
      ...tagLabels.map((label) => ({ key: `tag-${label}`, label })),
    ];

    if (favoritesOnly) {
      summary.push({ key: "favorites", label: "Favoritter" });
    }
    if (filterByPlayerCount) {
      summary.push({ key: "players", label: sectionFilterLabel });
    }

    return summary;
  }, [sourceCounts]);

  const resetAllFilters = () => {
    onSourceFilterChange([]);
    onThemeChange([]);
    onTagChange([]);
    if (favoritesOnly) onFavoritesOnlyChange(false);
    if (filterByPlayerCount) onFilterByPlayerCountChange(false);
  };

  return (
    <div className="space-y-3">
      {/* Søk */}
      <SearchField />

      {activeFilterSummary.length > 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Aktive filtre</p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs text-zinc-500 underline-offset-2 hover:underline"
            >
              Nullstill alle
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {activeFilterSummary.map(({ key, label }) => (
              <span
                key={key}
                className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Kildefilter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Kilder</p>
          {availableSources.length > MAX_VISIBLE_SOURCES && (
            <button
              type="button"
              onClick={() => setShowAllSources((prev) => !prev)}
              className="text-xs text-zinc-500 underline-offset-2 hover:underline"
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
              onClick={() =>
                onSourceFilterChange(
                  isActive
                    ? sourceFilter.filter((value) => value !== key)
                    : [...sourceFilter, key as SourceFilterValue]
                )
              }
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
                isActive
                  ? activeClass
                  : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400"
              }`}
            >
              <span className={`inline-block h-2 w-2 rounded-full ${
                isActive ? dotClass : "bg-zinc-300"
              }`} />
              {label} ({count})
            </button>
          );
        })}
        {sourceFilter.length > 0 && (
          <button
            type="button"
            onClick={() => onSourceFilterChange([])}
            className="ml-1 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200 transition"
          >
            Vis alle
          </button>
        )}
        </div>
      </div>

      {/* Hurtigfiltre */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onFavoritesOnlyChange(!favoritesOnly)}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
            favoritesOnly
              ? "border-amber-500 bg-amber-50 text-amber-800 shadow-sm"
              : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 .75l2.072 4.2 4.636.674-3.354 3.268.792 4.618L8 11.332 3.854 13.51l.792-4.618L1.292 5.624l4.636-.674L8 .75Z" />
          </svg>
          {`Kun favoritter (${favoriteCount})`}
        </button>
        <button
          type="button"
          onClick={() => onFilterByPlayerCountChange(!filterByPlayerCount)}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
            filterByPlayerCount
              ? "border-black bg-black text-white shadow-sm"
              : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.156 11.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 1 2.015-1.043h4.032a2.5 2.5 0 0 1 2.015 1.043c.373.51.653 1.091.813 1.72A6.968 6.968 0 0 1 8 15a6.968 6.968 0 0 1-4.844-1.237Z" />
          </svg>
          Kun for {sectionFilterLabel}
        </button>
        {filterByPlayerCount && (
          <span className="text-xs text-zinc-500">
            {planningSectionMode === "stations"
              ? `(${outfieldPlayerCount} utespillere fordeles som ${sectionPlayerCounts.join(" + ")}${keeperCount > 0 ? `, + ${keeperCount} keepere` : ""})`
              : `(${outfieldPlayerCount} utespillere i én felles øvelse${keeperCount > 0 ? `, + ${keeperCount} keepere` : ""})`}
          </span>
        )}
      </div>
      
      {/* Tema filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Tema</p>
          {availableThemes.length > MAX_VISIBLE_THEMES && (
            <button
              type="button"
              onClick={() => setShowAllThemes((prev) => !prev)}
              className="text-xs text-zinc-500 underline-offset-2 hover:underline"
            >
              {showAllThemes ? "Vis færre" : `Vis alle (${availableThemes.length})`}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            key="alle"
            type="button"
            onClick={() => onThemeChange([])}
            className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
              !hasThemeFilter
                ? "border-black bg-black text-white shadow-sm"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
            }`}
          >
            {`Alle (${totalThemeCount})`}
          </button>
          {visibleThemes.map(({ theme, count }) => (
            <button
              key={theme}
              type="button"
              onClick={() =>
                onThemeChange(
                  activeThemes.includes(theme)
                    ? activeThemes.filter((value) => value !== theme)
                    : [...activeThemes, theme]
                )
              }
              className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
                activeThemes.includes(theme)
                  ? "border-black bg-black text-white shadow-sm"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
              }`}
            >
              {`${capitalize(theme)} (${count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Taggfilter */}
      {availableTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Tagger</p>
            <div className="flex items-center gap-3">
              {availableTags.length > MAX_VISIBLE_TAGS && (
                <button
                  type="button"
                  onClick={() => setShowAllTags((prev) => !prev)}
                  className="text-xs text-zinc-500 underline-offset-2 hover:underline"
                >
                  {showAllTags ? "Vis færre" : `Vis alle (${availableTags.length})`}
                </button>
              )}
              {activeTags.length > 0 && (
                <button
                  type="button"
                  onClick={() => onTagChange([])}
                  className="text-xs text-zinc-500 underline-offset-2 hover:underline"
                >
                  Nullstill tagger
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {visibleTags.map(({ tag, count }) => {
              const isActive = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    onTagChange(
                      isActive
                        ? activeTags.filter((value) => value !== tag)
                        : [...activeTags, tag]
                    )
                  }
                  className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition active:scale-95 ${
                    isActive
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
                  }`}
                  title={tag}
                >
                  {`${humanizeTag(tag)} (${count})`}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
