# V3 Design Audit — V1 vs V2, and the V3 plan

This document is the required audit before writing any V3 code. It records what V1 and V2
actually contain (verified against the files, not from memory), what V3 keeps/takes/rejects,
and the page map V3 is building toward. V3 lives entirely under `v3/`; nothing at repo root,
in `assets/`, `challenges/` or `v2/` is touched by this or any later V3 batch.

## a) V1 design inventory (verified against root HTML/CSS)

V1 is not one stylesheet — every root page inlines its own `<style>`, but they share one
consistent dark visual system. Verified color tokens, pulled directly from `index.html`,
`how-we-built.html`, `prompt-chain.html`, `build-your-own.html`, `install-howto.html`:

| Token | Hex | Where verified | Use |
|---|---|---|---|
| Background (index.html style) | `#0d1117` | `index.html:8` `body{...background:#0d1117}` | page background, GitHub-dark base |
| Background (deeper pages, radial) | `#07111f` → `#050b14` | `how-we-built.html:2` `--bg:#07111f`, body `radial-gradient(circle at 20% 0,#102b47 0,#07111f 36%,#050b14 100%)` | page background on the four deep pages |
| Panel/card (index.html) | `#161b22` | `index.html:10` `.card{background:#161b22}` | card background |
| Panel/card (deep pages) | `#0e1b2b` / `rgba(14,27,43,.92-.94)` | `how-we-built.html:2` `--panel:#0e1b2b`, `.stat,.card{background:rgba(14,27,43,.92)}` | card background |
| Border/line | `#30363d` (index) / `#263a52` (deep pages) | `index.html:10`, `how-we-built.html:2 --line` | card/table borders |
| Text (ink) | `#e6edf3` (index) / `#f3f7fb` (deep pages) | `index.html:8`, `how-we-built.html:2 --ink` | primary text |
| Muted text | `#8b949e` (index) / `#9fb0c4` (deep pages) | `index.html:9 .muted`, `how-we-built.html:2 --muted` | secondary text |
| Accent blue (links, "how it worked") | `#58a6ff` (index) / `#63d0ff` (deep pages) | `index.html:11 a{color:#58a6ff}`, `how-we-built.html:2 --blue` | links, primary CTA, blue card border |
| Accent green (success/completed/"this too") | `#3fb950` / `#7ee787` (bright) / `#7ff0bd` (deep pages) | `index.html:10 .card.completed{border:2px solid #3fb950}`, `.live strong{color:#7ee787}`, `how-we-built.html:2 --green` | success state, green card border, demo CTA gradient (`#2ea043`→`#3fb950`) |
| Accent purple ("idea → prompt") | `#8957e5` / `#d2a8ff` (bright) | `index.html:17` card border `#8957e5`, `code{color:#d2a8ff}`, `prompt-chain.html:1 --purple:#d2a8ff` | purple card border, code/mono text color |
| Accent yellow/amber (active state, "step by step") | `#f2cc60` (index) / `#ffd166` (deep pages) | `index.html:10 .card.active{border:2px solid #f2cc60}`, `how-we-built.html:2 --yellow` | active-state glow, yellow card border, arrows |
| Accent orange (blocked) | `#f0883e` | `index.html:10 .card.blocked` | blocked/attention state |
| Accent red (deep pages) | `#ff7a90` | `how-we-built.html:2 --red` | bad/warning callouts |

Typography: system-ui font stack throughout (`system-ui,-apple-system,Segoe UI,Roboto,...`);
deep pages add `Inter` first in the stack. Base body size 16px (index.html) / 16px (deep
pages, `font:16px/1.62 ...`/`16px/1.65 ...`). Large expressive headings on deep pages:
`h1{font-size:clamp(38px,6vw,70px)}` in `how-we-built.html`/`build-your-own.html`, `clamp(34px,6vw,58px)`
in `prompt-chain.html`, `clamp(38px,6vw,64px)` in `install-howto.html`.

Card structure: `.card`/`.stat`/`.step`/`.node` — bordered, rounded (14–22px radius), dark
panel background, generous padding (16–24px). State variants on the index cards add a 2px
colored border + soft box-shadow glow (`.active` yellow, `.completed` green, `.blocked`
orange) — this is the "mission status" affordance unique to `index.html`.

Badges: `index.html:11 .badge{display:inline-block;padding:4px 9px;border-radius:999px;
background:#21262d;font-size:12px}` — pill-shaped, dark-grey fill, used for `MISSION N` and
branch name tags on every challenge card.

Play/demo CTA: `index.html:14 .demo-cta a{...background:linear-gradient(135deg,#2ea043,#3fb950);
border:1px solid #56d364;color:#07120b;font-size:20px;font-weight:900;box-shadow:0 10px 28px
rgba(46,160,67,.24)}` plus a circular `.play-icon` (▶) badge — a full-width, high-contrast green
gradient button, distinct from ordinary links. This is the single strongest "come play now"
affordance in V1 and is central to why V1 feels alive.

GitHub/commit link affordances: every challenge card in `index.html` has
`Open repository` + `Commit history` links built from `https://github.com/gert66/<repo>` and
`.../commits/<branch>`; `how-we-built.html` has a `.repo-grid` of five bordered repo tiles
linking the same five repos, plus a live "concrete example" card with three buttons (repo,
challenge-commits, live demo) for the 3D Path Planner. This GitHub-forward, audit-trail feel
(`code` styled purple, commit lists with sha+date+author) is a defining part of V1's technical
credibility and must survive into V3.

Code/mono styling: `code{color:#d2a8ff}` on index.html, `code{color:#d8b4fe;background:#111827;
padding:2px 5px;border-radius:5px}` on deep pages — purple monospace tokens on dark background.

Diagrams found in `assets/` (verified via `ls assets/`), each with NL/EN and, for two of them,
separate mobile variants:
- `architecture-nl.svg` / `architecture-en.svg` — referenced conceptually in `how-we-built.html`'s
  "Hoe de AI-buildomgeving werkt" section (not currently `<img>`-embedded on any root page, but
  present and unused — a reuse opportunity for V3's "onder de motorkap" page).
- `development-loop-nl.svg` / `development-loop-en.svg` — likewise present, unused on root pages
  today; a good fit for V3's "hoe kan AI dit zelf" conceptual page.
- `workflow-polished-nl.svg` / `workflow-polished-en.svg` + mobile variants
  `workflow-polished-mobile-nl.svg` / `workflow-polished-mobile-en.svg` — embedded in
  `how-we-built.html` via `<picture><source media="(max-width:620px)" srcset="assets/workflow-polished-mobile-nl.svg">
  <img src="assets/workflow-polished-nl.svg">`, captioned "De gecontroleerde autonome ontwikkelloop".
  Also reused verbatim (per `v2/ARCHITECTURE.md`) in `v2/onder-de-motorkap.html`.
- `review-loop-polished-nl.svg` / `review-loop-polished-en.svg` + mobile variants
  `review-loop-mobile-nl.svg` / `review-loop-mobile-en.svg` — embedded the same way in
  `how-we-built.html`, captioned "De review-, repair-, wacht- en afrondingscyclus". Also reused
  in `v2/onder-de-motorkap.html`.

Language switch pill: fixed top-right pill (`.lang-switch`, `position:fixed;top:14px;right:14px`)
with a globe icon and language code, `backdrop-filter:blur(10px)` glass effect — present on every
root page. V3 reuses this affordance (adapted into the top bar rather than a floating pill, per
the batch spec) rather than reinventing language switching.

## b) V2 information-architecture inventory (verified against v2/*.html, v2/assets/v2.css, v2/ARCHITECTURE.md, v2/REVIEW.md)

Page structure: `v2/index.html` (entry: hero → 7-step timeline → 5 demo cards → one
plain-language "what did AI do" block → 4 depth-route cards → footer) plus four depth pages
(`wat-is-er-gebeurd.html`, `hoe-kan-ai-dit.html`, `onder-de-motorkap.html`, `zelf-bouwen.html`),
each mirrored under `v2/en/`. This "story → wow → explain → choose depth → technical →
build-it-yourself" journey (`v2/ARCHITECTURE.md:12-13`) is exactly the journey the V3 batch spec
asks for and is adopted directly.

Progressive disclosure: V2's signature mechanism is the inline `<details class="jargon">` term
— a small tap-to-expand pill (`Git`, `orchestrator`, `VM`, `Hermes`, `API`, `modelaanbieder`) with
a plain-language definition, used the *first time* a term appears in running prose
(`v2/index.html:28,75`; verified in `v2/REVIEW.md` persona-A jargon check, "PASS"). Deeper
technical pages use a second disclosure primitive, `<details class="tech-details">`, to collapse
whole technical subsections (architecture tables, machine specs) so non-experts aren't forced to
scroll past them. Both mechanisms are worth keeping conceptually in V3, restyled onto the dark V1
palette (V2's implementation is light-mode only, see below).

Plain-language story: the hero + timeline wording in `v2/index.html:17-30` is a clean, jargon-free
retelling of the same facts as `index.html`'s hero, just restructured as a numbered list
(meeting → walk → ~30 min via Voice Mode, no keyboard → five ideas → AI writes the assignments →
autonomous overnight work → five apps). This six/seven-step breakdown is more scannable than V1's
prose paragraphs and is the basis for V3's timeline component.

What V2 got right (per its own `v2/REVIEW.md`, persona verdicts B/C/D = PASS, persona A = WEAK):
- The four-persona review method itself (non-technical, clinical, physicist, ICT) — V3 reuses
  this method for its own final review.
- Explicit reuse-and-cite discipline: every fact traced to its root-page source, no invented
  numbers (`v2/ARCHITECTURE.md:49-76`) — V3 follows the same discipline, hence the demo URLs,
  repo URLs and headline facts below are copied verbatim from `index.html`, not paraphrased.
  A previous review found the AI-agent-generated `v2/REVIEW.md` credible enough to trust, but
  it flagged for the next batch to also record what V2 got *wrong*, not just right (see below).
- Clinical-safety caveat repeated at every depth level ("Electron Dose Lab... geen klinisch
  apparaat") — a good pattern; V3 should keep this caveat wherever the Electron Dose Lab is
  described in more than one sentence.

What V2 got wrong (the reason this V3 batch exists, per the job goal, and cross-checked against
`v2/REVIEW.md`'s own findings):
- `v2/assets/v2.css:4-17` — a *light* palette (`--bg:#f7f9fc`, `--panel:#ffffff`,
  `--accent:#0b6bb3`), which discards V1's dark identity entirely and reads as generic
  light-mode documentation, not an "exciting AI experiment" showcase.
- No colored per-challenge accents, no badges, no mission-status glow, no diagrams embedded on
  the entry page, no compact multi-column desktop card grid — `v2/REVIEW.md` itself flags F01
  (demo grid sits beyond one mobile scroll because the timeline is too long before it) and F04
  (word count borderline over the 2-minute budget), both symptoms of a page that isn't visually
  compact the way V1's cards are.
- Desktop is not information-rich: `main{max-width:44rem}` throughout means V2 never uses extra
  desktop width for more columns or a horizontal timeline — it is the same single narrow column
  on every screen size, unlike V1's `.stats`/`.grid`/`.flow`/`.diagram-grid`/`.repo-grid` which
  all go multi-column above 900px.
- No GitHub-forward affordances beyond a single "Broncode" link per demo card (`v2/index.html:40`
  etc.) — no commit-history link, no repo tiles grid, no concrete Git-history walkthrough.

## c) Keep / take / reject table

| From | Keep in V3 | Take in V3 | Reject in V3 |
|---|---|---|---|
| **V1** | Dark palette tokens (§a table above); card/badge/CTA structure; colored per-challenge accents; play-button CTA style; GitHub repo+commit-history link pattern; mono/code styling; diagrams in `assets/`; multi-column desktop layouts (`.stats`,`.grid`,`.flow`,`.repo-grid`) | — (V1 is the base, not a source to selectively take from) | Five separate inlined `<style>` blocks per page (V3 uses one shared `v3.css`); floating pill language switch (moved into top bar nav) |
| **V2** | — (V2 is not the visual base) | Story → wow → explain → choose-depth → technical → build-it-yourself journey order; inline jargon-disclosure pattern (`<details class="jargon">`) restyled dark; six-step timeline wording/structure; four-persona review method; fact-provenance discipline (no invented numbers) | Light palette (`--bg:#f7f9fc` etc.); single 44rem column at all breakpoints; placing the demo grid after a long timeline (caused V2's own F01 finding) |

## d) V3 page map (NL + EN) and diagram/section reuse plan

This batch (`v3-01-foundation-nl-home`) built `v3/DESIGN.md`, `v3/assets/v3.css`,
`v3/assets/v3.js` (if needed) and `v3/index.html`. Batch `v3-02-nl-depth-story-concept` built
`v3/verhaal.html` and `v3/hoe-kan-ai-dit.html` (NL). Batch `v3-03-nl-depth-underhood-selfbuild`
built `v3/onder-de-motorkap.html` and `v3/zelf-bouwen.html` (NL), completing the NL depth
chooser. The filenames below are the **planned** target filenames for pages not yet built;
existing NL pages link to the not-yet-built EN ones as planned/placeholder hrefs, documented
here so the link-check step can treat them as valid.

Note: the EN filenames for rows 2 and 3 were changed from the originally sketched
`story.html`/`how-ai-did-it.html` to `verhaal.html`/`hoe-kan-ai-dit.html` (i.e. the EN mirror
keeps the same filename as the NL page, under `v3/en/`) — this is what batch
`v3-02-nl-depth-story-concept`'s spec required and what the NL pages' language-switch links
now point to. Rows 4–5 keep their originally sketched EN filenames since no page links to them
by a specific EN filename yet; a future EN batch should follow the same same-filename-under-`en/`
convention for consistency (`v3/en/onder-de-motorkap.html`, `v3/en/zelf-bouwen.html`) unless a
later batch has a reason to deviate — if so, update this table then.

| # | NL file | EN file (planned) | Purpose | Status | Diagrams/sections it reuses |
|---|---|---|---|---|---|
| 1 | `v3/index.html` | `v3/en/index.html` | Home: hero, timeline, 5 demo cards, depth chooser, bonus slot | NL+EN done (batch 01, EN batch 04) | — |
| 2 | `v3/verhaal.html` | `v3/en/verhaal.html` | Depth (a): the human story only, ~2 min, no jargon | NL+EN done (batch 02, EN batch 04) | Six-step timeline markup/classes copied verbatim from `v3/index.html`; five demo cards (play-btn only) with exact demo URLs from `v3/index.html`; wording adapted from `v2/wat-is-er-gebeurd.html` and V1 hero prose (`index.html`, `prompt-chain.html`) |
| 3 | `v3/hoe-kan-ai-dit.html` | `v3/en/hoe-kan-ai-dit.html` | Depth (b): conceptual plan/build/test/review/repair loop | NL+EN done (batch 02, EN batch 04) | Compact inline CSS/HTML loop diagram (`.loop-diagram`/`.loop-node` in `v3.css`, V1 accent colors) built instead of embedding `assets/development-loop-nl.svg` directly — that SVG's labels (Brain/Worker/Orchestrator, PASS/FAIL/NEEDS_HUMAN, state-machine outcomes) are "under the hood" detail, not conceptual-layer language, so it is reserved for `onder-de-motorkap.html` (row 4) instead; orchestrator/worker/reviewer/Hermes/Git/model introduced only as optional `<details class="jargon">` asides in a `.tech-aside` box, grounded in `how-we-built.html`'s Brain/Worker/Reviewer/Git description and `index.html`/`prompt-chain.html`'s Hermes mention |
| 4 | `v3/onder-de-motorkap.html` | `v3/en/onder-de-motorkap.html` | Depth (c): orchestrator, Hermes, models, Git, workflows, architecture | NL done (batch 03); EN planned (next batch) | `assets/architecture-nl.svg` (new `<img>` embed — root pages reference this diagram conceptually but never embed it; this is its first `<img>` use), `assets/workflow-polished-nl.svg` + `assets/workflow-polished-mobile-nl.svg` via `<picture>`/`source[max-width:620px]` (same pattern as `how-we-built.html`), `assets/review-loop-polished-nl.svg` + `assets/review-loop-mobile-nl.svg` via the same `<picture>` pattern, `assets/development-loop-nl.svg` as a single summary image (moved here from row 3 per that row's note); prose and the deterministic-vs-AI table grounded in `how-we-built.html`'s architecture/stats/machine sections and the 3D Path Planner Git-history example; model-routing paragraph grounded in `how-we-built.html`'s "Modellen: rol en provider uit elkaar" section; Hermes sentence quoted from `index.html` |
| 5 | `v3/zelf-bouwen.html` | `v3/en/zelf-bouwen.html` | Depth (d): VM, cost, install, prompts, repos, step-by-step | NL done (batch 03); EN planned (next batch) | V1 `build-your-own.html` cost stat-tiles (`&euro;6-7`/`&plusmn; &euro;20`/`&euro;0`/`klein`, copied verbatim) and its "Een goede eerste proef" + "Begin bewust klein" callouts; `install-howto.html`'s 12-step guide summarised into a 12-item `.step-list`, each step linking to its exact `#id` anchor (`#accounts`, `#sshkey`, `#hetzner`, `#connect`, `#software`, `#github`, `#agent`, `#desktopcommander`, `#env`, `#firstjob`, `#orchestrator`, `#watchdog`, `#checklist` — all 13 anchors verified present in `install-howto.html`, `#agent`/`#desktopcommander` both linked from step 7) rather than duplicating its code blocks |

Batch `v3-04-en-mirror-home-story-concept` built `v3/en/index.html`, `v3/en/verhaal.html` and
`v3/en/hoe-kan-ai-dit.html` as faithful English mirrors of rows 1–3 (same DOM structure, class
names and section order; every `https://` URL byte-identical to the NL pages; verified with
`diff` against a sorted URL list). English wording sources reused rather than invented: hero,
timeline and demo-card phrasing adapted from `v2/en/index.html`, `v2/en/what-happened.html` and
`v2/en/how-ai-did-it.html` (their equivalents of the story/concept pages, already reviewed English
translations of the same underlying facts); jargon-term definitions translated from the NL
`.jargon-def` text already on the NL pages, not reworded from scratch; the "original technical
site" pill and footer links point to the existing root English pages (`index-en.html`,
`how-we-built-en.html`, `prompt-chain-en.html`, `build-your-own-en.html`, `install-howto-en.html`,
verified present at repo root) rather than falling back to the NL originals, since English
versions already exist. Rows 4–5's EN files remain not yet built; their NL pages' language-switch
links (`en/onder-de-motorkap.html`, `en/zelf-bouwen.html`) are still placeholder hrefs for a future
batch, per the same convention.

Bonus/follow-on: no dedicated page planned yet — the bonus block lives inline on `v3/index.html`
(and its EN mirror) as a clearly separated section, per the batch spec. If a future batch adds a
dedicated bonus page, this table will be updated then; today's `v3/index.html` does not link to
one, so there is no dangling planned-page reference to track for it.

All five demo URLs and five repository URLs used throughout the pages above are copied verbatim
from `index.html`'s `demoLinks` object and `challenges` array (lines 21–35), the same source V2
used — no new URLs are introduced anywhere in V3.

Markup rule (added during batch `v3-02-nl-depth-story-concept` repair): any paragraph-level text
block that contains a `<details class="jargon">` disclosure must be a `<div>` (e.g.
`<div class="lead">`, plain `<div>` children of `.lead-text`), never a `<p>`. A `<details>` start
tag implicitly closes an open `<p>` per the HTML parsing algorithm, which silently truncates the
paragraph and breaks its typography/spacing in real browsers (python3 `html.parser` does not
catch this). `.lead-text > p, .lead-text > div` and `.hero .lead` / `.hero .lead + .lead-text` in
`v3.css` already use class selectors so they match both `<p>` and `<div>`; keep it that way for
any future page reusing this pattern (`onder-de-motorkap.html`, `zelf-bouwen.html`, EN mirrors).
Batch `v3-03-nl-depth-underhood-selfbuild` applied this rule to `onder-de-motorkap.html`'s two
jargon-bearing prose blocks (architecture roles, Hermes/model routing), wrapping each in
`<div class="lead-text"><div>...</div></div>` instead of `<p>`.

CSS additions in this batch (`v3.css`, append-only, after the `prefers-reduced-motion` block):
`.diagram-figure` (a white, V1-style frame for the SVG diagrams, since all reused diagrams have a
white background — `max-width:100%; height:auto` on the `img` inside), `.tech-table` (dark
bordered data table, reused for the deterministic-vs-AI table, the machine-spec table and the
per-challenge demo/repo/commits table), `.step-list`/`.step-item` (numbered steps for
`zelf-bouwen.html`), `.checklist` (the "Wat heb je nodig?" list) and `.callout`/`.callout.good`
(V1-style left-border callouts for "Let op" and "Een goede eerste proef"). No existing rule was
edited; `!important` was not used; the `:focus-visible` and `prefers-reduced-motion` blocks were
not touched.
