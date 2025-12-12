import { allExercises, getExerciseCode, Exercise } from "../src/data/exercises";

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

const formatExercise = (ex: Exercise) =>
  `[${getExerciseCode(ex)}] ${ex.id} · ${ex.name} · cat=${ex.category} · theme=${ex.theme} · source=${ex.source ?? "egen"}`;

const main = () => {
  const total = allExercises.length;
  console.log(`Total exercises: ${total}`);

  const byCategory: CountMap = {};
  const bySource: CountMap = {};
  const bySourceCategory: CountMap = {};

  const seenIds = new Set<string>();
  const duplicateIds: string[] = [];

  const codesSeen = new Map<string, Exercise[]>();
  const numbersByCategory = new Map<string, Map<number, Exercise[]>>();

  for (const ex of allExercises) {
    inc(byCategory, ex.category);
    const src = ex.source ?? "egen";
    inc(bySource, src);
    inc(bySourceCategory, `${src} · ${ex.category}`);

    if (seenIds.has(ex.id)) duplicateIds.push(ex.id);
    seenIds.add(ex.id);

    const code = getExerciseCode(ex);
    const arr = codesSeen.get(code) ?? [];
    arr.push(ex);
    codesSeen.set(code, arr);

    const catMap = numbersByCategory.get(ex.category) ?? new Map<number, Exercise[]>();
    const sameNumber = catMap.get(ex.exerciseNumber) ?? [];
    sameNumber.push(ex);
    catMap.set(ex.exerciseNumber, sameNumber);
    numbersByCategory.set(ex.category, catMap);
  }

  printTable("By category", byCategory);
  printTable("By source", bySource);
  printTable("By source + category", bySourceCategory, 80);

  // Hard validation signals
  if (duplicateIds.length > 0) {
    console.log(`\n!!! Duplicate exercise ids (${duplicateIds.length})`);
    for (const id of duplicateIds.slice(0, 50)) console.log(`- ${id}`);
    if (duplicateIds.length > 50) console.log(`... (${duplicateIds.length - 50} more)`);
  }

  const duplicateCodes = [...codesSeen.entries()].filter(([, list]) => list.length > 1);
  if (duplicateCodes.length > 0) {
    console.log(`\n!!! Duplicate exercise codes (category-prefix + number) (${duplicateCodes.length})`);
    for (const [code, list] of duplicateCodes.slice(0, 30)) {
      console.log(`\n${code} (${list.length})`);
      for (const ex of list.slice(0, 10)) console.log(`  - ${formatExercise(ex)}`);
      if (list.length > 10) console.log(`  ... (${list.length - 10} more)`);
    }
    if (duplicateCodes.length > 30) console.log(`... (${duplicateCodes.length - 30} more)`);
  }

  const duplicateNumbers: Array<{ category: string; exerciseNumber: number; list: Exercise[] }> = [];
  for (const [category, catMap] of numbersByCategory.entries()) {
    for (const [exerciseNumber, list] of catMap.entries()) {
      if (list.length > 1) duplicateNumbers.push({ category, exerciseNumber, list });
    }
  }
  if (duplicateNumbers.length > 0) {
    console.log(`\n!!! Duplicate exerciseNumber within same category (${duplicateNumbers.length})`);
    for (const entry of duplicateNumbers.slice(0, 30)) {
      console.log(`\n${entry.category} #${entry.exerciseNumber} (${entry.list.length})`);
      for (const ex of entry.list.slice(0, 10)) console.log(`  - ${formatExercise(ex)}`);
      if (entry.list.length > 10) console.log(`  ... (${entry.list.length - 10} more)`);
    }
    if (duplicateNumbers.length > 30) console.log(`... (${duplicateNumbers.length - 30} more)`);
  }

  // Categorization review heuristics (NOT hard errors)
  const rondoMismatches: Exercise[] = [];
  const alwaysIncludedMismatches: Exercise[] = [];

  for (const ex of allExercises) {
    const src = ex.source ?? "egen";
    const looksRondo =
      /rondo/i.test(ex.id) || /rondo/i.test(ex.name) || ex.theme.toLowerCase() === "rondo";

    // Exempt DiBernardo rondo source since those are intentionally distributed (warmup/station)
    if (looksRondo && src !== "rondo" && ex.category !== "rondo") {
      rondoMismatches.push(ex);
    }

    if (ex.alwaysIncluded && ex.category !== "fixed-warmup") {
      alwaysIncludedMismatches.push(ex);
    }
    if (!ex.alwaysIncluded && ex.category === "fixed-warmup") {
      // fixed-warmup should normally be always included
      alwaysIncludedMismatches.push(ex);
    }
  }

  if (rondoMismatches.length > 0) {
    console.log(`\n--- Review: Looks like Rondo but not in category 'rondo' (excluding source=rondo) (${rondoMismatches.length})`);
    for (const ex of rondoMismatches.slice(0, 60)) console.log(`- ${formatExercise(ex)}`);
    if (rondoMismatches.length > 60) console.log(`... (${rondoMismatches.length - 60} more)`);
  }

  if (alwaysIncludedMismatches.length > 0) {
    console.log(`\n--- Review: fixed-warmup / alwaysIncluded inconsistencies (${alwaysIncludedMismatches.length})`);
    for (const ex of alwaysIncludedMismatches.slice(0, 60)) console.log(`- ${formatExercise(ex)}`);
    if (alwaysIncludedMismatches.length > 60) console.log(`... (${alwaysIncludedMismatches.length - 60} more)`);
  }

  // Exit non-zero only on hard issues
  if (duplicateIds.length > 0 || duplicateCodes.length > 0 || duplicateNumbers.length > 0) {
    process.exitCode = 2;
  }
};

main();
