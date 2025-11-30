# Kampseksjon TODO

1. Gjenbrukbar topp/navigasjon
   - Lag `AppShell` med header/nav og bruk på `/` og `/kamp`.
   - Inkluder støtte for aktiv fanemarkering.

2. Strukturer match-data
   - Flytt fokus- og sjekklister til `src/data/match-prep.ts`.
   - Tagg elementer med fase (`pre`, `in`, `post`) og rolle.

3. Forbedre MatchPrep UI
   - Del inn i kollapserbare kort per fase med egen huskeliste.
   - Bevar avhuking i `localStorage` per kort.

4. Navigasjon i kampseksjon
   - Legg sticky delekart/ankerlenker på toppen.
   - Scrollspy eller aktiv markering når seksjoner er i view.

5. Videre steg
   - Vurder liten Zustand-store dersom flere komponenter deler kampdata.
   - Dokumenter manual sjekkliste (f.eks. Chrome test) i README.
