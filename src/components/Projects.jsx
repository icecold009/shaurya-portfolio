function Projects() {
    const projects = [
        {
            title: "Music Recognition App",
            description:
                "A Shazam-style project that identifies songs and matches audio fingerprints through a full-stack workflow.",
            stack: "Python • React • Supabase",
        },
        {
            title: "Past Paper AI Tool",
            description:
                "A study tool for processing exam papers, organizing content, and building helpful AI-powered workflows for students.",
            stack: "React • AI Integration • Document Processing",
        },
        {
            title: "Full-Stack Web Projects",
            description:
                "A collection of practical web apps focused on backend APIs, frontend UX, deployment, and database integration.",
            stack: "JavaScript • React • SQL",
        },
    ];

    return (
        <section className="projects" id="projects">
            <div className="section-heading">
                <p className="section-label">Selected Work</p>
                <h2>Projects that show how I build.</h2>
            </div>

            <div className="project-grid">
                {projects.map((project) => (
                    <article className="project-card" key={project.title}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <span className="project-stack">{project.stack}</span>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Projects;