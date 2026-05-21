import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createSharedSessionToken } from "@/utils/sessionShare";
import { allExercises } from "@/data/exercises";
import SharedSessionPage from "./page";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt ?? ""} {...props} />;
  },
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

  it("keeps coaching and variations collapsed in the full session view", () => {
    const exercise = {
      id: "custom-full-details",
      exerciseNumber: 951,
      name: "Fullvisning med lukkede detaljer",
      category: "game" as const,
      duration: 15,
      playersMin: 8,
      playersMax: 12,
      theme: "spill" as const,
      equipment: ["baller"],
      description: "Testøvelse i delt økt.",
      coachingPoints: ["Hold laget kompakt"],
      variations: ["Spill med maks to touch"],
      source: "egen" as const,
    };

    const token = createSharedSessionToken({
      sessionTitle: "Delt økt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set([exercise.id]),
      selectedTheoryIds: new Set(),
      plannedBlocks: [
        {
          id: exercise.id,
          exercise,
        },
      ],
      exerciseLibrary: [...allExercises, exercise],
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    const coachingSummary = screen.getByText("Coaching");
    const variationsSummary = screen.getByText("Variasjoner");
    const coachingSection = coachingSummary.closest("details");
    const variationsSection = variationsSummary.closest("details");
    const coachingPoint = screen.getByText("• Hold laget kompakt");
    const variation = screen.getByText("• Spill med maks to touch");

    expect(coachingSection).not.toHaveAttribute("open");
    expect(variationsSection).not.toHaveAttribute("open");
    expect(coachingPoint).not.toBeVisible();
    expect(variation).not.toBeVisible();

    fireEvent.click(coachingSummary);
    fireEvent.click(variationsSummary);

    expect(coachingSection).toHaveAttribute("open");
    expect(variationsSection).toHaveAttribute("open");
    expect(coachingPoint).toBeVisible();
    expect(variation).toBeVisible();
  });

  it("shows favorite alternatives in the full session view", () => {
    const favoriteExercise = allExercises.find((item) => item.category === "game");
    const alternativeFavoriteExercise = allExercises.find(
      (item) => item.category === "station" && item.id !== favoriteExercise?.id
    );

    expect(favoriteExercise).toBeDefined();
    expect(alternativeFavoriteExercise).toBeDefined();

    const token = createSharedSessionToken({
      sessionTitle: "Delt økt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set([favoriteExercise!.id]),
      selectedTheoryIds: new Set(),
      favoriteExerciseIds: new Set([favoriteExercise!.id, alternativeFavoriteExercise!.id]),
      plannedBlocks: [
        {
          id: favoriteExercise!.id,
          exercise: favoriteExercise!,
        },
      ],
      exerciseLibrary: allExercises,
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    const favoritesSummary = screen.getByText(`Favoritter og alternativer (2)`);
    const favoritesSection = favoritesSummary.closest("details");
    const alternativeName = within(favoritesSection!).getByText(
      new RegExp(alternativeFavoriteExercise!.name)
    );

    expect(favoritesSection).not.toHaveAttribute("open");
    expect(alternativeName).not.toBeVisible();

    fireEvent.click(favoritesSummary);

    expect(favoritesSection).toHaveAttribute("open");
    expect(screen.getByText("Tilgjengelige alternativer")).toBeInTheDocument();
    expect(alternativeName).toBeVisible();
  });
});