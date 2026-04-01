import type { Exercise, ExerciseData, ExerciseSource } from "@/data/exercises";
import { isTiimSituationalExercise } from "@/data/exercises";
import { matchesExercisePlayerCountFilter, matchesExerciseSearchQuery } from "@/store/sessionStore";

export type SourceFilterValue = ExerciseSource | "egen" | "tiim-situasjon";
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
};

export const MAX_VISIBLE_SOURCES = 8;
export const MAX_VISIBLE_THEMES = 10;
export const MAX_VISIBLE_TAGS = 8;

export const FILTER_SOURCE_CONFIG = {
  egen: {
    label: "Egne",
    description: "Våre egne øvelser",
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

const matchesSelectedSource = (
  exercise: Pick<ExerciseData, "source" | "sourceUrl" | "tags" | "name">,
  sourceFilter: SourceFilter
) => {
  if (sourceFilter.length === 0) return true;

  const exerciseSource = exercise.source || "egen";
  return sourceFilter.some((filter) => {
    if (filter === "egen") {
      return !exercise.source;
    }
    if (filter === "tiim-situasjon") {
      return isTiimSituationalExercise(exercise);
    }
    return exerciseSource === filter;
  });
};

const matchesSelectedTheme = (exercise: Pick<ExerciseData, "theme">, activeThemes: ThemeFilter) =>
  activeThemes.length === 0 || activeThemes.includes(exercise.theme);

const matchesFavoriteSelection = (
  exercise: Pick<ExerciseData, "id">,
  favoritesOnly: boolean,
  favoriteIds: Set<string>
) => !favoritesOnly || favoriteIds.has(exercise.id);

type AvailableFacetOptions = {
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
};

const matchesSelectedTags = (
  exercise: Pick<ExerciseData, "tags">,
  activeTags: string[]
) => {
  if (activeTags.length === 0) return true;
  if (!exercise.tags || exercise.tags.length === 0) return false;
  return activeTags.every((tag) => exercise.tags?.includes(tag));
};

const matchesFacetExercise = (
  exercise: Exercise,
  {
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
  }: AvailableFacetOptions,
  ignore: {
    source?: boolean;
    themes?: boolean;
    tags?: boolean;
  } = {}
) => {
  if (
    filterByPlayerCount &&
    !matchesExercisePlayerCountFilter(
      exercise,
      playerCount,
      playersPerStation,
      sectionPlayerCounts,
      keeperCount
    )
  ) {
    return false;
  }
  if (!ignore.source && !matchesSelectedSource(exercise, sourceFilter)) return false;
  if (!ignore.themes && !matchesSelectedTheme(exercise, activeThemes)) return false;
  if (!ignore.tags && !matchesSelectedTags(exercise, activeTags)) return false;
  if (!matchesFavoriteSelection(exercise, favoritesOnly, favoriteIds)) return false;
  if (!matchesExerciseSearchQuery(exercise, searchQuery)) return false;
  return true;
};

export const getAvailableThemes = ({
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
}) => {
  const themeCounts: Record<string, number> = {};

  exerciseLibrary.forEach((exercise) => {
    if (
      !matchesFacetExercise(
        exercise,
        {
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
        },
        { themes: true }
      )
    ) {
      return;
    }

    themeCounts[exercise.theme] = (themeCounts[exercise.theme] ?? 0) + 1;
  });

  return Object.entries(themeCounts)
    .sort(([themeA], [themeB]) => {
      if (themeA === "rondo") return -1;
      if (themeB === "rondo") return 1;
      return themeA.localeCompare(themeB, "nb");
    })
    .map(([theme, count]) => ({ theme, count }));
};

export const getAvailableTags = ({
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
  const tagCounts: Record<string, number> = {};

  exerciseLibrary.forEach((exercise) => {
    if (
      !matchesFacetExercise(
        exercise,
        {
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
        },
        { tags: true }
      )
    ) {
      return;
    }

    for (const tag of exercise.tags ?? []) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  });

  return Object.entries(tagCounts)
    .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB, "nb"))
    .map(([tag, count]) => ({ tag, count }));
};

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
  const sourceCounts: Record<string, number> = {};

  exerciseLibrary.forEach((exercise) => {
    if (
      !matchesFacetExercise(
        exercise,
        {
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
        },
        { source: true }
      )
    ) {
      return;
    }

    const key = exercise.source || "egen";
    sourceCounts[key] = (sourceCounts[key] ?? 0) + 1;
    if (isTiimSituationalExercise(exercise)) {
      sourceCounts["tiim-situasjon"] = (sourceCounts["tiim-situasjon"] ?? 0) + 1;
    }
  });

  return Object.entries(FILTER_SOURCE_CONFIG)
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
  const sourceLabels = sourceFilter.map((value) => FILTER_SOURCE_CONFIG[value]?.label ?? value);
  const themeLabels = activeThemes.map(humanizeTheme);
  const tagLabels = activeTags.map(humanizeTag);
  const summary = [
    ...sourceLabels.map((label) => ({ key: `source-${label}`, label })),
    ...themeLabels.map((label) => ({ key: `theme-${label}`, label })),
    ...tagLabels.map((label) => ({ key: `tag-${label}`, label })),
  ];

  if (searchQuery.trim()) {
    summary.push({ key: "search", label: `Søk: ${searchQuery.trim()}` });
  }

  if (favoritesOnly) {
    summary.push({ key: "favorites", label: "Favoritter" });
  }
  if (filterByPlayerCount) {
    summary.push({ key: "players", label: sectionFilterLabel });
  }

  return summary;
};