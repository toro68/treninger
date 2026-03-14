#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/Jens Bangsbo, Birgir Pietersen - Futbol_ Jugar en Defensa (Spanish Edition) (2001).pdf';
const DATA_PATH = path.join(ROOT, 'src/data/bangsbo-exercises.ts');
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/bangsbo-forsvar');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/bangsbo-forsvar-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/bangsbo-image-map.ts');

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
    .replace(/[^a-z0-9. ]+/g, ' ')
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

function parseExercises() {
  const src = fs.readFileSync(DATA_PATH, 'utf8');
  const matches = [...src.matchAll(/\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?source:\s*"bangsbo"[\s\S]*?sourceRef:\s*"([^"]+)"[\s\S]*?\}/g)];
  return matches
    .map((match) => {
      const sourceRef = match[3];
      const figureMatch = sourceRef.match(/Figur\s+(\d+)/i);
      if (!figureMatch) return null;
      return {
        id: match[1],
        name: match[2],
        sourceRef,
        figure: Number.parseInt(figureMatch[1], 10),
      };
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
  const pages = [];
  const safePdf = shellEscape(PDF_PATH);
  for (let page = 1; page <= pageCount; page += 1) {
    const txt = run(`pdftotext -f ${page} -l ${page} -layout '${safePdf}' - 2>/dev/null`);
    pages.push(txt.replace(/\s+/g, ' '));
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
  const safePdf = shellEscape(PDF_PATH);
  const cache = new Map();

  for (let page = 1; page <= pageCount; page += 1) {
    const xml = run(`pdftotext -f ${page} -l ${page} -bbox-layout '${safePdf}' - 2>/dev/null`);
    const words = [];
    const re = /<word xMin="([^"]+)" yMin="([^"]+)" xMax="([^"]+)" yMax="([^"]+)">([^<]*)<\/word>/g;
    let match = re.exec(xml);
    while (match) {
      words.push({
        xMin: Number.parseFloat(match[1]),
        yMin: Number.parseFloat(match[2]),
        xMax: Number.parseFloat(match[3]),
        yMax: Number.parseFloat(match[4]),
        text: decodeHtml(match[5]),
      });
      match = re.exec(xml);
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

  for (const word of sorted) {
    const last = lines[lines.length - 1];
    if (!last || Math.abs(last.y - word.yMin) > 1.2) {
      lines.push({ y: word.yMin, words: [word] });
    } else {
      last.words.push(word);
      last.y = Math.min(last.y, word.yMin);
    }
  }

  for (const line of lines) {
    line.words.sort((a, b) => a.xMin - b.xMin);
    line.text = line.words.map((word) => word.text).join(' ').replace(/\s+/g, ' ').trim();
    line.xMin = Math.min(...line.words.map((word) => word.xMin));
    line.xMax = Math.max(...line.words.map((word) => word.xMax));
  }

  return lines;
}

function extractFigureLines(pageWords) {
  const lines = groupWordsToLines(pageWords);
  const figures = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const directMatch = line.text.match(/\bfig\.?\s*(\d+)\b/i);
    if (directMatch) {
      figures.push({
        figure: Number.parseInt(directMatch[1], 10),
        y: line.y,
        xMin: line.xMin,
        xMax: line.xMax,
        text: line.text,
      });
      continue;
    }

    if (/^fig\.?$/i.test(line.text) && lines[index + 1] && /^\d+$/.test(lines[index + 1].text)) {
      figures.push({
        figure: Number.parseInt(lines[index + 1].text, 10),
        y: line.y,
        xMin: Math.min(line.xMin, lines[index + 1].xMin),
        xMax: Math.max(line.xMax, lines[index + 1].xMax),
        text: `${line.text} ${lines[index + 1].text}`,
      });
      index += 1;
    }
  }

  return figures.sort((a, b) => a.y - b.y);
}

function matchPageForFigure(figure, pageTexts) {
  const pattern = new RegExp(`\\bfig\\.?\\s*${figure}\\b`, 'i');
  for (let index = 0; index < pageTexts.length; index += 1) {
    if (pattern.test(pageTexts[index])) return index + 1;
  }
  return null;
}

function renderPageImage(page, tempDir) {
  const safePdf = shellEscape(PDF_PATH);
  const pageDir = path.join(tempDir, `p${page}`);
  fs.mkdirSync(pageDir, { recursive: true });
  const outBase = path.join(pageDir, 'page');
  run(`pdftocairo -png -singlefile -f ${page} -l ${page} -scale-to 1600 '${safePdf}' '${shellEscape(outBase)}'`);
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
    .filter((image) => Number.isFinite(image.area) && image.area > 0)
    .sort((a, b) => b.area - a.area);
}

function detectFigureBoxes(srcImage) {
  const safeSrc = shellEscape(srcImage);
  const dim = run(`magick identify -format '%w %h' '${safeSrc}'`).trim().split(' ');
  const imgW = Number(dim[0]);
  const imgH = Number(dim[1]);
  if (!Number.isFinite(imgW) || !Number.isFinite(imgH)) return [];

  const roiX = 0;
  const roiY = Math.round(imgH * 0.03);
  const roiW = Math.round(imgW * 0.72);
  const roiH = Math.round(imgH * 0.9);

  const out = run(
    `magick '${safeSrc}' -crop ${roiW}x${roiH}+${roiX}+${roiY} +repage -colorspace Gray -threshold 70% -negate -morphology Open Disk:1 -define connected-components:area-threshold=3500 -define connected-components:verbose=true -connected-components 8 null: 2>&1`,
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

    if (width < 120 || height < 100) continue;
    if (area < 8000) continue;
    const ratio = width / height;
    if (ratio < 0.25 || ratio > 3.5) continue;

    boxes.push({
      x: roiX + x,
      y: roiY + y,
      w: width,
      h: height,
      area,
      centerY: roiY + y + (height / 2),
    });
  }

  return boxes.sort((a, b) => a.y - b.y);
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-fig${entry.figure}-${slugify(entry.name)}.webp`;
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

function buildFallbackCrop(targetIndex, figureLines, imageWidth, imageHeight) {
  const target = figureLines[targetIndex];
  const prev = figureLines[targetIndex - 1] ?? null;
  const next = figureLines[targetIndex + 1] ?? null;
  const top = prev ? Math.max(0, Math.round((prev.y + target.y) / 2)) : 0;
  const bottom = next ? Math.min(imageHeight, Math.round((target.y + next.y) / 2)) : imageHeight;
  return {
    x: 0,
    y: top,
    w: Math.round(imageWidth * 0.72),
    h: Math.max(120, bottom - top),
  };
}

function buildEmbeddedSliceCrop(targetIndex, totalFigures, imageWidth, imageHeight) {
  const pad = 12;
  const sliceHeight = imageHeight / totalFigures;
  const y = Math.max(0, Math.round((sliceHeight * targetIndex) - pad));
  const bottom = Math.min(imageHeight, Math.round((sliceHeight * (targetIndex + 1)) + pad));
  return {
    x: 0,
    y,
    w: imageWidth,
    h: Math.max(120, bottom - y),
  };
}

function writeWebp(srcImage, crop, outPath) {
  const safeSrc = shellEscape(srcImage);
  const safeOut = shellEscape(outPath);
  run(`magick '${safeSrc}' -crop ${crop.w}x${crop.h}+${crop.x}+${crop.y} +repage -strip -quality 78 '${safeOut}'`);
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  const exercises = parseExercises();
  if (exercises.length === 0) throw new Error('Fant ingen Bangsbo-øvelser med figurreferanse i datafilen');

  const pageCount = getPdfPageCount();
  const pageTexts = buildPageText(pageCount);
  const pageWordCache = buildPageWordCache(pageCount);

  const mappings = exercises.map((exercise) => {
    const page = matchPageForFigure(exercise.figure, pageTexts);
    if (!page) {
      throw new Error(`Fikk ikke matchet PDF-side for figur ${exercise.figure} (${exercise.id})`);
    }
    return { ...exercise, page };
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const tempDir = fs.mkdtempSync('/tmp/bangsbo-forsvar-');
  const manifestEntries = [];
  const pageEntries = new Map();

  for (const entry of mappings) {
    if (!pageEntries.has(entry.page)) pageEntries.set(entry.page, []);
    pageEntries.get(entry.page).push(entry);
  }

  const pages = [...pageEntries.keys()].sort((a, b) => a - b);
  for (const page of pages) {
    const rendered = renderPageImage(page, tempDir);
    const embeddedImages = extractEmbeddedPageImages(page, tempDir);
    const boxes = detectFigureBoxes(rendered.srcImage);
    const figureLines = extractFigureLines(pageWordCache.get(page) || []);
    const pageItems = (pageEntries.get(page) || []).sort((a, b) => a.figure - b.figure);

    for (const entry of pageItems) {
      const figureIndex = figureLines.findIndex((figureLine) => figureLine.figure === entry.figure);
      if (figureIndex === -1) {
        throw new Error(`Fant ikke figurtekst for figur ${entry.figure} på side ${page}`);
      }

      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      let cropMode = 'fallback-band';

      if (figureLines.length === 1 && embeddedImages.length === 1) {
        writeWebp(
          embeddedImages[0].filePath,
          { x: 0, y: 0, w: embeddedImages[0].width, h: embeddedImages[0].height },
          outPath,
        );
        cropMode = 'embedded-image';
      } else if (embeddedImages.length === 1 && figureLines.length > 1) {
        const crop = buildEmbeddedSliceCrop(
          figureIndex,
          figureLines.length,
          embeddedImages[0].width,
          embeddedImages[0].height,
        );
        writeWebp(embeddedImages[0].filePath, crop, outPath);
        cropMode = 'embedded-image-slice';
      } else if (boxes[figureIndex]) {
        const crop = buildCropFromBox(boxes[figureIndex], rendered.width, rendered.height);
        writeWebp(rendered.srcImage, crop, outPath);
        cropMode = 'detected-box';
      } else {
        const crop = buildFallbackCrop(figureIndex, figureLines, rendered.width, rendered.height);
        writeWebp(rendered.srcImage, crop, outPath);
      }

      const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const bytes = fs.statSync(outPath).size;
      const imageUrl = `/book-illustrations/bangsbo-forsvar/${fileName}`;

      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        sourceRef: entry.sourceRef,
        figure: entry.figure,
        page,
        fileName,
        imageUrl,
        cropMode,
        figuresOnPage: figureLines.length,
        detectedBoxesOnPage: boxes.length,
        embeddedImagesOnPage: embeddedImages.length,
        width: Number.parseInt(dims[0], 10),
        height: Number.parseInt(dims[1], 10),
        bytes,
      });

      console.log(`OK ${entry.id} -> figure ${entry.figure} page ${page}`);
    }
  }

  manifestEntries.sort((a, b) => a.id.localeCompare(b.id));
  const manifest = {
    book: 'bangsbo-forsvar',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercises: manifestEntries.length,
    entries: manifestEntries,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries
    .map((entry) => `  "${entry.id}": "${entry.imageUrl}",`)
    .join('\n');
  const mapTs = `export const bangsboImageById: Record<string, string> = {\n${mapLines}\n};\n`;
  fs.writeFileSync(MAP_TS_PATH, mapTs, 'utf8');

  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();