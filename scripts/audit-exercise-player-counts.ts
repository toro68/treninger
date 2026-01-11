import { allExercises, getExerciseCode } from "../src/data/exercises";
import type { Exercise } from "../src/data/exercises";

type Severity = "ERROR" | "WARN";

type Issue = {
  severity: Severity;
  message: string;
  exercise: Exercise;
};

const formatExercise = (ex: Exercise) =>
  `[${getExerciseCode(ex)}] ${ex.id} · ${ex.name} · cat=${ex.category} · players=${ex.playersMin}–${ex.playersMax} · scalable=${ex.scalable ? "yes" : "no"} · source=${ex.source ?? "egen"}`;

const main = () => {
  const issues: Issue[] = [];

  const byPlayersMin: Record<number, number> = {};
  const byPlayersMax: Record<number, number> = {};

  for (const ex of allExercises) {
    byPlayersMin[ex.playersMin] = (byPlayersMin[ex.playersMin] ?? 0) + 1;
    byPlayersMax[ex.playersMax] = (byPlayersMax[ex.playersMax] ?? 0) + 1;

    const minOk = typeof ex.playersMin === "number" && Number.isFinite(ex.playersMin);
    const maxOk = typeof ex.playersMax === "number" && Number.isFinite(ex.playersMax);

    if (!minOk || !maxOk) {
      issues.push({
        severity: "ERROR",
        message: "playersMin/playersMax er ikke et gyldig tall",
        exercise: ex,
      });
      continue;
    }

    if (!Number.isInteger(ex.playersMin) || !Number.isInteger(ex.playersMax)) {
      issues.push({
        severity: "ERROR",
        message: "playersMin/playersMax må være heltall",
        exercise: ex,
      });
    }

    if (ex.playersMin <= 0) {
      issues.push({
        severity: "ERROR",
        message: "playersMin må være > 0",
        exercise: ex,
      });
    }

    if (ex.playersMax <= 0) {
      issues.push({
        severity: "ERROR",
        message: "playersMax må være > 0",
        exercise: ex,
      });
    }

    if (ex.playersMin > ex.playersMax) {
      issues.push({
        severity: "ERROR",
        message: "playersMin er større enn playersMax",
        exercise: ex,
      });
    }

    // Soft warnings (heuristics)
    if (ex.playersMax > 40) {
      issues.push({
        severity: "WARN",
        message: "playersMax > 40 (sjekk om dette er ment)",
        exercise: ex,
      });
    }

    if (ex.scalable) {
      if (ex.playersMin < 2) {
        issues.push({
          severity: "WARN",
          message: "scalable=true, men playersMin < 2 (gruppestørrelse?)",
          exercise: ex,
        });
      }
      if (ex.playersMax % ex.playersMin !== 0) {
        issues.push({
          severity: "WARN",
          message: "scalable=true, men playersMax går ikke opp i playersMin (ujevne grupper)",
          exercise: ex,
        });
      }
    }
  }

  const sortNums = (obj: Record<number, number>) =>
    Object.entries(obj)
      .map(([k, v]) => [Number(k), v] as const)
      .sort((a, b) => a[0] - b[0]);

  console.log(`Total exercises: ${allExercises.length}`);
  console.log("\n=== playersMin distribution ===");
  for (const [value, count] of sortNums(byPlayersMin)) {
    console.log(`${String(count).padStart(5, " ")}  ${value}`);
  }

  console.log("\n=== playersMax distribution ===");
  for (const [value, count] of sortNums(byPlayersMax)) {
    console.log(`${String(count).padStart(5, " ")}  ${value}`);
  }

  const errors = issues.filter((i) => i.severity === "ERROR");
  const warnings = issues.filter((i) => i.severity === "WARN");

  if (errors.length > 0) {
    console.log(`\n!!! ERROR issues (${errors.length})`);
    for (const issue of errors.slice(0, 80)) {
      console.log(`- ${issue.message}: ${formatExercise(issue.exercise)}`);
    }
    if (errors.length > 80) console.log(`... (${errors.length - 80} more)`);
  }

  if (warnings.length > 0) {
    console.log(`\n--- WARN issues (${warnings.length})`);
    for (const issue of warnings.slice(0, 80)) {
      console.log(`- ${issue.message}: ${formatExercise(issue.exercise)}`);
    }
    if (warnings.length > 80) console.log(`... (${warnings.length - 80} more)`);
  }

  // Non-zero only on hard issues
  if (errors.length > 0) process.exitCode = 2;
};

main();

