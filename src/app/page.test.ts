import { describe, it, expect, vi } from "vitest";
import { applyHighlightedExercise, deriveSourceFilter, deriveVisibleExerciseSections } from "./page";
import type { Exercise } from "@/data/exercises";

describe("page helpers", () => {
  describe("deriveSourceFilter", () => {
    it("should force sourceFilter to uefa when highlightExerciseId is set", () => {
      expect(deriveSourceFilter("some-id", [])).toEqual(["uefa"]);
      expect(deriveSourceFilter("some-id", ["tiim"])) .toEqual(["uefa"]);
    });

    it("should keep sourceFilterState when highlightExerciseId is null", () => {
      expect(deriveSourceFilter(null, [])).toEqual([]);
      expect(deriveSourceFilter(null, ["tiim"])) .toEqual(["tiim"]);
    });
  });

  describe("applyHighlightedExercise", () => {
    it("should set search query to matched exercise name and clear highlight", () => {
      const setSearchQuery = vi.fn();
      const setHighlightExercise = vi.fn();
      applyHighlightedExercise({
        highlightExerciseId: "id-1",
        exerciseLibrary: [{ id: "id-1", name: "UEFA drill" }],
        setSearchQuery,
        setHighlightExercise,
      });
      expect(setSearchQuery).toHaveBeenCalledWith("UEFA drill");
      expect(setHighlightExercise).toHaveBeenCalledWith(null);
    });

    it("should still clear highlight even when exercise is not found", () => {
      const setSearchQuery = vi.fn();
      const setHighlightExercise = vi.fn();
      applyHighlightedExercise({
        highlightExerciseId: "missing",
        exerciseLibrary: [{ id: "id-1", name: "UEFA drill" }],
        setSearchQuery,
        setHighlightExercise,
      });
      expect(setSearchQuery).not.toHaveBeenCalled();
      expect(setHighlightExercise).toHaveBeenCalledWith(null);
    });
  });

  describe("deriveVisibleExerciseSections", () => {
    it("should show strength exercises as their own section", () => {
      const strengthExercise: Exercise = {
        id: "strength-1",
        exerciseNumber: 1,
        name: "Pushups",
        category: "cooldown",
        duration: 8,
        playersMin: 1,
        playersMax: 30,
        theme: "styrke",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      const cooldownExercise: Exercise = {
        id: "cooldown-1",
        exerciseNumber: 2,
        name: "Nedjogg",
        category: "cooldown",
        duration: 5,
        playersMin: 1,
        playersMax: 30,
        theme: "restitusjon",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };

      const sections = deriveVisibleExerciseSections({
        cooldown: [strengthExercise, cooldownExercise],
      });

      expect(sections.find((section) => section.key === "strength")?.title).toBe("Styrke");
      expect(sections.find((section) => section.key === "strength")?.exercises).toEqual([strengthExercise]);
      expect(sections.find((section) => section.key === "cooldown")?.exercises).toEqual([cooldownExercise]);
    });
  });
});

