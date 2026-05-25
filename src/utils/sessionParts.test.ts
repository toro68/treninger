import { describe, expect, it } from "vitest";

import type { SessionBlock } from "@/store/sessionStore";
import { buildSessionParts, getStationPlanSummary } from "./sessionParts";

const createBlock = (
  id: string,
  name: string,
  category: SessionBlock["exercise"]["category"],
  stationRoundStart?: boolean,
  overrides?: Partial<SessionBlock>
): SessionBlock => ({
  id,
  exercise: {
    id,
    exerciseNumber: 1,
    name,
    category,
    duration: 10,
    playersMin: 4,
    playersMax: 16,
    theme: category === "cooldown" ? "evaluering" : "pasning",
    equipment: [],
    description: "",
    coachingPoints: [],
    variations: [],
  },
  ...overrides,
  stationRoundStart,
});

describe("sessionParts", () => {
  it("builds numbered session blocks with separate station rounds", () => {
    const blocks: SessionBlock[] = [
      createBlock("fixed-1", "Skadefri", "fixed-warmup"),
      createBlock("station-1", "Stasjon 1", "station"),
      createBlock("station-2", "Stasjon 2", "station"),
      createBlock("station-3", "Stasjon 3", "station", true),
      createBlock("station-4", "Stasjon 4", "station"),
      createBlock("station-5", "Stasjon 5", "station"),
    ];

    const parts = buildSessionParts(blocks, 15);

    expect(parts.map((part) => part.title)).toEqual(["1. Skadefri", "2. Stasjoner", "3. Stasjoner"]);
    expect(parts[1].blocks.map((entry) => entry.block.id)).toEqual(["station-1", "station-2"]);
    expect(parts[2].blocks.map((entry) => entry.block.id)).toEqual(["station-3", "station-4", "station-5"]);
    expect(parts[0].subtitle).toBe("Spillerne styrer selv");
  });

  it("treats non-station blocks as single shared exercises", () => {
    const blocks: SessionBlock[] = [
      createBlock("fixed-1", "Skadefri", "fixed-warmup"),
      createBlock("warmup-1", "Kort-kort-lang", "warmup"),
      createBlock("station-1", "Stasjon 1", "station"),
      createBlock("station-2", "Stasjon 2", "station"),
      createBlock("game-1", "Spill", "game"),
    ];

    const parts = buildSessionParts(blocks, 16);

    expect(parts.map((part) => part.title)).toEqual([
      "1. Skadefri",
      "2. Øvelse",
      "3. Stasjoner",
      "4. Øvelse",
    ]);
    expect(parts[1].subtitle).toBe("Samme for alle");
    expect(parts[1].blocks).toHaveLength(1);
    expect(parts[3].blocks).toHaveLength(1);
  });

  it("summarizes multiple station rounds", () => {
    const blocks: SessionBlock[] = [
      createBlock("station-1", "Stasjon 1", "station"),
      createBlock("station-2", "Stasjon 2", "station"),
      createBlock("station-3", "Stasjon 3", "station", true),
      createBlock("station-4", "Stasjon 4", "station"),
      createBlock("station-5", "Stasjon 5", "station"),
    ];

    const parts = buildSessionParts(blocks, 15);

    expect(getStationPlanSummary(parts)).toBe("2 + 3 stasjoner");
    expect(parts[0].subtitle).toBe("2 samtidige stasjoner · 7 + 8 spillere");
    expect(parts[1].subtitle).toBe("3 samtidige stasjoner · 5 spillere per stasjon");
  });

  it("uses the intended station count while a station section is still being filled", () => {
    const blocks: SessionBlock[] = [
      createBlock("station-1", "Stasjon 1", "station", undefined, {
        planningMode: "station",
        sectionStationCount: 4,
      }),
    ];

    const parts = buildSessionParts(blocks, 21);

    expect(parts[0].subtitle).toBe("4 samtidige stasjoner · 5 + 5 + 5 + 6 spillere");
    expect(getStationPlanSummary(parts)).toBe("4 stasjoner");
  });

  it("keeps separate station sections even when the exercises are not in the station category", () => {
    const blocks: SessionBlock[] = [
      createBlock("game-1", "Spill 1", "game", undefined, {
        planningMode: "station",
        sectionStationCount: 2,
      }),
      createBlock("game-2", "Spill 2", "game", undefined, {
        planningMode: "station",
        sectionStationCount: 2,
      }),
      createBlock("rondo-1", "Rondo 1", "rondo", true, {
        planningMode: "station",
        sectionStationCount: 3,
      }),
      createBlock("rondo-2", "Rondo 2", "rondo", undefined, {
        planningMode: "station",
        sectionStationCount: 3,
      }),
      createBlock("rondo-3", "Rondo 3", "rondo", undefined, {
        planningMode: "station",
        sectionStationCount: 3,
      }),
    ];

    const parts = buildSessionParts(blocks, 21);

    expect(parts.map((part) => part.title)).toEqual(["1. Stasjoner", "2. Stasjoner"]);
    expect(parts[0].subtitle).toBe("2 samtidige stasjoner · 10 + 11 spillere");
    expect(parts[1].subtitle).toBe("3 samtidige stasjoner · 7 spillere per stasjon");
  });

  it("uses station count metadata even if old shared blocks are missing planning mode", () => {
    const blocks: SessionBlock[] = [
      createBlock("rondo-1", "Rondo som stasjon", "rondo", undefined, {
        sectionStationCount: 3,
      }),
      createBlock("game-1", "2v2 som stasjon", "game", undefined, {
        sectionStationCount: 3,
      }),
      createBlock("station-1", "Pasning som stasjon", "station", undefined, {
        sectionStationCount: 3,
      }),
      createBlock("game-2", "Felles spill", "game"),
    ];

    const parts = buildSessionParts(blocks, 15);

    expect(parts.map((part) => part.title)).toEqual(["1. Stasjoner", "2. Øvelse"]);
    expect(parts[0].blocks.map((entry) => entry.block.id)).toEqual(["rondo-1", "game-1", "station-1"]);
    expect(parts[0].subtitle).toBe("3 samtidige stasjoner · 5 spillere per stasjon");
    expect(parts[1].blocks.map((entry) => entry.block.id)).toEqual(["game-2"]);
  });

  it("collects a section comment for the built session part", () => {
    const blocks: SessionBlock[] = [
      createBlock("game-1", "Spill 1", "game", undefined, {
        sectionComment: "Vektlegg gjenvinning de første 5 sekundene.",
      }),
    ];

    const parts = buildSessionParts(blocks, 14);

    expect(parts[0].sectionComment).toBe("Vektlegg gjenvinning de første 5 sekundene.");
  });

  it("groups reserve blocks into a dedicated reserve section", () => {
    const blocks: SessionBlock[] = [
      createBlock("game-1", "Hovedøvelse", "game", undefined, {
        planningMode: "single",
      }),
      createBlock("game-2", "Reserve A", "game", undefined, {
        planningMode: "reserve",
      }),
      createBlock("game-3", "Reserve B", "game", undefined, {
        planningMode: "reserve",
      }),
    ];

    const parts = buildSessionParts(blocks, 14);

    expect(parts.map((part) => part.title)).toEqual(["1. Øvelse", "Reserve"]);
    expect(parts.at(-1)?.subtitle).toBe("Hvis tid eller annet spilltall");
    expect(parts.at(-1)?.blocks.map((entry) => entry.block.id)).toEqual([
      "game-2",
      "game-3",
    ]);
  });
});