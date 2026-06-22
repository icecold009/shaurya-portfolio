function About() {
    return (
        <section className="about" id="about">
            <div className="section-heading">
                <p className="section-label">About</p>
                <h2>A developer focused on useful products.</h2>
            </div>

            <div className="about-grid">
                <div className="about-copy">
                    <p>
                        I’m a student and junior developer based in Bengaluru, interested in
                        full-stack development, educational technology, and AI-assisted tools.
                    </p>

                    <p>
                        I enjoy building products that are practical, polished, and easy to use,
                        especially projects that combine strong backend logic with clean frontend
                        experiences.
                    </p>
                </div>

                <div className="about-note">
                    <h3>What I’m focused on</h3>
                    <ul>
                        <li>Building full-stack React applications</li>
                        <li>Working with APIs, databases, and deployment workflows</li>
                        <li>Creating projects that are useful for students and developers</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default About;