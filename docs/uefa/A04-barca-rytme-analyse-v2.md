# A04 – Høyt tempo eller god kontroll? (Finn Bredo Olsen, UEFA A 2011/12)

**Analysert etter mal:** `ANALYSE-MAL.md`

---

## 1. Metadata

| Felt | Verdi |
|------|-------|
| **Kode** | A04 |
| **Forfatter** | Finn Bredo Olsen |
| **År** | 2011/2012 |
| **Original tittel** | Høyt tempo eller god kontroll? Analyse av Barcelonas angrepsrytme (CL 2011) |
| **Kildefil** | `docs/uefa/A04-finn-bredo-olsen-barca-rytme.txt` |
| **Oppgave-lenke** | https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa_a_2012_oppgave_finn_bredo_olsen.pdf |
| **Tema** | Angrepsrytme (touch, tempo, kontroll) |
| **Rolle(r)** | Regista, indreløper, ving, falsk nier |

---

## 2. Sammendrag

Olsen analyserte Barcelonas Champions League-kamper (2010/11) og loggførte alle touch i scoringsangrep. 25 % av involveringene var ett-touch og 36 % to-touch (snitt 2,1). Når Barca jaktet mål økte tempoet (mindre touch), mens de ved ledelse senket farten for å kontrollere. Konklusjon: tempoet handler om kontroll – Barca veksler rytme uten å miste struktur. Norske lag bør trene på når en-touch skal brukes og hvordan man kan «stoppe klokka» ved å sette opp roligere fasit.

---

## 3. Nøkkeltall og KPI-er

| KPI | Referanseverdi | Kilde |
|-----|----------------|-------|
| Ett-touch involveringer | 25 % av alle touch | Kap. 6.5 |
| To-touch | 36 % | Kap. 6.5 |
| Gjennomsnitt touch pr spiller | 2,1 | Kap. 6.5 |

---

## 4. Prinsipper og konsepter

### 4.1 Hovedprinsipper
- **Rytmestyring**: kontroller tempoet via touch-antall.
- **Ett-touch for å bryte linjer**: særlig i kombinasjoner på tredje mann.
- **To-touch for kontroll**: ro og oversikt når laget leder.
- **Tempo-switch**: definér når laget skal «gire opp» vs. «fryse».

### 4.2 Fasemodell
- **Fase 1 – Oppbygging**: rolig (2-3 touch), flytte laget.
- **Fase 2 – Akselerasjon**: ett-touch kombinasjoner rundt boksen.
- **Fase 3 – Kontroll**: stopp klokka, beholde ball, forberede ny akselerasjon.

---

## 5. Øvelser for treningsdelen

### Øvelse 1: Ett-touch maurtue

| Felt | Beskrivelse |
|------|-------------|
| **Kode** | UEFA-A04-01 |
| **Kategori** | Rondo |
| **Spillere** | 12–16 |
| **Bane** | 25 x 25 m (maurtue – flere kvadrater) |
| **Format** | 6v3+3 jokere |
| **Formasjon** | Rondo |
| **Utstyr** | Kjegler, baller |
| **Varighet** | 12 min |
| **Intensitet** | Høy |

**Organisering:**
- Fire kvadrater koblet – ballen må gjennom hvert kvadrat.

**Regler/Constraints:**
1. Angrepslaget må bruke ett-touch når de går gjennom «port».
2. To-touch maks i resterende rom.
3. Bonus for scoring etter tre ett-touch kombinasjoner.

**Coaching points:**
- Kroppsposisjon før pasning.
- Kommunikasjon og cues.

**Progresjon:**
- Flere forsvarere, større press.

### Øvelse 2: Tempo-switch 8v8

| Felt | Beskrivelse |
|------|-------------|
| **Kode** | UEFA-A04-02 |
| **Kategori** | Game |
| **Spillere** | 16 |
| **Bane** | 60 x 45 m |
| **Format** | Gk+7v7+Gk |
| **Formasjon** | 1-3-3-1 vs 1-3-3-1 |
| **Utstyr** | Mål, kjegler |
| **Varighet** | 4 x 5 min |
| **Intensitet** | Varierende |

**Regler/Constraints:**
1. Trener roper «tempo!» → laget må spille ett-touch i 10 sek.
2. «Kontroll!» → 2-3 touch, hvile med ball.
3. Scoring innenfor tempo-vindu = 2 poeng.

**Coaching points:**
- Gjenkjenn trigger.
- Hurtig støtte i ett-touch.

---

## 6. Corner / Dødball
- Kort corner-variant: ett-touch spill før avslutning.
- Frispark: tempo-switch (latens før stikkpasning).

---

## 7. Kampplanintegrasjon (MatchPrep)
```javascript
{
  id: "a04-touch",
  text: "1-touch når vi bryter linjer, 2-touch når vi kontrollerer",
},
{
  id: "a04-tempo",
  text: "Definér tempo-switch (press, resultat, tid)",
},
{
  id: "a04-maurtue",
  text: "Fyll rom rundt ball – maurtue-prinsippet",
},
{
  id: "a04-messi",
  text: "Messi-rolle: driv når rommet åpner seg",
},
{
  id: "a04-dirigent",
  text: "Dirigent (Xavi-rolle) styrer touch-krav",
}
```

### Rollebeskrivelser
- **Dirigent (sentral midtbane)**: bestemmer tempo, fordeler.
- **Indreløpere**: veggspill på ett-touch, posisjonere i maurtua.
- **Vinger/falsk nier**: gjenkjenne når de skal holde ball vs. slippe.

---

## 8. Evaluering
| Indikator | Mål |
|-----------|-----|
| Ett-touch andel i scoringsforsøk | ≥35 % |
| Tempo-switch (høyt tempo) pr kamp | ≥6 |
| Ballbesittelse ved ledelse | ≥60 % |

---

## 9. Coaching Tips / Trenerveiledning
- **Cue:** «Tempo! Ett-touch nå»
- **Cue:** «Kontroll – 2 touch»
- **Cue:** «Strekk maurtua»
- **Ikke:** La laget spille samme rytme uansett.

### Trenerveiledning
| Kategori | Gjør dette | Ikke gjør |
|----------|-----------|-----------|
| Tempo | «Gi klare signaler om rytme» | «Ikke la spillerne gjette» |
| Læring | «Variér mellom høy/lav intensitet» | «Ikke bare kjør high-press» |

---

## 10. Implementering
| Komponent | Status |
|-----------|--------|
| Øvelser | UEFA-A04-01/02 |
| MatchPrep | 5 fokus |
| Roles | Dirigent, indreløper, ving |
| CoachingTips | Tempo-cues |

---

## 11. Referanser
- Original oppgave: `docs/uefa/A04-finn-bredo-olsen-barca-rytme.txt`

---

*Generert fra: A04-finn-bredo-olsen-barca-rytme.txt*  
*Analysedato: 4. desember 2025*
