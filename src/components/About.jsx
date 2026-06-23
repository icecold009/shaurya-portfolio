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
                        Student and junior developer based in Bengaluru. I work across the full stack —
                        backend APIs, React frontends, cloud databases, and deployment pipelines.
                    </p>
                    <p>
                        Currently studying Computer Science while building real projects:
                        a music recognition engine, an AI study tool, and more.
                        I care about code that's clean, products that work, and shipping things that matter.
                    </p>
                </div>

                <div className="about-note">
                    <h3>Current focus</h3>
                    <ul>
                        <li>Full-stack React applications</li>
                        <li>AI integration with Gemini API</li>
                        <li>Backend APIs and database design</li>
                        <li>Deployment and DevOps workflows</li>
                        <li>Building tools for students and developers</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default About;