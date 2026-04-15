import {
  type Exercise,
  type ExerciseData,
  type ExerciseSource,
  type ExerciseTheme,
  getExerciseCode,
  isTiimSituationalExercise,
} from "@/data/exercises";

import { matchesExercisePlayerCountFilter } from "./sessionPlayerCounts";

export type ExerciseFilterSource = Exclude<ExerciseSource, "egen"> | "tiim-situasjon";

const normalizeSearchText = (value: string) => value.trim().toLowerCase();

const compactSearchText = (value: string) =>
  normalizeSearchText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/[^a-z0-9]/g, "");

export const matchesExerciseSearchQuery = (exercise: Exercise, searchQuery?: string) => {
  const normalizedSearch = searchQuery ? normalizeSearchText(searchQuery) : "";
  if (!normalizedSearch) return true;

  const compactSearch = compactSearchText(searchQuery ?? "");
  const exerciseCode = getExerciseCode(exercise).toLowerCase();
  const haystackParts = [
    exercise.name,
    exercise.displayName,
    exercise.description,
    exercise.theme,
    exercise.tags?.join(" "),
    exercise.equipment?.join(" "),
    exercise.coachingPoints?.join(" "),
    exercise.variations?.join(" "),
    exercise.source,
    exercise.sourceRef,
    exerciseCode,
  ].filter((part): part is string => Boolean(part));

  const haystack = haystackParts.join(" ").toLowerCase();
  if (haystack.includes(normalizedSearch)) return true;
  if (!compactSearch) return false;

  const compactHaystack = haystackParts.map((part) => compactSearchText(part)).join("");
  return compactHaystack.includes(compactSearch);
};

const normalizeExerciseFilterSource = (
  source?: ExerciseData["source"]
): ExerciseFilterSource => (source === "egen" || source === "staal" || source === undefined ? "staal" : source);

export const getExerciseFilterSources = (
  exercise: Pick<ExerciseData, "source" | "sourceUrl" | "tags" | "name">
): ExerciseFilterSource[] => {
  const sources: ExerciseFilterSource[] = [normalizeExerciseFilterSource(exercise.source)];

  if (isTiimSituationalExercise(exercise)) {
    sources.push("tiim-situasjon");
  }

  return sources;
};

export const matchesSourceFilter = (
  exercise: Pick<ExerciseData, "source" | "sourceUrl" | "tags" | "name">,
  sourceFilter: ExerciseFilterSource[]
) => {
  if (sourceFilter.length === 0) return true;

  const exerciseSources = getExerciseFilterSources(exercise);
  return sourceFilter.some((filter) => exerciseSources.includes(filter));
};

export const matchesThemeFilter = (exercise: Pick<Exercise, "theme">, activeThemes: ExerciseTheme[]) =>
  activeThemes.length === 0 || activeThemes.includes(exercise.theme);

export const matchesFavoriteFilter = (
  exercise: Pick<ExerciseData, "id">,
  favoritesOnly: boolean,
  favoriteIds: Set<string>
) => !favoritesOnly || favoriteIds.has(exercise.id);

export type ExerciseFilterMatchOptions = {
  filterByPlayerCount: boolean;
  playerCount: number;
  playersPerStation?: number;
  sectionPlayerCounts?: number[];
  keeperCount: number;
  sourceFilter: ExerciseFilterSource[];
  activeThemes: ExerciseTheme[];
  favoritesOnly: boolean;
  favoriteIds: Set<string>;
  searchQuery: string;
  ignore?: {
    source?: boolean;
    themes?: boolean;
  };
};

export const matchesExerciseFilters = (
  exercise: Exercise,
  {
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
    ignore = {},
  }: ExerciseFilterMatchOptions
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
  if (!ignore.source && !matchesSourceFilter(exercise, sourceFilter)) return false;
  if (!ignore.themes && !matchesThemeFilter(exercise, activeThemes)) return false;
  if (!matchesFavoriteFilter(exercise, favoritesOnly, favoriteIds)) return false;
  if (!matchesExerciseSearchQuery(exercise, searchQuery)) return false;
  return true;
};
