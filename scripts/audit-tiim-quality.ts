import { tiimExercises } from "../src/data/tiim-exercises";

type CountMap = Record<string, number>;

const inc = (map: CountMap, key: string) => {
  map[key] = (map[key] ?? 0) + 1;
};

const pct = (num: number, denom: number) =>
  denom === 0 ? "0.0%" : `${((num / denom) * 100).toFixed(1)}%`;

const main = () => {
  const total = tiimExercises.length;
  console.log(`Total tiim exercises: ${total}`);

  const byCategory: CountMap = {};
  let emptyCoachingPoints = 0;
  let emptyVariations = 0;
  let emptyEquipment = 0;
  let shortDescription = 0;

  let minExerciseNumber = Number.POSITIVE_INFINITY;
  let maxExerciseNumber = 0;

  const numbersByCategory = new Map<string, Map<number, number>>();

  for (const ex of tiimExercises) {
    inc(byCategory, ex.category);

    if ((ex.coachingPoints ?? []).length === 0) emptyCoachingPoints += 1;
    if ((ex.variations ?? []).length === 0) emptyVariations += 1;
    if ((ex.equipment ?? []).length === 0) emptyEquipment += 1;
    if ((ex.description ?? "").trim().length < 80) shortDescription += 1;

    minExerciseNumber = Math.min(minExerciseNumber, ex.exerciseNumber);
    maxExerciseNumber = Math.max(maxExerciseNumber, ex.exerciseNumber);

    const catMap = numbersByCategory.get(ex.category) ?? new Map<number, number>();
    catMap.set(ex.exerciseNumber, (catMap.get(ex.exerciseNumber) ?? 0) + 1);
    numbersByCategory.set(ex.category, catMap);
  }

  console.log("\n=== By category (tiim) ===");
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`${String(count).padStart(5, " ")}  ${cat}`);
  }

  console.log("\n=== Field completeness (tiim) ===");
  console.log(
    `Empty coachingPoints: ${emptyCoachingPoints}/${total} (${pct(emptyCoachingPoints, total)})`
  );
  console.log(`Empty variations:     ${emptyVariations}/${total} (${pct(emptyVariations, total)})`);
  console.log(`Empty equipment:      ${emptyEquipment}/${total} (${pct(emptyEquipment, total)})`);
  console.log(
    `Short description (<80 chars): ${shortDescription}/${total} (${pct(shortDescription, total)})`
  );

  console.log("\n=== exerciseNumber range (tiim) ===");
  console.log(`min: ${minExerciseNumber}`);
  console.log(`max: ${maxExerciseNumber}`);

  const duplicates: Array<{ category: string; exerciseNumber: number; count: number }> = [];
  for (const [category, catMap] of numbersByCategory.entries()) {
    for (const [exerciseNumber, count] of catMap.entries()) {
      if (count > 1) duplicates.push({ category, exerciseNumber, count });
    }
  }

  if (duplicates.length > 0) {
    console.log(`\n!!! Duplicate exerciseNumber within tiim by category (${duplicates.length})`);
    for (const d of duplicates
      .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category, "nb"))
      .slice(0, 40)) {
      console.log(`- ${d.category} #${d.exerciseNumber} (${d.count})`);
    }
    if (duplicates.length > 40) console.log(`... (${duplicates.length - 40} more)`);
  }
};

main();

