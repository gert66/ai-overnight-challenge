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
| `v2/index.html` | `v2/en/index.html` | Entry page: hero, human timeline, five playable demos, plain-language explanation, four depth-route cards | NL built this batch; EN mirror is a later batch (linked now, will 404 until then) |
| `v2/wat-is-er-gebeurd.html` ("Vertel me gewoon wat er gebeurd is") | `v2/en/what-happened.html` ("Just tell me what happened") | Depth route 1: narrative-only retelling of the story for the least technical readers, no jargon at all | Later batch (linked now) |
| `v2/hoe-kan-ai-dit.html` ("Hoe kan AI dit zelf?") | `v2/en/how-ai-did-it.html` ("How could AI do this itself?") | Depth route 2: conceptual explanation of planning/building/testing/reviewing loop, jargon optional via inline disclosures | Later batch (linked now) |
| `v2/onder-de-motorkap.html` ("Kijk onder de motorkap") | `v2/en/under-the-hood.html` ("Show me under the hood") | Depth route 3: technical architecture, reusing diagrams/tables from `how-we-built.html` and `how-we-built-en.html` | Later batch (linked now) |
| `v2/zelf-bouwen.html` ("Ik wil dit zelf bouwen") | `v2/en/build-it-yourself.html` ("I want to build this myself") | Depth route 4: self-build guide, reusing content from `build-your-own.html`/`install-howto.html` and their `-en` mirrors | Later batch (linked now) |

Route labels are an improved (friendlier, non-technical) phrasing of the four required depth
levels; the four levels themselves are unchanged:
1. Just tell me what happened
2. How could AI do this itself?
3. Show me under the hood
4. I want to build this myself

## Shared assets (this batch)

- `v2/assets/v2.css` — mobile-first stylesheet, system font stack, max content width ~44rem,
  tap targets ≥44px, no external CDN dependencies. Shared by every V2 page (NL and EN).
- `v2/assets/v2.js` — vanilla JS only: jargon-toggle enhancement only (closes other open
  jargon disclosures when a new one opens). No frameworks, no network calls. All jargon
  disclosures work without JS via native `<details>/<summary>`; the script only adds small
  non-essential UX polish.

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

No new metrics, capabilities or claims are introduced beyond what already appears on the
existing site or in the challenge repositories.

## Links pending future batches (intentionally present on `v2/index.html` now)

These relative links point to pages that do not exist yet and will 404 until later batches
build them: `v2/en/index.html`, `v2/wat-is-er-gebeurd.html`, `v2/hoe-kan-ai-dit.html`,
`v2/onder-de-motorkap.html`, `v2/zelf-bouwen.html`.
