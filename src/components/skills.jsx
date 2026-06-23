const skills = [
    "React", "JavaScript", "Python", "SQL",
    "Supabase", "REST APIs", "Git", "Vite",
    "Vercel", "Gemini AI", "Node.js", "HTML/CSS",
];

function Skills() {
    return (
        <section className="skills" id="skills">
            <div className="section-heading">
                <p className="section-label">Tech Stack</p>
                <h2>Tools I build with.</h2>
            </div>
            <div className="skills-grid">
                {skills.map((s) => (
                    <div className="skill-chip" key={s}>{s}</div>
                ))}
            </div>
        </section>
    );
}

export default Skills;