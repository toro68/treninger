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
    const exercise = state.exerciseLibrary.find((item) => item.category === "game");

    expect(exercise).toBeDefined();

    useSessionStore.setState({
      sessionTitle: "",
      sessionComment: "",
      playerCount: 12,
      stationCount: 3,
      planningSectionMode: "single",
      coachNames: ["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne"],
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(),
      plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
      savedSessions: [],
      activeSavedSessionId: null,
      highlightExerciseId: null,
      searchQuery: "",
    });
  });

  it("switches to explicit update mode after a session is saved", async () => {
    render(<SessionTimeline />);

    fireEvent.click(await screen.findByRole("button", { name: "Lagrede økter" }));
    fireEvent.change(screen.getByPlaceholderText("Navn på økten"), {
      target: { value: "Min lagrede økt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Lagre økt" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Oppdater lagret økt" })).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue("Min lagrede økt")).toBeInTheDocument();
    expect(screen.getByText(/Redigerer lagret økt:/)).toBeInTheDocument();
    expect(screen.getByText("Aktiv")).toBeInTheDocument();
  });

  it("shows the update form automatically when an active saved session exists", async () => {
    useSessionStore.setState({
      savedSessions: [
        {
          id: "saved-1",
          name: "Eksisterende økt",
          createdAt: "2026-03-17T10:00:00.000Z",
          updatedAt: "2026-03-17T10:05:00.000Z",
          playerCount: 12,
          stationCount: 3,
          coachNames: ["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne"],
          selectedExerciseIds: [],
          selectedTheoryIds: [],
          plannedBlocks: null,
        },
      ],
      activeSavedSessionId: "saved-1",
    });

    render(<SessionTimeline />);

    expect(await screen.findByRole("button", { name: "Oppdater lagret økt" })).toBeInTheDocument();
    expect(screen.getByDisplayValue("Eksisterende økt")).toBeInTheDocument();
    expect(screen.getByText(/Redigerer lagret økt:/)).toBeInTheDocument();
  });

  it("shows participating coaches in the session plan summary", async () => {
    render(<SessionTimeline />);

    await screen.findByRole("heading", { name: "Øktplan" });

    const coachSummary = screen.getByText("Trenere på økta").closest("div");

    expect(screen.getByText("12 spillere")).toBeInTheDocument();
    expect(coachSummary).not.toBeNull();
    expect(within(coachSummary!).getByText("Tor Inge")).toBeInTheDocument();
    expect(within(coachSummary!).getByText("Tor Harald")).toBeInTheDocument();
    expect(within(coachSummary!).getByText("Dawid")).toBeInTheDocument();
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

  it("includes the coach roster in the full session link", async () => {
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

    const copiedUrl = new URL(writeText.mock.calls[0][0]);
    const decoded = decodeSharedSessionToken(copiedUrl.searchParams.get("s"));

    expect(decoded?.coachNames).toEqual(["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne"]);
  });

  it("includes custom title and comments in the full session link", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<SessionTimeline />);

    fireEvent.change(await screen.findByLabelText("Økttittel"), {
      target: { value: "Kampforberedende økt" },
    });
    fireEvent.change(screen.getByLabelText("Kommentar til hele økta"), {
      target: { value: "Bruk ekstra tid på overgang til press." },
    });
    const mainExerciseName = useSessionStore.getState().plannedBlocks?.[0]?.exercise.name;
    expect(mainExerciseName).toBeDefined();

    const mainBlock = await screen.findByRole("group", {
      name: `${mainExerciseName} blokk`,
    });
    fireEvent.click(within(mainBlock).getByRole("button", { name: "Tilpass tekst" }));
    fireEvent.change(screen.getByLabelText("Egen tittel"), {
      target: { value: "Spill med aggressiv gjenvinning" },
    });
    fireEvent.change(screen.getByLabelText("Kommentar til blokka"), {
      target: { value: "To touch første fire minutter." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Del økt" }));
    fireEvent.click(screen.getByRole("button", { name: "Kopier lenke til fullversjon" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledTimes(1);
    });

    const copiedUrl = new URL(writeText.mock.calls[0][0]);
    const decoded = decodeSharedSessionToken(copiedUrl.searchParams.get("s"));
    const customizedBlock = decoded?.sessionBlocks.find(
      (block) => block.exercise.name === mainExerciseName
    );

    expect(decoded?.sessionTitle).toBe("Kampforberedende økt");
    expect(decoded?.sessionComment).toBe("Bruk ekstra tid på overgang til press.");
    expect(customizedBlock?.customTitle).toBe("Spill med aggressiv gjenvinning");
    expect(customizedBlock?.customComment).toBe("To touch første fire minutter.");
  });

  it("lets the user assign coaches to a block", async () => {
    render(<SessionTimeline />);

    const mainExerciseName = useSessionStore.getState().plannedBlocks?.[0]?.exercise.name;
    expect(mainExerciseName).toBeDefined();

    const mainBlock = await screen.findByRole("group", {
      name: `${mainExerciseName} blokk`,
    });
    const checkbox = within(mainBlock).getByRole("checkbox", { name: "Tor Inge" });
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

  it("does not show direct custom exercise entry in the session plan", async () => {
    render(<SessionTimeline />);

    await screen.findByRole("heading", { name: "Øktplan" });

    expect(screen.queryByRole("button", { name: "Ny øvelse" })).not.toBeInTheDocument();
    expect(screen.queryByText("Egen øvelse er lagt inn i øktplanen og lagret i biblioteket.")).not.toBeInTheDocument();
  });

  it("lets the user switch the next section to station mode", async () => {
    render(<SessionTimeline />);

    fireEvent.click(await screen.findByRole("button", { name: "4 stasjoner" }));

    expect(useSessionStore.getState().planningSectionMode).toBe("stations");
    expect(useSessionStore.getState().stationCount).toBe(4);
  });

  it("shows when a station section is still incomplete", async () => {
    const state = useSessionStore.getState();
    const fixedWarmup = state.exerciseLibrary.find(
      (item) => item.category === "fixed-warmup" && item.alwaysIncluded
    );
    const exercise = state.exerciseLibrary.find((item) => item.category === "game");

    expect(fixedWarmup).toBeDefined();
    expect(exercise).toBeDefined();

    useSessionStore.setState({
      planningSectionMode: "stations",
      stationCount: 4,
      selectedExerciseIds: new Set([exercise!.id]),
      plannedBlocks: [
        {
          id: fixedWarmup!.id,
          exercise: fixedWarmup!,
        },
        {
          id: exercise!.id,
          exercise: exercise!,
          planningMode: "station",
          sectionStationCount: 4,
        },
      ],
    });

    render(<SessionTimeline />);

    expect(await screen.findByText("Seksjonen er ikke ferdig ennå.")).toBeInTheDocument();
    expect(screen.getByText(/Neste valg blir stasjon 2/)).toBeInTheDocument();
    expect(screen.getByText("Stasjon 2")).toBeInTheDocument();
    expect(screen.getByText("Stasjon 4")).toBeInTheDocument();
  });

  it("lets the user explicitly start planning the next section", async () => {
    const state = useSessionStore.getState();
    const fixedWarmup = state.exerciseLibrary.find(
      (item) => item.category === "fixed-warmup" && item.alwaysIncluded
    );
    const exercise = state.exerciseLibrary.find((item) => item.category === "game");

    expect(fixedWarmup).toBeDefined();
    expect(exercise).toBeDefined();

    useSessionStore.setState({
      planningSectionMode: "stations",
      stationCount: 2,
      selectedExerciseIds: new Set([fixedWarmup!.id, exercise!.id]),
      plannedBlocks: [
        {
          id: fixedWarmup!.id,
          exercise: fixedWarmup!,
        },
        {
          id: exercise!.id,
          exercise: exercise!,
          planningMode: "station",
          sectionStationCount: 2,
        },
      ],
    });

    render(<SessionTimeline />);

    expect(await screen.findByRole("button", { name: "Fortsett seksjon 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start seksjon 3" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start seksjon 3" }));
    fireEvent.click(screen.getByRole("button", { name: "3 stasjoner" }));

    expect(screen.getByRole("heading", { name: "Seksjon 3" })).toBeInTheDocument();
    expect(screen.getByText("0/3 stasjoner valgt")).toBeInTheDocument();
    expect(screen.getByText(/Du planlegger neste seksjon eksplisitt/)).toBeInTheDocument();
    expect(screen.queryByText("Seksjonen er ikke ferdig ennå.")).not.toBeInTheDocument();
  });

  it("keeps the next section active when station count increases after a completed station section", async () => {
    const state = useSessionStore.getState();
    const fixedWarmup = state.exerciseLibrary.find(
      (item) => item.category === "fixed-warmup" && item.alwaysIncluded
    );
    const exercises = state.exerciseLibrary.filter((item) => item.category === "game");

    expect(fixedWarmup).toBeDefined();
    expect(exercises.length).toBeGreaterThanOrEqual(2);

    useSessionStore.setState({
      planningSectionMode: "stations",
      stationCount: 2,
      selectedExerciseIds: new Set([fixedWarmup!.id, exercises[0]!.id, exercises[1]!.id]),
      plannedBlocks: [
        {
          id: fixedWarmup!.id,
          exercise: fixedWarmup!,
        },
        {
          id: exercises[0]!.id,
          exercise: exercises[0]!,
          planningMode: "station",
          sectionStationCount: 2,
          stationRoundStart: true,
        },
        {
          id: exercises[1]!.id,
          exercise: exercises[1]!,
          planningMode: "station",
          sectionStationCount: 2,
        },
      ],
    });

    render(<SessionTimeline />);

    expect(await screen.findByRole("heading", { name: "Seksjon 3" })).toBeInTheDocument();
    expect(screen.queryByText("Seksjonen er ikke ferdig ennå.")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "3 stasjoner" }));

    expect(screen.getByRole("heading", { name: "Seksjon 3" })).toBeInTheDocument();
    expect(screen.getByText("0/3 stasjoner valgt")).toBeInTheDocument();
    expect(screen.getByText("Fordeling i denne seksjonen: 4 + 4 + 4 spillere.")).toBeInTheDocument();
    expect(screen.queryByText("Seksjonen er ikke ferdig ennå.")).not.toBeInTheDocument();
  });

});