#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Chest Dugger - Create a World Class Soccer Defense_ A 100 Soccer Drills, Tactics and Techniques to Shutout the Competition-Abhishek Kumar (2021).pdf';
const DATA_PATH = path.join(ROOT, 'src/data/dugger-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/dugger-defense');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/dugger-defense-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/dugger-image-map.ts');

const FORCED_MISSING_IDS = new Set([
  'dugger-high-press',
  'dugger-block-tackle',
  'dugger-man-mark-zone',
  'dugger-442-defense',
  'dugger-front-press',
  'dugger-diamond-defense',
  'dugger-poke-tackle',
  'dugger-keeper-reactions',
  'dugger-play-out-1',
]);

const MANUAL_PAGE_BY_ID = {
  'dugger-offside-trap': 57,
  'dugger-recovery-run': 56,
  'dugger-play-out-2': 94,
};

const MANUAL_IMAGE_INDEX_BY_ID = {
  // 0-based index after sorting extracted embedded images by descending area.
  'dugger-man-mark-deadball': 0,
  'dugger-defend-deep-corner': 0,
  'dugger-defend-wall': 0,
  'dugger-4231-defense': 0,
  'dugger-4141-defense': 0,
  'dugger-rondo-2v1': 0,
  'dugger-3v2-cover': 1,
  'dugger-keeper-1v1': 0,
  'dugger-play-out-2': 0,
};

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

function ensureTools() {
  const tools = ['pdfinfo', 'pdftotext', 'pdfimages', 'magick'];
  for (const tool of tools) {
    try {
      run(`command -v ${tool}`);
    } catch {
      throw new Error(`Mangler verktøy: ${tool}`);
    }
  }
}

function normalizeText(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(input) {
  return normalizeText(input)
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function trimArgs() {
  return '-fuzz 2% -trim +repage -bordercolor white -border 12';
}

function parseExercises() {
  const src = fs.readFileSync(DATA_PATH, 'utf8');
  const blocks = src.match(/\{[\s\S]*?\n\s*\},?/g) || [];
  return blocks
    .filter((block) => block.includes('source: "dugger"'))
    .map((block) => {
      const id = block.match(/id:\s*"([^"]+)"/)?.[1] ?? null;
      const name = block.match(/name:\s*"([^"]+)"/)?.[1] ?? null;
      const sourceRef = block.match(/sourceRef:\s*"([^"]+)"/)?.[1] ?? null;
      if (!id || !name || !sourceRef) {
        throw new Error(`Ufullstendig Dugger-blokk: ${block.slice(0, 120)}`);
      }

      const title = sourceRef.match(/Dugger 2021 '(.+)'$/)?.[1] ?? sourceRef;
      const variants = title.split(/\s*\/\s*/).map((part) => normalizeText(part));
      return {
        id,
        name,
        sourceRef,
        title,
        variants,
      };
    });
}

function getPdfPageCount() {
  const info = run(`pdfinfo '${shellEscape(PDF_PATH)}'`);
  const match = info.match(/Pages:\s+(\d+)/);
  if (!match) throw new Error('Klarte ikke lese sidetall fra pdfinfo');
  return Number.parseInt(match[1], 10);
}

function buildPageTexts(pageCount) {
  const pages = [];
  const safePdf = shellEscape(PDF_PATH);
  for (let page = 1; page <= pageCount; page += 1) {
    const text = run(`pdftotext -f ${page} -l ${page} -layout '${safePdf}' - 2>/dev/null`);
    pages.push(normalizeText(text));
  }
  return pages;
}

function buildImageStats() {
  const output = run(`pdfimages -list '${shellEscape(PDF_PATH)}' 2>/dev/null`);
  const stats = new Map();
  for (const line of output.split(/\r?\n/).slice(2)) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 6) continue;
    const page = Number.parseInt(parts[0], 10);
    const type = parts[2];
    const width = Number.parseInt(parts[3], 10);
    const height = Number.parseInt(parts[4], 10);
    if (!Number.isFinite(page) || !Number.isFinite(width) || !Number.isFinite(height)) continue;
    if (type !== 'image') continue;
    if (width < 150 || height < 150) continue;
    const current = stats.get(page) ?? { count: 0, maxArea: 0 };
    current.count += 1;
    current.maxArea = Math.max(current.maxArea, width * height);
    stats.set(page, current);
  }
  return stats;
}

function findPage(entry, pageTexts, imageStats) {
  const hits = [];
  for (const variant of entry.variants) {
    for (let index = 0; index < pageTexts.length; index += 1) {
      if (pageTexts[index].includes(variant)) {
        hits.push(index + 1);
      }
    }
  }

  const uniqueHits = [...new Set(hits)].sort((a, b) => a - b);
  if (uniqueHits.length === 0) {
    throw new Error(`Fant ingen PDF-side for ${entry.id}: ${entry.title}`);
  }

  const hitWithImage = uniqueHits.find((page) => (imageStats.get(page)?.count ?? 0) > 0);
  if (hitWithImage) return hitWithImage;

  const nextWithImage = uniqueHits
    .map((page) => page + 1)
    .find((page) => (imageStats.get(page)?.count ?? 0) > 0);
  if (nextWithImage) return nextWithImage;

  return uniqueHits[0];
}

function extractEmbeddedPageImages(page, tempDir) {
  const safePdf = shellEscape(PDF_PATH);
  const pageDir = path.join(tempDir, `p${page}`);
  fs.mkdirSync(pageDir, { recursive: true });
  const prefix = path.join(pageDir, 'embedded');
  run(`pdfimages -f ${page} -l ${page} -all '${safePdf}' '${shellEscape(prefix)}' 2>/dev/null`);

  return fs.readdirSync(pageDir)
    .filter((name) => name.startsWith('embedded-'))
    .map((name) => {
      const filePath = path.join(pageDir, name);
      const dims = run(`magick identify -format '%w %h' '${shellEscape(filePath)}'`).trim().split(' ');
      const width = Number.parseInt(dims[0], 10);
      const height = Number.parseInt(dims[1], 10);
      return {
        filePath,
        width,
        height,
        area: width * height,
        bytes: fs.statSync(filePath).size,
      };
    })
    .filter((image) => Number.isFinite(image.area) && image.area >= 25000)
    .sort((a, b) => b.area - a.area);
}

function writeWebp(srcPath, outPath) {
  run(`magick '${shellEscape(srcPath)}' ${trimArgs()} -strip -quality 78 '${shellEscape(outPath)}'`);
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-${slugify(entry.name)}.webp`;
}

function selectSourceImage(entry, images) {
  const manualIndex = MANUAL_IMAGE_INDEX_BY_ID[entry.id];
  if (Number.isInteger(manualIndex)) {
    if (manualIndex < 0 || manualIndex >= images.length) {
      throw new Error(
        `Ugyldig MANUAL_IMAGE_INDEX_BY_ID for ${entry.id}: ${manualIndex} (har ${images.length} kandidater)`
      );
    }

    return {
      sourceImage: images[manualIndex],
      selectedImageIndex: manualIndex,
      selectionMode: 'manual-embedded-image-index',
      isAmbiguous: images.length > 1,
    };
  }

  if (images.length === 1) {
    return {
      sourceImage: images[0],
      selectedImageIndex: 0,
      selectionMode: 'single-embedded-image',
      isAmbiguous: false,
    };
  }

  return null;
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const pageCount = getPdfPageCount();
  const pageTexts = buildPageTexts(pageCount);
  const imageStats = buildImageStats();
  const exercises = parseExercises().map((entry) => {
    if (FORCED_MISSING_IDS.has(entry.id)) {
      return { ...entry, page: null };
    }

    return {
      ...entry,
      page: MANUAL_PAGE_BY_ID[entry.id] ?? findPage(entry, pageTexts, imageStats),
    };
  });

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tempDir = fs.mkdtempSync('/tmp/dugger-defense-');
  const manifestEntries = [];
  const missingIllustrations = [];

  try {
    for (const entry of exercises) {
      if (!entry.page) {
        missingIllustrations.push({ id: entry.id, name: entry.name, sourceRef: entry.sourceRef, page: null });
        console.log(`MISS ${entry.id} -> no trusted illustration`);
        continue;
      }

      const images = extractEmbeddedPageImages(entry.page, tempDir);
      if (images.length === 0) {
        missingIllustrations.push({
          id: entry.id,
          name: entry.name,
          sourceRef: entry.sourceRef,
          page: entry.page,
          reason: 'no-embedded-images',
        });
        console.log(`MISS ${entry.id} -> page ${entry.page}`);
        continue;
      }

      const selected = selectSourceImage(entry, images);
      if (!selected) {
        missingIllustrations.push({
          id: entry.id,
          name: entry.name,
          sourceRef: entry.sourceRef,
          page: entry.page,
          reason: 'ambiguous-multiple-embedded-images',
          candidateCount: images.length,
        });
        console.log(`MISS ${entry.id} -> page ${entry.page} has ${images.length} embedded images; add MANUAL_IMAGE_INDEX_BY_ID override`);
        continue;
      }

      const { sourceImage, selectedImageIndex, selectionMode, isAmbiguous } = selected;
      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      writeWebp(sourceImage.filePath, outPath);
      const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const imageUrl = `/book-illustrations/dugger-defense/${fileName}`;
      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        title: entry.title,
        sourceRef: entry.sourceRef,
        page: entry.page,
        fileName,
        imageUrl,
        cropMode: selectionMode,
        selectedImageIndex,
        sourceWidth: sourceImage.width,
        sourceHeight: sourceImage.height,
        sourceBytes: sourceImage.bytes,
        width: Number.parseInt(dims[0], 10),
        height: Number.parseInt(dims[1], 10),
        bytes: fs.statSync(outPath).size,
        embeddedImagesOnPage: images.length,
        ambiguousPage: isAmbiguous,
      });
      console.log(`OK ${entry.id} -> page ${entry.page} (image ${selectedImageIndex + 1}/${images.length}, ${selectionMode})`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    book: 'dugger-defense',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercises: exercises.length,
    totalIllustratedExercises: manifestEntries.length,
    missingIllustrations,
    entries: manifestEntries,
  };
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries.map((entry) => `  "${entry.id}": "${entry.imageUrl}",`).join('\n');
  fs.writeFileSync(MAP_TS_PATH, `export const duggerImageById: Record<string, string> = {\n${mapLines}\n};\n`, 'utf8');

  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();