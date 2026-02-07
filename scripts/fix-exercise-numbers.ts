/**
 * Script for å fikse exerciseNumber slik at alle øvelser i samme kategori
 * har unike nummer. Dette sikrer at kodene (f.eks. S12, K45) blir unike.
 */

import { allExercises } from '../src/data/exercises';
import * as fs from 'fs';
import * as path from 'path';

// Alle filer som inneholder øvelser
const dataDir = path.join(__dirname, '../src/data');
const exerciseFiles = [
  'exercises.ts',
  'dbu-exercises.ts',
  'hyballa-exercises.ts',
  'bangsbo-exercises.ts',
  'dugger-exercises.ts',
  'rondo-exercises.ts',
  'smallsided-exercises.ts',
  'tiim-exercises.ts',
  'uefa-exercises.ts'
];

// Les alle filene inn i minnet
const fileContents: Record<string, string> = {};
for (const file of exerciseFiles) {
  const filePath = path.join(dataDir, file);
  if (fs.existsSync(filePath)) {
    fileContents[file] = fs.readFileSync(filePath, 'utf-8');
  }
}

console.log(`Total exercises: ${allExercises.length}`);
console.log(`Files loaded: ${Object.keys(fileContents).length}`);

// Group by category
const byCategory: Record<string, typeof allExercises> = {};
for (const ex of allExercises) {
  if (!byCategory[ex.category]) {
    byCategory[ex.category] = [];
  }
  byCategory[ex.category].push(ex);
}

// Find duplicates per category
const changes: { id: string; oldNumber: number; newNumber: number }[] = [];

for (const [category, exs] of Object.entries(byCategory)) {
  const numberCounts: Record<number, (typeof allExercises)> = {};
  for (const ex of exs) {
    const num = ex.exerciseNumber ?? 0;
    if (!numberCounts[num]) {
      numberCounts[num] = [];
    }
    numberCounts[num].push(ex);
  }
  
  // Find duplicates
  const duplicates = Object.entries(numberCounts)
    .filter(([, arr]) => arr.length > 1);
  
  if (duplicates.length === 0) {
    console.log(`${category}: OK`);
    continue;
  }
  
  console.log(`${category}: ${duplicates.length} duplicate numbers`);
  
  // Find highest number in category
  let maxNumber = Math.max(...exs.map(e => e.exerciseNumber ?? 0));
  
  // Renumber duplicates (keep first, renumber rest)
  for (const [, arr] of duplicates) {
    for (let i = 1; i < arr.length; i++) {
      maxNumber++;
      const ex = arr[i];
      changes.push({
        id: ex.id,
        oldNumber: ex.exerciseNumber ?? 0,
        newNumber: maxNumber
      });
    }
  }
}

if (changes.length === 0) {
  console.log('\nNo changes needed!');
  process.exit(0);
}

console.log(`\nTotal changes: ${changes.length}`);

// Apply changes across all files
let changesApplied = 0;

for (const change of changes) {
  let found = false;
  
  // Search in all files
  for (const [fileName, content] of Object.entries(fileContents)) {
    const lines = content.split('\n');
    
    // Find the line with this specific id (supports both TS object style and JSON-ish style)
    let idLineIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (
        line.includes(`id: "${change.id}"`) ||
        line.includes(`id: '${change.id}'`) ||
        line.includes(`"id": "${change.id}"`) ||
        line.includes(`"id": '${change.id}'`)
      ) {
        idLineIndex = i;
        break;
      }
    }
    
    if (idLineIndex === -1) continue;
    
    // Look for exerciseNumber within 10 lines before or after the id line
    for (let j = Math.max(0, idLineIndex - 10); j <= Math.min(lines.length - 1, idLineIndex + 10); j++) {
      const line = lines[j];
      const match = line.match(/^(\s*)(exerciseNumber|"exerciseNumber"):\s*(\d+),?\s*$/);
      if (match && parseInt(match[3]) === change.oldNumber) {
        const indent = match[1];
        const key = match[2];
        lines[j] = `${indent}${key}: ${change.newNumber},`;
        fileContents[fileName] = lines.join('\n');
        found = true;
        changesApplied++;
        console.log(`  ${change.id}: ${change.oldNumber} -> ${change.newNumber} (${fileName})`);
        break;
      }
    }
    
    if (found) break;
  }
  
  if (!found) {
    console.log(`  WARNING: Could not find "${change.id}"`);
  }
}

// Write all files back
for (const [fileName, content] of Object.entries(fileContents)) {
  const filePath = path.join(dataDir, fileName);
  fs.writeFileSync(filePath, content, 'utf-8');
}

console.log(`\nChanges applied: ${changesApplied}`);
console.log('Files updated successfully!');
console.log('\nRun `npx tsx scripts/check-exercise-codes.ts` to verify.');
