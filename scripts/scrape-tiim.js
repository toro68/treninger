const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://tiim.no';
const EXERCISES_URL = `${BASE_URL}/okter-og-ovelser`;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAllExerciseUrls(page) {
  console.log('Henter liste over øvelser...');
  
  await page.goto(EXERCISES_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Vent på at innholdet laster
  await sleep(3000);
  
  // Klikk på "Vis alle" hvis den finnes
  try {
    const showAllButton = await page.$('button:has-text("Vis alle")');
    if (showAllButton) {
      await showAllButton.click();
      await sleep(2000);
    }
  } catch (e) {
    console.log('Ingen "Vis alle" knapp funnet');
  }
  
  // Scroll ned for å laste flere øvelser
  let previousHeight = 0;
  let scrollAttempts = 0;
  const maxScrollAttempts = 30;
  
  while (scrollAttempts < maxScrollAttempts) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    
    if (currentHeight === previousHeight) {
      // Prøv å klikke "Vis flere" eller lignende
      try {
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const loadMore = buttons.find(b => 
            b.textContent.includes('Vis flere') || 
            b.textContent.includes('Last mer') ||
            b.textContent.includes('Vis alle')
          );
          if (loadMore) loadMore.click();
        });
        await sleep(2000);
      } catch (e) {
        // Ingen flere knapper
      }
      
      const newHeight = await page.evaluate(() => document.body.scrollHeight);
      if (newHeight === currentHeight) {
        break; // Ingen mer innhold
      }
    }
    
    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1500);
    scrollAttempts++;
    console.log(`Scroll ${scrollAttempts}/${maxScrollAttempts}...`);
  }
  
  // Hent alle øvelse-lenker
  const urls = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/ovelse/"]'));
    return [...new Set(links.map(a => a.href))];
  });
  
  console.log(`Fant ${urls.length} øvelser`);
  return urls;
}

async function scrapeExercise(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1000);
    
    const exercise = await page.evaluate((sourceUrl) => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : '';
      };
      
      const getListItems = (headerText) => {
        const headers = Array.from(document.querySelectorAll('h2'));
        const header = headers.find(h => h.textContent.includes(headerText));
        if (!header) return [];
        
        let sibling = header.nextElementSibling;
        const items = [];
        while (sibling && sibling.tagName !== 'H2') {
          if (sibling.tagName === 'UL' || sibling.tagName === 'OL') {
            const lis = sibling.querySelectorAll('li');
            lis.forEach(li => items.push(li.textContent.trim()));
          } else if (sibling.tagName === 'P') {
            items.push(sibling.textContent.trim());
          }
          sibling = sibling.nextElementSibling;
        }
        return items;
      };
      
      const getSection = (headerText) => {
        const headers = Array.from(document.querySelectorAll('h2'));
        const header = headers.find(h => h.textContent.includes(headerText));
        if (!header) return '';
        
        let sibling = header.nextElementSibling;
        const texts = [];
        while (sibling && sibling.tagName !== 'H2') {
          const text = sibling.textContent.trim();
          if (text) texts.push(text);
          sibling = sibling.nextElementSibling;
        }
        return texts.join('\n');
      };
      
      // Navn
      const name = document.querySelector('h1')?.textContent.trim() || '';
      
      // Tema, Type, Alder fra metadata
      const metaSection = document.body.textContent;
      
      const extractList = (label) => {
        const regex = new RegExp(`${label}[\\s\\S]*?(?=Tema|Type|Alder|$)`, 'i');
        const match = metaSection.match(regex);
        if (!match) return [];
        
        const items = [];
        const listItems = document.querySelectorAll('li');
        listItems.forEach(li => {
          const text = li.textContent.trim();
          if (text && !text.includes('http')) {
            items.push(text);
          }
        });
        return items;
      };
      
      // Finn tema, type, alder fra siden
      const allText = document.body.innerText;
      
      const findSection = (startMarker, endMarkers) => {
        const startIdx = allText.indexOf(startMarker);
        if (startIdx === -1) return [];
        
        let endIdx = allText.length;
        for (const marker of endMarkers) {
          const idx = allText.indexOf(marker, startIdx + startMarker.length);
          if (idx !== -1 && idx < endIdx) {
            endIdx = idx;
          }
        }
        
        const section = allText.substring(startIdx + startMarker.length, endIdx);
        return section.split('\n')
          .map(s => s.trim())
          .filter(s => s && s.startsWith('•'))
          .map(s => s.replace('•', '').trim());
      };
      
      // Prøv å finne metadata
      let tema = [];
      let type = [];
      let alder = [];
      
      const metaDivs = document.querySelectorAll('div');
      metaDivs.forEach(div => {
        const text = div.textContent;
        if (text.includes('Tema') && !text.includes('Organisering')) {
          const lis = div.querySelectorAll('li');
          lis.forEach(li => {
            const t = li.textContent.trim();
            if (t.includes('mål') || t.includes('ball') || t.includes('Spille') || t.includes('Hindre') || t.includes('Presse') || t.includes('Vinne') || t.includes('Komme')) {
              tema.push(t);
            }
          });
        }
      });
      
      // Enklere tilnærming - finn i ren tekst
      const lines = allText.split('\n').map(l => l.trim()).filter(l => l);
      
      let inTema = false;
      let inType = false;
      let inAlder = false;
      
      for (const line of lines) {
        if (line === 'Tema') { inTema = true; inType = false; inAlder = false; continue; }
        if (line === 'Type') { inTema = false; inType = true; inAlder = false; continue; }
        if (line === 'Alder') { inTema = false; inType = false; inAlder = true; continue; }
        if (line === 'Organisering' || line === 'Læringsmomenter' || line === 'Variasjoner') {
          inTema = false; inType = false; inAlder = false; continue;
        }
        
        if (line.startsWith('•')) {
          const item = line.replace('•', '').trim();
          if (inTema) tema.push(item);
          if (inType) type.push(item);
          if (inAlder) alder.push(item);
        }
      }
      
      return {
        name,
        sourceUrl,
        tema: [...new Set(tema)],
        type: [...new Set(type)],
        alder: [...new Set(alder)],
        organisering: getSection('Organisering'),
        variasjoner: getListItems('Variasjoner'),
        laeringsmomenter: getSection('Læringsmomenter'),
        kommentar: getSection('Kommentar')
      };
    }, url);
    
    console.log(`✓ ${exercise.name}`);
    return exercise;
  } catch (error) {
    console.error(`✗ Feil ved ${url}: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Starter scraping av tiim.no...\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Godta cookies
  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    
    const acceptButton = await page.$('button[id*="accept"], button:has-text("Tillat alle")');
    if (acceptButton) {
      await acceptButton.click();
      await sleep(1000);
    }
  } catch (e) {
    console.log('Kunne ikke finne cookie-knapp');
  }
  
  // Hent alle øvelse-URLer
  const urls = await getAllExerciseUrls(page);
  
  if (urls.length === 0) {
    console.log('Ingen øvelser funnet. Prøver alternativ metode...');
    
    // Prøv å hente fra søk
    await page.goto(`${EXERCISES_URL}?visning=ovelser`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(5000);
    
    const altUrls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="/ovelse/"]'));
      return [...new Set(links.map(a => a.href))];
    });
    
    if (altUrls.length > 0) {
      urls.push(...altUrls);
    }
  }
  
  console.log(`\nScraper ${urls.length} øvelser...\n`);
  
  const exercises = [];
  
  for (let i = 0; i < urls.length; i++) {
    console.log(`[${i + 1}/${urls.length}] `);
    const exercise = await scrapeExercise(page, urls[i]);
    if (exercise && exercise.name) {
      exercises.push(exercise);
    }
    
    // Pause mellom requests for å ikke overbelaste
    if (i % 10 === 0 && i > 0) {
      console.log('Tar en liten pause...');
      await sleep(2000);
    }
  }
  
  await browser.close();
  
  // Lagre til JSON
  const output = {
    source: 'Norges Fotballforbund - tiim.no',
    sourceUrl: 'https://tiim.no/okter-og-ovelser',
    fetchedAt: new Date().toISOString(),
    count: exercises.length,
    exercises
  };
  
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'tiim-raw.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
  
  console.log(`\n✓ Ferdig! ${exercises.length} øvelser lagret til ${outputPath}`);
}

main().catch(console.error);
