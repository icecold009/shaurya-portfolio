---
name: code-review
description: Review portfolio pull requests for correctness, accessibility, responsive UX, security, performance, and asset integrity.
---

# Portfolio pull request review

Use this skill for pull-request code reviews in this repository.

## Review process

1. Inspect the full pull-request diff and the surrounding code paths before making a finding.
2. Trace changed behavior through routes, components, assets, build scripts, and deployment-facing configuration.
3. Check the user journeys affected by the change on desktop and mobile, including refreshes and deep links where relevant.
4. Run the repository build when practical: `npm run build`.
5. Report only actionable findings, ordered by severity.

## Required checks

- React correctness: hook usage, state synchronization, async cleanup, error handling, and stale state.
- Accessibility: semantic elements, keyboard interaction, focus management, labels, contrast, alt text, and reduced motion.
- Responsive UX: narrow viewport layout, overflow, touch targets, and navigation behavior.
- Routing: direct navigation, refresh, browser back/forward, and query-parameter synchronization.
- Forms and external requests: loading, success, failure, timeout, retry, and duplicate-submit states.
- Security and privacy: secrets, unsafe HTML, untrusted URLs, storage failures, and unnecessary third-party exposure.
- Performance: oversized assets, unnecessary work during initial load, and avoidable network requests.
- Document integrity: PDF validity, page count, expected content, inline preview behavior, and accidental download behavior for resume or certificate assets.

## Finding format

For each finding, provide:

- Severity: high, medium, or low.
- Exact file and line.
- What breaks and who is affected.
- Why the current implementation causes it.
- The smallest concrete fix.

Do not report speculative issues without a plausible failure path. Do not propose unrelated refactors. If the diff has no actionable findings, state that clearly and list checks that could not be run.
