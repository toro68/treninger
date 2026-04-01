import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ComponentProps } from "react";
import { Filters, ThemeFilter, SourceFilter } from "./Filters";
import { useSessionStore } from "@/store/sessionStore";

// Mock the store
vi.mock("@/store/sessionStore", () => ({
  useSessionStore: vi.fn(),
  getSectionPlayerCounts: (playerCount: number, planningSectionMode: "single" | "stations", stationCount: number) =>
    planningSectionMode === "stations"
      ? Array.from({ length: stationCount }, () => Math.floor(playerCount / stationCount))
      : [playerCount],
  matchesExercisePlayerCountFilter: () => true,
  matchesExerciseSearchQuery: (
    exercise: { name?: string; theme?: string; tags?: string[]; source?: string; sourceUrl?: string },
    searchQuery?: string
  ) => {
    if (!searchQuery) return true;
    const haystack = [
      exercise.name,
      exercise.theme,
      exercise.tags?.join(" "),
      exercise.source,
      exercise.sourceUrl,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(searchQuery.trim().toLowerCase());
  },
}));

const renderFilters = (overrides: Partial<ComponentProps<typeof Filters>> = {}) => {
  const props = {
    activeThemes: [] as ThemeFilter,
    onThemeChange: vi.fn(),
    activeTags: [] as string[],
    onTagChange: vi.fn(),
    sourceFilter: [] as SourceFilter,
    onSourceFilterChange: vi.fn(),
    favoritesOnly: false,
    onFavoritesOnlyChange: vi.fn(),
    filterByPlayerCount: false,
    onFilterByPlayerCountChange: vi.fn(),
    ...overrides,
  };

  render(<Filters {...props} />);
  return props;
};

describe("Filters", () => {
  const mockSetSearchQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (state: Record<string, unknown>) => unknown) =>
        selector({
          searchQuery: "",
          setSearchQuery: mockSetSearchQuery,
          playerCount: 16,
          keeperCount: 0,
          stationCount: 4,
          planningSectionMode: "single",
          favoriteIds: new Set(["2"]),
          exerciseLibrary: [
            {
              id: "1",
              name: "A1-A2 Situasjonsøvelse - 19",
              sourceUrl: "https://tiim.no/ovelse/a1-a2-situasjonsovelse-19",
              tags: ["tiim-source"],
              theme: "rondo",
              source: "tiim",
              playersMin: 4,
              playersMax: 20,
            },
            { id: "2", theme: "pasning", source: "egen", tags: ["pep-sessions-vol2", "combination-play"], playersMin: 4, playersMax: 20 },
            { id: "3", theme: "pasning", source: "egen", tags: ["pep-sessions-vol2"], playersMin: 4, playersMax: 20 },
          ],
        })
    );
  });

  it("should render theme filter buttons", () => {
    renderFilters();
    expect(screen.getByText("Alle (3)")).toBeInTheDocument();
    expect(screen.getByText("Rondo (1)")).toBeInTheDocument();
  });

  it("should call onThemeChange when clicking a theme", () => {
    const props = renderFilters();
    const alleButton = screen.getByText("Alle (3)");
    fireEvent.click(alleButton);
    expect(props.onThemeChange).toHaveBeenCalledWith([]);
  });

  it("should highlight active theme button with dark styling", () => {
    renderFilters();
    const alleButton = screen.getByText("Alle (3)");
    expect(alleButton.className).toContain("bg-black");
  });

  it("should render source filter buttons", () => {
    renderFilters();
    expect(screen.getByText(/Egne/)).toBeInTheDocument();
    expect(screen.getByText(/Tiim situasjon/)).toBeInTheDocument();
  });

  it("should call onSourceFilterChange when clicking a source", () => {
    const props = renderFilters();
    const egneButton = screen.getByText(/Egne/);
    fireEvent.click(egneButton);
    expect(props.onSourceFilterChange).toHaveBeenCalledWith(["egen"]);
  });

  it("should call onSourceFilterChange when clicking the Tiim situasjon chip", () => {
    const props = renderFilters();
    const situasjonButton = screen.getByText(/Tiim situasjon/);
    fireEvent.click(situasjonButton);
    expect(props.onSourceFilterChange).toHaveBeenCalledWith(["tiim-situasjon"]);
  });

  it("should add multiple source filters without replacing the first", () => {
    const props = renderFilters({ sourceFilter: ["egen"] });
    const situasjonButton = screen.getByText(/Tiim situasjon/);
    fireEvent.click(situasjonButton);
    expect(props.onSourceFilterChange).toHaveBeenCalledWith(["egen", "tiim-situasjon"]);
  });

  it("should add multiple theme filters without clearing existing ones", () => {
    const props = renderFilters({ activeThemes: ["rondo"] });
    const passingButton = screen.getByText("Pasning (2)");
    fireEvent.click(passingButton);
    expect(props.onThemeChange).toHaveBeenCalledWith(["rondo", "pasning"]);
  });

  it("should render favorites filter button with count", () => {
    renderFilters();
    expect(screen.getByText("Kun favoritter (1)")).toBeInTheDocument();
  });

  it("should call onFavoritesOnlyChange when clicking favorites filter", () => {
    const props = renderFilters();
    const favoritesButton = screen.getByText("Kun favoritter (1)");
    fireEvent.click(favoritesButton);
    expect(props.onFavoritesOnlyChange).toHaveBeenCalledWith(true);
  });

  it("should render available tag filters", () => {
    renderFilters();
    expect(screen.getByTitle("pep-sessions-vol2")).toBeInTheDocument();
    expect(screen.getByTitle("combination-play")).toBeInTheDocument();
  });

  it("should call onTagChange when clicking a tag filter", () => {
    const props = renderFilters();
    const tagButton = screen.getByTitle("combination-play");
    fireEvent.click(tagButton);
    expect(props.onTagChange).toHaveBeenCalledWith(["combination-play"]);
  });

  it("should clear search query when resetting all filters", () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (state: Record<string, unknown>) => unknown) =>
        selector({
          searchQuery: "rondo",
          setSearchQuery: mockSetSearchQuery,
          playerCount: 16,
          keeperCount: 0,
          stationCount: 4,
          planningSectionMode: "single",
          favoriteIds: new Set(["2"]),
          exerciseLibrary: [
            {
              id: "1",
              name: "A1-A2 Situasjonsovelse - 19",
              sourceUrl: "https://tiim.no/ovelse/a1-a2-situasjonsovelse-19",
              tags: ["tiim-source"],
              theme: "rondo",
              source: "tiim",
              playersMin: 4,
              playersMax: 20,
            },
          ],
        })
    );

    const props = renderFilters({ favoritesOnly: true, filterByPlayerCount: true, activeThemes: ["rondo"], activeTags: ["tiim-source"], sourceFilter: ["tiim"] });
    fireEvent.click(screen.getByText("Nullstill alle"));

    expect(props.onSourceFilterChange).toHaveBeenCalledWith([]);
    expect(props.onThemeChange).toHaveBeenCalledWith([]);
    expect(props.onTagChange).toHaveBeenCalledWith([]);
    expect(props.onFavoritesOnlyChange).toHaveBeenCalledWith(false);
    expect(props.onFilterByPlayerCountChange).toHaveBeenCalledWith(false);
    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
  });

  it("should make theme and source counts respect the active search query", () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (state: Record<string, unknown>) => unknown) =>
        selector({
          searchQuery: "situasjon",
          setSearchQuery: mockSetSearchQuery,
          playerCount: 16,
          keeperCount: 0,
          stationCount: 4,
          planningSectionMode: "single",
          favoriteIds: new Set(["2"]),
          exerciseLibrary: [
            {
              id: "1",
              name: "A1-A2 Situasjonsovelse - 19",
              sourceUrl: "https://tiim.no/ovelse/a1-a2-situasjonsovelse-19",
              tags: ["tiim-source"],
              theme: "rondo",
              source: "tiim",
              playersMin: 4,
              playersMax: 20,
            },
            {
              id: "2",
              name: "Pasningssirkel",
              theme: "pasning",
              source: "egen",
              tags: ["pep-sessions-vol2", "combination-play"],
              playersMin: 4,
              playersMax: 20,
            },
          ],
        })
    );

    renderFilters();

    expect(screen.getByText("Alle (1)")).toBeInTheDocument();
    expect(screen.getByText("Rondo (1)")).toBeInTheDocument();
    expect(screen.queryByText("Pasning (1)")).not.toBeInTheDocument();
    expect(screen.queryByText(/Egne/)).not.toBeInTheDocument();
    expect(screen.getByText(/tiim.no \(1\)/i)).toBeInTheDocument();
  });
});

describe("Filter types", () => {
  it("should accept valid ThemeFilter values", () => {
    const themes: ThemeFilter = ["pasning", "press", "teknikk"];
    expect(Array.isArray(themes)).toBe(true);
  });

  it("should accept valid SourceFilter values", () => {
    const sources: SourceFilter = ["egen", "tiim", "tiim-situasjon", "dbu", "drillo", "uefa"];
    expect(Array.isArray(sources)).toBe(true);
  });
});
