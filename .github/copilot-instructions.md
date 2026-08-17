# Repository review instructions

When reviewing pull requests in this repository:

- Review the complete diff in the context of the existing React/Vite portfolio.
- Report only actionable findings. Include severity, file path, line number, user impact, and a concrete fix.
- Prioritize correctness, regressions, accessibility, responsive behavior, security, performance, and broken user journeys over style preferences.
- Treat the current application behavior as the source of truth. Do not invent personal facts, project claims, metrics, or production guarantees.
- For UI changes, check keyboard access, focus states, semantic HTML, reduced-motion behavior, mobile layouts, deep links, browser back/forward behavior, and console errors.
- For async or form changes, check loading, success, failure, timeout, retry, and duplicate-submit behavior.
- For resume and certificate changes, verify that assets are valid PDFs, that the intended document is being served, that previews remain inline, and that links do not unexpectedly force downloads.
- For build or asset changes, run `npm run build` when possible and inspect the generated output for stale or silently replaced assets.
- Ignore generated lockfile churn unless it introduces a real dependency or security problem.
- Do not make edits, merge pull requests, or dismiss review findings as part of a review.

Use a concise review summary. If no actionable issues are found, say so explicitly and mention any checks that were not possible.
