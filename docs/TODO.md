# TODO

## Generelt

- [ ] Gjennomgå `SessionTimeline` (deling/print): tydeligere feilhåndtering og bedre isolering av DOM-logikk.
- [ ] Filter-UX: vis filtre selv med 0 treff og unngå at highlight-lås på kilde blir «sticky» uten vei tilbake.
- [ ] Utstyrsliste: ikke tving «always needed» hvis planen ikke bruker det, og dedupliser aliaser konsekvent.

## Kampseksjon

### Struktur

- [ ] Støtte for aktiv fanemarkering i toppnavigasjon.

### Datafiler (mindre hardkoding)

- [ ] Flytt data for hjørnespark/corner til `src/data/kamp/cornerOrganization.ts`.
- [ ] Tagg elementer med `phase: "pre" | "in" | "post"` og evt. rolle.

### UI og navigasjon

- [ ] Del `MatchPrep` i kollapsbare kort per fase og bevar avhuking i `localStorage`.
- [ ] Legg til sticky undernavigasjon (ankerlenker) i kampseksjonen.
- [ ] Vurder scrollspy/aktiv seksjonmarkering ved scrolling.

### Opprydding

- [ ] Se etter overlapp mellom `ZonalDefense` og `TeamOrganization` og fjern/konfomer til én kilde.
