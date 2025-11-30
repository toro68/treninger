import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { uefaAnalyses } = require('../src/data/uefaAnalyses.ts');
const { getUEFAExerciseByCode } = require('../src/data/uefa-exercises.ts');

const missing = [];

for (const analysis of uefaAnalyses) {
  for (const ref of analysis.ovelser) {
    if (!getUEFAExerciseByCode(ref.kode)) {
      missing.push({ analysis: analysis.kode, code: ref.kode });
    }
  }
}

if (missing.length > 0) {
  console.error('Følgende UEFA-øvelser mangler i databasen:');
  for (const entry of missing) {
    console.error(`- ${entry.analysis}: ${entry.code}`);
  }
  process.exit(1);
} else {
  console.log('UEFA-validering OK – alle referanser har matchende øvelser.');
}
