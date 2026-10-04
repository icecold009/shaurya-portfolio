# Shaurya Saria | Portfolio

The personal portfolio of Shaurya Saria, a Bengaluru-based student developer working across machine learning, full-stack products, and interaction design.

This site is designed to feel like an editorial archive rather than a list of links. Projects are explained through case studies, the interface stays quiet enough for the work to lead, and the site makes room for experiments, writing, certificates, artwork, and contact.

**Live site:** <https://shauryasaria.me/>

## What you will find

- Editorial case studies for projects such as StadiumPulse AI, Audio Recognition, Past Paper AI, Movie Tracker, and Token Smart Router.
- A responsive navigation system with desktop menus and a mobile focus-managed panel.
- Light and dark themes with reduced-motion support.
- Smooth scrolling and purposeful page/scroll transitions.
- MDX-powered writing, a focused academic snapshot, certificates, artwork, and contact pages.
- A customer-facing work-with-me route for focused websites, data interfaces, and AI prototypes.
- Optional resume synchronisation from a local LaTeX source.

## Screenshots

### Home: desktop

![Portfolio home page](artifacts/portfolio-home-dark.png)

### Navigation: mobile

![Portfolio mobile navigation](artifacts/mobile-navigation-dark.png)

### Case-study archive

The case-study capture is intentionally long because it documents the full editorial walkthrough.

<details>
<summary>Open the full case-study screenshot</summary>

![Portfolio case-study walkthrough](artifacts/case-study-walkthrough-dark.png)

</details>

## Technology

- React 18 and Vite
- React Router
- Framer Motion for restrained page and interaction transitions
- MDX
- Lucide React and React Icons
- CSS organized into base, component, layout, page, and utility layers
- Vercel for hosting

## Run locally

You need Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

The full local quality gate is:

```bash
npm run verify
```

It runs the repository's dependency-free source lint, route and static-asset integrity checks, Node test suite, and production build. The gate does not claim hosted, device, or production evidence.

The build is allowed to update `public/resume.pdf` only when a LaTeX source is available. The source can live at `resume/resume.tex` or at the path supplied through `RESUME_TEX`.

To synchronise a resume explicitly:

```bash
npm run sync:resume -- path/to/resume.tex
```

If the source is unavailable, the existing PDF is left unchanged.

The current canonical résumé is the supplied `Shaurya_saria_CV_Oct2026.pdf`,
copied unchanged to `public/resume.pdf`. All résumé links (desktop navigation,
mobile menu, homepage, and About page) use `/resume.pdf`.
`public/resume-preview.png` shows its first page. When replacing a supplied PDF,
refresh this preview as well; no local LaTeX source is currently present.

## Project structure

```text
public/                 Static images, certificates, artwork, and resume
src/components/         Shared navigation, layout, and interactive UI
src/lib/                Content and presentation helpers
src/pages/               Route-level pages and case studies
src/posts/               MDX writing
src/styles/              Base, component, layout, page, and utility CSS
artifacts/               Local visual captures used in this README
```

## A note on the work

The portfolio is intentionally opinionated about clarity: motion should explain a relationship, controls should remain usable with a keyboard, and the visual system should support the project stories rather than compete with them.

Project records distinguish source-linked prototypes, simulated data, local-first work, research studies, and archive entries. A label describes the available evidence, not a promise of production readiness.

## Contact

- GitHub: <https://github.com/icecold009>
- For contact, please use the links on the live portfolio or open a GitHub message.



## Source-reviewed architecture overview

```mermaid
%% Source-reviewed overview; 2026-10-04; commit dc8e784e00b631376d8a4d31afc88a0e54c93151
%% Solid edges: core flow. Dashed edges: optional or separately invoked services.
%%{init: {"theme":"base","securityLevel":"loose","fontFamily":"Arial, sans-serif","themeVariables":{"background":"#0b1220","primaryColor":"#17283d","primaryTextColor":"#edf4ff","primaryBorderColor":"#71c4ec","lineColor":"#9fadc1","secondaryColor":"#213548","tertiaryColor":"#17283d","edgeLabelBackground":"#0b1220","clusterBkg":"#101d2e","clusterBorder":"#456783","fontSize":"17px"},"flowchart":{"htmlLabels":true,"curve":"linear","nodeSpacing":35,"rankSpacing":50}}}%%
flowchart TD
  V["Visitor + React routes"]
  P["Curated project records"]
  M["MDX writing + assets"]
  A["URL filters + project archive"]
  D["Case study dialog"]
  L["Local shortlist + keywords"]
  F["Optional Project Finder"]
  S["Server-only picker endpoint"]
  J["Optional TypeSafe / Jev"]
  V --> A
  P --> A
  M --> V
  A --> D
  A <-->|saved projects| L
  P --> F
  F -.->|bounded query| S
  S -.->|public metadata selection| J
  J -.->|typed relevance judgments| S
  S -.->|validated IDs| F
  F -->|provider unavailable| L
  F --> D
  click V "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/app/App.jsx" "Open source"
  click P "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/data/projects.js" "Open source"
  click M "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/posts/index.js" "Open source"
  click A "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/components/Projects.jsx" "Open source"
  click D "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/components/ProjectDetailDialog.jsx" "Open source"
  click L "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/lib/projectFinder.js" "Open source"
  click F "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/components/ProjectFinder.jsx" "Open source"
  click S "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/api/project-picker.js" "Open source"
  click J "https://github.com/icecold009/shaurya-portfolio/blob/dc8e784e00b631376d8a4d31afc88a0e54c93151/src/lib/projectFinder.js" "Open source"
  classDef core fill:#17283d,stroke:#71c4ec,stroke-width:1.6px,color:#edf4ff;
  class V,P,M,A,D,L,F,S,J core;
```

See the [architecture case study](docs/architecture/README.md), [coverage](docs/architecture/coverage.md), and [publication evidence and rendered previews](docs/architecture/publication.md).
## License

All rights reserved. Copyright 2026 Shaurya Saria.
