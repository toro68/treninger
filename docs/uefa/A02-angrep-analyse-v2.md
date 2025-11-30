# A02 – Hva skjer før scoring? (Per Inge Jacobsen, UEFA A 2013/14)

**Analysert etter mal:** `ANALYSE-MAL.md`

---

## 1. Metadata

| Felt | Verdi |
|------|-------|
| **Kode** | A02 |
| **Forfatter** | Per Inge Jacobsen |
| **År** | 2013/2014 |
| **Original tittel** | Hva skjer før scoring – en analyse av de tre siste spillerne |
| **Kildefil** | `docs/uefa/A02-per-inge-jacobsen-angrep.txt` |
| **Oppgave-lenke** | https://www.fotball.no/globalassets/trener/uefa-a-lisens/oppgaver/uefa-a-2013-oppgave-per-inge-jacobsen.pdf |
| **Tema** | De tre siste spillerne før scoring (tempo, touch, roller) |
| **Rolle(r)** | Tredjespiller (10/8), assist (kant/back), målscorer (spiss) |

---

## 2. Sammendrag

Jacobsen analyserte 340 scoringer (Barcelona, Bayern, Manchester United, Strømsgodset, Nordstrand) for å kartlegge hva de tre siste spillerne gjør før scoring. Han fant at internasjonale toppklubber avslutter sekvensene på 4–8 sekunder med 1–3 touch per spiller, mens norske lag bruker flere touch og mer tid. Tredjespilleren (spilleren før assist) er oftest orientert i mellomrom, gjør hurtige valg og setter tempoet. Strømsgodset ligner mest på toppklubbene, Nordstrand og andre norske lag trenger bedre forberedelse (orientering, maks touch). Oppgaven oversettes til konkrete KPI-er, øvelser og kampplanpunkter for å heve siste tredjedel.

---

## 3. Nøkkeltall og KPI-er

| KPI | Referanseverdi | Kilde |
|-----|----------------|-------|
| Tid fra tredjespiller mottar ball til scoring | 4–8 sek (Barcelona/Bayern), 6–12 sek (Strømsgodset) | Kap. 4.3 tabell |
| Berøringer per spiller (3 siste) | 1–3 touch (78 % av scoringene) | Kap. 4.4 |
| Tredjespiller-posisjon | Mellomrom/sentralt i 68 % tilfeller | Videoanalyse | 
| Assists touch-count | 1–3 touch (høy kvalitet) | Videoanalyse |

---

## 4. Prinsipper og konsepter

### 4.1 Hovedprinsipper
- **Tredjespilleren setter rytmen**: Mottar i mellomrom, orienterer før ball, få touch.
- **Tempo og touch**: Internasjonalt 1–3 touch; norske lag trenger å trene ned berøringer.
- **Orientering**: Før kontakt + mens ballen er i spill.
- **Strukturell støtte**: Kant/back gir bredde, spiss truer bakrom, midtbane sikrer mot kontring.

### 4.2 Fasemodell
- **Fase 1** (tredjespiller): posisjonering/orientering.
- **Fase 2** (assisten): hurtig valg/presisjon.
- **Fase 3** (målscorer): riktig rom, få touch, hurtig avslutning.

---

## 5. Øvelser for treningsdelen

### Øvelse 1: Tredjespiller i mellomrom

| Felt | Beskrivelse |
|------|-------------|
| **Kode** | UEFA-A02-01 |
| **Kategori** | Angrep |
| **Spillere** | 12 (3 lag à 4) |
| **Bane** | 30 x 25 m med mellomromssone |
| **Format** | 4v2+2 jokere |
| **Formasjon** | 1-2-1 i ruten |
| **Utstyr** | Kjegler, baller |
| **Varighet** | 12 min |
| **Intensitet** | Høy |

**Organisering:**
- Midtsone = mellomrom, jokere spiller tredjespiller-rolle.

**Regler:**
1. Tredjespiller maks 2 touch.
2. Scoring tillates først når jokeren har vært innom.
3. Mål = pasning inn i mini-mål etter maks 6 sek.

**Coaching points:**
- Orientering før mottak.
- Vinkle kroppen for å se begge sider.
- Hurtig tempo videre.

**Progresjon:**
- Legg til forsvarer i mellomrom.

### Øvelse 2: 3-spillersekvens til scoring

| Felt | Beskrivelse |
|------|-------------|
| **Kode** | UEFA-A02-02 |
| **Kategori** | Angrep |
| **Spillere** | 12 (Gk+5v5+2 joker) |
| **Bane** | 40 x 30 m |
| **Format** | Gk+5v5+Gk |
| **Formasjon** | 1-2-2 vs 1-2-2 |
| **Utstyr** | Kjegler, mål |
| **Varighet** | 4 x 4 min |
| **Intensitet** | Høy |

**Organisering:**
- Hvert angrep må inkludere tredjespiller → assist → målscorer.

**Regler:**
1. Tredjespiller maks 2 touch.
2. Assist maks 2 touch.
3. Scoring innen 6 sek etter tredjespiller touch.

**Poeng:**
- Mål innenfor rammene = 2 poeng.
- Vanlig = 1.

**Coaching points:**
- Timing på løp i boks.
- Assists vision.

**Progresjon:**
- Legg til ekstra forsvarer.

---

## 6. Corner / Dødball

- **Offensivt:** Registrer touch & tid ved kort corner (mål = 6 sek). Eureka: bruk kort variant for å skape tredjespiller.
- **Defensivt:** Press på innkast (3 spillere rundt ball innen 3 sek).

---

## 7. Kampplanintegrasjon

### Fokuspunkter
```javascript
{
  id: "a02-touch",
  text: "Tredjespiller: maks 2 touch, orienter før mottak",
},
{
  id: "a02-tid",
  text: "Mål innen 6 sek fra tredjespiller touch (mål 3 ganger pr kamp)",
},
{
  id: "a02-assist",
  text: "Assister: les press, spill på 1-2 touch",
},
{
  id: "a02-malscorer",
  text: "Målscorer: ta første touch mot mål (1 touch avslutning)",
},
{
  id: "a02-orientering",
  text: "Orientering før og under kontakt – alle, spesielt tredjespiller",
}
```

### Motstander-analyse
- Hvor mye press får tredjespiller hos motstander?
- Press kantball? Skal vi spille kort corner eller langt?

### Rollebeskrivelse
- **Tredjespiller (10/8):** orientering, maks 2 touch, tempo.
- **Assist (kant/back):** 1-2 touch, hurtig valg.
- **Målscorer:** plassering og ro.

---

## 8. Evaluering

| Indikator | Mål |
|-----------|-----|
| Scoringer <6 sek fra tredjespiller | 3 |
| Touch (3-players) ≤6 | 80 % |
| Tredjespiller orientering (video) | 90 % |

---

## 9. Coaching Tips / Trenerveiledning
- **Cue:** «Se før du får ballen»
- **Cue:** «1-2 touch = tempo»
- **Cue:** «Mål = 6 sek»
- **Ikke:** Tillat 5+ touch for tredjespiller.

### Trenerveiledning
| Kategori | Gjør dette | Ikke gjør |
|----------|-----------|-----------|
| Orientering | «Sjekk før kontakt» | «Ikke spill uten blikk» |
| Tempo | «Ros hurtige valg» | «Ikke overforklar – la cues styre» |

---

## 10. Implementeringsstatus
| Komponent | Status | Merknad |
|-----------|--------|---------|
| Øvelser | ⬜ | UEFA-A02-01/02 |
| MatchPrep | ⬜ | 5 fokus |
| Roles | ⬜ | Tredjespiller, assist, målscorer |
| CoachingTips | ⬜ | Cues + veiledning |

---

## 11. Referanser
- Original oppgave: `docs/uefa/A02-per-inge-jacobsen-angrep.txt`

---

*Generert fra: A02-per-inge-jacobsen-angrep.txt*  
*Analysedato: 3. desember 2025*
