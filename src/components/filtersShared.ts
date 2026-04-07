import type { Exercise } from "@/data/exercises";
import {
  type ExerciseFilterMatchOptions,
  type ExerciseFilterSource,
  getExerciseFilterSources,
  matchesExerciseFilters,
} from "@/store/exerciseFilters";

export type SourceFilterValue = ExerciseFilterSource;
export type ThemeFilter = string[];
export type SourceFilter = SourceFilterValue[];

type SourceConfigEntry = {
  label: string;
  description: string;
  activeClass: string;
  dotClass: string;
};

type FilterSummaryEntry = {
  key: string;
  label: string;
  kind: "source" | "theme" | "tag" | "search" | "favorites" | "playerCount";
  value?: string;
};

export const MAX_VISIBLE_SOURCES = 8;
export const MAX_VISIBLE_THEMES = 10;

export const FILTER_SOURCE_CONFIG = {
  staal: {
    label: "STAAL",
    description: "Våre egne øvelser",
    activeClass: "border-zinc-800 bg-zinc-100 text-zinc-900",
    dotClass: "bg-zinc-700",
  },
  egen: {
    label: "Egne",
    description: "Legacy-kilde for egne øvelser",
    activeClass: "border-zinc-600 bg-zinc-100 text-zinc-800",
    dotClass: "bg-zinc-600",
  },
  tiim: {
    label: "tiim.no",
    description: "Øvelser fra NFF",
    activeClass: "border-emerald-500 bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500",
  },
  "tiim-situasjon": {
    label: "Tiim situasjon",
    description: "Situasjonsøvelser fra tiim.no",
    activeClass: "border-emerald-700 bg-emerald-100 text-emerald-900",
    dotClass: "bg-emerald-700",
  },
  eggen: {
    label: "Eggen",
    description: "Knut Torbjørn Eggen",
    activeClass: "border-amber-500 bg-amber-50 text-amber-700",
    dotClass: "bg-amber-500",
  },
  godfoten: {
    label: "Godfoten",
    description: "Nils Arne Eggen",
    activeClass: "border-orange-500 bg-orange-50 text-orange-700",
    dotClass: "bg-orange-500",
  },
  dbu: {
    label: "DBU",
    description: "Den røde tråd",
    activeClass: "border-red-500 bg-red-50 text-red-700",
    dotClass: "bg-red-500",
  },
  rondo: {
    label: "DiBernardo",
    description: "The Science of Rondo",
    activeClass: "border-purple-500 bg-purple-50 text-purple-700",
    dotClass: "bg-purple-500",
  },
  hyballa: {
    label: "Hyballa",
    description: "German Passing Drills",
    activeClass: "border-blue-500 bg-blue-50 text-blue-700",
    dotClass: "bg-blue-500",
  },
  bangsbo: {
    label: "Bangsbo",
    description: "Forsvar",
    activeClass: "border-cyan-500 bg-cyan-50 text-cyan-700",
    dotClass: "bg-cyan-500",
  },
  dugger: {
    label: "Dugger",
    description: "World Class Defense",
    activeClass: "border-rose-500 bg-rose-50 text-rose-700",
    dotClass: "bg-rose-500",
  },
  drillo: {
    label: "Drillo",
    description: "Effektiv fotball",
    activeClass: "border-sky-600 bg-sky-50 text-sky-700",
    dotClass: "bg-sky-600",
  },
  prickett: {
    label: "Prickett",
    description: "3v3 Soccer Coaching",
    activeClass: "border-lime-500 bg-lime-50 text-lime-700",
    dotClass: "bg-lime-500",
  },
  "101youth": {
    label: "101 Youth",
    description: "Youth Football Coaching",
    activeClass: "border-orange-500 bg-orange-50 text-orange-700",
    dotClass: "bg-orange-500",
  },
  seeger: {
    label: "Seeger",
    description: "Soccer Games Compendium",
    activeClass: "border-indigo-500 bg-indigo-50 text-indigo-700",
    dotClass: "bg-indigo-500",
  },
  matkovich: {
    label: "Matkovich",
    description: "Elite Soccer Drills",
    activeClass: "border-teal-500 bg-teal-50 text-teal-700",
    dotClass: "bg-teal-500",
  },
  worldclass: {
    label: "50 Games",
    description: "50 Small-Sided Games",
    activeClass: "border-sky-500 bg-sky-50 text-sky-700",
    dotClass: "bg-sky-500",
  },
  uefa: {
    label: "UEFA",
    description: "UEFA A-analyser",
    activeClass: "border-blue-600 bg-blue-50 text-blue-700",
    dotClass: "bg-blue-600",
  },
  manc: {
    label: "ManC",
    description: "Manchester City Academy",
    activeClass: "border-sky-700 bg-sky-50 text-sky-800",
    dotClass: "bg-sky-700",
  },
} satisfies Record<SourceFilterValue, SourceConfigEntry>;

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const humanizeTag = (tag: string) =>
  tag
    .split("-")
    .map((segment) => (segment.length <= 3 || /^\d+$/.test(segment) ? segment.toUpperCase() : capitalize(segment)))
    .join(" ");

export const humanizeTheme = (theme: string) => capitalize(theme);

type AvailableFacetOptions = Omit<ExerciseFilterMatchOptions, "ignore"> & {
  exerciseLibrary: Exercise[];
};

const countFacetMatches = (
  exerciseLibrary: Exercise[],
  options: AvailableFacetOptions,
  ignore: {
    source?: boolean;
    themes?: boolean;
    tags?: boolean;
  } = {}
) =>
  exerciseLibrary.reduce(
    (count, exercise) => count + (matchesFacetExercise(exercise, options, ignore) ? 1 : 0),
    0
  );

type MultiSelectFacetEntry<Value extends string> = {
  value: Value;
  count: number;
  isActive: boolean;
};

const getNextClickFacetEntries = <Value extends string>({
  values,
  activeValues,
  buildOptions,
}: {
  values: Iterable<Value>;
  activeValues: Value[];
  buildOptions: (selectedValues: Value[]) => AvailableFacetOptions;
}): MultiSelectFacetEntry<Value>[] => {
  const activeValueSet = new Set(activeValues);
  const visibleValues = new Set(activeValues);
  for (const value of values) {
    visibleValues.add(value);
  }

  const currentCount = activeValues.length
    ? countFacetMatches(buildOptions(activeValues).exerciseLibrary, buildOptions(activeValues))
    : 0;

  return Array.from(visibleValues)
    .map((value) => {
      const selectedValues = activeValueSet.has(value) ? activeValues : [...activeValues, value];

      return {
        value,
        count: countFacetMatches(buildOptions(selectedValues).exerciseLibrary, buildOptions(selectedValues)),
        isActive: activeValueSet.has(value),
      };
    })
    .filter((entry) => entry.isActive || entry.count > currentCount);
};

const matchesFacetExercise = (
  exercise: Exercise,
  options: AvailableFacetOptions,
  ignore: {
    source?: boolean;
    themes?: boolean;
    tags?: boolean;
  } = {}
) => matchesExerciseFilters(exercise, { ...options, ignore });

const collectFacetValues = <Value extends string>({
  exerciseLibrary,
  options,
  ignore,
  getValues,
}: {
  exerciseLibrary: Exercise[];
  options: AvailableFacetOptions;
  ignore?: {
    source?: boolean;
    themes?: boolean;
    tags?: boolean;
  };
  getValues: (exercise: Exercise) => Iterable<Value>;
}) => {
  const visibleValues = new Set<Value>();

  exerciseLibrary.forEach((exercise) => {
    if (!matchesFacetExercise(exercise, options, ignore)) {
      return;
    }

    for (const value of getValues(exercise)) {
      visibleValues.add(value);
    }
  });

  return visibleValues;
};

export const getAvailableThemes = ({
  exerciseLibrary,
  filterByPlayerCount,
  playerCount,
  playersPerStation,
  sectionPlayerCounts,
  keeperCount,
  sourceFilter,
  activeThemes,
  activeTags,
  favoritesOnly,
  favoriteIds,
  searchQuery,
}: {
  exerciseLibrary: Exercise[];
  filterByPlayerCount: boolean;
  playerCount: number;
  playersPerStation?: number;
  sectionPlayerCounts: number[];
  keeperCount: number;
  sourceFilter: SourceFilter;
  activeThemes: ThemeFilter;
  activeTags: string[];
  favoritesOnly: boolean;
  favoriteIds: Set<string>;
  searchQuery: string;
}) => {
  const facetOptions = {
    exerciseLibrary,
    filterByPlayerCount,
    playerCount,
    playersPerStation,
    sectionPlayerCounts,
    keeperCount,
    sourceFilter,
    activeThemes,
    activeTags,
    favoritesOnly,
    favoriteIds,
    searchQuery,
  };
  const visibleThemes = new Set<string>();
  collectFacetValues({
    exerciseLibrary,
    options: facetOptions,
    ignore: { themes: true },
    getValues: (exercise) => [exercise.theme],
  }).forEach((theme) => {
    visibleThemes.add(theme);
  });

  return getNextClickFacetEntries({
    values: visibleThemes,
    activeValues: activeThemes,
    buildOptions: (selectedThemes) => ({
      ...facetOptions,
      activeThemes: selectedThemes,
    }),
  })
    .sort((a, b) => {
      const activeA = a.isActive;
      const activeB = b.isActive;
      if (activeA !== activeB) return activeA ? -1 : 1;
      if (a.value === "rondo") return -1;
      if (b.value === "rondo") return 1;
      return a.value.localeCompare(b.value, "nb");
    })
    .map(({ value, count }) => ({ theme: value, count }));
};

export const getThemeResetCount = ({
  exerciseLibrary,
  filterByPlayerCount,
  playerCount,
  playersPerStation,
  sectionPlayerCounts,
  keeperCount,
  sourceFilter,
  activeTags,
  favoritesOnly,
  favoriteIds,
  searchQuery,
}: {
  exerciseLibrary: Exercise[];
  filterByPlayerCount: boolean;
  playerCount: number;
  playersPerStation?: number;
  sectionPlayerCounts: number[];
  keeperCount: number;
  sourceFilter: SourceFilter;
  activeTags: string[];
  favoritesOnly: boolean;
  favoriteIds: Set<string>;
  searchQuery: string;
}) =>
  countFacetMatches(exerciseLibrary, {
    exerciseLibrary,
    filterByPlayerCount,
    playerCount,
    playersPerStation,
    sectionPlayerCounts,
    keeperCount,
    sourceFilter,
    activeThemes: [],
    activeTags,
    favoritesOnly,
    favoriteIds,
    searchQuery,
  });

export const getAvailableSources = ({
  exerciseLibrary,
  filterByPlayerCount,
  playerCount,
  playersPerStation,
  sectionPlayerCounts,
  keeperCount,
  sourceFilter,
  activeThemes,
  activeTags,
  favoritesOnly,
  favoriteIds,
  searchQuery,
}: {
  exerciseLibrary: Exercise[];
  filterByPlayerCount: boolean;
  playerCount: number;
  playersPerStation?: number;
  sectionPlayerCounts: number[];
  keeperCount: number;
  sourceFilter: SourceFilter;
  activeThemes: ThemeFilter;
  activeTags: string[];
  favoritesOnly: boolean;
  favoriteIds: Set<string>;
  searchQuery: string;
}) => {
  const facetOptions = {
    exerciseLibrary,
    filterByPlayerCount,
    playerCount,
    playersPerStation,
    sectionPlayerCounts,
    keeperCount,
    sourceFilter,
    activeThemes,
    activeTags,
    favoritesOnly,
    favoriteIds,
    searchQuery,
  };

  const visibleSources = collectFacetValues({
    exerciseLibrary,
    options: facetOptions,
    ignore: { source: true },
    getValues: (exercise) => getExerciseFilterSources(exercise),
  });

  return getNextClickFacetEntries({
    values: visibleSources,
    activeValues: sourceFilter,
    buildOptions: (selectedSources) => ({
      ...facetOptions,
      sourceFilter: selectedSources,
    }),
  })
    .map(({ value, count, isActive }) => ({
      key: value,
      ...FILTER_SOURCE_CONFIG[value],
      count,
      isActive,
    }))
    .sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      if (a.count !== b.count) return b.count - a.count;
      return a.label.localeCompare(b.label, "nb");
    });
};

export const getActiveFilterSummary = ({
  sourceFilter,
  activeThemes,
  activeTags,
  searchQuery,
  favoritesOnly,
  filterByPlayerCount,
  sectionFilterLabel,
}: {
  sourceFilter: SourceFilter;
  activeThemes: ThemeFilter;
  activeTags: string[];
  searchQuery: string;
  favoritesOnly: boolean;
  filterByPlayerCount: boolean;
  sectionFilterLabel: string;
}): FilterSummaryEntry[] => {
  const summary: FilterSummaryEntry[] = [
    ...sourceFilter.map((value) => ({
      key: `source-${value}`,
      label: FILTER_SOURCE_CONFIG[value]?.label ?? value,
      kind: "source" as const,
      value,
    })),
    ...activeThemes.map((value) => ({
      key: `theme-${value}`,
      label: humanizeTheme(value),
      kind: "theme" as const,
      value,
    })),
    ...activeTags.map((value) => ({
      key: `tag-${value}`,
      label: humanizeTag(value),
      kind: "tag" as const,
      value,
    })),
  ];

  if (searchQuery.trim()) {
    summary.push({ key: "search", label: `Søk: ${searchQuery.trim()}`, kind: "search" });
  }

  if (favoritesOnly) {
    summary.push({ key: "favorites", label: "Favoritter", kind: "favorites" });
  }

  if (filterByPlayerCount) {
    summary.push({ key: "players", label: sectionFilterLabel, kind: "playerCount" });
  }

  return summary;
};
