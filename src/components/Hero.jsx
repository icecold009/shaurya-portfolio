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
                <p className="portfolio-hero__eyebrow">
                    Student developer · Bengaluru
                </p>

                <h1 id="portfolio-hero-title" className="portfolio-hero__title">
                    I build web tools and <em>machine-learning experiments.</em>
                </h1>

                <div className="portfolio-hero__bottom">
                    <p className="portfolio-hero__description">
                        I’m Shaurya, a student developer in Bengaluru working on
                        audio recognition, forecasting, and practical web applications.
                    </p>

                    <div className="portfolio-hero__actions">
                        <Link to="/projects" className="portfolio-button portfolio-button--primary">
                            Explore my work
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
