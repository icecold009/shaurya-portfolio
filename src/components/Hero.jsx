import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { REVEAL, REVEAL_CONTAINER } from "../lib/motion";
import { academicProfile } from "../data/profile";
import { projects } from "../data/projects";
import { positioningStatement } from "../lib/profileLinks";

import "./Hero.css";

const featuredProject = projects.find((project) => project.id === "movie-tracker");

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();
    const projectUrl = featuredProject ? "/projects?project=" + featuredProject.id : "/projects";

    if (!featuredProject) {
        return null;
    }

    return (
        <motion.section
            className="portfolio-hero"
            id="home"
            aria-labelledby="portfolio-hero-title"
            variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
        >
            <motion.div
                className="portfolio-hero__content"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
            >
                <motion.div className="portfolio-hero__copy" variants={shouldReduceMotion ? undefined : REVEAL}>
                    <p className="portfolio-hero__eyebrow">Student developer · {academicProfile.location}</p>
                    <h1 id="portfolio-hero-title" className="portfolio-hero__title">Shaurya Saria</h1>
                    <p className="portfolio-hero__statement">{positioningStatement}</p>
                    <p className="portfolio-hero__context">
                        Studying {academicProfile.curriculum} at {academicProfile.school} · expected graduation {academicProfile.expectedGraduation}
                    </p>
                    <div className="portfolio-hero__actions">
                        <a href="#home-selected-work" className="portfolio-button portfolio-button--primary cta-link">
                            Explore selected work <ArrowDownRight size={18} aria-hidden="true" />
                        </a>
                        <a
                            href="/resume.pdf"
                            className="portfolio-button portfolio-button--secondary cta-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open résumé PDF in a new tab"
                        >
                            Open résumé <ArrowUpRight size={17} aria-hidden="true" />
                        </a>
                    </div>
                </motion.div>

                <motion.article
                    className="portfolio-hero__feature"
                    aria-labelledby="home-featured-project-title"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    <figure className="portfolio-hero__visual">
                        <Link className="portfolio-hero__image-link" to={projectUrl} aria-label="Open Movie Tracker project details">
                            <img
                                src={featuredProject.thumbnail}
                                alt={featuredProject.thumbnailAlt || featuredProject.title + " project preview."}
                                loading="eager"
                                decoding="async"
                            />
                        </Link>
                        <figcaption>Product preview / {featuredProject.year}</figcaption>
                    </figure>
                    <div className="portfolio-hero__feature-copy">
                        <p className="portfolio-hero__feature-label">Featured product · {featuredProject.status}</p>
                        <h2 id="home-featured-project-title">{featuredProject.title}</h2>
                        <p>{featuredProject.description}</p>
                        <p className="portfolio-hero__feature-decision">{featuredProject.decisions}</p>
                        <Link className="home-text-link cta-link" to={projectUrl}>
                            Read the project notes <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                </motion.article>
            </motion.div>
        </motion.section>
    );
}

