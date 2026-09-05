import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./Hero.css";

export default function Hero() {
    return (
        <section
            className="portfolio-hero"
            id="home"
            aria-labelledby="portfolio-hero-title"
        >
            <div className="portfolio-hero__rail" aria-hidden="true">
                <span>Shaurya Saria</span>
                <span>Bengaluru, India</span>
                <span>Available for internships</span>
            </div>

            <div className="portfolio-hero__content">
                <div className="portfolio-hero__portrait-wrap">
                    <img
                        className="portfolio-hero__portrait"
                        src="/images/shaurya-portrait.jpeg"
                        alt="Portrait of Shaurya Saria"
                    />
                    <span className="portfolio-hero__portrait-note">
                        AI + product engineering
                    </span>
                </div>

                <p className="portfolio-hero__eyebrow">
                    AI + product engineer · Bengaluru
                </p>

                <h1 id="portfolio-hero-title" className="portfolio-hero__title">
                    I build understandable software for <em>complex problems.</em>
                </h1>

                <div className="portfolio-hero__bottom">
                    <p className="portfolio-hero__description">
                        Student developer working across full-stack products,
                        machine learning, and interaction design.
                    </p>

                    <div className="portfolio-hero__actions">
                        <Link to="/projects" className="portfolio-button portfolio-button--primary">
                            View selected work
                            <ArrowDownRight size={18} aria-hidden="true" />
                        </Link>
                        <a
                            href="/resume.pdf"
                            className="portfolio-button portfolio-button--secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open résumé PDF in a new tab"
                        >
                            Résumé
                            <ArrowUpRight size={17} aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="portfolio-hero__footer" aria-hidden="true">
                <span>01 / 04</span>
                <span>Selected work follows</span>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
