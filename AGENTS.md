# AGENTS.md

Conventions for AI coding agents working in **fredrin-fde-application**. This file is the
canonical entry point under the [AGENTS.md](https://agents.md) standard.

## Project

Thomas Yeoh's personal website: one statically rendered About Me page at `/`, built with
Next.js (App Router) and TypeScript. It has no database, no API routes and no required env
vars. It is meant to deploy on Vercel (a build on Vercel, a preview per branch, production on merge).

- `src/content/profile.ts`: every word and link on the page, typed. Change copy here, not in components.
- `src/app/page.tsx`, `src/app/layout.tsx`: the page and its metadata (title, description, Open Graph).
- `src/components/`: `Chapter`, `Logos` and `RichText` (inline links), plus `figures/`, one component per chapter diagram.
- `src/app/globals.css`: all styling, with design tokens on `:root`.
- `public/logos/`: local copies of the affiliation SVGs (Apple, UC Berkeley, UC Irvine).
- `scripts/screenshot.mjs`: dependency-free full-page screenshots through headless Chrome.

## Commands

Use `pnpm` (the version is pinned in `package.json` under `packageManager`; `corepack enable` provides it) and Node 20.9+.

```sh
pnpm install          # install deps
pnpm dev              # dev server on http://localhost:3000
pnpm build            # production build; runs TypeScript. "/" must show as ○ (Static)
pnpm lint             # ESLint (next/core-web-vitals + typescript)
pnpm exec tsc --noEmit  # typecheck only
```

There is no test suite. To see the page working, use the `verify-app` skill
(`.claude/skills/verify-app/SKILL.md`, or `.agents/skills/verify-app/SKILL.md` for Codex):
it launches the dev server and takes 1280px and 390px screenshots.

## Conventions

- **The design is approved.** Don't add italics for emphasis, accent-colored words, stat cards,
  ALL-CAPS or monospace labels, eyebrow labels, gradients, shadows, "→" on links or animations.
  The only colors are the tokens in `globals.css`. iMessage blue and the muted "blocked" red appear
  only inside figures.
- **Type:** Instrument Sans only, loaded through `next/font/google` in `layout.tsx` at weights 400, 500 and 600.
- **Figures are inline SVG/HTML, never raster.** Labels are at least 12px CSS and must stay
  readable at 390px. Below 480px the Apple and Zoofi diagrams switch to a vertical layout.
- **Links:** external links open in a new tab with `rel="noopener noreferrer"` (`RichText`/`TextLink`
  does this for any `http(s)` href). A span with no `href` renders as plain text (Zoofi AI has no public URL).
- **Never** add a phone number, and never mention Fredrin on the page.
- Logos are local files rendered as CSS masks over one warm gray (`--logo`). Don't hotlink them.
- Keep `/` static: no request-time APIs (`cookies()`, `headers()`, uncached fetches) on the page.
- `--soft` is `#6F6C65`, not the mockup's `#77746D`: the darker value is needed to pass AA on the figure plate.
- Accessibility: there is one `h1` (the name), each section has an `h2`, links get a visible
  `:focus-visible` outline, logos and figures have aria labels, and body text meets AA contrast.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
