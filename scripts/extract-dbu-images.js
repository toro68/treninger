#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = process.argv[2]
  || '/Users/tor.inge.jossang@aftenbladet.no/Documents/Fotballbøker/fotballbøker_txt/aldersrelateret_traening_2.pdf';
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/dbu-aldersrelateret');
const MANIFEST_PATH = path.join(ROOT, 'docs/books/illustrations/dbu-aldersrelateret-manifest.json');
const MAP_TS_PATH = path.join(ROOT, 'src/data/dbu-image-map.ts');

const ENTRIES = [
  {
    id: 'dbu-y2-dobbelt-y',
    name: 'Dobbelt Y (Y2)',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 2.2 'Dobbelt Y'",
    page: 19,
    imageIndex: 0,
  },
  {
    id: 'dbu-3v3-2-possession',
    name: '3v3+2 ballbesittelse',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.5 '3v3+2'",
    page: 34,
    imageIndex: 1,
  },
  {
    id: 'dbu-4v4-4-possession',
    name: '4v4+4 ballbesittelse',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.6 '4v4+4'",
    page: 35,
    imageIndex: 0,
  },
  {
    id: 'dbu-spill-paa-3-mann',
    name: 'Spill på 3. mann',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.9 'Spil på 3. mand'",
    page: 38,
    imageIndex: 1,
  },
  {
    id: 'dbu-overlap',
    name: 'Overlap',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.8 'Overlap'",
    page: 37,
    imageIndex: 0,
  },
  {
    id: 'dbu-bandespill',
    name: 'Bandespill (veggspill)',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.7 'Bandespil'",
    page: 37,
    imageIndex: 2,
  },
  {
    id: 'dbu-knekloep-i-feltet',
    name: 'Knekkeløp i feltet',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.13 'Knækløb i feltet'",
    page: 39,
    imageIndex: 1,
  },
  {
    id: 'dbu-blindsideloep',
    name: 'Blindsideløp i feltet',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.15 'Eksempel på blindsideløb i feltet'",
    page: 39,
    imageIndex: 3,
  },
  {
    id: 'dbu-klassisk-kontra',
    name: 'Klassisk kontraangrep',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.17 'Klassisk kontra'",
    page: 42,
    imageIndex: 0,
  },
  {
    id: 'dbu-kollektiv-kontra',
    name: 'Kollektiv kontra',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.18 'Kollektiv kontra'",
    page: 43,
    imageIndex: 0,
  },
  {
    id: 'dbu-avansert-kontra-genpres',
    name: 'Avansert kontra: Høy gegenpressing',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.19 'Avanceret kontra'",
    page: 43,
    imageIndex: 1,
  },
  {
    id: 'dbu-enkeltmands-kontra',
    name: 'Enkeltmanns-kontra',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 3.20 'Enkeltmandskontra'",
    page: 44,
    imageIndex: 0,
  },
  {
    id: 'dbu-1v1-defensiv-naerkamp',
    name: '1v1 defensiv: Nærkamp og tackling',
    sourceRef: "DBU Aldersrelateret Træning 2 Figur 5.2 '1v1 defensivt (nærkamp – tackling)'",
    page: 86,
    imageIndex: 0,
  },
];

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

function ensureTools() {
  for (const tool of ['pdfimages', 'magick']) {
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
  return '-fuzz 2% -trim +repage -bordercolor white -border 10';
}

function extractPageImages(page, tempDir) {
  const pageDir = path.join(tempDir, `p${page}`);
  fs.mkdirSync(pageDir, { recursive: true });
  const prefix = path.join(pageDir, 'embedded');
  run(`pdfimages -f ${page} -l ${page} -all '${shellEscape(PDF_PATH)}' '${shellEscape(prefix)}' 2>/dev/null`);

  return fs.readdirSync(pageDir)
    .filter((name) => name.startsWith('embedded-'))
    .sort()
    .map((name) => {
      const filePath = path.join(pageDir, name);
      const dims = run(`magick identify -format '%w %h' '${shellEscape(filePath)}'`).trim().split(' ');
      const width = Number.parseInt(dims[0], 10);
      const height = Number.parseInt(dims[1], 10);
      const ratio = width > height ? width / height : height / width;
      return {
        filePath,
        width,
        height,
        ratio,
        bytes: fs.statSync(filePath).size,
      };
    })
    .filter((image) => image.width >= 150 && image.height >= 110 && image.ratio <= 2.5);
}

function writeWebp(srcPath, outPath) {
  run(`magick '${shellEscape(srcPath)}' ${trimArgs()} -strip -quality 82 '${shellEscape(outPath)}'`);
}

function buildOutputName(entry) {
  return `p${String(entry.page).padStart(3, '0')}-${entry.id}-${slugify(entry.name)}.webp`;
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error(`Fant ikke PDF: ${PDF_PATH}`);
  ensureTools();

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const tempDir = fs.mkdtempSync('/tmp/dbu-aldersrelateret-');
  const manifestEntries = [];

  try {
    for (const entry of ENTRIES) {
      const images = extractPageImages(entry.page, tempDir);
      const sourceImage = images[entry.imageIndex];
      if (!sourceImage) {
        throw new Error(`Fant ikke bildeindeks ${entry.imageIndex} på side ${entry.page} for ${entry.id}`);
      }

      const fileName = buildOutputName(entry);
      const outPath = path.join(OUT_DIR, fileName);
      writeWebp(sourceImage.filePath, outPath);
      const dims = run(`magick identify -format '%w %h' '${shellEscape(outPath)}'`).trim().split(' ');
      const imageUrl = `/book-illustrations/dbu-aldersrelateret/${fileName}`;

      manifestEntries.push({
        id: entry.id,
        name: entry.name,
        sourceRef: entry.sourceRef,
        page: entry.page,
        imageIndex: entry.imageIndex,
        fileName,
        imageUrl,
        cropMode: 'embedded-image',
        sourceWidth: sourceImage.width,
        sourceHeight: sourceImage.height,
        sourceBytes: sourceImage.bytes,
        width: Number.parseInt(dims[0], 10),
        height: Number.parseInt(dims[1], 10),
        bytes: fs.statSync(outPath).size,
      });
      console.log(`OK ${entry.id} -> page ${entry.page} image ${entry.imageIndex}`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  const manifest = {
    book: 'dbu-aldersrelateret',
    pdf: PDF_PATH,
    generatedAt: new Date().toISOString(),
    totalExercises: ENTRIES.length,
    totalIllustratedExercises: manifestEntries.length,
    missingIllustrations: [],
    entries: manifestEntries,
  };
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const mapLines = manifestEntries
    .map((entry) => `  "${entry.id}": "${entry.imageUrl}",`)
    .join('\n');
  fs.writeFileSync(MAP_TS_PATH, `export const dbuImageById: Record<string, string> = {\n${mapLines}\n};\n`, 'utf8');

  console.log(`Ferdig. Bilder: ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(`Map: ${MAP_TS_PATH}`);
}

main();