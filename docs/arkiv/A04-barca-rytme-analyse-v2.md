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

## 11. Konkrete læringspunkter fra Barcelona-analysen

### Hovedfunn som utfordrer vanlige oppfatninger

**Myten om ett-touch-spillet**
- Barcelona spiller ikke primært på ett touch.
- Kun 25 % av alle involveringer er på ett touch.
- I scoringsangrep er andelen enda lavere: 20 %.
- De bruker faktisk flere touch når de skal score (snitt 2,9 vs 2,5).

**Barcelona prioriterer kontroll fremfor tempo**

### Konkrete tips til trenerarbeid

#### 1. Ballkontroll og presisjon fremfor hastighet
- Tren spillerne i å velge riktig antall touch for situasjonen.
- Ikke press spillerne til alltid å spille direkte.
- Kvalitet i utførelse > kvantitet av tempo.
- Presise, korte pasninger med innsiden av beste fot.

#### 2. Roller og individuelle forskjeller
**Fra analysen:**
- Messi: 3,0 touch i snitt (høyest) – får lov til å drible seg bort.
- Xavi: 2,8 touch – dirigenten som styrer rytmen.
- Busquets: 2,1 touch – ryddegutten som spiller enkelt.
- Backene: Mye to-touch (40 % +).

**Trenerkonklusjon:** Aksepter og bygg på spillernes styrker. Ikke alle skal spille likt.

#### 3. Når skal man bruke ett touch?
Barcelona bruker ett touch når:
- de er feilvendte/under press,
- det er trangt tidsmessig,
- ballen ligger perfekt til,
- de leder og vil «olé» motstanderen,
- de vil unngå skader i duellsituasjoner.

Ikke primært for kombinasjonsspill mot mål.

#### 4. Bevegelse og posisjonering
- Alltid spillere i vinkel til ballfører.
- Støttespillere alltid tilgjengelig (stopper + keeper).
- Medløpsbevegelser i nærrom.
- Bevegelser mot fjernrom/bakrom fra motsatt side.
- Messi-typen får frirolle til å vandre.

#### 5. Herredømme gjennom possesjon
- Eie ballen = eie kampen.
- Skape samme klima i hver kamp.
- Gjennombruddsavventende spill (venter på bedre mulighet).
- Tålmodig oppbygging.

#### 6. Tidlig gjenvinning – kritisk!
- Umiddelbart og intenst press ved balltap.
- Stress og jag motstanderen med en gang.
- Kombinasjonen possesjon + tidlig gjenvinning = kvelningsfornemmelse for motstander.

#### 7. Spesifisitet i trening
- Tren på det dere møter i kamp.
- Barcelona møter ofte etablert forsvar → trener på det.
- 14 av 16 mål mot etablert forsvar.
- Tren på gjenvinning fra siste tredjedel.

#### 8. Teknisk utførelse
- 16 av 21 ett-touch i scoringsangrep: med innsiden av foten.
- Spill til mottakers riktige fot (lengst fra motstander).
- Korte, presise pasninger.
- Kontrollerte handlinger.

### Praktiske treningsøkter

**Basert på forfatterens egen praksis:**

1. **Nøyaktighet og tempo i pasningsspill**
   - Fokus på riktig antall touch, ikke bare få touch.
   - Diskuter med spillerne når 1, 2 eller 3 touch er best.

2. **Bevegelseskvalitet**
   - Tren vinkler til ballfører.
   - Timing i løp kontra pasning.

3. **Persepsjonstrening**
   - La spillerne oppdage muligheter og begrensninger selv.
   - Øvelser der de må lese situasjonen.
   - Bli bedre til å hente inn informasjon konstant.

4. **Funksjonell teknikk**
   - Teknikktrening med overføringsverdi til kamp.
   - Ikke bare isolert teknikk.

5. **Spill og problemløsning**
   - Mye spill på trening.
   - Knekk fotballnøtter sammen.
   - Variér mellom gjennombruddsavventende og direkte spill.

### Viktigste konklusjon for trenere

**«God ballkontroll vs. høyt tempo» – svaret er kontroll.**

Barcelona scorer ikke på hurtige ett-touch-kombinasjoner. De:
- skaper herredømme gjennom possesjon,
- bruker kontrollerte, presise handlinger (ofte 2–3 touch),
- vinner ballen tilbake umiddelbart,
- tvinger kampen inn i kjente mønstre,
- lar nøkkelspillere (Xavi, Messi) ta seg god tid,
- venter tålmodig på den rette muligheten.

**For din trenerpraksis:**
Ikke vær redd for å la spillerne ta den ekstra touchen som gir kontroll. Kvalitet i utførelse er viktigere enn hastighet. Bygg et lag der ulike spillere har ulike roller basert på sine styrker – som Barcelona gjør med Messi (dribler), Xavi (dirigent) og Busquets (rydder).

## 12. Referanser
- Original oppgave: `docs/uefa/A04-finn-bredo-olsen-barca-rytme.txt`

---

*Generert fra: A04-finn-bredo-olsen-barca-rytme.txt*  
*Analysedato: 4. desember 2025*
