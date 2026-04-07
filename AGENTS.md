# Repository Guidelines

## Formål

Denne repoen er en Next.js 16 App Router-app for planlegging av fotballtreninger. Bevar norsk språk, fotballterminologi og etablerte treningsbegreper med mindre oppgaven eksplisitt krever noe annet.

## Arbeidsregler

- Gjør den minste endringen som faktisk løser oppgaven.
- Unngå refaktorering utenfor scope.
- Ikke gi nytt navn til persistede felt, øvelses-ID-er, kategorier eller temaer uten eksplisitt behov.
- Bevar bakoverkompatibilitet for localStorage-data. Dette er en hard regel.
- Gjenbruk eksisterende typer, helpers og store-logikk før du introduserer nye abstraksjoner.
- Hold domenelogikk ute av UI-komponenter når det er praktisk.
- Bevar norsk UI-tekst og eksisterende fotballfaglig terminologi.

## Kommandoer

- Kjør kommandoer fra repo-roten, altså mappen over `treninger/`.
- Rotkommandoer delegerer inn i appen via `npm --prefix treninger ...`.
- `npm run dev` starter utviklingsserver på port `4000`.
- `npm run lint:safe` er foretrukket lint-kommando når `scripts/` ikke er relevant.
- `npm test` kjører Vitest.
- `npm run prod:sjekk` er standard full verifikasjon før levering.

## Struktur

- Appkode ligger i `treninger/src/`.
- Delt Zustand-state ligger hovedsakelig i `treninger/src/store/sessionStore.ts`.
- Øvelsesdata og aggregasjon ligger i `treninger/src/data/`.
- Dokumentasjon for kategorier og banemål ligger i `treninger/docs/`.

## Domenegrenser

- Ikke bland `category` og `theme`.
- `station` er en kategori i øktstruktur, ikke et treningstema.
- Ikke endre øvelseskoder eller generering av dem uten eksplisitt krav.
- Behandle importerte øvelsesdatasett som strukturert innhold, ikke som kandidater for tilfeldig omformattering.

## Høyrisikoområder

- `treninger/src/store/sessionStore.ts`
- filtrering, hydrering og serialisering
- player count-logikk
- station-seksjoner og rotasjon
- timeline-rekkefølge
- custom exercises, overrides og saved sessions
- aggregering i `treninger/src/data/exercises.ts`

Ved endringer her: hold diffen liten, verifiser bakoverkompatibilitet og legg til eller oppdater tester når logikken endres.

## Test og verifikasjon

- Repoen har Vitest og Testing Library; ikke anta at tester mangler.
- Endrer du filtrering, hydrering, timeline eller annen store-logikk, skal det normalt følges av relevante tester.
- Før du er ferdig, kjør `npm run prod:sjekk` når endringen påvirker appkode eller oppførsel.

## Referanser før endring

- Les `treninger/docs/EXERCISE_CATEGORIES.md` ved endringer i kategorisering.
- Les `treninger/docs/PITCH_DIMENSIONS.md` ved endringer i baner, SVG eller diagrammer.
- Ved endringer i banemaler eller linjer, hold deg til `LANDSCAPE_PITCH_M` i `treninger/src/components/diagram/landscapePitchGeometry.ts`.
- Les `treninger/src/store/sessionStore.ts` først ved endringer i persistens, hydrering eller planlogikk.

## UI og stil

- Følg eksisterende Next.js-, React- og Tailwind-mønstre i repoen.
- Ikke innfør engelsk UI-tekst i norske flater.
- Ikke bruk emojier i overskrifter, tabs eller navigasjon.
