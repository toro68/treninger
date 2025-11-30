# A08 – Kompetansekrav i rolle: Høy playmaker (Gard Holme, UEFA A 2013/14)

**Analysert etter mal:** `ANALYSE-MAL.md`

---

## 1. Metadata

| Felt | Verdi |
|------|-------|
| **Kode** | A08 |
| **Forfatter** | Gard Holme |
| **År** | 2013/2014 |
| **Original tittel** | Kompetansekrav i rolle – en studie av den høye playmakeren |
| **Kildefil** | `docs/uefa/A08-gard-holme-playmaker.txt` |
| **Oppgave-lenke** | https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/idrett---676258---uefa-a-2014-oppgave-gard-holme.pdf |
| **Tema** | Høy playmaker – pasningsvalg, orientering, assistfaser |
| **Rolle(r)** | Høy playmaker (10/8), ving, spiss |

---

## 2. Sammendrag

Holme studerer TFS-prosjektet «Spilleren i spillet» og analyserer åtte av verdens beste høye playmakere (Øzil, Messi, Xavi, Iniesta, Mata, Fabregas, Hamsik, Silva). Han registrerer alle assist i CL 2012/13, deler situasjonen i tre faser (komme på ball → gå fra mulighet til realitet → avgjørende pasning) og kartlegger over 50 variabler (tid, touch, bevegelse, press, pasningstype). Funnene gir konkrete læringspunkter for norske playmakere: orientering i mellomrom, bevegelse for å komme på ball, kroppsvinkel, hurtig håndtering under press og presisjon i avgjørende pasning.

---

## 3. Nøkkeltall og KPI-er

| KPI | Referanseverdi | Kilde |
|-----|----------------|-------|
| Touch per assistfase | Fase 2: 1–2 touch (majoritet) | Kap. 5.4.2 |
| Tid på ball (fase 2) | < 2 sek ved press | Kap. 5.4.1 |
| Bevegelse i forkant | 80 % mottak i mellomrom | Kap. 5.3 |
| Posisjon for assist | Halvspor/mellomrom | Kap. 5.5 |

---

## 4. Prinsipper og konsepter

### Fase 1 – Komme på ball
- Bevegelse (siste steg før mottak)
- Høyde i mellomrommet
- Kroppsvinkel (åpen mot begge sider)

### Fase 2 – Fra mulighet til realitet
- Hurtig håndtering (tid < 2 sek)
- Touch-antall: 1–2
- Pressavstand/romskaping

### Fase 3 – Avgjørende pasning
- Halvspor → blindside
- Pasningstype: stikkpasning, chip, vegg

---

## 5. Øvelser

### Øvelse 1: Fase 1-posisjonering
| Felt | Beskrivelse |
|------|-------------|
| **Kode** | UEFA-A08-01 |
| **Kategori** | Station |
| **Spillere** | 9 |
| **Bane** | 25 x 20 m (mellomromssoner) |
| **Format** | 3 servere, 3 playmare, 3 forsvarere |
| **Utstyr** | Kjegler, baller |
| **Varighet** | 12 min |
| **Intensitet** | Medium-høy |

**Organisering:** playmaker starter i skygge, beveger seg ut, mottar, orienterer og spiller stikk.

**Regler:**
1. Må orientere (verbalt) før mottak.
2. Stikkpasning må gå gjennom port.

**Coaching points:** kroppsvinkel, scanning.

### Øvelse 2: Fase 2–3 kombinasjon 8v8
| Felt | Beskrivelse |
|------|-------------|
| **Kode** | UEFA-A08-02 |
| **Kategori** | Game |
| **Spillere** | 16 |
| **Bane** | 50 x 40 m |
| **Format** | Gk+7v7+Gk |
| **Formasjon** | 1-3-3-1 |
| **Utstyr** | Mål, kjegler |
| **Varighet** | 4 x 5 min |
| **Intensitet** | Høy |

**Regler:**
1. Playmaker må være innom mellomrom før scoring.
2. Maks 2 touch i fase 2-sonen.
3. Bonus for blindside-pasning.

**Coaching points:** håndtering under press, presisjon i avgjørende pasning.

---

## 6. Corner/dødball
- Playmaker som dirigent (kort corner/2. ball).

---

## 7. Kampplanintegrasjon
```javascript
{
  id: "a08-fase1",
  text: "Playmaker: bevegelse i mellomrom, åpen kropp",
},
{
  id: "a08-fase2",
  text: "1–2 touch under press – se før du får ball",
},
{
  id: "a08-fase3",
  text: "Avgjørende pasning: halvspor → blindside",
},
{
  id: "a08-roller",
  text: "Spiss/kant: koordiner med playmaker",
}
```

---

## 8. Evaluering
| Indikator | Mål |
|-----------|-----|
| Playmaker-mottak i mellomrom | ≥15 |
| Touch ≤ 2 i fase 2 | ≥80 % |
| Blindsidepasning | ≥4 |

---

## 9. Coaching Tips
- «Se før du får den»
- «Åpen kropp – 2 touch»
- «Slå blindside når løpet går»
- Ikke la playmaker gjemme seg.

---

## 10. Implementering
| Komponent | Status |
|-----------|--------|
| Øvelser | UEFA-A08-01/02 |
| MatchPrep | 4 fokus |
| Roles | Playmaker, spiss, kant |
| CoachingTips | Orientering/tempo |

---

## 11. Referanser
- Original oppgave: `docs/uefa/A08-gard-holme-playmaker.txt`

---

*Generert fra: A08-gard-holme-playmaker.txt*  
*Analysedato: 4. desember 2025*
