import { describe, it, expect } from "vitest";
import { matchesExerciseSearchQuery } from "./exerciseFilters";
import type { Exercise } from "@/data/exercises";

const makeExercise = (overrides: Partial<Exercise>): Exercise => ({
  id: "test-1",
  exerciseNumber: 1,
  name: "Default name",
  category: "station",
  duration: 10,
  playersMin: 4,
  playersMax: 12,
  theme: "pasning",
  equipment: [],
  description: "",
  coachingPoints: [],
  variations: [],
  ...overrides,
});

describe("matchesExerciseSearchQuery", () => {
  it("should match on name", () => {
    const exercise = makeExercise({ name: "Rondo 4v2" });
    expect(matchesExerciseSearchQuery(exercise, "rondo")).toBe(true);
  });

  it("should match on displayName", () => {
    const exercise = makeExercise({
      name: "ManC-AP-01 Oppbygging gjennom sidediamant",
      displayName: "Støttevinkler og spill gjennom sonene (s. 53)",
    });
    expect(matchesExerciseSearchQuery(exercise, "Støttevinkler")).toBe(true);
    expect(matchesExerciseSearchQuery(exercise, "sonene")).toBe(true);
  });

  it("should match displayName with diacritic-insensitive search", () => {
    const exercise = makeExercise({
      name: "ManC-AP-01",
      displayName: "Figur 8 pasningsdiamant med fri beslutningstaking",
    });
    expect(matchesExerciseSearchQuery(exercise, "pasningsdiamant")).toBe(true);
  });

  it("should return true for empty search query", () => {
    const exercise = makeExercise({});
    expect(matchesExerciseSearchQuery(exercise, "")).toBe(true);
    expect(matchesExerciseSearchQuery(exercise, undefined)).toBe(true);
  });

  it("should not match when query is absent from all fields", () => {
    const exercise = makeExercise({ name: "Rondo 4v2" });
    expect(matchesExerciseSearchQuery(exercise, "pressing")).toBe(false);
  });
});
