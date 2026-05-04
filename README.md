# Treningsplanlegger

Planleggingsverktøy for fotballøkter bygget på Next.js App Router og Zustand. Prosjektet kombinerer klubbens egne øvelser med importerte biblioteker (UEFA, DBU, tiim.no m.fl.) og lar trenerteamet filtrere, favorisere og sette sammen økter med tilpasset utstyrs- og kampforberedelse.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne <http://localhost:4000> for treningssiden. `/kamp` viser kampforberedelser og taktikk, `/ordliste` beskriver begreper.

### Kjør kommandoer

Før du åpner PR eller deler bygget, kjør alltid:

```bash
npm run prod:sjekk  # lint uten scripts, prod-build og Vitest
```

## Nøkkelfunksjoner

- **Øvelsesbibliotek:** Alle øvelser ligger i `src/data/`. Custom‑øvelser som legges til via UI persisteres i Zustand‐store og hydreres automatisk.
- **Filtre og søk:** `src/components/Filters.tsx` styrer tema-, kilde- og spillerantallsfiltre. Tema- og kildevalg påvirker alle `ExerciseList` forekomster.
- **Øktplan:** `SessionTimeline` grupperer valgte øvelser i faste bolker, håndterer drag & drop, utskrift og deling.
- **Kampverktøy:** MatchPrep, UEFASeksjon og FormasjonerSeksjon bruker data fra `src/data/uefa*`.

## Tilgjengelige skript

| Kommando | Beskrivelse |
| --- | --- |
| `npm run dev` | Lokal utvikling med hot reload |
| `npm run build` | Prod-bundle |
| `npm run start` | Server prod-bundle |
| `npm run lint` | ESLint med Next.js config |
| `npm run lint:safe` | ESLint uten ignored-file støy fra scripts |
| `npm test` | Vitest |
| `npm run prod:sjekk` | Full verifisering før deling |

## Struktur

## Dokumentasjon

- Banedimensjoner (SVG/diagrammer): `docs/PITCH_DIMENSIONS.md`
- Øvelsesdata (kategorier, temaer, kilder og koder): `docs/EXERCISE_CATEGORIES.md`

```text
src/
  app/          // Next.js routes
  components/   // UI-moduler (ExerciseManager, SessionTimeline, osv.)
  data/         // Øvelses- og kampdata
  store/        // Zustand (sessionStore)
  hooks/        // Delte hooks
```

## Videre arbeid

- Hold tester for filtrering, hydrering og deling oppdatert når store-logikk endres.
- Dokumenter prosess for å importere nye datakilder (`src/data/*`).

### Prod-sjekk

Kjør `npm run prod:sjekk` for en full pipeline (lint uten scripts, build og tester) før endringer deles.
