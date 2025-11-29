/**
 * Test for å verifisere at søk på øvelseskoder fungerer
 */

import { allExercises, getExerciseCode } from '../src/data/exercises';

console.log('=== SØKETEST FOR ØVELSESKODER ===\n');
console.log(`Totalt antall øvelser: ${allExercises.length}\n`);

// Simuler søkefunksjonen fra ExerciseManager
function searchExercises(query: string) {
  const needle = query.toLowerCase();
  return allExercises.filter((exercise) => {
    // Søk i navn
    if (exercise.name.toLowerCase().includes(needle)) return true;
    // Søk i øvelseskode
    const code = getExerciseCode(exercise).toLowerCase();
    if (code.includes(needle)) return true;
    return false;
  });
}

// Testkasus
const testCases = ['s45', 'S45', 'k45', 'K45', 'r1', 'R1', 'o1', 'O1'];

for (const query of testCases) {
  const results = searchExercises(query);
  console.log(`Søk: "${query}" -> ${results.length} treff`);
  
  // Vis de første 3 resultatene
  results.slice(0, 3).forEach(e => {
    console.log(`  - ${getExerciseCode(e)}: ${e.name}`);
  });
  if (results.length > 3) {
    console.log(`  ... og ${results.length - 3} flere`);
  }
  console.log('');
}

// Finn eksakt S45
console.log('=== EKSAKT KODE-SØKING ===\n');
const exactCodes = ['S45', 'K45', 'R1', 'O1'];
for (const code of exactCodes) {
  const exact = allExercises.find(e => getExerciseCode(e) === code);
  if (exact) {
    console.log(`${code}: ${exact.name} (id: ${exact.id})`);
  } else {
    console.log(`${code}: IKKE FUNNET`);
  }
}
