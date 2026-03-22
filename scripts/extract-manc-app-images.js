#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = path.join(
  process.env.HOME,
  'Documents/Fotballbøker/Pep Guardiola. 85 Passing, Rondos, Posession and Circuits Vol. 2 2 (2019, SoccerTutor.com).pdf'
);
const OUT_DIR = path.join(ROOT, 'public/book-illustrations/manc-academy');

const PAGE_MAP = {
  // Attacking Positional Patterns (s. 118-121, PDF +2 offset: book page N = PDF page N+2)
  'manc-app-01-full-back-forward-receive-layoff-dribble-final-third': [120],
  'manc-app-02-att-mid-layoff-def-mid-pass-behind-forward': [121],
  'manc-app-03-centre-back-long-pass-forward-third-man-run': [122],
  'manc-app-04-switch-attack-overlap-full-back-behind': [123],
  // Pep Vol. 2 exercises with known pages (PDF +2 offset: book page N = PDF page N+2)
  'manc-layoff-pass-wide-cross-finish-speed-practice': [33],
  'manc-layoff-pass-wide-cross-finish-speed-agility-practice': [34],
  'manc-passing-showing-receive-layoffs-distance-shot': [71],
  'manc-passing-combination-double-one-two-outside-box-shot': [72],
  'manc-passing-combination-around-box-finish': [73],
  'manc-movement-receive-passing-rectangle-aerial-pass': [82],
  'manc-short-passing-run-forward-pass-outside-box-shot-variation-3': [87],
  'manc-4v2-square-rondo': [91],
  'manc-5v2-square-rondo': [94],
  'manc-6v2-rectangle-rondo': [95],
  'manc-7v2-square-rondo': [96],
  'manc-juego-de-posicion-5plus2-v-3-possession': [102],
  'manc-juego-de-posicion-6plus2-v-3-possession': [103],
  'manc-juego-de-posicion-4v4-plus3-possession-transition': [104],
  'manc-juego-de-posicion-5v5-plus3-possession-transition': [105],
  'manc-juego-de-posicion-6v6-plus4-possession-transition': [106],
  'manc-juego-de-posicion-8v8-plus3-possession-transition': [107],
  'manc-7v7-plus3-possession-pole-gates': [110],
  'manc-win-ball-switch-play-two-zone-8v8-transition': [111],
  'manc-9v9-plus2-inside-possession-game': [112],
};

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function shellEscape(value) {
  return value.replace(/'/g, "'\\''");
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function main() {
  if (!fs.existsSync(PDF_PATH)) throw new Error('Fant ikke PDF: ' + PDF_PATH);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const tempDir = fs.mkdtempSync('/tmp/manc-app-');
  const results = [];

  try {
    for (const [id, pages] of Object.entries(PAGE_MAP)) {
      const page = pages[0];
      const prefix = path.join(tempDir, id);
      run("pdftocairo -png -singlefile -f " + page + " -l " + page + " '" + shellEscape(PDF_PATH) + "' '" + shellEscape(prefix) + "'");

      const srcPath = prefix + '.png';
      const outName = 'p' + String(page).padStart(3, '0') + '-' + id + '.webp';
      const outPath = path.join(OUT_DIR, outName);

      // Crop illustration area (upper-mid portion of SoccerTutor page)
      run("magick '" + shellEscape(srcPath) + "' -crop '938x726+89+217' +repage -fuzz '2%' -trim +repage -bordercolor white -border 12 -strip -quality 80 '" + shellEscape(outPath) + "'");

      const dims = run("magick identify -format '%w %h' '" + shellEscape(outPath) + "'").trim().split(' ');
      const imageUrl = '/book-illustrations/manc-academy/' + outName;
      results.push({ id, page, outName, imageUrl, width: dims[0], height: dims[1], bytes: fs.statSync(outPath).size });
      console.log('OK ' + id + ' -> p' + page + ' (' + dims[0] + 'x' + dims[1] + ', ' + Math.round(fs.statSync(outPath).size / 1024) + ' KB)');
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  // Output image map entries
  console.log('\nImage map entries:');
  for (const r of results) {
    console.log('  "' + r.id + '": "' + r.imageUrl + '",');
  }
}

main();
