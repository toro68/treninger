Observations

  - README.md:1 describes the project correctly but omits lint/build
    requirements already noted in AGENTS.md. Consider adding a short
    “Kjør kommandoer” section linking to npm run lint/npm run build
    since those are mandatory before PRs.
  - src/app/layout.tsx:4-6 still carries the default “Create Next App”
    metadata, so browsers and link previews don’t reflect the real
    product name.
  - src/store/sessionStore.ts:120-130 writes entire exercise objects
    into persisted state. Because Zustand persistence happens in
    localStorage, that can easily exceed the 5–10 MB limit once
    custom exercises or large data sets are added. Persisting derived
    exercise libraries is redundant since they’re reconstructible from
    customExercises.
  - src/components/SessionTimeline.tsx:147-171 calls window.open for
    printing and assumes navigator.clipboard exists. No guards for
    server rendering or permission failures beyond a generic error flag;
    printing also injects large inline HTML via document.write, which is
    error-prone and impossible to lint/test.
  - src/components/ExerciseManager.tsx:67-123 creates IDs client-side
    via crypto.randomUUID() without a polyfill. In Safari < 15.4 or
    older Android WebViews this API throws, breaking custom exercise
    creation.
  - src/components/Filters.tsx:31-102 hard codes visual classes per
    source but doesn’t ensure that sourceCounts returns an entry for
    each config; when counts are zero buttons disappear, so users can’t
    proactively re-enable a source with no current exercises (e.g.,
    after future imports). Filter state also drifts when highlight logic
    forces sourceFilter="uefa" without a way to revert automatically.
  - src/components/EquipmentList.tsx:52-63 always adds ALWAYS_NEEDED
    items, even when they aren’t part of any exercise, so the checklist
    may include irrelevant equipment (e.g., småmål for a possession-
    only session).
  - The repo has no automated tests, lint rules are strict per AGENTS,
    but there’s no guardrail; consider bootstrapping React Testing
    Library around filterExercises or EquipmentList.

  Recommended next steps

  - Update metadata in src/app/layout.tsx to match the product branding,
    and extend README with lint/build instructions already enforced
    by policy.
  - Refactor sessionStore persistence: drop exerciseLibrary from
    persisted state, store minimal primitives, and guard against
    localStorage quota errors.
  - Harden SessionTimeline share/print logic by refactoring into utility
    helpers and ensure SSR guards (typeof window !== "undefined") before
    using DOM APIs.
  - Replace direct crypto.randomUUID() usage with a fallback (e.g.,
    self.crypto?.randomUUID?.() ?? nanoid()), or import a tiny uuid
    helper to maintain cross-browser compatibility.
  - Review filter UX: keep filters visible even when count is zero and
    allow highlight-induced source filters to reset after a timeout or
    when a user interacts elsewhere.
  - Expand equipment tracking to dedupe aliases properly and don’t
    force baseline equipment unless the plan actually uses it; consider
    persisting checklist progress per session.

## Forbedringer for Kamp-seksjonen

Basert på analysen av `/src/app/kamp`-seksjonen er det identifisert et behov for refaktorering for å redusere hardkodet innhold og øke vedlikeholdbarheten.

- [ ] **Datastruktur for Kampforberedelser:**
  - [ ] Opprett en ny datafil i `src/data/kamp/matchPrep.ts`.
  - [ ] Definer en struktur (type/interface) for fokuspunkter og sjekklister.
  - [ ] Flytt de hardkodede `focusItems` og `checklistItems` fra `src/components/MatchPrep.tsx` til den nye datafilen.

- [ ] **Refaktorer `MatchPrep.tsx`:**
  - [ ] Endre komponenten til å importere og rendre data fra `src/data/kamp/matchPrep.ts`.

- [ ] **Datastruktur for Lagorganisering:**
  - [ ] Opprett en ny datafil i `src/data/kamp/teamOrganization.ts`.
  - [ ] Flytt de hardkodede prinsippene for soneforsvar og organisering fra `src/components/TeamOrganization.tsx` til den nye datafilen.

- [ ] **Refaktorer `TeamOrganization.tsx`:**
  - [ ] Endre komponenten til å importere og rendre data fra `src/data/kamp/teamOrganization.ts`.

- [ ] **Datastruktur for Hjørnespark:**
  - [ ] Opprett en ny datafil i `src/data/kamp/cornerOrganization.ts`.
  - [ ] Flytt de hardkodede dataene fra `src/components/CornerOrganization.tsx` til den nye datafilen.

- [ ] **Refaktorer `CornerOrganization.tsx`:**
  - [ ] Endre komponenten til å importere og rendre data fra `src/data/kamp/cornerOrganization.ts`.

- [ ] **Opprydding:**
  - [ ] Etter refaktorering, konsolider og fjern overflødig kode og duplisert innhold.
