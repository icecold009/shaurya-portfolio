function Contact() {
    return (
        <section className="contact" id="contact">
            <div className="section-heading">
                <p className="section-label">Contact</p>
                <h2>Let’s build something useful.</h2>
            </div>

            <div className="contact-card">
                <p className="contact-text">
                    I’m open to internships, collaborations, and interesting technical
                    projects. The easiest way to reach me is through the links below.
                </p>

                <div className="contact-links">
                    <a href="mailto:your-email@example.com">Email</a>
                    <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Contact;