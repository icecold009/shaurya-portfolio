# Shaurya Saria | Portfolio

The personal portfolio of Shaurya Saria, a Bengaluru-based student developer working across machine learning, full-stack products, and interaction design.

This site is designed to feel like an editorial archive rather than a list of links. Projects are explained through case studies, the interface stays quiet enough for the work to lead, and the site makes room for experiments, writing, certificates, artwork, and contact.

**Live site:** <https://shaurya-portfolio-sooty.vercel.app/>

## What you will find

- Editorial case studies for projects such as StadiumPulse AI, Audio Recognition, Past Paper AI, Movie Tracker, and Token Smart Router.
- A responsive navigation system with desktop menus and a mobile focus-managed panel.
- Light and dark themes with reduced-motion support.
- Smooth scrolling and purposeful page/scroll transitions.
- MDX-powered writing, achievements, certificates, artwork, and contact pages.
- A generated interactive portrait used as a visual identity element.
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
- Framer Motion and Lenis
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

## Contact

- GitHub: <https://github.com/icecold009>
- For contact, please use the links on the live portfolio or open a GitHub message.

## License

All rights reserved. Copyright 2026 Shaurya Saria.
