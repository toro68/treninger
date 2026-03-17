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
      sessionTitle: "Angrep mot lavt press",
      sessionComment: "Kort avstand mellom ledd og tidlige løp bak.",
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
          sectionComment: "Felles beskjed til hele seksjonen.",
          customDuration: 18,
          customUnit: "min",
          customTitle: "Spill med gjennombruddstrussel",
          customComment: "Hold høy intensitet i første aksjon.",
          assignedCoachNames: ["Tor Inge", "John Arne"],
        },
      ],
    });

    const decoded = decodeSharedSessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.playerCount).toBe(14);
    expect(decoded?.stationCount).toBe(2);
    expect(decoded?.sessionTitle).toBe("Angrep mot lavt press");
    expect(decoded?.sessionComment).toBe("Kort avstand mellom ledd og tidlige løp bak.");
    expect(decoded?.selectedExerciseIds.has(exercise!.id)).toBe(true);
    expect(decoded?.selectedTheoryIds.has("theory-scan-before-ball")).toBe(true);
    const sharedBlock = decoded?.sessionBlocks.find((block) => block.id === exercise!.id);
    expect(sharedBlock?.id).toBe(exercise!.id);
    expect(sharedBlock?.sectionComment).toBe("Felles beskjed til hele seksjonen.");
    expect(sharedBlock?.customDuration).toBe(18);
    expect(sharedBlock?.customTitle).toBe("Spill med gjennombruddstrussel");
    expect(sharedBlock?.customComment).toBe("Hold høy intensitet i første aksjon.");
    expect(sharedBlock?.assignedCoachNames).toEqual(["Tor Inge", "John Arne"]);
  });

  it("builds a share URL for the full session view", () => {
    const exercise = allExercises.find((item) => item.category === "game");
    expect(exercise).toBeDefined();

    const url = buildSharedSessionUrl({
      origin: "https://example.com",
      sessionTitle: "Torsdagsøkt",
      sessionComment: "Tilpasset mot kampbildet vi forventer.",
      playerCount: 12,
      stationCount: 3,
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(["theory-scan-before-ball"]),
      plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
    });

    expect(url.startsWith("https://example.com/okt?s=")).toBe(true);
  });
});