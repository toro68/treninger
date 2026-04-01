import { normalizeTheme } from "../src/data/exercises";
import type { ExerciseData } from "../src/data/exercises";

import { exercises } from "../src/data/exercises";
import { tiimExercises } from "../src/data/tiim-exercises";
import { eggenExercises } from "../src/data/eggen-exercises";
import { dbuExercises } from "../src/data/dbu-exercises";
import { dibernardoExercises } from "../src/data/dibernardo-exercises";
import { rondoExercises } from "../src/data/rondo-exercises";
import { hyballaExercises } from "../src/data/hyballa-exercises";
import { bangsboExercises } from "../src/data/bangsbo-exercises";
import { duggerExercises } from "../src/data/dugger-exercises";
import { matkovichExercises } from "../src/data/matkovich-exercises";
import { youthExercises } from "../src/data/101youth-exercises";
import { worldclassExercises } from "../src/data/worldclass-exercises";
import { seegerExercises } from "../src/data/seeger";
import { uefaExercises } from "../src/data/uefa-exercises";
import { mancExercises } from "../src/data/manc-exercises";
import { mancAttackingPositionalExercises } from "../src/data/manc-attacking-positional-exercises";

type CountMap = Record<string, number>;

const inc = (map: CountMap, key: string) => {
  map[key] = (map[key] ?? 0) + 1;
};

const sortEntries = (map: CountMap) =>
  Object.entries(map).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "nb"));

const printTable = (title: string, map: CountMap, maxRows = 50) => {
  console.log(`\n=== ${title} ===`);
  const rows = sortEntries(map).slice(0, maxRows);
  for (const [key, count] of rows) {
    console.log(`${String(count).padStart(5, " ")}  ${key}`);
  }
  if (Object.keys(map).length > maxRows) {
    console.log(`... (${Object.keys(map).length - maxRows} more)`);
  }
};

const main = () => {
  const sources: Array<{ name: string; exercises: ExerciseData[] }> = [
    { name: "egen", exercises },
    { name: "tiim", exercises: tiimExercises },
    { name: "eggen", exercises: eggenExercises },
    { name: "dbu", exercises: dbuExercises },
    { name: "dibernardo", exercises: dibernardoExercises },
    { name: "rondo", exercises: rondoExercises },
    { name: "hyballa", exercises: hyballaExercises },
    { name: "bangsbo", exercises: bangsboExercises },
    { name: "dugger", exercises: duggerExercises },
    { name: "matkovich", exercises: matkovichExercises },
    { name: "101youth", exercises: youthExercises },
    { name: "worldclass", exercises: worldclassExercises },
    { name: "seeger", exercises: seegerExercises },
    { name: "uefa", exercises: uefaExercises },
    { name: "manc", exercises: mancExercises },
    { name: "manc-attacking-positional", exercises: mancAttackingPositionalExercises },
  ];

  const rawCounts: CountMap = {};
  const normalizedCounts: CountMap = {};
  const bySourceRaw: CountMap = {};
  const bySourceNormalized: CountMap = {};
  const changed: CountMap = {};

  for (const src of sources) {
    for (const ex of src.exercises) {
      const raw = String(ex.theme ?? "");
      const normalized = normalizeTheme(raw);

      inc(rawCounts, raw);
      inc(normalizedCounts, normalized);
      inc(bySourceRaw, `${src.name} · ${raw}`);
      inc(bySourceNormalized, `${src.name} · ${normalized}`);

      const rawNorm = raw.trim().toLowerCase();
      if (normalized !== rawNorm) inc(changed, `${raw} → ${normalized}`);
    }
  }

  console.log(`Total exercises across sources: ${sources.reduce((sum, s) => sum + s.exercises.length, 0)}`);
  console.log(`Unique raw themes: ${Object.keys(rawCounts).length}`);
  console.log(`Unique normalized themes: ${Object.keys(normalizedCounts).length}`);

  printTable("Top raw themes", rawCounts, 30);
  printTable("Top normalized themes", normalizedCounts, 30);
  printTable("Raw theme variants needing normalization", changed, 80);
  printTable("By source + normalized theme", bySourceNormalized, 120);
};

main();

