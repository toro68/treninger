const fs = require('fs');
const path = require('path');

// Les tiim-raw.json
const rawPath = path.join(__dirname, '..', 'src', 'data', 'tiim-raw.json');
const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

// Mapping fra tiim-tema til vårt format
const themeMapping = {
  'score mål': 'avslutning',
  'hindre mål': 'forsvar',
  'komme til avslutning – score mål': 'avslutning',
  'hindre avslutning - hindre mål': 'forsvar',
  'spille oss fremover i banen': 'pasning',
  'vinne ball – hindre motstander å spille forbi oss': 'forsvar',
  'presse – lede - styre': 'forsvar',
  'sjef over ballen': 'teknikk',
  'fotballek': 'lek',
  'avslutning på mål': 'avslutning',
};

// Mapping fra tiim-type til category
const categoryMapping = {
  'oppvarming': 'warmup',
  'spill': 'game',
  'deløvelse': 'station',
  'sjef over ballen': 'station',
  'fotballek': 'warmup',
  'avslutning på mål': 'station',
  'spille med og mot': 'game',
};

// Estimer spillerantall fra navn
function estimatePlayerCount(name, organisering) {
  const text = `${name} ${organisering}`.toLowerCase();
  
  // Sjekk for eksplisitte tall
  const patterns = [
    { regex: /(\d+)\s*mot\s*(\d+)/i, calc: (m) => ({ min: parseInt(m[1]) + parseInt(m[2]), max: (parseInt(m[1]) + parseInt(m[2])) * 2 }) },
    { regex: /(\d+)v(\d+)/i, calc: (m) => ({ min: parseInt(m[1]) + parseInt(m[2]), max: (parseInt(m[1]) + parseInt(m[2])) * 2 }) },
    { regex: /(\d+)\s*-\s*(\d+)\s*spillere/i, calc: (m) => ({ min: parseInt(m[1]), max: parseInt(m[2]) }) },
  ];
  
  for (const { regex, calc } of patterns) {
    const match = text.match(regex);
    if (match) {
      const result = calc(match);
      // Legg til litt margin
      return { min: Math.max(2, result.min), max: Math.min(30, result.max + 4) };
    }
  }
  
  // Fallback basert på nøkkelord
  if (text.includes('1 mot 1') || text.includes('1v1')) return { min: 2, max: 16 };
  if (text.includes('2 mot 2') || text.includes('2v2')) return { min: 4, max: 16 };
  if (text.includes('3 mot 3') || text.includes('3v3')) return { min: 6, max: 18 };
  if (text.includes('4 mot 4') || text.includes('4v4')) return { min: 8, max: 20 };
  if (text.includes('5 mot 5') || text.includes('5v5')) return { min: 10, max: 22 };
  if (text.includes('6 mot 6') || text.includes('6v6')) return { min: 12, max: 24 };
  if (text.includes('7 mot 7') || text.includes('7v7')) return { min: 14, max: 26 };
  
  // Default
  return { min: 6, max: 20 };
}

// Estimer varighet
function estimateDuration(name, type) {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('oppvarming')) return 10;
  if (type.some(t => t.toLowerCase() === 'oppvarming')) return 8;
  if (type.some(t => t.toLowerCase() === 'spill')) return 15;
  
  return 12; // Default
}

// Finn beste tema
function findTheme(temaList) {
  if (!temaList || temaList.length === 0) return 'teknikk';
  
  for (const tema of temaList) {
    const normalized = tema.toLowerCase().trim();
    if (themeMapping[normalized]) {
      return themeMapping[normalized];
    }
  }
  
  // Prøv delvis match
  const firstTema = temaList[0].toLowerCase();
  if (firstTema.includes('score') || firstTema.includes('avslutning')) return 'avslutning';
  if (firstTema.includes('hindre') || firstTema.includes('forsvar') || firstTema.includes('presse')) return 'forsvar';
  if (firstTema.includes('spille') || firstTema.includes('pasning')) return 'pasning';
  if (firstTema.includes('ball') || firstTema.includes('teknikk')) return 'teknikk';
  
  return 'teknikk';
}

// Finn beste kategori
function findCategory(typeList, name) {
  const nameLower = name.toLowerCase();
  
  // Sjekk navn først
  if (nameLower.includes('oppvarming')) return 'warmup';
  if (nameLower.includes('spill') && !nameLower.includes('overtall')) return 'game';
  
  if (!typeList || typeList.length === 0) return 'station';
  
  for (const type of typeList) {
    const normalized = type.toLowerCase().trim();
    if (categoryMapping[normalized]) {
      return categoryMapping[normalized];
    }
  }
  
  // Prøv delvis match
  const firstType = typeList[0].toLowerCase();
  if (firstType.includes('oppvarming')) return 'warmup';
  if (firstType.includes('spill')) return 'game';
  
  return 'station';
}

// Sjekk om øvelsen er skalerbar (1v1, 2v2, etc.)
function isScalable(name) {
  const patterns = [/1\s*v\s*1/i, /1\s*mot\s*1/i, /2\s*v\s*2/i, /2\s*mot\s*2/i, /3\s*v\s*3/i, /3\s*mot\s*3/i];
  return patterns.some(p => p.test(name));
}

// Parse variasjoner fra tekst
function parseVariations(variasjonerText) {
  if (!variasjonerText) return [];
  if (Array.isArray(variasjonerText)) return variasjonerText.filter(v => v && v.trim());
  
  // Split på bullet points eller linjeskift
  return variasjonerText
    .split(/[•\n]/)
    .map(v => v.trim())
    .filter(v => v.length > 3);
}

// Parse læringsmomenter til coaching points
function parseCoachingPoints(laeringsmomenter) {
  if (!laeringsmomenter) return [];
  
  // Split på bullet points, linjeskift, eller "Momenter"
  const points = laeringsmomenter
    .replace(/Momenter (angrep|forsvar)/gi, '')
    .split(/[•\n-]/)
    .map(p => p.trim())
    .filter(p => p.length > 5 && !p.toLowerCase().startsWith('momenter'));
  
  return points.slice(0, 5); // Maks 5 punkter
}

// Konverter en øvelse
function convertExercise(tiimExercise, index) {
  const { name, sourceUrl, tema, type, organisering, variasjoner, laeringsmomenter, kommentar } = tiimExercise;
  
  if (!name) return null;
  
  const playerCount = estimatePlayerCount(name, organisering || '');
  const category = findCategory(type, name);
  
  return {
    id: `tiim-${index + 1}`,
    exerciseNumber: index + 1,
    name: name.trim(),
    category,
    duration: estimateDuration(name, type || []),
    playersMin: playerCount.min,
    playersMax: playerCount.max,
    theme: findTheme(tema),
    equipment: ['kjegler', 'baller'], // Standard utstyr
    description: (organisering || '').trim() || name,
    coachingPoints: parseCoachingPoints(laeringsmomenter),
    variations: parseVariations(variasjoner),
    scalable: isScalable(name),
    source: 'tiim',
    sourceUrl: sourceUrl || '',
  };
}

// Hovedlogikk
console.log(`Konverterer ${rawData.exercises.length} øvelser fra tiim.no...\n`);

const converted = rawData.exercises
  .map((ex, i) => convertExercise(ex, i))
  .filter(ex => ex !== null);

// Generer TypeScript-fil
const tsContent = `// Auto-generert fra tiim.no - ${new Date().toISOString().split('T')[0]}
// Kilde: ${rawData.sourceUrl}

import type { Exercise } from './exercises';

export const tiimExercises: Exercise[] = ${JSON.stringify(converted, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'tiim-converted.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');

// Statistikk
const stats = {
  total: converted.length,
  byCategory: {},
  byTheme: {},
};

converted.forEach(ex => {
  stats.byCategory[ex.category] = (stats.byCategory[ex.category] || 0) + 1;
  stats.byTheme[ex.theme] = (stats.byTheme[ex.theme] || 0) + 1;
});

console.log(`✓ Konverterte ${stats.total} øvelser\n`);
console.log('Fordeling per kategori:');
Object.entries(stats.byCategory).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
console.log('\nFordeling per tema:');
Object.entries(stats.byTheme).forEach(([theme, count]) => {
  console.log(`  ${theme}: ${count}`);
});

console.log(`\n✓ Lagret til ${outputPath}`);
console.log('\nNeste steg: Importer tiimExercises i exercises.ts');
