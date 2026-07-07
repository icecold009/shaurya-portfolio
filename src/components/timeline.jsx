import { useMemo, useState } from "react";

const events = [
    {
        date: "Jan 2023",
        tag: "education",
        title: "Started serious problem-solving and math training",
        metric: "Built consistency before building projects",
        detail:
            "Started going deeper into structured mathematics and analytical problem-solving. This became the base for how I approach algorithms, debugging, and system design now.",
    },
    {
        date: "Sep 2023",
        tag: "project",
        title: "First real coding projects and GitHub workflow",
        metric: "Shifted from learning syntax to shipping work",
        detail:
            "Began building projects seriously and using GitHub as an actual development tool instead of just storage. That changed how I thought about iteration, versioning, and writing code for others to read.",
    },
    {
        date: "Oct 2023",
        tag: "competition",
        title: "World Scholar's Cup medals and Yale qualification",
        metric: "12 medals across regional and global rounds",
        detail:
            "Earned 12 medals across Bangalore and Bangkok rounds and qualified for Yale Tournament of Champions. It strengthened communication, research, and pressure-handling skills.",
    },
    {
        date: "Aug 2024",
        tag: "competition",
        title: "First Kaggle competition: Digit Recognizer",
        metric: "First real ML competition workflow",
        detail:
            "Moved from learning machine learning concepts to actually submitting models in a competitive setting. It was the first time I worked through leaderboard feedback, validation choices, and competition-style iteration.",
    },
    {
        date: "Sep 2024",
        tag: "project",
        title: "Built startup and product thinking through competition work",
        metric: "Runner-up team finish",
        detail:
            "Worked on structured product thinking, market analysis, and presentation under constraints. It improved how I frame technical ideas around users and outcomes rather than just features.",
    },
    {
        date: "Oct 2024",
        tag: "project",
        title: "Built Music Recognition System",
        metric: "Song matching in ~2–3s on real hardware",
        detail:
            "Designed a Shazam-style pipeline with browser audio capture, FFT-based fingerprinting, backend matching, and metadata lookup. This was one of the first projects where the architecture felt like a real product, not just a demo.",
    },
    {
        date: "Jan 2025",
        tag: "skill",
        title: "Went deeper into full-stack engineering",
        metric: "React, APIs, SQL, deployment, debugging",
        detail:
            "Started thinking more in systems: frontend state, backend contracts, database design, deployment flow, and testing. That made later projects much more structured and much less trial-and-error.",
    },
    {
        date: "Mar 2025",
        tag: "competition",
        title: "BirdCLEF competition entry",
        metric: "Applied ML to noisy real-world audio data",
        detail:
            "Worked with a harder and messier audio classification problem where data quality, noise, and model evaluation mattered more. It pushed me beyond tutorial-style ML work.",
    },
    {
        date: "Jun 2025",
        tag: "leadership",
        title: "Co-founded and led Mathematics Club",
        metric: "Grew from 3 to 20+ active members",
        detail:
            "Built a community around problem-solving and olympiad-style mathematics. Leading sessions and helping others prepare improved both clarity of thought and confidence in explaining technical ideas.",
    },
    {
        date: "Aug 2025",
        tag: "project",
        title: "Started Past Paper AI Tool",
        metric: "Built around a real Cambridge student pain point",
        detail:
            "Started building an AI study tool that extracts questions by topic from past papers and gives feedback. The goal was not novelty for its own sake, but solving a problem I had faced directly.",
    },
    {
        date: "Oct 2025",
        tag: "competition",
        title: "NeurIPS competition participation",
        metric: "Exposure to higher-standard ML problem framing",
        detail:
            "Competing in a stronger research-adjacent environment helped me understand how far careful evaluation, feature choices, and experimentation really matter in applied ML.",
    },
    {
        date: "Jan 2026",
        tag: "project",
        title: "Started building this portfolio seriously",
        metric: "Shift from placeholder site to real personal brand",
        detail:
            "Turned the portfolio into a proper project instead of a static page. The focus became presenting work, achievements, and narrative clearly enough for admissions officers, recruiters, and collaborators.",
    },
    {
        date: "Jun 2026",
        tag: "education",
        title: "Achievements, certificates, and academic profile consolidated",
        metric: "Portfolio moved closer to admissions-ready",
        detail:
            "Brought together awards, leadership, certificates, and academic records into one consistent public profile. This made the site feel more complete and more credible.",
    },
    {
        date: "Jul 2026",
        tag: "now",
        title: "Deploying, refining, and preparing applications",
        metric: "Current focus: polish, depth, and credibility",
        detail:
            "Right now the goal is to make every section sharper: stronger project evidence, better writing, cleaner UI, and a portfolio that feels intentional from top to bottom.",
    },
];

const tagMeta = {
    all: { label: "all", color: "var(--text-dim)" },
    education: { label: "education", color: "#5a9fff" },
    project: { label: "project", color: "#00ff41" },
    skill: { label: "skill", color: "#f0c040" },
    competition: { label: "competition", color: "#f97316" },
    leadership: { label: "leadership", color: "#a78bfa" },
    now: { label: "now", color: "#ff6b6b" },
};

const filters = ["all", "project", "competition", "education", "skill", "leadership", "now"];

function Timeline({ compact = false }) {
    const [filter, setFilter] = useState("all");

    const visibleEvents = useMemo(() => {
        return filter === "all" ? events : events.filter((event) => event.tag === filter);
    }, [filter]);

    return (
        <section className={`timeline-page-section ${compact ? "timeline-page-section--compact" : ""}`} id="timeline">
            <div className="section-heading timeline-page-heading">
                <p className="section-label">Timeline</p>
                <h2>A clearer view of how I got here.</h2>
                <p className="timeline-page-intro">
                    Projects, competitions, leadership, and the milestones that shaped how I build.
                </p>
            </div>

            <div className="timeline-toolbar" role="tablist" aria-label="Timeline filters">
                {filters.map((key) => (
                    <button
                        key={key}
                        type="button"
                        className={`timeline-chip ${filter === key ? "timeline-chip--active" : ""}`}
                        style={filter === key ? { "--chip": tagMeta[key].color } : {}}
                        onClick={() => setFilter(key)}
                    >
                        {tagMeta[key].label}
                    </button>
                ))}
            </div>

            <div className="timeline-page">
                <div className="timeline-page-line" aria-hidden="true" />
                {visibleEvents.map((event) => (
                    <article
                        key={`${event.date}-${event.title}`}
                        className={`timeline-card ${event.tag === "now" ? "timeline-card--now" : ""}`}
                    >
                        <div
                            className={`timeline-card-dot ${event.tag === "now" ? "timeline-card-dot--pulse" : ""}`}
                            style={{ "--dot": tagMeta[event.tag].color }}
                            aria-hidden="true"
                        />
                        <div className="timeline-card-meta">
                            <span className="timeline-card-date">{event.date}</span>
                            <span
                                className="timeline-card-tag"
                                style={{ "--tag": tagMeta[event.tag].color }}
                            >
                                {event.tag}
                            </span>
                        </div>

                        <div className="timeline-card-body">
                            <h3 className="timeline-card-title">{event.title}</h3>
                            <p className="timeline-card-metric">{event.metric}</p>
                            <p className="timeline-card-detail">{event.detail}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Timeline;