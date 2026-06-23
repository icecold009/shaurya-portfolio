const projects = [
    {
        title: "Music Recognition App",
        status: "live",
        description:
            "Built a Shazam-style system from scratch — records audio in the browser, extracts frequency fingerprints via FFT in a Python backend, and matches against a Supabase database in ~2–3s. Full pipeline: React mic capture → REST API → fingerprint matching → song result.",
        stack: "Python · FastAPI · React · Supabase · Web Audio API",
        github: "https://github.com/icecold009/music-recognition",
        live: null,
    },
    {
        title: "Past Paper AI Tool",
        status: "building",
        description:
            "AI study assistant for Cambridge A-Level students. Upload a past paper PDF, and the tool extracts questions by topic, lets you practice interactively, and uses the Gemini API to give mark-scheme-aware feedback. Designed around how I personally prep for 9709 and 9618.",
        stack: "React · Gemini API · PDF parsing · Vercel",
        github: "https://github.com/icecold009/past-paper-ai",
        live: null,
    },
    {
        title: "Full-Stack API Projects",
        status: "ongoing",
        description:
            "A series of backend-first builds exploring RESTful API design, SQL schema modelling, and cloud deployment. Includes auth flows, environment-variable security, and end-to-end testing with curl and Postman — all deployed via Vercel or Supabase edge functions.",
        stack: "JavaScript · Node.js · SQL · REST · Vercel",
        github: "https://github.com/icecold009",
        live: null,
    },
];

const statusStyle = {
    live: { label: "live", color: "#00ff41" },
    building: { label: "building", color: "#f0c040" },
    ongoing: { label: "ongoing", color: "#5a9fff" },
};

function Projects() {
    return (
        <section className="projects" id="projects">
            <div className="section-heading">
                <p className="section-label">Selected Work</p>
                <h2>Projects that show how I build.</h2>
            </div>

            <div className="project-grid">
                {projects.map((p) => {
                    const s = statusStyle[p.status];
                    return (
                        <article className="project-card" key={p.title}>
                            <div className="project-card-header">
                                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                                    <h3>{p.title}</h3>
                                    <span className="project-status" style={{ "--status-color": s.color }}>
                                        {s.label}
                                    </span>
                                </div>
                                <div className="project-links">
                                    <a href={p.github} className="project-link" target="_blank" rel="noreferrer">GH</a>
                                    {p.live && (
                                        <a href={p.live} className="project-link" target="_blank" rel="noreferrer">↗</a>
                                    )}
                                </div>
                            </div>
                            <p>{p.description}</p>
                            <span className="project-stack">{p.stack}</span>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Projects;