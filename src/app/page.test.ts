import { describe, it, expect, vi } from "vitest";
import { applyHighlightedExercise, deriveSourceFilter } from "./page";

describe("page helpers", () => {
  describe("deriveSourceFilter", () => {
    it("should force sourceFilter to uefa when highlightExerciseId is set", () => {
      expect(deriveSourceFilter("some-id", null)).toBe("uefa");
      expect(deriveSourceFilter("some-id", "tiim")).toBe("uefa");
    });

    it("should keep sourceFilterState when highlightExerciseId is null", () => {
      expect(deriveSourceFilter(null, null)).toBeNull();
      expect(deriveSourceFilter(null, "tiim")).toBe("tiim");
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
});

