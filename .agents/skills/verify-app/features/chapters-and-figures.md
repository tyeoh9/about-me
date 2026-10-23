# The four chapters and their figures

**What:** four chapters, in this order. Each has text on the left and a figure plate on the right
(stacked text-then-figure at ≤760px):

| id | Title | Figure (`data-figure`) | Caption |
|---|---|---|---|
| `apple-maps` | Faster ads in Apple Maps | `apple-cache`: Maps Search ⇄ Redis cache ┄ Ad service | Most requests never reach the ad service |
| `zoofi` | Automated client onboarding at Zoofi AI | `zoofi-onboarding`: document → parse → fields | An onboarding document, parsed into the fields the product needs |
| `clearo` | Clearo: buying and selling over iMessage | `clearo-thread`: iMessage bubbles | The agent handles the back and forth |
| `validate-llm` | Validate-LLM: catching bad AI answers | `validate-llm`: two answers → judge → sent/blocked | A made-up claim gets stopped before it reaches the user |

**Where:** `src/components/Chapter.tsx`, `src/components/figures/*.tsx`, copy in `chapters` in
`src/content/profile.ts`, styles under "Figure plate" and "Figure: …" in `globals.css`.

**Assert (HTML):**
```sh
grep -o 'data-figure="[a-z-]*"' "$OUT/index.html"        # 4, in table order
grep -c 'We shipped fast and iterated with our first users. Onboarding took 60% less manual work.' "$OUT/index.html"   # 1
grep -c 'handles the back and forth and sets up the pickup' "$OUT/index.html"   # 1
grep -c 'short loops\|negotiates' "$OUT/index.html"       # 0 (old copy is gone)
grep -c '<h1' "$OUT/index.html"                           # 1
```

**Looks right when:** at 1280px each chapter is a two-column row separated by a 1px rule, and every
figure is centered in its beige (`#F2EFE9`) plate with the caption under it. At 390px every figure sits
below its text; the Apple and Zoofi diagrams run vertically; all figure labels are readable (≥12px CSS)
and none overlap or clip. The Validate-LLM wires connect both answers to the judge and the judge to
both "sent" and "blocked".
