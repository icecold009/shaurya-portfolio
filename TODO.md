# Final Luna plan: Shaurya Portfolio

## Project archive access and card revamp: Package 12

Goal: make the 13-project archive easier to search, filter, scan, and inspect,
while giving every visual an honest source: a real product/research image or
clearly presented editorial cover art. Give opened project details a cleaner,
responsive reading order without changing their case-study copy. Extend the
refresh through the Writing archive with source-grounded retrospective notes
from 2025 through the current 2026 work, while distinguishing period covered
from the actual article publication date.

### Scope

- [x] Replace the large floating category controls with a compact search field,
      responsive filter chips, project counts, and a clear empty state.
- [x] Wire the existing URL-backed `q` state to `filterProjects` and preserve
      category, saved-list, and direct project-detail URLs.
- [x] Refine the project-card grid, image framing, information hierarchy, and
      keyboard, pointer, touch, and reduced-motion feedback.
- [x] Keep verified product screenshots/research visuals; use authentic
      project-repository imagery when it is available.
- [x] Replace mock interface illustrations with original editorial covers
      that contain no invented app screens, text, logos, or metrics. Keep the
      source-pending archive record text-only.
- [x] Preserve quick-view dialog focus management and saved-project behavior.
- [x] Add branded or custom technology marks to card previews and the opened
      detail stack while keeping every technology name readable and accessible.
- [x] Redesign the opened project detail as a responsive feature sheet with a
      clear overview, evidence, outcome, build notes, technology stack, and
      action area while preserving its current copy and behavior.
- [x] Add a brighter theme-aware frame around project covers and a separated
      accent tile behind each technology mark so dark screenshots and icons do
      not disappear into the archive surfaces.
- [x] Add five retrospective writing pieces spanning Jan 2025 through Sep
      2026, grounded in portfolio and first-party repository evidence; keep
      publication dates current and show the work period separately.

### Non-goals

No unsupported project claims or URLs, homepage audience-lens redesign,
project-detail copy changes, invented personal milestones, backdated article
publication metadata, deployment, publication, or merge.

### Files, tests, and acceptance

Files: `src/components/Projects.jsx`, `src/components/Projects.css`,
`src/components/ProjectDetailDialog.jsx`,
`src/components/ProjectTechnologyTag.jsx`,
`src/styles/components/project-detail-dialog.css`, `src/data/projects.js`,
`src/lib/projectSearch.js`, `public/projects/`, `src/posts/`,
`src/pages/blog/`, `src/styles/pages/blog.css`, and this backlog entry.

Tests: existing `tests/projectSearch.test.mjs` and
`tests/projectShortlist.test.mjs` remain the relevant logic coverage; no test
files will be added or tests run in this task. Run `npm.cmd run lint`,
`npm.cmd run verify:assets`, and `npm.cmd run build`; inspect desktop layout and
interaction in a browser, then review mobile and reduced-motion CSS behavior.

Acceptance: project search and category chips work with shareable URL state;
all cards remain operable by keyboard and touch; source access and evidence
labels remain clear; every active project uses either an authentic product/
research image or visibly editorial cover art; the unlinked archive record
does not receive fabricated imagery; opened project details retain their
content, links, saved state, focus handling, and keyboard dismissal while
presenting the evidence, outcome, build notes, technologies, and actions in a
clear layout at desktop and narrow widths; covers and technology marks remain
visibly separated from card and dialog surfaces in both themes; retrospective
periods are distinct from true publication dates, with new writing tied to
verified work; local lint, asset integrity, and build checks pass.

Completion evidence: Jev plan reviews after repository and image-source
inventory; two Jev text-diff review batches covering all 13 changed text
files; seven binary assets were excluded from Jev's text payload and checked
with asset verification and browser rendering. The archive uses four existing
product/research PNGs, two repository images, and six original optimized
editorial covers. Focused browser checks covered search, category filtering,
saved-project state restoration, keyboard quick view, Escape close, and
URL-backed details. `npm.cmd run lint`, `npm.cmd run verify:assets`, and
`npm.cmd run build` all passed. The archive was inspected at desktop and
narrow/mobile widths; reduced-motion behavior was checked against responsive
CSS and existing reduced-motion handling. Automated tests, external checks,
deployment, and merge were not run and remain out of scope.

The detail-view continuation passed a fresh lint, asset-integrity, and
production build run. Jev reviewed the dialog JSX/CSS and this backlog entry as
the continuation diff; earlier archive-card sources had already received
separate diff review. Browser review covered desktop and narrow layouts, the
honest source-pending fallback, Escape dismissal, focus restoration, and a save
toggle that was returned to its original state.

The cover and technology follow-up checked all 13 project records, visually
reviewed all 11 local cover files, and compared linked repository image notes.
NextSound now points to the current browse screenshot documented in its
repository README. The F1 visual matches the current report; Face Attendance
still has no repository screenshot, and the Car Price Predictor's documented
feature-importance image is absent from its default branch, so neither received
a fabricated product screen. Existing product/research images, editorial
covers, and the source-pending record remain correctly identified. The complete
technology stack now shows a brand mark or custom tool glyph in cards and
details, with readable names retained.

A fresh source pass inspected all 13 card records and the current default-branch
visuals in every linked repository. The local Movie Tracker screenshot, Audio
Recognition FFT figure, earlier F1 plot, and Code Racer logo match their current
repository blobs; NextSound still uses its current browse screenshot. The F1
card now uses the current season-by-season model-versus-baseline figure from its
repository. Six projects without a published product screenshot retain clearly
labelled original cover art with descriptive alternative text, and Student
Dropout Risk Prediction keeps its honest no-image archive fallback. Technology
marks cover every current stack label, including Python, Flask, FFmpeg and the
`ffmeg` spelling alias.

Follow-up verification: `npm.cmd run lint`, `npm.cmd run verify:assets`, and
`npm.cmd run build` passed. The build emitted a main-chunk size advisory and
skipped optional resume sync because `resume/resume.tex` is not present. Jev
reviewed all 16 changed text files in four non-overlapping batches; the first
three returned `incomplete_context` with a `resolve_findings_or_human_review`
gate, and the last returned `no_clear_issue`. Seven binary cover assets were
excluded from the text payload and checked through asset integrity and visual
review.

The visual-separation and Writing continuation adds theme-aware media frames,
accent-backed technology marks, and five retrospective notes dated as written
in Sep 2026 with separate coverage labels from Jan 2025 through Sep 2026. The
2025 retrospective explicitly distinguishes the Janâ€“Jun coverage window from
the first precisely dated public record in April. Writing claims link to the
portfolio's dated experience and first-party project repositories. Jev reviewed
the bounded image/icon plan and the card-only source diff in four batches. The
full diff exceeded Jev's 45,000-character limit without sending a partial
payload; the four batches returned generic `incomplete_context` or
`verification_gap` gates without concrete findings. Independent lint, asset,
build, and browser checks passed. Writing/archive sources and this mixed-scope
backlog file stayed excluded; automatic review had rejected an earlier broad
request because it exceeded the project-card authorization. No writing source
was sent to Jev.

Implementation branch: `codex/project-card-revamp-20260928`.

## About and Writing experience refresh: Package 13

Goal: make Shaurya's story and writing easier to understand, explore, and
return to, while giving the remaining editorial project covers distinct,
project-specific visual languages.

### Scope

- [x] Rebuild About around the existing portrait, concise introduction,
      authentic selected work, verified study and experience, working approach,
      and direct profile and rÃ©sumÃ© actions.
- [x] Add URL-backed Writing search and topic filters, a live result count,
      and a clear empty state while keeping each existing article and legacy
      `?post=` route intact.
- [x] Improve article reading with heading-derived contents links, a quiet
      progress indicator, and links to neighboring essays; preserve dates,
      slugs, and article copy.
- [x] Replace the six repetitive photographic editorial covers with six
      distinct commissioned-style illustrations; preserve authentic product
      and research imagery and the text-only archive record.
- [x] Keep technology marks, image alternatives, theme contrast, keyboard
      access, reduced-motion behavior, and responsive layouts intact.
- [x] Reuse the accessible technology marks on About's selected-work cards.

### Non-goals

No unsupported profile facts, new article publication dates, case-study copy
changes, unrelated route redesign, extra localhost ports, merge, publication,
or deployment.

### Files, verification, and acceptance

Files: `src/pages/about/AboutPage.jsx`, `src/pages/about/AboutPage.css`,
`src/lib/seoMetadata.js`, `src/components/Projects.jsx`,
`src/data/projects.js`, `src/pages/blog/BlogPage.jsx`,
`src/pages/blog/BlogPostPage.jsx`, `src/styles/pages/blog.css`,
`src/components/ProjectTechnologyTag.jsx`,
`src/styles/components/project-technology-tag.css`,
`public/projects/*-cover-v2.webp`, and this backlog entry.

Verification: `npm.cmd run lint`, `npm.cmd run verify:assets`,
`npm.cmd run build`, `git diff --check`, and browser review on the existing
5174 preview. Check About and Writing at wide and narrow widths, both themes,
keyboard navigation, article anchors, query state, and image loading. No new
automated tests are added for this visual package.

Acceptance: the About page introduces Shaurya with his real portrait and
verified facts, presents selected work and experience clearly, and links to
existing destinations; Writing search and topics remain shareable in the URL,
all eleven posts and the legacy route work, article contents links reach real
headings, progress tracks reading, and adjacent essays are reachable; all six
new covers are visibly distinct and optimized, current product/research images
remain authentic, the source-pending project stays text-only, and all checks
pass on the existing single port.

Evidence: lint checked 100 source files; asset integrity checked 85 local assets,
15 routes, 13 projects, and 21 artwork records; the production build generated
24 route documents. The build skipped optional resume sync because
`resume/resume.tex` is absent and reported the existing 525 KB main-chunk size
advisory. `git diff --check` completed successfully; Git emitted CRLF-to-LF
notices for the About files.
On the existing 5174 preview at a 584 px viewport, all 12 project images
loaded, including all six distinct optimized covers and the linked product and
research images; the source-pending project remained image-free. All 39 rendered
technology tags rendered an icon, including Python, Flask, and FFmpeg. The
About portrait and its three selected-work images loaded. Writing showed all 11
essays; URL-backed research filtering, empty-state reset, legacy `?post=`
redirect, contents navigation, reading progress, adjacent essays, and the
filtered return path were verified. Desktop and narrow screenshots were
reviewed for About, Writing, and the project archive; both themes were checked
across the updated surfaces. About selected-work technology marks are shared
with the project cards and wrap cleanly on mobile. Dark mode was restored.
Port 5174 returns HTTP 200 and is the only Node development server listening.
Ports 4173 and 5173â€“5177 are closed. The separate Touchscreen Launchpad
preview on 4173 was stopped as requested earlier; its branch and working-tree
files were left untouched.
Other localhost listeners belong to Windows or desktop application services
and were left alone. No new server was started. The earlier auto-review
rejection for transmitting the broader About/Writing source was not retried;
no Jev source review was claimed for this package. No automated tests,
deployment, publication, merge, commit, or push were performed.

Implementation branch: `codex/project-card-revamp-20260928`.

## Interactive project playground: Package 14

Goal: give visitors a small, accessible way to play with an idea from the
Touchscreen Launchpad project and then explore how that project is structured.

### Scope

- [x] Add a four-pad synthesized-tone playground to the homepage with touch,
      click, and Q/W/E/R keyboard input, layered notes, active feedback, and a
      reset control that stops current notes. Do not fire pad shortcuts while
      an unrelated interactive control has focus.
- [x] Start audio only after a visitor activates a pad. Keep all audio
      generation in the current browser and label the four-tone demo as a
      separate sketch, not the full sample-based Launchpad.
- [x] Add a five-stage Problem â†’ Input â†’ System â†’ Output â†’ Lessons story to
      the Touchscreen Launchpad project detail, sourced from the existing
      project record.
- [x] Let visitors select a documented architecture component in the System
      stage to inspect its role and boundary.
- [x] Link the playground to the project story through the existing
      URL-backed project detail flow.
- [x] Preserve keyboard focus, readable color contrast, responsive layout,
      theme support, and reduced-motion behavior.

### Non-goals

No external audio assets or requests, backend, changes to the Launchpad
repository, full audio-recognition explorer, audience tour, skills explorer,
project comparison, AI project selector, deployment, publication, or merge.

### Files, tests, and acceptance

Files: `src/pages/home/Home.jsx`, `src/pages/home/Home.css`,
`src/components/AudioPlayground.jsx`,
`src/components/AudioPlayground.css`,
`src/components/ProjectDetailDialog.jsx`,
`src/components/ProjectStory.jsx`, `src/components/ProjectStory.css`, and this
backlog entry.

Tests: `npm.cmd run verify` (including lint, automated tests, asset integrity,
production build, and static route generation), `git diff --check`, and rendered
browser checks for pad click/keyboard playback, shortcut suppression while
Reset or another unrelated control has focus, layering, reset, project-story
stage switching and architecture selection, responsive layout, reduced motion,
and console health. No new automated test file was needed for this
interaction-only package.

Acceptance: visitors can play and reset four distinct synthesized tones with
keyboard or touch; playback never starts without an explicit action; the demo
makes its separation from the full Launchpad clear; the project story exposes
all five stages using documented project details and its System stage exposes
the role and boundary for each architecture component; existing project detail
URLs and dialog focus behavior remain intact; and the local quality and browser
checks pass.

Evidence: `npm.cmd run verify` passed: lint checked 104 source files, all 38
tests passed, integrity checked 86 assets / 15 routes / 14 projects / 21 artwork
records, Vite built the production app, and 24 static route documents were
generated. `git diff --check` passed. Local browser checks at `http://127.0.0.1:5173/`
verified four pads, keyboard and click playback, layered notes, reset, all five
story stages, selectable architecture nodes, existing URL-backed detail and
Escape close behavior, two-column pads/story on mobile, four-column pads on
desktop, and no horizontal overflow. Pressing R while Reset had focus left the
status unchanged with no active pads; pressing R with a pad focused played
Bright C5, and Reset stopped it. With reduced motion enabled, pad and story
transitions compute to `0s`; the browser reported no app errors. The optional
resume sync skipped because `resume/resume.tex` is absent. The build emitted the
large-chunk advisory for the 536.81 kB main bundle.

## Optional 60-second audience tour: Package 15

Goal: turn the existing Admissions, Collaboration, and Curious audience lenses
into a short, visitor-controlled route through one relevant project per lens.

### Scope

- [x] Add exactly three stops from the existing lens data: Admissions â†’ Past
      Paper AI, Collaboration â†’ StadiumPulse AI, Curious â†’ Audio Recognition.
- [x] Explain why each project matters to that audience with text grounded in
      its problem and outcome; link to the existing project-detail URL.
- [x] Provide an explicit start, Back, Next, Finish, Close, and accessible
      progress; never advance automatically or change the URL-backed lens.
- [x] Preserve keyboard and touch operation, focus, responsive layout, theme
      support, and reduced-motion behavior.

### Non-goals

No skills explorer, project comparison, expanded transition system, audio
signal explorer, AI project selector, provider calls, autoplay, deployment,
publication, or merge.

### Files, tests, and acceptance

Files: `src/components/PortfolioTour.jsx`,
`src/components/PortfolioTour.css`, `src/data/profile.js`,
`src/lib/audienceLens.js`, `src/pages/home/Home.jsx`,
`src/pages/home/Home.css`, `tests/portfolioTour.test.mjs`, `package.json`, and
this backlog entry.

Tests: `npm.cmd run verify`, `git diff --check`, data-reference unit tests, and
rendered browser checks for all three stops, progress and Back/Next/Finish,
keyboard focus, unchanged lens URL, project-detail links, responsive layout,
and reduced motion.

Acceptance: visitors can choose to open a three-stop, roughly 60-second tour;
each stop maps to one of the existing audience lenses and one verified project,
shows audience-specific relevance without new unverified claims, and links to
the project's existing detail. Controls work by touch and keyboard, progress
is announced accessibly, and tour use leaves audience URL state intact.

Evidence: `npm.cmd run verify` passed (106 source files linted, 40 tests passed,
86 assets/15 routes/14 projects/21 artwork records checked, production build
and 24 static route documents generated). Browser verification on
`http://127.0.0.1:5173/` covered all three stops, Back/Next/Finish, accessible
progress, project links, stop-heading focus, focus restoration on close, and
unchanged homepage URL. On a 584 Ã— 585 browser viewport, opening and advancing
the tour scrolled each focused stop heading into view. The local server remains
running for user review.

## Skills-to-project explorer: Package 16

Goal: let visitors select Audio, Python, or Local-first and see the projects,
evidence, and limitations that support each skill relationship.

### Scope

- [x] Add explicit, source-grounded skill tags to canonical project records;
      do not infer matches from free text or duplicate project IDs in a second
      catalog.
- [x] Build a deterministic selector that returns tagged projects with their
      existing outcomes, limitations, proof labels, and relevant technologies.
- [x] Add an accessible homepage explorer with Audio, Python, and Local-first
      controls and links into each project's existing detail view.
- [x] Show an accessible cover-unavailable fallback when a project image fails
      to load, matching the existing project-card behavior.
- [x] Preserve keyboard and touch operation, current URL state, responsive
      layout, distinct topic palettes, theme support, and reduced motion.

### Non-goals

No constellation visualization, new claims or evidence, AI/provider calls,
interactive project-story changes, comparison tool, animation package, audio
signal explorer, AI project selector, deployment, publication, or merge.

### Files, tests, and acceptance

Files: `src/data/projects.js`, `src/lib/projectSkills.js`,
`src/components/SkillsProjectExplorer.jsx`,
`src/components/SkillsProjectExplorer.css`, `src/pages/home/Home.jsx`,
`tests/projectSkills.test.mjs`, `tests/skillsProjectExplorer.test.mjs`,
`package.json`, and this backlog entry.

Tests: `npm.cmd run verify`, `git diff --check`, deterministic match/evidence
unit tests, a component render regression for a missing thumbnail, and rendered
browser checks for every skill selection, project detail links, keyboard
operation, unchanged URL state, responsive layout, and reduced motion.

Acceptance: selecting Audio, Python, or Local-first shows only projects whose
canonical records carry that skill, pairs each project with its existing
outcome and proof context, keeps its limitations visible, and links to its
existing detail. Failed and missing images show accessible fallbacks. Controls
work by keyboard and touch, announce their selected state, and do not change
URL-backed audience or search state.

Evidence: `npm.cmd run verify` passed (109 source files linted, 45 tests passed,
86 assets/15 routes/14 projects/21 artwork records checked, production build
and 24 static route documents generated). Browser checks on
`http://127.0.0.1:5173/` returned Audio â†’ 2 projects, Python â†’ 6, and
Local-first â†’ 3; all cards showed existing outcomes, limitations, proof labels,
and detail links. Enter selected Audio, and the homepage URL remained unchanged.
The Python view rendered a labeled missing-preview fallback for the archive-only
Student Dropout record, with its repository-pending proof label intact. The
explorer also switches a failed remote cover to its accessible fallback. At
584 Ã— 585, the page had no horizontal overflow; reduced motion was active and
the controls used 100 ms color/background/shadow transitions without spatial
movement. A fresh reload produced no new browser console errors. The local
server remains running for user review.

## Saved-project comparison: Package 17

Goal: give visitors a second use for the existing reading list by comparing
two saved projects against their recorded goals, architecture, technologies,
and limitations.

### Scope

- [x] Add an accessible comparison toggle beside the existing reading-list
      control; require at least two saved projects.
- [x] Limit both project selectors to distinct, current reading-list entries.
- [x] Compare each project's problem statement, recorded architecture note,
      key decision, technology stack, and limitations; label missing
      architecture notes clearly.
- [x] Link to existing project details and architecture diagrams where
      canonical links exist.
- [x] Preserve the existing reading-list storage and URL filter contracts;
      support keyboard use, small viewports, and reduced motion.

### Non-goals

No AI/provider calls, new project claims or architecture metadata, unsaved
comparison choices, new routes, persistent comparison state, deployment,
publication, or merge.

### Files, tests, and acceptance

Files: `src/components/Projects.jsx`, `src/components/Projects.css`,
`src/components/ProjectComparison.jsx`,
`src/components/ProjectComparison.css`, `src/lib/projectComparison.js`,
`tests/projectComparison.test.mjs`,
`tests/projectComparisonComponent.test.mjs`, `package.json`, and this backlog
entry.

Tests: `npm.cmd run verify`, `git diff --check`, unit tests for distinct saved
IDs and stale/unsaved choices, a component render regression for saved-only
options and source fields, and browser checks for saving, selecting, comparing,
detail and diagram links, responsive layout, reduced motion, and unchanged URL
state.

Acceptance: visitors can compare exactly two distinct projects from their
  current reading list. The comparison uses each canonical problem statement,
  technology stack, and limitation; it shows an architecture note only when one
  is recorded, identifies missing notes, and keeps the recorded key decision
  separate. Existing detail links and available diagram links work; opening
  project details preserves existing search, tag, saved, and audience query
  parameters while adding the selected project. Comparison controls are
  keyboard accessible.

Evidence: `npm.cmd run verify` passed (112 source files linted, 48 tests passed,
86 assets/15 routes/14 projects/21 artwork records checked, production build,
and 24 static route documents generated); `git diff --check` passed. Browser
checks at `http://127.0.0.1:5173/projects` confirmed the comparison control is
disabled and its panel hidden with one saved project. After temporarily saving
Audio Recognition, the two selectors contained only StadiumPulse AI and Audio
  Recognition; the comparison showed goal/problem, architecture note, key
  decision, technologies, and limitations, plus the existing diagram and detail
  links. The missing architecture note was labeled explicitly, the URL stayed
  `/projects`, and a 584 Ã— 585 viewport displayed the comparison dimensions in a
  single-column layout without visible horizontal overflow. Component coverage
  confirms detail links preserve `q`, `tag`, `saved`, and `lens` while adding
  the selected project. The temporary save was removed and the original
  one-project reading list restored. The local server remains available for
  user review.

## Expressive project transitions: Package 18

Goal: make project archive interactions feel connected and responsive through
a cover-to-detail transition, measured filter reflow, and immediate press
feedback.

### Scope

- [x] Share the selected project's cover frame between its archive card and
      detail dialog, including a matching return transition on close.
- [x] Animate only the position of remaining project cards when search or area
      filters change; preserve canonical order and existing URL state.
- [x] Give archive and dialog buttons short press feedback that works for touch
      as well as pointer input; keep hover-only styling for fine pointers.
- [x] Preserve the existing category palettes, focus handling, Escape close,
      direct project URLs, touch/keyboard operation, and ordinary scrolling.
- [x] Under reduced motion, remove shared and positional movement while keeping
      immediate state changes and a brief dialog opacity transition.

### Non-goals

No site-wide animation redesign, new animation dependency, content or data
changes, route/storage changes, deployment, publication, or merge. Existing
first-view project reveals remain unchanged.

### Files, tests, and acceptance

Files: `src/components/Projects.jsx`, `src/components/Projects.css`,
`src/components/ProjectDetailDialog.jsx`,
`src/styles/components/project-detail-dialog.css`, and this backlog entry.

Tests: `npm.cmd run verify`, `git diff --check`, and local browser checks for
card-to-dialog open/close, direct URL fallback, keyboard and Escape/focus,
filter reflow and URL preservation, touch press feedback, fine-pointer hover
gating, reduced motion, and responsive overflow.

Acceptance: selecting a project connects its cover to the dialog's media frame
and closing it returns the frame to its card; a project opened from a direct
URL gets a short fallback transition. Filters move remaining cards using a
position-only transition under 300 ms without changing result order or URL
state. Press feedback is immediate and subtle, hover effects remain fine-pointer
only, and reduced motion removes spatial movement while preserving semantic
dialog/focus behavior and readable state feedback.

Evidence: `npm.cmd run verify` passed: 112 source files linted, 48 tests passed,
86 assets, 15 routes, 14 projects, and 21 artwork records checked, and 24 static
route documents generated. The optional resume sync skipped because
`resume/resume.tex` is absent; the production build retains the existing
552.51 kB main-chunk warning. `git diff --check` passed. Browser checks covered
card open/close, keyboard open and Escape focus restoration, direct project URL
fallback, and AI filtering (`?tag=AI`, three matching projects). At the 569 px
viewport, the filter chips wrapped without visible horizontal overflow. Source
inspection confirms positional/shared motion is disabled under reduced motion,
press feedback uses the existing 140 ms token, and hover styles are gated to
fine pointers; touch and reduced-motion preferences were not separately
emulated. The original one-project reading list was restored, the archive is
back at `/projects`, and the local server remains available for user review.

## Audio signal explorer: Package 19

Goal: give visitors a small, hands-on explanation of how generated audio
signals change across a waveform and frequency spectrum, alongside the
Audio Recognition case study.

### Scope

- [x] Add three clearly named synthetic signal presets with frequency and noise
      controls that update a deterministic waveform and DFT spectrum.
- [x] Add keyboard- and touch-operable controls and explicit, short local audio
      playback with a stop control and cleanup.
- [x] Label the widget as an educational synthetic example, separate from any
      recording, catalog comparison, or recognition result.
- [x] Keep the explorer inside the Audio Recognition detail view; preserve
      existing project facts, dialog navigation, reduced motion, and scrolling.

### Non-goals

No microphone or upload access, external samples or network calls, claims that
the widget reproduces the project's recognition pipeline, new route, storage,
provider integration, deployment, publication, or merge.

### Files, tests, and acceptance

Files: `src/components/AudioSignalExplorer.jsx`,
`src/components/AudioSignalExplorer.css`, `src/lib/audioSignalModel.js`,
`tests/audioSignal.test.mjs`, `src/components/ProjectDetailDialog.jsx`,
`package.json`, and this backlog entry.

Tests: `npm.cmd run verify`, `git diff --check`, deterministic signal-model unit
tests, and browser checks for project-only rendering, control-to-plot updates,
explicit playback with no autoplay, keyboard operation, responsive overflow,
dialog scrolling, direct URLs, and runtime errors.

Acceptance: visitors can change the generated signal's shape, frequency, and
noise and see both plots update. Playback starts only after activation, stays
local and brief, and can be stopped. Accessible native controls work by
keyboard and touch. Clear copy explains that the visualization is synthetic
and is not a recognition result. Other project dialogs and existing evidence
remain unchanged.

Evidence: `npm.cmd run verify` passed: 115 source files linted, 52 tests passed
(including four signal-model tests), 86 assets, 15 routes, 14 projects, and 21
artwork records checked, and 24 static route documents generated. The optional
resume sync skipped because `resume/resume.tex` is absent; the production build
retains the >500 kB main-chunk warning (562.20 kB). `git diff --check` passed.
Browser checks covered the direct Audio Recognition URL, no explorer on a
different project's detail, preset/frequency/noise updates to both plots,
keyboard frequency adjustment, explicit play/stop status, and dialog scrolling.
At the 584 px viewport the plot and controls fit the dialog without visible
horizontal overflow. No audio played until Play was activated. Native controls
provide touch operation; the browser session did not emulate a touch device or
reduced-motion preference. The plot has no animated transitions, and the local
server remains available at `/projects?project=audio-recognition` for review.
Independent review found and drove two fixes: light-theme preset accents now
contrast at 5.60:1 or better against the cream surface, and an in-flight start
lock with a disabled `Starting...` control prevents repeated activation while
the browser resumes audio. A light-theme screenshot confirmed the harmonic
palette remains distinct and readable.

## Guided project finder: Package 20

Goal: Let a visitor describe a topic in plain language, select relevant existing projects through TypeSafe Jev, and read only the canonical project descriptions already recorded in this site.

### Scope

- [x] Add an explicit-submit prompt bounded to 240 characters and a short disclosure before sending it.
- [x] Send only the visitor prompt and bounded public project fields to a server-side TypeSafe endpoint; keep the API key off the browser.
- [x] Bound provider request volume and concurrent work per running endpoint instance.
- [x] Validate typed Noul responses, threshold and rank matches, cap results at three, and return canonical IDs only.
- [x] Show canonical project summaries with links into the existing project detail dialog.
- [x] Provide deterministic local keyword matching when TypeSafe is unavailable; do not store the prompt or put it in the URL.
- [x] Document TypeSafe as a third-party processor and advise visitors not to enter personal or private information.

### Non-goals

Generated project copy, automatic prompt submission, prompt history, analytics, account state, new project retrieval, dependency additions, secret setup, deployment, publication, or merging.

### Files, tests, and acceptance

Files: `api/project-picker.js`, `vite.config.js`, `src/lib/projectFinder.js`, `src/components/ProjectFinder.jsx`, `src/components/ProjectFinder.css`, `src/components/Projects.jsx`, `src/pages/privacy/PrivacyPage.jsx`, `tests/projectFinder.test.mjs`, `package.json`, and this backlog entry.

Tests: `npm.cmd run verify`, focused finder handler and selection tests, `git diff --check`, local API behavior, and browser inspection of the finder form and privacy copy.

Acceptance: query length, request body, and provider request volume are bounded; only the server contacts TypeSafe; provider output is validated and mapped to known IDs; fallback uses site records; results do not change archive URL state; submitted text is not written to browser storage, the URL, or application logs; local preview remains available.

Evidence: `npm.cmd run verify` passed: 118 source files linted, all 61 tests passed, 86 assets, 15 routes, 14 projects, and 21 artwork records checked, and 24 static route documents generated. The optional resume sync skipped because `resume/resume.tex` is absent; the production build retains a 567.19 kB main-chunk warning. `git diff --check` passed. Local `/projects` returned HTTP 200; the browser accessibility snapshot showed the labeled prompt, 240-character counter, disabled empty-submit control, pre-submit provider-data/privacy notice, and existing 14-project archive. A local POST returned `503 PROVIDER_UNAVAILABLE` because no local key is configured, with no upstream call. Automated tests verify deterministic local ranking, typed ID-only provider output, request limits, fallback paths, and archive mapping. The browser form was not manually submitted in this verification session. Jev reviewed all 10 changed text files with no exclusions or sensitive files; its generic privacy/test-risk gate contained no concrete finding. Independent review found no code findings. The request/concurrency limiter is best-effort per running endpoint instance, not a global provider spend ceiling.

Implementation branch: `codex/portfolio-project-finder`.

## Professional-field SEO and profile alignment: Package 11

Goal: make the portfolio and its public identity clearly relevant to software
development, web development, full-stack work, applied AI, machine learning,
and data science while keeping descriptions tied to verified project evidence.

### Scope

- [x] Update the home title, description, visible hero copy, and Projects page metadata.
- [x] Align canonical LinkedIn and Kaggle links in profile data, fallback HTML, and `Person.sameAs` structured data.
- [x] Link Token Smart Router to its public hackathon submission from the project detail.
- [x] Align metadata regression expectations with the verified URLs and title.

### Non-goals

No new SEO-only or thin keyword pages, unsupported expertise or performance
claims, route/canonical changes, Search Console configuration, ranking promises,
or production deployment in this package.

### Files, tests, and acceptance

Files: `src/lib/profileLinks.js`, `src/lib/seoMetadata.js`,
`src/components/Hero.jsx`, `src/data/projects.js`,
`src/components/ProjectDetailDialog.jsx`, `index.html`,
`public/site.webmanifest`, `tests/seoMetadata.test.mjs`, and this backlog
record.

Tests: existing SEO metadata regression coverage and the repository quality
gate (`npm.cmd run verify`); execution remains subject to the current task's
test instruction.

Acceptance: initial HTML and route metadata describe a student software and
web developer whose project archive covers AI/ML and data work; visible
profile links and structured data use the verified LinkedIn and Kaggle URLs;
Token Smart Router exposes a descriptive source submission link; no measured
quality, savings, or ranking claim is introduced.

Evidence: authenticated Jev recommendation, live public profile review, the
user-supplied Kaggle profile URL, and the public Token Smart Router submission.

Implementation branch: `codex/seo-field-expansion`.

## Semantic runtime cleanup: Package 10

Goal: remove the confirmed duplicate article heading and make the live
contribution calendar expose its interactive cells as actionable controls.

### Scope

- [x] Remove the redundant level-one heading from the audio article body so
      the page shell owns the article title.
- [x] Keep the contribution calendar's visual grid while nesting native
      buttons inside semantic grid cells.
- [x] Add a regression test preventing MDX posts from adding another `h1`.

### Non-goals

No copy rewrite, redesign, API change, deployment, hosted publication, or
change to the contribution data source.

### Files, tests, and acceptance

Files: `src/posts/shazam-clone.mdx`, `src/components/GitHubContributions.jsx`,
`src/components/GitHubContributions.css`, `tests/postContent.test.mjs`, and
this backlog record.

Tests: `npm.cmd run verify`, rendered route checks for the audio article and
homepage calendar, and console/overflow checks in the local browser.

Acceptance: every blog article has one page-level `h1`; contribution cells
remain clickable and keyboard-focusable while their accessible role is
button; published routes keep their existing layout and URLs.

Evidence: the deployed `/blog/shazam-clone` currently renders two identical
`h1` elements; the local and deployed homepages otherwise load without app
errors or horizontal overflow at the available browser viewport.

Implementation branch: `codex/website-codebase-audit-20260921`.

## Interactive project disclosure: Package 1

- [x] Centralize project records so the homepage and project archive use one source of truth.
- [x] Add URL-backed project search and category filters with a clear empty state.
- [x] Add one accessible quick-view panel per project, rendered as a desktop drawer and mobile bottom sheet.
- [x] Preserve numbered project hashes and homepage deep links while adding shareable `?project=` state.
- [x] Add keyboard focus trapping, focus restoration, Escape/backdrop dismissal, body-scroll cleanup, and reduced-motion-safe styling.
- [x] Add pure filtering/hash-resolution tests and verify the production build.
- [x] Retrospective independent validation completed in the final route and interaction evidence pass.

Implementation branch: `codex/mobile-first-project-disclosure`.

## Blog URL state: Package 2

- [x] Make the selected blog post derive from `?post=slug` instead of duplicated local state.
- [x] Preserve unrelated query parameters and clean invalid post slugs with a history replacement.
- [x] Support direct links, browser back/forward, keyboard focus into the post, and focus restoration to the archive trigger.
- [x] Add pure URL-state tests and verify the production build and rendered browser behavior.
- [x] Retrospective independent validation completed in the final route and interaction evidence pass.

Implementation branch: `codex/blog-url-state`.

## Artwork and certificate disclosure: Package 3

- [x] Add stable artwork identifiers and a shared URL-driven media detail viewer.
- [x] Add certificate detail views with unique identifiers for duplicate certificate titles.
- [x] Preserve direct certificate PDF links and existing section anchors.
- [x] Add focus trapping/restoration, Escape/backdrop close, body-scroll cleanup, invalid-ID cleanup, and reduced-motion-safe styling.
- [x] Add media URL-state tests and verify the production build and rendered browser behavior.
- [x] Independent validation before starting Package 4 quality and evidence audit.

Validation evidence: `npm.cmd test` passes 8/8 and `npm.cmd run build` passes. Fresh Browser checks at 502x565 cover archive/detail rendering, direct duplicate-certificate deep links, back/forward history, Escape and focus restoration, invalid-ID cleanup, mobile bottom-sheet geometry, alt-text coverage, safe PDF links, and horizontal-overflow checks. Only the expected dev-tool reduced-motion warning appeared; no app errors were reported.

Implementation branch: `codex/artwork-certificate-disclosure`.

## Reproducible quality and evidence gates: Package 4

- [x] Add dependency-free source linting for em dashes, image alternatives, and safe new-tab links.
- [x] Add route, static-asset, project-record, and artwork-record integrity validation.
- [x] Add deterministic missing and present-source resume-sync tests.
- [x] Add one-command local verification and a GitHub Actions quality workflow.
- [x] Document the local gate and its evidence boundary.
- [x] Independent validation completed in the Package 5 Browser pass.

Implementation branch: `codex/quality-evidence-audit`.

## Accessibility and editorial audit: Package 5

- [x] Restore a strict archive heading hierarchy by using `h2` for blog entries beneath the page `h1`.
- [x] Label new-tab and PDF destinations for assistive technology while preserving visible link copy.
- [x] Give the contact section an explicit heading relationship and retain form field labels.
- [x] Scope artwork and project hover affordances to fine pointers so touch does not depend on hover state.
- [x] Verify the mobile navigation focus loop, Escape cleanup, page landmarks, link labels, and not-found containment in Browser.
- [x] Reconcile stale README statements about the removed interactive portrait and Lenis dependency.
- [x] Independent validation before starting Package 6 final visual and performance evidence.

Implementation branch: `codex/accessibility-editorial-audit`.

## Final visual and performance evidence: Package 6

- [x] Run the combined local quality gate: lint, tests, route/asset integrity, and production build.
- [x] Verify every app route plus the not-found route in the production preview at 1280x720 with meaningful content, no framework overlay, no horizontal overflow, and no eagerly loaded broken images.
- [x] Retain the inherited 502x565 Browser evidence for mobile navigation, dialogs, invalid URL cleanup, focus restoration, and bottom-sheet layout.
- [x] Confirm the portrait is static and does not carry a continuous RAF loop; keep one-shot loader, focus, and not-found timers scoped to their lifecycle.
- [x] Record that hosted Core Web Vitals, physical-device behavior, and deployment evidence remain unclaimed.
- [x] Complete independent validation before closing the implementation plan.

Evidence: `npm.cmd run verify` passes. Production preview route matrix passed at `http://127.0.0.1:5180/` on 2026-09-05 at 1280x720; mobile interaction evidence remains from the validated 502x565 Browser run. No hosted or physical-device claims are made.

Implementation branch: `codex/final-visual-performance-evidence`.

## Mobile-first redesign: Package 1

- [x] Rebuild the homepage around a static portrait, recruiter-first hero copy, four-link primary navigation, and concise work/profile/writing sections.
- [x] Preserve the accessible mobile drawer, focus restoration, Escape handling, body-scroll lock, theme control, and secondary pages under Explore.
- [x] Remove the interactive portrait, Lenis wrapper/dependency, legacy home stylesheet, and unreferenced portrait assets.
- [x] Enforce the 20 px mobile page gutter and fit the complete 390Ã—844 hero, including both CTAs, within the first viewport.
- [x] Retrospective independent validation completed in the final route and interaction evidence pass.

Local evidence: `npm.cmd run build` passes; Browser validation covers 320Ã—568, 390Ã—844, 768Ã—1024, and 1440Ã—900, both themes, menu open/close/focus restoration, CTA routing, and narrow-viewport overflow checks. A real browser 200% zoom pass remains for independent validation. Hosted/deployment evidence is intentionally not claimed.

Implementation commit: `d2ac369` (`feat(portfolio): build mobile-first shell`).

## Copy and project imagery cleanup

- [x] Remove every U+2014 em dash from website copy, metadata, docs, and styles.
- [x] Replace featured project thumbnails with repository-sourced project visuals.
- [x] Replace the Movie Tracker archive thumbnail with its committed production screenshot.
- [x] Independently review image crops, captions, and accessibility at mobile and desktop sizes.

Evidence: Audio Recognition uses `docs/screenshots/fft-output.png`, F1 uses `docs/predicted_vs_actual_2023.png`, Movie Tracker uses `docs/assets/production/production-desktop-2026-08-16.png`, and StadiumPulse uses a screenshot captured from its public deployed command center at `https://stadiumpulse-ai-nine.vercel.app/login` because the repository does not commit a screenshot asset. Local build, route/asset checks, and responsive Browser evidence are required before this package is accepted.

Implementation commit: `8d02f53` (`feat(portfolio): use real project imagery and remove em dashes`).

## Content and evidence clarity: Package 7

Goal: Make the recruiter-facing opening concrete, remove the empty BirdCLEF
stub from published surfaces, and reconcile the audio project and writing
evidence without inventing measurements.

### Scope

- [x] Replace the abstract hero promise with specific web-tool and ML copy,
      and keep the headline readable in narrow layouts.
- [x] Remove the empty BirdCLEF article from the writing index, homepage
      promotion, project page callout, and lazy route map.
- [x] Separate the React + Supabase browser prototype from the repository-linked
      Python + Flask audio-recognition project in the article and project data.
- [x] Derive displayed reading times from generated MDX source word counts.
- [x] Add focused reading-time tests and retain the existing quality gate.

### Non-goals

The broader visual redesign, new project screenshots or demos, unverified
BirdCLEF results, analytics, Core Web Vitals measurement, and hosted/device
validation remain separate work.

### Files, acceptance, and evidence

Files: hero, project data, blog metadata and MDX, reading-time helper and
metadata sync script, project styles, tests, and package scripts.

Acceptance: no published BirdCLEF stub or stale link; the audio article names
both implementations and links the source/project entry; reading time changes
with source length; the hero has no clipped text at the tested narrow surface.

Evidence: `npm.cmd run verify` passes with 74 source files linted, 13 tests,
79 local assets, 10 routes, 8 projects, 21 artwork records, and a production
build. Browser checks at the available 501x564 viewport covered the revised
hero, primary work CTA, retired BirdCLEF URL cleanup, writing archive, audio
article, project dialog, screenshots, and final console health. Exact 320px
and 390px viewport emulation was unavailable in the connected browser surface.

Implementation branch: `codex/content-evidence-first-package`.

## GitHub contributions on home: Package 8

Goal: Add a reference-matched GitHub activity calendar to the homepage that
shows current public contribution data without inventing or hardcoding counts.

### Scope

- [x] Add a one-year contribution calendar section after homepage writing.
- [x] Fetch public activity through a bounded, cached contribution endpoint.
- [x] Add hover, keyboard focus, and click-to-inspect day details.
- [x] Keep loading and error states honest, with a direct GitHub profile fallback.
- [x] Match the reference panel's dark surface, labels, green levels, and legend.

### Non-goals

Private contribution disclosure, authenticated GitHub access, contribution
activity timelines, a new backend, and hosted or physical-device validation.

### Files, tests, acceptance, and evidence

Files: homepage, contribution component and styles, pure calendar data helper,
focused contribution tests, package scripts, and this backlog record.

Tests: helper tests for week layout, month labels, level normalization, totals,
and accessible date labels; `npm.cmd run verify`; rendered desktop and mobile
homepage checks with console/error inspection.

Acceptance: the homepage renders the contribution section with a real one-year
calendar when public data is available; cells expose date/count labels and can
be inspected by keyboard or pointer; narrow layouts remain scrollable without
page overflow; unavailable data is clearly reported and links to GitHub.

Evidence: reference comparison, `npm.cmd run verify` passes with 77 source
files linted, 16 tests, 79 local assets, 10 routes, 8 projects, and 21
artwork records. The connected browser at 502x565 loaded 1,666 live public
contributions, rendered 371 accessible day cells across five levels, showed
the internal calendar scroll without page overflow, and confirmed click-to-
inspect detail state. Desktop evidence remains limited by the available
browser viewport; the reference desktop screenshot was used for visual parity.

Implementation branch: `codex/github-contributions-home`.

## Shared route coherence cleanup

- [x] Put About, Projects, Writing, Not Found, Uses, Artwork, Certificates, Achievements, and Contact on the same centered page shell.
- [x] Align mobile gutters, opening rhythm, heading type, flat surfaces, borders, and interaction feedback with the homepage system.
- [x] Remove route-specific full-bleed offsets, heavy card gradients, and shadow treatments that made secondary pages feel unrelated.
- [x] Keep dark and light themes, keyboard navigation, reduced-motion behavior, and existing content/routes intact.

Evidence: Browser checks at 320x568, 390x844, 768x1024, and 1440x900 cover every route, including the missing-route fallback. All checked routes report no horizontal overflow and no em dash copy; light-theme rendering was also checked on the About route. `npm.cmd run build` passes.

Implementation branch: `codex/remove-em-dashes-real-project-images-20260903`.
Implementation commit: `93fc0e5` (`refactor(portfolio): unify secondary page shell`).

Repository: `C:\Users\91829\OneDrive\Documents\GitHub\shaurya-portfolio`
Reviewed: clean `main` at `d839f9e` on 2026-08-25
Feature branch: `codex/luna-portfolio-performance-proof`

## Current verified baseline

- Vite production build passes.
- Optional resume sync reports that `resume/resume.tex` is absent, then correctly continues.
- `npm.cmd run lint`, `npm.cmd test`, `npm.cmd run verify:assets`, and `npm.cmd run build` pass locally.
- The homepage uses a static portrait, so there is no portrait RAF loop to gate or measure.

## Build checklist

- [x] **1. Make portrait eligibility dynamic**
  Not applicable: the interactive portrait was removed and replaced by a static image in the mobile-first shell.

- [x] **2. Fully gate hover and scope motion**
  Files: `src/styles/pages/artwork.css`, modal/animation utilities, affected components.
  What to build: Put hover-only transform and shadow inside `(hover: hover) and (pointer: fine)`; keep focus-visible and active feedback independent. Remove broad/dead animation rules only when proven unused.
  Acceptance: Touch cannot retain hover shadow/transform and keyboard focus remains visible.
  Verify: CSS/source assertion plus coarse/fine pointer browser screenshots.

- [x] **3. Add reproducible quality scripts**
  Files: `package.json`, ESLint config, component tests, CI.
  What to build: Add lint, Vitest/Testing Library, and a route/asset validator. Keep optional resume sync deterministic and test missing/present source behavior.
  Acceptance: `npm run lint`, `npm test`, and `npm run build` work from a clean install.
  Verify: Tests for portrait lifecycle, navbar focus/Escape/return, theme, modal, and route links.

- [x] **4. Audit case-study evidence**
  Files: project data, case-study pages, artifacts, links.
  What to build: For every featured project state problem, role, approach, verified outcome, limitations, repo/demo status, and evidence layer. Remove or qualify unverifiable metrics.
  Acceptance: Mock, local, hosted, AI-generated, and production claims are visibly distinct; screenshots match current UI and contain no private data.
  Verify: Route inventory and link/asset checker; manual content review.

- [x] **5. Finish accessibility and editorial conversion**
  Files: app shell, navbar, project cards, case studies, not-found state.
  What to build: Verify skip link, landmarks, headings, image alternatives, external-link purpose, menu/modal focus, contrast, CTA hierarchy, and removed/private-project handling.
  Acceptance: Navigation and primary contact/project actions remain clear at 320px, 200% zoom, keyboard-only, and reduced motion.
  Verify: Automated accessibility smoke plus keyboard and screen-reader review.

- [x] **6. Capture final visual/performance evidence**
  Files: `artifacts/` and private review notes as appropriate.
  What to build: Refresh only stale screenshots and record idle portrait CPU/RAF behavior at mobile, tablet, desktop, hidden tab, and coarse pointer.
  Acceptance: Screenshot proof is current and performance claims are tied to recorded checks.
  Verify: `npm.cmd run lint`; `npm.cmd test`; `npm.cmd run build`; `git diff --check`.

## Commit checkpoints

1. `perf(portfolio): stop hidden portrait work and gate hover`
2. `test(portfolio): add interaction and route quality gates`
3. `docs(portfolio): reconcile case-study evidence`

## Definition of done

- [x] Portrait RAF eligibility is dynamic and tested (not applicable: the portrait is static).
- [x] Hover, focus, active, and reduced-motion behavior are intentional.
- [x] Lint, tests, build, routes, and assets are reproducible.
- [x] Every case study is current, honest, accessible, and privacy-safe within the locally verified portfolio records.
- [x] Feature branch is committed and locally clean; publication remains intentionally unpushed pending explicit approval, and `main` is untouched and unmerged.

## Clear site-wide CTA system: Package 9

Goal: Make the portfolio's next actions immediately understandable while preserving its restrained editorial design.

### Scope

- [x] Establish a clear primary, secondary, text-link, and utility-control hierarchy.
- [x] Replace vague action labels with concise verb-and-target language.
- [x] Add consistent focus, press, hover, loading, and disabled feedback.
- [x] Keep navigation links semantic and reserve button styling for meaningful actions.

### Non-goals

New routes, content rewrites, form-provider changes, navigation redesign, and hosted deployment.

### Files, tests, acceptance, and evidence

Files: shared button styles plus the hero, home, contact, footer, uses, achievements, about, certificates, not-found, and detail-dialog CTA surfaces.

Tests: `npm.cmd run verify`, `npm.cmd run build`, `git diff --check`, and rendered desktop/mobile checks for key routes, keyboard focus, dialog actions, and console health.

Acceptance: each major section presents one obvious next action; labels describe the destination or result; focus and press states remain visible; loading text does not duplicate affordances; utility controls remain visually secondary.

Evidence: `npm.cmd run verify` passes with 77 source files linted, 16 tests, 78 local assets, 10 routes, 8 projects, and 21 artwork records. At the available 868x614 browser viewport, dark and light contact states show a single readable `Send message` affordance with visible keyboard focus; the homepage shows one filled `View projects` action beside a restrained rÃ©sumÃ© link; and the project dialog separates the filled `View source code` action from the outlined `Close details` control. The local browser console reported no application errors. Exact phone-width emulation was unavailable in the connected browser surface.

## Homepage pad removal: Package 21

Goal: remove the Touchscreen Launchpad four-pad demo from the main homepage.

### Scope

- [x] Remove the audio-pad section and its import from the homepage.
- [x] Keep the Touchscreen Launchpad project record and project detail story intact.
- [x] Add homepage render regression coverage for the removed pad group.

### Non-goals

Delete the Touchscreen Launchpad project, its project-story experience, or the reusable audio-playground source files; add replacement homepage content; publish or deploy.

### Files, tests, acceptance, and evidence

Files: `src/pages/home/Home.jsx`, `tests/homePage.test.mjs`, `package.json`, and this backlog entry.

Tests: `npm.cmd run verify`, `git diff --check`, and a rendered homepage browser check at the repository's local development URL.

Acceptance: the homepage no longer renders the four musical note pads or their invitation section. The selected-work and skills sections remain available, and the Touchscreen Launchpad project remains in the archive with its detail story.

Evidence: `npm.cmd run verify` passed (118 source files linted, 62 tests passed,
86 local assets/15 routes/14 projects/21 artwork records checked, production
build passed, and 24 static route documents generated). The optional resume
sync skipped because `resume/resume.tex` is absent. The build used a temporary
PATH shim for the installed Vite CLI because this worktree lacks
`node_modules/.bin/vite.cmd`. Browser check at `http://127.0.0.1:5174/` showed
the selected-work and skills sections without the four-pad group; Touchscreen
Launchpad remains discoverable through its project link. The existing large
JavaScript chunk warning remains.

## Smoother interactive panels: Package 22

Goal: make the existing homepage and project-story interactions feel connected and responsive while preserving their content, URLs, keyboard access, and current visual system.

### Scope

- [x] Add a shared audience-lens selection indicator and a brief transition for pointer-driven content changes.
- [x] Add direction-aware guided-tour step changes and smooth opening/closing while preserving Next, Back, Restart, Close, and focus restoration.
- [x] Reposition surviving skill cards without scaling their text; fade in newly added cards.
- [x] Smooth project-story stage changes, architecture expansion/collapse, and selected-node feedback.
- [x] Remove the stale sentence about the deleted homepage audio demo.

### Non-goals

New features, restored audio pads, provider or project-data changes, URL or saved-project behavior changes, global scrolling effects, deployment, publication, or merge.

### Files, tests, acceptance, and evidence

Files: `src/pages/home/Home.jsx` and `Home.css`; `src/components/PortfolioTour.jsx` and `.css`; `src/components/SkillsProjectExplorer.jsx` and `.css`; `src/components/ProjectStory.jsx` and `.css`; `src/lib/motion.js`; `tests/interactivePanels.test.mjs`; `package.json`; and this backlog entry.

Tests: `node --test tests/interactivePanels.test.mjs` during incremental work; one final `npm.cmd run verify`; `git diff --check`; and browser checks at `http://127.0.0.1:5174/` in desktop/mobile layouts, both themes, and separate normal/reduced-motion sessions. Exercise rapid reversals, focus restoration, overflow, and console health.

Acceptance: rapid changes always settle on the latest selection with no blank wait, duplicate accessible links or announcements, clipped controls, or text scaling. The tour controls and focus behavior remain intact. Lens URLs, saved projects, comparisons, and detail dialogs continue to work. Keyboard and reduced-motion changes remain immediate. Desktop/mobile content remains readable and palettes stay distinct.

Evidence: `npm.cmd run verify` passed: 118 source files linted, 64 tests passed,
86 local assets/15 routes/14 projects/21 artwork records checked, production
build passed, and 24 static route documents generated. Resume sync skipped
because `resume/resume.tex` is absent. A temporary PATH shim exposed the
installed Vite CLI because this worktree lacks `node_modules/.bin/vite.cmd`.
The existing large JavaScript chunk warning remains.

Browser checks at `http://127.0.0.1:5174/` passed in a visible desktop
viewport (1280 Ã— 900) and mobile viewport (390 Ã— 844), with light and dark
themes. The homepage showed no pads and retained the audience, project, skills,
and tour content. Lens click and arrow-key changes updated the selected lens and
URL. Rapid tour Next/Back changes settled on the latest stop, kept one project
link, and Close restored focus to the tour button. Rapid skill changes settled
on Audio with two cards and links. The Touchscreen Launchpad story remained
available; its system map expanded, collapsed to an inert subtree, and rapid
node changes left one selection and one live detail. Mobile project controls
fit without horizontal overflow. The in-app browser reported
`prefers-reduced-motion: reduce`; keyboard and reduced-motion changes were
immediate. Supplemental touch-enabled Chromium viewport emulation passed at
390 Ã— 844, 768 Ã— 1024, and 1024 Ã— 768 in both reduced-motion and
`no-preference` sessions. Lens URL updates, tour Next/Back/Close and focus
return, all skill filters, project-story stages and nodes, and saved-project
comparison worked without horizontal overflow or page errors. The normal-motion
run also verified the intro's touch-operated Skip control. The first-visit
privacy note was dismissed before feature checks; at 1024 Ã— 768 its fixed
overlay can cover the tour's bottom control until dismissed. These are emulated
viewports, not physical-device tests. The isolated runner denied several
external resource requests, while page error collection remained empty.


## Responsive navigation and pointer feedback: Package 23

Goal: keep every navigation link reachable on phones and tablets, including short screens, and provide clear pointer/tap feedback in both themes.

Scope: compact right-side drawer below 900px, smaller unnumbered primary links, two-column archive, one scroll region including profile links, fixed header/close control, and comfortable tap targets. Larger desktop cursor with color inversion (`mix-blend-mode: difference`) and a subtle center; brief touch/pen halo canceled during scrolling or dragging. Preserve keyboard focus, Escape, reduced motion, and laptop navigation.

Non-goals: desktop navigation redesign, route/content/provider changes, dependency changes, publication, merge, or deployment.

Files: `src/components/layout/Navbar.jsx`, `src/styles/components/navbar.css`, and this entry.

Tests: `npm.cmd run verify`, `git diff --check`, responsive Chromium viewport checks in both themes and motion modes, keyboard/focus checks, pointer/touch feedback checks, and complete-diff Jev review.

Acceptance: all primary/archive/profile links remain reachable; no phone/tablet clipping or horizontal overflow; close control stays visible while content scrolls; laptop navigation preserves its layout; decorative feedback never captures input.

Evidence: `npm.cmd run verify` passed: 118 source files linted, all 64 tests
passed, 86 assets/15 routes/14 projects/21 artwork records checked, production
build passed, and 24 static route documents generated. A temporary PATH shim
outside the repository exposed the installed Vite CLI; no dependencies changed.
Optional resume sync skipped the missing source; the existing large-chunk
warning remains. `git diff --check` passed.

Responsive Playwright checks used the existing canonical server at
`http://127.0.0.1:5174/about` with Chromium viewport emulation: 320 x 568,
390 x 844, 844 x 390, 768 x 1024, 899 x 600, 1024 x 768, and 1440 x 900,
in light/dark themes and separate normal/reduced-motion sessions. Checks cover
all 15 drawer links, 44px targets for primary/archive/profile links, two archive
columns, no horizontal clipping, a stationary close control while content
scrolls, focus entry/wrap/Escape/return, and archive link navigation. Actual
emulated touch input verified halo visibility, timeout, and drag cancellation;
window and nested drawer scrolling canceled feedback. Desktop navigation
geometry matched the original CSS. Reduced-motion pointer placement was
immediate, the larger circle stayed outlined, and feedback used pointer-events
none. No page runtime errors or framework overlays were seen. Supplemental
console inspection found only the pre-existing About-page React fetchPriority
warning, confirmed in HEAD. Screenshots and results are stored outside the repo.
These are emulated checks, not physical-device or hosted deployment evidence.

Complete-diff Jev review completed with `jev-1.13.0`, all three changed files
covered, no exclusions or truncation, and a non-empty usage receipt. The latest
cursor follow-up returned an advisory verification-gap signal; focused checks
confirmed white-fill difference blending in both themes, visible inversion in
screenshots, preserved size, pointer-events none, and working theme controls.
Follow-up lint and diff checks passed. The user accepted the result and
requested commit/push plus safe repository cleanup. Independent ChatGPT
validation remains required before implementing the next package.


## October 2026 résumé update: Package 24

Goal: use the supplied October 2026 résumé consistently across the portfolio.

Scope: replace `public/resume.pdf` byte-for-byte with
`Shaurya_saria_CV_Oct2026.pdf`, refresh the first-page preview at its existing
1191 x 1684 size, align the Achievements predicted grades and AS results with
the supplied academic record, and document canonical résumé provenance.
All existing desktop/mobile/homepage/About résumé links retain `/resume.pdf`.

Non-goals: editing the supplied PDF, rewriting project claims or personal bio,
adding a LaTeX source, changing link behavior, or updating external profiles.

Files: `public/resume.pdf`, `public/resume-preview.png`,
`src/components/Achievements.jsx`, `README.md`, and this backlog entry.

Tests: source/destination SHA-256 equality, both PDF pages visually inspected,
preview render and dimensions checked, local HTTP PDF response hash checked,
all résumé entry points and academic records checked in the browser,
`npm.cmd run verify`, `git diff --check`, and complete-diff Jev review with
binary coverage limitations reported separately.

Acceptance: every existing résumé action resolves to the supplied two-page PDF;
preview matches its first page; the academic page distinguishes A-Level
predictions from achieved AS results; optional missing-source résumé sync leaves
the supplied PDF unchanged.

Evidence: source, `public/resume.pdf`, the built `dist/resume.pdf`, and the
local HTTP PDF response match SHA-256
`45a9f07b4facb2548cc8734f901e0a070c32b7f6b98087815f926badd42e1fb8`.
Both supplied pages and the refreshed 1191 x 1684 preview were visually checked.
`npm.cmd run verify` passed: 118 source files linted, 64 tests passed, 86 local
assets/15 routes/14 projects/21 artwork records checked, production build
passed, and 24 static route documents generated. Optional résumé sync skipped
the absent LaTeX source and preserved the supplied PDF. Existing large-chunk
warning remains; a temporary Vite PATH shim outside the repository was used.
Browser checks at `http://127.0.0.1:5174/` and `/about` verified résumé links;
the 390px mobile menu exposed the same PDF. `/achievements` displayed the
updated predictions and AS results without horizontal overflow or page errors.
Complete-diff Jev review follows; binary PDF/PNG fidelity is verified locally.
Independent ChatGPT validation is required before the next package.

## lablab.ai hackathon feature and certificate additions: Package 25

Goal: highlight the supplied lablab.ai hackathons on the homepage and add all
new certificates to the existing gallery and storage pattern.

Scope: add the AMD Developer Hackathon ACT II, Alpaca AI Trading Agents, and
IBM Bob 2.0 certificates to Competitions and feature those three lablab.ai
events on the homepage. Add the separate AI Challenge 2026 All Cups participant
certificate and ClimateScience Olympiad semifinalist to Competitions. Add the
ClimateScience Industrial Innovation course, Springpod BSc (Hons) Data Science
& AI, and IIT Madras Introduction to Electronic Systems to Programs. Store the
seven supplied PDFs unchanged under public/certificates/pdfs/ and all eight
optimized WebP previews under public/certificates/images/. Keep Amazon
certificates under Coding & ML with their 2026 issue years.

Non-goals: claiming awards or placements not shown by the sources, treating the
All Cups certificate as a lablab.ai event, adding the recommendation requisition
as a credential, modifying source certificates, or deploying/publishing.

Files: src/pages/home/Home.jsx, src/pages/home/Home.css,
src/pages/certificates/CertificatesPage.jsx, public/certificates/pdfs/,
public/certificates/images/, and this backlog entry.

Tests: verify source/PDF copy hashes, inspect generated previews, run
npm.cmd run verify and git diff --check, and visually inspect the homepage at
desktop and narrow widths when the local browser session is available.

Acceptance: the homepage names the three source-verified lablab.ai events and
links to the certificate gallery; all eight new credentials appear in their
existing categories with accurate issuer, title, year, and source files; the
Amazon issue years read 2026; no unsupported award or placement is claimed.

Evidence: all seven source PDFs were visually inspected and copied byte-for-byte;
the IIT Madras source JPG was retained as an image-only certificate. Each PDF
has an optimized WebP first-page preview, and the IIT JPG has an optimized WebP
preview. The three lablab.ai source certificates are AMD ACT II, Alpaca AI
Trading Agents, and IBM Bob 2.0; All Cups is a separate AI Challenge 2026
participant certificate. Amazon source PDF hashes match the existing copies.
## Homepage hierarchy and featured hackathons: Package 26

Goal: reshape the homepage around a clear identity, evidence-backed selected work,
and the user's priority of making the lablab.ai hackathon certificates highly visible.

Scope: pair the introduction with one real product preview; place three lablab.ai
hackathon certificates in a high-contrast, full-width section immediately after
the hero; feature three source-linked projects with their findings and limits;
keep audience, skills, and guided-tour exploration reachable in a disclosure;
retain a personal artwork interlude and two writing links; preserve the global
contact and resume footer.

Non-goals: changing certificate records, adding new project claims, changing
routes or providers, publishing, merging, deploying, or modifying other packages.

Files: src/pages/home/Home.jsx, src/pages/home/Home.css,
src/components/Hero.jsx, src/components/Hero.css, tests/homePage.test.mjs,
and this entry.

Tests: npm.cmd run verify, git diff --check, desktop/mobile browser checks at
the canonical port 5174 in light and dark themes, plus keyboard and reduced-motion
checks for the homepage disclosure and links. Complete-diff Jev review completed in three named batches.

Acceptance: the three lablab.ai hackathons are prominent directly below the
hero; curated project statements retain evidence and boundaries; all deeper
exploration and existing project, artwork, writing, contact, and resume paths
remain reachable by keyboard and touch; the homepage has no narrow-screen
horizontal overflow or reduced-motion-only animation.

Evidence: npm.cmd run verify passed via a temporary Vite PATH shim outside the repo:
118 source files linted, all 64 tests passed, 86 local assets/15 routes/14 projects/
21 artwork records checked, production build passed, and 24 static route documents
generated. git diff --check passed. Optional resume sync skipped the absent source;
the existing >500 kB JS chunk warning remains. Browser review at 5174 covered a
1265 x 720 desktop viewport and 568 x 570 narrow viewport in dark/light themes.
The hackathon section was visible after the hero in both; Space opened and closed
the deeper-work disclosure, and the certificates CTA opened /certificates. The
in-app browser reported reduced motion enabled; it did not expose console logs or
viewport emulation. Screenshots were emitted during QA.
Jev 1.13.0 covered all six changed files in three named batches; no batch was truncated,
and each had non-empty usage. Results had no concrete findings: two batches returned
incomplete-context gates and one returned no-clear-issue. Independent ChatGPT
validation is required before the next package.

## Architecture documentation publication â€” 2026-10-04

Goal: publish source-linked architecture documentation and diagram previews. Scope: README, this backlog and docs/architecture artifacts. Source snapshot: dc8e784e00b631376d8a4d31afc88a0e54c93151; no runtime, dependency, data or deployment changes. Acceptance: pinned inventory/source-map/embedding checks, ten intended negative cases, renderer checks, bounded Jev review, documentation-only commit and remotely verified PR. Jev remains advisory; pre-existing workspace changes are excluded.

Certificate package finalization (2026-10-06): all ten supplied certificate originals
(nine PDFs and the IIT Madras JPG) match their stored copies by SHA-256.
Seven new PDFs, the original JPG, and eight WebP previews are retained in Git;
the two Amazon PDFs already exist in Git. The finalized homepage from PR #48
is retained without the superseded Package 25 homepage edits. npm.cmd run verify
passed: 118 source files linted, 64 tests passed, 101 local assets/15 routes/
14 projects/21 artwork records checked, Vite production build passed, and
24 static route documents generated. A temporary Vite PATH shim was used;
the existing large-chunk warning and optional missing resume source remain.
The recommendation requisition is a form and was not published as a credential.


## Black and cream light palette: Package 27

Goal: unify all light-mode UI around black, cream and warm neutral tones.
Scope/files: global theme tokens; Home, About, GitHub contributions, tour,
skill/signal explorers, audio pads, technology badges, contact and artwork CSS.
Non-goals: content/layout changes, source-media recoloring, dark-mode redesign,
providers, merging or deployment. Acceptance: consistent neutral light UI on
all routes; five distinguishable contribution levels; visible focus, selected
and error states. Evidence: source/diff inspection and canonical-port browser
review. No automated tests requested for this styling package. Jev plan advice
requested revision without a concrete finding; source inventory and explicit
light-mode scope resolve its scope concern.

Palette evidence: browser inspection at 5174 covered all 15 page types,
expanded homepage discovery panels, neutral five-level contribution legend,
and dark/light toggle. Cream canvas resolved to rgb(245,241,231), ink to
rgb(25,24,22); dark canvas and contribution panel retained original colors.
Jev 1.13.0 covered all 12 text files without exclusions or truncation; its
advisory verification-gap concern is disclosed. No automated tests run.


## Professional typography and text placement: Package 28

Goal: consistent professional fonts and comfortable text placement site-wide.
Scope: Inter for UI including legacy mono/display aliases; professional code
font; less compressed tracking/line height, restrained display scale, readable
paragraph measures, left-aligned Home actions, About hero and section grids.
Non-goals: palette/content/media/provider changes, merging or deployment.
Files: existing typography and affected component/page styles plus backlog.
Acceptance: headings and copy remain legible and naturally positioned across
routes and narrow layouts. Evidence: source/diff and canonical-port browser
inspection; no automated tests requested. Jev plan advisory supplied generic
scope concerns; inspected source and explicit user scope resolve those.

Typography evidence: browser inspected all 15 page types at narrow width;
each reported the Inter UI family and no document horizontal overflow.
About was additionally inspected at a desktop two-column width with no
overflow; browser font check confirmed Inter available. No tests run.

Production build passed: 2275 modules and 24 static route documents.
Existing large-chunk warning and optional absent resume source remain.
Final Jev diff review did not return a typed review result; it is not counted
as completed. Source/browser/build inspection completed independently.


## Skeleton consistency: Package 29

Goal: align all existing skeleton screens with new palette and typography.
Scope/files: shared skeleton tokens in variables.css; BlogPostPage.jsx article
fallback and blog.css paragraph shapes; GitHubContributions.css loading cells.
Non-goals: new loading flows, content changes, artificial delays, merging or
deployment. Acceptance: theme-derived neutral placeholders, actual reading
column/calendar geometry, Inter status label, polite status and hidden visual
bars, reduced-motion preservation. Evidence: source/diff inspection and build.
No automated tests requested. Jev plan review gave generic scope advice; exact
two-component source inventory and user instruction resolve that concern.

Skeleton evidence: full source inventory confirms two existing skeletons.
Production build passed (2275 modules, 24 route documents); diff check passed.
Jev 1.13.0 reviewed all five text files without exclusions/truncation,
5621 input/500 output tokens, advisory no-clear-issue. Transient skeleton
rendering was not forced or visually captured; reduced-motion rules preserved.


## Rotating homepage preview stack: Package 30

Goal: replace single preview with stackable rotating project cards.
Scope/files: Hero.jsx and Hero.css; three canonical projects and real assets,
previous/next and pause controls, seven-second auto rotation, pause on hover/
focus/hidden tab, manual-only reduced motion, inactive cards inert/hidden.
Non-goals: new claims/media, other pages, merging/deployment. Acceptance:
visible layered cards, reachable active project links, stable responsive
geometry and keyboard-instant/reduced-motion navigation. Evidence: source/diff,
build and browser controls. No automated tests requested. Jev plan gave generic
scope advice; exact user request and source inventory resolve that concern.

Preview stack evidence: production build passed (2275 modules, 24 documents).
Browser observed all three cards, next/wraparound, canonical active links,
inert inactive cards and no overflow at narrow/desktop widths. Keyboard
transition computed 0s. Browser reduced motion was enabled, so automatic
rotation was source-reviewed but not observed live. Viewport reset.
Jev 1.13.0 reviewed all three files, no exclusions/truncation, 7044 input/499
output tokens; generic verification-gap advice, no concrete finding.


## Black dark theme: Package 31

Goal: replace blue/green dark UI with black, charcoal and cream site-wide.
Scope/files: shared dark tokens; homepage and hackathon contrast panel; tour,
skills, audio, technology marks, contribution density, About label and errors.
Non-goals: content, original media, typography/layout changes, merge/deployment.
Acceptance: neutral backgrounds, links, badges, focus and loading placeholders
in dark mode; preserved cream light palette and five contribution levels.
Evidence: complete source/diff inventory, production build and browser styles.
Jev plan returned generic scope advice; bounded component inventory and explicit
user request resolve it. No automated tests requested.

Dark theme evidence: inspected all 15 representative route URLs in the browser;
body background #101010 and cream text, no horizontal document overflow at
the current narrow viewport. Projects plus six other routes had no blue DOM
text/background/border hits; technology marks computed cream. Homepage
black/cream hackathon panel and light palette checked through the theme toggle.
Complete CSS color inventory contains neutral UI literals; obsolete colored
inline data removed. Shared skeleton tokens inherit this palette; transient
loading states were not forced. Original media retain their own colors.

Final production build passed: 2275 modules and 24 route documents.
Diff whitespace check passed. Jev 1.13.0 reviewed all 13 text files with no
exclusions or truncation (11234 input/498 output tokens); generic verification
gap advice, no concrete defect reported. Independent diff inspection confirms
five contribution levels, theme-based controls and unchanged original media.
No automated tests run; draft PR awaits independent validation and merge approval.


## Expressive typography: Package 32

Goal: varied bold/italic hierarchy and restrained text features site-wide.
Scope: real Inter italic weights, existing emphasized headings and editorial
spans, selective body emphasis, shared title/label hierarchy, one-time heading
rule reveal and pointer-only reading-link underline feedback.
Non-goals: copy/claims, palette, new libraries, moving body text, merge/deploy.
Acceptance: bold anchors and genuine lighter italics across routes, readable
stationary text, immediate keyboard feedback, static reduced-motion version.
Evidence: source/diff, production build, browser typography/theme inspection
and complete Jev diff review. No automated tests requested. Plan review gave
generic scope advice; the exact existing emphasis inventory bounds this work.

Typography evidence: production build passed (2276 modules, 24 route documents).
Browser observed italic heading phrases on homepage and 12 other route URLs,
bold 650 body emphasis on About and bold 700 homepage title, no narrow
viewport document overflow. Browser prefers reduced motion: heading rule
computed animation none; ordinary-motion reveal is source-reviewed only.

Light About browser check confirmed cream canvas, bold 700 title, true italic
heading phrase, 650 body emphasis and no document overflow. Restored dark
mode and homepage. Jev 1.13.0 covered all 21 text files, no exclusions or
truncation, 9152 input/497 output tokens; generic verification-gap advice
without concrete defect. Independent diff inspection completed.
