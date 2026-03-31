#!/usr/bin/env tsx

import { allExercises } from '../src/data/exercises.js';

console.log('🔍 Søker etter øvelser for trening 31.03.26\n');

// 1. Skadefri / Oppvarming
console.log('1️⃣  SKADEFRI / OPPVARMING');
console.log('─'.repeat(60));
const skadefri = allExercises.filter(e =>
  e.category === 'fixed-warmup' ||
  (e.category === 'warmup' && (e.name.toLowerCase().includes('skadefri') || e.name.toLowerCase().includes('oppvarming')))
);
skadefri.slice(0, 5).forEach(e => {
  console.log(`${e.id.padEnd(25)} ${e.name}`);
});
console.log();

// 2. Pasning i bevegelse / Rund firkant
console.log('2️⃣  PASNING I BEVEGELSE / RUND FIRKANT');
console.log('─'.repeat(60));
const pasning = allExercises.filter(e =>
  e.theme === 'pasning' &&
  (e.name.toLowerCase().includes('bevegelse') ||
   e.name.toLowerCase().includes('firkant') ||
   e.name.toLowerCase().includes('rund') ||
   e.description.toLowerCase().includes('firkant'))
);
pasning.slice(0, 8).forEach(e => {
  console.log(`${e.id.padEnd(25)} ${e.name.substring(0, 55)}`);
});
console.log();

// 3. 4v4 med joker
console.log('3️⃣  4V4 MED JOKER');
console.log('─'.repeat(60));
const fourVfour = allExercises.filter(e =>
  (e.name.toLowerCase().includes('4v4') ||
   e.name.toLowerCase().includes('4 v 4') ||
   e.name.toLowerCase().includes('fire mot fire')) &&
  (e.name.toLowerCase().includes('joker') ||
   e.description.toLowerCase().includes('joker'))
);
fourVfour.slice(0, 5).forEach(e => {
  console.log(`${e.id.padEnd(25)} ${e.name.substring(0, 55)}`);
});
console.log();

// 4. Skudd / Avslutning
console.log('4️⃣  SKUDD / AVSLUTNING');
console.log('─'.repeat(60));
const skudd = allExercises.filter(e =>
  e.theme === 'avslutning' &&
  (e.name.toLowerCase().includes('skudd') ||
   e.name.toLowerCase().includes('avslut'))
);
skudd.slice(0, 8).forEach(e => {
  console.log(`${e.id.padEnd(25)} ${e.name.substring(0, 55)}`);
});
console.log();

// 5. Spill med 4 små mål + vegg
console.log('5️⃣  SPILL MED 4 SMÅ MÅL + VEGG');
console.log('─'.repeat(60));
const fireMal = allExercises.filter(e =>
  e.category === 'game' &&
  (e.name.toLowerCase().includes('4 små mål') ||
   e.name.toLowerCase().includes('fire mål') ||
   e.name.toLowerCase().includes('fire små') ||
   (e.description.toLowerCase().includes('fire') && e.description.toLowerCase().includes('små') && e.description.toLowerCase().includes('mål')))
);
fireMal.slice(0, 5).forEach(e => {
  console.log(`${e.id.padEnd(25)} ${e.name.substring(0, 55)}`);
});

const vegg = allExercises.filter(e =>
  e.category === 'game' &&
  (e.name.toLowerCase().includes('vegg') ||
   e.description.toLowerCase().includes('vegg'))
);
if (vegg.length > 0) {
  console.log('\nMed vegger:');
  vegg.slice(0, 5).forEach(e => {
    console.log(`${e.id.padEnd(25)} ${e.name.substring(0, 55)}`);
  });
}
console.log();

// 6. Spill med store mål
console.log('6️⃣  SPILL MED STORE MÅL');
console.log('─'.repeat(60));
const storeMal = allExercises.filter(e =>
  e.category === 'game' &&
  (e.name.toLowerCase().includes('keeper') ||
   e.name.toLowerCase().includes('stort mål') ||
   e.name.toLowerCase().includes('store mål') ||
   (e.description.toLowerCase().includes('keeper') && e.name.toLowerCase().includes('spill')))
);
storeMal.slice(0, 8).forEach(e => {
  console.log(`${e.id.padEnd(25)} ${e.name.substring(0, 55)}`);
});
console.log();

console.log('💡 Tips: Bruk søkefunksjonen i appen for å finne flere variasjoner');
