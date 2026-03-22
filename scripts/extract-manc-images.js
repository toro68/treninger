#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = path.join(
  ROOT,
  'docs/books/Elite Academy Coaching - The Secrets Behind the Development Program for Pep Guardiola&_039_s Methodology{Bowman, Darren}(2023, Soccertutor.com Ltd.){115516338}.pdf'
);
const DATA_PATH = path.join(ROOT, 'src/data/manc-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/manc-academy');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/manc-academy-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/manc-image-map.ts');

const PAGE_MAP_BY_ID = {
  // Existing verified mappings
  'manc-support-angles-play-through-lines': [54],
  'manc-inside-outside-possession-3v3-plus-2': [55],
  'manc-continuous-attack-wave-1v1-to-6v5': [56],
  'manc-3v2-back-to-back-goals': [57],
  'manc-third-man-triangle-pattern': [59],
  'manc-figure-eight-diamond': [64],
  'manc-wide-central-diamond-7v7-plus-1': [65],
  'manc-functional-training-10v8': [66],
  'manc-three-zone-7v7-plus-1': [67],
  'manc-diamond-passing-circuit': [69, 70],
  'manc-finishing-triangle-series': [75, 76, 77, 78],
  'manc-6v6-transition-game': [60],
  'manc-high-press-from-front': [114],
  'manc-mid-block-defending': [115],
  'manc-defending-own-box': [140],
  // New mappings (PDF page = sourceRef book page + 1)
  'manc-3v2-finish-2-zone-3-team-ssg': [61],
  'manc-continuous-2v2-pairs-wave-game': [62],
  'manc-possession-transitions-4-goal-conditioned': [81],
  'manc-technical-attacking-combination-finishing-circuit': [83],
  'manc-midfield-combinations-crossing-6v4': [84],
  'manc-game-related-3v2-attacking-overload-duels': [85],
  'manc-game-related-4v3-attacking-overload-duels': [86],
  'manc-attacking-overloads-dynamic-2zone-5v5': [87],
  'manc-onetouch-triangle-set-through': [89],
  'manc-central-diamond-crossing-vs-2box-defenders': [90],
  'manc-central-diamond-wingplay-crossing-finishing': [96],
  'manc-switching-play-final-third-crossing-finishing': [100],
  'manc-combination-final-third-winger-inside-overlap': [101],
  'manc-break-line-directional-4v4-end-zone-possession': [102],
  'manc-position-specific-attacking-overloads-channels': [103],
  'manc-attacking-overloads-dynamic-2-zone-5v5-repeat': [104],
  'manc-support-play-final-third-crossing-finishing': [106],
  'manc-runs-from-deep-crossing-finishing-functional': [107],
  'manc-game-principles-side-diamond-10v8-repeat': [108],
  'manc-create-3v2-overloads-back-to-back-goals-repeat': [109],
  'manc-side-diamond-forward-pass-blocked-right': [112],
  'manc-defensive-organisation-pressing-4v4-plus3': [113],
  'manc-front-pressing-set-the-trap-6v8-plus-gk': [114],
  'manc-defensive-organisation-pressing-midfield-5v5-plus1': [115],
  'manc-side-diamond-receive-between-lines-overlap-cross': [117],
  'manc-front-pressing-set-trap-full-man-for-man-10v10': [119],
  'manc-defensive-organisation-front-pressing-rotational-3-team-6v6': [120],
  'manc-defending-3v2-overloads-back-to-back-goals-6v6': [125],
  'manc-midfield-forward-combination-final-third-free-decisions': [127],
  'manc-possession-pressing-3-team-transition-game': [128],
  'manc-front-pressing-diamond-midfield-9v9-tactical-game': [129],
  'manc-front-pressing-defending-through-thirds-multi-zone': [130],
  'manc-angles-support-playing-through-thirds-4-line-passing-technical': [132],
  'manc-defensive-organisation-pressing-4v4-plus3-repeat': [133],
  'manc-front-pressing-set-trap-full-man-for-man-10v10-repeat': [135],
  'manc-defending-around-box-defensive-unit-arc-part-1': [137],
  'manc-defensive-unit-arc-reset-pass-wide-part-2': [138],
  'manc-8v4-attacking-overload-possession-3-phases': [139],
  'manc-back-4-defending-around-box-6v4-phase-play': [140],
  'manc-defending-around-box-game-principles-8v6-phase-play': [141],
  'manc-defending-first-second-phase-long-passes-crosses-box': [143],
  'manc-defending-box-from-crosses-functional': [145],
  'manc-position-specific-zonal-2v3-defensive-organisation': [146],
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

function getImageSize(filePath) {
  const dims = run(`magick identify -format '%w %h' '${shellEscape(filePath)}'`).trim().split(' ');
  return {
    width: Number.parseInt(dims[0], 10),
    height: Number.parseInt(dims[1], 10),
  };
}

function parseExercises() {
  const src = fs.readFileSync(DATA_PATH, 'utf8');
  const blocks = src.match(/\{[\s\S]*?\n\s*\},?/g) || [];
  return blocks
    .filter((block) => block.includes('source: "manc"'))
    .map((block) => {
      const id = block.match(/id:\s*"([^"]+)"/)?.[1] ?? null;
      const name = block.match(/name:\s*"([^"]+)"/)?.[1] ?? null;
      const sourceRef = block.match(/sourceRef:\s*"([^"]+)"/)?.[1] ?? null;
      if (!id || !name || !sourceRef) {
        throw new Error(`Ufullstendig ManC-blokk: ${block.slice(0, 120)}`);
      }
      return { id, name, sourceRef };
    });
}

function getPdfPageCount() {
  const info = run(`pdfinfo '${shellEscape(PDF_PATH)}'`);
  const match = info.match(/Pages:\s+(\d+)/);
  if (!match) throw new Error('Klarte ikke lese sidetall fra pdfinfo');
  return Number.parseInt(match[1], 10);
}

function renderPage(page, outPath) {
  const prefix = outPath.replace(/\.png$/, '');
  run(`pdftocairo -png -singlefile -f ${page} -l ${page} '${shellEscape(PDF_PATH)}' '${shellEscape(prefix)}'`);
}

function clampCrop(crop, width, height) {
  const x = Math.max(0, Math.min(width - 1, crop.x));
  const y = Math.max(0, Math.min(height - 1, crop.y));
  const w = Math.max(1, Math.min(width - x, crop.w));
  const h = Math.max(1, Math.min(height - y, crop.h));
  return { x, y, w, h };
}

function fallbackIllustrationCrop(width, height) {
  return clampCrop({
    x: Math.round(width * 0.08),
    y: Math.round(height * 0.17),
    w: Math.round(width * 0.84),
    h: Math.round(height * 0.44),
  }, width, height);
}

function detectIllustrationCrop(srcPath) {
  const { width, height } = getImageSize(srcPath);
  const roiX = Math.round(width * 0.06);
  const roiY = Math.round(height * 0.14);
  const roiW = Math.round(width * 0.88);
  const roiH = Math.round(height * 0.52);

  const output = run(
    `magick '${shellEscape(srcPath)}' -crop ${roiW}x${roiH}+${roiX}+${roiY} +repage -colorspace Gray -threshold 85% -negate -morphology Open Disk:1 -define connected-components:area-threshold=5000 -define connected-components:verbose=true -connected-components 8 null: 2>&1`,
  );

  const boxes = [];
  const lines = output.split('\n');
  const re = /^\s*(\d+):\s+(\d+)x(\d+)\+(\d+)\+(\d+)\s+[^ ]+\s+(\d+)/;
  for (const line of lines) {
    const match = line.match(re);
    if (!match) continue;
    const id = Number.parseInt(match[1], 10);
    if (id === 0) continue;

    const box = {
      x: roiX + Number.parseInt(match[4], 10),
      y: roiY + Number.parseInt(match[5], 10),
      w: Number.parseInt(match[2], 10),
      h: Number.parseInt(match[3], 10),
      area: Number.parseInt(match[6], 10),
    };

    if (box.w < Math.round(width * 0.55) || box.w > Math.round(width * 0.9)) continue;
    if (box.h < Math.round(height * 0.22) || box.h > Math.round(height * 0.5)) continue;
    if (box.y < Math.round(height * 0.12) || box.y > Math.round(height * 0.35)) continue;

    boxes.push(box);
  }

  const best = boxes.sort((left, right) => right.area - left.area)[0];
  if (!best) {
    return fallbackIllustrationCrop(width, height);
  }

  const padLeft = Math.round(width * 0.02);
  const padRight = Math.round(width * 0.02);
  const padTop = Math.round(height * 0.02);
  const padBottom = Math.round(height * 0.02);
  return clampCrop({
    x: best.x - padLeft,
    y: best.y - padTop,
    w: best.w + padLeft + padRight,
    h: best.h + padTop + padBottom,
  }, width, height);
}

function buildOutputName(pages, id, name) {
  const pageLabel = pages.length === 1
    ? `p${String(pages[0]).padStart(3, '0')}`
    : `p${String(pages[0]).padStart(3, '0')}-${String(pages[pages.length - 1]).padStart(3, '0')}`;
  return `${pageLabel}-${id}-${slugify(name)}.webp`;
}

function writeSinglePageWebp(srcPath, crop, outPath) {
  run(`magick '${shellEscape(srcPath)}' -crop ${crop.w}x${crop.h}+${crop.x}+${crop.y} +repage ${trimArgs()} -strip -quality 80 '${shellEscape(outPath)}'`);
}

function writeCompositeWebp(srcPaths, outPath) {
  const inputs = srcPaths.map((filePath) => `'${shellEscape(filePath)}'`).join(' ');
  run(`magick ${inputs} -background white -gravity center -append ${trimArgs()} -strip -quality 80 '${shellEscape(outPath)}'`);
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const pageCount = getPdfPageCount();
  const exercises = parseExercises();
  const tempDir = fs.mkdtempSync('/tmp/manc-academy-');

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const manifestEntries = [];

  try {
    for (const exercise of exercises) {
      const pages = PAGE_MAP_BY_ID[exercise.id];
      if (!pages || pages.length === 0) {
        console.log(`SKIP ${exercise.id} (ingen sidekart)`);
        continue;
      }

      for (const page of pages) {
        if (page < 1 || page > pageCount) {
          throw new Error(`Ugyldig side ${page} for ${exercise.id}`);
        }
      }

      const renderedPages = pages.map((page) => {
        const filePath = path.join(tempDir, `${exercise.id}-${page}.png`);
        renderPage(page, filePath);
        return {
          filePath,
          crop: detectIllustrationCrop(filePath),
        };
      });

      const fileName = buildOutputName(pages, exercise.id, exercise.name);
      const outPath = path.join(OUT_DIR, fileName);
      if (renderedPages.length === 1) {
        writeSinglePageWebp(renderedPages[0].filePath, renderedPages[0].crop, outPath);
      } else {
        const croppedPaths = renderedPages.map((renderedPage, index) => {
          const croppedPath = path.join(tempDir, `${exercise.id}-${pages[index]}-crop.png`);
          run(`magick '${shellEscape(renderedPage.filePath)}' -crop ${renderedPage.crop.w}x${renderedPage.crop.h}+${renderedPage.crop.x}+${renderedPage.crop.y} +repage '${shellEscape(croppedPath)}'`);
          return croppedPath;
        });
        writeCompositeWebp(croppedPaths, outPath);
      }

      const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const imageUrl = `/book-illustrations/manc-academy/${fileName}`;
      manifestEntries.push({
        id: exercise.id,
        name: exercise.name,
        sourceRef: exercise.sourceRef,
        pages,
        fileName,
        imageUrl,
        cropMode: renderedPages.length === 1 ? 'detected-content-block' : 'detected-content-block-append',
        width: Number.parseInt(dims[0], 10),
        height: Number.parseInt(dims[1], 10),
        bytes: fs.statSync(outPath).size,
      });
      console.log(`OK ${exercise.id} -> ${pages.join(',')}`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    book: 'manc-academy',
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
  fs.writeFileSync(MAP_TS_PATH, `export const mancImageById: Record<string, string> = {\n${mapLines}\n};\n`, 'utf8');

  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();