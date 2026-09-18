# V2 Review — Persona / Link / Mobile Audit

Scope: the 10 HTML files under `v2/**` (5 Dutch + 5 English), `v2/assets/v2.css`,
`v2/assets/v2.js`. This is an audit only — no content was changed. Repairs, if
any, happen in a follow-up batch.

## Method

- **Link extraction**: `grep -o '(href|src)="[^"]*"'` run per file against all
  10 `v2/**/*.html` files (loops/pipes with multiple stages are restricted in
  this sandbox, so files were processed one at a time). Every unique href/src
  was captured this way; no automated HTML parser was available for this step
  (see below), so the grep-based extraction was manually cross-checked against
  a full read of every file's source.
- **Internal link / anchor resolution**: for every relative `href`/`src`,
  resolved the path from the referencing file's directory and confirmed with
  `ls`/`find` (scoped to the repo) that the target file exists. For every
  `#fragment` (all of them point at `install-howto.html#...`), confirmed the
  `id="..."` exists in the target file with `grep -n 'id="'`.
- **External link check**: attempted `curl -sI --max-time 5 <url>` (and a
  plain `curl` to a known-good site as a sanity check). Every external network
  request in this sandbox is rejected with "This command requires approval"
  before any bytes are sent, and no interactive approver is available in this
  non-interactive batch. This matches the batch's own hard limit ("do not
  contact external services"). **No external URL could be checked over the
  network.** Every external URL is recorded as `not verified (no network)`
  per the task's explicit fallback instruction, rather than claimed to work.
- **Mobile check**: checked for a headless browser (`which chromium
  chromium-browser google-chrome` → none found) and for Playwright. Note:
  `python3 -c "..."` and `python3 <script>.py` invocations are also blocked
  by sandbox approval in this batch (only `python3 --version` runs), so the
  Playwright Python import itself could not be probed directly; combined with
  the absence of any Chromium/Chrome binary, no headless rendering is possible
  in this environment. **A static audit was performed instead** (viewport
  meta, CSS fixed-width scan, table/pre wrapping, font sizes, tap-target
  sizing) — this is explicitly not a rendered/screenshot check. No files were
  added to `v2/review-screenshots/` because no browser was available to
  produce them.
- **Persona review**: read the full source of `v2/index.html` plus each
  persona's route page(s) in Dutch, then spot-read the matching English
  mirror pages, and cross-referenced technical claims (cost figures, batch/
  call counts, machine specs) against the existing root pages
  (`how-we-built.html`, `build-your-own.html`, `install-howto.html`).
- The orchestrator's own test command
  (`python3 -c "... HTMLParser().feed(...) for p in Path('v2').rglob('*.html') ..."`)
  was not re-run by me inside this batch, since invoking it hits the same
  `python3 -c` sandbox block described above; it will run as the batch's
  official test step after this file is written. All 10 files were, however,
  manually read in full via the Read tool, and none showed any structural
  HTML problems (unclosed tags, stray `<`, etc.) during that read.

## Link check results

### Internal links and anchors (10/10 files)

Every relative `href`/`src` across all 10 files was resolved from its
referencing file's directory. **All internal targets and all internal
anchors resolve on disk. No broken internal links or anchors were found.**

| Target (resolved) | Used from | Status |
|---|---|---|
| `v2/assets/v2.css` | all 10 v2 pages (`assets/v2.css` or `../assets/v2.css`) | OK — file exists |
| `v2/assets/v2.js` | all 10 v2 pages (`assets/v2.js` or `../assets/v2.js`) | OK — file exists |
| `v2/index.html` | self-links + `en/index.html` back-links | OK |
| `v2/en/index.html` | `v2/index.html`, `v2/hoe-kan-ai-dit.html`, `v2/onder-de-motorkap.html`, `v2/wat-is-er-gebeurd.html`, `v2/zelf-bouwen.html` (lang switch) | OK |
| `v2/wat-is-er-gebeurd.html` | `v2/index.html`, `v2/hoe-kan-ai-dit.html`, `v2/onder-de-motorkap.html`, `v2/zelf-bouwen.html`, `v2/en/what-happened.html` (lang switch) | OK |
| `v2/en/what-happened.html` | `v2/en/index.html`, `v2/en/how-ai-did-it.html`, `v2/wat-is-er-gebeurd.html` (lang switch) | OK |
| `v2/hoe-kan-ai-dit.html` | `v2/index.html`, `v2/wat-is-er-gebeurd.html`, `v2/onder-de-motorkap.html`, `v2/zelf-bouwen.html`, `v2/en/how-ai-did-it.html` (lang switch) | OK |
| `v2/en/how-ai-did-it.html` | `v2/en/index.html`, `v2/en/under-the-hood.html`, `v2/en/build-it-yourself.html`, `v2/en/what-happened.html`, `v2/hoe-kan-ai-dit.html` (lang switch) | OK |
| `v2/onder-de-motorkap.html` | `v2/index.html`, `v2/wat-is-er-gebeurd.html`, `v2/hoe-kan-ai-dit.html`, `v2/zelf-bouwen.html`, `v2/en/under-the-hood.html` (lang switch) | OK |
| `v2/en/under-the-hood.html` | `v2/en/index.html`, `v2/en/what-happened.html`, `v2/en/how-ai-did-it.html`, `v2/en/build-it-yourself.html`, `v2/onder-de-motorkap.html` (lang switch) | OK |
| `v2/zelf-bouwen.html` | `v2/index.html`, `v2/onder-de-motorkap.html`, `v2/hoe-kan-ai-dit.html`, `v2/wat-is-er-gebeurd.html`, `v2/en/build-it-yourself.html` (lang switch) | OK |
| `v2/en/build-it-yourself.html` | `v2/en/index.html`, `v2/en/under-the-hood.html`, `v2/en/how-ai-did-it.html`, `v2/en/what-happened.html`, `v2/zelf-bouwen.html` (lang switch) | OK |
| `index.html` (repo root) | `../index.html` from every NL v2 page's footer preview-note | OK — file exists (existing site, untouched) |
| `index-en.html` (repo root) | `../../index-en.html` from every EN v2 page's footer preview-note | OK — file exists |
| `install-howto.html` (repo root) + 13 anchors: `#accounts #sshkey #hetzner #connect #software #github #agent #desktopcommander #env #firstjob #orchestrator #watchdog #checklist` | `v2/zelf-bouwen.html` (`../install-howto.html#...`), `v2/en/build-it-yourself.html` (`../../install-howto.html#...`) | OK — file exists; all 13 `id=` attributes confirmed present in `install-howto.html`, in the same order the v2 pages reference them |
| `build-your-own.html` (repo root) | `v2/zelf-bouwen.html`, `v2/en/build-it-yourself.html` | OK — file exists |
| `prompt-chain.html` (repo root) | `v2/onder-de-motorkap.html`, `v2/zelf-bouwen.html`, `v2/en/under-the-hood.html`, `v2/en/build-it-yourself.html` | OK — file exists |
| `how-we-built.html` (repo root) | `v2/onder-de-motorkap.html`, `v2/en/under-the-hood.html` | OK — file exists |
| `assets/workflow-polished-nl.svg` (repo root assets) | `v2/onder-de-motorkap.html` (`../assets/...`), `v2/en/under-the-hood.html` (`../../assets/...`) | OK — file exists |
| `assets/review-loop-polished-nl.svg` (repo root assets) | `v2/onder-de-motorkap.html`, `v2/en/under-the-hood.html` | OK — file exists |

No same-page `href="#..."` anchors are used anywhere in v2 (checked with
`grep -o 'href="#[^"]*"' v2/*.html v2/en/*.html`, zero matches), so there is
no in-page anchor category beyond the `install-howto.html` cross-file ones
above.

### External links (11 unique URLs across all 10 files)

| URL | Used from (pages) | Status |
|---|---|---|
| `https://gert66.github.io/ai-agent-challenge-05-maze-chase/` | index.html, wat-is-er-gebeurd.html, en/index.html, en/what-happened.html | not verified (no network) |
| `https://gert66.github.io/ai-overnight-challenge/mosse-tracker/` | index.html, wat-is-er-gebeurd.html, en/index.html, en/what-happened.html | not verified (no network) |
| `https://gert66.github.io/ai-overnight-challenge/rubik-2x2/` | index.html, wat-is-er-gebeurd.html, en/index.html, en/what-happened.html | not verified (no network) |
| `https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/` | index.html, wat-is-er-gebeurd.html, en/index.html, en/what-happened.html | not verified (no network) |
| `https://gert66.github.io/ai-overnight-challenge/path-planner/` | index.html, wat-is-er-gebeurd.html, en/index.html, en/what-happened.html | not verified (no network) |
| `https://github.com/gert66/ai-agent-challenge-01-mosse-tracker` | index.html, hoe-kan-ai-dit.html\*, onder-de-motorkap.html, zelf-bouwen.html, en/index.html, en/how-ai-did-it.html\*, en/under-the-hood.html, en/build-it-yourself.html | not verified (no network) |
| `https://github.com/gert66/ai-agent-challenge-02-rubik-2x2` | index.html, onder-de-motorkap.html, zelf-bouwen.html, en/index.html, en/under-the-hood.html, en/build-it-yourself.html | not verified (no network) |
| `https://github.com/gert66/ai-agent-challenge-03-monte-carlo` | index.html, onder-de-motorkap.html, zelf-bouwen.html, en/index.html, en/under-the-hood.html, en/build-it-yourself.html | not verified (no network) |
| `https://github.com/gert66/ai-agent-challenge-04-path-planner` | index.html, onder-de-motorkap.html, zelf-bouwen.html, en/index.html, en/under-the-hood.html, en/build-it-yourself.html | not verified (no network) |
| `https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17` | onder-de-motorkap.html, en/under-the-hood.html | not verified (no network) |
| `https://github.com/gert66/ai-agent-challenge-05-maze-chase` | index.html, onder-de-motorkap.html, zelf-bouwen.html, en/index.html, en/under-the-hood.html, en/build-it-yourself.html | not verified (no network) |

(\* `hoe-kan-ai-dit.html`/`how-ai-did-it.html` reference the repos only
indirectly via route-cards to `onder-de-motorkap.html`, not directly — listed
for completeness of "used from" but the direct hrefs live on the "under the
hood" / "build it yourself" pages.)

All 11 URLs are `gert66.github.io` or `github.com/gert66` addresses that also
appear, verbatim, on the existing (already-published) root site pages
(`index.html`, `how-we-built.html`, `build-your-own.html`), so they are reused
rather than newly invented — but that is a provenance check, not a liveness
check. **Recommendation: re-run an external link check from a networked
environment (e.g. the orchestrator's own CI/host, or a manual pass) before
treating V2 as ready to publish**, since this sandboxed batch could not reach
the network at all.

## Mobile check results

Performed as a **static audit**, not a rendered/screenshot check (see Method
— no headless browser or working Python script execution was available in
this sandbox). No `v2/review-screenshots/` files were produced.

- **Viewport meta**: present and identical (`width=device-width,
  initial-scale=1`) on all 10 pages (`grep -L 'name="viewport"' v2/*.html
  v2/en/*.html` returned no files, i.e. none are missing it). PASS.
- **Fixed pixel widths in `v2.css`**: scanned every `width:` declaration.
  Only `width: 12px` (a decorative timeline dot), and three `width: 100%`
  rules; no fixed width exceeds 360px. The one width-related item worth
  flagging is `.table-scroll table { min-width: 420px; }` — this deliberately
  exceeds 360px, but it lives inside `.table-scroll { overflow-x: auto; }`,
  which is exactly the accepted "wrapped for horizontal scroll" pattern the
  task calls out, and the stylesheet's own comment (`v2.css:338`) confirms
  that intent. Not a finding, but noted as by-design horizontal scroll inside
  the 6 tables on `onder-de-motorkap.html` (×2), `zelf-bouwen.html` (×1),
  `en/under-the-hood.html` (×2), `en/build-it-yourself.html` (×1) — all 6
  confirmed wrapped in `<div class="table-scroll">`.
- **`<pre>` blocks**: none exist in any v2 file (`grep -l "<pre" v2/*.html
  v2/en/*.html` → no matches), so there is nothing unwrapped to overflow.
- **Font sizes**: body text is 17px (`body { font-size: 17px }`), above the
  16px floor. Secondary/meta text (`.route-card span`, `.demo-card
  .repo-link`, `.site-footer`, table cells) sits at 14–15px, which is normal
  for captions/table cells rather than primary body copy, so this is not
  flagged as a defect, but see F04 for a related note.
- **Tap targets**: the stylesheet deliberately sizes interactive elements to
  ≥44px — `.lang-switch` (`min-height: 44px`), `.play-btn` (`min-height:
  48px`), `.repo-link` (`min-height: 44px; line-height: 44px`), `.route-card`
  (`min-height: 44px`), `details.tech-details > summary` (`min-height:
  44px`), and `details.jargon > summary` uses a `::before` pseudo-element
  with `inset: -8px 0; min-height: 44px` specifically to pad out an otherwise
  small inline toggle to a 44px tap target. This reads as intentional,
  correct mobile design; no undersized tap targets were found in the CSS.
  PASS (by static review — see F03 for the caveat that no device/emulator
  actually exercised these).
- **Horizontal overflow**: no page has any element with a fixed width or
  `min-width` outside a scroll container; `main { max-width: var(--max) }`
  (`--max: 44rem`) is a cap, not a fixed width, so it will not force overflow
  narrower than the viewport. No static evidence of horizontal overflow at
  360px or 390px. This is a static conclusion, not a measured one — see F03.
- **Demo-grid reachability on mobile (persona A check)**: `.demo-grid` is
  `grid-template-columns: 1fr` below 640px (single column), so the 5 demo
  cards stack vertically. Estimating vertical extent from the CSS box model
  on `v2/index.html` (hero block ≈ 320–350px, the 7-item `<ol class="timeline">`
  ≈ 750–850px given each `<li>` carries a bold label plus a 2–3 line
  description at 17px/1.6 line-height, then the "Probeer ze zelf" heading and
  intro) puts the **first** demo card at roughly 1.3–1.6× a 390×844 viewport
  height, and the **fifth** card at roughly 2.5–3× that height. This is a
  static estimate from CSS metrics, not a measured scroll distance (no
  renderer available — see F03), but it consistently comes out above "one
  scroll". See **F01**.

## Persona review

### A — Secretarial / front-desk / administrative colleague (no technical background)

Reading `v2/index.html` (hero → timeline → demo grid → plain-language →
route choice):

1. **What did Gert do?** Clear — the hero line and 7-step timeline state
   plainly that after a meeting he used voice mode on a walk to describe five
   small software ideas, in ~30 minutes, without touching a keyboard.
2. **Why was it interesting?** Clear — "In gewone taal: wat deed AI hier
   eigenlijk?" (`index.html:73-76`) explicitly frames it as "AI doing more
   than just answering a question", and the timeline's "'s Nachts autonoom
   aan het werk" step spells out that the work happened overnight without
   anyone present.
3. **What was the outcome?** Clear and immediate — the "Probeer ze zelf" demo
   grid with five ▶ Play buttons sits directly under the story, before any
   technical explanation, matching the intended "story → wow result" order.
4. **Where to click for more/less depth?** Clear — "Kies je diepte"
   (`index.html:78-85`) gives four plainly labeled route cards with one-line
   descriptions each.

Jargon check: all technical terms that appear before the route choice
(orchestrator, Git, VM, Hermes, API, modelaanbieder — all in the
"In gewone taal" paragraph) are wrapped in `<details class="jargon">` with an
inline, plain-Dutch definition revealed on tap. No unexplained jargon appears
in running prose. PASS.

Word-count estimate for the ~2-minute budget: manually counted the visible
prose above "Kies je diepte" (hero + timeline + demo-card copy +
plain-language paragraph, excluding collapsed jargon definitions) at ≈412
words. At 200 wpm that is ≈2.1 minutes of pure reading; in practice the demo
cards are scanned (title + button) rather than read word-for-word, so
effective time is closer to 1.7–2.0 minutes. **Borderline pass** — see F04.

Demo-button reachability on mobile: estimated as more than one screen's worth
of scrolling (see Mobile check above and **F01**) — this is the one place
persona A's journey is weaker than the brief's target.

`wat-is-er-gebeurd.html` (the route persona A would naturally pick next) is
fully free of jargon, uses the same 6-step timeline structure, and ends with
a two-card "Wil je meer weten?" section. Consistent with the entry page.

**Verdict: WEAK.** The four comprehension questions are answered clearly and
quickly, and jargon handling is exemplary; the only real issue is that the
demo buttons — explicitly meant to be an early, low-effort "wow" — are
estimated to sit beyond a single scroll on a typical phone. See F01.

### B — Clinical colleague (physician / nurse)

Reading `v2/index.html` then `v2/wat-is-er-gebeurd.html` +
`v2/hoe-kan-ai-dit.html`:

1. **What did Gert do?** Clear from the same timeline as persona A; the
   clinical reader gets an extra, relevant data point in
   `hoe-kan-ai-dit.html`'s "Wat kon het niet, en kanttekeningen" section,
   which explicitly says the Electron Dose Lab demo is "geen klinisch
   apparaat en geen klinisch gevalideerd doseersysteem" — directly relevant
   and reassuring for a clinical reader who might otherwise over-interpret a
   dose-simulation demo.
2. **Why was it interesting?** Clear — `hoe-kan-ai-dit.html`'s "Het idee in
   het kort" gives the project-lead/builder/inspector analogy, which does not
   require any technical vocabulary and maps well onto a clinical mental
   model of role separation and independent checks.
3. **What was the outcome?** Clear — same five playable demos, reachable from
   both `wat-is-er-gebeurd.html` and the index.
4. **Where to click for more/less depth?** Clear — both pages end with a
   "Kies je volgende stap" / "Wil je meer weten?" route grid.

The clinical caveat about the dose-lab demo not being a clinical device is
present on both `hoe-kan-ai-dit.html` and `onder-de-motorkap.html`/
`zelf-bouwen.html`, i.e. it is not a one-off aside but repeated at each depth
level a clinical reader might reach — good consistency.

English mirror spot-check (`en/what-happened.html`, `en/how-ai-did-it.html`):
same section order, same caveat sentence ("not a clinical device and not a
clinically validated dosing system"), same route cards. Parity holds.

**Verdict: PASS.**

### C — Clinical physicist / AI-curious colleague

Reading `v2/hoe-kan-ai-dit.html` + `v2/onder-de-motorkap.html`:

1. **What did Gert do?** Clear, plus this persona gets the added technical
   framing of "Brain, Worker, Reviewer" bounded roles and the plan → build →
   test → check → fix → record cycle spelled out twice (once in plain terms
   on `hoe-kan-ai-dit.html`, once with architecture detail on
   `onder-de-motorkap.html`).
2. **Why was it interesting?** Clear — the deterministic-vs-AI-reasoning table
   on `onder-de-motorkap.html` ("De autonome cyclus") is exactly the kind of
   detail this persona would want to evaluate whether the claims are
   credible, and it is backed by a concrete GitHub commit-history example for
   the 3D Path Planner.
3. **What was the outcome?** Clear — same five demos, plus this persona can
   verify the "5/5 DONE, 37 batches, 155 Claude calls" figures, which match
   the existing root page `how-we-built.html` verbatim (cross-checked).
4. **Where to click for more/less depth?** Clear — route cards on both pages,
   plus `onder-de-motorkap.html` explicitly says up front that this page is
   *not* needed to understand the story ("Voor het verhaal zelf heb je deze
   pagina niet nodig..."), which is a nice piece of wayfinding for this
   specific persona.

**Verdict: PASS.**

### D — ICT / software specialist

Reading `v2/onder-de-motorkap.html` + `v2/zelf-bouwen.html`:

1. **What did Gert do?** Clear, with full architecture detail (VM specs,
   OS/kernel, Python/Node/Git versions, Playwright, model routing for
   Brain/Worker/Reviewer).
2. **Why was it interesting?** Clear — the deterministic-control-plane vs.
   AI-reasoning table, plus the concrete example of reading the Git commit
   history of the 3D Path Planner repo as evidence of the claimed workflow.
3. **What was the outcome?** Clear — five demos plus direct links to all five
   GitHub repositories under "Broncode en repositories".
4. **Where to click for more/less depth?** Clear — `zelf-bouwen.html` is
   directly one route-card away, and vice versa.

Technical-claim traceability: spot-checked the following claims against the
root pages and all matched exactly:
- "37 autonome bouwbatches" / "155 Claude-calls" / "2 vCPU, 3,7 GiB RAM" →
  `how-we-built.html:4` (stat block) and `how-we-built.html:8` (machine
  table) — verbatim match, including the exact wording "2 vCPU, 3,7 GiB RAM,
  2 GiB swap" and "38 GB root volume, tijdens documentatie circa 28 GB
  gebruikt".
- "€6 tot €7 per maand" (VM) / "€20 per maand" (AI subscription) →
  `build-your-own.html` — verbatim match.
- The 13 `install-howto.html#...` anchors referenced from `zelf-bouwen.html`
  correspond, in the same order, to `install-howto.html`'s own numbered
  sections 1–12 (accounts → sshkey → hetzner → connect → software → github →
  agent → desktopcommander → env → firstjob → orchestrator → watchdog →
  checklist).

Self-build starting point: `zelf-bouwen.html` opens its first `<details
class="tech-details" open>` with cost overview, and the very next section,
"Stap 1–3: accounts, SSH-key en je eerste VM", is an unambiguous first step
that links straight to `install-howto.html#accounts`. This is a clear,
single, unambiguous entry point — not split across multiple "which one do I
start with" options.

**Verdict: PASS.**

### NL/EN parity (all four persona routes)

For every Dutch/English pair read during this review
(`index.html`↔`en/index.html`, `wat-is-er-gebeurd.html`↔`en/what-happened.html`,
`hoe-kan-ai-dit.html`↔`en/how-ai-did-it.html`,
`onder-de-motorkap.html`↔`en/under-the-hood.html`,
`zelf-bouwen.html`↔`en/build-it-yourself.html`): section order matches
exactly (hero → timeline/content → demo grid or details blocks → route
grid → footer), the set and order of internal links in the route grids match
1:1, external links match 1:1 (same URLs, same order), and every `<details
class="jargon">` term has a matching, semantically equivalent English
definition. The `<html lang="nl">`/`<html lang="en">` attribute and
`hreflang` alternate links are correctly set on all 10 files.

The language switch (`.lang-switch`) is `position: fixed; top:10px;
right:10px; min-height:44px`, so it does not depend on scroll position or
viewport size to remain visible/tappable on mobile — it is present in every
one of the 10 files' markup. No rendered confirmation was possible (see
Mobile check), but nothing in the CSS would hide or reposition it below
640px; no `@media` rule touches `.lang-switch`.

**Parity verdict: PASS.**

## Findings

- **F01 — MAJOR.** Estimated demo-grid position on mobile exceeds "one
  scroll". File: `v2/index.html` (structure: hero at lines 16–19, timeline at
  lines 21–30, demo grid starting line 32; same pattern in
  `v2/en/index.html`). Based on static CSS box-model estimation (see Mobile
  check), the first of five demo buttons lands at roughly 1.3–1.6 viewport
  heights down on a 390×844 screen, not within a single scroll, because the
  7-item origin-story timeline runs before the demo grid. This is an
  estimate, not a rendered measurement (no browser available in this
  sandbox — see F03), but the margin is large enough (30–60%+ over one
  screen height) that it is unlikely to be an artifact of estimation error
  alone. Proposed fix: either (a) trim the timeline to fewer/shorter items so
  the demo grid starts sooner, (b) move the demo grid directly under the hero
  and place the timeline after it, or (c) re-verify with an actual mobile
  render before treating this as confirmed — if a real render shows the first
  card within one screen, downgrade/close this finding.
- **F02 — MINOR.** External links (11 unique URLs, listed in the Link check
  table above) could not be checked over the network from this sandboxed
  batch; every attempt was rejected by the sandbox before any request was
  sent. Proposed fix: re-run an HTTP status check for all 11 URLs from an
  environment with network access before final publish sign-off. All 11 are
  reused verbatim from the existing root site, which reduces risk but does
  not confirm current liveness.
- **F03 — MINOR.** No headless browser (Chromium/Chrome) or working Python
  script execution was available in this sandbox, so the mobile check is a
  static CSS/HTML audit rather than a rendered/screenshot check, and
  `v2/review-screenshots/` was not populated. Proposed fix: before final
  ship, run a real render (Playwright or a physical/emulated phone) at
  360×740 and 390×844 for at least `v2/index.html`,
  `v2/wat-is-er-gebeurd.html`, `v2/onder-de-motorkap.html`, and
  `v2/en/index.html`, to confirm no horizontal overflow, confirm tap-target
  sizing in practice, and specifically to confirm or refute F01's scroll-depth
  estimate.
- **F04 — MINOR.** Visible prose above the "Kies je diepte" route choice on
  `v2/index.html` (and its English mirror) is ≈412 words, which at a 200
  wpm reading rate is ≈2.1 minutes — at or just over the ~2 minute target
  before accounting for the fact that demo-card copy is scanned rather than
  fully read. Not a hard fail (effective time is likely under 2 minutes for
  most readers), but there is little margin. Proposed fix: trim 1–2 of the
  7 timeline entries' description text, or shorten the "In gewone taal"
  paragraph slightly, to build in more margin.

No findings in these categories:
- **Internal links/anchors**: no findings — every internal link and every
  `install-howto.html#...` anchor resolves on disk (see Link check table).
- **NL/EN parity**: no findings — section order, links, and jargon coverage
  match across every pair reviewed.
- **Persona B and C comprehension**: no findings — both verdicts are PASS
  with no weak points identified.
- **Jargon handling**: no findings — every jargon term used before a route
  choice is wrapped in an inline, tap-to-expand `<details class="jargon">`
  definition in plain language, consistently in both languages.
- **Tap targets (static)**: no findings — CSS deliberately sizes all
  interactive elements to ≥44px; see F03 for the caveat that this was not
  confirmed on a real device.
- **Root-page / existing-site changes**: no findings — this batch did not
  modify, and confirmed via `git status`/`git diff --stat` that nothing
  changed, outside `v2/REVIEW.md`.
