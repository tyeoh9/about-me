# Contact and project links

**What:** the "Say hello" pitch, then email, GitHub, LinkedIn and the resume, plus the inline project
links in the chapters and in "Along the way".

**Where:** `links` and `sayHello` in `src/content/profile.ts`, rendered by `src/components/RichText.tsx`.

**Expected hrefs (exactly these):**
```
https://www.apple.com
https://clearoapp.com/
https://tyeoh9.github.io/llm-validation-framework/
https://inky-254095790852.us-central1.run.app/
https://github.com/tyeoh9/repometrics
mailto:tyeoh@berkeley.edu
https://github.com/tyeoh9
https://www.linkedin.com/in/yeoh
https://tyeoh9.github.io/tyeoh/Resume.pdf
```
Zoofi AI is plain text, not a link.

**Assert (HTML):**
```sh
grep -o '<a [^>]*>' "$OUT/index.html" | grep -o 'href="[^"]*"' | sort -u        # matches the list above, nothing else
grep -o '<a href="http[^>]*>' "$OUT/index.html" | grep -vc 'target="_blank" rel="noopener noreferrer"'   # 0
grep -ci 'fredrin' "$OUT/index.html"                                            # 0
grep -cE '\+?1?[ (-]*[0-9]{3}[ )-]*[0-9]{3}[ -][0-9]{4}' "$OUT/index.html"       # 0 (no phone number)
```

**Looks right when:** links have a thin `#C9C5BC` underline offset below the text, and a Tab key
press shows a visible dark focus outline.
