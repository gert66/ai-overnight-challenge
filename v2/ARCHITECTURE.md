# V2 Information Architecture — AI Overnight Challenge for UMC Utrecht

V2 is a parallel, department-facing rebuild of the existing public site. It lives entirely
under `v2/` and does not replace or alter any root-level page. The existing site (`index.html`,
`how-we-built.html`, `prompt-chain.html`, `build-your-own.html`, `install-howto.html` and their
`-en` mirrors) stays the canonical technical site; V2 is a friendlier, story-first entry point
for a broad hospital-department audience (secretarial/front-desk, clinical, clinical physics,
ICT), with the same underlying facts and the same five demos.

## Design principle

Preferred journey: **story → visible/wow results → simple explanation → choose your depth →
technical layer → build-it-yourself layer**. The entry page (this batch) covers the first four
steps. The last two steps are separate "depth route" pages linked from the entry page but built
in later batches.

## Site map

| Page (NL) | Page (EN) | Purpose | Status |
|---|---|---|---|
| `v2/index.html` | `v2/en/index.html` | Entry page: hero, human timeline, five playable demos, plain-language explanation, four depth-route cards | NL and EN both built |
| `v2/wat-is-er-gebeurd.html` ("Vertel me gewoon wat er gebeurd is") | `v2/en/what-happened.html` ("Just tell me what happened") | Depth route 1: narrative-only retelling of the story for the least technical readers, no jargon at all | NL and EN both built |
| `v2/hoe-kan-ai-dit.html` ("Hoe kan AI dit zelf?") | `v2/en/how-ai-did-it.html` ("How could AI do this itself?") | Depth route 2: conceptual explanation of planning/building/testing/reviewing loop, jargon optional via inline disclosures | NL and EN both built |
| `v2/onder-de-motorkap.html` ("Kijk onder de motorkap") | `v2/en/under-the-hood.html` ("Show me under the hood") | Depth route 3: technical architecture, reusing diagrams/tables from `how-we-built.html` and `how-we-built-en.html` | NL built; EN mirror is a later batch (linked now, will 404 until then) |
| `v2/zelf-bouwen.html` ("Ik wil dit zelf bouwen") | `v2/en/build-it-yourself.html` ("I want to build this myself") | Depth route 4: self-build guide, reusing content from `build-your-own.html`/`install-howto.html` and their `-en` mirrors | NL built; EN mirror is a later batch (linked now, will 404 until then) |

Route labels are an improved (friendlier, non-technical) phrasing of the four required depth
levels; the four levels themselves are unchanged:
1. Just tell me what happened
2. How could AI do this itself?
3. Show me under the hood
4. I want to build this myself

## Shared assets

- `v2/assets/v2.css` — mobile-first stylesheet, system font stack, max content width ~44rem,
  tap targets ≥44px, no external CDN dependencies. Shared by every V2 page (NL and EN). Extended
  in the `onder-de-motorkap.html`/`zelf-bouwen.html` batch with additive-only classes: `details
  .tech-details` (collapsible technical subsection, closed by default except the first one on
  each page), `.table-scroll`/`.table-scroll table` (horizontally scrollable table wrapper for
  mobile, plain black-on-white styling matching the rest of V2), and `.tech-figure` (bordered
  figure wrapper for reused root-site diagrams, full-width responsive `img`). No existing rules
  were changed.
- `v2/assets/v2.js` — vanilla JS only: jargon-toggle enhancement only (closes other open
  jargon disclosures when a new one opens). No frameworks, no network calls. All jargon
  disclosures work without JS via native `<details>/<summary>`; the script only adds small
  non-essential UX polish. Unchanged in this batch.

## Reused facts, wording and links (source of truth, no new claims)

- Five verified demo URLs (unchanged from root site, `index.html`):
  - Maze Chase / "Glimmerdash": `https://gert66.github.io/ai-agent-challenge-05-maze-chase/`
  - MOSSE Object Tracker: `https://gert66.github.io/ai-overnight-challenge/mosse-tracker/`
  - 2x2 Rubik Solver: `https://gert66.github.io/ai-overnight-challenge/rubik-2x2/`
  - Electron Dose Lab: `https://gert66.github.io/ai-overnight-challenge/electron-dose-lab/`
  - 3D Path Planner: `https://gert66.github.io/ai-overnight-challenge/path-planner/`
- Five repositories (unchanged, `README.md` / `how-we-built.html`):
  - `https://github.com/gert66/ai-agent-challenge-01-mosse-tracker`
  - `https://github.com/gert66/ai-agent-challenge-02-rubik-2x2`
  - `https://github.com/gert66/ai-agent-challenge-03-monte-carlo`
  - `https://github.com/gert66/ai-agent-challenge-04-path-planner`
  - `https://github.com/gert66/ai-agent-challenge-05-maze-chase`
- Origin story and timeline wording: `index.html` hero and "Hoe het idee ontstond" section, and
  `how-we-built.html` hero paragraph (physics meeting → walk → ~30 min Voice Mode without a
  keyboard → five ideas → AI expands ideas into briefs/acceptance criteria/prompts → autonomous
  overnight run → five working apps).
- Non-technical one-line demo descriptions: adapted from `challenges/01-mosse-tracker.md`,
  `challenges/02-rubik-2x2.md`, `challenges/03-electron-dose-lab.md`,
  `challenges/04-3d-path-planner.md`, `challenges/05-maze-chase.md` ("What should we see
  tomorrow?" sections), and the "Electron Dose Lab" caveat ("not a clinical dose engine") from
  `README.md`.
- Roles/terms explained in jargon disclosures (VM, orchestrator, Git, Hermes, API,
  modelaanbieder): grounded in `index.html` ("één kleine VM, een orchestrator", "Hermes en
  andere toolkoppelingen maakten modellen en gereedschappen beschikbaar wanneer dat nodig
  was") and `how-we-built.html` ("De machine waarop dit draaide", "Modellen: rol en provider
  uit elkaar").

- Footer link back to the existing site: `../index.html` (root entry page, untouched by V2).
- `v2/onder-de-motorkap.html` reuses, verbatim in content and mostly verbatim in wording, from
  `how-we-built.html`: the "Eén menselijke ingang" / "Brain, Worker, Reviewer" / "Git als
  geheugen" / "Tests als toegangspoort" cards, the `5/5` · `37` · `155` · `2 vCPU` stats, the
  "De machine waarop dit draaide" table, the "Modellen: rol en provider uit elkaar" section and
  callout, the Desktop Commander section, the "Wat is deterministisch en wat is AI?" table, the
  3D Path Planner Git-history example (including the commit-name sequence and the commits URL),
  and the `workflow-polished-nl.svg` / `review-loop-polished-nl.svg` diagrams (confirmed present
  under `../assets/`). It reuses the four-step flow and framing from `prompt-chain.html`, and the
  Electron Dose Lab caveat from `README.md` (via the phrasing already used in
  `hoe-kan-ai-dit.html`). Links to all five repository URLs and to `../how-we-built.html` and
  `../prompt-chain.html`.
- `v2/zelf-bouwen.html` reuses, summarised into one or two sentences per step and linked to the
  matching anchor, all thirteen numbered sections of `install-howto.html`
  (`#accounts` `#sshkey` `#hetzner` `#connect` `#software` `#github` `#agent`
  `#desktopcommander` `#env` `#firstjob` `#orchestrator` `#watchdog` `#checklist`, all verified
  present in that file), plus the cost table and "Begin bewust klein" guidance from
  `build-your-own.html`. It reuses the "Start vanuit het verhaal" framing and links to
  `prompt-chain.html`, lists the five repositories with one-line descriptions adapted from
  `README.md`'s challenge summaries, and repeats the provider-routing and Electron Dose Lab
  caveats already documented above for `onder-de-motorkap.html`. `build-your-own.html` has no
  anchor for its "Als je echt vanaf nul begint" table, so that step group links to the page top
  (`../build-your-own.html`) instead of a fragment.

No new metrics, capabilities or claims are introduced beyond what already appears on the
existing site or in the challenge repositories.

## Links pending future batches (intentionally present on V2 pages now)

`v2/en/index.html`, `v2/en/what-happened.html` and `v2/en/how-ai-did-it.html` are now built
(this batch), each with `lang="en"`, a language switch back to its Dutch counterpart, and
`hreflang` alternate links paired with `v2/index.html`, `v2/wat-is-er-gebeurd.html` and
`v2/hoe-kan-ai-dit.html` respectively.

These relative links still point to pages that do not exist yet and will 404 until a later
batch builds them: `v2/en/under-the-hood.html` (linked from `v2/en/index.html`,
`v2/en/how-ai-did-it.html` and `v2/onder-de-motorkap.html`) and `v2/en/build-it-yourself.html`
(linked from `v2/en/index.html`, `v2/en/how-ai-did-it.html` and `v2/zelf-bouwen.html`).
