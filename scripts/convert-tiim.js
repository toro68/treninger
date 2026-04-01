const fs = require('fs');
const path = require('path');

// Les tiim-raw.json
const rawPath = path.join(__dirname, '..', 'src', 'data', 'tiim-raw.json');
const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

const normalizeText = (value) =>
  String(value ?? '')
    .normalize('NFKC')
    .replace(/[–—−]/g, '-')
    .replace(/[‘’´`]/g, "'")
    .replace(/[\u00a0\u202f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const exactThemeMapping = new Map([
  ['score mål', 'avslutning'],
  ['komme til avslutning - score mål', 'avslutning'],
  ['avslutning på mål', 'avslutning'],
  ['hindre avslutning - hindre mål', 'forsvar'],
  ['hindre mål', 'forsvar'],
  ['hindre tilgang på prioriterte rom', 'forsvar'],
  ['vinne ball - hindre motstander å spille forbi oss', 'forsvar'],
  ['presse - lede - styre', 'pressing'],
  ['spille oss fremover i banen', 'oppbygging'],
  ['spille med og mot', 'smålagsspill'],
  ['smålagspill', 'smålagsspill'],
  ['sjef over ballen', 'ballkontroll'],
  ['fotballek', 'lek'],
]);

const hasPattern = (text, pattern) => pattern.test(text);

const buildSearchText = (exercise) =>
  normalizeText(
    [
      exercise.name,
      ...(exercise.tema || []),
      ...(exercise.type || []),
      exercise.organisering || '',
      exercise.laeringsmomenter || '',
      exercise.kommentar || '',
    ].join(' | ')
  );

const hasTema = (temaList, expected) =>
  (temaList || []).some((tema) => normalizeText(tema) === expected);

const getTemaVariants = (tema) => {
  const normalizedTema = normalizeText(tema);
  const variants = new Set([normalizedTema]);
  const parentheticalMatches = normalizedTema.matchAll(/\(([^)]+)\)/g);

  for (const match of parentheticalMatches) {
    if (match[1]) {
      variants.add(match[1].trim());
    }
  }

  const withoutParentheses = normalizedTema.replace(/\s*\([^)]*\)/g, '').trim();
  if (withoutParentheses) {
    variants.add(withoutParentheses);
  }

  return [...variants];
};

const inferThemeFromTema = (temaList, normalizedName) => {
  const matchedThemes = new Set();

  for (const tema of temaList || []) {
    for (const variant of getTemaVariants(tema)) {
      const mapped = exactThemeMapping.get(variant);
      if (mapped) {
        matchedThemes.add(mapped);
      }
    }
  }

  if (matchedThemes.size === 0) {
    return null;
  }

  const specificThemePriority = [
    'lek',
    'rondo',
    'oppbygging',
    'pressing',
    'ballkontroll',
  ];

  for (const theme of specificThemePriority) {
    if (matchedThemes.has(theme)) {
      return theme;
    }
  }

  if (matchedThemes.has('avslutning') && matchedThemes.has('forsvar')) {
    if (hasPattern(normalizedName, /\bscore|scorings|avslut|mål\b/)) {
      return 'avslutning';
    }

    if (hasPattern(normalizedName, /\bforsvar|vinne ball|hindre|press|gjenvinning\b/)) {
      return 'forsvar';
    }

    return null;
  }

  if (matchedThemes.has('avslutning')) {
    return 'avslutning';
  }

  if (matchedThemes.has('forsvar')) {
    return 'forsvar';
  }

  if (matchedThemes.has('smålagsspill')) {
    return 'smålagsspill';
  }

  return null;
};

const inferThemeFromRules = (exercise) => {
  const normalizedName = normalizeText(exercise.name);
  const text = buildSearchText(exercise);
  const temaMatch = inferThemeFromTema(exercise.tema, normalizedName);

  if (temaMatch) return temaMatch;

  if (hasPattern(text, /dosisten|fotballek|playmakers/)) return 'lek';
  if (hasPattern(text, /\brondo\b/)) return 'rondo';
  if (hasPattern(normalizedName, /\b1\s*v\s*1\b|\b1\s*mot\s*1\b/)) return '1v1';
  if (hasPattern(text, /\binnlegg\b/)) return 'innlegg';
  if (hasPattern(text, /\bovergang|overgangsspill|omstilling|transition\b/)) return 'omstilling';
  if (hasPattern(text, /situasjonsøvelse/) && hasPattern(text, /tre småmål/) && hasPattern(text, /store målet/)) return 'omstilling';
  if (hasPattern(text, /\bgjennombrudd\b/)) return 'gjennombrudd';
  if (hasPattern(text, /ferdighetssirkel/)) return 'pasning';
  if (hasPattern(text, /prepp.?n - 3|frekvens|retningsforandring|speiling/)) return 'hurtighet';
  if (hasPattern(text, /\bdribling|drible|driblesone\b/)) return 'dribling';
  if (
    hasPattern(text, /situasjonsøvelse/) &&
    hasPattern(text, /\bjoker\b/) &&
    hasPattern(text, /\bmål/) &&
    hasPattern(text, /lagene spiller i hver sin retning|score/) 
  ) return 'smålagsspill';
  if (hasPattern(text, /\bvending|vende|skjerme egen ball\b/)) return 'ballkontroll';
  if (hasPattern(text, /\bføring\b|\bføre\b|\bfører\b|sjef over ballen|ballkontroll/)) return 'ballkontroll';
  if (hasPattern(text, /\bpasning|tredjemann|vegg(er)?\b/)) return 'pasning';
  if (hasPattern(text, /\bpress|presse - lede - styre|lede\b/)) return 'pressing';
  if (hasPattern(text, /\bforsvar|hindre mål|vinne ball|stoppe|stenge rom|beskytte målet\b/)) return 'forsvar';
  if (hasPattern(text, /\bavslut|skudd|scoring|score mål|mål\b/)) return 'avslutning';
  if (hasPattern(text, /\bspill\b|sonespill|game|smålag/)) return 'smålagsspill';

  if (hasPattern(text, /fotballek|playmakers/)) return 'lek';
  if (hasPattern(text, /spille oss fremover|oppbygg/)) return 'oppbygging';

  return 'teknikk';
};

const inferCategory = (exercise, theme) => {
  const text = buildSearchText(exercise);
  const normalizedName = normalizeText(exercise.name);

  if (hasPattern(text, /\brondo\b/)) return 'rondo';

  if (
    hasPattern(normalizedName, /prepp.?n|playmakers/) ||
    hasPattern(text, /\boppvarming\b|fotballek/) ||
    hasTema(exercise.tema, 'sjef over ballen')
  ) {
    return 'warmup';
  }

  if (
    hasPattern(text, /\bspill\b|sonespill|game/) &&
    !hasPattern(text, /situasjonsøvelse/)
  ) {
    return 'game';
  }

  if (theme === 'smålagsspill' && !hasPattern(text, /situasjonsøvelse/)) {
    return 'game';
  }

  return 'station';
};

// Estimer spillerantall fra navn
function estimatePlayerCount(name, organisering) {
  const text = `${name} ${organisering}`.toLowerCase();

  // Norske tallord 1-11
  const norwegianNumbers = {
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

  // Sjekk først for tekstbaserte tallord (f.eks. "ti mot ti", "fire mot fire")
  const numberWords = Object.keys(norwegianNumbers).join('|');
  const textNumberPattern = new RegExp(`\\b(${numberWords})\\s+(mot|v|vs)\\s+(${numberWords})\\b`, 'i');
  const textMatch = text.match(textNumberPattern);

  if (textMatch) {
    const num1 = norwegianNumbers[textMatch[1]];
    const num2 = norwegianNumbers[textMatch[3]];
    if (num1 && num2) {
      const total = num1 + num2;
      return { min: total, max: Math.min(30, total * 2) };
    }
  }

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

// Sjekk om øvelsen er skalerbar (1v1, 2v2, etc.)
function isScalable(name) {
  const matchups = [...name.matchAll(/\b(\d+)\s*(?:v|mot)\s*(\d+)\b/gi)];
  if (matchups.length !== 1) return false;

  const [, left, right] = matchups[0];
  return left === right && ['1', '2', '3'].includes(left);
}

// Parse variasjoner fra tekst
function parseVariations(variasjonerText) {
  if (!variasjonerText) return [];
  if (Array.isArray(variasjonerText)) return variasjonerText.filter(v => v && v.trim());

  // Fjern "Relaterte øvelser" hvis den kom med
  const cleaned = variasjonerText
    .replace(/Relaterte øvelser[\s\S]*/i, '')
    .replace(/^Variasjoner[:\s-]*/i, '')
    .replace(/([a-zæøå])([A-ZÆØÅ])/g, '$1\n$2')
    .trim();
  if (!cleaned) return [];

  // Split på bullet points, linjeskift, semikolon eller setningsskiller.
  const variations = cleaned
    .split(/[•\n;]|(?:\.\s+(?=[A-ZÆØÅ]))/)
    .map(v => v.trim())
    .filter(v => v.length > 10 && !v.toLowerCase().startsWith('variasjoner'));

  // Hvis vi ikke fant noe med splitting, returner hele teksten som én variasjon
  if (variations.length === 0 && cleaned.length > 10) {
    return [cleaned];
  }

  return variations;
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
  const theme = inferThemeFromRules(tiimExercise);
  const category = inferCategory(tiimExercise, theme);
  const description = [organisering, kommentar].filter(Boolean).join('\n\n').trim() || name;
  
  return {
    id: `tiim-${index + 1}`,
    exerciseNumber: index + 1,
    name: name.trim(),
    category,
    duration: estimateDuration(name, type || []),
    playersMin: playerCount.min,
    playersMax: playerCount.max,
    theme,
    equipment: ['kjegler', 'baller'], // Standard utstyr
    description,
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

import type { ExerciseData } from './exercises';
import { tiimImageById } from './tiim-image-map';

const baseTiimExercises: ExerciseData[] = ${JSON.stringify(converted, null, 2)};

export const tiimExercises: ExerciseData[] = baseTiimExercises.map((exercise) => ({
  ...exercise,
  imageUrl: exercise.imageUrl ?? tiimImageById[exercise.id],
}));
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'tiim-exercises.ts');
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
