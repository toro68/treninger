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
      keeperCount: 2,
      stationCount: 2,
      coachNames: ["Tor Inge", "John Arne", "Tor Inge"],
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
    expect(decoded?.keeperCount).toBe(2);
    expect(decoded?.stationCount).toBe(2);
    expect(decoded?.sessionTitle).toBe("Angrep mot lavt press");
    expect(decoded?.sessionComment).toBe("Kort avstand mellom ledd og tidlige løp bak.");
    expect(decoded?.coachNames).toEqual(["Tor Inge", "John Arne"]);
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
      keeperCount: 2,
      stationCount: 3,
      coachNames: ["Tor Inge", "Rune"],
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(["theory-scan-before-ball"]),
      plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
      exerciseLibrary: allExercises,
    });

    expect(url.startsWith("https://example.com/okt?s=")).toBe(true);
    const decoded = decodeSharedSessionToken(new URL(url).searchParams.get("s"));
    expect(decoded?.coachNames).toEqual(["Tor Inge", "Rune"]);
    expect(decoded?.keeperCount).toBe(2);
  });

  it("round-trips custom exercises and alternatives in a shared token", () => {
    const customExercise = {
      id: "custom-share-main",
      exerciseNumber: 901,
      name: "Egen delt øvelse",
      category: "station" as const,
      duration: 12,
      playersMin: 6,
      playersMax: 10,
      theme: "pasning" as const,
      equipment: ["baller", "kjegler"],
      description: "Custom øvelse som må følge med i lenken.",
      coachingPoints: ["Vend opp tidlig"],
      variations: ["To touch"],
      source: "egen" as const,
    };
    const alternativeCustomExercise = {
      id: "custom-share-alt",
      exerciseNumber: 902,
      name: "Alternativ egen øvelse",
      category: "station" as const,
      duration: 10,
      playersMin: 6,
      playersMax: 10,
      theme: "pasning" as const,
      equipment: ["baller"],
      description: "Alternativ som ikke ligger i selve planen.",
      coachingPoints: ["Se neste pasning tidlig"],
      variations: [],
      source: "egen" as const,
    };

    const token = createSharedSessionToken({
      sessionTitle: "Økt med egendefinert øvelse",
      sessionComment: "Test av custom deling",
      playerCount: 10,
      keeperCount: 1,
      stationCount: 2,
      coachNames: ["Tor Inge"],
      selectedExerciseIds: new Set([customExercise.id]),
      selectedTheoryIds: new Set(),
      plannedBlocks: [
        {
          id: customExercise.id,
          exercise: customExercise,
          alternativeExerciseIds: [alternativeCustomExercise.id],
        },
      ],
      exerciseLibrary: [...allExercises, customExercise, alternativeCustomExercise],
    });

    const decoded = decodeSharedSessionToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.selectedExerciseIds.has(customExercise.id)).toBe(true);
    expect(decoded?.exerciseLibrary.some((exercise) => exercise.id === customExercise.id)).toBe(true);
    expect(decoded?.exerciseLibrary.some((exercise) => exercise.id === alternativeCustomExercise.id)).toBe(true);
    expect(decoded?.sessionBlocks.find((block) => block.id === customExercise.id)?.exercise.name).toBe("Egen delt øvelse");
    expect(decoded?.sessionBlocks.find((block) => block.id === customExercise.id)?.alternativeExerciseIds).toEqual([
      alternativeCustomExercise.id,
    ]);
  });

  it("normalizes shared theory ids and block coach names", () => {
    const exercise = allExercises.find((item) => item.category === "game");

    expect(exercise).toBeDefined();

    const token = createSharedSessionToken({
      sessionTitle: "Økt med treneransvar",
      sessionComment: "Test av normalisering",
      playerCount: 10,
      keeperCount: 1,
      stationCount: 2,
      coachNames: [],
      selectedExerciseIds: new Set([exercise!.id]),
      selectedTheoryIds: new Set(["ghost-theory", "theory-scan-before-ball", ""]),
      plannedBlocks: [
        {
          id: exercise!.id,
          exercise: exercise!,
          assignedCoachNames: ["  Tor Inge  ", "", "Tor Inge", "Rune"],
        },
      ],
      exerciseLibrary: allExercises,
    });

    const decoded = decodeSharedSessionToken(token);

    expect(decoded).not.toBeNull();
    expect([...decoded!.selectedTheoryIds]).toEqual(["theory-scan-before-ball"]);
    expect(decoded!.coachNames).toEqual(["Tor Inge", "Rune"]);
    expect(decoded!.sessionBlocks[0]?.assignedCoachNames).toEqual(["Tor Inge", "Rune"]);
  });
});