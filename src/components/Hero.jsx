function Hero() {
    return (
        <section className="hero section" id="home">
            <p className="hero-kicker">Computer Science Student • Full-Stack Developer</p>

            <h1 className="hero-title">
                Shaurya
                <br />
                builds useful web products.
            </h1>

            <p className="hero-description">
                I build full-stack web apps, AI-powered tools, and technical projects with
                a focus on clean UX, real functionality, and thoughtful engineering.
            </p>

            <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#contact" className="btn btn-secondary">Contact Me</a>
            </div>
        </section>
    );
}

export default Hero;