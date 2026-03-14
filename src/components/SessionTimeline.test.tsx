import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SessionTimeline } from "./SessionTimeline";
import { useSessionStore } from "@/store/sessionStore";
import { decodeSharedSessionToken } from "@/utils/sessionShare";

describe("SessionTimeline sharing", () => {
  beforeEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();

    const state = useSessionStore.getState();
    const exercise = state.exerciseLibrary.find((item) => item.category !== "fixed-warmup");

    expect(exercise).toBeDefined();

    useSessionStore.setState({
      playerCount: 12,
      stationCount: 3,
      coachNames: ["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne"],
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(),
      plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
      savedSessions: [],
      highlightExerciseId: null,
      searchQuery: "",
    });
  });

  it("copies the short session summary to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<SessionTimeline />);

    fireEvent.click(await screen.findByRole("button", { name: "Del økt" }));
    fireEvent.click(screen.getByRole("button", { name: "Kopier kompakt tekst" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });

    expect(writeText.mock.calls[0][0]).toContain("Treningsøkt (");
    expect(writeText.mock.calls[0][0]).toContain("1. [");
    expect(screen.getByText("Kopiert til utklippstavle")).toBeInTheDocument();
  });

  it("shows an error when clipboard is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    render(<SessionTimeline />);

    fireEvent.click(await screen.findByRole("button", { name: "Del økt" }));
    fireEvent.click(screen.getByRole("button", { name: "Kopier kompakt tekst" }));

    await waitFor(() => {
      expect(screen.getByText("Kunne ikke dele")).toBeInTheDocument();
    });
  });

  it("copies a full session link", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<SessionTimeline />);

    fireEvent.click(await screen.findByRole("button", { name: "Del økt" }));
    fireEvent.click(screen.getByRole("button", { name: "Kopier lenke til fullversjon" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });

    expect(writeText.mock.calls[0][0]).toContain("/okt?s=");
    expect(screen.getByText("Kopiert til utklippstavle")).toBeInTheDocument();
  });

  it("includes selected theory in the full session link", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<SessionTimeline />);

    fireEvent.click(await screen.findByLabelText(/Se før du får ballen/i));
    fireEvent.click(screen.getByRole("button", { name: "Del økt" }));
    fireEvent.click(screen.getByRole("button", { name: "Kopier lenke til fullversjon" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });

    const copiedUrl = new URL(writeText.mock.calls[0][0]);
    const decoded = decodeSharedSessionToken(copiedUrl.searchParams.get("s"));

    expect(decoded?.selectedTheoryIds.has("theory-scan-before-ball")).toBe(true);
  });

  it("lets the user assign coaches to a block", async () => {
    render(<SessionTimeline />);

    const blocks = await screen.findAllByRole("group");
    const checkbox = within(blocks[1]).getByRole("checkbox", { name: "Tor Inge" });
    fireEvent.click(checkbox);

    expect(screen.getAllByText("Tor Inge").length).toBeGreaterThan(0);
    expect(useSessionStore.getState().plannedBlocks?.[0].assignedCoachNames).toEqual(["Tor Inge"]);
  });

  it("includes coach assignments in the shared full session link", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    act(() => {
      useSessionStore.setState((state) => ({
        plannedBlocks: state.plannedBlocks?.map((block, index) =>
          index === 0 ? { ...block, assignedCoachNames: ["Rune", "John Arne"] } : block
        ) ?? null,
      }));
    });

    render(<SessionTimeline />);

    fireEvent.click(await screen.findByRole("button", { name: "Del økt" }));
    fireEvent.click(screen.getByRole("button", { name: "Kopier lenke til fullversjon" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });

    const copiedUrl = new URL(writeText.mock.calls[0][0]);
    const decoded = decodeSharedSessionToken(copiedUrl.searchParams.get("s"));

    expect(decoded?.sessionBlocks[0].assignedCoachNames).toEqual(["Rune", "John Arne"]);
  });
});