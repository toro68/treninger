#!/usr/bin/env tsx

/**
 * Script som finner øvelser med komplekse spilleroppsett som ikke fanges av enkle regex
 *
 * Eksempler:
 * - "3v3 + 3v2+K på hver side" (6 + 12 = 18 spillere)
 * - "4v4 med 4 vegger" (8 + 4 = 12 spillere)
 * - "5v5 + 2 jokere" (10 + 2 = 12 spillere)
 */

import { allExercises } from '../src/data/exercises';

console.log('🔍 Søker etter øvelser med komplekse spilleroppsett...\n');

interface Issue {
  id: string;
  name: string;
  source: string;
  playersMin: number;
  playersMax: number;
  description: string;
  suggestedMin?: number;
  reason: string;
}

const issues: Issue[] = [];

// Hjelpefunksjon for å trekke ut tallmønstre
function extractPlayerCounts(text: string): number[] {
  const counts: number[] = [];

  // Match XvY eller X mot Y
  const vsPattern = /(\d+)\s*(?:v|vs|mot)\s*(\d+)/gi;
  let match;
  while ((match = vsPattern.exec(text)) !== null) {
    const team1 = parseInt(match[1]);
    const team2 = parseInt(match[2]);
    counts.push(team1 + team2);
  }

  return counts;
}

// Sjekk hver øvelse
allExercises.forEach((exercise) => {
  const desc = exercise.description.toLowerCase();
  const name = exercise.name.toLowerCase();
  const searchText = `${name} ${desc}`;

  // Finn alle XvY-mønstre
  const playerCounts = extractPlayerCounts(searchText);

  if (playerCounts.length === 0) return;

  // Sjekk for indikatorer på flere grupper/sider
  const multiplierIndicators = [
    { pattern: /(?:på\s+)?(?:hver|begge)\s+sid(?:e|er)/i, multiplier: 2, name: 'på hver/begge sider' },
    { pattern: /to\s+(?:sider|baner|grupper)/i, multiplier: 2, name: 'to sider/baner/grupper' },
    { pattern: /tre\s+(?:sider|baner|grupper)/i, multiplier: 3, name: 'tre sider/baner/grupper' },
    { pattern: /fire\s+(?:sider|baner|grupper)/i, multiplier: 4, name: 'fire sider/baner/grupper' },
  ];

  let multiplier = 1;
  let multiplierReason = '';

  for (const indicator of multiplierIndicators) {
    if (indicator.pattern.test(desc)) {
      multiplier = indicator.multiplier;
      multiplierReason = indicator.name;
      break;
    }
  }

  // Sjekk for vegger/jokere
  let extraPlayers = 0;
  let extraReason = '';

  const veggerMatch = desc.match(/(\d+)\s+(?:vegger|vegg)/i);
  if (veggerMatch) {
    extraPlayers += parseInt(veggerMatch[1]);
    extraReason += `${veggerMatch[1]} vegger`;
  }

  const jokerMatch = desc.match(/(\d+)\s+(?:jokere?|joker)/i);
  if (jokerMatch) {
    const jokers = parseInt(jokerMatch[1]);
    extraPlayers += jokers;
    extraReason += (extraReason ? ', ' : '') + `${jokers} joker${jokers > 1 ? 'e' : ''}`;
  }

  // Beregn forventet minimum
  let suggestedMin = 0;
  let calculation = '';

  if (playerCounts.length === 1) {
    // Enkelt oppsett, mulig multiplisert
    const base = playerCounts[0];
    suggestedMin = base * multiplier + extraPlayers;
    calculation = multiplier > 1
      ? `${base} spillere × ${multiplier} (${multiplierReason})`
      : `${base} spillere`;
    if (extraPlayers > 0) {
      calculation += ` + ${extraPlayers} (${extraReason})`;
    }
  } else if (playerCounts.length > 1) {
    // Flere oppsett i samme øvelse
    const sum = playerCounts.reduce((a, b) => a + b, 0);
    suggestedMin = sum + extraPlayers;
    calculation = `${playerCounts.join(' + ')} spillere`;
    if (extraPlayers > 0) {
      calculation += ` + ${extraPlayers} (${extraReason})`;
    }
  }

  // Rapporter hvis playersMin er lavere enn forventet
  if (suggestedMin > 0 && exercise.playersMin < suggestedMin) {
    issues.push({
      id: exercise.id,
      name: exercise.name,
      source: exercise.source,
      playersMin: exercise.playersMin,
      playersMax: exercise.playersMax,
      description: exercise.description.substring(0, 150),
      suggestedMin,
      reason: calculation,
    });
  }
});

if (issues.length === 0) {
  console.log('✅ Ingen komplekse oppsett med feil spillerantall funnet!\n');
} else {
  console.log(`⚠️  Fant ${issues.length} øvelser med mulig feil spillerantall:\n`);
  console.log('─'.repeat(90));

  issues
    .sort((a, b) => (b.suggestedMin! - b.playersMin) - (a.suggestedMin! - a.playersMin))
    .forEach((issue, idx) => {
      const diff = issue.suggestedMin! - issue.playersMin;
      console.log(`${idx + 1}. ${issue.name} (${issue.id})`);
      console.log(`   Kilde: ${issue.source}`);
      console.log(`   Nåværende: min=${issue.playersMin}, max=${issue.playersMax}`);
      console.log(`   Foreslått: min=${issue.suggestedMin} (${issue.reason})`);
      console.log(`   Differanse: ${diff} spillere`);
      console.log(`   Beskrivelse: ${issue.description}${issue.description.length >= 150 ? '...' : ''}`);
      console.log('');
    });

  console.log('─'.repeat(90));
  console.log(`\nTotalt: ${issues.length} øvelser med mulig feil\n`);
}
