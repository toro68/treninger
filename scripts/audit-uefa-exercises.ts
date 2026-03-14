import fs from 'fs';
import path from 'path';
import { uefaAnalyses } from '../src/data/uefaAnalyses';
import { getUEFAExerciseByCode } from '../src/data/uefa-exercises';

console.log('--- UEFA Exercises Audit ---');

let totalExercises = 0;
let missingExercises = 0;

uefaAnalyses.forEach(a => {
  console.log(`\n[${a.kode}] ${a.tittel}`);
  a.ovelser.forEach(ref => {
    totalExercises++;
    const exercise = getUEFAExerciseByCode(ref.kode);
    if (exercise) {
      console.log(`  ✅ ${ref.kode}: ${exercise.name}`);
    } else {
      console.log(`  ❌ ${ref.kode}: MISSING IN uefa-exercises.ts`);
      missingExercises++;
    }
  });
});

console.log(`\nTotal exercises referenced: ${totalExercises}`);
console.log(`Missing exercises: ${missingExercises}`);
