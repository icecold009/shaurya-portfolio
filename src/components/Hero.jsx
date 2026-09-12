import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { REVEAL, REVEAL_CONTAINER } from "../lib/motion";
import { positioningStatement } from "../lib/profileLinks";

import "./Hero.css";

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

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
                className="portfolio-hero__rail"
                aria-hidden="true"
                variants={shouldReduceMotion ? undefined : REVEAL}
            >
                <span>Shaurya Saria</span>
                <span>Bengaluru, India</span>
                <span>Available for internships</span>
            </motion.div>

            <motion.div
                className="portfolio-hero__content"
                variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
            >
                <motion.p
                    className="portfolio-hero__eyebrow"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    Student developer · Bengaluru
                </motion.p>

                <motion.h1
                    id="portfolio-hero-title"
                    className="portfolio-hero__title"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    Shaurya Saria
                </motion.h1>
                <motion.p
                    className="portfolio-hero__statement"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    I build data-driven AI and full-stack tools with a focus on <em>useful interfaces.</em>
                </motion.p>

                <motion.div
                    className="portfolio-hero__bottom"
                    variants={shouldReduceMotion ? undefined : REVEAL}
                >
                    <motion.p
                        className="portfolio-hero__description"
                        variants={shouldReduceMotion ? undefined : REVEAL}
                    >
                        {positioningStatement}
                    </motion.p>

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
                </motion.div>
            </motion.div>

            <motion.div
                className="portfolio-hero__footer"
                aria-hidden="true"
                variants={shouldReduceMotion ? undefined : REVEAL}
            >
                <span>01 / 04</span>
                <span>Selected work follows</span>
                <span>Scroll to explore</span>
            </motion.div>
        </motion.section>
    );
}

