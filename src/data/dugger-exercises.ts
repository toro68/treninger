// Øvelser fra "Create a World Class Soccer Defense" av Chest Dugger
// Kilde: Chest Dugger - "Create a World Class Soccer Defense: 100 Soccer Drills, Tactics and Techniques" (2021)

import { Exercise } from './exercises';

export const duggerExercises: Exercise[] = [
  // === GRUNNLEGGENDE FORSVARSØVELSER ===
  {
    id: "dugger-deny-space",
    exerciseNumber: 1,
    name: "Nekte Rom",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Enkel øvelse for å nekte motstanderlaget rom. Forsvarerne jobber med å holde kompakt formasjon og stenge pasningslinjer.",
    coachingPoints: [
      "Hold øyekontakt med ballen og nærmeste motspiller",
      "Steng pasningslinjer ved å plassere deg mellom ball og mål",
      "Kommuniser med medspillere om hvem som dekker hvem",
      "Flytt deg som en enhet med laget"
    ],
    variations: [
      "Øk antall angripere for mer press",
      "Reduser feltstørrelsen",
      "Legg til tidsbegrensning"
    ],
    source: "dugger"
  },
  {
    id: "dugger-pressure-pass",
    exerciseNumber: 2,
    name: "Press på Pasning",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Tving motstanderen til å spille ballen under press. Forsvareren går ut på ballmottaker idet pasningen spilles.",
    coachingPoints: [
      "Start bevegelsen idet pasningen spilles",
      "Nærm deg i kurvet løpsbane for å stenge én side",
      "Reduser hastigheten de siste meterne - ikke stup inn",
      "Hold lavt tyngdepunkt for raske retningsendringer"
    ],
    variations: [
      "Varier avstanden ballmottaker har til deg",
      "Legg til en andre forsvarer som sikrer",
      "Poengsystem for vellykkede ballvinninger"
    ],
    source: "dugger"
  },
  {
    id: "dugger-hold-up",
    exerciseNumber: 3,
    name: "Holde Opp Angriper",
    category: "station",
    duration: 10,
    playersMin: 4,
    playersMax: 10,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Forsvarer holder opp angriperen med ball, forsinker fremgangen uten å stupe inn. Fokus på kroppsstilling og timing.",
    coachingPoints: [
      "Hold deg mellom angriper og mål",
      "Stå sidelengs for å reagere raskt begge veier",
      "Vent på riktig øyeblikk - når motstanderen har dårlig touch",
      "Kjøp tid for medspillere å komme tilbake"
    ],
    variations: [
      "Legg til tidsbegrensning for angriperen",
      "Utvid til 2v1 med sikringsspiller",
      "Poengsystem for sekunder holdt opp"
    ],
    source: "dugger"
  },
  {
    id: "dugger-block-shots",
    exerciseNumber: 4,
    name: "Blokkere Skudd og Pasninger",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Tre lag med spillere pluss keeper. Forsvarerne øver på å blokkere skudd og pasninger i farlige soner nær mål.",
    coachingPoints: [
      "Steng skuddvinkelen - stå mellom ball og mål",
      "Bruk kroppen aktivt - ikke vend deg bort",
      "Timing på utsprang - ikke for tidlig, ikke for sent",
      "Kommuniser med keeper om hvem som tar hva"
    ],
    variations: [
      "Varier skuddposisjoner",
      "Legg til innleggssituasjoner",
      "Øv med flere angripere"
    ],
    source: "dugger"
  },
  {
    id: "dugger-weak-foot",
    exerciseNumber: 5,
    name: "Tvinge på Svak Fot",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Forsvarer plasserer seg for å tvinge angriperen til å bruke sin svake fot. Øvelse i retningsbestemmelse.",
    coachingPoints: [
      "Identifiser motstanderens sterke fot",
      "Steng den sterke siden med kroppen",
      "Nærm deg i vinkel som inviterer til svak fot",
      "Vær tålmodig - la motstanderen gjøre feilen"
    ],
    variations: [
      "Kombiner med takling når ballen er på svak fot",
      "Legg til mål - angriperen må score på svak fot",
      "Rotér forsvarere"
    ],
    source: "dugger"
  },
  {
    id: "dugger-cover-space",
    exerciseNumber: 6,
    name: "Dekke Rom",
    category: "station",
    duration: 12,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Forsvarerne øver på å dekke rom og flytte seg som enhet. Fokus på å stenge farlige rom sentralt.",
    coachingPoints: [
      "Hold øyekontakt med ball og medspillere",
      "Steng rommet mot mål først",
      "Flytt deg med laget - ikke bli igjen",
      "Kommuniser: 'Jeg dekker', 'Stram inn'"
    ],
    variations: [
      "Varier antall angripere",
      "Legg til overgangsfaser",
      "Poengsystem for nullminutter"
    ],
    source: "dugger"
  },
  {
    id: "dugger-block-tackle",
    exerciseNumber: 7,
    name: "Blokktakling",
    category: "station",
    duration: 10,
    playersMin: 4,
    playersMax: 10,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Øvelse i korrekt blokktakling-teknikk. Forsvareren går inn med fast fot og vinner ballen.",
    coachingPoints: [
      "Gå inn med bestemthet - halv innsats gir skader",
      "Bruk innsiden av foten, lås ankelen",
      "Senk tyngdepunktet og bruk kroppsvekt",
      "Følg opp med andre touch for å sikre ballen"
    ],
    variations: [
      "Øv fra ulike vinkler",
      "Legg til bevegelse før takling",
      "Kombiner med gjenvinningsspill"
    ],
    source: "dugger"
  },
  {
    id: "dugger-sliding-tackle",
    exerciseNumber: 8,
    name: "Glidende Takling",
    category: "station",
    duration: 10,
    playersMin: 4,
    playersMax: 10,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Øvelse i glidende takling som siste utvei. Fokus på timing og teknikk.",
    coachingPoints: [
      "Bruk KUN når det er siste mulighet",
      "Timing er alt - for tidlig = passert, for sent = frispark",
      "Gå inn fra siden, ikke bakfra",
      "Sikt på ballen, ikke spilleren"
    ],
    variations: [
      "Øv på ulike underlag",
      "Legg til at angriperen har fart",
      "Kombiner med rask reisning etterpå"
    ],
    source: "dugger"
  },

  // === MANNDEKNING OG SONEFORSVAR ===
  {
    id: "dugger-man-mark-zone",
    exerciseNumber: 9,
    name: "Manndekning i Sone",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Manndekning basert på soner. Forsvareren følger sin mann kun innenfor sin definerte sone.",
    coachingPoints: [
      "Kjenn grensene for din sone",
      "Overlever til lagkamerat når mann forlater sonen",
      "Kommuniser: 'Din!', 'Jeg tar!'",
      "Hold øyekontakt med både mann og ball"
    ],
    variations: [
      "Varier sonestørrelser",
      "Legg til flere angripere",
      "Øv på overleveringsfeil og redning"
    ],
    source: "dugger"
  },
  {
    id: "dugger-man-mark-deadball",
    exerciseNumber: 10,
    name: "Manndekning ved Dødball",
    category: "station",
    duration: 15,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Manndekning ved hjørnespark og frispark. Hver forsvarer har ansvar for én angrepsspiller.",
    coachingPoints: [
      "Kjenn din mann - følg bevegelsene",
      "Plasser deg målsiden av din mann",
      "Vær klar for kontakt - gå i kroppen tidlig",
      "Kommuniser med keeper om hvem som tar hvem"
    ],
    variations: [
      "Varier dødballtyper",
      "Kombiner med soneforsvar på deler av boksen",
      "Legg til klareringsøvelse"
    ],
    source: "dugger"
  },
  {
    id: "dugger-zonal-corner",
    exerciseNumber: 11,
    name: "Soneforsvar ved Hjørnespark",
    category: "station",
    duration: 15,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Soneforsvar ved hjørnespark. Spillerne eier sin sone og angriper ballen når den kommer inn.",
    coachingPoints: [
      "Eig din sone - ikke forlat den for å følge mann",
      "Angrip ballen når den kommer inn i din sone",
      "Første bevegelse er alltid mot ballen",
      "Kommuniser med sone-naboer"
    ],
    variations: [
      "Kombiner sone og mann på farlige spillere",
      "Øv på forskjellige hjørnesparkstyper",
      "Legg til kontringsovergang"
    ],
    source: "dugger"
  },

  // === FORSVAR MOT DØDBALL ===
  {
    id: "dugger-defend-near-post",
    exerciseNumber: 12,
    name: "Forsvar Første Stolpe",
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Forsvar mot første stolpe-hjørnespark. Fokus på å vinne første ball.",
    coachingPoints: [
      "Stolpemannen eier første stolpe-rommet",
      "Angrip ballen - ikke vent på den",
      "Klarér høyt og bredt - aldri tilbake i feltet",
      "Følg opp andre ball"
    ],
    variations: [
      "Varier innsvingere og utsvingere",
      "Legg til angripere som løper første stolpe",
      "Øv på heading-teknikk"
    ],
    source: "dugger"
  },
  {
    id: "dugger-defend-deep-corner",
    exerciseNumber: 13,
    name: "Forsvar Dyp Hjørnespark",
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Forsvar mot dype hjørnespark mot bakre stolpe. Fokus på posisjonering og timing.",
    coachingPoints: [
      "Bakre stolpe-forsvarer har ansvar for det rommet",
      "Hold øyekontakt med innslager for timing",
      "Gå i kroppen på angriperen før ballen kommer",
      "Keeper kommuniserer om han kommer"
    ],
    variations: [
      "Varier innleggshøyder",
      "Legg til andre angripere",
      "Kombiner med kontring etter klarering"
    ],
    source: "dugger"
  },
  {
    id: "dugger-defend-throw",
    exerciseNumber: 14,
    name: "Forsvar ved Innkast",
    category: "station",
    duration: 10,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Forsvar ved innkast i farlige soner. Fokus på å nekte rom og vinne første ball.",
    coachingPoints: [
      "Dekk spilleren nærmest innkasteren",
      "Steng rommet mot mål",
      "Vær forberedt på lange kast",
      "Kommuniser hvem som tar hvem"
    ],
    variations: [
      "Øv på lange kast",
      "Legg til returløp-forsvar",
      "Varier innkastposisjoner"
    ],
    source: "dugger"
  },
  {
    id: "dugger-defend-wall",
    exerciseNumber: 15,
    name: "Mur ved Frispark",
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Sette mur ved frispark. Keeper plasserer muren, spillerne holder posisjonen.",
    coachingPoints: [
      "Keeper bestemmer murens plassering",
      "Stå i ro - ikke hopp før skuddet",
      "Dekk keeperens 'blinde' side",
      "Spillere utenfor muren dekker korte varianter"
    ],
    variations: [
      "Varier frisparksavstand",
      "Øv på korte frisparkvarianter",
      "Kombiner med keeperens redning"
    ],
    source: "dugger"
  },

  // === FORMASJONSSPESIFIKKE ØVELSER ===
  {
    id: "dugger-442-defense",
    exerciseNumber: 16,
    name: "4-4-2 Forsvarsspill",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Forsvarsspill i 4-4-2 formasjon. Fokus på kompakthet og lagsamarbeid.",
    coachingPoints: [
      "Hold 10-15m mellom linjene",
      "Hele laget flytter mot ballen",
      "To spisser presser høyt, fire på midtbanen sikrer",
      "Backene holder linjen"
    ],
    variations: [
      "Varier pressingshøyde",
      "Legg til overgangsfaser",
      "Øv mot forskjellige formasjoner"
    ],
    source: "dugger"
  },
  {
    id: "dugger-433-defense",
    exerciseNumber: 17,
    name: "4-3-3 Forsvarsspill",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Forsvarsspill i 4-3-3. Fokus på høyt press fra de tre foran og kompakt midtbane.",
    coachingPoints: [
      "Tre foran: Press høyt, steng pasningslinjer",
      "Tre på midten: Dekk rom, støtt presset",
      "Fire bak: Hold linjen, sikre",
      "Flytt som en enhet"
    ],
    variations: [
      "Øv på pressingstrigger",
      "Legg til kontringssituasjoner",
      "Varier motstanderens formasjon"
    ],
    source: "dugger"
  },
  {
    id: "dugger-offside-trap",
    exerciseNumber: 18,
    name: "Offsidefelle",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester"],
    description: "Øvelse i å spille offsidefelle. Forsvarslinjen flytter seg opp i takt.",
    coachingPoints: [
      "Én leder kommanderer bevegelsen",
      "Alle opp samtidig - én som er sen ødelegger",
      "Timing: Akkurat idet pasningen slås",
      "Hvis usikker: Stå - ikke gamble"
    ],
    variations: [
      "Varier pasningstyper",
      "Legg til løpende angripere",
      "Kombiner med keeper som sikkerhet"
    ],
    source: "dugger"
  },

  // === 3v2 FORSVAR ===
  {
    id: "dugger-3v2-slow",
    exerciseNumber: 19,
    name: "3v2 Forsinke",
    category: "station",
    duration: 15,
    playersMin: 7,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "To forsvarere mot tre angripere. Fokus på å forsinke angrepet til forsterkninger kommer.",
    coachingPoints: [
      "Forsinke > vinne ball. Kjøp tid!",
      "Ikke stup inn - stå på beina",
      "Tving ballen bredt, vekk fra mål",
      "Kommuniser og støtt hverandre"
    ],
    variations: [
      "Legg til tredje forsvarer som løper inn",
      "Poengsystem for sekunder forsinket",
      "Varier startposisjoner"
    ],
    source: "dugger"
  },
  {
    id: "dugger-3v2-cover",
    exerciseNumber: 20,
    name: "3v2 med Sikring",
    category: "station",
    duration: 15,
    playersMin: 7,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "3v2 hvor forsvarerne øver på sikring. Én presser, én dekker rommet bak.",
    coachingPoints: [
      "Første forsvarer: Press og tving retning",
      "Andre forsvarer: Sikre rommet mot mål",
      "Bytt roller når ballen flyttes",
      "Hold kommunikasjonen oppe"
    ],
    variations: [
      "Legg til keeper",
      "Utvid feltet for mer løping",
      "Poengsystem for ballvinning"
    ],
    source: "dugger"
  },
  {
    id: "dugger-3v2-keeper",
    exerciseNumber: 21,
    name: "3v2 med Keeper",
    category: "game",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "3v2 forsvar med keeper. Keeper kommuniserer og fungerer som sweeper.",
    coachingPoints: [
      "Keeper: Avansert posisjon for å ta gjennomspill",
      "Keeper kommanderer forsvarerne",
      "Forsvarerne stoler på keeperen",
      "Ved keeper-utrushing: Dekk mållinjen"
    ],
    variations: [
      "Varier angrepsvinkler",
      "Legg til tidsbegrensning",
      "Rotér keeper-rollen"
    ],
    source: "dugger"
  },

  // === RONDO-FORSVAR ===
  {
    id: "dugger-rondo-5v2",
    exerciseNumber: 22,
    name: "Rondo 5v2 Forsvarspress",
    category: "station",
    duration: 12,
    playersMin: 7,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Klassisk 5v2 rondo hvor forsvarerne øver på koordinert press og ballvinning.",
    coachingPoints: [
      "Jobb sammen - ikke press alene",
      "Steng pasningslinjer, ikke bare løp mot ball",
      "Kommuniser: 'Jeg tar ball', 'Du stenger'"
    ],
    variations: [
      "Reduser området for økt press",
      "Touch-begrensning for angriperne",
      "Rotér forsvarere ved ballvinning"
    ],
    source: "dugger"
  },
  {
    id: "dugger-rondo-2v1",
    exerciseNumber: 23,
    name: "Rondo 2v1 i Boks",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Enkel 2v1 i liten boks. Forsvareren øver på å lese spillet og avskjære.",
    coachingPoints: [
      "Ikke stup inn - vent på dårlig touch",
      "Les pasningslinjene",
      "Avskjæring > takling",
      "Hold lavt tyngdepunkt"
    ],
    variations: [
      "Touch-begrensning for angriperne",
      "Tidsbegrensning",
      "Poeng for avskjæringer vs taklinger"
    ],
    source: "dugger"
  },

  // === KEEPERØVELSER ===
  {
    id: "dugger-keeper-position",
    exerciseNumber: 24,
    name: "Keeper Posisjonering",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 8,
    theme: "keeper",
    equipment: ["kjegler", "baller", "mål"],
    description: "Keeper øver på å finne bisektoren og justere posisjon etter ballens bevegelse.",
    coachingPoints: [
      "Finn bisektoren mellom ball og begge stolper",
      "Jo lengre ut, jo smalere vinkel for skytter",
      "Juster posisjon når ballen flyttes",
      "Ved kryss: Tilbake for å håndtere innlegg"
    ],
    variations: [
      "Legg til skudd fra ulike posisjoner",
      "Kombiner med innlegg",
      "Øv på raske posisjonsskift"
    ],
    source: "dugger"
  },
  {
    id: "dugger-keeper-reactions",
    exerciseNumber: 25,
    name: "Keeper Reaksjoner",
    category: "warmup",
    duration: 8,
    playersMin: 2,
    playersMax: 4,
    theme: "keeper",
    equipment: ["baller", "mål"],
    description: "Oppvarming for keeper med fokus på raske reaksjoner og redninger.",
    coachingPoints: [
      "Stå på tåballene, klar for bevegelse",
      "Dykk med sprett, ikke fall",
      "Tilbake til startposisjon raskt",
      "Hold blikket på ballen hele tiden"
    ],
    variations: [
      "Øk tempoet gradvis",
      "Varier kastene (høyt, lavt, til side)",
      "Legg til skudd etter kast"
    ],
    source: "dugger"
  },
  {
    id: "dugger-keeper-1v1",
    exerciseNumber: 26,
    name: "Keeper 1v1 Redning",
    category: "station",
    duration: 12,
    playersMin: 4,
    playersMax: 10,
    theme: "keeper",
    equipment: ["kjegler", "baller", "mål"],
    description: "Keeper øver på 1v1-situasjoner mot angriper som kommer alene.",
    coachingPoints: [
      "Kom ut langs bisektoren",
      "Gjør deg stor - spred armer og bein",
      "Commit sent - vent på angriperens touch",
      "Schmeichel-stjernen: Frem med kroppen, spred deg"
    ],
    variations: [
      "Varier angrepsvinkler",
      "Legg til forsvarer som jager",
      "Øv fra ulike avstander"
    ],
    source: "dugger"
  },
  {
    id: "dugger-keeper-crosses",
    exerciseNumber: 27,
    name: "Keeper Innlegg",
    category: "station",
    duration: 15,
    playersMin: 6,
    playersMax: 12,
    theme: "keeper",
    equipment: ["kjegler", "baller", "mål"],
    description: "Keeper øver på å plukke innlegg. Start uten motstand, bygg opp med angripere.",
    coachingPoints: [
      "Fang på høyeste punkt du kan nå",
      "Led med nærmeste kne mot innlegget",
      "Rop tidlig: 'Keeper!'",
      "Ta ballen inn til brystet ved landing"
    ],
    variations: [
      "Legg til angripere i boksen",
      "Varier innleggstyper",
      "Øv på boxing når du ikke kan fange"
    ],
    source: "dugger"
  },

  // === SPILLE UT FRA KEEPER ===
  {
    id: "dugger-play-out-1",
    exerciseNumber: 28,
    name: "Spille Ut Bakfra (1)",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "oppbygging",
    equipment: ["kjegler", "baller", "vester"],
    description: "5+keeper mot 2 press. Forsvaret øver på å spille seg ut av eget felt med lite press.",
    coachingPoints: [
      "Spre ut - skap pasningsalternativer",
      "Bruk bredden - kant er ofte fri",
      "Tålmodighet - spill tilbake om nødvendig",
      "God førstekontakt skaper tid"
    ],
    variations: [
      "Øk antall pressende spillere",
      "Legg til overgangsmål",
      "Tidsbegrensning på å komme ut"
    ],
    source: "dugger"
  },
  {
    id: "dugger-play-out-2",
    exerciseNumber: 29,
    name: "Spille Ut Bakfra (2)",
    category: "game",
    duration: 18,
    playersMin: 12,
    playersMax: 18,
    theme: "oppbygging",
    equipment: ["kjegler", "baller", "vester", "småmål"],
    description: "Mer kompleks øvelse med overgang til angrep hvis forsvaret spiller seg ut.",
    coachingPoints: [
      "Ved press: Backs trekker inn i boksen",
      "Midtstoppere splitter for å skape rom",
      "Spiss dropper for å tilby mottaksalternativ",
      "Andre pasning går raskt ut på kanten"
    ],
    variations: [
      "Varier presset",
      "Legg til kontring for forsvarerne",
      "Øv på målsparksituasjoner"
    ],
    source: "dugger"
  },

  // === SPILLØVELSER ===
  {
    id: "dugger-3v2-game",
    exerciseNumber: 30,
    name: "3v2 Rotasjonsspill",
    category: "game",
    duration: 20,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Kontinuerlig 3v2 med rotasjon. Angripere og forsvarere bytter etter hvert angrep.",
    coachingPoints: [
      "Forsvarere: Forsinke, forsinke, forsinke",
      "Tving ballen bredt, vekk fra mål",
      "Kommuniser hvem som presser og hvem som sikrer",
      "Ved ballvinning: Rask overgang"
    ],
    variations: [
      "Legg til tidsbegrensning for angripere",
      "Poengsystem for forsvarerne",
      "Varier startposisjoner"
    ],
    source: "dugger"
  },

  // === HØYT PRESS OG FRONTPRESS ===
  {
    id: "dugger-high-press",
    exerciseNumber: 31,
    name: "Høyt Press",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Øvelse i høyt press der hele laget presser intensivt når ballen er hos motstanderens forsvar. Mål: Tvinge feil eller lang ball.",
    coachingPoints: [
      "Press trigger: Når motstander spiller baklengs eller sideways",
      "Spissene presser først, midtbanen følger",
      "Alle må jobbe - én som slapper av ødelegger presset",
      "Ved gjennombrudd: Høy fart bakover, steng sentralt"
    ],
    variations: [
      "Varier pressingshøyde",
      "Legg til tidsbegrensning",
      "Poengsystem for pressende lag"
    ],
    source: "dugger"
  },
  {
    id: "dugger-front-press",
    exerciseNumber: 32,
    name: "Frontpress 4-3-3",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 22,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Frontpress fra 4-3-3. De tre foran presser, kantene dropper til å bli en femmer på midtbanen. Fokus på å provosere feil.",
    coachingPoints: [
      "Nærmeste spiss + én kant presser ballen",
      "Tredje spiller dropper til midtbanen",
      "Provosér feil - ikke stup inn",
      "Stå av 1 meter og steng pasningsvinkel"
    ],
    variations: [
      "Varier hvilken spiss som trigger",
      "Øv mot ulike formasjoner",
      "Legg til overgang ved ballvinning"
    ],
    source: "dugger"
  },

  // === TRACKING OG LØPSDEKNING ===
  {
    id: "dugger-tracking-runs",
    exerciseNumber: 33,
    name: "Tracking Midtbaneløp",
    category: "station",
    duration: 15,
    playersMin: 10,
    playersMax: 16,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "Øvelse i å følge løp fra midtbanen. Hver forsvarer har ansvar for en sone - følger mann gjennom sin sone.",
    coachingPoints: [
      "Kjenn grensene for din sone",
      "Overlever til lagkamerat ved sonegrense",
      "Kommuniser: 'Din!', 'Jeg tar!'",
      "Hold øyekontakt med både mann og ball"
    ],
    variations: [
      "Varier sonestørrelser",
      "Legg til flere angripere",
      "Øv på overleveringsfeil og redning"
    ],
    source: "dugger"
  },
  {
    id: "dugger-5v4-tracking",
    exerciseNumber: 34,
    name: "5v4 med Tracking",
    category: "game",
    duration: 15,
    playersMin: 10,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "småmål"],
    description: "5v4 der angrepet har en target-spiller som ikke kan scores på, men må brukes. Forsvarerne tracker løpene.",
    coachingPoints: [
      "Target-mannen brukes for å starte angrep",
      "Trackeren følger løperen inn i scoringssone",
      "Kommunikasjon om hvem som dekker hvem",
      "Forsvar vinner poeng ved å stoppe scoringer"
    ],
    variations: [
      "Varier antall pasninger før scoring",
      "Legg til tidsbegrensning",
      "Roter forsvarere"
    ],
    source: "dugger"
  },

  // === FORMASJONSFORSVAR: DIAMANT OG SWEEPER ===
  {
    id: "dugger-diamond-defense",
    exerciseNumber: 35,
    name: "Diamant Midtbaneforsvar",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Forsvarsspill med diamant på midtbanen. Fokus på den defensive midtbanespilleren som sikrer foran back 4.",
    coachingPoints: [
      "Defensive midtbanespiller sitter foran backene",
      "Diamanten roterer med ballen",
      "Ved gjennombrudd sentralt: 6-eren dropper mellom stopperne",
      "Sidene av diamanten dekker kantene"
    ],
    variations: [
      "Varier motstanders angrep",
      "Øv mot ulike formasjoner",
      "Legg til overgang ved ballvinning"
    ],
    source: "dugger"
  },
  {
    id: "dugger-sweeper-system",
    exerciseNumber: 36,
    name: "Sweeper-System",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Forsvarsspill med sweeper bak backlinjen. Sweeperen rydder opp og starter spillet.",
    coachingPoints: [
      "Sweeperen posisjonerer seg 5-10m bak linjen",
      "Kommunikasjon med keeper om hvem som tar hva",
      "Sweeper må lese spillet og dekke rommet",
      "Ved ballvinning: Sweeper starter oppbyggingen"
    ],
    variations: [
      "Varier backlinjen (3 eller 4)",
      "Sweeper deltar i oppbygging",
      "Øv mot ulike angrepsmønstre"
    ],
    source: "dugger"
  },

  // === 4-2-3-1 OG 4-1-4-1 ===
  {
    id: "dugger-4231-defense",
    exerciseNumber: 37,
    name: "4-2-3-1 Forsvarsspill",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Forsvarsspill i 4-2-3-1. Fokus på de to defensive midtbanespillerne som beskytter boksen.",
    coachingPoints: [
      "Dobbeltseks sikrer foran backlinjen",
      "10-eren dropper for å gjøre midtbanen til 5",
      "Kantspillerne faller tilbake ved forsvar",
      "Spissen presser pasningslinjer"
    ],
    variations: [
      "Varier pressingshøyde",
      "Øv på overgang til angrep",
      "Ulike motstander-formasjoner"
    ],
    source: "dugger"
  },
  {
    id: "dugger-4141-defense",
    exerciseNumber: 38,
    name: "4-1-4-1 Kompakt Forsvar",
    category: "game",
    duration: 20,
    playersMin: 14,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "4-1-4-1 med én defensiv midtbanespiller som skjermer. Ekstra sikker defensivt.",
    coachingPoints: [
      "6-eren sitter foran stopperne",
      "Midtbane-4 er kompakt og smal",
      "Ved angrep bredt: Kant dropper, 6-er glir ut",
      "Spissen dropper for å hjelpe midtbanen"
    ],
    variations: [
      "Varier 6-erens rolle",
      "Øv på overganger",
      "Mot forskjellige formasjoner"
    ],
    source: "dugger"
  },

  // === POKE TACKLE OG RECOVERY ===
  {
    id: "dugger-poke-tackle",
    exerciseNumber: 39,
    name: "Poke Tackle",
    category: "station",
    duration: 10,
    playersMin: 6,
    playersMax: 12,
    theme: "forsvar",
    equipment: ["kjegler", "baller"],
    description: "Øvelse i poke tackle for wingbacks som jager tilbake. Fokus på å stikke ballen ut av spill.",
    coachingPoints: [
      "Kom opp på siden av løperen",
      "Lent inn skulder mot skulder",
      "Strekk det ytre beinet, kne bøyd, dobbene ned",
      "Sikt på å poke ballen ut av spill"
    ],
    variations: [
      "Varier fart",
      "Start fra ulike vinkler",
      "Legg til at spilleren må reise seg raskt etterpå"
    ],
    source: "dugger"
  },
  {
    id: "dugger-recovery-run",
    exerciseNumber: 40,
    name: "Recovery Run",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "mål"],
    description: "Øvelse i å løpe tilbake og ta posisjon etter at formasjonen er brutt. Forsvarere starter fra hjørneflagget.",
    coachingPoints: [
      "Sprint i kurve for å komme bak ballen",
      "Ikke jag ballen - ta posisjon først",
      "Kommuniser med keeper og medspillere",
      "Når i posisjon: Press ballen ut bredt"
    ],
    variations: [
      "Varier angripernes startposisjon",
      "Legg til flere forsvarere",
      "Øv med overgang ved ballvinning"
    ],
    source: "dugger"
  },

  // === FLERE KEEPER-ØVELSER ===
  {
    id: "dugger-gk-punching",
    exerciseNumber: 41,
    name: "Keeper Boksing",
    category: "station",
    duration: 12,
    playersMin: 6,
    playersMax: 12,
    theme: "keeper",
    equipment: ["kjegler", "baller", "mål"],
    description: "Keeper øver på å bokse ballen vekk når fangst ikke er mulig. Fokus på kraft og retning.",
    coachingPoints: [
      "Slå gjennom ballen som en boksesekk",
      "Sikt på høyde og distanse",
      "Bruk knyttneven, ikke flat hånd",
      "Bokse bort fra mål og ut av fare"
    ],
    variations: [
      "Varier innleggshøyder",
      "Legg til press fra angripere",
      "Kombiner med klareringsøvelse for forsvar"
    ],
    source: "dugger"
  },
  {
    id: "dugger-gk-communication",
    exerciseNumber: 42,
    name: "Keeper Kommunikasjon",
    category: "station",
    duration: 15,
    playersMin: 8,
    playersMax: 14,
    theme: "keeper",
    equipment: ["kjegler", "baller", "mål"],
    description: "Keeper øver på kommunikasjon med forsvarslinje. Fokus på tydelige, korte beskjeder.",
    coachingPoints: [
      "Korte, klare beskjeder: 'Dave, nummer 6!'",
      "Tydelig stemme, ikke skrikende",
      "Tidlig kommunikasjon - før problemet oppstår",
      "Bruk: 'ut', 'tid', 'mann bak', 'keeper'"
    ],
    variations: [
      "Legg til støy for å øve på volum",
      "Roter keeper for å øve alle",
      "Kombiner med dødball-forsvar"
    ],
    source: "dugger"
  },

  // === MENTAL ROBUSTHET ===
  {
    id: "dugger-resilience",
    exerciseNumber: 43,
    name: "Mental Robusthet",
    category: "game",
    duration: 20,
    playersMin: 12,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Øvelse der forsvarslaget starter 0-2 ned. Fokus på å holde nullen og komme tilbake mentalt.",
    coachingPoints: [
      "Fokus på neste ball, ikke forrige feil",
      "Kommunikasjon holder laget samlet",
      "Lederskapsroller: Hvem snakker laget opp?",
      "Feire små seire: Klarering, takling, nullminutter"
    ],
    variations: [
      "Varier baklengs-marginene",
      "Legg til tidpress",
      "Roter kapteinsrollen"
    ],
    source: "dugger"
  },

  // === IDENTIFISERE FORSVARSSPILLERE ===
  {
    id: "dugger-defender-trial",
    exerciseNumber: 44,
    name: "Forsvarsprøver",
    category: "game",
    duration: 25,
    playersMin: 12,
    playersMax: 20,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "mål"],
    description: "Testøvelse for å identifisere potensielle forsvarere. Fokus på mentale og fysiske egenskaper.",
    coachingPoints: [
      "Se etter: Modig, konsentrert, kommuniserende",
      "Fysisk: Sterk i duell, rask over kort distanse",
      "Mentalt: Takler feil, holder fokus, leder",
      "Teknisk: God første touch, kan spille ut"
    ],
    variations: [
      "Test ulike posisjoner",
      "Varier press og intensitet",
      "Observer hvem som tar ansvar"
    ],
    source: "dugger"
  },

  // === MORSOMT FORSVARSSPILL ===
  {
    id: "dugger-fun-defense",
    exerciseNumber: 45,
    name: "Morsomt Forsvarsspill",
    category: "game",
    duration: 20,
    playersMin: 10,
    playersMax: 18,
    theme: "forsvar",
    equipment: ["kjegler", "baller", "vester", "småmål"],
    description: "Konkurransebasert forsvarsspill med poengsystem. Forsvarere får poeng for klarering, takling og nullminutter.",
    coachingPoints: [
      "Poeng for: Takling (1), Klarering (1), Blokkering (2), Nullminutter (3)",
      "Lag konkurranse mellom forsvarspar",
      "Feire gode forsvarsaksjoner",
      "Gjør forsvar til noe å være stolt av"
    ],
    variations: [
      "Varier poengsystemet",
      "Lag turneringer",
      "Premier beste forsvarer"
    ],
    source: "dugger"
  }
];
