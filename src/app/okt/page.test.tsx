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
  it("marks station sections as simultaneous in the full session view", () => {
    const stationExercises = allExercises.filter((item) => item.category === "station");

    expect(stationExercises.length).toBeGreaterThanOrEqual(2);

    const token = createSharedSessionToken({
      sessionTitle: "Delt stasjonsøkt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set(stationExercises.slice(0, 2).map((exercise) => exercise.id)),
      selectedTheoryIds: new Set(),
      plannedBlocks: stationExercises.slice(0, 2).map((exercise) => ({
        id: exercise.id,
        exercise,
        planningMode: "station" as const,
        sectionStationCount: 2,
      })),
      exerciseLibrary: allExercises,
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    expect(screen.getByText("Samtidig")).toBeInTheDocument();
    expect(screen.getByText(/Disse stasjonene kjøres samtidig/)).toBeInTheDocument();
    expect(screen.getByText("Stasjon 1")).toBeInTheDocument();
    expect(screen.getByText("Stasjon 2")).toBeInTheDocument();
    expect(screen.getAllByText("Kjøres samtidig med de andre stasjonene")).toHaveLength(2);
  });

  it("groups old shared station blocks in the short overview when station count metadata exists", () => {
    const rondoExercise = allExercises.find((item) => item.name === "Lånå - rondo 2v2v2 / 3v3v3");
    const gameExercise = allExercises.find((item) => item.name === "2v2 i midtsirkel med vegger");
    const stationExercise = allExercises.find((item) => item.name === "Langpasning på tvers av banen (2 og 2)");

    expect(rondoExercise).toBeDefined();
    expect(gameExercise).toBeDefined();
    expect(stationExercise).toBeDefined();

    const token = createSharedSessionToken({
      sessionTitle: "Delt stasjonsøkt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 3,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set([rondoExercise!.id, gameExercise!.id, stationExercise!.id]),
      selectedTheoryIds: new Set(),
      plannedBlocks: [rondoExercise!, gameExercise!, stationExercise!].map((exercise) => ({
        id: exercise.id,
        exercise,
        sectionStationCount: 3,
      })),
      exerciseLibrary: allExercises,
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    const shortOverview = screen.getByText("Kortversjon · stikkord").closest("section");

    expect(shortOverview).not.toBeNull();
    expect(within(shortOverview!).getByText("Stasjoner · samtidig")).toBeInTheDocument();
    expect(within(shortOverview!).getByText("Stasjonsrunde (3 samtidig)")).toBeInTheDocument();
    expect(within(shortOverview!).getByText(/ikke kjør dem etter hverandre/)).toBeInTheDocument();
    expect(within(shortOverview!).getByText("S1")).toBeInTheDocument();
    expect(within(shortOverview!).getByText("S2")).toBeInTheDocument();
    expect(within(shortOverview!).getByText("S3")).toBeInTheDocument();
    expect(within(shortOverview!).getByText(/Lånå - rondo 2v2v2/)).toBeInTheDocument();
    expect(within(shortOverview!).queryByText("Øvelse")).not.toBeInTheDocument();
  });

  it("turns a flat legacy middle block into a clear simultaneous station round", () => {
    const fixedWarmup = allExercises.find(
      (item) => item.category === "fixed-warmup" && item.alwaysIncluded
    );
    const exerciseNames = [
      "Lånå - rondo 2v2v2 / 3v3v3",
      "Rask 2v2",
      "2v2 i midtsirkel med vegger",
      "Langpasning på tvers av banen (2 og 2)",
      "Skudd",
      "Spill: 2 lag, 1 bane",
    ];
    const exercises = exerciseNames.map((name) => allExercises.find((item) => item.name === name));

    expect(fixedWarmup).toBeDefined();
    exercises.forEach((exercise) => expect(exercise).toBeDefined());
    const plannedExercises = [fixedWarmup!, ...exercises.map((exercise) => exercise!)];

    const token = createSharedSessionToken({
      sessionTitle: "Delt stasjonsøkt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 3,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set(plannedExercises.map((exercise) => exercise.id)),
      selectedTheoryIds: new Set(),
      plannedBlocks: plannedExercises.map((exercise) => ({
        id: exercise.id,
        exercise,
      })),
      exerciseLibrary: allExercises,
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    const shortOverview = screen.getByText("Kortversjon · stikkord").closest("section");

    expect(shortOverview).not.toBeNull();
    expect(within(shortOverview!).getByText("Stasjonsrunde (5 samtidige øvelser)")).toBeInTheDocument();
    expect(within(shortOverview!).getByText("20m totalt")).toBeInTheDocument();
    expect(within(shortOverview!).getByText("S1")).toBeInTheDocument();
    expect(within(shortOverview!).getByText("S5")).toBeInTheDocument();
    expect(within(shortOverview!).getByText("Spill: 2 lag, 1 bane")).toBeInTheDocument();
  });

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

  it("reveals extra favorite details only after opening the favorite exercise", () => {
    const alternativeFavoriteExercise = allExercises.find((item) =>
      item.coachingPoints.length > 0 && item.variations.length > 0 && item.equipment.length > 0
    );

    expect(alternativeFavoriteExercise).toBeDefined();

    const token = createSharedSessionToken({
      sessionTitle: "Delt økt",
      sessionComment: "Test",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set(),
      selectedTheoryIds: new Set(),
      favoriteExerciseIds: new Set([alternativeFavoriteExercise!.id]),
      plannedBlocks: [],
      exerciseLibrary: allExercises,
    });

    mockedUseSearchParams.mockReturnValue(new URLSearchParams({ s: token }));

    render(<SharedSessionPage />);

    const favoritesSummary = screen.getByText("Favoritter og alternativer (1)");
    fireEvent.click(favoritesSummary);

    const exerciseSummary = screen.getByText(new RegExp(`\\[.*\\] ${alternativeFavoriteExercise!.name}`));
    const favoriteItemDetails = exerciseSummary.closest("details");
    const equipmentLabel = screen.getByText("Utstyr:");

    expect(favoriteItemDetails).not.toHaveAttribute("open");
    expect(equipmentLabel).not.toBeVisible();

    fireEvent.click(exerciseSummary);

    expect(favoriteItemDetails).toHaveAttribute("open");
    expect(screen.getByText("Coaching")).toBeInTheDocument();
    expect(screen.getByText("Variasjoner")).toBeInTheDocument();
    expect(equipmentLabel).toBeVisible();
  });
});