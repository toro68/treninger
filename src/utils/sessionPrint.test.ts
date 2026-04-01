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

  it("escapes user-provided HTML in print markup", () => {
    const customExercise = {
      id: "print-custom",
      exerciseNumber: 999,
      name: "Print <b>øvelse</b>",
      category: "game" as const,
      duration: 12,
      playersMin: 6,
      playersMax: 10,
      theme: "spill" as const,
      equipment: ["baller", "<script>alert(1)</script>"],
      description: "<img src=x onerror=alert(1)>",
      coachingPoints: ["<strong>Press</strong>"],
      variations: ["<em>Bytt side</em>"],
      source: "egen" as const,
    };

    const markup = buildPrintDocument({
      parts: [
        {
          title: "<script>Del 1</script>",
          sectionComment: "<b>Seksjonskommentar</b>",
          blocks: [
            {
              id: customExercise.id,
              exercise: customExercise,
              customTitle: "<img src=x onerror=alert(2)>",
              customComment: "<script>alert(3)</script>",
              assignedCoachNames: ["<b>Tor Inge</b>"],
            },
          ],
        },
      ],
      sessionTitle: "<svg onload=alert(4)>",
      sessionComment: "<iframe src=evil>",
      totalMinutes: 20,
      playerCount: 10,
      exerciseLibrary: [customExercise],
    });

    expect(markup).toContain("&lt;svg onload=alert(4)&gt;");
    expect(markup).toContain("&lt;img src=x onerror=alert(2)&gt;");
    expect(markup).toContain("&lt;script&gt;alert(3)&lt;/script&gt;");
    expect(markup).toContain("&lt;b&gt;Tor Inge&lt;/b&gt;");
    expect(markup).not.toContain("<script>alert(3)</script>");
    expect(markup).not.toContain("<img src=x onerror=alert(2)>");
  });
});