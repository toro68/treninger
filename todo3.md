# Kampseksjon Forbedringer (todo3.md)

## Analyse av nåværende struktur

Kampsiden (`/kamp`) har **9 komponenter** som rendres i rekkefølge:
1. `MatchPrep` - Fokuspunkter og sjekkliste
2. `MindsetSection` - Mentaltrening og tankesett
3. `ZonalDefense` - NFF Soneforsvar (585 linjer!)
4. `FormasjonerSeksjon` - UEFA-formasjoner
5. `UEFASeksjon` - UEFA A-analyser
6. `CoachingTips` - Trenertips
7. `Roles` - Roller per posisjon
8. `TeamOrganization` - Lagorganisering
9. `CornerOrganization` - Corner-organisering

### Hovedproblemer

| Problem | Alvorlighet | Beskrivelse |
|---------|-------------|-------------|
| **Ingen navigasjon** | 🔴 Høy | Lang side uten ankerlenker - vanskelig å finne riktig seksjon |
| **Duplisert innhold** | 🟡 Medium | `ZonalDefense` og `TeamOrganization` overlapper (begge har soneforsvar-roller) |
| **Hardkodet data** | 🟡 Medium | All data ligger i komponentene, ikke i datafiler |
| **Ingen fase-inndeling** | 🟡 Medium | Før-kamp, under-kamp, etter-kamp er ikke tydelig |
| **Store komponenter** | 🟢 Lav | ZonalDefense er 585 linjer, kan deles opp |

---

## Anbefalte forbedringer

### 1. Sticky navigasjon med ankerlenker (Høy prioritet)
- [ ] Legg til `id` på hver seksjon (`#forberedelse`, `#forsvar`, `#angrep`, etc.)
- [ ] Lag sticky subnavigasjon under hovedheader
- [ ] Vurder scrollspy for å markere aktiv seksjon
- [ ] Mobilvennlig: Horisontal scroll på toppmenyen

### 2. Reorganiser innhold etter fase (Høy prioritet)
- [ ] **Før kamp**: MatchPrep, MindsetSection, Formasjoner
- [ ] **Under kamp**: Roller, Soneforsvar, Corner
- [ ] **Etter kamp**: CoachingTips (evaluering)
- [ ] Grupper visuelt med overskrifter

### 3. Fjern duplikater (Medium prioritet)
- [ ] Slå sammen `ZonalDefense` og `TeamOrganization`
  - Begge har "Førsteforsvarer/Andreforsvarer/Tredjeforsvarer"
  - Begge har "Leding av ballfører"
- [ ] Behold `ZonalDefense` (mest komplett), fjern overlappende fra `TeamOrganization`

### 4. Flytt data til datafiler (Medium prioritet)
- [ ] `src/data/kamp/focusItems.ts` - fra MatchPrep
- [ ] `src/data/kamp/coachingTips.ts` - fra CoachingTips
- [ ] `src/data/kamp/positions.ts` - fra Roles
- [ ] `src/data/kamp/cornerSetup.ts` - fra CornerOrganization
- [ ] Tagg data med `fase: "pre" | "in" | "post"`

### 5. Huskeliste-funksjonalitet (Medium prioritet)
- [ ] Bevar avhuking i `localStorage` per kampdag
- [ ] "Nullstill sjekkliste"-knapp
- [ ] Gruppér sjekkliste etter fase

### 6. Splitt store komponenter (Lav prioritet)
- [ ] Del `ZonalDefense` (585 linjer) i underkomponenter:
  - `ZonalRoles.tsx`
  - `ZonalLeding.tsx`
  - `ZonalKompakt.tsx`
  - etc.
- [ ] Bruk lazy loading for tunge seksjoner

---

## Quick wins (kan gjøres først)

1. **Legg til id-er for ankerlenker** (~5 min)
   ```tsx
   <section id="forberedelse">
     <MatchPrep />
   </section>
   ```

2. **Legg til enkel sticky navigasjon** (~15 min)
   ```tsx
   <nav className="sticky top-[header-height] bg-white border-b">
     <a href="#forberedelse">Forberedelse</a>
     <a href="#forsvar">Forsvar</a>
     ...
   </nav>
   ```

3. **Grupper seksjoner visuelt** (~10 min)
   ```tsx
   <div>
     <h2>Før kamp</h2>
     <MatchPrep />
     <MindsetSection />
   </div>
   ```

---

## Anbefalt rekkefølge

1. ✅ Sticky navigasjon med ankerlenker (umiddelbar forbedring)
2. ✅ Reorganiser etter fase (før/under/etter)
3. 🔄 Fjern duplikater mellom ZonalDefense og TeamOrganization
4. 🔄 Flytt data til datafiler
5. ⏳ Splitt ZonalDefense i underkomponenter
