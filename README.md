# Shaurya Saria Portfolio

Personal portfolio website for Shaurya Saria, a student developer from Bengaluru building full-stack applications, AI tools and digital experiences.

## Live Website

https://shaurya-portfolio-sooty.vercel.app/

## Featured Projects

- StadiumPulse AI
- Audio Recognition
- Past Paper AI
- Movie Tracker
- Face Attendance System
- F1 Championship Prediction
- Token Smart Router
- Student Dropout Risk Prediction

## Features

- Editorial project case studies
- Smooth scrolling with Lenis
- Page and scroll animations
- Dark and light themes
- Responsive navigation
- MDX-powered blog
- Dedicated projects, achievements, certificates, artwork and contact pages

## Built With

- React
- Vite
- React Router
- Framer Motion
- Lenis
- Lucide React
- MDX
- CSS
- Vercel

## Resume sync

The build checks for a LaTeX CV at `resume/resume.tex` or the path in
`RESUME_TEX`. When present, `npm run build` compiles it with `latexmk` and
updates `public/resume.pdf`; if the source is not available, the existing PDF
is left unchanged. Run `npm run sync:resume -- path/to/resume.tex` to sync it
explicitly.

## Project Structure

```text
public/
src/
├── components/
├── lib/
├── pages/
├── posts/
├── styles/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   └── utilities/
├── App.jsx
└── main.jsx
```

## Contact

- GitHub: https://github.com/icecold009
- Email: sariashaurya09@gmail.com

## License

All rights reserved.

Copyright 2026 Shaurya Saria.
