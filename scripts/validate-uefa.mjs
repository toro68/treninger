import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const analysesModule = await import(path.resolve(__dirname, '../src/data/uefaAnalyses.ts'));
const exercisesModule = await import(path.resolve(__dirname, '../src/data/uefa-exercises.ts'));

const { uefaAnalyses } = analysesModule;
const { getUEFAExerciseByCode } = exercisesModule;

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
