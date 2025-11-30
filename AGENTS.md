# Repository Guidelines

## Project Structure & Module Organization
- `src/app` hosts the Next.js App Router entrypoint (`layout.tsx`, `page.tsx`) plus global styles in `globals.css`.
- UI building blocks live in `src/components`; keep each component self-contained with colocated hooks or utility files only when they are not reused elsewhere.
- Shared state resides in `src/store` (Zustand), static exercise data in `src/data`, and reusable client hooks in `src/hooks`.
- Public assets (images, icons, fonts) belong in `public/`; avoid importing from `src` to prevent leaking build-only code to the client.

## Build, Test, and Development Commands
- `npm run dev`: launches the Next.js dev server with hot reload on `http://localhost:3000`.
- `npm run build`: creates the production bundle; run before opening PRs that adjust config or routing.
- `npm run start`: serves the production build locally for smoke tests.
- `npm run lint`: executes ESLint with the Next.js shareable config; required for all submissions.

## Coding Style & Naming Conventions
- TypeScript, React 19, and Next.js 16 are mandatory; keep files in `.tsx` unless plain utilities.
- Use 2-space indentation, single quotes in JSON/TS config where supported, and double quotes in JSX/TSX string props for consistency with the existing codebase.
- Component files use `PascalCase` (e.g., `ExerciseManager.tsx`); hooks use the `useFoo` prefix; Zustand stores end with `Store.ts`.
- Prefer Tailwind CSS utility classes inside JSX; do not reintroduce CSS Modules unless scoped styles are required.
- Run `npm run lint` after significant changes; fix warnings rather than suppressing them.
- **Emojier:** Ikke bruk emojier i overskrifter, tab-labels eller navigasjonselementer. Bruk heller enkle, funksjonelle symboler:
  - `✓` / `✗` — riktig/galt (f.eks. "✓ Oppmuntre til å prøve", "✗ Kritisér ikke balltap")
  - `→` / `←` — retning, fører til (f.eks. "Høyt → Lavt press")
  - `↑` / `↓` — opp/ned, øk/reduser (f.eks. "↑ Push-out", "↓ Fall tilbake")
  - `+` / `−` — vis/skjul, ekspander/kollaps
  - `•` — listepunkt
  - `»` — fortsetter, les mer
  - `×` — lukk, fjern

## Testing Guidelines
- Automated tests are currently absent; add Playwright UI tests or React Testing Library component tests when extending critical flows.
- Name test files `*.test.tsx` next to the unit under test and avoid snapshot-only assertions.
- Always include at least one manual verification note in the PR (e.g., "Verified session builder drag/drop in Chrome").

## Commit & Pull Request Guidelines
- Follow the existing history: one-line, capitalized summaries in the imperative mood (e.g., `Oppdaterer øvelsesfilter`).
- Keep commits scoped to a single concern; split UI, data, and tooling changes when practical.
- PRs must describe the motivation, list notable changes, reference related issues, and attach screenshots or screen recordings for UI updates.
- Ensure lint/build pass locally before requesting review and mention any follow-up tasks explicitly.

## Configuration & Data Safety
- Store environment-specific values in `.env.local` (never commit secrets). Document any required keys in README updates.
- Exercise data is user-facing; validate copy changes with coaching staff before deployment.
- When adding dependencies, prefer lightweight, tree-shakeable packages to keep the Next.js bundle performant.
