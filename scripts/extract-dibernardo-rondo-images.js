#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Marcus A DiBernardo - The Science of Rondo_ “Progressions, Variations & Transitions”-CreateSpace Independent Publishing Platform (2014).pdf';
const DATA_PATH = path.join(ROOT, 'src/data/rondo-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/dibernardo-rondo');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/dibernardo-rondo-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/dibernardo-image-map.ts');
const DIBERNARDO_TAG = 'dibernardo-science-of-rondo-2014';
const MANUAL_IMAGE_PAGE_OVERRIDES = {
  'rondo-fundamental': 9,
  'rondo-breaking-lines': 11,
  'rondo-moving': 13,
  'rondo-two-team-color': 15,
  'rondo-to-possession': 19,
  'rondo-transitions': 21,
  'rondo-10v2-one-touch': 29,
  'rondo-game-related': 31,
};

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

function ensureTools() {
  const tools = ['pdfinfo', 'pdftotext', 'pdfimages', 'pdftocairo', 'magick'];
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
    .replace(/[^a-z0-9+ ]+/g, ' ')
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

function extractSourceRef(block) {
  const match = block.match(/sourceRef:\s*"([^"]+)"/);
  return match ? match[1] : null;
}

function parseExercises() {
  const src = fs.readFileSync(DATA_PATH, 'utf8');
  const blocks = src.match(/\{[\s\S]*?\n  \},?/g) || [];

  return blocks
    .filter((block) => block.includes(DIBERNARDO_TAG))
    .map((block) => {
      const id = block.match(/id:\s*"([^"]+)"/)?.[1] ?? null;
      const name = block.match(/name:\s*"([^"]+)"/)?.[1] ?? null;
      const sourceRef = extractSourceRef(block);
      const bookPage = sourceRef ? Number.parseInt(sourceRef.match(/s\.(\d+)/i)?.[1] ?? '', 10) : null;
      if (!id || !name || !sourceRef || !Number.isFinite(bookPage)) return null;
      return { id, name, sourceRef, bookPage };
    })
    .filter(Boolean);
}

function getPdfPageCount() {
  const info = run(`pdfinfo '${shellEscape(PDF_PATH)}'`);
  const match = info.match(/Pages:\s+(\d+)/);
  if (!match) throw new Error('Klarte ikke lese sidetall fra pdfinfo');
  return Number.parseInt(match[1], 10);
}

function buildPageText(pageCount) {
  const safePdf = shellEscape(PDF_PATH);
  const pages = [];
  for (let page = 1; page <= pageCount; page += 1) {
    const text = run(`pdftotext -f ${page} -l ${page} -layout '${safePdf}' - 2>/dev/null`);
    pages.push(normalizeText(text));
  }
  return pages;
}

function scoreNameAgainstPage(name, pageText) {
  const normalizedName = normalizeText(name);
  if (!normalizedName || !pageText) return 0;
  if (pageText.includes(normalizedName)) return 100;

  const tokens = [...new Set(normalizedName.split(' ').filter((token) => token.length > 2))];
  let score = 0;
  for (const token of tokens) {
    if (pageText.includes(token)) score += 1;
  }
  return score;
}

function matchPageForExercise(exercise, pageTexts) {
  let bestPage = null;
  let bestScore = -1;

  for (let index = 0; index < pageTexts.length; index += 1) {
    const score = scoreNameAgainstPage(exercise.name, pageTexts[index]);
    if (score > bestScore) {
      bestScore = score;
      bestPage = index + 1;
    }
  }

  if (bestScore <= 0) {
    const guessed = exercise.bookPage + 2;
    if (guessed >= 1 && guessed <= pageTexts.length) return guessed;
  }

  return bestPage;
}

function renderPageImage(page, tempDir) {
  const safePdf = shellEscape(PDF_PATH);
  const pageDir = path.join(tempDir, `p${page}`);
  fs.mkdirSync(pageDir, { recursive: true });
  const outBase = path.join(pageDir, 'page');
  run(`pdftocairo -png -singlefile -f ${page} -l ${page} -scale-to 1800 '${safePdf}' '${shellEscape(outBase)}'`);
  const srcImage = `${outBase}.png`;
  const dims = run(`magick identify -format '%w %h' '${shellEscape(srcImage)}'`).trim().split(' ');
  return {
    srcImage,
    width: Number.parseInt(dims[0], 10),
    height: Number.parseInt(dims[1], 10),
  };
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
      };
    })
    .filter((image) => Number.isFinite(image.area) && image.area >= 100000)
    .sort((a, b) => b.area - a.area);
}

function detectFigureBoxes(srcImage) {
  const safeSrc = shellEscape(srcImage);
  const dims = run(`magick identify -format '%w %h' '${safeSrc}'`).trim().split(' ');
  const imageWidth = Number.parseInt(dims[0], 10);
  const imageHeight = Number.parseInt(dims[1], 10);
  if (!Number.isFinite(imageWidth) || !Number.isFinite(imageHeight)) return [];

  const output = run(
    `magick '${safeSrc}' -colorspace HSL -channel G -separate +channel -threshold 10% -morphology Open Disk:1 -define connected-components:area-threshold=12000 -define connected-components:verbose=true -connected-components 8 null: 2>&1`,
  );

  const boxes = [];
  const regex = /^\s*(\d+):\s+(\d+)x(\d+)\+(\d+)\+(\d+)\s+[^ ]+\s+(\d+)/;
  for (const line of output.split('\n')) {
    const match = line.match(regex);
    if (!match) continue;
    const id = Number.parseInt(match[1], 10);
    if (id === 0) continue;
    const width = Number.parseInt(match[2], 10);
    const height = Number.parseInt(match[3], 10);
    const x = Number.parseInt(match[4], 10);
    const y = Number.parseInt(match[5], 10);
    const area = Number.parseInt(match[6], 10);
    const ratio = width / height;

    if (width < 140 || height < 120) continue;
    if (area < 12000) continue;
    if (ratio < 0.35 || ratio > 3.5) continue;

    boxes.push({ x, y, w: width, h: height, area });
  }

  return boxes
    .sort((a, b) => a.y - b.y)
    .filter((box) => box.x < imageWidth * 0.95 && box.y < imageHeight * 0.95);
}

function buildUnionCrop(boxes, imageWidth, imageHeight) {
  const pad = 24;
  const minX = Math.max(0, Math.min(...boxes.map((box) => box.x)) - pad);
  const minY = Math.max(0, Math.min(...boxes.map((box) => box.y)) - pad);
  const maxX = Math.min(imageWidth, Math.max(...boxes.map((box) => box.x + box.w)) + pad);
  const maxY = Math.min(imageHeight, Math.max(...boxes.map((box) => box.y + box.h)) + pad);
  return {
    x: Math.round(minX),
    y: Math.round(minY),
    w: Math.round(maxX - minX),
    h: Math.round(maxY - minY),
  };
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-${slugify(entry.name)}.webp`;
}

function trimArgs() {
  return '-fuzz 2% -trim +repage -bordercolor white -border 12';
}

function writeCropWebp(srcImage, crop, outPath) {
  run(`magick '${shellEscape(srcImage)}' -crop ${crop.w}x${crop.h}+${crop.x}+${crop.y} +repage ${trimArgs()} -strip -quality 78 '${shellEscape(outPath)}'`);
}

function writeEmbeddedWebp(image, outPath) {
  run(`magick '${shellEscape(image.filePath)}' ${trimArgs()} -strip -quality 78 '${shellEscape(outPath)}'`);
}

function writeStackedWebp(images, outPath) {
  const inputs = images
    .map((image) => `'${shellEscape(image.filePath)}' ${trimArgs()}`)
    .join(' ');
  run(`magick ${inputs} -background white -gravity center -append -strip -quality 78 '${shellEscape(outPath)}'`);
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const exercises = parseExercises();
  if (exercises.length === 0) throw new Error('Fant ingen DiBernardo-øvelser i datafilen');

  const pageCount = getPdfPageCount();
  const pageTexts = buildPageText(pageCount);
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tempDir = fs.mkdtempSync('/tmp/dibernardo-rondo-');
  const pageCache = new Map();
  const manifestEntries = [];
  const missingEntries = [];

  function getPageAssets(page) {
    if (!pageCache.has(page)) {
      const rendered = renderPageImage(page, tempDir);
      const embeddedImages = extractEmbeddedPageImages(page, tempDir);
      const boxes = detectFigureBoxes(rendered.srcImage);
      pageCache.set(page, { ...rendered, embeddedImages, boxes });
    }
    return pageCache.get(page);
  }

  function pageHasArtwork(page) {
    if (page < 1 || page > pageCount) return false;
    const assets = getPageAssets(page);
    return assets.embeddedImages.length > 0 || assets.boxes.length > 0;
  }

  for (const exercise of exercises) {
    const matchedPage = matchPageForExercise(exercise, pageTexts);
    if (!matchedPage) {
      missingEntries.push({ ...exercise, reason: 'page-match-failed' });
      continue;
    }

    let illustrationPage = MANUAL_IMAGE_PAGE_OVERRIDES[exercise.id] ?? matchedPage;

    const assets = getPageAssets(illustrationPage);
    if (assets.embeddedImages.length === 0 && assets.boxes.length === 0) {
      missingEntries.push({ ...exercise, matchedPage, reason: 'no-illustration-found' });
      continue;
    }

    const fileName = buildOutputName({ ...exercise, page: illustrationPage });
    const outPath = path.join(OUT_DIR, fileName);
    let cropMode = 'embedded-image';

    if (assets.embeddedImages.length > 1) {
      writeStackedWebp(assets.embeddedImages, outPath);
      cropMode = 'embedded-stack';
    } else if (assets.embeddedImages.length === 1) {
      writeEmbeddedWebp(assets.embeddedImages[0], outPath);
    } else {
      const crop = buildUnionCrop(assets.boxes, assets.width, assets.height);
      writeCropWebp(assets.srcImage, crop, outPath);
      cropMode = 'rendered-union-crop';
    }

    const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
    const imageUrl = `/book-illustrations/dibernardo-rondo/${fileName}`;

    manifestEntries.push({
      id: exercise.id,
      name: exercise.name,
      sourceRef: exercise.sourceRef,
      bookPage: exercise.bookPage,
      matchedPage,
      page: illustrationPage,
      fileName,
      imageUrl,
      cropMode,
      embeddedImagesOnPage: assets.embeddedImages.length,
      detectedBoxesOnPage: assets.boxes.length,
      width: Number.parseInt(dims[0], 10),
      height: Number.parseInt(dims[1], 10),
      bytes: fs.statSync(outPath).size,
    });

    console.log(`OK ${exercise.id} -> page ${illustrationPage}`);
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  missingEntries.sort((a, b) => a.id.localeCompare(b.id));

  const manifest = {
    book: 'dibernardo-rondo',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercisesInDataset: exercises.length,
    totalIllustratedExercises: manifestEntries.length,
    missingIllustrations: missingEntries,
    entries: manifestEntries,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries
    .map((entry) => `  "${entry.id}": "${entry.imageUrl}",`)
    .join('\n');
  fs.writeFileSync(
    MAP_TS_PATH,
    `export const dibernardoImageById: Record<string, string> = {\n${mapLines}\n};\n`,
    'utf8',
  );

  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();