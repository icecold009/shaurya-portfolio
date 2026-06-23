const projects = [
    {
        title: "Music Recognition App",
        description: "Shazam-style audio fingerprinting. Identifies songs through a full-stack pipeline — Python backend, React frontend, Supabase for storage.",
        stack: "Python · React · Supabase",
        github: "https://github.com/icecold009",
    },
    {
        title: "Past Paper AI Tool",
        description: "Study tool for processing Cambridge exam papers. AI-powered workflows that help students organise, search, and practice past questions.",
        stack: "React · Gemini AI · Document Processing",
        github: "https://github.com/icecold009",
    },
    {
        title: "Full-Stack Web Projects",
        description: "Collection of practical apps focused on backend APIs, frontend UX, deployment pipelines, and database integration.",
        stack: "JavaScript · React · SQL",
        github: "https://github.com/icecold009",
    },
];

function Projects() {
    return (
        <section className="projects" id="projects">
            <div className="section-heading">
                <p className="section-label">Selected Work</p>
                <h2>Projects that show how I build.</h2>
            </div>

            <div className="project-grid">
                {projects.map((p) => (
                    <article className="project-card" key={p.title}>
                        <div className="project-card-header">
                            <h3>{p.title}</h3>
                            <div className="project-links">
                                <a href={p.github} className="project-link" target="_blank" rel="noreferrer">GH</a>
                                {p.live && <a href={p.live} className="project-link" target="_blank" rel="noreferrer">↗</a>}
                            </div>
                        </div>
                        <p>{p.description}</p>
                        <span className="project-stack">{p.stack}</span>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Projects;