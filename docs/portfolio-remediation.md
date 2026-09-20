# Portfolio remediation record

This document records the implementation of the customer and admissions critique. The default information architecture is admissions and recruiter first on the homepage, with a dedicated customer path at `/work-with-me`.

## Package 0: source and release alignment

- Goal: keep source, deployment, metadata, and documentation aligned.
- Scope: canonical URL, sitemap, README, route metadata, security headers, and release checks.
- Non-goals: deployment, merge, hosted content changes, and invented claims.
- Main files: `README.md`, `index.html`, `public/sitemap.xml`, `src/lib/seoMetadata.js`, `vercel.json`.
- Acceptance: the new route has metadata and sitemap coverage; README describes the current information architecture.
- Evidence: `npm.cmd run lint`, `npm.cmd test`, `npm.cmd run verify:assets`, and `npm.cmd run build`.

## Package 1: positioning and audience paths

- Goal: make the first screen understandable to an admissions reviewer, recruiter, or potential collaborator.
- Scope: clearer academic context, explicit availability, audience-path cards, direct customer route, and navigation entry.
- Non-goals: turning the site into a generic agency homepage.
- Main files: `src/components/Hero.jsx`, `src/pages/home/Home.jsx`, `src/components/layout/Navbar.jsx`, `src/app/AnimatedRoutes.jsx`, `src/data/profile.js`.
- Acceptance: admissions and collaboration paths are visible from the homepage and reachable in one click.
- Evidence: local browser AX snapshot and route title checks.

## Package 2: project evidence

- Goal: make project status and proof level explicit.
- Scope: evidence labels, richer search fields, filtered count wording, and modal evidence summary.
- Non-goals: claiming live deployment, production readiness, or metrics that are not present.
- Main files: `src/lib/projectEvidence.js`, `src/lib/projectSearch.js`, `src/components/Projects.jsx`, `src/components/ProjectDetailDialog.jsx`, `src/data/projects.js`.
- Acceptance: every project has a visible proof label; filtered results report matching projects; limitations remain visible.
- Evidence: filtered `/projects?tag=AI` route and StadiumPulse modal interaction.

## Package 3: admissions profile

- Goal: reduce reviewer effort and put high-signal academic context before the full archive.
- Scope: school, curriculum, graduation date, subject focus, interests, selected evidence, and labelled status context.
- Non-goals: changing academic claims or presenting predicted grades as completed results.
- Main files: `src/components/Achievements.jsx`, `src/styles/pages/achievements.css`, `src/data/profile.js`.
- Acceptance: the admissions route opens with an academic snapshot and selected evidence before the complete record.
- Evidence: local browser AX snapshot of `/achievements`.

## Package 4: customer conversion

- Goal: make the site usable by someone considering a focused website or prototype project.
- Scope: services, fit, deliverables, process, proof links, availability, contact context fields, response expectation, and form fallback.
- Non-goals: invented pricing, testimonials, or agency-scale promises.
- Main files: `src/pages/work-with-me/WorkWithMePage.jsx`, `src/pages/work-with-me/WorkWithMePage.css`, `src/components/Contact.jsx`, `src/styles/pages/contact.css`.
- Acceptance: a visitor can understand what can be built, how the work moves, and how to begin.
- Evidence: local browser AX snapshot of `/work-with-me`; empty contact validation and form attribute inspection.

## Package 5: interaction and accessibility friction

- Goal: reduce waiting and keep the visual system usable.
- Scope: shorter intro, skip behavior, reduced-motion compatibility, responsive service cards, compact privacy notice, and existing focus-managed dialogs.
- Non-goals: adding more animation.
- Main files: `index.html`, `tests/introLoader.test.mjs`, `src/styles/pages/legal.css`, existing dialog and navigation components.
- Acceptance: the intro completes in 650 milliseconds, the skip path remains available, and the contact/project interactions remain keyboard-addressable.
- Evidence: intro tests, project modal open/close verification, and local browser console review.

## Package 6: privacy and security hygiene

- Goal: make third-party requests and public data boundaries intentional.
- Scope: Formspree fields, GitHub contribution API, Google Fonts, Vercel Analytics, browser storage, public résumé/certificate evidence, and baseline response headers.
- Non-goals: legal certification or removal of public evidence without an explicit content decision.
- Main files: `src/pages/privacy/PrivacyPage.jsx`, `src/components/CookieBanner.jsx`, `src/components/layout/Navbar.jsx`, `vercel.json`.
- Acceptance: privacy text reflects actual external flows; storage failures do not break the UI; baseline security headers are configured.
- Evidence: source inspection, form fallback inspection, and the existing static source lint.

## Package 7: release verification

- Goal: prove the implementation locally before any hosted mutation.
- Scope: source lint, tests, static assets, production build, generated static routes, and browser smoke checks.
- Non-goals: deployment or merge without approval.
- Acceptance: all repository quality gates pass and the local development server remains available for user verification.
- Evidence: the final command results and the running Vite session documented in the task response.

## Package 8: interactive exploration

- Goal: turn the portfolio from a passive sequence of pages into a visitor-controlled exploration.
- Scope: audience lenses on the homepage, a persistent project reading list, and service/process selectors that carry the selected project type into Contact.
- Non-goals: gamification, fake live data, account creation, backend storage, or adding motion for its own sake.
- Main files: `src/data/profile.js`, `src/lib/audienceLens.js`, `src/lib/projectShortlist.js`, `src/pages/home/Home.jsx`, `src/components/Projects.jsx`, `src/components/ProjectDetailDialog.jsx`, `src/pages/work-with-me/WorkWithMePage.jsx`, `src/components/Contact.jsx`, `src/pages/privacy/PrivacyPage.jsx`.
- Acceptance: a visitor can choose a homepage lens, open a tailored project trail, save projects across visits, filter the archive to saved work, choose a service/process step, and arrive at Contact with the service context preselected.
- Evidence: unit tests for lens and shortlist utilities, browser interaction checks for lens switching, saved filtering, service/process selection, and Contact prefill.

## Final validation gate

The change is ready for independent review when the branch is clean except for task-owned files, all P0 and P1 issues are addressed, the local browser smoke paths pass, and hosted deployment is separately verified after explicit approval.
