# Final Luna plan: Shaurya Portfolio

## Interactive project disclosure: Package 1

- [x] Centralize project records so the homepage and project archive use one source of truth.
- [x] Add URL-backed project search and category filters with a clear empty state.
- [x] Add one accessible quick-view panel per project, rendered as a desktop drawer and mobile bottom sheet.
- [x] Preserve numbered project hashes and homepage deep links while adding shareable `?project=` state.
- [x] Add keyboard focus trapping, focus restoration, Escape/backdrop dismissal, body-scroll cleanup, and reduced-motion-safe styling.
- [x] Add pure filtering/hash-resolution tests and verify the production build.
- [ ] Independent validation before starting Package 2 blog disclosure.

Implementation branch: `codex/mobile-first-project-disclosure`.

## Mobile-first redesign: Package 1

- [x] Rebuild the homepage around a static portrait, recruiter-first hero copy, four-link primary navigation, and concise work/profile/writing sections.
- [x] Preserve the accessible mobile drawer, focus restoration, Escape handling, body-scroll lock, theme control, and secondary pages under Explore.
- [x] Remove the interactive portrait, Lenis wrapper/dependency, legacy home stylesheet, and unreferenced portrait assets.
- [x] Enforce the 20 px mobile page gutter and fit the complete 390×844 hero, including both CTAs, within the first viewport.
- [ ] Independent validation before starting Package 2 project disclosure.

Local evidence: `npm.cmd run build` passes; Browser validation covers 320×568, 390×844, 768×1024, and 1440×900, both themes, menu open/close/focus restoration, CTA routing, and narrow-viewport overflow checks. A real browser 200% zoom pass remains for independent validation. Hosted/deployment evidence is intentionally not claimed.

Implementation commit: `d2ac369` (`feat(portfolio): build mobile-first shell`).

## Copy and project imagery cleanup

- [x] Remove every U+2014 em dash from website copy, metadata, docs, and styles.
- [x] Replace featured project thumbnails with repository-sourced project visuals.
- [x] Replace the Movie Tracker archive thumbnail with its committed production screenshot.
- [ ] Independently review image crops, captions, and accessibility at mobile and desktop sizes.

Evidence: Audio Recognition uses `docs/screenshots/fft-output.png`, F1 uses `docs/predicted_vs_actual_2023.png`, Movie Tracker uses `docs/assets/production/production-desktop-2026-08-16.png`, and StadiumPulse uses a screenshot captured from its public deployed command center at `https://stadiumpulse-ai-nine.vercel.app/login` because the repository does not commit a screenshot asset. Local build, route/asset checks, and responsive Browser evidence are required before this package is accepted.

Implementation commit: `8d02f53` (`feat(portfolio): use real project imagery and remove em dashes`).

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
- No lint or test scripts exist.
- The portrait now stops for coarse pointers and reduced motion, but not while offscreen/hidden.

## Code-review conclusion

`InteractivePortrait.jsx` keeps a RAF loop alive for every fine-pointer, motion-enabled mount, regardless of intersection or document visibility. Pointer capability is captured once. `artwork.css` applies hover globally and the coarse-pointer override removes transform but leaves hover shadow. These are the first two slices.

## Build checklist

- [ ] **1. Make portrait eligibility dynamic**
  Files: `src/components/InteractivePortrait.jsx`.
  What to build: Combine fine-pointer media query, reduced-motion query, IntersectionObserver, and `document.visibilityState`. Start/stop one RAF as eligibility changes; listen for both media-query changes.
  Acceptance: No RAF remains when offscreen, hidden, coarse-pointer, reduced-motion, or unmounted; returning onscreen renders correctly.
  Verify: Instrumented component tests with mocked RAF, matchMedia, intersection, visibility, and unmount.

- [ ] **2. Fully gate hover and scope motion**
  Files: `src/styles/pages/artwork.css`, modal/animation utilities, affected components.
  What to build: Put hover-only transform and shadow inside `(hover: hover) and (pointer: fine)`; keep focus-visible and active feedback independent. Remove broad/dead animation rules only when proven unused.
  Acceptance: Touch cannot retain hover shadow/transform and keyboard focus remains visible.
  Verify: CSS/source assertion plus coarse/fine pointer browser screenshots.

- [ ] **3. Add reproducible quality scripts**
  Files: `package.json`, ESLint config, component tests, CI.
  What to build: Add lint, Vitest/Testing Library, and a route/asset validator. Keep optional resume sync deterministic and test missing/present source behavior.
  Acceptance: `npm run lint`, `npm test`, and `npm run build` work from a clean install.
  Verify: Tests for portrait lifecycle, navbar focus/Escape/return, theme, modal, and route links.

- [ ] **4. Audit case-study evidence**
  Files: project data, case-study pages, artifacts, links.
  What to build: For every featured project state problem, role, approach, verified outcome, limitations, repo/demo status, and evidence layer. Remove or qualify unverifiable metrics.
  Acceptance: Mock, local, hosted, AI-generated, and production claims are visibly distinct; screenshots match current UI and contain no private data.
  Verify: Route inventory and link/asset checker; manual content review.

- [ ] **5. Finish accessibility and editorial conversion**
  Files: app shell, navbar, project cards, case studies, not-found state.
  What to build: Verify skip link, landmarks, headings, image alternatives, external-link purpose, menu/modal focus, contrast, CTA hierarchy, and removed/private-project handling.
  Acceptance: Navigation and primary contact/project actions remain clear at 320px, 200% zoom, keyboard-only, and reduced motion.
  Verify: Automated accessibility smoke plus keyboard and screen-reader review.

- [ ] **6. Capture final visual/performance evidence**
  Files: `artifacts/` and private review notes as appropriate.
  What to build: Refresh only stale screenshots and record idle portrait CPU/RAF behavior at mobile, tablet, desktop, hidden tab, and coarse pointer.
  Acceptance: Screenshot proof is current and performance claims are tied to recorded checks.
  Verify: `npm.cmd run lint`; `npm.cmd test`; `npm.cmd run build`; `git diff --check`.

## Commit checkpoints

1. `perf(portfolio): stop hidden portrait work and gate hover`
2. `test(portfolio): add interaction and route quality gates`
3. `docs(portfolio): reconcile case-study evidence`

## Definition of done

- [ ] Portrait RAF eligibility is dynamic and tested.
- [ ] Hover, focus, active, and reduced-motion behavior are intentional.
- [ ] Lint, tests, build, routes, and assets are reproducible.
- [ ] Every case study is current, honest, accessible, and privacy-safe.
- [ ] Feature branch is pushed and clean; `main` is untouched and unmerged.
