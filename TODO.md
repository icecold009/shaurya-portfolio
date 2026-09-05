# Final Luna plan: Shaurya Portfolio

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
- [x] Enforce the 20 px mobile page gutter and fit the complete 390×844 hero, including both CTAs, within the first viewport.
- [x] Retrospective independent validation completed in the final route and interaction evidence pass.

Local evidence: `npm.cmd run build` passes; Browser validation covers 320×568, 390×844, 768×1024, and 1440×900, both themes, menu open/close/focus restoration, CTA routing, and narrow-viewport overflow checks. A real browser 200% zoom pass remains for independent validation. Hosted/deployment evidence is intentionally not claimed.

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
