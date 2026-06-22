function Hero() {
    return (
        <section className="hero" id="home">
            <p className="hero-kicker">Bengaluru • Computer Science Student • Full-Stack Developer</p>

            <h1 className="hero-title">
                I build web apps and AI-powered tools that are practical, clean, and easy to use.
            </h1>

            <p className="hero-description">
                I’m Shaurya, a student developer focused on full-stack development,
                educational tools, and music recognition technology. I like building products
                that solve real problems with solid backend logic and thoughtful frontend design.
            </p>

            <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
        </section>
    );
}

export default Hero;