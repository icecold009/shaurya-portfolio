# shaurya-portfolio

Personal portfolio of **Shaurya Saria** — student developer from Bengaluru building full-stack apps, AI-powered tools, and music recognition systems.

🌐 **Live site:** coming soon

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router v7 |
| Blog / MDX | `@mdx-js/react` + `@mdx-js/rollup` |
| Styling | Plain CSS (custom terminal aesthetic, dark/light mode) |
| Contact form | Formspree |
| Deployment | Vercel |

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero with matrix canvas, projects, skills, timeline, contact |
| `/projects` | Full project cards with modal detail view |
| `/about` | Bio, education, GitHub heatmap, Bengaluru map |
| `/achievements` | Academic grades, olympiads, competitions, leadership |
| `/certificates` | Certificate thumbnail gallery |
| `/blog` | MDX-powered technical posts |
| `/uses` | Tools and setup |
| `/artwork` | Creative work |
| `/contact` | Contact form + links |

---

## Running Locally

```bash
git clone https://github.com/icecold009/shaurya-portfolio.git
cd shaurya-portfolio
npm install
npm run dev
```

Open `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

---

## Project Structure
├── public/
│ ├── resume.pdf # CV download
│ ├── favicon.svg
│ ├── map-bengaluru.png
│ ├── certificates/ # Certificate images
│ └── artwork/ # Artwork images
├── src/
│ ├── components/ # Reusable components (Hero, Navbar, Projects…)
│ ├── pages/ # Route-level page components
│ ├── posts/ # MDX blog posts
│ ├── App.jsx # Root layout + routes
│ ├── main.jsx
│ └── styles.css # Global styles + CSS variables
├── index.html
├── vite.config.js
└── package.json

## License

All rights reserved © 2026 Shaurya Saria.