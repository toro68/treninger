# Kategorisering av øvelser

## Oversikt over kategorier

| Kategori | Kode | Formål | Varighet |
|----------|------|--------|----------|
| Fast oppvarming | `fixed-warmup` | Skadefri-programmet, alltid inkludert | 5 min |
| Oppvarming | `warmup` | Aktivering, koordinasjon, ballmestring | 8-12 min |
| Rondo | `rondo` | Posisjonsspill/rondo som egen kategori (valgfritt) | 8-15 min |
| Stasjoner | `station` | Teknisk trening i mindre grupper | 10-15 min |
| Spilløkt | `game` | Hoveddel med spill (ofte vanlig fotball), variabelt format | 30-45 min |
| Avslutning | `cooldown` | Oppsummering, refleksjon, uttøyning | 5 min |

---

## Øvelseskoder (UI og kode-generering)

Appen viser ofte øvelser som en kode på formen `<prefiks><nummer>` (f.eks. `O12`).

- Prefiksen kommer fra øvelsens `category`
- Nummeret kommer fra `exerciseNumber` (unikt innen kategorien)

Kilde: `src/data/exercises.ts` (`getExerciseCode`).

| Kategori (`category`) | Prefiks | Eksempel |
|---|---:|---|
| `fixed-warmup` | `F` | `F1` |
| `warmup` | `O` | `O12` |
| `aktivisering` (historisk) | `AK` | `AK3` |
| `rondo` | `R` | `R2` |
| `station` | `S` | `S7` |
| `game` | `K` | `K14` |
| `cooldown` | `A` | `A1` |

## 1. Fast oppvarming (`fixed-warmup`)

### Kjennetegn
- **NFF Skadefri-programmet** - obligatorisk før hver trening
- Alltid først i økten
- Fokus på skadeforebygging
- Standardisert innhold

### Inkluderer
- Aktivering av kjernemuskulatur
- Dynamisk uttøyning
- Balanse og propriosepsjon
- Lett kardio

### Eksempler
- Skadefri-programmet (5 min fast øvelse)

---

## 2. Oppvarming (`warmup`)

### Kjennetegn
- **Lav til moderat intensitet**
- **Alle spillere aktive samtidig**
- Gradvis økning av tempo
- Ball involvert (helst)
- Forberedelse til hovedøktens tema

### Typer oppvarming

#### Teknisk oppvarming
- Pasningsøvelser i bevegelse
- Dribling gjennom kjegler
- Mottak og vending
- Ball i lufta (heading, volley)

#### Lekbasert oppvarming
- Stikkball/tagging med ball
- Erobringsspill
- Konkurranser lag mot lag

#### Rondo-oppvarming
- 4v1, 5v2 med lav intensitet
- Fokus på pasning og bevegelse
- Korte avstander

### Spillerantall
- Hele gruppen (10-20 spillere)
- Eller delt i 2-3 like store grupper

### Typisk varighet
- 8-12 minutter

---

## 3. Stasjoner (`station`)

### Kjennetegn
- **Teknisk fokus**
- **Høy repetisjonsfrekvens**
- 2-3 grupper (7-15 spillere per stasjon)
- Rotasjon mellom stasjoner
- Trener kan gi individuell feedback

### Typer stasjoner

#### Pasningsstasjoner
- Y-formasjon, diamant, firkant
- 1-touch, 2-touch pasning
- Lange og korte pasninger
- Pasning med bevegelse

#### Avslutningsstasjoner
- Skudd fra ulike vinkler
- Heading mot mål
- 1v1 mot keeper
- Kombinasjon + avslutning

#### Driblingsstasjoner
- Slalåm gjennom kjegler
- Finter og vendinger
- 1v1 i avgrenset område
- Tempo-dribling

#### Forsvarsstasjoner
- Pressing-øvelser
- 1v1 forsvar
- Linjespill
- Gjenvinning

### Organisering
- 2-3 stasjoner
- 8-15 spillere per stasjon
- 3-5 minutter per stasjon
- Rotasjon på signal

### Typisk varighet
- 10-15 minutter totalt

---

## 4. Spilløkt (`game`)

Merk: `game` er en kategori (struktur i treningsøkta). `spill` er et tema (fokus)
og kan brukes på tvers av kategorier, men brukes ofte på spilløkter når øvelsen
er «vanlig spill» uten spesifikt deltema.

### Kjennetegn
- **Kamplikt situasjon**
- **Alle spillere aktive hele tiden**
- Realistiske beslutninger under press
- Naturlig motstand
- Høy intensitet

### Typer spill

#### Smålagsspill (3v3 til 6v6)
- Høy ballkontakt per spiller
- Mange 1v1 situasjoner
- Raske overganger
- Alle involveres

**Varianter:**

- Med/uten keeper
- Med endesoner
- Med nøytrale spillere
- Med støttespillere på kanten

#### Rondo / Posisjonsspill
- Overtallsspill (4v2, 5v2, 6v3)
- Fokus på ballbesittelse
- Pasning under press
- Bevegelse uten ball

**Kjennetegn rondo:**

- Tydelig overtall for ballholdende lag
- Spillere som mister ball går i midten
- 1-touch eller 2-touch regler
- Høy tempo

#### Overgangsspill
- Angrep til forsvar (og motsatt)
- Rask omstilling
- Pressreaksjoner
- Kontringsøvelser

#### Sonespill
- Spill i definerte områder
- Taktisk fokus
- Lagdeler (forsvar/angrep)
- Linjeforflytning

### Spillerantall per lag

| Type | Spillere per lag | Totalt |
|------|------------------|--------|
| 3v3 | 3 | 6-9 |
| 4v4 | 4 | 8-12 |
| 5v5 | 5 | 10-14 |
| 6v6 | 6 | 12-16 |
| 7v7 | 7 | 14-18 |

### Typisk varighet
- 12-20 minutter
- Korte perioder (2-4 min) med pauser

---

## 5. Avslutning (`cooldown`)

### Kjennetegn
- **Lav intensitet**
- Rolig nedtrapping
- Refleksjon og oppsummering
- Mental avslutning

### Inkluderer

#### Fysisk
- Lett jogg / gange
- Statisk uttøyning
- Avslapning

#### Mentalt
- Oppsummering av økten
- Hva lærte vi?
- Ros og anerkjennelse
- Motivasjon til neste trening

#### Sosialt
- Lagprat i ring
- Heiarop
- Takk for treningen

### Typisk varighet
- 5-10 minutter

---

## Temaer

Hver øvelse har et `theme`. Temaet er en streng fra `EXERCISE_THEMES` i `src/data/exercises.ts`.

### Begrepsavklaring: `spill` vs `game`

- `category: "game"` betyr at øvelsen er en spilløkt-del (typisk 30–45 min i en trening, ofte vanlig fotball med variabelt antall lag/format).
- `theme: "spill"` betyr at fokuset er generelt spill uten snevert deltema (i motsetning til f.eks. `pressing`, `gjennombrudd` eller `possession`).

### Normalisering og aliaser

Ved import normaliseres temaer til lowercase og mappes via et lite alias-oppsett:

| Råverdi | Normalisert `theme` |
|---|---|
| `Avslutninger` | `avslutning` |
| `Overganger` | `overgang` |
| `Press` | `pressing` |
| `Passing` | `pasning` |

Ukjente temaer feiler import/validering (`normalizeTheme`).

### Komplett temaliste (39)

Merk: `rondo` finnes både som `theme` (fokus) og som `category` (format/struktur).
Bruk `theme: "rondo"` når fokuset er posisjonsspill/rondo. Velg `category` basert
på organisering (oppvarming/stasjon/spill) — eller `category: "rondo"` når du
vil at øvelsen skal ligge i en egen rondo-del og kunne filtreres som egen
kategori.

Tabellen under er en komplett referanse over alle 39 temaer i `EXERCISE_THEMES`.

| Tema | Gruppe | Beskrivelse | Typiske øvelser |
|---|---|---|---|
| `1v1` | Taktisk | Duelltrening 1 mot 1 | 1v1 i korridor, vende og avslutte |
| `angrep` | Taktisk | Angrepsspill og valg | Angrepsspill mot etablert forsvar |
| `avslutning` | Teknisk | Skudd og avslutning | Avslutning fra kant, 1v1 mot keeper |
| `ballkontroll` | Teknisk | Kontroll i fart, mange berøringer | Teknisk løype, ballmestring |
| `bevegelse` | Taktisk | Løp uten ball og posisjonering | Innløp, støttebevegelse, overlapping |
| `bevegelighet` | Fysisk | Leddutslag og bevegelighet | Dynamisk uttøyning, mobilitetsdriller |
| `dribling` | Teknisk | Føre ball i fart/press | Dribleporter, føringsbaner |
| `dødball` | Taktisk | Standardiserte situasjoner | Corner, frispark, innkast |
| `evaluering` | Mental | Refleksjon og oppsummering | Spørsmål i ring, mini-evaluering i pauser |
| `finter` | Teknisk | Finter og retningsendring | Coerver-varianter, fintebane |
| `forsvar` | Taktisk | Forsvar, gjenvinning og sikring | Press- og sikringsøvelser |
| `gjennombrudd` | Taktisk | Linjebrudd og sjanser | Spill i soner, angrep i mellomrom |
| `heading` | Teknisk | Heading og spill i lufta | Innlegg + heading, dueller |
| `hurtighet` | Fysisk | Fart, akselerasjon, sprint | Korte drag, retningsendringer |
| `innlegg` | Teknisk | Innlegg og avslutning i boks | Kant + innlegg, boksspill |
| `kantspill` | Taktisk | Spill langs kant, bredde/dybde | 2v1 på kant, innleggsspill |
| `konkurranse` | Mental | Konkurranse/poeng og intensitet | King of the hill, stafetter |
| `kontring` | Taktisk | Direkte angrep etter brudd | 3v2/4v3 kontringer |
| `keeper` | Teknisk | Keepertrening | Fotarbeid, grep, 1v1 keeper |
| `koordinasjon` | Fysisk | Fotarbeid og kroppskontroll | Stige/hekkeløype, rytmeøvelser |
| `lek` | Mental | Lekpregede øvelser | Stikkball-varianter, fangeleker med ball |
| `mental` | Mental | Mentale ferdigheter | Fokus, kommunikasjon, beslutningspress |
| `mobilitet` | Fysisk | Kontrollert mobilitet/ledd | Skadefri-inspirert, leddkontroll |
| `omstilling` | Taktisk | Rask rollebytte/omstilling | Kontring/returløp, reorganisering |
| `oppbygging` | Taktisk | Spilloppbygging (bakfra/ledd) | Oppbygging med soner/press |
| `oppvarming` | Fysisk | Aktivering og gradvis intensitet | Lette spillformer, koordinasjon med ball |
| `overgang` | Taktisk | Angrep ↔ forsvar i samme spill | Overgangsspill med regler |
| `overlapp` | Taktisk | Overlapp/underlapp og timing | Kantkombinasjoner, innlegg etter overlapp |
| `pasning` | Teknisk | Pasning og mottak | Pasningsmønster, rondo med pasningskrav |
| `possession` | Taktisk | Ballbesittelse under press | 4v4+3, posisjonsspill |
| `pressing` | Taktisk | Kollektivt press (høyt/lavt) | Jakt/pressspill, trigger-øvelser |
| `restitusjon` | Fysisk | Nedtrapping og restitusjon | Rolig spill, nedjogg, lett mobilitet |
| `rondo` | Taktisk | Rondo/posisjonsspill som tema | 4v2, 5v2, 6v3-varianter |
| `smålagsspill` | Taktisk | Kampnære spill med få spillere | 3v3–6v6-varianter |
| `spill` | Taktisk | Generelt spill (tema) uten snevert fokus | Fri spillform/kamp, ofte brukt i `category: "game"` |
| `styrke` | Fysisk | Styrke og skadeforebygging | Kroppsvekt, partnerøvelser |
| `teknikk` | Teknisk | Generell ferdighetstrening | Kombinasjonsløype, repetisjon |
| `utvikling` | Mental | Læring og progresjon over tid | Øvelser med økende krav, feedback-rutiner |
| `vendingsspill` | Teknisk | Vendinger og første touch | Mottak-vending, trekantøvelser |

---

## Ekstra kategorier i appen

### Aktivisering (`aktivisering`) – utfaset
- Historisk egen kategori, men er slått sammen til `warmup` i UI og normaliseres ved import.
- Kildedata bør bruke `warmup` direkte.

### Rondo (`rondo`)
- `rondo` kan være både fokus (`theme`) og format (valg av `category`).
- Bruk `category: "rondo"` når du vil at øvelsen skal ligge i en egen rondo-del og kunne filtreres som egen kategori i appen.
- Bruk `category: "warmup"` når rondo brukes som aktivering med lav/moderat intensitet (f.eks. 4v1/5v2 i starten av økta).
- Bruk `category: "station"` når rondo kjøres som en av flere stasjoner med tydelig rotasjon/repetisjon (f.eks. 2–3 rondobokser parallelt, bytte på signal).
- Bruk `category: "game"` når rondo/posisjonsspill er hovedspillform med høy intensitet og kontinuerlig spill (kamplikt beslutningspress).
- Merk: `category` handler om struktur/organisering, mens `theme` handler om hva
  øvelsen trener. En rondo-øvelse kan derfor ha `theme: "rondo"` uansett om
  `category` er `warmup`, `station`, `game` eller `rondo`.

## Kilder og deres kjennetegn

Gjeldende liste over kilder ligger i `src/data/exercises.ts` (`ExerciseSource`) og består av 14 verdier.

| Kilde | Fokus | Typisk kategori |
|-------|-------|-----------------|
| **egen** | Interne øvelser/egne varianter | warmup, station, game |
| **tiim** | NFF øvelser, bredt | station, game |
| **eggen** | Norsk filosofi, lagspill | game |
| **dbu** | Dansk, alderstrinn | station |
| **rondo** | Posisjonsspill | game |
| **hyballa** | Tysk pasningstrening | station |
| **bangsbo** | Forsvarstrening | station |
| **dugger** | Forsvar og pressing | station |
| **seeger** | Smålagsspill | game |
| **prickett** | 3v3 spill | game |
| **matkovich** | Elite drills | station, game |
| **worldclass** | Pro-klubber | game |
| **101youth** | Ungdomsfotball | game |
| **uefa** | UEFA-rapporter/økt-eksempler | warmup, station, game |

---

## Hvordan kategorisere en ny øvelse

### Spørsmål å stille:

1. **Er alle spillere aktive samtidig?**

   - Ja → `warmup` eller `game`
   - Nei (rotasjon) → `station`

2. **Er det motstand?**

   - Ja, realistisk → `game`
   - Litt/passiv → `station`
   - Nei → `warmup` eller `station`

3. **Hva er fokuset?**

   - Teknikk/repetisjon → `station`
   - Beslutninger under press → `game`
   - Aktivering → `warmup`
   - Oppsummering → `cooldown`

4. **Hvor mange spillere trengs?**

   - Hele gruppen sammen → `warmup`, `game`, `cooldown`
   - Delt i små grupper med rotasjon → `station`

### Beslutningstre

```
Er det skadefri-oppvarming?
├── Ja → fixed-warmup
└── Nei
    ├── Er det oppvarming/aktivering?
    │   └── Ja → warmup
    └── Nei
        ├── Er det avslutning/refleksjon?
        │   └── Ja → cooldown
        └── Nei
            ├── Har det rotasjon i små grupper?
            │   └── Ja → station
            └── Nei → game (smålagsspill)
```

---

## Eksempler på korrekt kategorisering

### ✓ Riktig som `game`
- 4v4 med mål og keeper
- 5v2 rondo
- 6v6 med endesoner
- 3v3+3 (rotasjonsspill)
- Overtallsspill med scoring

### ✓ Riktig som `station`
- Y-formasjon pasning
- Avslutning fra 16-meter
- Dribling gjennom kjegler
- 1v1 på liten bane (del av stasjonsløype)
- Heading mot mål

### ✓ Riktig som `warmup`
- Stikkball med ball
- Pasning i bevegelse (hele gruppen)
- Lett rondo som aktivering
- Koordinasjonsøvelser

### ✗ Feil kategorisering
- Rondo som `station` uten stasjonsoppsett/rotasjon → ofte bedre som `game`
- 4v4 spill som `station` → Skal være `game`
- Teknisk øvelse uten motstand som `game` → Skal være `station`

---

## Vedlikehold

Denne filen oppdateres når:

- Nye kategorier legges til
- Nye kilder integreres
- Kategoriseringsregler endres

Sist oppdatert: 11. januar 2026
