#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const EPUB_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Tony Charles_ Stuart Rook - 101 Youth Football Coaching Sessions-Bloomsbury Publishing (2013).epub';
const DATA_PATH = path.join(ROOT, 'src/data/101youth-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/101-youth-sessions');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/101-youth-sessions-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/101youth-image-map.ts');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

function ensureTools() {
  for (const tool of ['unzip', 'magick']) {
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
    .filter((block) => block.includes('source: "101youth"'))
    .map((block) => {
      const id = block.match(/id:\s*"([^"]+)"/)?.[1] ?? null;
      const name = block.match(/name:\s*"([^"]+)"/)?.[1] ?? null;
      const sourceRef = block.match(/sourceRef:\s*"([^"]+)"/)?.[1] ?? null;
      if (!id || !name || !sourceRef) {
        throw new Error(`Ufullstendig 101 Youth-blokk: ${block.slice(0, 120)}`);
      }

      const sessionMatch = sourceRef.match(/session\s+(\d+)/i);
      if (!sessionMatch) {
        throw new Error(`Fant ikke session-nummer i sourceRef: ${sourceRef}`);
      }

      const titleMatch = sourceRef.match(/'([^']+)'/);
      return {
        id,
        name,
        sourceRef,
        session: Number.parseInt(sessionMatch[1], 10),
        title: titleMatch ? titleMatch[1] : name,
      };
    });
}

function extractEpub(tempDir) {
  run(`unzip -q '${shellEscape(EPUB_PATH)}' -d '${shellEscape(tempDir)}'`);
}

function buildSessionIndex(htmlDir) {
  const files = fs.readdirSync(htmlDir)
    .filter((name) => name.endsWith('.html'))
    .sort();
  const index = new Map();

  for (const fileName of files) {
    const filePath = path.join(htmlDir, fileName);
    const html = fs.readFileSync(filePath, 'utf8');
    const matches = [...html.matchAll(/id="session(\d+)"/g)];
    for (const match of matches) {
      index.set(Number.parseInt(match[1], 10), { fileName, filePath, html });
    }
  }

  return index;
}

function buildOutputName(entry) {
  return `session-${String(entry.session).padStart(3, '0')}-${entry.id}-${slugify(entry.title)}.webp`;
}

function writeWebp(srcPath, outPath) {
  run(`magick '${shellEscape(srcPath)}' ${trimArgs()} -strip -quality 82 '${shellEscape(outPath)}'`);
}

function main() {
  if (!fs.existsSync(EPUB_PATH)) throw new Error(`Fant ikke EPUB: ${EPUB_PATH}`);
  ensureTools();

  const exercises = parseExercises();
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), '101youth-'));
  const manifestEntries = [];

  try {
    extractEpub(tempDir);

    const htmlDir = path.join(tempDir, 'OEBPS', 'html');
    const sessionIndex = buildSessionIndex(htmlDir);

    for (const entry of exercises) {
      const sessionFile = sessionIndex.get(entry.session);
      if (!sessionFile) {
        throw new Error(`Fant ikke HTML-fil for session ${entry.session} (${entry.id})`);
      }

      const normalizedTitle = normalizeText(entry.title);
      const normalizedHtml = normalizeText(sessionFile.html);
      if (!normalizedHtml.includes(normalizedTitle)) {
        throw new Error(`Tittelmismatch for ${entry.id}: ${entry.title} finnes ikke i ${sessionFile.fileName}`);
      }

      const imageSrc = sessionFile.html.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? null;
      if (!imageSrc) {
        throw new Error(`Fant ikke bilde i ${sessionFile.fileName} for ${entry.id}`);
      }

      const sourceImagePath = path.resolve(path.dirname(sessionFile.filePath), imageSrc);
      if (!fs.existsSync(sourceImagePath)) {
        throw new Error(`Fant ikke bildefil for ${entry.id}: ${sourceImagePath}`);
      }

      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      writeWebp(sourceImagePath, outPath);

      const sourceDims = run(`magick identify -format '%w %h' '${shellEscape(sourceImagePath)}'`).trim().split(' ');
      const outDims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const imageUrl = `/book-illustrations/101-youth-sessions/${fileName}`;

      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        title: entry.title,
        sourceRef: entry.sourceRef,
        session: entry.session,
        htmlFile: sessionFile.fileName,
        fileName,
        imageUrl,
        cropMode: 'epub-image',
        sourceWidth: Number.parseInt(sourceDims[0], 10),
        sourceHeight: Number.parseInt(sourceDims[1], 10),
        sourceBytes: fs.statSync(sourceImagePath).size,
        width: Number.parseInt(outDims[0], 10),
        height: Number.parseInt(outDims[1], 10),
        bytes: fs.statSync(outPath).size,
      });
      console.log(`OK ${entry.id} -> session ${entry.session}`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    book: '101-youth-sessions',
    epub: EPUB_PATH,
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
  fs.writeFileSync(MAP_TS_PATH, `export const youthImageById: Record<string, string> = {\n${mapLines}\n};\n`, 'utf8');

  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();