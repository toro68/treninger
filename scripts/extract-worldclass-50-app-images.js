#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2] || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/50Small-SidedGames.pdf';
const DATA_PATH = path.join(ROOT, 'src/data/worldclass-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/50-small-sided-games');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/50-small-sided-games-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/worldclass-image-map.ts');

const MANUAL_PAGE_OVERRIDES = {
  'smallsided-112': 6,
  'smallsided-113': 5,
  'smallsided-134': 18,
  'smallsided-137': 19,
};

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function ensureTools() {
  const tools = ['pdftotext', 'pdfimages', 'pdftocairo', 'magick'];
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

function canonical(input) {
  return normalizeText(input).replace(/[^a-z0-9]+/g, '');
}

function slugify(input) {
  return normalizeText(input)
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function parseExercises() {
  const src = fs.readFileSync(DATA_PATH, 'utf8');
  const matches = [...src.matchAll(/\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?source:\s*"worldclass"[\s\S]*?sourceRef:\s*"([^"]+)"[\s\S]*?\}/g)];
  return matches.map((m) => ({ id: m[1], name: m[2], sourceRef: m[3] }));
}

function getPdfPageCount() {
  const info = run(`pdfinfo '${PDF_PATH.replace(/'/g, "'\\''")}'`);
  const m = info.match(/Pages:\s+(\d+)/);
  if (!m) throw new Error('Klarte ikke lese sidetall fra pdfinfo');
  return Number.parseInt(m[1], 10);
}

function buildPageText(pageCount) {
  const pages = [];
  const safePdf = PDF_PATH.replace(/'/g, "'\\''");
  for (let page = 1; page <= pageCount; page += 1) {
    const txt = run(`pdftotext -f ${page} -l ${page} -layout '${safePdf}' -`);
    pages.push(normalizeText(txt));
  }
  return pages;
}

function decodeHtml(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function buildPageWordCache(pageCount) {
  const cache = new Map();
  const safePdf = PDF_PATH.replace(/'/g, "'\\''");

  for (let page = 1; page <= pageCount; page += 1) {
    const xml = run(`pdftotext -f ${page} -l ${page} -bbox-layout '${safePdf}' -`);
    const words = [];
    const re = /<word xMin="([^"]+)" yMin="([^"]+)" xMax="([^"]+)" yMax="([^"]+)">([^<]*)<\/word>/g;
    let m = re.exec(xml);
    while (m) {
      words.push({
        xMin: Number.parseFloat(m[1]),
        yMin: Number.parseFloat(m[2]),
        xMax: Number.parseFloat(m[3]),
        yMax: Number.parseFloat(m[4]),
        text: decodeHtml(m[5]),
      });
      m = re.exec(xml);
    }
    cache.set(page, words);
  }

  return cache;
}

function groupWordsToLines(words) {
  const lines = [];
  const sorted = [...words].sort((a, b) => {
    if (Math.abs(a.yMin - b.yMin) < 1.2) return a.xMin - b.xMin;
    return a.yMin - b.yMin;
  });

  for (const w of sorted) {
    const last = lines[lines.length - 1];
    if (!last || Math.abs(last.y - w.yMin) > 1.2) {
      lines.push({ y: w.yMin, words: [w] });
    } else {
      last.words.push(w);
      last.y = Math.min(last.y, w.yMin);
    }
  }

  for (const line of lines) {
    line.words.sort((a, b) => a.xMin - b.xMin);
    line.text = line.words.map((w) => w.text).join(' ');
    line.canon = canonical(line.text);
    line.xMin = Math.min(...line.words.map((w) => w.xMin));
    line.xMax = Math.max(...line.words.map((w) => w.xMax));
  }
  return lines;
}

function findTitleY(pageWords, exerciseName) {
  const lines = groupWordsToLines(pageWords);
  const targetCanon = canonical(exerciseName);
  const targetNorm = normalizeText(exerciseName);

  // Prefer headings on the right text column.
  const rightLines = lines.filter((line) => line.xMin > 240);

  for (const line of rightLines) {
    if (line.canon.includes(targetCanon)) return line.y;
  }

  for (const line of rightLines) {
    if (normalizeText(line.text).includes(targetNorm)) return line.y;
  }

  // Fallback: best token overlap line in right column.
  const tokens = targetNorm.split(' ').filter((t) => t.length > 1);
  let best = null;
  for (const line of rightLines) {
    const lineNorm = normalizeText(line.text);
    let hits = 0;
    for (const t of tokens) {
      if (lineNorm.includes(t)) hits += 1;
    }
    if (!best || hits > best.hits) best = { y: line.y, hits };
  }
  if (best && best.hits >= Math.min(2, tokens.length)) return best.y;

  return null;
}

function matchPageForExercise(exercise, pageTexts) {
  if (MANUAL_PAGE_OVERRIDES[exercise.id]) return MANUAL_PAGE_OVERRIDES[exercise.id];

  const nameNorm = normalizeText(exercise.name);
  const compact = nameNorm.replace(/\s*\+\s*/g, '+');

  for (let i = 0; i < pageTexts.length; i += 1) {
    if (pageTexts[i].includes(nameNorm) || pageTexts[i].includes(compact)) return i + 1;
  }

  const tokens = nameNorm.split(' ').filter((t) => t.length > 2);
  if (tokens.length >= 2) {
    for (let i = 0; i < pageTexts.length; i += 1) {
      let hits = 0;
      for (const t of tokens) {
        if (pageTexts[i].includes(t)) hits += 1;
      }
      if (hits >= Math.min(3, tokens.length)) return i + 1;
    }
  }

  return null;
}

function renderPageImage(page, tempDir) {
  const pageDir = path.join(tempDir, `p${page}`);
  fs.mkdirSync(pageDir, { recursive: true });
  const safePdf = PDF_PATH.replace(/'/g, "'\\''");
  const outBase = path.join(pageDir, 'page');
  run(`pdftocairo -png -singlefile -f ${page} -l ${page} -scale-to 1800 '${safePdf}' '${outBase.replace(/'/g, "'\\''")}'`);
  return { srcImage: `${outBase}.png`, mode: 'rendered-page' };
}

function scoreSaturation(srcImage, cropW, cropH, cropX, cropY) {
  const safeSrc = srcImage.replace(/'/g, "'\\''");
  const out = run(
    `magick '${safeSrc}' -crop ${cropW}x${cropH}+${cropX}+${cropY} +repage -colorspace HSL -channel G -separate -format '%[fx:mean]' info:`,
  ).trim();
  const value = Number.parseFloat(out);
  return Number.isFinite(value) ? value : 0;
}

function detectFigureBoxes(srcImage) {
  const safeSrc = srcImage.replace(/'/g, "'\\''");
  const dim = run(`magick identify -format '%w %h' '${safeSrc}'`).trim().split(' ');
  const imgW = Number(dim[0]);
  const imgH = Number(dim[1]);
  if (!Number.isFinite(imgW) || !Number.isFinite(imgH)) return [];

  const roiX = 0;
  const roiY = Math.round(imgH * 0.03);
  const roiW = imgW;
  const roiH = Math.round(imgH * 0.90);

  const out = run(
    `magick '${safeSrc}' -crop ${roiW}x${roiH}+${roiX}+${roiY} +repage -colorspace HSL -channel G -separate +channel -threshold 12% -morphology Open Disk:1 -define connected-components:area-threshold=2000 -define connected-components:verbose=true -connected-components 8 null: 2>&1`,
  );

  const lines = out.split('\n');
  const boxes = [];
  const re = /^\s*(\d+):\s+(\d+)x(\d+)\+(\d+)\+(\d+)\s+[^ ]+\s+(\d+)/;
  for (const line of lines) {
    const m = line.match(re);
    if (!m) continue;
    const id = Number(m[1]);
    if (id === 0) continue;
    const w = Number(m[2]);
    const h = Number(m[3]);
    const x = Number(m[4]);
    const y = Number(m[5]);
    const area = Number(m[6]);

    if (w < 150 || h < 120) continue;
    if (area < 12000) continue;
    const ratio = w / h;
    if (ratio < 0.45 || ratio > 2.5) continue;

    boxes.push({
      x: roiX + x,
      y: roiY + y,
      w,
      h,
      area,
      centerY: roiY + y + h / 2,
    });
  }

  boxes.sort((a, b) => a.y - b.y);
  return boxes;
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-${slugify(entry.name)}.webp`;
}

function buildCropFromBox(box) {
  const pad = 20;
  return {
    x: Math.max(0, Math.round(box.x - pad)),
    y: Math.max(0, Math.round(box.y - pad)),
    w: Math.round(box.w + pad * 2),
    h: Math.round(box.h + pad * 2),
  };
}

function buildUnionCrop(boxes) {
  const pad = 20;
  const minX = Math.min(...boxes.map((b) => b.x));
  const minY = Math.min(...boxes.map((b) => b.y));
  const maxX = Math.max(...boxes.map((b) => b.x + b.w));
  const maxY = Math.max(...boxes.map((b) => b.y + b.h));
  return {
    x: Math.max(0, Math.round(minX - pad)),
    y: Math.max(0, Math.round(minY - pad)),
    w: Math.round((maxX - minX) + pad * 2),
    h: Math.round((maxY - minY) + pad * 2),
  };
}

function assignBoxesToEntries(entries, boxes, pageWords) {
  const orderedEntries = entries
    .map((entry) => ({
      ...entry,
      titleY: findTitleY(pageWords, entry.name),
    }))
    .sort((a, b) => {
      const ay = a.titleY ?? Number.POSITIVE_INFINITY;
      const by = b.titleY ?? Number.POSITIVE_INFINITY;
      if (ay !== by) return ay - by;
      return a.name.localeCompare(b.name);
    });

  const orderedBoxes = [...boxes].sort((a, b) => a.y - b.y);
  const assignments = new Map();

  if (orderedBoxes.length === 0) {
    for (const entry of orderedEntries) assignments.set(entry.id, { entry, box: null, titleY: entry.titleY });
    return assignments;
  }

  for (let index = 0; index < orderedEntries.length; index += 1) {
    const entry = orderedEntries[index];
    const box = orderedBoxes[Math.min(index, orderedBoxes.length - 1)] || null;
    assignments.set(entry.id, { entry, box, titleY: entry.titleY });
  }

  return assignments;
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const exercises = parseExercises();
  if (exercises.length === 0) throw new Error('Fant ingen worldclass-øvelser i datafilen');

  const pageCount = getPdfPageCount();
  const pageTexts = buildPageText(pageCount);
  const pageWordCache = buildPageWordCache(pageCount);

  const mappings = exercises.map((exercise) => {
    const page = matchPageForExercise(exercise, pageTexts);
    if (!page) {
      throw new Error(`Fikk ikke matchet PDF-side for ${exercise.id} (${exercise.name})`);
    }
    return { ...exercise, page };
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tempDir = fs.mkdtempSync('/tmp/worldclass50-app-');

  const pageCache = new Map();
  const pageEntryOrder = new Map();
  const manifestEntries = [];

  mappings.forEach((entry) => {
    if (!pageEntryOrder.has(entry.page)) pageEntryOrder.set(entry.page, []);
    pageEntryOrder.get(entry.page).push(entry);
  });

  const pages = [...pageEntryOrder.keys()].sort((a, b) => a - b);
  for (const page of pages) {
    if (!pageCache.has(page)) {
      const rendered = renderPageImage(page, tempDir);
      const boxes = detectFigureBoxes(rendered.srcImage);
      pageCache.set(page, { ...rendered, boxes });
    }

    const { srcImage, mode, boxes } = pageCache.get(page);
    const safeSrc = srcImage.replace(/'/g, "'\\''");
    const pageEntries = pageEntryOrder.get(page) || [];
    const pageWords = pageWordCache.get(page) || [];
    const assignments = assignBoxesToEntries(pageEntries, boxes, pageWords);
    const fallbackCrop = boxes.length > 0 ? buildUnionCrop(boxes) : null;

    for (const entry of pageEntries) {
      const assignment = assignments.get(entry.id);
      const crop = assignment?.box ? buildCropFromBox(assignment.box) : fallbackCrop;
      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      const safeOut = outPath.replace(/'/g, "'\\''");

      if (crop) {
        run(`magick '${safeSrc}' -crop ${crop.w}x${crop.h}+${crop.x}+${crop.y} +repage -strip -quality 75 '${safeOut}'`);
      } else {
        run(`magick '${safeSrc}' -strip -quality 75 '${safeOut}'`);
      }

      const dim = run(`magick identify -format '%w %h' '${safeOut}'`).trim().split(' ');
      const bytes = fs.statSync(outPath).size;
      const titleY = assignment?.titleY ?? null;
      const imageUrl = `/book-illustrations/50-small-sided-games/${fileName}`;

      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        sourceRef: entry.sourceRef,
        page: entry.page,
        fileName,
        imageUrl,
        mode,
        cropMode: assignment?.box ? 'single-figure' : (fallbackCrop ? 'page-figures-fallback' : 'full-page'),
        titleY,
        figureIndexOnPage: assignment?.box ? boxes.findIndex((box) => box === assignment.box) + 1 : null,
        figuresOnPage: boxes.length,
        width: Number(dim[0]),
        height: Number(dim[1]),
        bytes,
      });

      console.log(`OK ${entry.id} -> page ${entry.page} (${imageUrl}, ${bytes} bytes)`);
    }
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    book: '50-small-sided-games',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercises: manifestEntries.length,
    entries: manifestEntries,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((e) => `  "${e.id}": "${e.imageUrl}",`)
    .join('\n');
  const mapTs = `export const worldclassImageById: Record<string, string> = {\n${mapLines}\n};\n`;
  fs.writeFileSync(MAP_TS_PATH, mapTs, 'utf8');

  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();
