import fs from 'fs';
import path from 'path';
import { uefaAnalyses } from '../src/data/uefaAnalyses';

const docsDir = path.join(__dirname, '../docs/uefa');
const files = fs.readdirSync(docsDir);

const txtFiles = files.filter(f => f.endsWith('.txt') && f.match(/^[A-Z]\d{2}/));
const mdFiles = files.filter(f => f.endsWith('.md') && f.match(/^[A-Z]\d{2}/));

const codesInDocs = new Set<string>();
txtFiles.forEach(f => {
  const match = f.match(/^([A-Z]\d{2})/);
  if (match) codesInDocs.add(match[1]);
});
mdFiles.forEach(f => {
  const match = f.match(/^([A-Z]\d{2})/);
  if (match) codesInDocs.add(match[1]);
});

const codesInApp = new Set(uefaAnalyses.map(a => a.kode));

console.log('--- UEFA Audit ---');
console.log(`Total unique codes in docs: ${codesInDocs.size}`);
console.log(`Total unique codes in app: ${codesInApp.size}`);

const missingInApp = [...codesInDocs].filter(c => !codesInApp.has(c)).sort();
const missingInDocs = [...codesInApp].filter(c => !codesInDocs.has(c)).sort();

console.log('\nCodes in docs but missing in app:');
missingInApp.forEach(c => console.log(`- ${c}`));

console.log('\nCodes in app but missing in docs:');
missingInDocs.forEach(c => console.log(`- ${c}`));

console.log('\nDetailed check of app usage:');
uefaAnalyses.forEach(a => {
  console.log(`\n[${a.kode}] ${a.tittel}`);
  console.log(`  ID: ${a.id}`);
  console.log(`  File: ${a.kildefil}`);
  const fileExists = fs.existsSync(path.join(docsDir, a.kildefil));
  console.log(`  File exists: ${fileExists ? 'Yes' : 'NO'}`);
  console.log(`  Exercises: ${a.ovelser.length}`);
  console.log(`  KPIs: ${a.kpier.length}`);
  console.log(`  Focus points: ${a.fokuspunkter.length}`);
});
