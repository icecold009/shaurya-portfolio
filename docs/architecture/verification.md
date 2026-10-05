# Documentation verification

Snapshot: `dc8e784e00b631376d8a4d31afc88a0e54c93151`. Observed 2026-10-04 in the isolated feature copy.

The read-only checker passes: 268 tracked paths assigned exactly once, 27 graph arrows with valid endpoints, 43 documentation/source links, matching overview embeds, and ten invalid fixtures rejected at their intended checks. Both output previews rendered and were visually inspected. No new repository PNG, runtime/dependency/data or deployment change is proposed.

Reproduce with Node and Git: `node docs/architecture/verify.mjs --self-test`. This checks structure, exactly one source-map row per arrow and valid inclusive ranges in pinned Git source. Three extra negative cases reject a missing arrow, unknown source key and invalid line range. It does not prove source semantics, every execution path or hosted behavior. Rendering is checked separately.

## Complete diagram relationship source map

All **27 arrows** (12 overview, 15 detail) have latest Jev supported judgments, confidence 0.55–1.00. Twelve bounded calls used jev-1.13.0 and 39211 input/1309 output tokens. At most six redacted source excerpts, each at most 10,000 characters, were supplied per call. Initial dialog/filter checks were insufficient; missing URL-selection and page-composition source resolved those evidence gaps. Both receipts are retained in the downloadable review evidence.

Jev returns typed relevance judgments; the server derives IDs. CookieBanner dismisses a notice and does not gate the separately rendered Analytics component. These source observations are documented boundaries, not provider, consent or hosted-runtime certification. The full-diff review remains required; supported arrows do not waive its gates.

The external resume/achievement commit preserves the tracked inventory and nine diagram source files. Comparison digests and historical receipts remain in the download; original files were untouched.

### Source keys

- [S1](../../src/app/AnimatedRoutes.jsx)
- [S2](../../src/pages/projects/ProjectsPage.jsx)
- [S3](../../src/components/Projects.jsx)
- [S4](../../src/pages/blog/BlogPostPage.jsx)
- [S5](../../src/lib/projectShortlist.js)
- [S6](../../src/components/ProjectFinder.jsx)
- [S7](../../api/project-picker.js)
- [S8](../../src/lib/projectFinder.js)
- [S9](../../src/app/App.jsx)
- [S10](../../src/pages/home/Home.jsx)
- [S11](../../package.json)
- [S12](../../vite.config.js)
- [S13](../../src/components/layout/Navbar.jsx)
- [S14](../../src/components/CookieBanner.jsx)
- [S15](../../src/pages/contact/ContactPage.jsx)
- [S16](../../src/components/Contact.jsx)
- [S17](../../src/lib/contactValidation.js)
- [S18](../../src/components/GitHubContributions.jsx)
- [S19](../../src/components/ProjectDetailDialog.jsx)
- [S20](../../tests/homePage.test.mjs)
- [S21](../../scripts/verify-quality.mjs)

O/D identify overview/detail. Arrow endpoints refer to the corresponding diagram; full labels remain in the diagrams. Each source range is inclusive at this pinned snapshot.

| Arrow | Source ranges | Supported confidence |
| --- | --- | ---: |
| O V --> A | S1:1-76, S2:1-10 | 0.96 |
| O P --> A | S3:14-40, S3:195-220 | 0.99 |
| O M --> V | S4:1-44 | 0.77 |
| O A --> D | S3:553-575 | 0.95 |
| O A <--> L | S3:195-243, S5:1-40 | 0.99 |
| O P --> F | S3:393-406 | 0.86 |
| O F -.-> S | S6:8-52, S6:75-94 | 0.94 |
| O S -.-> J | S7:117-151, S8:31-61 | 0.99 |
| O J -.-> S | S7:137-151, S8:65-101 | 0.99 |
| O S -.-> F | S7:144-151, S6:34-48 | 0.99 |
| O F --> L | S6:34-52, S8:104-121 | 0.93 |
| O F --> D | S6:99-123, S3:195-243, S3:295-313, S3:393-406, S3:553-575 | 0.99 |
| D UI --> PAGES | S9:56-77, S1:1-76 | 0.99 |
| D CONTENT --> PAGES | S10:6-39, S4:1-44 | 0.98 |
| D CONTENT --> FINDER | S3:195-220, S3:393-406 | 0.55 |
| D FINDER --> PAGES | S2:1-10, S3:195-243, S3:506-545 | 0.97 |
| D PAGES .-> AI | S3:393-406, S6:8-52 | 0.99 |
| D BUILD .-> UI | S11:1-37, S12:1-37 | 0.75 |
| D POLICY --> UI | S9:56-77, S13:117-143, S14:1-45 | 0.99 |
| D PAGES --> CONTACT | S15:1-12, S16:1-72, S17:1-32 | 1 |
| D UI --> CONTRIB | S10:1-28, S18:1-90 | 0.99 |
| D FINDER --> LOCAL | S3:195-243, S5:1-40 | 1 |
| D POLICY --> LOCAL | S13:117-143, S14:1-26 | 1 |
| D PAGES --> PLAY | S19:1-12, S19:204-219 | 0.97 |
| D AI .-> FINDER | S8:65-101, S7:144-151, S6:34-48 | 0.93 |
| D UI .-> METRICS | S9:1-12, S9:56-77, S14:1-45 | 0.62 |
| D SUPPORT .-> UI | S11:1-37, S20:1-40, S21:1-26 | 0.66 |
