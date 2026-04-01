import { ExerciseData } from "./exercises";

export const MANC_ATTACKING_POSITIONAL_SOURCE = {
  title: "Pep Guardiola: Practices from Pep's Sessions - Vol. 2",
  section: "Attacking Positional Patterns of Play",
  pages: "112-121",
} as const;

export const mancAttackingPositionalTheory = {
  quote:
    "\"What I love most is those who claim that you couldn't play like this in Germany or the Premier League, with Silva, Bernardo, Aguero, all of whom are 5 foot tall. But we've done it. By receiving few goals and dominating the game through positional play.\"",
  quoteSource: "Pep Guardiola interview by Antoni Bassas for Daily ARA, published July 5th 2019",
  keyAspects: [
    "Aldri slipp posisjonen for å komme ned og hente ball.",
    "Bruk pasningskombinasjoner for å flytte motstanderen ut av posisjon.",
    "Vinger høyt og bredt for å straffe ubalanse.",
    "Dominer spillet høyt i banen.",
    "Ballbesittelse er et verktøy, ikke et mål i seg selv.",
    "Skap 1v1 i nøkkelrom.",
    "Strukturert posisjonering og felles oppflytting.",
    "Riktig kroppsstilling i mottak.",
    "Korte, presise pasninger.",
    "Bruk tredjemann for å skape fri spiller mellom ledd.",
    "Spill med intensitet og full konsentrasjon gjennom hele kampen.",
  ],
} as const;

const baseMancAttackingPositionalExercises: ExerciseData[] = [
  {
    id: "manc-app-01-full-back-forward-receive-layoff-dribble-final-third",
    exerciseNumber: 791,
    name: "Back går frem for å motta avlegg fra offensiv midtbane og drive inn i siste tredel (s. 118)",
    displayName: "Back frem, avlegg og framdrift i siste tredel (s. 118)",
    tags: ["manc-elite-academy-coaching-2023", "pep-sessions-vol2", "attacking-positional-patterns"],
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 20,
    theme: "avslutning",
    equipment: ["baller", "vester", "mål", "mannekenger"],
    description:
      "1. Høyre stopper (5) spiller på tvers til venstre stopper (14). 2. Venstre offensiv midtbane (47) trekker inn for å skape pasningsvinkel og mottar fra venstre stopper (14). 3. Venstre offensiv midtbane (47) legger av til fremadstormende venstre back (11) i halvt rom. 4. Venstre back (11) driver fremover med ball. 5. Venstre back (11) spiller på tvers til høyre offensiv midtbane (17). 6. Offensiv midtbane (17) spiller i bakrom til spiss (7), som gjør et buet løp bort fra rød forsvarer. Venstre ving og venstre offensiv midtbane gjør også løp i bakrom. 7. Spiss (7) mottar. 8. Spiss (7) avslutter på mål.",
    coachingPoints: [],
    variations: [],
    imageUrl: "/book-illustrations/manc-academy/p120-manc-app-01-full-back-forward-receive-layoff-dribble-final-third.webp",
    source: "manc",
    sourceRef:
      "Pep Guardiolas Manchester City-trening, Yokohama International Stadium, Japan, 26. juli 2019 (SoccerTutor Vol. 2, s. 118)",
  },
  {
    id: "manc-app-02-att-mid-layoff-def-mid-pass-behind-forward",
    exerciseNumber: 792,
    name: "Offensiv midtbane legger av for defensiv midtbane som spiller i bakrom til spiss (s. 119)",
    displayName: "Avlegg fra 10-er til 6-er, bakromspasning til spiss (s. 119)",
    tags: ["manc-elite-academy-coaching-2023", "pep-sessions-vol2", "attacking-positional-patterns"],
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 20,
    theme: "avslutning",
    equipment: ["baller", "vester", "mål", "mannekenger"],
    description:
      "1. Høyre stopper (5) spiller til høyre back (3) i halvt rom. 2. Høyre back (3) spiller til venstre offensiv midtbane (47), som har flyttet seg inn sentralt. 3. Offensiv midtbane (47) legger av til defensiv midtbane (16), som gjør et buet løp fremover. 4. Defensiv midtbane (16) spiller sistepasning til spiss (7), som gjør buet bevegelse bort fra rød forsvarer. Venstre ving og venstre offensiv midtbane gjør også løp i bakrom. 5. Spiss (7) mottar. 6. Spiss (7) avslutter på mål.",
    coachingPoints: [],
    variations: [],
    imageUrl: "/book-illustrations/manc-academy/p121-manc-app-02-att-mid-layoff-def-mid-pass-behind-forward.webp",
    source: "manc",
    sourceRef:
      "Pep Guardiolas Manchester City-trening, Yokohama International Stadium, Japan, 26. juli 2019 (SoccerTutor Vol. 2, s. 119)",
  },
  {
    id: "manc-app-03-centre-back-long-pass-forward-third-man-run",
    exerciseNumber: 793,
    name: "Stopper slår langt på spiss og tredjemannsløp fra offensiv midtbane (s. 120)",
    displayName: "Langpasning på spiss + tredjemannsløp (s. 120)",
    tags: ["manc-elite-academy-coaching-2023", "pep-sessions-vol2", "attacking-positional-patterns"],
    category: "station",
    duration: 12,
    playersMin: 10,
    playersMax: 20,
    theme: "avslutning",
    equipment: ["baller", "vester", "mål", "mannekenger"],
    description:
      "1. Høyre stopper (5) spiller på tvers til venstre stopper (14). Venstre offensiv midtbane (47) beveger seg tilbake og inn for å gi pasningsalternativ. 2. Venstre stopper (14) spiller langt i foten til spiss (7). Defensiv midtbane (16) flytter frem. 3. Spiss (7) spiller en godt timet pasning på høyre offensiv midtbane (17), som gjør et buet tredjemannsløp fra dyp posisjon. 4. Offensiv midtbane (17) mottar. 5. Offensiv midtbane (17) avslutter på mål.",
    coachingPoints: [],
    variations: [],
    imageUrl: "/book-illustrations/manc-academy/p122-manc-app-03-centre-back-long-pass-forward-third-man-run.webp",
    source: "manc",
    sourceRef:
      "Pep Guardiolas Manchester City-trening, Yokohama International Stadium, Japan, 26. juli 2019 (SoccerTutor Vol. 2, s. 120)",
  },
  {
    id: "manc-app-04-switch-attack-overlap-full-back-behind",
    exerciseNumber: 794,
    name: "Vende angrepspunkt og spille i bakrom til overlappende back (s. 121)",
    displayName: "Vending av spill + overlappende back (s. 121)",
    tags: ["manc-elite-academy-coaching-2023", "pep-sessions-vol2", "attacking-positional-patterns"],
    category: "station",
    duration: 14,
    playersMin: 10,
    playersMax: 20,
    theme: "oppbygging",
    equipment: ["baller", "vester", "mål", "mannekenger"],
    description:
      "1. Venstre stopper (14) spiller til venstre back i halvt rom. 2. Venstre back (11) spiller tilbake til stopper (14). 3. Stopper (14) spiller frem til defensiv midtbane (16), som har flyttet over for å være spillbar. 4. Defensiv midtbane (16) spiller til motsatt stopper (5). 5. Høyre stopper (5) driver frem. 6. Stopper (5) spiller til høyre ving (20), som kommer inn fra sidelinjen for å motta. 7. Høyre ving (20) legger av til høyre offensiv midtbane (17) i fart. 8. Offensiv midtbane (17) spiller i bakrom til høyre back (3), som overlapper og mottar nær dødlinjen. 9. Høyre back (3) slår innlegg, og fire spillere gjør løp inn i boksen. 10. Spiss (7) scorer med heading.",
    coachingPoints: [],
    variations: [],
    imageUrl: "/book-illustrations/manc-academy/p123-manc-app-04-switch-attack-overlap-full-back-behind.webp",
    source: "manc",
    sourceRef:
      "Pep Guardiolas Manchester City-trening, Yokohama International Stadium, Japan, 26. juli 2019 (SoccerTutor Vol. 2, s. 121)",
  },
];

export const mancAttackingPositionalExercises: ExerciseData[] = baseMancAttackingPositionalExercises;

