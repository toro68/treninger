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
}));

const renderFilters = (overrides: Partial<ComponentProps<typeof Filters>> = {}) => {
  const props = {
    activeTheme: "alle" as ThemeFilter,
    onThemeChange: vi.fn(),
    sourceFilter: null as SourceFilter,
    onSourceFilterChange: vi.fn(),
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
          exerciseLibrary: [
            {
              id: "1",
              name: "A1-A2 Situasjonsøvelse - 19",
              sourceUrl: "https://tiim.no/ovelse/a1-a2-situasjonsovelse-19",
              tags: [],
              theme: "rondo",
              source: "tiim",
              playersMin: 4,
              playersMax: 20,
            },
            { id: "2", theme: "pasning", source: "egen", playersMin: 4, playersMax: 20 },
            { id: "3", theme: "pasning", source: "egen", playersMin: 4, playersMax: 20 },
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
    expect(props.onThemeChange).toHaveBeenCalledWith("alle");
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
    expect(props.onSourceFilterChange).toHaveBeenCalledWith("egen");
  });

  it("should call onSourceFilterChange when clicking the Tiim situasjon chip", () => {
    const props = renderFilters();
    const situasjonButton = screen.getByText(/Tiim situasjon/);
    fireEvent.click(situasjonButton);
    expect(props.onSourceFilterChange).toHaveBeenCalledWith("tiim-situasjon");
  });
});

describe("Filter types", () => {
  it("should accept valid ThemeFilter values", () => {
    const themes: ThemeFilter[] = ["alle", "pasning", "press", "teknikk"];
    themes.forEach((theme) => {
      expect(typeof theme).toBe("string");
    });
  });

  it("should accept valid SourceFilter values", () => {
    const sources: SourceFilter[] = [null, "egen", "tiim", "tiim-situasjon", "dbu", "drillo", "uefa"];
    sources.forEach((source) => {
      expect(source === null || typeof source === "string").toBe(true);
    });
  });
});
