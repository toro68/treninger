import { uefaAnalyses } from "../src/data/uefaAnalyses";
import { getUEFAExerciseByCode } from "../src/data/uefa-exercises";

const missing: { analysis: string; code: string }[] = [];

for (const analysis of uefaAnalyses) {
  for (const ref of analysis.ovelser) {
    const exercise = getUEFAExerciseByCode(ref.kode);
    if (!exercise) {
      missing.push({ analysis: analysis.kode, code: ref.kode });
    }
  }
}

if (missing.length > 0) {
  console.error("Følgende UEFA-øvelser mangler i databasen:");
  for (const m of missing) {
    console.error(`- ${m.analysis}: ${m.code}`);
  }
  process.exit(1);
} else {
  console.log("UEFA-validering OK – alle referanser har matchende øvelser.");
}
