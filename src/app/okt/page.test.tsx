import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createSharedSessionToken } from "@/utils/sessionShare";
import { allExercises } from "@/data/exercises";
import SharedSessionPage from "./page";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

const mockedUseSearchParams = vi.fn();

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useSearchParams: () => mockedUseSearchParams(),
  };
});

describe("SharedSessionPage", () => {
  it("shows section comments in the full session view", () => {
    const fixedWarmup = allExercises.find(
      (item) => item.category === "fixed-warmup" && item.alwaysIncluded
    );
    const exercise = allExercises.find((item) => item.category === "game");

    expect(fixedWarmup).toBeDefined();
    expect(exercise).toBeDefined();

    const token = createSharedSessionToken({
      sessionTitle: "Delt økt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(),
      plannedBlocks: [
        {
          id: fixedWarmup!.id,
          exercise: fixedWarmup!,
        },
        {
          id: exercise!.id,
          exercise: exercise!,
          sectionComment: "Begge banehalvdeler brukes.",
        },
      ],
      exerciseLibrary: allExercises,
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    expect(screen.getByText(/Kommentar til seksjon:/)).toBeInTheDocument();
    expect(screen.getByText(/Begge banehalvdeler brukes\./)).toBeInTheDocument();
  });

  it("shows custom alternative exercises from the shared library", () => {
    const exercise = allExercises.find((item) => item.category === "game");

    expect(exercise).toBeDefined();

    const alternativeCustomExercise = {
      id: "custom-full-alt",
      exerciseNumber: 950,
      name: "Alternativ delt spesialøvelse",
      category: "station" as const,
      duration: 11,
      playersMin: 6,
      playersMax: 10,
      theme: "pasning" as const,
      equipment: ["baller"],
      description: "Vises bare hvis shared library brukes i fullversjonen.",
      coachingPoints: [],
      variations: [],
      source: "egen" as const,
    };

    const token = createSharedSessionToken({
      sessionTitle: "Delt økt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(),
      plannedBlocks: [
        {
          id: exercise!.id,
          exercise: exercise!,
          alternativeExerciseIds: [alternativeCustomExercise.id],
        },
      ],
      exerciseLibrary: [...allExercises, alternativeCustomExercise],
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    expect(screen.getByText(/Alternativer til denne øvelsen/i)).toBeInTheDocument();
    expect(screen.getByText(/Alternativ delt spesialøvelse/)).toBeInTheDocument();
  });
});