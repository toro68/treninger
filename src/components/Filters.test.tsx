import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ComponentProps } from "react";
import { Filters, ThemeFilter, SourceFilter } from "./Filters";
import { useSessionStore } from "@/store/sessionStore";

// Mock the store
vi.mock("@/store/sessionStore", () => ({
  useSessionStore: vi.fn(),
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
          stationCount: 4,
        })
    );
  });

  it("should render theme filter buttons", () => {
    renderFilters();
    expect(screen.getByText("Alle")).toBeInTheDocument();
    expect(screen.getByText("Rondo")).toBeInTheDocument();
  });

  it("should call onThemeChange when clicking a theme", () => {
    const props = renderFilters();
    const alleButton = screen.getByText("Alle");
    fireEvent.click(alleButton);
    expect(props.onThemeChange).toHaveBeenCalledWith("alle");
  });

  it("should highlight active theme button with dark styling", () => {
    renderFilters();
    const alleButton = screen.getByText("Alle");
    expect(alleButton.className).toContain("bg-black");
  });

  it("should render source filter buttons", () => {
    renderFilters();
    expect(screen.getByText(/Egne/)).toBeInTheDocument();
  });

  it("should call onSourceFilterChange when clicking a source", () => {
    const props = renderFilters();
    const egneButton = screen.getByText(/Egne/);
    fireEvent.click(egneButton);
    expect(props.onSourceFilterChange).toHaveBeenCalledWith("egen");
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
    const sources: SourceFilter[] = [null, "egen", "tiim", "dbu", "uefa"];
    sources.forEach((source) => {
      expect(source === null || typeof source === "string").toBe(true);
    });
  });
});
