#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Seeger, Fabian - The Soccer Games and Drills Compendium 350 Smart and Practical Games to Form Intelligent Players - For All Levels (2017).pdf';
const DATA_PATH = path.join(ROOT, 'src/data/seeger.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/seeger-games');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/seeger-games-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/seeger-image-map.ts');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

function ensureTools() {
  const tools = ['pdfinfo', 'pdfimages', 'magick'];
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
    .filter((block) => block.includes('source: "seeger"'))
    .map((block) => {
      const id = block.match(/id:\s*"([^"]+)"/)?.[1] ?? null;
      const name = block.match(/name:\s*"([^"]+)"/)?.[1] ?? null;
      const sourceRef = block.match(/sourceRef:\s*"([^"]+)"/)?.[1] ?? null;
      if (!id || !name || !sourceRef) {
        throw new Error(`Ufullstendig Seeger-blokk: ${block.slice(0, 120)}`);
      }

    const bookPageMatch = sourceRef.match(/\(s\.(\d+)\)/i);
    if (!bookPageMatch) {
      throw new Error(`Fant ikke sidereferanse i sourceRef: ${sourceRef}`);
    }

    const titleMatch = sourceRef.match(/'([^']+)'/);
    return {
      id,
      name,
      sourceRef,
      bookPage: Number.parseInt(bookPageMatch[1], 10),
      title: titleMatch ? titleMatch[1] : name,
    };
    });
}

function getPdfPageCount() {
  const info = run(`pdfinfo '${shellEscape(PDF_PATH)}'`);
  const match = info.match(/Pages:\s+(\d+)/);
  if (!match) throw new Error('Klarte ikke lese sidetall fra pdfinfo');
  return Number.parseInt(match[1], 10);
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
    .filter((image) => Number.isFinite(image.area) && image.area >= 500000)
    .sort((a, b) => b.area - a.area);
}

function writeWebp(srcPath, outPath) {
  run(`magick '${shellEscape(srcPath)}' ${trimArgs()} -strip -quality 78 '${shellEscape(outPath)}'`);
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-${slugify(entry.title)}.webp`;
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const pageCount = getPdfPageCount();
  const exercises = parseExercises().map((exercise) => ({
    ...exercise,
    page: exercise.bookPage + 1,
  }));

  for (const exercise of exercises) {
    if (exercise.page < 1 || exercise.page > pageCount) {
      throw new Error(`Ugyldig PDF-side for ${exercise.id}: ${exercise.page}`);
    }
  }

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const tempDir = fs.mkdtempSync('/tmp/seeger-games-');
  const manifestEntries = [];

  try {
    for (const entry of exercises) {
      const images = extractEmbeddedPageImages(entry.page, tempDir);
      if (images.length === 0) {
        throw new Error(`Fant ingen embedded images på side ${entry.page} for ${entry.id}`);
      }

      const sourceImage = images[0];
      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      writeWebp(sourceImage.filePath, outPath);

      const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const imageUrl = `/book-illustrations/seeger-games/${fileName}`;
      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        title: entry.title,
        sourceRef: entry.sourceRef,
        bookPage: entry.bookPage,
        page: entry.page,
        fileName,
        imageUrl,
        cropMode: 'embedded-image',
        sourceWidth: sourceImage.width,
        sourceHeight: sourceImage.height,
        sourceBytes: sourceImage.bytes,
        width: Number.parseInt(dims[0], 10),
        height: Number.parseInt(dims[1], 10),
        bytes: fs.statSync(outPath).size,
        embeddedImagesOnPage: images.length,
      });
      console.log(`OK ${entry.id} -> page ${entry.page}`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    book: 'seeger-games',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercises: exercises.length,
    totalIllustratedExercises: manifestEntries.length,
    missingIllustrations: [],
    entries: manifestEntries,
  };
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries
    .map((entry) => `  "${entry.id}": "${entry.imageUrl}",`)
    .join('\n');
  fs.writeFileSync(MAP_TS_PATH, `export const seegerImageById: Record<string, string> = {\n${mapLines}\n};\n`, 'utf8');

  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();