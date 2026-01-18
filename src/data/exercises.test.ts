import { describe, it, expect } from "vitest";
import { EXERCISE_THEMES, getExerciseCode, allExercises, normalizeTheme } from "./exercises";
import type { ExerciseCategory, ExerciseData } from "./exercises";

describe("exercises data", () => {
  describe("getExerciseCode", () => {
    it("should return F prefix for fixed-warmup", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 1,
        name: "Test",
        category: "fixed-warmup",
        duration: 5,
        playersMin: 1,
        playersMax: 30,
        theme: "teknikk",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      expect(getExerciseCode(exercise)).toBe("F1");
    });

    it("should return O prefix for warmup", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 5,
        name: "Test",
        category: "warmup",
        duration: 10,
        playersMin: 1,
        playersMax: 20,
        theme: "teknikk",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      expect(getExerciseCode(exercise)).toBe("O5");
    });

    it("should return AK prefix for aktivisering", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 3,
        name: "Test",
        category: "aktivisering",
        duration: 8,
        playersMin: 4,
        playersMax: 16,
        theme: "teknikk",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      expect(getExerciseCode(exercise)).toBe("AK3");
    });

    it("should return R prefix for rondo", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 7,
        name: "Test Rondo",
        category: "rondo",
        duration: 12,
        playersMin: 7,
        playersMax: 12,
        theme: "pasning",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      expect(getExerciseCode(exercise)).toBe("R7");
    });

    it("should return S prefix for station", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 12,
        name: "Test Station",
        category: "station",
        duration: 15,
        playersMin: 8,
        playersMax: 20,
        theme: "teknikk",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      expect(getExerciseCode(exercise)).toBe("S12");
    });

    it("should return K prefix for game", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 4,
        name: "Test Game",
        category: "game",
        duration: 20,
        playersMin: 10,
        playersMax: 22,
        theme: "spill",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      expect(getExerciseCode(exercise)).toBe("K4");
    });

    it("should return A prefix for cooldown", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 2,
        name: "Test Cooldown",
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
      expect(getExerciseCode(exercise)).toBe("A2");
    });

    it("should handle exerciseNumber 0", () => {
      const exercise: ExerciseData = {
        id: "test",
        exerciseNumber: 0,
        name: "Test",
        category: "warmup",
        duration: 10,
        playersMin: 1,
        playersMax: 20,
        theme: "teknikk",
        equipment: [],
        description: "",
        coachingPoints: [],
        variations: [],
      };
      expect(getExerciseCode(exercise)).toBe("O0");
    });
  });

  describe("allExercises", () => {
    it("should contain exercises", () => {
      expect(allExercises.length).toBeGreaterThan(0);
    });

    it("should have valid category for all exercises", () => {
      const validCategories: ExerciseCategory[] = [
        "fixed-warmup",
        "warmup",
        "aktivisering",
        "rondo",
        "station",
        "game",
        "cooldown",
      ];
      allExercises.forEach((exercise) => {
        expect(validCategories).toContain(exercise.category);
      });
    });

    it("should not contain deprecated category aktivisering", () => {
      expect(allExercises.some((exercise) => exercise.category === "aktivisering")).toBe(false);
    });

    it("should have unique ids", () => {
      const ids = allExercises.map((ex) => ex.id);
      const counts = new Map<string, number>();
      ids.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));
      const duplicates = Array.from(counts.entries())
        .filter(([, count]) => count > 1)
        .map(([id, count]) => `${id} (${count})`);
      expect(duplicates).toEqual([]);
    });

    it("should have unique searchable exercise codes (excluding TIIM)", () => {
      const codeToIds = new Map<string, string[]>();

      allExercises.forEach((exercise) => {
        if (exercise.source === "tiim") return;
        const code = getExerciseCode(exercise);
        const existing = codeToIds.get(code);
        if (existing) existing.push(exercise.id);
        else codeToIds.set(code, [exercise.id]);
      });

      const duplicates = Array.from(codeToIds.entries())
        .filter(([, ids]) => ids.length > 1)
        .map(([code, ids]) => `${code}: ${ids.join(", ")}`);

      expect(duplicates).toEqual([]);
    });

    it("should have positive duration for all exercises", () => {
      allExercises.forEach((exercise) => {
        expect(exercise.duration).toBeGreaterThan(0);
      });
    });

    it("should have valid player ranges", () => {
      allExercises.forEach((exercise) => {
        expect(Number.isInteger(exercise.playersMin)).toBe(true);
        expect(Number.isInteger(exercise.playersMax)).toBe(true);
        expect(exercise.playersMin).toBeGreaterThan(0);
        expect(exercise.playersMax).toBeGreaterThanOrEqual(exercise.playersMin);
        // Bred øvre grense for å fange åpenbare feil uten å være for streng.
        expect(exercise.playersMax).toBeLessThanOrEqual(60);
      });
    });

    it("should have at least one fixed-warmup with alwaysIncluded", () => {
      const fixedWarmups = allExercises.filter(
        (ex) => ex.category === "fixed-warmup" && ex.alwaysIncluded
      );
      expect(fixedWarmups.length).toBeGreaterThan(0);
    });

    it("should have valid theme for all exercises", () => {
      allExercises.forEach((exercise) => {
        expect(EXERCISE_THEMES).toContain(exercise.theme);
        expect(exercise.theme).toBe(exercise.theme.trim().toLowerCase());
      });
    });
  });

  describe("normalizeTheme", () => {
    it("should normalize known variants", () => {
      expect(normalizeTheme("Possession")).toBe("possession");
      expect(normalizeTheme("Avslutninger")).toBe("avslutning");
      expect(normalizeTheme("Overganger")).toBe("overgang");
      expect(normalizeTheme("press")).toBe("pressing");
    });
  });
});
