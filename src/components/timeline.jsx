import { useState } from "react";

const events = [
    {
        year: "2023",
        tag: "education",
        title: "Started Cambridge A-Levels",
        detail: "Enrolled in 4 Cambridge International subjects — Computer Science (9618), Mathematics (9709), Physics (9702), and Further Mathematics (9231). Chose the hardest combination deliberately.",
    },
    {
        year: "2024",
        tag: "project",
        title: "Built Music Recognition System",
        detail: "Designed and shipped a Shazam-style app from scratch — FFT-based fingerprinting in Python, REST API, React frontend with live mic capture, Supabase for song storage. First time I built a full end-to-end pipeline alone.",
    },
    {
        year: "2024",
        tag: "skill",
        title: "Learned Full-Stack Web Development",
        detail: "Went deep on RESTful API design, SQL schema modelling, Supabase, Vercel deployments, environment security, and React. Built and broke things repeatedly until they worked.",
    },
    {
        year: "2025",
        tag: "project",
        title: "Started Past Paper AI Tool",
        detail: "Identified a real problem — Cambridge past papers are hard to navigate and practice with. Started building an AI tool using Gemini API that extracts questions by topic and gives mark-scheme-aware feedback.",
    },
    {
        year: "2025",
        tag: "skill",
        title: "Competitive Programming — Project Euler",
        detail: "Started solving Project Euler problems to sharpen mathematical thinking and algorithmic intuition. Problems on prime sieves, combinatorics, and number theory.",
    },
    {
        year: "2026",
        tag: "now",
        title: "Deploying, Iterating, Applying",
        detail: "Finishing A-Levels, deploying projects publicly, applying to CS/Data Science programmes. Building this portfolio as a living record of what I can do — not just what I've studied.",
    },
];

const tagColors = {
    education: "#5a9fff",
    project: "#00ff41",
    skill: "#f0c040",
    now: "#ff6b6b",
};

const tagLabels = ["all", "education", "project", "skill", "now"];

function Timeline() {
    const [active, setActive] = useState(null);
    const [filter, setFilter] = useState("all");

    const visible = filter === "all" ? events : events.filter(e => e.tag === filter);

    return (
        <section className="timeline-section" id="timeline">
            <div className="section-heading">
                <p className="section-label">Journey</p>
                <h2>How I got here.</h2>
            </div>

            {/* Filter chips */}
            <div className="timeline-filters">
                {tagLabels.map(t => (
                    <button
                        key={t}
                        className={`tl-filter ${filter === t ? "tl-filter--on" : ""}`}
                        onClick={() => { setFilter(t); setActive(null); }}
                        style={filter === t && t !== "all"
                            ? { "--fc": tagColors[t] }
                            : {}}
                    >
                        {t === "all" ? "all" : `[ ${t} ]`}
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div className="timeline">
                {visible.map((e, i) => {
                    const isOpen = active === i;
                    return (
                        <div
                            key={i}
                            className={`tl-item ${isOpen ? "tl-item--open" : ""}`}
                            onClick={() => setActive(isOpen ? null : i)}
                        >
                            {/* Spine dot */}
                            <div className="tl-dot" style={{ "--dc": tagColors[e.tag] }} />

                            <div className="tl-body">
                                <div className="tl-header">
                                    <span className="tl-year">{e.year}</span>
                                    <span
                                        className="tl-tag"
                                        style={{ "--tc": tagColors[e.tag] }}
                                    >
                                        {e.tag}
                                    </span>
                                    <span className="tl-title">{e.title}</span>
                                    <span className="tl-chevron">{isOpen ? "▲" : "▼"}</span>
                                </div>
                                <div className="tl-detail">
                                    <p>{e.detail}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Timeline;