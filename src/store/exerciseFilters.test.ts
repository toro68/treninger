import { describe, it, expect } from "vitest";
import {
  matchesExerciseSearchQuery,
  matchesSourceFilter,
  matchesThemeFilter,
  matchesFavoriteFilter,
  matchesExerciseFilters,
  getExerciseFilterSources,
  toFilterArray,
} from "./exerciseFilters";
import type { Exercise } from "@/data/exercises";

const makeExercise = (overrides: Partial<Exercise>): Exercise => ({
  id: "test-1",
  exerciseNumber: 1,
  name: "Default name",
  category: "station",
  duration: 10,
  playersMin: 4,
  playersMax: 12,
  theme: "pasning",
  equipment: [],
  description: "",
  coachingPoints: [],
  variations: [],
  ...overrides,
});

describe("matchesExerciseSearchQuery", () => {
  it("should match on name", () => {
    const exercise = makeExercise({ name: "Rondo 4v2" });
    expect(matchesExerciseSearchQuery(exercise, "rondo")).toBe(true);
  });

  it("should match on displayName", () => {
    const exercise = makeExercise({
      name: "ManC-AP-01 Oppbygging gjennom sidediamant",
      displayName: "Støttevinkler og spill gjennom sonene (s. 53)",
    });
    expect(matchesExerciseSearchQuery(exercise, "Støttevinkler")).toBe(true);
    expect(matchesExerciseSearchQuery(exercise, "sonene")).toBe(true);
  });

  it("should match displayName with diacritic-insensitive search", () => {
    const exercise = makeExercise({
      name: "ManC-AP-01",
      displayName: "Figur 8 pasningsdiamant med fri beslutningstaking",
    });
    expect(matchesExerciseSearchQuery(exercise, "pasningsdiamant")).toBe(true);
  });

  it("should return true for empty search query", () => {
    const exercise = makeExercise({});
    expect(matchesExerciseSearchQuery(exercise, "")).toBe(true);
    expect(matchesExerciseSearchQuery(exercise, undefined)).toBe(true);
  });

  it("should not match when query is absent from all fields", () => {
    const exercise = makeExercise({ name: "Rondo 4v2" });
    expect(matchesExerciseSearchQuery(exercise, "pressing")).toBe(false);
  });
});

const defaultFilterOptions = {
  filterByPlayerCount: false,
  playerCount: 10,
  keeperCount: 0,
  sourceFilter: [],
  activeThemes: [],
  favoritesOnly: false,
  favoriteIds: new Set<string>(),
  searchQuery: "",
};

describe("getExerciseFilterSources", () => {
  it("should normalize 'egen' to 'staal'", () => {
    const sources = getExerciseFilterSources({ source: "egen", name: "Test" });
    expect(sources).toEqual(["staal"]);
  });

  it("should normalize undefined to 'staal'", () => {
    const sources = getExerciseFilterSources({ source: undefined, name: "Test" });
    expect(sources).toEqual(["staal"]);
  });

  it("should keep explicit source", () => {
    const sources = getExerciseFilterSources({ source: "dbu", name: "Test" });
    expect(sources).toEqual(["dbu"]);
  });

  it("should add 'tiim-situasjon' for tiim situational exercises", () => {
    const sources = getExerciseFilterSources({
      source: "tiim",
      name: "A1-A2 Situasjonsøvelse - 17",
      sourceUrl: "https://tiim.no/ovelse/a1-a2-situasjonsovelse-17",
    });
    expect(sources).toContain("tiim");
    expect(sources).toContain("tiim-situasjon");
  });
});

describe("matchesSourceFilter", () => {
  it("should match all when filter is empty", () => {
    const exercise = makeExercise({ source: "dbu" });
    expect(matchesSourceFilter(exercise, [])).toBe(true);
  });

  it("should match when exercise source is in filter", () => {
    const exercise = makeExercise({ source: "dbu" });
    expect(matchesSourceFilter(exercise, ["dbu"])).toBe(true);
  });

  it("should not match when exercise source is not in filter", () => {
    const exercise = makeExercise({ source: "dbu" });
    expect(matchesSourceFilter(exercise, ["tiim"])).toBe(false);
  });

  it("should match 'staal' for exercises with source 'egen'", () => {
    const exercise = makeExercise({ source: "egen" });
    expect(matchesSourceFilter(exercise, ["staal"])).toBe(true);
  });

  it("should match any of multiple filter values", () => {
    const exercise = makeExercise({ source: "dbu" });
    expect(matchesSourceFilter(exercise, ["tiim", "dbu"])).toBe(true);
  });
});

describe("matchesThemeFilter", () => {
  it("should match all when no themes are active", () => {
    const exercise = makeExercise({ theme: "pasning" });
    expect(matchesThemeFilter(exercise, [])).toBe(true);
  });

  it("should match when exercise theme is in active themes", () => {
    const exercise = makeExercise({ theme: "pressing" });
    expect(matchesThemeFilter(exercise, ["pressing"])).toBe(true);
  });

  it("should not match when exercise theme is not in active themes", () => {
    const exercise = makeExercise({ theme: "pasning" });
    expect(matchesThemeFilter(exercise, ["pressing"])).toBe(false);
  });

  it("should match any of multiple active themes", () => {
    const exercise = makeExercise({ theme: "pasning" });
    expect(matchesThemeFilter(exercise, ["pressing", "pasning"])).toBe(true);
  });
});

describe("matchesFavoriteFilter", () => {
  it("should match all when favoritesOnly is false", () => {
    const exercise = makeExercise({ id: "ex-1" });
    expect(matchesFavoriteFilter(exercise, false, new Set())).toBe(true);
  });

  it("should match favorite when favoritesOnly is true", () => {
    const exercise = makeExercise({ id: "ex-1" });
    expect(matchesFavoriteFilter(exercise, true, new Set(["ex-1"]))).toBe(true);
  });

  it("should not match non-favorite when favoritesOnly is true", () => {
    const exercise = makeExercise({ id: "ex-1" });
    expect(matchesFavoriteFilter(exercise, true, new Set(["ex-2"]))).toBe(false);
  });
});

describe("matchesExerciseFilters", () => {
  it("should match when all filters are neutral", () => {
    const exercise = makeExercise({});
    expect(matchesExerciseFilters(exercise, defaultFilterOptions)).toBe(true);
  });

  it("should reject when source filter does not match", () => {
    const exercise = makeExercise({ source: "dbu" });
    expect(
      matchesExerciseFilters(exercise, { ...defaultFilterOptions, sourceFilter: ["tiim"] })
    ).toBe(false);
  });

  it("should reject when theme filter does not match", () => {
    const exercise = makeExercise({ theme: "pasning" });
    expect(
      matchesExerciseFilters(exercise, { ...defaultFilterOptions, activeThemes: ["pressing"] })
    ).toBe(false);
  });

  it("should reject when favorite filter does not match", () => {
    const exercise = makeExercise({ id: "ex-1" });
    expect(
      matchesExerciseFilters(exercise, { ...defaultFilterOptions, favoritesOnly: true })
    ).toBe(false);
  });

  it("should reject when search query does not match", () => {
    const exercise = makeExercise({ name: "Rondo 4v2" });
    expect(
      matchesExerciseFilters(exercise, { ...defaultFilterOptions, searchQuery: "pressing" })
    ).toBe(false);
  });

  it("should skip source filter when ignore.source is true", () => {
    const exercise = makeExercise({ source: "dbu" });
    expect(
      matchesExerciseFilters(exercise, {
        ...defaultFilterOptions,
        sourceFilter: ["tiim"],
        ignore: { source: true },
      })
    ).toBe(true);
  });

  it("should skip theme filter when ignore.themes is true", () => {
    const exercise = makeExercise({ theme: "pasning" });
    expect(
      matchesExerciseFilters(exercise, {
        ...defaultFilterOptions,
        activeThemes: ["pressing"],
        ignore: { themes: true },
      })
    ).toBe(true);
  });

  it("should combine all filters (match)", () => {
    const exercise = makeExercise({ id: "ex-1", source: "dbu", theme: "pressing", name: "Press høyt" });
    expect(
      matchesExerciseFilters(exercise, {
        ...defaultFilterOptions,
        sourceFilter: ["dbu"],
        activeThemes: ["pressing"],
        favoritesOnly: true,
        favoriteIds: new Set(["ex-1"]),
        searchQuery: "høyt",
      })
    ).toBe(true);
  });

  it("should combine all filters (reject on one mismatch)", () => {
    const exercise = makeExercise({ id: "ex-1", source: "dbu", theme: "pressing", name: "Press høyt" });
    expect(
      matchesExerciseFilters(exercise, {
        ...defaultFilterOptions,
        sourceFilter: ["dbu"],
        activeThemes: ["pressing"],
        favoritesOnly: true,
        favoriteIds: new Set(["ex-2"]), // wrong favorite
        searchQuery: "høyt",
      })
    ).toBe(false);
  });

  it("should skip player count filter when ignore.playerCount is true", () => {
    const exercise = makeExercise({ playersMin: 20, playersMax: 30 });
    expect(
      matchesExerciseFilters(exercise, {
        ...defaultFilterOptions,
        filterByPlayerCount: true,
        playerCount: 8,
        ignore: { playerCount: true },
      })
    ).toBe(true);
  });

  it("should skip favorite filter when ignore.favorites is true", () => {
    const exercise = makeExercise({ id: "ex-1" });
    expect(
      matchesExerciseFilters(exercise, {
        ...defaultFilterOptions,
        favoritesOnly: true,
        favoriteIds: new Set(["ex-2"]),
        ignore: { favorites: true },
      })
    ).toBe(true);
  });

  it("should skip search filter when ignore.search is true", () => {
    const exercise = makeExercise({ name: "Rondo 4v2" });
    expect(
      matchesExerciseFilters(exercise, {
        ...defaultFilterOptions,
        searchQuery: "pressing",
        ignore: { search: true },
      })
    ).toBe(true);
  });
});

describe("toFilterArray", () => {
  it("should return empty array for null/undefined", () => {
    expect(toFilterArray(null)).toEqual([]);
    expect(toFilterArray(undefined)).toEqual([]);
  });

  it("should wrap single value in array", () => {
    expect(toFilterArray("dbu")).toEqual(["dbu"]);
  });

  it("should pass arrays through unchanged", () => {
    expect(toFilterArray(["dbu", "tiim"])).toEqual(["dbu", "tiim"]);
    expect(toFilterArray<string>([])).toEqual([]);
  });
});

describe("matchesExerciseSearchQuery field coverage", () => {
  // Guard: sikrer at alle relevante string-felter er inkludert i søk.
  // Hvis et nytt felt legges til, oppdater matchesExerciseSearchQuery OG denne testen.
  const SEARCHABLE_FIELDS: Array<{
    field: keyof Exercise;
    build: (token: string) => Partial<Exercise>;
  }> = [
    { field: "name", build: (t) => ({ name: `Base ${t}` }) },
    { field: "displayName", build: (t) => ({ displayName: `Base ${t}` }) },
    { field: "description", build: (t) => ({ description: `Tekst ${t}` }) },
    { field: "theme", build: (t) => ({ theme: t as Exercise["theme"] }) },
    { field: "tags", build: (t) => ({ tags: [t] }) },
    { field: "equipment", build: (t) => ({ equipment: [t] }) },
    { field: "coachingPoints", build: (t) => ({ coachingPoints: [t] }) },
    { field: "variations", build: (t) => ({ variations: [t] }) },
    { field: "source", build: (t) => ({ source: t as Exercise["source"] }) },
    { field: "sourceRef", build: (t) => ({ sourceRef: t }) },
  ];

  it.each(SEARCHABLE_FIELDS)("should match on $field", ({ field, build }) => {
    const token = `unik${String(field)}token`;
    const exercise = makeExercise(build(token));
    expect(matchesExerciseSearchQuery(exercise, token)).toBe(true);
  });
});
