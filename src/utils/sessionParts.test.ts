import { describe, expect, it } from "vitest";

import type { SessionBlock } from "@/store/sessionStore";
import { buildSessionParts, getStationPlanSummary } from "./sessionParts";

const createBlock = (
  id: string,
  name: string,
  category: SessionBlock["exercise"]["category"],
  stationRoundStart?: boolean
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
  stationRoundStart,
});

describe("sessionParts", () => {
  it("splits adjacent station exercises into separate rounds when marked", () => {
    const blocks: SessionBlock[] = [
      createBlock("fixed-1", "Skadefri", "fixed-warmup"),
      createBlock("station-1", "Stasjon 1", "station"),
      createBlock("station-2", "Stasjon 2", "station"),
      createBlock("station-3", "Stasjon 3", "station", true),
      createBlock("station-4", "Stasjon 4", "station"),
      createBlock("station-5", "Stasjon 5", "station"),
    ];

    const parts = buildSessionParts(blocks, 15);

    expect(parts.map((part) => part.title)).toEqual(["Skadefri", "Stasjoner 1", "Stasjoner 2"]);
    expect(parts[1].blocks.map((entry) => entry.block.id)).toEqual(["station-1", "station-2"]);
    expect(parts[2].blocks.map((entry) => entry.block.id)).toEqual(["station-3", "station-4", "station-5"]);
    expect(parts[1].blocks.map((entry) => entry.sequenceNumber)).toEqual([2, 3]);
    expect(parts[2].blocks.map((entry) => entry.sequenceNumber)).toEqual([4, 5, 6]);
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
    expect(parts[0].subtitle).toBe("2 stasjoner · 7 spillere per stasjon");
    expect(parts[1].subtitle).toBe("3 stasjoner · 5 spillere per stasjon");
  });
});