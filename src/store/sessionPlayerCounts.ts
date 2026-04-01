import type { Exercise } from "@/data/exercises";

import type { PlanningSectionMode } from "./sessionStore";

export const normalizeKeeperCount = (playerCount: number, keeperCount: number) =>
  Math.max(0, Math.min(Math.max(0, playerCount - 1), Math.floor(keeperCount)));

export const getOutfieldPlayerCount = (playerCount: number, keeperCount = 0) =>
  Math.max(1, playerCount - normalizeKeeperCount(playerCount, keeperCount));

const keeperPattern = /\b(?:gk|goalkeeper|goalkeepers|keeper|keepers|keepere)\b/i;

const exerciseUsesTotalPlayerCount = (exercise: Exercise) =>
  exercise.theme === "keeper" ||
  [exercise.name, exercise.description, exercise.equipment?.join(" ")]
    .filter(Boolean)
    .some((value) => keeperPattern.test(value));

export const getSectionPlayerCounts = (
  playerCount: number,
  planningSectionMode: PlanningSectionMode,
  stationCount: number,
  keeperCount = 0
) => {
  const outfieldPlayerCount = getOutfieldPlayerCount(playerCount, keeperCount);
  if (planningSectionMode === "single") {
    return [outfieldPlayerCount];
  }

  const normalizedStationCount = Math.max(2, Math.min(4, stationCount));
  const baseCount = Math.floor(outfieldPlayerCount / normalizedStationCount);
  const remainder = outfieldPlayerCount % normalizedStationCount;

  return [
    ...Array.from({ length: normalizedStationCount - remainder }, () => baseCount),
    ...Array.from({ length: remainder }, () => baseCount + 1),
  ];
};

const isDivisorMatch = (total: number, groupSize: number): boolean => {
  return total % groupSize === 0;
};

export const getExerciseFitScore = (
  exercise: Exercise,
  playerCount: number,
  playersPerStation?: number
): number => {
  const targetCount = playersPerStation ?? playerCount;

  if (exercise.scalable) {
    const groupSize = exercise.playersMin;
    if (isDivisorMatch(targetCount, groupSize)) {
      return 0;
    }

    const remainder = targetCount % groupSize;
    if (remainder <= 2 || (groupSize - remainder) <= 2) {
      return 1;
    }

    return 2;
  }

  if (targetCount >= exercise.playersMin && targetCount <= exercise.playersMax) {
    return 0;
  }

  const diff = Math.min(
    Math.abs(targetCount - exercise.playersMin),
    Math.abs(targetCount - exercise.playersMax)
  );

  if (diff <= 2) {
    return 1;
  }

  return 2;
};

export const getWorstExerciseFitScore = (
  exercise: Exercise,
  playerCount: number,
  playerCounts?: number[],
  keeperCount = 0
) => {
  if (!playerCounts || playerCounts.length === 0) {
    return getExerciseFitScore(
      exercise,
      exerciseUsesTotalPlayerCount(exercise)
        ? playerCount
        : getOutfieldPlayerCount(playerCount, keeperCount)
    );
  }

  return Math.max(...playerCounts.map((count) => getExerciseFitScore(exercise, count)));
};

export const matchesExercisePlayerCountFilter = (
  exercise: Exercise,
  playerCount: number,
  playersPerStation?: number,
  targetPlayerCounts?: number[],
  keeperCount = 0
): boolean => {
  if (Array.isArray(targetPlayerCounts) && targetPlayerCounts.length > 0) {
    return targetPlayerCounts.every((targetPlayerCount) =>
      exercise.scalable
        ? getExerciseFitScore(exercise, targetPlayerCount) === 0
        : targetPlayerCount >= exercise.playersMin && targetPlayerCount <= exercise.playersMax
    );
  }

  const relevantPlayerCount =
    exercise.category === "station" || exercise.category === "rondo"
      ? playersPerStation ?? playerCount
      : exerciseUsesTotalPlayerCount(exercise)
        ? playerCount
        : getOutfieldPlayerCount(playerCount, keeperCount);

  if (exercise.scalable) {
    return getExerciseFitScore(exercise, relevantPlayerCount) === 0;
  }

  return (
    relevantPlayerCount >= exercise.playersMin &&
    relevantPlayerCount <= exercise.playersMax
  );
};