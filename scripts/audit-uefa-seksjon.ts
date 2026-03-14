import fs from 'fs';
import path from 'path';
import { uefaAnalyses } from '../src/data/uefaAnalyses';

const uefaSeksjonPath = path.join(__dirname, '../src/components/UEFASeksjon.tsx');
const content = fs.readFileSync(uefaSeksjonPath, 'utf-8');

const hardcodedCodes = new Set<string>();
const regex = /valgtAnalyse\.kode === "([A-Z0-9]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  hardcodedCodes.add(match[1]);
}

console.log('--- UEFA Seksjon Hardcoded Audit ---');
console.log(`Total analyses: ${uefaAnalyses.length}`);
console.log(`Hardcoded sections found: ${hardcodedCodes.size}`);

const missingHardcoded = uefaAnalyses.filter(a => !hardcodedCodes.has(a.kode)).map(a => a.kode);
console.log('\nAnalyses missing hardcoded sections in UEFASeksjon.tsx:');
missingHardcoded.forEach(c => console.log(`- ${c}`));

const extraHardcoded = [...hardcodedCodes].filter(c => !uefaAnalyses.find(a => a.kode === c));
console.log('\nHardcoded sections for non-existent analyses:');
extraHardcoded.forEach(c => console.log(`- ${c}`));
