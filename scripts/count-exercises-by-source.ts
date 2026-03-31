#!/usr/bin/env tsx

/**
 * Script som teller antall øvelser per kilde
 *
 * Viser:
 * - Totalt antall øvelser
 * - Antall øvelser per kilde (source)
 * - Prosentandel per kilde
 */

import { allExercises } from '../src/data/exercises';
import type { ExerciseSource } from '../src/data/exercises';

console.log('📊 Antall øvelser per kilde\n');

// Tell antall per source
const countsBySource = allExercises.reduce((acc, exercise) => {
  const source = exercise.source || 'undefined';
  acc[source] = (acc[source] || 0) + 1;
  return acc;
}, {} as Record<ExerciseSource | 'undefined', number>);

// Sorter etter antall (høyest først)
const sortedSources = Object.entries(countsBySource)
  .sort(([, a], [, b]) => b - a);

const totalCount = allExercises.length;

console.log(`Totalt antall øvelser: ${totalCount}\n`);

console.log('Fordeling per kilde:');
console.log('─'.repeat(50));

sortedSources.forEach(([source, count]) => {
  const percentage = ((count / totalCount) * 100).toFixed(1);
  const bar = '█'.repeat(Math.round(count / 10));
  console.log(`${source.padEnd(12)} ${String(count).padStart(4)} (${percentage.padStart(5)}%)  ${bar}`);
});

console.log('─'.repeat(50));
console.log(`${'TOTALT'.padEnd(12)} ${String(totalCount).padStart(4)}\n`);

// Vis ekstra statistikk
console.log('📈 Ekstra statistikk:\n');

// Største kilde
const [largestSource, largestCount] = sortedSources[0];
console.log(`Største kilde: ${largestSource} (${largestCount} øvelser)`);

// Minste kilde
const [smallestSource, smallestCount] = sortedSources[sortedSources.length - 1];
console.log(`Minste kilde: ${smallestSource} (${smallestCount} øvelser)`);

// Gjennomsnitt per kilde
const avgPerSource = (totalCount / sortedSources.length).toFixed(1);
console.log(`Gjennomsnitt per kilde: ${avgPerSource} øvelser`);

// Antall kilder
console.log(`Antall kilder: ${sortedSources.length}`);
