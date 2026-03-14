import { describe, expect, it } from "vitest";

import { buildSharedSessionUrl, createSharedSessionToken, decodeSharedSessionToken } from "./sessionShare";
import { allExercises } from "@/data/exercises";

describe("sessionShare", () => {
  it("round-trips a shared session token", () => {
    const fixedWarmup = allExercises.find((item) => item.category === "fixed-warmup" && item.alwaysIncluded);
    const exercise = allExercises.find((item) => item.category === "game");
    expect(fixedWarmup).toBeDefined();
    expect(exercise).toBeDefined();

    const token = createSharedSessionToken({
      playerCount: 14,
      stationCount: 2,
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(["theory-scan-before-ball"]),
      plannedBlocks: [
        {
          id: fixedWarmup!.id,
          exercise: fixedWarmup!,
        },
        {
          id: exercise!.id,
          exercise: exercise!,
          customDuration: 18,
          customUnit: "min",
        },
      ],
    });

    const decoded = decodeSharedSessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.playerCount).toBe(14);
    expect(decoded?.stationCount).toBe(2);
    expect(decoded?.selectedExerciseIds.has(exercise!.id)).toBe(true);
    expect(decoded?.selectedTheoryIds.has("theory-scan-before-ball")).toBe(true);
    const sharedBlock = decoded?.sessionBlocks.find((block) => block.id === exercise!.id);
    expect(sharedBlock?.id).toBe(exercise!.id);
    expect(sharedBlock?.customDuration).toBe(18);
  });

  it("builds a share URL for the full session view", () => {
    const exercise = allExercises.find((item) => item.category === "game");
    expect(exercise).toBeDefined();

    const url = buildSharedSessionUrl({
      origin: "https://example.com",
      playerCount: 12,
      stationCount: 3,
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(["theory-scan-before-ball"]),
      plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
    });

    expect(url.startsWith("https://example.com/okt?s=")).toBe(true);
  });
});