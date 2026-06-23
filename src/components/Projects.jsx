import { useState } from "react";

const projects = [
    {
        title: "Music Recognition App",
        status: "live",
        description:
            "Built a Shazam-style system from scratch — records audio in the browser, extracts frequency fingerprints via FFT in a Python backend, and matches against a Supabase database in ~2–3s. Full pipeline: React mic capture → REST API → fingerprint matching → song result.",
        stack: "Python · FastAPI · React · Supabase · Web Audio API",
        github: "https://github.com/icecold009/music-recognition",
        live: null,
        image: "https://picsum.photos/seed/music-app/800/420",
        highlights: [
            "FFT-based audio fingerprinting — same core technique used by Shazam",
            "React frontend captures mic input via Web Audio API with no external library",
            "Python FastAPI backend processes fingerprints and queries Supabase in ~2–3s",
            "Supabase stores song fingerprint hashes and metadata",
            "Deployed REST API with environment-variable key management",
        ],
        challenge:
            "The hardest part was getting consistent fingerprints across different microphones and ambient noise levels. Solved it by normalising the audio signal before FFT and using a tolerance window for hash matching.",
    },
    {
        title: "Past Paper AI Tool",
        status: "building",
        description:
            "AI study assistant for Cambridge A-Level students. Upload a past paper PDF, and the tool extracts questions by topic, lets you practice interactively, and uses the Gemini API to give mark-scheme-aware feedback. Designed around how I personally prep for 9709 and 9618.",
        stack: "React · Gemini API · PDF parsing · Vercel",
        github: "https://github.com/icecold009/past-paper-ai",
        live: null,
        image: "https://picsum.photos/seed/past-paper/800/420",
        highlights: [
            "Parses Cambridge past paper PDFs and extracts questions by topic automatically",
            "Gemini API provides mark-scheme-aware feedback on student answers",
            "Built around real A-Level subjects: 9709 (Maths), 9618 (CS), 9702 (Physics)",
            "Interactive practice mode — attempt a question, get instant AI feedback",
            "Designed from personal frustration with how hard Cambridge papers are to navigate",
        ],
        challenge:
            "PDF parsing is messy — Cambridge papers have inconsistent formatting. Built a custom extraction layer that handles multi-part questions, diagrams, and mark allocations without losing structure.",
    },
    {
        title: "Full-Stack API Projects",
        status: "ongoing",
        description:
            "A series of backend-first builds exploring RESTful API design, SQL schema modelling, and cloud deployment. Includes auth flows, environment-variable security, and end-to-end testing with curl and Postman — all deployed via Supabase edge functions.",
        stack: "JavaScript · Node.js · SQL · REST · Supabase",
        github: "https://github.com/icecold009",
        live: null,
        image: "https://picsum.photos/seed/api-projects/800/420",
        highlights: [
            "RESTful API design with proper status codes, error handling, and versioning",
            "SQL schema modelling — normalisation, foreign keys, indexes",
            "Auth flows using JWTs and environment-variable key management",
            "End-to-end tested with curl and Postman before any frontend integration",
            "Deployed on Supabase edge functions and tested against real network conditions",
        ],
        challenge:
            "Learning to think backend-first — designing the data model and API contract before touching the UI. Shifted how I approach every project now.",
    },
];

const statusStyle = {
    live: { label: "live", color: "#00ff41" },
    building: { label: "building", color: "#f0c040" },
    ongoing: { label: "ongoing", color: "#5a9fff" },
};

function Projects() {
    const [open, setOpen] = useState(null);

    const toggle = (i) => setOpen(open === i ? null : i);

    return (
        <section className="projects" id="projects">
            <div className="section-heading">
                <p className="section-label">Selected Work</p>
                <h2>Projects that show how I build.</h2>
            </div>

            <div className="project-grid">
                {projects.map((p, i) => {
                    const s = statusStyle[p.status];
                    const isOpen = open === i;

                    return (
                        <article
                            key={p.title}
                            className={`project-card ${isOpen ? "project-card--open" : ""}`}
                            onClick={() => toggle(i)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && toggle(i)}
                            aria-expanded={isOpen}
                        >
                            {/* ── Card header (always visible) ── */}
                            <div className="project-card-header">
                                <div className="project-title-row">
                                    <h3>{p.title}</h3>
                                    <span
                                        className="project-status"
                                        style={{ "--status-color": s.color }}
                                    >
                                        {s.label}
                                    </span>
                                </div>
                                <div className="project-links" onClick={(e) => e.stopPropagation()}>
                                    <a href={p.github} className="project-link" target="_blank" rel="noreferrer">GH</a>
                                    {p.live && (
                                        <a href={p.live} className="project-link" target="_blank" rel="noreferrer">↗</a>
                                    )}
                                </div>
                            </div>

                            <p className="project-desc">{p.description}</p>
                            <span className="project-stack">{p.stack}</span>

                            {/* Expand hint */}
                            <div className="project-expand-hint">
                                <span>{isOpen ? "▲ collapse" : "▼ see more"}</span>
                            </div>

                            {/* ── Expanded panel ── */}
                            <div className="project-expanded">
                                <div className="project-expanded-inner">

                                    {/* Screenshot */}
                                    <div className="project-img-wrap">
                                        <img
                                            src={p.image}
                                            alt={`${p.title} screenshot`}
                                            className="project-img"
                                            loading="lazy"
                                            width="800"
                                            height="420"
                                        />
                                        <div className="project-img-overlay">
                                            <span>// screenshot placeholder</span>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="project-highlights">
                                        <p className="project-highlights-label">what I built</p>
                                        <ul>
                                            {p.highlights.map((h, j) => (
                                                <li key={j}>{h}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Challenge */}
                                    <div className="project-challenge">
                                        <p className="project-challenge-label">biggest challenge</p>
                                        <p>{p.challenge}</p>
                                    </div>

                                </div>
                            </div>

                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Projects;