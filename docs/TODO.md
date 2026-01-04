# TODO

## Generelt

- [ ] Oppdater metadata i `src/app/layout.tsx` (produktnavn, beskrivelse).
- [ ] Vurder å utvide `README.md` med korte rutiner for `npm run lint`, `npm run build` og `npm run test`.
- [ ] Gjennomgå `SessionTimeline` (deling/print): tydeligere feilhåndtering og bedre isolering av DOM-logikk.
- [ ] Sikre robust ID-generering i `ExerciseManager` (fallback dersom `crypto.randomUUID()` ikke finnes).
- [ ] Filter-UX: vis filtre selv med 0 treff og unngå at highlight-lås på kilde blir «sticky» uten vei tilbake.
- [ ] Utstyrsliste: ikke tving «always needed» hvis planen ikke bruker det, og dedupliser aliaser konsekvent.

## Kampseksjon

### Struktur

- [ ] Lag en gjenbrukbar `AppShell` (header/nav) og bruk den på `/` og `/kamp`.
- [ ] Støtte for aktiv fanemarkering i toppnavigasjon.

### Datafiler (mindre hardkoding)

- [ ] Flytt fokus- og sjekklister fra `MatchPrep` til `src/data/kamp/matchPrep.ts`.
- [ ] Flytt data for lagorganisering til `src/data/kamp/teamOrganization.ts`.
- [ ] Flytt data for hjørnespark/corner til `src/data/kamp/cornerOrganization.ts`.
- [ ] Tagg elementer med `phase: "pre" | "in" | "post"` og evt. rolle.

### UI og navigasjon

- [ ] Del `MatchPrep` i kollapsbare kort per fase og bevar avhuking i `localStorage`.
- [ ] Legg til sticky undernavigasjon (ankerlenker) i kampseksjonen.
- [ ] Vurder scrollspy/aktiv seksjonmarkering ved scrolling.

### Opprydding

- [ ] Se etter overlapp mellom `ZonalDefense` og `TeamOrganization` og fjern/konfomer til én kilde.
