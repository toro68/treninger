import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ExerciseCard } from "./ExerciseCard";
import { useSessionStore } from "@/store/sessionStore";
import { buildSessionParts } from "@/utils/sessionParts";

describe("ExerciseCard", () => {
  beforeEach(() => {
    window.localStorage.removeItem("treninger-session");

    useSessionStore.setState({
      sessionTitle: "",
      sessionComment: "",
      playerCount: 12,
      stationCount: 2,
      nextSectionStationCount: 2,
      planningSectionMode: "single",
      planningSectionTarget: "auto",
      coachNames: ["Tor Inge", "Tor Harald", "Dawid", "Rune", "John Arne"],
      selectedExerciseIds: new Set(),
      selectedTheoryIds: new Set(),
      favoriteIds: new Set(),
      searchQuery: "",
      highlightExerciseId: null,
      plannedBlocks: null,
      customExercises: [],
      exerciseOverrides: {},
      savedSessions: [],
      activeSavedSessionId: null,
      exerciseLibrary: useSessionStore.getState().exerciseLibrary,
    });
  });

  it("shows station 1 of the next section when next-section planning is explicit", () => {
    const state = useSessionStore.getState();
    const fixedWarmup = state.exerciseLibrary.find(
      (exercise) => exercise.category === "fixed-warmup" && exercise.alwaysIncluded
    );
    const exercises = state.exerciseLibrary.filter(
      (exercise) => exercise.category === "game"
    );

    expect(fixedWarmup).toBeDefined();
    expect(exercises.length).toBeGreaterThanOrEqual(2);

    useSessionStore.setState({
      planningSectionMode: "stations",
      planningSectionTarget: "next-section",
      stationCount: 3,
      selectedExerciseIds: new Set([fixedWarmup!.id, exercises[0]!.id]),
      plannedBlocks: [
        {
          id: fixedWarmup!.id,
          exercise: fixedWarmup!,
        },
        {
          id: exercises[0]!.id,
          exercise: exercises[0]!,
          planningMode: "station",
          sectionStationCount: 3,
        },
      ],
    });

    render(<ExerciseCard exercise={exercises[1]!} />);

    expect(
      screen.getByRole("button", { name: "Legg til som stasjon 1 av 3" })
    ).toBeInTheDocument();
  });

  it("adds a new section from the card when next-section planning is explicit", () => {
    const state = useSessionStore.getState();
    const fixedWarmup = state.exerciseLibrary.find(
      (exercise) => exercise.category === "fixed-warmup" && exercise.alwaysIncluded
    );
    const exercises = state.exerciseLibrary.filter(
      (exercise) => exercise.category === "game"
    );

    expect(fixedWarmup).toBeDefined();
    expect(exercises.length).toBeGreaterThanOrEqual(2);

    useSessionStore.setState({
      planningSectionMode: "stations",
      planningSectionTarget: "next-section",
      stationCount: 3,
      selectedExerciseIds: new Set([fixedWarmup!.id, exercises[0]!.id]),
      plannedBlocks: [
        {
          id: fixedWarmup!.id,
          exercise: fixedWarmup!,
        },
        {
          id: exercises[0]!.id,
          exercise: exercises[0]!,
          planningMode: "station",
          sectionStationCount: 3,
        },
      ],
    });

    render(<ExerciseCard exercise={exercises[1]!} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Legg til som stasjon 1 av 3" })
    );

    const nextState = useSessionStore.getState();
    const parts = buildSessionParts(nextState.plannedBlocks ?? [], nextState.playerCount);

    expect(parts.map((part) => part.title)).toEqual([
      "1. Skadefri",
      "2. Stasjoner",
      "3. Stasjoner",
    ]);
    expect(parts[2]?.blocks[0]?.block.id).toBe(exercises[1]!.id);
    expect(parts[2]?.blocks[0]?.block.stationRoundStart).toBe(true);
    expect(nextState.planningSectionTarget).toBe("auto");
  });
});