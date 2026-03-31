#!/usr/bin/env tsx

/**
 * Script som finner øvelser med tekstbaserte spillerantall (f.eks. "ti mot ti")
 * som ikke fanges opp av regex-pattern som ser etter tall
 */

import { allExercises } from '../src/data/exercises';

console.log('🔍 Søker etter øvelser med tekstbaserte spillerantall...\n');

// Norske tallord 1-11
const norwegianNumbers: Record<string, number> = {
  'en': 1, 'ett': 1,
  'to': 2,
  'tre': 3,
  'fire': 4,
  'fem': 5,
  'seks': 6,
  'sju': 7, 'syv': 7,
  'åtte': 8,
  'ni': 9,
  'ti': 10,
  'elleve': 11,
};

// Bygg regex for å finne "X mot Y" eller "X v Y" med teksttall
const numberWords = Object.keys(norwegianNumbers).join('|');
const textNumberPattern = new RegExp(
  `\\b(${numberWords})\\s+(mot|v|vs)\\s+(${numberWords})\\b`,
  'gi'
);

const issues: Array<{
  id: string;
  name: string;
  source: string | undefined;
  match: string;
  playersMin: number;
  playersMax: number;
  expectedMin: number;
  expectedMax: number;
}> = [];

allExercises.forEach((exercise) => {
  const searchText = `${exercise.name} ${exercise.description}`.toLowerCase();

  const matches = Array.from(searchText.matchAll(textNumberPattern));

  matches.forEach((match) => {
    const fullMatch = match[0];
    const num1Word = match[1];
    const num2Word = match[3];

    const num1 = norwegianNumbers[num1Word];
    const num2 = norwegianNumbers[num2Word];

    if (num1 && num2) {
      const expectedMin = num1 + num2;
      const expectedMax = (num1 + num2) * 2;

      // Sjekk om playersMin/Max er feil estimert
      if (exercise.playersMin < expectedMin || exercise.playersMax < expectedMin) {
        issues.push({
          id: exercise.id,
          name: exercise.name,
          source: exercise.source,
          match: fullMatch,
          playersMin: exercise.playersMin,
          playersMax: exercise.playersMax,
          expectedMin,
          expectedMax,
        });
      }
    }
  });
});

if (issues.length === 0) {
  console.log('✅ Ingen problemer funnet!\n');
} else {
  console.log(`⚠️  Fant ${issues.length} øvelser med potensielt feil spillerantall:\n`);
  console.log('─'.repeat(80));

  issues.forEach((issue, idx) => {
    console.log(`${idx + 1}. ${issue.name} (${issue.id})`);
    console.log(`   Kilde: ${issue.source}`);
    console.log(`   Match: "${issue.match}"`);
    console.log(`   Nåværende: min=${issue.playersMin}, max=${issue.playersMax}`);
    console.log(`   Forventet: min=${issue.expectedMin}, max=${issue.expectedMax}`);
    console.log('');
  });

  console.log('─'.repeat(80));
  console.log(`\nTotalt: ${issues.length} øvelser med mulig feil\n`);
}
