import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { positioningStatement } from "../lib/profileLinks";

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
                    Shaurya Saria
                </h1>
                <p className="portfolio-hero__statement">
                    I build data-driven AI and full-stack tools with a focus on <em>useful interfaces.</em>
                </p>

                <div className="portfolio-hero__bottom">
                    <p className="portfolio-hero__description">
                        {positioningStatement}
                    </p>

                    <div className="portfolio-hero__actions">
                        <Link to="/projects" className="portfolio-button portfolio-button--primary cta-link">
                            View projects
                            <ArrowDownRight size={18} aria-hidden="true" />
                        </Link>
                        <a
                            href="/resume.pdf"
                            className="portfolio-button portfolio-button--secondary cta-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open résumé PDF in a new tab"
                        >
                            Open résumé
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

