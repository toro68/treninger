#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Michael Matkovich, Jason Davis - Elite Soccer Drills-Human Kinetics (2008).pdf';
const DATA_PATH = path.join(ROOT, 'src/data/matkovich-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/matkovich-elite-drills');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/matkovich-elite-drills-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/matkovich-image-map.ts');

const PAGE_BY_DRILL_NUMBER = {
  40: 101,
  41: 103,
  42: 105,
  55: 137,
  57: 141,
  58: 143,
  73: 181,
};

const CROP_BY_PAGE = {
  101: { yRatio: 0.0, hRatio: 0.9 },
  103: { yRatio: 0.0, hRatio: 0.92 },
  105: { yRatio: 0.02, hRatio: 0.9 },
  137: { yRatio: 0.04, hRatio: 0.88 },
  141: { yRatio: 0.02, hRatio: 0.9 },
  143: { yRatio: 0.42, hRatio: 0.48 },
  181: { yRatio: 0.36, hRatio: 0.5 },
};

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

function ensureTools() {
  const tools = ['pdfinfo', 'pdftocairo', 'magick'];
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
    .filter((block) => block.includes('source: "matkovich"'))
    .map((block) => {
      const id = block.match(/id:\s*"([^"]+)"/)?.[1] ?? null;
      const name = block.match(/name:\s*"([^"]+)"/)?.[1] ?? null;
      const sourceRef = block.match(/sourceRef:\s*"([^"]+)"/)?.[1] ?? null;
      if (!id || !name || !sourceRef) {
        throw new Error(`Ufullstendig Matkovich-blokk: ${block.slice(0, 120)}`);
      }

      const drillNumber = Number.parseInt(sourceRef.match(/Matkovich 2008 '(\d+)/)?.[1] ?? '', 10);
      if (!Number.isFinite(drillNumber)) {
        throw new Error(`Fant ikke drillnummer i sourceRef: ${sourceRef}`);
      }

      return {
        id,
        name,
        sourceRef,
        drillNumber,
        page: PAGE_BY_DRILL_NUMBER[drillNumber],
      };
    })
    .map((entry) => {
      if (!entry.page) {
        throw new Error(`Mangler sidekobling for Matkovich-drill ${entry.drillNumber} (${entry.id})`);
      }
      return entry;
    });
}

function getPdfPageCount() {
  const info = run(`pdfinfo '${shellEscape(PDF_PATH)}'`);
  const match = info.match(/Pages:\s+(\d+)/);
  if (!match) throw new Error('Klarte ikke lese sidetall fra pdfinfo');
  return Number.parseInt(match[1], 10);
}

function renderPageImage(page, tempDir) {
  const safePdf = shellEscape(PDF_PATH);
  const outBase = path.join(tempDir, `p${page}`);
  run(`pdftocairo -png -singlefile -f ${page} -l ${page} -scale-to 1800 '${safePdf}' '${shellEscape(outBase)}' >/dev/null 2>&1`);
  const srcImage = `${outBase}.png`;
  const dims = run(`magick identify -format '%w %h' '${shellEscape(srcImage)}'`).trim().split(' ');
  return {
    srcImage,
    width: Number.parseInt(dims[0], 10),
    height: Number.parseInt(dims[1], 10),
  };
}

function buildCrop(page, width, height) {
  const override = CROP_BY_PAGE[page] ?? { yRatio: 0.02, hRatio: 0.88 };
  const x = 0;
  const y = Math.max(0, Math.round(height * override.yRatio));
  const w = width;
  const h = Math.min(height - y, Math.round(height * override.hRatio));
  return { x, y, w, h };
}

function writeCropWebp(srcPath, crop, outPath) {
  run(`magick '${shellEscape(srcPath)}' -crop ${crop.w}x${crop.h}+${crop.x}+${crop.y} +repage ${trimArgs()} -strip -quality 78 '${shellEscape(outPath)}'`);
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-${slugify(entry.name)}.webp`;
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const pageCount = getPdfPageCount();
  const exercises = parseExercises();
  for (const exercise of exercises) {
    if (exercise.page < 1 || exercise.page > pageCount) {
      throw new Error(`Ugyldig PDF-side for ${exercise.id}: ${exercise.page}`);
    }
  }

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tempDir = fs.mkdtempSync('/tmp/matkovich-elite-');
  const manifestEntries = [];

  try {
    for (const entry of exercises) {
      const rendered = renderPageImage(entry.page, tempDir);
      const crop = buildCrop(entry.page, rendered.width, rendered.height);
      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      writeCropWebp(rendered.srcImage, crop, outPath);

      const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const imageUrl = `/book-illustrations/matkovich-elite-drills/${fileName}`;
      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        sourceRef: entry.sourceRef,
        drillNumber: entry.drillNumber,
        page: entry.page,
        fileName,
        imageUrl,
        cropMode: 'rendered-page',
        width: Number.parseInt(dims[0], 10),
        height: Number.parseInt(dims[1], 10),
        bytes: fs.statSync(outPath).size,
      });
      console.log(`OK ${entry.id} -> page ${entry.page}`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    book: 'matkovich-elite-drills',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercises: exercises.length,
    totalIllustratedExercises: manifestEntries.length,
    missingIllustrations: [],
    entries: manifestEntries,
  };
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries.map((entry) => `  "${entry.id}": "${entry.imageUrl}",`).join('\n');
  fs.writeFileSync(MAP_TS_PATH, `export const matkovichImageById: Record<string, string> = {\n${mapLines}\n};\n`, 'utf8');

  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();