---
name: verify-app
description: Launch Thomas Yeoh's About Me site locally, health-check it, drive it in headless Chrome at desktop (1280px) and phone (390px) widths, and save screenshots as evidence. Use whenever a change needs to be seen working in the real app: "verify it works", "screenshot the page", "run the site", "check the page on mobile", or before finishing a ticket that touches src/, public/ or styles.
---

# verify-app

Proves the site works by running the real dev server and looking at `/`, not by trusting a build.
The live site is the GitHub Pages static export at https://tyeoh9.github.io/about-me/; when a change
touches the build, base path or asset URLs, also run **Static export** (section 6).
Everything below runs from the repo root. Evidence goes to `.fredrin/tmp/verify-app/<timestamp>/`
(git-ignored); use any git-ignored folder if `.fredrin/` doesn't exist.

Agent shells often don't keep variables between commands, so Launch saves `OUT` and `PORT` to
`.fredrin/tmp/verify-app/current.env`, and every later block starts by sourcing it.

## 1. Doctor (read-only)

Run these and stop on a failure. They change nothing.

```sh
node -v                      # need >= 20.9 (Next 16)
pnpm -v || corepack pnpm -v  # pnpm, pinned in package.json "packageManager"
PORT=${PORT:-3000}
lsof -nP -iTCP:$PORT -sTCP:LISTEN && echo "port $PORT busy: pick another PORT" || echo "port $PORT free"
test -d node_modules && echo "deps installed" || echo "deps missing: run pnpm install"
test -f .next/BUILD_ID && echo "build output present ($(cat .next/BUILD_ID))" || echo "no production build yet (fine for dev)"
ls "/Applications/Google Chrome.app" >/dev/null 2>&1 || command -v google-chrome chromium || echo "no Chrome: set CHROME_PATH"
```

If `pnpm` is missing: `corepack enable` (or `corepack enable --install-directory ~/.local/bin pnpm`
when the global bin dir isn't writable, then add it to `PATH`).

## 2. Launch

From a clean checkout:

```sh
pnpm install
OUT=.fredrin/tmp/verify-app/$(date +%Y%m%d-%H%M%S); mkdir -p "$OUT"
PORT=${PORT:-3000}
printf 'OUT=%s\nPORT=%s\n' "$OUT" "$PORT" > .fredrin/tmp/verify-app/current.env
nohup pnpm dev --port "$PORT" > "$OUT/dev.log" 2>&1 &
echo $! > "$OUT/dev.pid"     # remember exactly what we started
```

**Ready check:** poll for up to 60s until `/` returns 200 and contains "Thomas Yeoh":

```sh
. .fredrin/tmp/verify-app/current.env
for i in $(seq 1 60); do
  code=$(curl -s -o "$OUT/index.html" -w '%{http_code}' "http://localhost:$PORT/")
  [ "$code" = 200 ] && grep -q "Thomas Yeoh" "$OUT/index.html" && echo READY && break
  sleep 1
done
```

Not ready after 60s: read `$OUT/dev.log`, then run cleanup.

## 3. Drive

The site has one route, `/`. Take full-page screenshots at desktop and phone widths:

```sh
. .fredrin/tmp/verify-app/current.env
node --experimental-websocket scripts/screenshot.mjs "http://localhost:$PORT/" "$OUT" 1280 390@3
# -> $OUT/1280.png (2x) and $OUT/390.png (3x); prints {file,width,height,scale} per shot
```

(Use plain `node` on Node 22+. The script is dependency-free; it drives headless Chrome over CDP,
gives each step 30s before failing, and kills its Chrome on exit or Ctrl-C.)

Next serves the page as essentially one line of HTML, so count matches with `grep -o … | wc -l`,
never `grep -c` (that counts lines and always prints 0 or 1).

Then check the HTML the server returned (`$OUT/index.html`) for each feature's asserts in
`features/`. Look at the PNGs yourself: read them and compare against the feature files'
"Looks right when" notes. Key selectors:

| Feature | Selector |
|---|---|
| Header / single h1 | `header.intro h1.name`, `.role` |
| Opening statement | `.statement` |
| Affiliation logos | `ul.logos .logo[role=img][aria-label]` |
| Chapters | `section.chapter#apple-maps`, `#zoofi`, `#clearo`, `#validate-llm` |
| Chapter figures | `figure.plate[data-figure=apple-cache\|zoofi-onboarding\|clearo-thread\|validate-llm]` |
| Along the way | `section.split dl.along` |
| Contact links | `footer.hello .contacts a` |

## 4. Evidence

Write `$OUT/REPORT.md` with:
- **Did:** the commands run (install, dev port, URL, widths).
- **State:** HTTP status, whether "Thomas Yeoh" was present, the results of each feature assert (pass/fail), and the page heights from the screenshot output.
- **Screenshots:** paths to `1280.png` and `390.png`.
- **Side effects:** none expected. The site makes no requests beyond its own assets and Google Fonts at build time.

In a Fredrin ticket, upload the shots: `./.fredrin/fredrin ticket upload "$OUT/1280.png" --label "Desktop 1280px"` (add `--kind before|after --pair about-desktop` for before/after pairs).

## 5. Cleanup

Kill **only** the dev server this skill started, and keep the evidence:

```sh
. .fredrin/tmp/verify-app/current.env
test -n "$OUT" && test -n "$PORT" || echo "current.env missing: find the PID in the newest $OUT/dev.pid by hand"
kill "$(cat "$OUT/dev.pid")" 2>/dev/null
# pnpm spawns next as a child; stop the one still bound to our port, if any
lsof -nP -tiTCP:$PORT -sTCP:LISTEN | xargs -r kill 2>/dev/null
sleep 1; lsof -nP -iTCP:$PORT -sTCP:LISTEN && echo "STILL RUNNING on $PORT" || echo "port $PORT released"
```

Never `pkill node` / `pkill next`: other worktrees may be running their own servers.
Leave `$OUT/` in place.

## 6. Static export (GitHub Pages build)

The Pages build serves every URL under `/about-me/`. Build it, serve `out/` under that path, and drive it
the same way (Python's built-in server prints one log line per request, so 404s show up in `pages.log`):

```sh
. .fredrin/tmp/verify-app/current.env
PAGES_BASE_PATH=/about-me pnpm build
mkdir -p .preview && rm -rf .preview/about-me && cp -R out .preview/about-me   # .preview/ is git-ignored
nohup python3 -m http.server 4000 --directory .preview > "$OUT/pages.log" 2>&1 &
echo $! > "$OUT/pages.pid"
curl -s -o "$OUT/pages.html" -w '%{http_code}\n' http://localhost:4000/about-me/   # expect 200
node --experimental-websocket scripts/screenshot.mjs "http://localhost:4000/about-me/" "$OUT/pages" 1280 390@3
grep -E '" (404|500) ' "$OUT/pages.log" || echo "no 404s"
grep -oE '(href|src)="/[^"]*"|url\(/[^)]*\)' "$OUT/pages.html" | grep -v '/about-me/' || echo "every URL under /about-me/"
kill "$(cat "$OUT/pages.pid")"
```

Check the screenshots the same way as section 3: the logos must not be blank (a missing base path on
a mask URL renders an empty box, not an error in the page), and the text must be Instrument Sans.

After a merge to `main`, the `pages` workflow deploys it; check the live page with
`curl -s https://tyeoh9.github.io/about-me/ | grep -o "Thomas Yeoh" | head -1`.

## Feature map

One file per top feature, each with what it is, where it lives, and how to assert it:
- [features/affiliation-logos.md](features/affiliation-logos.md)
- [features/chapters-and-figures.md](features/chapters-and-figures.md)
- [features/contact-links.md](features/contact-links.md)
