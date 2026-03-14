#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Peter Prickett - Developing Skill_ A Guide to 3v3 Soccer Coaching-Bennion Kearny (2018).pdf';
const DATA_PATH = path.join(ROOT, 'src/data/prickett-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/prickett-3v3');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/prickett-3v3-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/prickett-image-map.ts');
const SECTION_PAGE_MINIMUMS = {
  '2: Warming Up': 20,
  '4: Why 3v3?': 60,
  '6: Pitch Types': 110,
};
const MANUAL_PAGE_OVERRIDES = {
  'smallsided-1': 70,
  'smallsided-2': 71,
  'smallsided-3': 72,
  'smallsided-4': 73,
  'smallsided-5': 74,
  'smallsided-6': 76,
  'smallsided-7': 77,
  'smallsided-8': 82,
  'smallsided-9': 81,
  'smallsided-10': 91,
  'smallsided-11': 104,
  'smallsided-12': 92,
  'smallsided-13': 85,
  'smallsided-14': 122,
  'smallsided-15': 84,
  'smallsided-16': 101,
  'smallsided-17': 132,
  'smallsided-18': 95,
  'smallsided-19': 102,
  'smallsided-46': 28,
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

function parseSourceRef(sourceRef) {
  const match = sourceRef.match(/Prickett\s+2018\s+'([^']+?)\s+–\s+([^']+)'/);
  if (!match) return null;

  const label = match[1].trim();
  const title = match[2].trim();
  const itemMatch = label.match(/(?:^|,\s*)(Square\s+\d+|\d+)$/i);
  const itemLabel = itemMatch ? itemMatch[1] : label;
  const sectionKey = label.replace(/(?:^|,\s*)(Square\s+\d+|\d+)$/i, '').trim() || label;
  const itemOrder = Number.parseInt((itemLabel.match(/(\d+)/) || [])[1] ?? '', 10);

  return {
    label,
    title,
    itemLabel,
    sectionKey,
    itemOrder: Number.isFinite(itemOrder) ? itemOrder : Number.MAX_SAFE_INTEGER,
  };
}

function parseExercises() {
  const src = fs.readFileSync(DATA_PATH, 'utf8');
  const matches = [...src.matchAll(/\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?source:\s*"prickett"[\s\S]*?sourceRef:\s*"([^"]+)"[\s\S]*?\}/g)];
  return matches.map((match) => {
    const parsed = parseSourceRef(match[3]);
    if (!parsed) {
      throw new Error(`Ugyldig Prickett sourceRef: ${match[3]}`);
    }
    return {
      id: match[1],
      name: match[2],
      sourceRef: match[3],
      ...parsed,
    };
  });
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
    const lines = text.split(/\r?\n/);
    pages.push({
      fullText: normalizeText(text),
      headerText: normalizeText(lines.slice(0, 14).join(' ')),
    });
  }
  return pages;
}

function buildImageStats() {
  const output = run(`pdfimages -list '${shellEscape(PDF_PATH)}'`);
  const stats = new Map();
  const lines = output.split(/\r?\n/).slice(2);

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 4) continue;
    const page = Number.parseInt(parts[0], 10);
    const width = Number.parseInt(parts[3], 10);
    const height = Number.parseInt(parts[4], 10);
    if (!Number.isFinite(page) || !Number.isFinite(width) || !Number.isFinite(height)) continue;
    const current = stats.get(page) ?? { count: 0, maxArea: 0 };
    current.count += 1;
    current.maxArea = Math.max(current.maxArea, width * height);
    stats.set(page, current);
  }

  return stats;
}

function findPageCandidates(exercise, pageTexts, imageStats) {
  const fullTitle = normalizeText(exercise.title);
  const labeledTitle = normalizeText(`${exercise.itemLabel} ${exercise.title}`);
  const itemLabel = normalizeText(exercise.itemLabel);

  const titleTokens = [...new Set(fullTitle.split(' ').filter((token) => token.length > 2))];
  const candidates = [];

  for (let index = 0; index < pageTexts.length; index += 1) {
    const page = index + 1;
    const texts = pageTexts[index];
    const imageInfo = imageStats.get(page) ?? { count: 0, maxArea: 0 };
    let score = 0;
    if (texts.headerText.includes(labeledTitle)) score += 400;
    if (texts.headerText.includes(fullTitle)) score += 260;
    if (texts.fullText.includes(labeledTitle)) score += 110;
    if (texts.fullText.includes(fullTitle)) score += 70;
    if (texts.headerText.includes(itemLabel)) score += 40;
    if (texts.fullText.includes(itemLabel)) score += 12;
    if (imageInfo.count > 0) score += 10;
    if (imageInfo.maxArea >= 100000) score += 20;
    if (page > 10) score += 2;

    for (const token of titleTokens) {
      if (texts.headerText.includes(token)) score += 6;
      else if (texts.fullText.includes(token)) score += 1;
    }

    if (score >= 40) {
      candidates.push({
        page,
        score,
        hasImage: imageInfo.maxArea >= 100000,
        isExact: texts.headerText.includes(labeledTitle)
          || texts.headerText.includes(fullTitle)
          || texts.fullText.includes(labeledTitle),
      });
    }
  }

  if (candidates.length === 0) {
    throw new Error(`Fant ikke PDF-side for ${exercise.id} (${exercise.sourceRef})`);
  }

  return candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.page - b.page;
  });
}

function choosePageCandidate(exercise, candidates, previousPageBySection) {
  const previousPage = previousPageBySection.get(exercise.sectionKey) ?? 0;
  const minimumPage = SECTION_PAGE_MINIMUMS[exercise.sectionKey] ?? 1;
  const sectionCandidates = candidates.filter((candidate) => candidate.page >= minimumPage);
  const usableCandidates = sectionCandidates.length > 0 ? sectionCandidates : candidates;

  const exactAfterPrevious = candidates
    .filter((candidate) => candidate.page > previousPage && candidate.isExact && candidate.page >= minimumPage)
    .sort((a, b) => a.page - b.page);
  if (exactAfterPrevious.length > 0) return exactAfterPrevious[0].page;

  const exactWithImage = usableCandidates
    .filter((candidate) => candidate.page > previousPage && candidate.hasImage)
    .sort((a, b) => a.page - b.page);
  if (exactWithImage.length > 0) return exactWithImage[0].page;

  const withImageAfterPrevious = usableCandidates
    .filter((candidate) => candidate.page > previousPage && candidate.hasImage)
    .sort((a, b) => a.page - b.page);
  if (withImageAfterPrevious.length > 0) return withImageAfterPrevious[0].page;

  return usableCandidates[0].page;
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
    .filter((image) => Number.isFinite(image.area) && image.area >= 100000)
    .sort((a, b) => b.area - a.area);
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

function detectFigureBoxes(srcImage) {
  const safeSrc = shellEscape(srcImage);
  const dim = run(`magick identify -format '%w %h' '${safeSrc}'`).trim().split(' ');
  const imgW = Number(dim[0]);
  const imgH = Number(dim[1]);
  if (!Number.isFinite(imgW) || !Number.isFinite(imgH)) return [];

  const roiX = 0;
  const roiY = Math.round(imgH * 0.08);
  const roiW = imgW;
  const roiH = Math.round(imgH * 0.78);

  const out = run(
    `magick '${safeSrc}' -crop ${roiW}x${roiH}+${roiX}+${roiY} +repage -colorspace Gray -threshold 70% -negate -morphology Open Disk:1 -define connected-components:area-threshold=5000 -define connected-components:verbose=true -connected-components 8 null: 2>&1`,
  );

  const lines = out.split('\n');
  const boxes = [];
  const re = /^\s*(\d+):\s+(\d+)x(\d+)\+(\d+)\+(\d+)\s+[^ ]+\s+(\d+)/;
  for (const line of lines) {
    const match = line.match(re);
    if (!match) continue;
    const id = Number(match[1]);
    if (id === 0) continue;
    const width = Number(match[2]);
    const height = Number(match[3]);
    const x = Number(match[4]);
    const y = Number(match[5]);
    const area = Number(match[6]);

    if (width < 120 || height < 90) continue;
    if (area < 7000) continue;
    const ratio = width / height;
    if (ratio < 0.35 || ratio > 4.5) continue;

    boxes.push({
      x: roiX + x,
      y: roiY + y,
      w: width,
      h: height,
      area,
    });
  }

  return boxes.sort((a, b) => b.area - a.area);
}

function buildCropFromBox(box, imageWidth, imageHeight) {
  const pad = 24;
  const x = Math.max(0, Math.round(box.x - pad));
  const y = Math.max(0, Math.round(box.y - pad));
  const maxW = imageWidth - x;
  const maxH = imageHeight - y;
  return {
    x,
    y,
    w: Math.min(maxW, Math.round(box.w + (pad * 2))),
    h: Math.min(maxH, Math.round(box.h + (pad * 2))),
  };
}

function trimArgs() {
  return '-fuzz 2% -trim +repage -bordercolor white -border 12';
}

function writeWebp(srcPath, outPath) {
  run(`magick '${shellEscape(srcPath)}' ${trimArgs()} -strip -quality 78 '${shellEscape(outPath)}'`);
}

function writeCropWebp(srcPath, crop, outPath) {
  run(`magick '${shellEscape(srcPath)}' -crop ${crop.w}x${crop.h}+${crop.x}+${crop.y} +repage ${trimArgs()} -strip -quality 78 '${shellEscape(outPath)}'`);
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-${slugify(entry.itemLabel)}-${slugify(entry.title)}.webp`;
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const exercises = parseExercises();
  const pageCount = getPdfPageCount();
  const pageTexts = buildPageText(pageCount);
  const imageStats = buildImageStats();
  const previousPageBySection = new Map();
  const mappingById = new Map();
  const sectionGroups = new Map();

  for (const exercise of exercises) {
    const group = sectionGroups.get(exercise.sectionKey) ?? [];
    group.push(exercise);
    sectionGroups.set(exercise.sectionKey, group);
  }

  for (const group of sectionGroups.values()) {
    group
      .slice()
      .sort((a, b) => a.itemOrder - b.itemOrder)
      .forEach((exercise) => {
        const page = MANUAL_PAGE_OVERRIDES[exercise.id] ?? choosePageCandidate(
          exercise,
          findPageCandidates(exercise, pageTexts, imageStats),
          previousPageBySection,
        );
        previousPageBySection.set(exercise.sectionKey, page);
        mappingById.set(exercise.id, {
          ...exercise,
          page,
        });
      });
  }

  const mappings = exercises.map((exercise) => {
    const mapped = mappingById.get(exercise.id);
    if (!mapped) throw new Error(`Mangler sidekobling for ${exercise.id}`);
    return mapped;
  });

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const tempDir = fs.mkdtempSync('/tmp/prickett-3v3-');
  const manifestEntries = [];
  const missingIllustrations = [];

  try {
    for (const entry of mappings) {
      const images = extractEmbeddedPageImages(entry.page, tempDir);
      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      let sourceImage = images[0] ?? null;
      let cropMode = 'embedded-image';

      if (sourceImage) {
        writeWebp(sourceImage.filePath, outPath);
      } else {
        const rendered = renderPageImage(entry.page, tempDir);
        const boxes = detectFigureBoxes(rendered.srcImage);
        if (boxes.length === 0) {
          missingIllustrations.push({
            id: entry.id,
            name: entry.name,
            sourceRef: entry.sourceRef,
            page: entry.page,
          });
          console.log(`MISS ${entry.id} -> page ${entry.page}`);
          continue;
        }

        const crop = buildCropFromBox(boxes[0], rendered.width, rendered.height);
        writeCropWebp(rendered.srcImage, crop, outPath);
        sourceImage = {
          filePath: rendered.srcImage,
          width: rendered.width,
          height: rendered.height,
          bytes: fs.statSync(rendered.srcImage).size,
        };
        cropMode = 'rendered-page';
      }

      const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const imageUrl = `/book-illustrations/prickett-3v3/${fileName}`;
      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        sourceRef: entry.sourceRef,
        page: entry.page,
        itemLabel: entry.itemLabel,
        title: entry.title,
        fileName,
        imageUrl,
        cropMode,
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
    book: 'prickett-3v3',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercises: exercises.length,
    totalIllustratedExercises: manifestEntries.length,
    missingIllustrations,
    entries: manifestEntries,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries
    .map((entry) => `  "${entry.id}": "${entry.imageUrl}",`)
    .join('\n');
  const mapTs = `export const prickettImageById: Record<string, string> = {\n${mapLines}\n};\n`;
  fs.writeFileSync(MAP_TS_PATH, mapTs, 'utf8');

  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();