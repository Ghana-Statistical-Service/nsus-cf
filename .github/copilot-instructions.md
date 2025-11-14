Repository: NSUs-CF (Next.js + Tailwind)

Quick context
- This is a small Next.js (App Router) frontend located at the repo root. Entry points: `app/layout.tsx` and `app/page.tsx`.
- Styling is done with Tailwind v4 configured in `tailwind.conf.ts` and `app/globals.css`.
- UI is component-driven inside `components/` (notably `ConverterForm.tsx`, `Navbar.tsx`, `Footer.tsx`).
- Business logic is client-side in `ConverterForm.tsx` using a simple in-memory conversion table (`CONVERSIONS`) — data is currently hard-coded and typed with TypeScript.

What to do first (for any code change)
- Run the dev server locally to validate UI changes: `npm run dev` (uses Next 16).
- Keep changes minimal and type safe. Prefer editing `components/*` and `app/*` for UI work.
- When adding new data, prefer creating a typed JSON/TS module (for example `data/conversions.ts`) and import it into `ConverterForm.tsx` instead of enlarging the component file.

Architecture & conventions the assistant should follow
- App Router (app/*): pages are React Server Components by default; files using hooks or client-only logic must include "use client" at the top (see `components/ConverterForm.tsx`).
- TypeScript is enabled. Keep types local to files when small, and export shared types to `types/` only when reused.
- Tailwind classes are used directly in JSX. Reuse the `selectBase` style pattern from `ConverterForm.tsx` when creating consistent form controls.
- Color tokens are defined in `tailwind.conf.ts` as `brandPurple`, `brandTeal`, `brandPink`. Use these token names in classNames (e.g., `bg-brandPurple`) rather than hex literals.

Patterns & examples
- Client-only form: `components/ConverterForm.tsx` shows the pattern: "use client" + local state with React hooks + a small in-file conversion table. If converting to server-backed data, keep the same UI shape and fetch via Next.js server actions or API routes.
- Small, focused components: `Navbar.tsx` and `Footer.tsx` are pure presentational components returning JSX without external side effects. Follow this separation of concerns.
- CSS and accessibility: form inputs use clear label elements and Tailwind focus styles; copy this structure for new forms.

Build/test/debug workflows
- Start dev server: `npm run dev` (port 3000). Build for production: `npm run build` then `npm start` to run the production build.
- Lint: `npm run lint` (uses installed ESLint). There are no test scripts configured — add minimal tests only if you add significant logic.
- If you change TypeScript types, run `tsc --noEmit` (or rely on your editor) to catch type errors. The project uses TypeScript 5.

Integration points & external deps
- Dependencies come from `package.json`: Next 16, React 19, Tailwind v4. No backend or external API integrations exist in this repo currently.
- Images should be added under `public/` and consumed with `next/image` (see `Navbar.tsx`).

When you add features
- Add new constants/data under a `data/` folder and export typed constants. Example: `export const CONVERSIONS: Conversion[] = [...]` and import into `ConverterForm.tsx`.
- For persistent storage or larger datasets, create Next.js API routes under `app/api/` (or `/api` for pages router compatibility) and fetch from the client using `fetch`.

Files to inspect for context when editing
- `app/layout.tsx` — global HTML and body settings, `globals.css` import
- `app/page.tsx` — main page composition; contains layout and `ConverterForm` usage
- `components/ConverterForm.tsx` — primary business logic and UI patterns
- `tailwind.conf.ts` & `app/globals.css` — styling tokens and global styles
- `package.json` — scripts and dependency versions

Edge-cases and constraints discovered
- The conversion table is in-memory and limited — missing combinations display a user-facing message. Any batch updates to conversion data should validate duplicates and types.
- The Next config (`next.config.ts`) is currently empty — avoid relying on non-default Next.js features unless you update configuration and test builds.

If you are an AI assistant proposing code changes
- Provide small, focused diffs. Example requests you can fulfill without human review: add a typed `data/conversions.ts`, move the `CONVERSIONS` constant there, or improve form validation.
- For UI/UX changes (colors, fonts, layout), include screenshots or short descriptions of visual differences in the PR description.

Questions to ask the maintainer if unsure
- Where will the official conversion data come from (CSV, API, manual entry)?
- Do you want conversion data persisted (API + DB) or maintained as a static data module?

Contact points
- This repository has GSS branding references and appears maintained by DST-ADU — include that in PR descriptions when proposing data changes.

End of file
