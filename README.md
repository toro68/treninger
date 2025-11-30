# Treningsplanlegger

Planleggingsverktøy for fotballøkter bygget på Next.js App Router og Zustand. Prosjektet kombinerer klubbens egne øvelser med importerte biblioteker (UEFA, DBU, tiim.no m.fl.) og lar trenerteamet filtrere, favorisere og sette sammen økter med tilpasset utstyrs- og kampforberedelse.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne http://localhost:3000 for treningssiden. `/kamp` viser kampforberedelser og taktikk, `/ordliste` beskriver begreper.

### Kjør kommandoer

Før du åpner PR eller deler bygget, kjør alltid:

```bash
npm run lint   # ESLint med Next.js-config
npm run build  # Prod-bundle for verifisering
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

## Struktur

```
src/
  app/          // Next.js routes
  components/   // UI-moduler (ExerciseManager, SessionTimeline, osv.)
  data/         // Øvelses- og kampdata
  store/        // Zustand (sessionStore)
  hooks/        // Delte hooks
```

## Videre arbeid

- Legg til tester for filterlogikk og highlight-flow.
- Dokumenter prosess for å importere nye datakilder (`src/data/*`).
+### Prod-sjekk
+
+Kjør `npm run prod:sjekk` for en full pipeline (lint uten scripts, build og tester) før endringer deles.
