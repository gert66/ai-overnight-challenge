# V3 — Final report

**Nederlandse samenvatting:** V3 is een geïntegreerde doorontwikkeling van de departementswebsite
onder `v3/`, die het donkere, kleurrijke, technisch-rijke ontwerp van V1 combineert met de
toegankelijke informatie-architectuur (verhaal, tijdlijn, "hoeveel wil je weten?"-dieptekeuze) van
V2. V1 (root) en V2 (`v2/`) zijn ongewijzigd. Vijf demo's, GitHub/broncode-links en alle
technische diagrammen zijn behouden en direct bereikbaar; een bonus/vervolg-sectie voor Wietse's
parkeer-app-idee is voorbereid maar expliciet gelabeld als nog niet live. Dit document is het
eindrapport: preview-instructies, paginakaart, wat is gecontroleerd, het vergelijkende V1/V2/V3-
oordeel, de status van de bonusslot en de resterende beperkingen.

---

## Preview

From the repository root:

```
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/v3/index.html` — V3 homepage (Dutch)
- `http://localhost:8080/v3/en/index.html` — V3 homepage (English)

Or open the files directly without a server:

- `v3/index.html`
- `v3/en/index.html`

For side-by-side comparison against the two prior versions (both unchanged by this work):

- `http://localhost:8080/index.html` — V1 (root)
- `http://localhost:8080/v2/index.html` — V2

## Page map

All 10 V3 HTML pages (5 Dutch under `v3/`, 5 English under `v3/en/`), plus supporting files:

| Page (NL) | Page (EN) | Depth-chooser role |
|---|---|---|
| `v3/index.html` | `v3/en/index.html` | **Home** — hero, six-step visual timeline, five demo cards, "How much do you want to know?" depth chooser, bonus/follow-on slot |
| `v3/verhaal.html` | `v3/en/verhaal.html` | **(a) The story** — ≈2 minutes, no technical knowledge needed |
| `v3/hoe-kan-ai-dit.html` | `v3/en/hoe-kan-ai-dit.html` | **(b) How could AI do this itself?** — conceptual plan → build → test → review → repair loop |
| `v3/onder-de-motorkap.html` | `v3/en/onder-de-motorkap.html` | **(c) Under the hood** — full orchestrator/Hermes/model/Git architecture, all reused diagrams |
| `v3/zelf-bouwen.html` | `v3/en/zelf-bouwen.html` | **(d) Build this yourself** — VM/cost/install/prompts/repos, step-by-step |

Supporting files:

- `v3/assets/v3.css` — the single stylesheet for all 10 pages (no per-page inline `<style>`, no inline `style=` attributes, no `<script>`, no CDN or external font references).
- `v3/DESIGN.md` — the V1/V2 design audit and design-token inventory that V3 was built from.
- `v3/REVIEW.md` — the comparative persona review, link/asset audit, mobile/desktop static check, prioritized rework list, and the `v3-07` rework log that resolved it.
- `v3/review-audit.py` — a stdlib-only (`html.parser`) link/fragment audit script for the 10 V3 pages; written for the review but blocked from executing in every build/review sandbox so far (see "What was verified" below).

## What was verified

- **Link and asset integrity** (`v3/REVIEW.md`, "Part B — Link and asset audit"): 332 total `href`/`src`/`srcset` references across all 10 files (320 `href`, 8 `src`, 4 `srcset`), with **0 missing relative file targets** and **0 missing `#fragment` targets**. This was originally established by complete, unelided per-file `grep -n -o` extraction plus manual resolution tables, because `python3 v3/review-audit.py` has hit "This command requires approval" in every sandboxed batch, including this one — confirmed again just now:
  ```
  $ python3 v3/review-audit.py
  This command requires approval
  ```
  The script is left in place at `v3/review-audit.py` for a human or a non-sandboxed CI run to execute; its logic has not itself been reviewed against the grep-based numbers by running it.
- **Source/GitHub links retained** (`v3/REVIEW.md`, rejection test "(c) No source/GitHub links lost"): all five demo/GitHub/commit link sets on `v3/index.html` are byte-identical (rendered) to root `index.html`'s runtime-templated equivalents — 10 = 10 link elements — and `v3/onder-de-motorkap.html` carries 12 (more than V1's `how-we-built.html`'s 7). V2 has zero commit-history links anywhere, by its own architecture doc's admission.
- **Diagrams retained** (`v3/REVIEW.md`, rejection test "(d) No diagrams lost"): all 12 `assets/*.svg` diagrams (6 diagrams × NL/EN) are reused via `<img>`/`<picture>` on `onder-de-motorkap.html` and its EN mirror, including two (`architecture-*.svg`, `development-loop-*.svg`) that V1 itself never embeds as an image anywhere on the existing root site.
- **No script/style leakage** (checked directly for this batch, not previously recorded in REVIEW.md): `grep -rn '<script\|<style\|style="\|fonts.googleapis\|cdn\.' v3/*.html v3/en/*.html` returns no matches — zero `<script>`, zero `<style>`, zero inline `style=`, zero CDN or external-font references in any of the 10 pages.
- **V1 dark palette retained** (`v3/REVIEW.md`, rejection test "(b) Not overly white/light"): `v3.css`'s `:root` tokens (`--bg:#0d1117`, `--bg-deep:#07111f`, `--panel:#161b22`, `--panel-2:#0e1b2b`, `--ink:#e6edf3`) are copied verbatim from V1, per `v3/DESIGN.md`'s token table. The only light background in the stylesheet is the white diagram-frame (`.diagram-figure{background:#fff}`), itself copied from V1's own `.figure-card` rule.
- **Root/V1, `assets/`, `challenges/` and `v2/` untouched by V3 work**: `git diff --stat main -- . ':!v3'` run just now from the repo root returns:
  ```
  live-status-overnight-maze-chase-20260916.json | 6 ++++++
  1 file changed, 6 insertions(+)
  ```
  This is **not** V3 work: `git log b68246e..HEAD` shows the one commit touching that file (`49c5312 Update live status: DONE`) is the automated live-status update that already existed on this branch *before* the first V3 commit (`4705f57 v3-01-foundation-nl-home`) — it is the overnight-challenge-monitor's own periodic status publication, unrelated to and predating any V3 batch. No V3 commit touches any file outside `v3/`. `git status --porcelain` at the start of this batch was clean.

## Comparative verdict (V1 vs V2 vs V3)

Copied verbatim from `v3/REVIEW.md`'s post-rework "Persona verdict summary — updated" table (the
table under "Rework log (v3-07)", which supersedes the earlier pre-rework table in Part A):

| Persona | V3 vs V1 | V3 vs V2 |
|---|---|---|
| 1. Non-technical admin/secretarial | BETTER | BETTER (mobile-layout caveat still open, see rework finding 3 — unverified, not a regression) |
| 2. Clinical colleague | BETTER | BETTER (was: EQUAL on homepage, WORSE on `verhaal.html` — the dropped clinical-safety caveat was fixed in `v3-07`: the caveat now appears on every NL/EN page that mentions Electron Dose Lab, matching V2's 5/5 coverage) |
| 3. Physicist / AI-curious | BETTER | BETTER |
| 4. ICT / software specialist | BETTER | BETTER |

Rejection tests (`v3/REVIEW.md`, "Rejection tests (explicit PASS/FAIL, per job spec)") — all PASS:

- **(a) Design has not become generic/document-like — PASS.** `v3.css` reproduces V1's card/badge/CTA/diagram-frame structure and keeps a multi-column desktop layout at three breakpoints, the opposite of V2's single 44rem column at every breakpoint.
- **(b) Not overly white/light — PASS.** The dark `:root` palette is copied verbatim from V1; the only light region is the white diagram-frame, itself a verbatim reuse of V1's own framing rule.
- **(c) No source/GitHub links lost — PASS.** Rendered GitHub link counts on V3 pages match or exceed their closest V1 counterpart; V2 has zero commit-history links anywhere.
- **(d) No diagrams lost — PASS.** All 12 reused SVGs are embedded on `onder-de-motorkap.html`; V3 embeds two diagrams neither V1 nor V2 ever surfaced as images.
- **(e) Technical richness not hidden — PASS.** Every one of the 8 required technical topics (orchestrator, Hermes, models/routing, Git workflow, review loop — conceptual and technical, architecture diagram, VM/cost/install, prompt chain) is reachable in 0–1 clicks from the V3 homepage.

## Bonus / follow-on slot

The Wietse parking-app idea is present as a clearly separate, visually distinct section on both
home pages (`v3/index.html` and `v3/en/index.html`), verified in `v3/REVIEW.md` under "Bonus /
Wietse parking-app section — VERIFIED CORRECT":

- Labelled **bonus/follow-on, explicitly not one of the original five** ("Bonus / vervolg — niet
  één van de oorspronkelijke vijf" / "Bonus / follow-on — not one of the original five"), and the
  body text explicitly disclaims that it was built during the overnight run described elsewhere
  on the page.
- Status is **"In voorbereiding" / "In preparation"** — a visually distinct status chip with a
  dashed yellow border, differentiating it from the five real, playable demo cards above it.
- There is **no live app link**: the only interactive element is an inert
  `<span class="disabled-link" aria-disabled="true" data-future-domain="parking.whofirst.nl">`,
  not an `<a href>`. `parking.whofirst.nl` appears only inside that `data-*` attribute and an HTML
  comment — never as a rendered, clickable, or crawlable link — and the domain is **not claimed to
  be live** anywhere.

**To activate it later**, once a verified, working app exists: replace the `<span
class="disabled-link" ...>` with a real `<a href="https://parking.whofirst.nl">` (keeping the same
visual styling classes), and update the status chip text from "In voorbereiding"/"In preparation"
to something like "Live"/"Beschikbaar". This needs to be done in both `v3/index.html` and
`v3/en/index.html`.

## Remaining limitations

1. **No headless browser was available in the build sandbox.** Mobile/desktop layout was verified
   by static CSS analysis only (`v3/REVIEW.md` Part C: breakpoints, fixed-width scan, computed
   tap-target heights, font-size scan). Of the findings raised there, findings 1, 2, 4 and 6 were
   fixed in `v3-07` and findings 5 and 7 were deliberately left as-is (matching V1's own original
   sizing / a V1 root characteristic, not a V3 defect). **Finding 3 — unconfirmed mobile scroll
   depth to the demo grid on `v3/index.html` and `v3/verhaal.html`** — is the one item that still
   genuinely depends on a real render and remains open; every alternative (`playwright`, `puppeteer`,
   `npx`, a local Chromium binary) was tried again in `v3-07` and failed or was unavailable.
2. **External URL liveness was not checked.** No network access was available in this sandbox, so
   the audit in `v3/REVIEW.md` Part B is a provenance check (does the same URL, byte-identical,
   already exist on the already-live root site) rather than an HTTP liveness check of the demo
   hosts or GitHub.
3. **The bonus parking app has no live link yet** — see "Bonus / follow-on slot" above. Activating
   it is a manual step for whoever verifies the app is ready.
4. **V3 is not published over root/main.** It exists only under `v3/` on branch
   `v3/integrated-department-showcase`. Publishing V3 as the live department site is a human
   decision, out of scope for this job.
5. **`python3 v3/review-audit.py` has never successfully executed in any build or review sandbox
   so far** (see "What was verified" above) — its stdlib-only logic has not been cross-checked
   against the manual `grep`-based numbers by actually running it; a human or CI environment
   without this restriction should run it once before publishing.

## Not changed

Root V1 pages, `assets/`, `challenges/` and `v2/` are untouched by any V3 batch.
