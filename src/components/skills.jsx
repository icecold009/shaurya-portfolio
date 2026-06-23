const skills = [
    { name: "Python", icon: "https://cdn.simpleicons.org/python/00ff41", },
    { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/00ff41", },
    { name: "React", icon: "https://cdn.simpleicons.org/react/00ff41", },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/00ff41", },
    { name: "HTML", icon: "https://cdn.simpleicons.org/html5/00ff41", },
    { name: "CSS", icon: "https://cdn.simpleicons.org/css3/00ff41", },
    { name: "SQL", icon: "https://cdn.simpleicons.org/postgresql/00ff41", },
    { name: "Git", icon: "https://cdn.simpleicons.org/git/00ff41", },
    { name: "GitHub", icon: "https://cdn.simpleicons.org/github/00ff41", },
    { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/00ff41", },
    { name: "Vite", icon: "https://cdn.simpleicons.org/vite/00ff41", },
    { name: "Gemini AI", icon: "https://cdn.simpleicons.org/googlegemini/00ff41", },
    { name: "REST APIs", icon: "https://cdn.simpleicons.org/fastapi/00ff41", },
    { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/00ff41", },
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
                    <div className="skill-chip" key={s.name}>
                        <img
                            src={s.icon}
                            alt={s.name}
                            width="16"
                            height="16"
                            loading="lazy"
                            className="skill-icon"
                        />
                        {s.name}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Skills;