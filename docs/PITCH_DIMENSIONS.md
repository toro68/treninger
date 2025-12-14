# Banedimensjoner (referanse)

Denne filen er en felles referanse for SVG-maler og geometri i prosjektet.

## Oversikt

- **Enhet:** meter (m)
- **Standard brukt i koden:** 105 × 68 m (UEFA/FIFA «typisk» full bane)
- **Tillatte intervaller (fra figuren):**
  - Lengde: 90–120 m
  - Bredde: 45–90 m

> Merk: SVG-malene i appen bruker standardmålene over for å få konsistente proporsjoner.

## Nøkkelmål (standard)

| Element | Symbol/variabel | Mål |
| --- | --- | ---: |
| Banelengde | `fullLength` | 105 |
| Banebredde | `fullWidth` | 68 |
| 16-meter (straffefelt) dybde | `penaltyAreaDepth` | 16.5 |
| 16-meter bredde | `penaltyAreaWidth` | 40.32 |
| 5-meter (målfelt) dybde | `goalAreaDepth` | 5.5 |
| 5-meter bredde | `goalAreaWidth` | 18.32 |
| Målbredde | `goalWidth` | 7.32 |
| Mål (høyde) | (ikke brukt i top-down) | 2.44 |
| Straffesparkpunkt | `penaltySpot` | 11 |
| Midtsirkel radius | `centerCircleRadius` | 9.15 |
| Mål-dybde (runoff for SVG) | `goalDepth` | 2 |

## Straffesparkbuen (9,15 m)

I top-down-tegning av straffefeltet er buen den delen av sirkelen (radius 9,15 m rundt straffemerket) som ligger **utenfor** 16-meteren.

Gitt:

- Radius: $r = 9.15$
- Avstand fra straffemerke til 16m-linja: $dx = 16.5 - 11 = 5.5$

Skjæringspunktets forskyvning på tvers av banen (halv kordelengde) er:

$$dy = \sqrt{r^2 - dx^2} = \sqrt{9.15^2 - 5.5^2} \approx 7.31$$

Dette brukes til å tegne buen som en horisontal «korde» på 16m-linja:

- Start: $(x = spotX - dy,\ y = 16mY)$
- Slutt: $(x = spotX + dy,\ y = 16mY)$

## Hvor i koden

- Standardmålene er definert i `LANDSCAPE_PITCH_M` i `src/components/diagram/landscapePitchGeometry.ts`.
- SVG-malene for bane bruker disse målene for å sikre riktige proporsjoner uavhengig av viewBox/størrelse.
