# V3 Review — Comparative Persona Review, Link/Asset Audit, Mobile Check

Scope: all 10 files under `v3/**/*.html` (5 Dutch + 5 English) plus `v3/assets/v3.css`,
reviewed against the 5 root V1 pages (`index.html`, `how-we-built.html`, `prompt-chain.html`,
`build-your-own.html`, `install-howto.html`) and the 6 V2 pages plus `v2/ARCHITECTURE.md` /
`v2/REVIEW.md`. This is a review only — no HTML/CSS was changed in this batch.

**Sandbox note (methodology, read before the findings):** in this batch, `python3 -c "..."` and
`python3 v3/review-audit.py` (a stdlib-only `html.parser` audit script written for this repair,
kept at `v3/review-audit.py`) both hit "This command requires approval" even with the sandbox
override flag, and no interactive approver exists in this non-interactive worker — matching what
`v2/REVIEW.md` already documented for its own batch. Per the task's own fallback instruction,
Part B below was therefore done with complete, unelided per-file `grep -n -o` output instead of
running the script, and Part C is a static CSS/HTML audit, not a rendered one (no `chromium`,
`chromium-browser` or `google-chrome` binary is on `PATH` either — confirmed with `which`, exit
code 1 for all three). No files exist under `v3/review-shots/` as a result; none are claimed.

---

## Part A — Comparative persona review

Read in full for this section: root `index.html`, `how-we-built.html`, `prompt-chain.html`,
`build-your-own.html`, `install-howto.html`; `v2/index.html`, `v2/ARCHITECTURE.md`,
`v2/REVIEW.md`; and all 10 `v3/**/*.html` pages plus `v3/assets/v3.css` and `v3/DESIGN.md`.

### Persona 1 — Non-technical admin / secretarial / front-desk

**Q1: Can this persona understand and use the site within ~2 minutes?**

- **V1** (`index.html`): the hero paragraph alone runs to two long prose paragraphs plus a
  green callout, then a 2×2 nav grid, then a full "Hoe het idee ontstond" section (3 more
  paragraphs), a 4-card grid, and a purple "basisprompt" box — all *before* the first challenge
  card appears under "De vijf eindresultaten" (`index.html:17`). No jargon disclosure exists
  anywhere on the page ("orchestrator", "Hermes" appear as bare prose, e.g. "Hermes en andere
  toolkoppelingen maakten modellen en gereedschappen beschikbaar" — `index.html:17` — with zero
  inline explanation). A first-time non-technical reader has no fast path to "what can I click
  and see something work" and no safety net for unfamiliar terms. **Fails the 2-minute test.**
- **V2** (`v2/index.html`): hero → 7-step timeline → demo grid → plain-language block → route
  cards, with every jargon term (`orchestrator`, `Git`, `VM`, `Hermes`, `API`, `modelaanbieder`)
  wrapped in `<details class="jargon">`. `v2/REVIEW.md`'s own count puts the pre-route-choice
  prose at ≈412 words (≈2.1 min at 200wpm) and flags **F01**: the demo grid is estimated to sit
  beyond one mobile screen because the 7-item timeline runs first. Verdict in `v2/REVIEW.md`
  itself: **WEAK** for this persona, specifically because of demo-button reachability.
- **V3** (`v3/index.html` hero → timeline → demo grid → depth chooser; dedicated
  `v3/verhaal.html` for the ≈2-min no-jargon route): `v3/verhaal.html`'s own eyebrow states
  "± 2 minuten · geen technische kennis nodig" (`v3/verhaal.html:32`). Word count for the prose a
  persona-1 reader would actually read (hero paragraph + 4 `.lead-text` paragraphs + 6-item
  timeline, excluding scanned demo-card titles) is ≈330 words by manual count — under V2's ≈412
  and comfortably under the ≈2-min/400-word budget at 200 wpm. Every jargon term on `verhaal.html`
  (`AI`, `Voice Mode`, `acceptatiecriteria`, `autonome`, `browserprogramma's`, `orchestrator`) is
  wrapped in the same `<details class="jargon">` pattern V2 pioneered (`v3/verhaal.html:34-52`),
  restyled onto the dark palette (`v3.css:442-475`). The five demo `.play-btn` cards sit directly
  under the timeline on `verhaal.html`, same relative position as V2's flagged layout — see
  **Part C finding M1** for why this is *not* confirmed safe on mobile without a real render.
  **Passes the reading-time test on the same evidence standard V2 used to fail it**; the
  demo-reachability question is unresolved pending a real render (carried over from V2, not newly
  introduced by V3).

**Q2: Is V3 visually and informationally better than V1 and V2 for this persona?**

**Verdict: BETTER than V1. BETTER than V2 (with one open caveat).**

Better than V1 because V1 has no jargon disclosures and no dedicated non-technical entry point at
all — a front-desk reader lands straight in prose that assumes familiarity with "Hermes",
"orchestrator" and "modelaanbieder". Better than V2 because V3 keeps V2's jargon-disclosure and
timeline mechanism *and* restores the colour, card structure and play-button affordance V2
dropped — `verhaal.html`'s demo cards use the same green-gradient `.play-btn`
(`v3.css:331-354`, byte-identical gradient/shadow values to `index.html:14`'s `.demo-cta a`) and
per-challenge accent colours (`c-green`/`c-blue`/`c-purple`/`c-yellow`/`c-orange`,
`v3.css:380-384`), which V2's plain black-on-white `.demo-card` never had. The open caveat is
that V3's demo-grid-below-timeline layout is structurally the same pattern V2's own review flagged
as unconfirmed (**F01** in `v2/REVIEW.md`); V3 does not resolve that open question, it inherits
it. See Part C.

### Persona 2 — Clinical colleague (physician / nurse)

**Q1: 2-minute test.**

Evidence gathered by direct `grep -n -i 'klinisch'` / `grep -n -i 'clinical'` over every candidate
page (re-run for this repair; commands and full matches below):

```
$ grep -n -i 'klinisch' v3/index.html v3/verhaal.html v3/hoe-kan-ai-dit.html v3/onder-de-motorkap.html v3/zelf-bouwen.html
v3/index.html:97:<p class="desc">Een natuurkundig onderzoeksdemo: verstuur een elektronenbundel door een proefobject en bekijk de dosisverdeling. Geen klinisch apparaat, wel een echte simulatie op basis van publieke NIST-data.</p>

$ grep -n -i 'clinical' v3/en/index.html v3/en/verhaal.html v3/en/hoe-kan-ai-dit.html v3/en/onder-de-motorkap.html v3/en/zelf-bouwen.html
v3/en/index.html:97:<p class="desc">A physics research demo: send an electron beam through a test object and view the dose distribution. Not a clinical device, but a genuine simulation based on public NIST data.</p>

$ grep -n -i 'klinisch' v2/*.html
v2/hoe-kan-ai-dit.html:42:<p>Niet elk resultaat is voor elk doel geschikt. De Electron Dose Lab-demo bijvoorbeeld is een natuurkundig onderzoeksdemo op basis van publieke NIST-data: geen klinisch apparaat en geen klinisch gevalideerd doseersysteem.</p>
v2/onder-de-motorkap.html:111:<p>Niet elk resultaat is voor elk doel geschikt. De Electron Dose Lab-demo bijvoorbeeld is een natuurkundig onderzoeksdemo op basis van publieke NIST-data: geen klinisch apparaat en geen klinisch gevalideerd doseersysteem.</p>
v2/zelf-bouwen.html:93:...en niet elk resultaat is voor elk doel geschikt: de Electron Dose Lab-demo bijvoorbeeld is een natuurkundig onderzoeksdemo op basis van publieke NIST-data, geen klinisch apparaat en geen klinisch gevalideerd doseersysteem.</p>
v2/index.html:59:<p class="muted">Een natuurkundig onderzoeksdemo: verstuur een elektronenbundel door een proefobject en bekijk de dosisverdeling. Geen klinisch apparaat, wel een echte simulatie op basis van publieke NIST-data.</p>
v2/wat-is-er-gebeurd.html:57:<p class="muted">Een natuurkundig onderzoeksdemo: verstuur een elektronenbundel door een proefobject en bekijk de dosisverdeling. Geen klinisch apparaat, wel een echte simulatie op basis van publieke NIST-data.</p>
```

This overturns the previous version of this section, which claimed the caveat was on "every page
that lists it" — it is not. The corrected picture:

- **V1**: no clinical safety caveat anywhere on `index.html` or any other root page (the
  "geen klinisch apparaat" wording does not exist in V1 at all — confirmed, no matches). A
  clinical reader could reasonably misread "Electron Dose Lab" as clinically relevant dosing
  tooling. **Fails** on this specific safety-framing point.
- **V2**: the caveat appears on **all five** V2 pages that contain the string `klinisch`
  (`v2/index.html:59`, `v2/wat-is-er-gebeurd.html:57`, `v2/hoe-kan-ai-dit.html:42`,
  `v2/onder-de-motorkap.html:111`, `v2/zelf-bouwen.html:93`) — i.e. every V2 page that mentions
  the demo at all carries the caveat, including V2's own homepage. **Passes**, per
  `v2/REVIEW.md`'s own PASS verdict for this persona.
- **V3**: the caveat exists on exactly **two of ten** V3 files: `v3/index.html:97` and its EN
  mirror `v3/en/index.html:97`. It is **absent** from `v3/verhaal.html:81`
  ("Een natuurkundige simulatie van een elektronenbundel, op basis van publieke NIST-data." —
  no clinical qualifier at all) and its EN mirror `v3/en/verhaal.html:81`
  ("A physics simulation of an electron beam, based on public NIST data."); absent from the
  `v3/onder-de-motorkap.html` closing summary table's Electron Dose Lab row (line 137, a bare
  Open/Repo/Commits link row with no description text) and its EN mirror; and absent from
  `v3/hoe-kan-ai-dit.html`, which does not mention Electron Dose Lab or dosing at all (zero
  matches for "electron"/"dose"), unlike `v2/hoe-kan-ai-dit.html:42` which does carry the
  caveat. **`v3/index.html` alone passes; the ≈2-minute `verhaal.html` route this persona is
  steered to for the Q1 test fails**, since that is precisely the page a clinical reader
  skimming for ≈2 minutes would read the demo description on, and it gives no clinical framing
  at all.

**Q2: Better than V1 and V2?**

**Verdict: BETTER than V1. EQUAL to V2 at best (on the homepage only) — WORSE than V2 on the
`verhaal.html` route.**

Better than V1 because V1 has no clinical caveat anywhere, and V3's homepage does
(`v3/index.html:97`). But the claim in the previous version of this review that V3 is a "direct
improvement V3 makes over V2's own reviewed baseline" was false and is retracted: V2 attaches the
caveat to every page that mentions the demo (5/5), while V3 attaches it to only 1 of its 5 NL
pages (`index.html`) and drops it from the exact page (`verhaal.html`) that this persona is most
likely to land on and read in full under the job's own ≈2-minute, no-technical-knowledge framing,
as well as from the deeper `onder-de-motorkap.html` table and the conceptual `hoe-kan-ai-dit.html`
page where V2 kept it. This is a genuine regression relative to V2's baseline, not an improvement,
and is recorded as a MAJOR finding in Part D.

### Persona 3 — Physicist / AI-curious colleague

**Q1: 2-minute test (this persona is expected to go deeper than 2 minutes, but the entry should
still orient them fast).**

- **V1**: `how-we-built.html`'s hero and stats block (5/5, 37, 155, 2 vCPU) orient this persona
  immediately, and the deterministic-vs-AI table plus the 3D Path Planner Git-history walkthrough
  give exactly the kind of falsifiable detail this persona wants. Strong for this persona, but it
  is the *only* entry point at that depth — there is no gentler on-ramp for a physicist who is
  AI-curious but not yet sure they want the full architecture page.
- **V2**: `v2/hoe-kan-ai-dit.html` (the "How could AI do this itself?" conceptual page) plus
  `v2/onder-de-motorkap.html` give this persona a two-step on-ramp: concept first, architecture
  second — `v2/REVIEW.md` verdict: **PASS**.
- **V3**: `v3/hoe-kan-ai-dit.html` reproduces the same two-step on-ramp (conceptual
  plan→build→test→review→fix→record loop as a 6-node `.loop-diagram`,
  `v3/hoe-kan-ai-dit.html:40-47`) *and* restores the stats block, the deterministic-vs-AI table
  and the Git-history walkthrough from `how-we-built.html` on `v3/onder-de-motorkap.html`
  (`v3/onder-de-motorkap.html:47-52, 93-100, 106-122`) — content V2 also carried, but on V2's flat
  light-mode `.tech-table`/`.stat`, versus V3's dark, coloured, V1-style
  `.tech-table`/`.fact-tile`/`.diagram-figure`. The `.tech-aside` "Zo heet dit technisch" box
  (`v3/hoe-kan-ai-dit.html:62-72`) is a V3-specific addition over both V1 and V2: it names
  Brain/Worker/Reviewer/Hermes/Git/model as *optional* asides on the conceptual page itself, so
  this persona can bridge from concept to correct vocabulary without leaving the page.

**Q2: Better than V1 and V2?**

**Verdict: BETTER than V1. BETTER than V2.**

Better than V1 because V3 adds the gentler conceptual on-ramp V1 never had, without removing any
of V1's architecture depth (all of it is reproduced on `onder-de-motorkap.html`, see the rejection
tests below). Better than V2 because the same conceptual/architecture split is restyled onto V1's
dark, coloured, diagram-rich system instead of V2's plain light document, and gains the
`.tech-aside` vocabulary bridge V2 didn't have.

### Persona 4 — ICT / software specialist

**Q1: 2-minute test (fast orientation, not full depth in 2 min).**

- **V1**: `how-we-built.html` + `build-your-own.html` + `install-howto.html` give full technical
  depth but split across three separate pages with three separate inline `<style>` blocks and no
  single "start here" for a reader who wants the summary before the 12-step manual. Machine specs,
  model routing and the concrete Git example are all present and precise (verified figures:
  "2 vCPU, 3,7 GiB RAM, 2 GiB swap", "38 GB root volume... circa 28 GB gebruikt", Python 3.14.4,
  Node v24.21.0, Git 2.53.0 — `how-we-built.html:8`).
- **V2**: `v2/onder-de-motorkap.html` + `v2/zelf-bouwen.html` reuse the same figures verbatim
  (`v2/REVIEW.md`'s own spot-check confirms verbatim matches) with a single clear entry point
  into the 12-step guide. **PASS** per `v2/REVIEW.md`.
- **V3**: `v3/onder-de-motorkap.html` reuses the identical stats/table (`v3/onder-de-motorkap.html:106-122`,
  verbatim match to `how-we-built.html:4,8`) and adds all three architecture/workflow/review-loop
  diagrams as live `<img>`/`<picture>` embeds (`v3/onder-de-motorkap.html:42-45, 59-65, 72-83`) —
  diagrams that exist in `assets/` but are **not** `<img>`-embedded on any root V1 page (confirmed
  in `v3/DESIGN.md`'s asset audit: `architecture-*.svg` and `development-loop-*.svg` are "present
  and unused" on root pages today). `v3/zelf-bouwen.html` gives the same 12-step structure as
  `install-howto.html`, each step linking to the exact original `#id` anchor rather than
  duplicating command blocks (all 13 anchors verified present in both `install-howto.html` and
  `install-howto-en.html`, see Part B).

**Q2: Better than V1 and V2?**

**Verdict: BETTER than V1. BETTER than V2.**

Better than V1 because this persona gets a single-page architecture summary with all diagrams
inline (V1 never embeds `architecture-*.svg` or `development-loop-*.svg` on any page) plus a
direct one-link jump to the full original pages for exact commands — nothing from V1 is lost, and
navigation is faster. Better than V2 because the same content sits inside V1's dark,
colour-accented, diagram-forward system rather than V2's plain light document, and V3 embeds two
diagrams V2 never used at all (`architecture-*.svg`, `development-loop-*.svg` — V2's
`onder-de-motorkap.html` only embeds `workflow-polished-*.svg` and `review-loop-polished-*.svg`
per `v2/ARCHITECTURE.md:79-89`).

### Persona verdict summary

**Superseded by the `v3-07` rework batch below — see "Rework log (v3-07)" for the current table.**
Table as it stood before that batch (kept for the record):

| Persona | V3 vs V1 | V3 vs V2 |
|---|---|---|
| 1. Non-technical admin/secretarial | BETTER | BETTER (one open mobile-layout caveat shared with V2, see M1) |
| 2. Clinical colleague | BETTER | EQUAL on the homepage only; WORSE on the `verhaal.html` route (dropped caveat, see Part D finding 1) |
| 3. Physicist / AI-curious | BETTER | BETTER |
| 4. ICT / software specialist | BETTER | BETTER |

---

## Rejection tests (explicit PASS/FAIL, per job spec)

### (a) Design has not become generic/document-like — **PASS**

Evidence: `v3.css` reproduces V1's card/badge/CTA/diagram-frame structure verbatim in intent
(compare `v3.css:295-384` demo-card/play-btn/badge rules to `index.html:10-14`'s
`.card`/`.badge`/`.demo-cta`), keeps five distinct per-challenge accent colours
(`.c-blue/.c-purple/.c-green/.c-yellow/.c-orange`, `v3.css:380-384`), a multi-column desktop
layout at three breakpoints (`.demo-grid` → 3 cols at 1000px, `.depth-grid` → 4 cols at 1000px,
`.timeline` → 6 cols at 900px, `v3.css:626-648`), and the `.diagram-figure`/`.tech-table` V1-style
components. This is the opposite of V2's single 44rem column at every breakpoint
(`v2/ARCHITECTURE.md:130-133`'s own self-diagnosis).

### (b) Not overly white/light — **PASS**

`v3.css:5-30`'s `:root` palette is dark throughout: `--bg:#0d1117`, `--bg-deep:#07111f`,
`--panel:#161b22`, `--panel-2:#0e1b2b`, `--ink:#e6edf3` — every one of these hex values is copied
verbatim from V1 (`v3/DESIGN.md`'s §a token table cites the identical values from `index.html`
and `how-we-built.html`). The only light-background region in the whole stylesheet is
`.diagram-figure { background: #fff; }` (`v3.css:668-674`), used exclusively as a white frame
around the 6 reused SVG diagrams (which themselves have white/transparent canvases). This is not
a new choice — it reproduces V1's own `.figure-card{background:#fff}` rule verbatim
(`how-we-built.html:3`), which V1 already used for the same purpose (framing
`workflow-polished-nl.svg`/`review-loop-polished-nl.svg`). No other section, card, table or text
block in `v3.css` uses a light background.

### (c) No source/GitHub links lost — **PASS**

`github.com/gert66` occurrence counts (via `grep -o 'github.com/gert66' <file>`, counting raw
string occurrences — note some pages repeat the URL as both `href` and visible link text, which
doubles the raw count relative to the number of distinct link elements):

| Page | Raw occurrences | Distinct `github.com/gert66` link elements |
|---|---|---|
| `index.html` (V1 root) | 2 (dynamic JS template, see note) | **10** at runtime (5 cards × Open repository + Commit history) |
| `how-we-built.html` (V1) | 7 | 7 (5 repo-grid tiles + 2 in the Path Planner concrete-example card) |
| `build-your-own.html` (V1) | 5 | 5 (repo-grid, no commit links) |
| `v3/index.html` | 10 | 10 (5 cards × repo + commits) |
| `v3/verhaal.html` | 0 | 0 (deliberately — this is the ≈2-min no-jargon route; still has 5 `gert66.github.io` play-buttons, see below) |
| `v3/hoe-kan-ai-dit.html` | 0 | 0 (conceptual page; links onward to `onder-de-motorkap.html` and root `how-we-built.html`/`prompt-chain.html` instead) |
| `v3/onder-de-motorkap.html` | 12 | 12 (2 in the Path Planner concrete example + 5 repo + 5 commits in the closing table) |
| `v3/zelf-bouwen.html` | 10 raw (5 links, URL repeated as visible text) | 5 (repo-only table) |
| `v3/en/*` (all 5) | identical to NL counterpart | identical (verified same DOM structure, `v3/DESIGN.md` batch notes for `v3-05`) |

**Note on the V1 root count:** `index.html`'s repo/commit links are generated at runtime by a JS
template (`https://github.com/gert66/${repo}` / `.../commits/${branch}`, `index.html:39`), so the
raw source-text grep count (2) undercounts the actual rendered count (10, one pair per of the 5
challenges in the `challenges` array, `index.html:21-27`). V3's equivalent is statically inlined
(10 literal occurrences on `index.html`), so the **rendered** counts are identical (10 = 10).

No V3 page has *fewer* GitHub links than its closest V1 counterpart once rendering is accounted
for; `onder-de-motorkap.html` alone (12) exceeds `how-we-built.html` (7) because it also carries
the summary table `how-we-built.html` doesn't have. The two zero-count V3 pages
(`verhaal.html`, `hoe-kan-ai-dit.html`) are the deliberate non-technical/conceptual depth layers
— by the job's own progressive-disclosure requirement these should be link-light, and both still
carry the `gert66.github.io` **demo** play-buttons (`verhaal.html`) or a direct route to the
pages that do carry repo links (`hoe-kan-ai-dit.html` → `onder-de-motorkap.html`, one click). V2
for comparison has **zero** commit-history links anywhere (`v2/ARCHITECTURE.md:134-135`'s own
admission: "No GitHub-forward affordances beyond a single 'Broncode' link per demo card... no
commit-history link, no repo tiles grid"), so V3 is a strict improvement over V2 on this test.

### (d) No diagrams lost — **PASS** (V3 uses strictly more diagrams than V1 ever embeds)

All 12 SVGs in `assets/` (verified via `ls assets/`):

| SVG (NL / EN pair) | Embedded as `<img>` on any V1 root page? | V3 reuse |
|---|---|---|
| `architecture-nl.svg` / `architecture-en.svg` | No — referenced only conceptually in `how-we-built.html` prose, never `<img>`-embedded (`v3/DESIGN.md` §a) | **Embedded**, `v3/onder-de-motorkap.html:42-45` (NL) / `v3/en/onder-de-motorkap.html:42-45` (EN) |
| `development-loop-nl.svg` / `development-loop-en.svg` | No — present, unused on root pages (`v3/DESIGN.md` §a) | **Embedded**, `v3/onder-de-motorkap.html:80-83` (NL) / EN equivalent |
| `workflow-polished-nl.svg` / `workflow-polished-en.svg` | Yes — `how-we-built.html:6` | **Embedded**, `v3/onder-de-motorkap.html:59-65` |
| `workflow-polished-mobile-nl.svg` / `-mobile-en.svg` | Yes — `<source media="(max-width:620px)">` on `how-we-built.html:6` | **Embedded**, same `<picture>`/`<source>` pattern, `v3/onder-de-motorkap.html:60-63` |
| `review-loop-polished-nl.svg` / `-en.svg` | Yes — `how-we-built.html:7` | **Embedded**, `v3/onder-de-motorkap.html:72-78` |
| `review-loop-mobile-nl.svg` / `-en.svg` | Yes — `<source>` on `how-we-built.html:7` | **Embedded**, same pattern, `v3/onder-de-motorkap.html:73-76` |

All 12 files (6 diagrams × NL/EN) are reused; none are omitted. V3 in fact embeds 2 diagrams
(`architecture-*`, `development-loop-*`) that V1 itself never surfaces as an image anywhere on the
existing site — this is new value added on top of V1, not a regression. V2's own
`onder-de-motorkap.html` only reuses `workflow-polished-*` and `review-loop-polished-*`
(`v2/ARCHITECTURE.md:79-89`), so V3 also strictly exceeds V2's diagram reuse.

### (e) Technical richness not hidden — **PASS**

Click-distance from `v3/index.html` to each V1 technical topic (a link present in the page's own
markup counts as reachable in 1 click; content visible inline on `v3/index.html` itself counts as
0 clicks):

| Topic | Reachable from `v3/index.html` in |
|---|---|
| Orchestrator (name + 1-line gloss) | 0 clicks — inline `<details class="jargon">` in the hero timeline, step 5 (`v3/index.html:51`) |
| Orchestrator (full architecture) | 1 click — depth-card → `onder-de-motorkap.html` |
| Hermes (name + 1-line gloss) | 0 clicks — named in the "Onder de motorkap" depth-card description (`v3/index.html:141`) |
| Hermes (full section) | 1 click — `onder-de-motorkap.html` "Hermes, de modellen en Git" |
| Models / provider routing | 1 click — same section |
| Git workflow (real evidence) | 0 clicks — "Commit history" links sit directly on the homepage demo cards (`v3/index.html:68` etc., external) |
| Git workflow (narrated, with commit-name sequence) | 1 click — `onder-de-motorkap.html` "Een concreet voorbeeld in Git" |
| Review loop (conceptual) | 1 click — `hoe-kan-ai-dit.html` |
| Review loop (technical, with PASS/FAIL/NEEDS_HUMAN + diagrams) | 1 click — `onder-de-motorkap.html` |
| Architecture diagram | 1 click — `onder-de-motorkap.html` |
| VM / cost / install | 1 click — `zelf-bouwen.html` (V3 summary) or footer → root `build-your-own.html`/`install-howto.html` (full original) |
| Prompt chain | 1 click — footer link "Van idee naar prompt" → root `prompt-chain.html`, present on every V3 page's footer |

Every one of the 8 required technical topics is reachable in 0–1 clicks from the homepage. None
require more than 1 click, and the deepest original material (`how-we-built.html`,
`prompt-chain.html`, `build-your-own.html`, `install-howto.html`) is always exactly 1 click away
via the footer on every single V3 page (`footer-links`, present identically on all 10 files).

### Bonus / Wietse parking-app section — **VERIFIED CORRECT**

`v3/index.html:155-162` (and EN mirror `v3/en/index.html:155-162`):
- Eyebrow explicitly reads "Bonus / vervolg — niet één van de oorspronkelijke vijf" /
  "Bonus / follow-on — not one of the original five" — labelled bonus/follow-on, explicitly
  **not** counted among the five original challenges.
- Body text states the idea "was geen onderdeel van de oorspronkelijke vijf challenges en is niet
  gebouwd tijdens de nacht die hierboven wordt beschreven" — explicitly disclaims that it was part
  of the original night's work.
- No live app link: the only interactive element is
  `<span class="disabled-link" aria-disabled="true" data-future-domain="parking.whofirst.nl">...Nog niet beschikbaar</span>`
  — an inert `<span>`, not an `<a href>`, with `aria-disabled="true"` and visible text "Not yet
  available" / "Nog niet beschikbaar". The domain `parking.whofirst.nl` only appears inside an
  HTML comment and a `data-*` attribute, never as a rendered, clickable, or crawlable link.
- No claim that `parking.whofirst.nl` is live: the paragraph explicitly says a real link will
  appear "zodra er een geverifieerde, werkende versie is" ("as soon as there is a verified,
  working version").
- Visually distinct: dashed yellow border (`border:1px dashed var(--yellow)`, `v3.css:566-572`)
  and a "In voorbereiding"/"In preparation" status chip, clearly differentiating it from the five
  real, playable demo cards above.

**No issues found in the bonus section.**

---

## Part B — Link and asset audit

**Method:** `python3 -c`/`python3 <file>.py` execution requires interactive approval in this
sandbox (confirmed again in this repair pass: both `python3 -c "print('hello')"` and
`python3 v3/review-audit.py` — a stdlib-only `html.parser`-based script written for this repair
and kept at `v3/review-audit.py` — hit "This command requires approval", including with the
sandbox-override flag), and no interactive approver exists in a non-interactive worker batch.
Per the task's own fallback instruction, the audit below is the **complete, unelided** per-file
`grep -n -o` output for `href="[^"]*"`, `src="[^"]*"` and `srcset="[^"]*"` across all 10
`v3/**/*.html` files, run and captured one file at a time (no sampling, no `[...]` elisions).

### Extraction commands and raw output — verbatim, every file, every match

```
$ grep -n -o 'href="[^"]*"' v3/index.html
9:href="assets/v3.css"
10:href="index.html"
11:href="en/index.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="en/index.html"
23:href="../index.html"
65:href="https://gert66.github.io/ai-agent-challenge-05-maze-chase/"
67:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase"
68:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase/commits/overnight/maze-chase-2026-09-16"
76:href="https://gert66.github.io/ai-overnight-challenge/mosse-tracker/"
78:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker"
79:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker/commits/overnight/mosse-tracker-2026-09-17"
87:href="https://gert66.github.io/ai-overnight-challenge/rubik-2x2/"
89:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2"
90:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2/commits/overnight/rubik-2x2-2026-09-17"
98:href="https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/"
100:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo"
101:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo/commits/overnight/electron-dose-lab-2026-09-17"
109:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
111:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
112:href="https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17"
124:href="verhaal.html"
131:href="hoe-kan-ai-dit.html"
138:href="onder-de-motorkap.html"
145:href="zelf-bouwen.html"
166:href="../how-we-built.html"
167:href="../prompt-chain.html"
168:href="../build-your-own.html"
169:href="../install-howto.html"
172:href="en/index.html"
(34 href matches; no src/srcset in this file)

$ grep -n -o 'href="[^"]*"' v3/verhaal.html
9:href="assets/v3.css"
10:href="verhaal.html"
11:href="en/verhaal.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="en/verhaal.html"
23:href="../index.html"
29:href="index.html"
64:href="https://gert66.github.io/ai-agent-challenge-05-maze-chase/"
70:href="https://gert66.github.io/ai-overnight-challenge/mosse-tracker/"
76:href="https://gert66.github.io/ai-overnight-challenge/rubik-2x2/"
82:href="https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/"
88:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
99:href="hoe-kan-ai-dit.html"
105:href="onder-de-motorkap.html"
111:href="zelf-bouwen.html"
122:href="../how-we-built.html"
123:href="../prompt-chain.html"
124:href="../build-your-own.html"
125:href="../install-howto.html"
128:href="en/verhaal.html"
(24 href matches; no src/srcset in this file)

$ grep -n -o 'href="[^"]*"' v3/hoe-kan-ai-dit.html
9:href="assets/v3.css"
10:href="hoe-kan-ai-dit.html"
11:href="en/hoe-kan-ai-dit.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="en/hoe-kan-ai-dit.html"
23:href="../index.html"
29:href="index.html"
49:href="onder-de-motorkap.html"
79:href="onder-de-motorkap.html"
86:href="../how-we-built.html"
93:href="../prompt-chain.html"
105:href="../how-we-built.html"
106:href="../prompt-chain.html"
107:href="../build-your-own.html"
108:href="../install-howto.html"
111:href="en/hoe-kan-ai-dit.html"
(20 href matches; no src/srcset in this file)

$ grep -n -o 'href="[^"]*"' v3/onder-de-motorkap.html
9:href="assets/v3.css"
10:href="onder-de-motorkap.html"
11:href="en/onder-de-motorkap.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="en/onder-de-motorkap.html"
23:href="../index.html"
29:href="index.html"
29:href="hoe-kan-ai-dit.html"
34:href="hoe-kan-ai-dit.html"
57:href="hoe-kan-ai-dit.html"
97:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
98:href="https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17"
99:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
129:href="../how-we-built.html"
130:href="../prompt-chain.html"
134:href="https://gert66.github.io/ai-agent-challenge-05-maze-chase/"
134:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase"
134:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase/commits/overnight/maze-chase-2026-09-16"
135:href="https://gert66.github.io/ai-overnight-challenge/mosse-tracker/"
135:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker"
135:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker/commits/overnight/mosse-tracker-2026-09-17"
136:href="https://gert66.github.io/ai-overnight-challenge/rubik-2x2/"
136:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2"
136:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2/commits/overnight/rubik-2x2-2026-09-17"
137:href="https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/"
137:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo"
137:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo/commits/overnight/electron-dose-lab-2026-09-17"
138:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
138:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
138:href="https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17"
147:href="zelf-bouwen.html"
154:href="hoe-kan-ai-dit.html"
165:href="../how-we-built.html"
166:href="../prompt-chain.html"
167:href="../build-your-own.html"
168:href="../install-howto.html"
171:href="en/onder-de-motorkap.html"
(41 href matches)

$ grep -n -o 'src="[^"]*"' v3/onder-de-motorkap.html
43:src="../assets/architecture-nl.svg"
62:src="../assets/workflow-polished-nl.svg"
75:src="../assets/review-loop-polished-nl.svg"
81:src="../assets/development-loop-nl.svg"
(4 src matches)

$ grep -n -o 'srcset="[^"]*"' v3/onder-de-motorkap.html
61:srcset="../assets/workflow-polished-mobile-nl.svg"
74:srcset="../assets/review-loop-mobile-nl.svg"
(2 srcset matches — 41+4+2 = 47 total refs on this file)

$ grep -n -o 'href="[^"]*"' v3/zelf-bouwen.html
9:href="assets/v3.css"
10:href="zelf-bouwen.html"
11:href="en/zelf-bouwen.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="en/zelf-bouwen.html"
23:href="../index.html"
29:href="index.html"
29:href="onder-de-motorkap.html"
35:href="../build-your-own.html"
35:href="../install-howto.html"
70:href="../install-howto.html#accounts"
76:href="../install-howto.html#sshkey"
82:href="../install-howto.html#hetzner"
88:href="../install-howto.html#connect"
94:href="../install-howto.html#software"
100:href="../install-howto.html#github"
106:href="../install-howto.html#agent"
106:href="../install-howto.html#desktopcommander"
112:href="../install-howto.html#env"
118:href="../install-howto.html#firstjob"
124:href="../install-howto.html#orchestrator"
124:href="onder-de-motorkap.html"
130:href="../install-howto.html#watchdog"
136:href="../install-howto.html#checklist"
155:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase"
156:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker"
157:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2"
158:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo"
159:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
167:href="onder-de-motorkap.html"
173:href="../build-your-own.html"
179:href="../install-howto.html"
190:href="../how-we-built.html"
191:href="../prompt-chain.html"
192:href="../build-your-own.html"
193:href="../install-howto.html"
196:href="en/zelf-bouwen.html"
(41 href matches; no src/srcset in this file)

$ grep -n -o 'href="[^"]*"' v3/en/index.html
9:href="../assets/v3.css"
10:href="../index.html"
11:href="index.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="../index.html"
23:href="../../index-en.html"
65:href="https://gert66.github.io/ai-agent-challenge-05-maze-chase/"
67:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase"
68:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase/commits/overnight/maze-chase-2026-09-16"
76:href="https://gert66.github.io/ai-overnight-challenge/mosse-tracker/"
78:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker"
79:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker/commits/overnight/mosse-tracker-2026-09-17"
87:href="https://gert66.github.io/ai-overnight-challenge/rubik-2x2/"
89:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2"
90:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2/commits/overnight/rubik-2x2-2026-09-17"
98:href="https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/"
100:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo"
101:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo/commits/overnight/electron-dose-lab-2026-09-17"
109:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
111:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
112:href="https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17"
124:href="verhaal.html"
131:href="hoe-kan-ai-dit.html"
138:href="onder-de-motorkap.html"
145:href="zelf-bouwen.html"
166:href="../../how-we-built-en.html"
167:href="../../prompt-chain-en.html"
168:href="../../build-your-own-en.html"
169:href="../../install-howto-en.html"
172:href="../index.html"
(34 href matches; no src/srcset in this file — identical count to v3/index.html)

$ grep -n -o 'href="[^"]*"' v3/en/verhaal.html
9:href="../assets/v3.css"
10:href="../verhaal.html"
11:href="verhaal.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="../verhaal.html"
23:href="../../index-en.html"
29:href="index.html"
64:href="https://gert66.github.io/ai-agent-challenge-05-maze-chase/"
70:href="https://gert66.github.io/ai-overnight-challenge/mosse-tracker/"
76:href="https://gert66.github.io/ai-overnight-challenge/rubik-2x2/"
82:href="https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/"
88:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
99:href="hoe-kan-ai-dit.html"
105:href="onder-de-motorkap.html"
111:href="zelf-bouwen.html"
122:href="../../how-we-built-en.html"
123:href="../../prompt-chain-en.html"
124:href="../../build-your-own-en.html"
125:href="../../install-howto-en.html"
128:href="../verhaal.html"
(24 href matches; no src/srcset — identical count to v3/verhaal.html)

$ grep -n -o 'href="[^"]*"' v3/en/hoe-kan-ai-dit.html
9:href="../assets/v3.css"
10:href="../hoe-kan-ai-dit.html"
11:href="hoe-kan-ai-dit.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="../hoe-kan-ai-dit.html"
23:href="../../index-en.html"
29:href="index.html"
49:href="onder-de-motorkap.html"
79:href="onder-de-motorkap.html"
86:href="../../how-we-built-en.html"
93:href="../../prompt-chain-en.html"
105:href="../../how-we-built-en.html"
106:href="../../prompt-chain-en.html"
107:href="../../build-your-own-en.html"
108:href="../../install-howto-en.html"
111:href="../hoe-kan-ai-dit.html"
(20 href matches; no src/srcset — identical count to v3/hoe-kan-ai-dit.html)

$ grep -n -o 'href="[^"]*"' v3/en/onder-de-motorkap.html
9:href="../assets/v3.css"
10:href="../onder-de-motorkap.html"
11:href="onder-de-motorkap.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="../onder-de-motorkap.html"
23:href="../../index-en.html"
29:href="index.html"
29:href="hoe-kan-ai-dit.html"
34:href="hoe-kan-ai-dit.html"
57:href="hoe-kan-ai-dit.html"
97:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
98:href="https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17"
99:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
129:href="../../how-we-built-en.html"
130:href="../../prompt-chain-en.html"
134:href="https://gert66.github.io/ai-agent-challenge-05-maze-chase/"
134:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase"
134:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase/commits/overnight/maze-chase-2026-09-16"
135:href="https://gert66.github.io/ai-overnight-challenge/mosse-tracker/"
135:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker"
135:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker/commits/overnight/mosse-tracker-2026-09-17"
136:href="https://gert66.github.io/ai-overnight-challenge/rubik-2x2/"
136:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2"
136:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2/commits/overnight/rubik-2x2-2026-09-17"
137:href="https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/"
137:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo"
137:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo/commits/overnight/electron-dose-lab-2026-09-17"
138:href="https://gert66.github.io/ai-overnight-challenge/path-planner/"
138:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
138:href="https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17"
147:href="zelf-bouwen.html"
154:href="hoe-kan-ai-dit.html"
165:href="../../how-we-built-en.html"
166:href="../../prompt-chain-en.html"
167:href="../../build-your-own-en.html"
168:href="../../install-howto-en.html"
171:href="../onder-de-motorkap.html"
(41 href matches)

$ grep -n -o 'src="[^"]*"' v3/en/onder-de-motorkap.html
43:src="../../assets/architecture-en.svg"
62:src="../../assets/workflow-polished-en.svg"
75:src="../../assets/review-loop-polished-en.svg"
81:src="../../assets/development-loop-en.svg"
(4 src matches)

$ grep -n -o 'srcset="[^"]*"' v3/en/onder-de-motorkap.html
61:srcset="../../assets/workflow-polished-mobile-en.svg"
74:srcset="../../assets/review-loop-mobile-en.svg"
(2 srcset matches — 41+4+2 = 47 total refs, identical to v3/onder-de-motorkap.html)

$ grep -n -o 'href="[^"]*"' v3/en/zelf-bouwen.html
9:href="../assets/v3.css"
10:href="../zelf-bouwen.html"
11:href="zelf-bouwen.html"
16:href="index.html"
18:href="verhaal.html"
19:href="hoe-kan-ai-dit.html"
20:href="onder-de-motorkap.html"
21:href="zelf-bouwen.html"
22:href="../zelf-bouwen.html"
23:href="../../index-en.html"
29:href="index.html"
29:href="onder-de-motorkap.html"
35:href="../../build-your-own-en.html"
35:href="../../install-howto-en.html"
70:href="../../install-howto-en.html#accounts"
76:href="../../install-howto-en.html#sshkey"
82:href="../../install-howto-en.html#hetzner"
88:href="../../install-howto-en.html#connect"
94:href="../../install-howto-en.html#software"
100:href="../../install-howto-en.html#github"
106:href="../../install-howto-en.html#agent"
106:href="../../install-howto-en.html#desktopcommander"
112:href="../../install-howto-en.html#env"
118:href="../../install-howto-en.html#firstjob"
124:href="../../install-howto-en.html#orchestrator"
124:href="onder-de-motorkap.html"
130:href="../../install-howto-en.html#watchdog"
136:href="../../install-howto-en.html#checklist"
155:href="https://github.com/gert66/ai-agent-challenge-05-maze-chase"
156:href="https://github.com/gert66/ai-agent-challenge-01-mosse-tracker"
157:href="https://github.com/gert66/ai-agent-challenge-02-rubik-2x2"
158:href="https://github.com/gert66/ai-agent-challenge-03-monte-carlo"
159:href="https://github.com/gert66/ai-agent-challenge-04-path-planner"
167:href="onder-de-motorkap.html"
173:href="../../build-your-own-en.html"
179:href="../../install-howto-en.html"
190:href="../../how-we-built-en.html"
191:href="../../prompt-chain-en.html"
192:href="../../build-your-own-en.html"
193:href="../../install-howto-en.html"
196:href="../zelf-bouwen.html"
(41 href matches; no src/srcset — identical count to v3/zelf-bouwen.html)
```

**Totals (counted from the `grep -o` output above, `grep -o '...' file | grep -c '.'` per file,
cross-checked against an independent reviewer's own stdlib-Python audit of the same 10 files in a
prior pass, which reported the same figures):**

| File | href | src | srcset | total |
|---|---:|---:|---:|---:|
| `v3/index.html` | 34 | 0 | 0 | 34 |
| `v3/verhaal.html` | 24 | 0 | 0 | 24 |
| `v3/hoe-kan-ai-dit.html` | 20 | 0 | 0 | 20 |
| `v3/onder-de-motorkap.html` | 41 | 4 | 2 | 47 |
| `v3/zelf-bouwen.html` | 41 | 0 | 0 | 41 |
| `v3/en/index.html` | 34 | 0 | 0 | 34 |
| `v3/en/verhaal.html` | 24 | 0 | 0 | 24 |
| `v3/en/hoe-kan-ai-dit.html` | 20 | 0 | 0 | 20 |
| `v3/en/onder-de-motorkap.html` | 41 | 4 | 2 | 47 |
| `v3/en/zelf-bouwen.html` | 41 | 0 | 0 | 41 |
| **Total (10 files)** | **320** | **8** | **4** | **332** |

**332 total `href`/`src`/`srcset` references across all 10 files, 0 missing relative file
targets, 0 missing `#fragment` targets, 15 unique external `https://` URLs** — see the resolution
tables below, derived directly from the raw output above plus the file-existence and `id=`
checks in the following two sections.

### Relative file targets — resolution results

| Target (resolved from referencing file's directory) | Referenced from | Exists? |
|---|---|---|
| `v3/assets/v3.css` | all 10 pages (`assets/v3.css` or `../assets/v3.css`) | ✅ |
| `v3/index.html`, `v3/verhaal.html`, `v3/hoe-kan-ai-dit.html`, `v3/onder-de-motorkap.html`, `v3/zelf-bouwen.html` | topnav + depth-grid + footer links on all 10 pages | ✅ all 5 exist |
| `v3/en/index.html`, `v3/en/verhaal.html`, `v3/en/hoe-kan-ai-dit.html`, `v3/en/onder-de-motorkap.html`, `v3/en/zelf-bouwen.html` | lang-switch pills on all 10 pages | ✅ all 5 exist |
| `index.html`, `index-en.html` (repo root) | `.v1-link` pill on all 10 pages | ✅ both exist |
| `how-we-built.html` / `-en.html`, `prompt-chain.html` / `-en.html`, `build-your-own.html` / `-en.html`, `install-howto.html` / `-en.html` (repo root) | footer-links on all 10 pages, plus depth-grid links on `hoe-kan-ai-dit.html`/`zelf-bouwen.html` and their EN mirrors | ✅ all 8 exist |
| `assets/architecture-nl.svg`, `assets/architecture-en.svg` | `onder-de-motorkap.html` / EN mirror | ✅ both exist |
| `assets/development-loop-nl.svg`, `assets/development-loop-en.svg` | same | ✅ both exist |
| `assets/workflow-polished-nl.svg` + `-mobile-nl.svg`, `-en.svg` + `-mobile-en.svg` | same | ✅ all 4 exist |
| `assets/review-loop-polished-nl.svg` + `review-loop-mobile-nl.svg`, `-en.svg` + `-mobile-en.svg` | same | ✅ all 4 exist |

**Missing relative file targets found: 0.**

### Fragment (`#id`) targets — resolution results

`grep -oE 'href="#'` across all 10 `v3/**/*.html` files returns **zero matches** — V3 uses no
same-page anchors. All `#fragment` usage is cross-file, into `install-howto.html` /
`install-howto-en.html`, from `v3/zelf-bouwen.html` and `v3/en/zelf-bouwen.html`:

```
$ grep -oE 'id="[a-zA-Z-]+"' install-howto.html
id="accounts" id="sshkey" id="hetzner" id="connect" id="software" id="github" id="agent"
id="desktopcommander" id="env" id="firstjob" id="orchestrator" id="watchdog" id="checklist"

$ grep -oE 'id="[a-zA-Z-]+"' install-howto-en.html
id="accounts" id="sshkey" id="hetzner" id="connect" id="software" id="github" id="agent"
id="desktopcommander" id="env" id="firstjob" id="orchestrator" id="watchdog" id="checklist"
```

Both files expose the identical 13 ids, in the identical order. `v3/zelf-bouwen.html` links
`../install-howto.html#accounts` through `#checklist` (13 links, steps 1–12, step 7 uses two:
`#agent` and `#desktopcommander`); `v3/en/zelf-bouwen.html` links the `-en.html` equivalents.
Every one of the 13 anchors referenced from each file resolves to a real `id=` in the target file.

**Missing `#fragment` targets found: 0.**

### External URLs — deduplicated list and provenance check

15 unique `https://` URLs appear across all 10 V3 files (union of `gert66.github.io` demo links
and `github.com/gert66` repo/commit links; no other external domains are linked anywhere in V3):

| # | URL | Byte-identical to a URL in root `index.html` / `index-en.html`? |
|---|---|---|
| 1 | `https://gert66.github.io/ai-agent-challenge-05-maze-chase/` | ✅ literal in `index.html`'s `demoLinks` object |
| 2 | `https://gert66.github.io/ai-overnight-challenge/mosse-tracker/` | ✅ |
| 3 | `https://gert66.github.io/ai-overnight-challenge/rubik-2x2/` | ✅ |
| 4 | `https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/` | ✅ |
| 5 | `https://gert66.github.io/ai-overnight-challenge/path-planner/` | ✅ |
| 6 | `https://github.com/gert66/ai-agent-challenge-05-maze-chase` | ✅ resolves from `index.html`'s `https://github.com/gert66/${repo}` template with `repo="ai-agent-challenge-05-maze-chase"` (`index.html:22,39`) — `repo` is inserted with no encoding, so this renders byte-identical |
| 7 | `https://github.com/gert66/ai-agent-challenge-05-maze-chase/commits/overnight/maze-chase-2026-09-16` | ❌ **EXCEPTION** — no literal or template-rendered byte-identical match in any root page; URL-equivalent on GitHub (percent-encoded slash resolves identically). See note below. |
| 8 | `https://github.com/gert66/ai-agent-challenge-01-mosse-tracker` | ✅ (`index.html:23`) — `repo` not encoded |
| 9 | `.../ai-agent-challenge-01-mosse-tracker/commits/overnight/mosse-tracker-2026-09-17` | ❌ **EXCEPTION** — same reason as #7 |
| 10 | `https://github.com/gert66/ai-agent-challenge-02-rubik-2x2` | ✅ (`index.html:24`) — `repo` not encoded |
| 11 | `.../ai-agent-challenge-02-rubik-2x2/commits/overnight/rubik-2x2-2026-09-17` | ❌ **EXCEPTION** — same reason as #7 |
| 12 | `https://github.com/gert66/ai-agent-challenge-03-monte-carlo` | ✅ (`index.html:25`) — `repo` not encoded |
| 13 | `.../ai-agent-challenge-03-monte-carlo/commits/overnight/electron-dose-lab-2026-09-17` | ❌ **EXCEPTION** — same reason as #7 |
| 14 | `https://github.com/gert66/ai-agent-challenge-04-path-planner` | ✅ (`index.html:26`) — also byte-identical to the literal (non-templated) repo link in `how-we-built.html`'s concrete-example card |
| 15 | `.../ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17` | ✅ — byte-identical to `how-we-built.html:7`'s literal, non-templated "Bekijk de challenge-commits" link (verified with `grep`, this exact string is hardcoded there, unlike #7/#9/#11/#13 which only exist as JS-template output) |

**Note on verification method:** `index.html`'s repo links are built at runtime from a JS
template (`https://github.com/gert66/${repo}`, `index.html:39`) driven by the `challenges` array
(`index.html:21-27`). Since `repo` values (e.g. `ai-agent-challenge-05-maze-chase`) contain no
characters requiring percent-encoding, URLs #6, #8, #10, #12, #14 render byte-identical to their
V3 counterparts. Commit-history URLs, however, are built as
`` `https://github.com/gert66/${repo}/commits/${encodeURIComponent(branch)}` `` (`index.html:39`),
and `branch` values contain a literal `/` (e.g. `overnight/maze-chase-2026-09-16`).
`encodeURIComponent` percent-encodes that slash, so `index.html` actually renders
`.../commits/overnight%2Fmaze-chase-2026-09-16`, **not** `.../commits/overnight/maze-chase-2026-09-16`
as used in V3's static `href`. No root page contains these four commit URLs in the exact form V3
uses, either as a literal string or as rendered output — they are listed as exceptions (#7, #9,
#11, #13). The one commit URL that is genuinely byte-identical is #15 (path-planner), because
`how-we-built.html:7` hardcodes it as a literal, non-templated link
(`https://github.com/gert66/ai-agent-challenge-04-path-planner/commits/overnight/path-planner-2026-09-17`)
that does not go through `encodeURIComponent` at all.

**Exceptions (URLs in V3 not byte-identical to any root URL): 4** (#7, #9, #11, #13 — the
maze-chase, mosse-tracker, rubik-2x2 and monte-carlo/electron-dose-lab commit-history links).
All four are still URL-equivalent on GitHub (a percent-encoded `%2F` in a path segment resolves
identically to a literal `/` per the URL spec and GitHub's own routing), so they are not broken
links — but they fail the job's stricter "byte-identical" bar and are recorded honestly rather
than rounded up to a pass.

**No external URLs were fetched or contacted** (per the batch's hard limit); this is a provenance
check (does the same URL string already appear/resolve in the existing, already-reviewed root
site), not a liveness check.

---

## Part C — Mobile and desktop check (static — no headless browser available)

`which chromium`, `which chromium-browser`, `which google-chrome` all returned exit code 1 (not
found) inside this sandbox, checked both with and without the sandbox-disable flag. `python3 -c`/
script-file execution (needed to probe for the Playwright Python package) also requires approval
that is unavailable in this non-interactive batch (see the sandbox note at the top of this file).
**No rendered screenshots were produced; `v3/review-shots/` does not exist and is not claimed.**
The following is a static CSS/HTML audit instead.

### Breakpoints in `v3.css` and per-component mobile rules

| Breakpoint | What changes |
|---|---|
| (default, mobile-first) | `.fact-tiles` 2-col, `.demo-grid` 1-col, `.depth-grid` 1-col, `.timeline` 1-col, `.loop-diagram` 1-col, `.step-list` 1-col, `.checklist` 1-col — every grid has an explicit single/narrow-column mobile rule as the *base* rule, not an override |
| `min-width: 620px` | `.fact-tiles` → 5-col; `.depth-grid` → 2-col |
| `min-width: 700px` | `.checklist` → 2-col |
| `min-width: 760px` | `.demo-grid` → 2-col |
| `min-width: 900px` | `.timeline` → 6-col; `.loop-diagram` → 6-col |
| `min-width: 1000px` | `.demo-grid` → 3-col; `.depth-grid` → 4-col |
| `max-width: 620px` | `.topbar` stacks vertically, `.hero` padding reduced |
| `max-width: 700px` | `.tech-table` → `display:block; overflow-x:auto` (horizontal-scroll wrapper, same accepted pattern `v2.css` used for its tables) |
| `prefers-reduced-motion: reduce` | hover transforms/transitions disabled |

Every grid named in the task (fact tiles, timeline, demo grid, depth grid) has a confirmed
single/narrow-column mobile rule as its default, un-media-queried state — none require a
`min-width` media query to become usable on a narrow screen; the media queries only ever *add*
columns for wider viewports. The `<picture>`/`<source media="(max-width:620px)">` pattern used
for the three diagram images picks a purpose-built mobile SVG variant below 620px, identical to
V1's own pattern in `how-we-built.html`.

### Fixed pixel widths / potential overflow sources

- No `.demo-grid`, `.depth-grid`, `.timeline`, `.fact-tiles`, `.checklist` or `.step-list` rule
  uses a fixed pixel width or a `min-width` on the grid container itself — all use `1fr`/`auto`
  tracks. `--max: 1180px` on `main` is a `max-width` cap, not a fixed width, so it cannot force
  overflow below 1180px.
- `.jargon-def { max-width: 22rem }` (352px) is the one component whose cap could, in principle,
  exceed the available content width at very narrow viewports (`main` padding is `0 18px`, so a
  375px viewport leaves ≈339px of content width). Because `.jargon-def` is a block-level child of
  an `inline-block` `<details>`, its shrink-to-fit width is constrained by the width of its
  containing block during layout, so mainstream browsers should clamp it below 339px rather than
  overflow — but this interaction was not confirmed with an actual renderer. **See finding M2.**
- `.tech-table` is the only component with real overflow risk (multi-column data tables), and it
  is explicitly wrapped in `overflow-x:auto` below 700px (`v3.css:727-729`) — the same
  accepted-pattern V2 used for its own tables (`v2/REVIEW.md`'s own audit treated the equivalent
  `.table-scroll` rule as "not a finding").
- No `<pre>` or fixed-width `<table>` outside `.tech-table` exists anywhere in V3 (confirmed via
  the full `Read` of all 10 files — the only tables are the four `.tech-table` instances on
  `onder-de-motorkap.html`/`zelf-bouwen.html` and their EN mirrors).

**Conclusion: no confirmed horizontal-overflow source; one unconfirmed edge case (M2).**

### Tap targets — computed from CSS box model (not measured on a device)

- `a.play-btn`: `padding: 14px 16px`, `font-size: 16.5px` — computed height ≈ 16.5×1.6 (inherited
  line-height) + 28 (padding) ≈ 54px. **Well above 40px. PASS.**
- `.depth-card` (whole card is the clickable `<a>`): `padding: 18px 20px` plus multi-line content
  — height far exceeds 40px. **PASS.**
- `.topnav a`: `padding: 6px 4px`, `font-size: 14px` (topnav's own rule) — computed height ≈
  14×1.6 + 12 ≈ 34.4px. **Below the 40px guideline.** Repeated on every one of the 10 pages'
  top navigation (4 links per page). **See finding Mi1.**
- `a.pill` (language switch + "original technical site" pill): `padding: 8px 13px`, `font-size:
  13px` — computed height ≈ 13×1.6 + 16 ≈ 36.8px. **Below 40px**, though close. **See finding
  Mi1.**
- `.demo-links a` ("Open repository" / "Commit history" — the GitHub source-link affordance the
  job spec specifically requires to survive into V3): **no padding is declared at all** on this
  rule (`v3.css:368-377`) — computed height ≈ 13.5×1.6 ≈ 21.6px, the smallest tap target found
  anywhere in `v3.css` and well under half the 40px guideline. This is the single most concrete,
  CSS-provable tap-target finding in this review, and it sits on exactly the affordance the job
  spec calls out by name ("retain source/GitHub links"). **See finding Ma1 (MAJOR).**

### Font sizes below 14px

`.badge` (11.5px), `.depth-card .tag` (11px), `.eyebrow` (12px), `.fact-tile span` (12.5px),
`a.pill` (13px), `.loop-node .loop-num`/`.timeline .tstep` (12px, single-digit decorative
numerals, not body text). All of these are caption/meta/badge text, not primary reading copy —
the same category V2's own review explicitly declined to flag ("normal for captions/table cells
rather than primary body copy", `v2/REVIEW.md`'s Mobile check section). Several of these sizes
(`.badge` 12px, `.eyebrow`/tag-style pills) are inherited directly from V1's own
`index.html:11 .badge{font-size:12px}` — i.e. this is V1's original sizing, not a V3 regression.
Primary body text throughout V3 is 16px (`body{font-size:16px}`, `v3.css:46`), and `.hero .lead`
is 19px — both comfortably above 14px. **Not flagged as a defect, but recorded per the task's
explicit check.**

---

## Part D — Prioritized rework list

**No BLOCKER-level findings.** No missing files, no missing fragment targets, no lost GitHub/source
links, no lost diagrams, no fabricated bonus-domain claim, and no evidence of a broken/incomplete
page in either language. There are three **MAJOR** findings (below), the first newly identified in
this repair pass — a content regression versus V2, not a V1-comparison issue.

1. **MAJOR — dropped "geen klinisch apparaat" / "not a clinical device" caveat on
   `v3/verhaal.html:81`, `v3/onder-de-motorkap.html` (Electron Dose Lab table row, line 137) and
   both EN mirrors (`v3/en/verhaal.html:81`, `v3/en/onder-de-motorkap.html:137`), plus the
   conceptual page `v3/hoe-kan-ai-dit.html`/`v3/en/hoe-kan-ai-dit.html` (which never mentions
   Electron Dose Lab at all).**
   V2 attaches the clinical-safety caveat to every page that mentions the demo (`v2/index.html:59`,
   `v2/wat-is-er-gebeurd.html:57`, `v2/hoe-kan-ai-dit.html:42`, `v2/onder-de-motorkap.html:111`,
   `v2/zelf-bouwen.html:93` — 5/5). V3 only carries it on `v3/index.html:97` /
   `v3/en/index.html:97` (2/10 files); `v3/verhaal.html:81` reads "Een natuurkundige simulatie van
   een elektronenbundel, op basis van publieke NIST-data" with no clinical qualifier, and the
   `onder-de-motorkap.html` summary table row for Electron Dose Lab carries no description text at
   all. This is the exact page a clinical reader following the job's own ≈2-minute,
   no-technical-knowledge entry path would read (see Persona 2 above) — a genuine regression
   relative to V2's baseline. Proposed fix: append the same sentence used on
   `v3/index.html:97`/`v3/en/index.html:97` ("Geen klinisch apparaat, wel een echte simulatie op
   basis van publieke NIST-data." / "Not a clinical device, but a genuine simulation based on
   public NIST data.") to the Electron Dose Lab `.desc` paragraph on `verhaal.html` and its EN
   mirror, and add an equivalent one-line caveat to the `onder-de-motorkap.html` table (e.g. a
   `<small>` note under the table, matching V2's pattern) in both languages.

2. **MAJOR — `v3/assets/v3.css` `.demo-links a` (lines 368–377), all NL+EN pages that use it
   (`index.html`, `onder-de-motorkap.html`, `zelf-bouwen.html` + EN mirrors).**
   The "Open repository" / "Commit history" links — the exact GitHub source-link affordance the
   job spec requires V3 to retain — have no padding at all, giving a computed tap-target height
   of ≈22px, roughly half the 40px mobile guideline. Proposed fix: add
   `padding: 8px 2px; display: inline-flex; align-items: center;` (or similar) to `.demo-links a`
   so the clickable area grows without changing its visual appearance.

3. **MAJOR — unconfirmed mobile scroll depth to the demo grid, `v3/index.html` and
   `v3/verhaal.html` (both NL+EN).**
   The hero (with 5 fact-tiles on `index.html`) plus a 6-item single-column timeline run before
   the demo grid on mobile, the same structural pattern `v2/REVIEW.md` flagged as its own **F01**
   (demo grid estimated beyond one mobile screen). V3 does not clearly resolve this — it is
   plausible the 6-item V3 timeline is more compact than V2's 7-item one (shorter per-item text,
   see Part A's word-count comparison), but no renderer was available in this sandbox to confirm
   either way, and V3's `index.html` additionally carries a 5-tile fact grid V2 didn't have.
   Proposed fix: before shipping, render `v3/index.html` and `v3/verhaal.html` at 375×812 in an
   environment with a real browser and measure the actual scroll distance to the first `.play-btn`
   — downgrade this finding if it lands within one screen, otherwise consider trimming the
   fact-tiles/timeline copy on the smallest breakpoint.

4. **MINOR — `.topnav a` and `a.pill` tap targets, all 10 pages.**
   Computed heights (~34–37px) sit under the 40px guideline for the persistent top navigation and
   language-switch/"original site" pills. Less critical than finding 2 (this is secondary
   navigation, not the primary content affordance), but worth a small padding increase
   (`v3.css:123-149`) for consistency with the rest of the site's tap-target sizing.

5. **MINOR — several caption/badge/tag elements render below 14px** (`.badge` 11.5px,
   `.depth-card .tag` 11px, `.eyebrow` 12px, `.fact-tile span` 12.5px, `a.pill` 13px). Consistent
   with V1's own original sizing (`index.html`'s `.badge` is also ≤12px) and not primary reading
   text, so likely intentional, but flagged per the task's explicit font-size check. No fix
   proposed unless the orchestrator wants V3 to exceed V1's own accessibility baseline here.

6. **MINOR — `.jargon-def` (`v3.css:464-475`) `max-width: 22rem` (352px) exceeds the available
   content width at a 375px viewport (≈339px after `main`'s padding).** Layout-model reasoning
   suggests mainstream browsers will still clamp this to the available width rather than overflow
   (see Part C), but this was not confirmed with an actual renderer. Proposed fix: either lower
   the `max-width` slightly (e.g. `20rem`/320px) or add `width: min(22rem, 100%)` as a defensive
   clamp, and re-verify with a real render alongside finding 3.

7. **MINOR — external commit-history URLs #7, #9, #11, #13 (maze-chase, mosse-tracker, rubik-2x2,
   monte-carlo) are not byte-identical to any root page** (see Part B's External URLs section for
   the full explanation: `index.html`'s `encodeURIComponent(branch)` percent-encodes the `/` in
   the branch name, so the rendered root URL is `.../commits/overnight%2F...`, not V3's
   `.../commits/overnight/...`). URL-equivalent on GitHub, not a broken link, but not a strict
   byte-identical match either. No fix proposed — this is a V1 root-page characteristic (its own
   JS template), not something to change in V3.

---

## Rework log (v3-07)

Batch `v3-07-rework-review-majors-mobile-verify` addressed Part D findings 1–7. Sandbox note: as
in the prior repair pass, `python3 -c`, `python3 v3/review-audit.py`, `node -e`, and `npx
--version` all still return "This command requires approval" in this non-interactive worker batch
(tried again below, unchanged from Part B/C's finding), so this pass falls back to `grep`-based
link/caveat verification and static CSS reasoning, same method as the existing Part B/C audits.

1. **MAJOR — dropped clinical caveat — FIXED.** Appended the exact sentence to every page that
   mentions Electron Dose Lab:
   - `v3/verhaal.html:81` — appended "Geen klinisch apparaat, wel een echte simulatie op basis van
     publieke NIST-data." to the `.desc` paragraph.
   - `v3/en/verhaal.html:81` — appended "Not a clinical device, but a genuine simulation based on
     public NIST data." to the `.desc` paragraph.
   - `v3/onder-de-motorkap.html:140` (new line, after the `</table>`) — added
     `<p class="table-note">Electron Dose Lab: geen klinisch apparaat, wel een echte simulatie op
     basis van publieke NIST-data.</p>`.
   - `v3/en/onder-de-motorkap.html:140` — EN equivalent with "not a clinical device...".
   - `v3/zelf-bouwen.html:161` and `v3/en/zelf-bouwen.html:161` — same `<p class="table-note">`
     pattern added after the repository table. These two files were not named in the batch's
     numbered instruction list, but both contain an "Electron Dose Lab" table row (repo-only
     table) with no caveat anywhere else on the page, so they were fixed too to satisfy the
     batch's own acceptance criterion ("every v3 page that mentions Electron Dose Lab carries the
     caveat").
   - `v3/hoe-kan-ai-dit.html:49` and `v3/en/hoe-kan-ai-dit.html:49` — this conceptual page
     previously never named Electron Dose Lab at all; added one sentence naming it with the
     caveat ("Een van de vijf, Electron Dose Lab, is geen klinisch apparaat, wel een echte
     simulatie op basis van publieke NIST-data." / EN equivalent) inside the existing closing
     sentence of the loop section, next to the "all five challenges were done" reference.
   - New CSS support: `.table-note` rule added to `v3/assets/v3.css` (after the `.tech-table`
     mobile media query, ~line 739) — `margin-top:10px; font-size:13.5px; color:var(--muted);`,
     matching the existing `.muted`/caption styling, no new colors or fonts introduced.
   - Verified: `grep -L "klinisch" v3/index.html v3/verhaal.html v3/onder-de-motorkap.html
     v3/zelf-bouwen.html v3/hoe-kan-ai-dit.html` and the EN equivalent with "clinical device" both
     return empty (every NL/EN page that contains "Electron Dose Lab" also contains the caveat
     sentence) — 5/5 NL pages, 5/5 EN pages, up from 2/10 before this batch.

2. **MAJOR — `.demo-links a` tap target — FIXED.** `v3/assets/v3.css` `.demo-links a` (was
   `~368–377`, no padding declared) now has `padding: 8px 2px; display: inline-flex; align-items:
   center; min-height: 40px;`. `v3.css`'s global `* { box-sizing: border-box; }` (line 33) makes
   `min-height: 40px` the actual rendered floor regardless of font metrics, so the computed height
   is guaranteed ≥40px without changing the link's color, font-size or visible padding rhythm
   (hover color rule untouched).

3. **MAJOR — unconfirmed mobile scroll depth — remains UNVERIFIED, no renderer available.**
   Commands tried in this batch (all failed with "This command requires approval" or were
   sandboxed to the repo working directory, consistent with Part C's original finding):
   `python3 -c "import playwright"`, `python3 v3/review-audit.py`, `node -e
   "require('puppeteer')"`, `npx --version`, `npx --yes playwright --version`. `which chromium
   chromium-browser google-chrome google-chrome-stable` all exited 1 (not found; this check alone
   did not require approval). `ls ~/.cache/ms-playwright` was blocked outright ("may only list
   files in the allowed working directories for this session"). No sudo was used and nothing was
   installed, per the batch's hard limits. **No screenshots were produced; `v3/screenshots/` was
   not created.** Because a real render remains unavailable, this batch did not touch
   `.fact-tiles`/`.timeline` mobile spacing — changing layout spacing without being able to
   measure the result risks a blind regression, and the task's own instruction was to tighten
   *only if* a measurement showed >~1600px. This finding is carried forward unresolved; the
   `v3/index.html`/`v3/verhaal.html` fact-tile and timeline mobile padding is unchanged from the
   previous batch.

4. **MINOR — `.topnav a` / `a.pill` tap targets — FIXED (mobile only).** Added to the existing
   `@media (max-width: 620px)` block in `v3/assets/v3.css` (~line 650): `.topnav a { padding: 10px
   6px; }` (was `6px 4px`) and `a.pill { padding: 11px 13px; }` (was `8px 13px`). Computed height
   at ≤620px: `.topnav a` ≈ 14px × 1.6 line-height + 20px padding = 42.4px; `a.pill` ≈ 13px × 1.6 +
   22px = 42.8px — both ≥40px. Desktop (>620px) keeps the original, more compact padding
   (`6px 4px` / `8px 13px`), unchanged, per the task's "keep desktop look compact" instruction.

5. **MINOR — caption/badge font sizes below 14px — left as-is, no fix proposed (per Part D
   finding 5's own text).** Consistent with V1's original `.badge{font-size:12px}` sizing; not
   primary reading copy. No change made.

6. **MINOR — `.jargon-def` `max-width: 22rem` — FIXED.** Changed to `max-width: min(22rem, 100%)`
   (`v3/assets/v3.css:472`) so the cap can never exceed the available content width on narrow
   viewports, removing the theoretical overflow risk Part C flagged even though layout-model
   reasoning already suggested browsers would clamp it. Purely defensive; no visual change at
   viewports where 22rem already fit.

7. **MINOR — commit-history URL encoding vs. root V1 — no fix proposed (per Part D finding 7's
   own text).** This is a characteristic of V1 root's own `encodeURIComponent` JS template, not a
   V3 defect; left unchanged.

### Persona verdict summary — updated

| Persona | V3 vs V1 | V3 vs V2 |
|---|---|---|
| 1. Non-technical admin/secretarial | BETTER | BETTER (mobile-layout caveat M1 still open, see finding 3 above — unverified, not a regression) |
| 2. Clinical colleague | BETTER | **BETTER** (was: EQUAL on homepage, WORSE on `verhaal.html` — finding 1 is now fixed: the caveat is on `verhaal.html`, `onder-de-motorkap.html`, `zelf-bouwen.html` and `hoe-kan-ai-dit.html` in both languages, so V3 now matches V2's 5/5 caveat coverage while keeping V2's other clinical-relevant content) |
| 3. Physicist / AI-curious | BETTER | BETTER |
| 4. ICT / software specialist | BETTER | BETTER |

---

## Preview

From the repository root:

```
python3 -m http.server 8080
```

Then open:
- `http://localhost:8080/v3/index.html` (Dutch homepage)
- `http://localhost:8080/v3/en/index.html` (English homepage)
- `http://localhost:8080/v3/onder-de-motorkap.html` / `http://localhost:8080/v3/en/onder-de-motorkap.html` (deepest technical layer, all 3 diagrams)
- `http://localhost:8080/v3/zelf-bouwen.html` / `http://localhost:8080/v3/en/zelf-bouwen.html` (self-build route)

V1 (unchanged, for side-by-side comparison): `http://localhost:8080/index.html`.
V2 (unchanged, for side-by-side comparison): `http://localhost:8080/v2/index.html`.

## Remaining limitations of this review

- No headless browser or working Python interpreter execution was available in this sandbox, so
  Part C is a static analysis, not a rendered/measured one. Findings 1, 2, 4, 5, 6 and 7 from
  Part D were resolved (fixed, or deliberately left as-is per their own text) in the `v3-07`
  rework batch above. **Finding 3 — unconfirmed mobile scroll depth to the demo grid on
  `v3/index.html` and `v3/verhaal.html` — is the only item still genuinely dependent on a real
  render**, and remains open: `v3-07` tried `playwright`, `puppeteer`, `npx` and a local Chromium
  binary again and every route was unavailable in this sandbox (see the "Rework log (v3-07)"
  entry for finding 3 above).
- External URL liveness was not checked (no network access in this sandbox, per the batch's own
  hard limit) — only provenance (does the URL already exist, byte-identical, on the already-live
  root site) was verified.
