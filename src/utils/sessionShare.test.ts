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
      favoriteExerciseIds: new Set([exercise!.id]),
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
    expect(decoded?.favoriteExerciseIds.has(exercise!.id)).toBe(true);
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
      favoriteExerciseIds: new Set([exercise!.id]),
      plannedBlocks: [{ id: exercise!.id, exercise: exercise! }],
      exerciseLibrary: allExercises,
    });

    expect(url.startsWith("https://example.com/okt?s=")).toBe(true);
    const decoded = decodeSharedSessionToken(new URL(url).searchParams.get("s"));
    expect(decoded?.coachNames).toEqual(["Tor Inge", "Rune"]);
    expect(decoded?.keeperCount).toBe(2);
    expect(decoded?.favoriteExerciseIds.has(exercise!.id)).toBe(true);
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

  it("normalizes shared player and station counts from the token", () => {
    const exercise = allExercises.find((item) => item.category === "game");

    expect(exercise).toBeDefined();

    const payload = {
      version: 3,
      playerCount: 0,
      keeperCount: 99,
      stationCount: 9,
      selectedExerciseIds: [exercise!.id],
      selectedTheoryIds: [],
      plannedBlocks: [{ id: exercise!.id }],
    };

    const token = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const decoded = decodeSharedSessionToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.playerCount).toBe(1);
    expect(decoded?.keeperCount).toBe(0);
    expect(decoded?.stationCount).toBe(4);
  });

  it("drops external image URLs from shared custom exercises", () => {
    const payload = {
      version: 3,
      playerCount: 10,
      keeperCount: 1,
      stationCount: 2,
      selectedExerciseIds: ["custom-share-image"],
      selectedTheoryIds: [],
      plannedBlocks: [{ id: "custom-share-image" }],
      sharedExercises: [
        {
          id: "custom-share-image",
          exerciseNumber: 903,
          name: "Custom med bilde",
          category: "station",
          duration: 12,
          playersMin: 6,
          playersMax: 10,
          theme: "pasning",
          equipment: [],
          description: "Beskrivelse",
          coachingPoints: [],
          variations: [],
          imageUrl: "https://tracker.example.invalid/pixel.png",
          source: "egen",
        },
      ],
    };

    const token = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const decoded = decodeSharedSessionToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.sessionBlocks[0]?.exercise.imageUrl).toBeUndefined();
  });

  it("strips protocol-relative shared exercise image URLs", () => {
    const payload = {
      version: 3,
      playerCount: 10,
      keeperCount: 1,
      stationCount: 2,
      selectedExerciseIds: ["custom-share-image"],
      selectedTheoryIds: [],
      plannedBlocks: [{ id: "custom-share-image" }],
      sharedExercises: [
        {
          id: "custom-share-image",
          exerciseNumber: 903,
          name: "Custom med bilde",
          category: "station",
          duration: 12,
          playersMin: 6,
          playersMax: 10,
          theme: "pasning",
          equipment: [],
          description: "Beskrivelse",
          coachingPoints: [],
          variations: [],
          imageUrl: "//tracker.example.invalid/pixel.png",
          source: "egen",
        },
      ],
    };

    const token = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const decoded = decodeSharedSessionToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.sessionBlocks[0]?.exercise.imageUrl).toBeUndefined();
  });

  it("falls back to planned block ids when shared selected ids are missing", () => {
    const exercise = allExercises.find((item) => item.category === "game");

    expect(exercise).toBeDefined();

    const payload = {
      version: 3,
      playerCount: 10,
      keeperCount: 1,
      stationCount: 2,
      selectedTheoryIds: [],
      plannedBlocks: [{ id: exercise!.id }],
    };

    const token = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const decoded = decodeSharedSessionToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.selectedExerciseIds.has(exercise!.id)).toBe(true);
    expect(decoded?.sessionBlocks.some((block) => block.id === exercise!.id)).toBe(true);
  });

  it("preserves station planning metadata across encode and decode", () => {
    const stations = allExercises.filter((item) => item.category === "station").slice(0, 4);

    expect(stations.length).toBeGreaterThanOrEqual(4);

    const token = createSharedSessionToken({
      sessionTitle: "Stasjonsøkt",
      sessionComment: "",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: [],
      selectedExerciseIds: new Set(stations.map((exercise) => exercise.id)),
      selectedTheoryIds: new Set(),
      plannedBlocks: [
        { id: stations[0].id, exercise: stations[0], planningMode: "station", sectionStationCount: 2 },
        { id: stations[1].id, exercise: stations[1], planningMode: "station", sectionStationCount: 2 },
        { id: stations[2].id, exercise: stations[2], planningMode: "station", sectionStationCount: 2, stationRoundStart: true },
        { id: stations[3].id, exercise: stations[3], planningMode: "station", sectionStationCount: 2 },
      ],
      exerciseLibrary: allExercises,
    });

    const decoded = decodeSharedSessionToken(token);
    const stationBlocks = (decoded?.sessionBlocks ?? []).filter((block) =>
      stations.some((station) => station.id === block.id)
    );

    expect(stationBlocks).toHaveLength(4);
    expect(stationBlocks.map((block) => block.planningMode)).toEqual([
      "station",
      "station",
      "station",
      "station",
    ]);
    expect(stationBlocks.map((block) => block.sectionStationCount)).toEqual([2, 2, 2, 2]);
    expect(stationBlocks[2]?.stationRoundStart).toBe(true);
    expect(stationBlocks[0]?.stationRoundStart).toBeUndefined();
    expect(stationBlocks[1]?.stationRoundStart).toBeUndefined();
    expect(stationBlocks[3]?.stationRoundStart).toBeUndefined();
  });

  it("normalizes station section boundaries for shared planned blocks", () => {
    const stations = allExercises.filter((item) => item.category === "station").slice(0, 3);

    expect(stations.length).toBeGreaterThanOrEqual(3);

    const token = createSharedSessionToken({
      sessionTitle: "Stasjonsnormalisering",
      sessionComment: "",
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      coachNames: [],
      selectedExerciseIds: new Set(stations.map((exercise) => exercise.id)),
      selectedTheoryIds: new Set(),
      plannedBlocks: [
        { id: stations[0].id, exercise: stations[0], planningMode: "station", sectionStationCount: 2 },
        { id: stations[1].id, exercise: stations[1], planningMode: "station", sectionStationCount: 2 },
        { id: stations[2].id, exercise: stations[2], planningMode: "station", sectionStationCount: 2 },
      ],
      exerciseLibrary: allExercises,
    });

    const decoded = decodeSharedSessionToken(token);
    const stationBlocks = (decoded?.sessionBlocks ?? []).filter((block) =>
      stations.some((station) => station.id === block.id)
    );

    expect(decoded).not.toBeNull();
    expect(stationBlocks).toHaveLength(3);
    expect(stationBlocks.map((block) => block.sectionStationCount)).toEqual([2, 2, 2]);
    expect(stationBlocks[0]?.stationRoundStart).toBeUndefined();
    expect(stationBlocks[1]?.stationRoundStart).toBeUndefined();
    expect(stationBlocks[2]?.stationRoundStart).toBe(true);
  });

  it("promotes legacy shared blocks with station signals but missing planningMode", () => {
    const stations = allExercises.filter((item) => item.category === "station").slice(0, 2);

    expect(stations.length).toBeGreaterThanOrEqual(2);

    const payload = {
      version: 3,
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      selectedExerciseIds: stations.map((exercise) => exercise.id),
      selectedTheoryIds: [],
      plannedBlocks: [
        { id: stations[0].id, sectionStationCount: 2 },
        { id: stations[1].id, sectionStationCount: 2 },
      ],
    };

    const token = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const decoded = decodeSharedSessionToken(token);
    const stationBlocks = (decoded?.sessionBlocks ?? []).filter((block) =>
      stations.some((station) => station.id === block.id)
    );

    expect(decoded).not.toBeNull();
    expect(stationBlocks.map((block) => block.planningMode)).toEqual([
      "station",
      "station",
    ]);
    expect(stationBlocks.map((block) => block.sectionStationCount)).toEqual([2, 2]);
  });

  it("does not promote shared blocks that lack any station signal", () => {
    const exercises = allExercises.filter((item) => item.category === "station").slice(0, 2);

    expect(exercises.length).toBeGreaterThanOrEqual(2);

    const payload = {
      version: 3,
      playerCount: 12,
      keeperCount: 0,
      stationCount: 2,
      selectedExerciseIds: exercises.map((exercise) => exercise.id),
      selectedTheoryIds: [],
      plannedBlocks: exercises.map((exercise) => ({ id: exercise.id })),
    };

    const token = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const decoded = decodeSharedSessionToken(token);
    const stationBlocks = (decoded?.sessionBlocks ?? []).filter((block) =>
      exercises.some((exercise) => exercise.id === block.id)
    );

    expect(decoded).not.toBeNull();
    expect(stationBlocks.map((block) => block.planningMode)).toEqual([
      undefined,
      undefined,
    ]);
    expect(stationBlocks.map((block) => block.sectionStationCount)).toEqual([
      undefined,
      undefined,
    ]);
  });
});
