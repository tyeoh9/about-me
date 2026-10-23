# Affiliation logos

**What:** one row of Apple, UC Berkeley and UC Irvine logos right under the opening statement, with no heading above it.

**Where:** `src/components/Logos.tsx`, data in `logos` in `src/content/profile.ts`, files in `public/logos/`
(`apple.svg`, `uc-berkeley.svg`, `uc-irvine.svg`), styles `.logos` / `.logo` in `src/app/globals.css`.

**How it works:** each logo is a `<span role="img" aria-label="…">` whose SVG is a CSS mask over
`--logo` (`#9A968D`), so all three share one warm gray. Heights are 31px (Apple), 30px (Berkeley) and 20px (UCI).

**Assert (HTML):**
```sh
. .fredrin/tmp/verify-app/current.env
grep -o 'aria-label="\(Apple\|UC Berkeley\|UC Irvine\)"' "$OUT/index.html" | sort -u   # 3 lines
grep -o -- '--logo-src:url(/logos/[a-z-]*\.svg)' "$OUT/index.html" | sort -u             # 3 local paths
grep -o 'wikimedia\|jsdelivr' "$OUT/index.html" | wc -l                                          # 0 (no hotlinks)
for f in apple uc-berkeley uc-irvine; do curl -s -o /dev/null -w "$f %{http_code}\n" "http://localhost:$PORT/logos/$f.svg"; done  # all 200
```

**Looks right when:** at 1280px they sit in one row under the statement, all the same gray, with the
Apple mark slightly taller than the Berkeley wordmark and UCI the smallest. At 390px they still fit on one row.
