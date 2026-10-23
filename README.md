# Thomas Yeoh

Personal About Me site, built with Next.js (App Router) and TypeScript. The page is a fully static export,
live on GitHub Pages at **https://tyeoh9.github.io/about-me/**. It also still deploys on Vercel with no env vars.

```sh
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static export to out/, served at /
```

Page copy and links live in `src/content/profile.ts`. See `AGENTS.md` for conventions.

## GitHub Pages

`.github/workflows/pages.yml` builds and deploys on every push to `main` (or run it by hand from the
Actions tab). The repo's Pages source must be set to **GitHub Actions** (Settings → Pages).

Pages serves the site under `/about-me`, so that build sets `PAGES_BASE_PATH`. To preview it locally:

```sh
PAGES_BASE_PATH=/about-me pnpm build
mkdir -p .preview && rm -rf .preview/about-me && cp -R out .preview/about-me
python3 -m http.server 4000 --directory .preview   # http://localhost:4000/about-me/
```
