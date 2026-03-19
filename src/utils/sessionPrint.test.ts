import { describe, expect, it } from "vitest";

import { allExercises } from "@/data/exercises";

import { buildPrintDocument } from "./sessionPrint";

describe("sessionPrint", () => {
  it("includes keeper breakdown in the print meta", () => {
    const exercise = allExercises.find((item) => item.category === "game");

    expect(exercise).toBeDefined();

    const markup = buildPrintDocument({
      parts: [
        {
          title: "1. Spill",
          blocks: [{ id: exercise!.id, exercise: exercise! }],
        },
      ],
      sessionTitle: "Kampøkt",
      totalMinutes: 20,
      playerCount: 14,
      keeperCount: 2,
      exerciseLibrary: allExercises,
    });

    expect(markup).toContain("20 minutter • 14 spillere (12 utespillere + 2 keepere)");
  });
});