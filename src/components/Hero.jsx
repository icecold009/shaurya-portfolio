import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import {
    EDITORIAL_EASE,
    REVEAL,
    REVEAL_CONTAINER,
} from "../lib/motion";

import InteractivePortrait from "./InteractivePortrait";
import "./Hero.css";

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

    const revealProps = shouldReduceMotion
        ? {}
        : {
            variants: REVEAL_CONTAINER,
            initial: "hidden",
            animate: "visible",
        };

    return (
        <section
            className="editorial-hero"
            id="home"
            aria-labelledby="editorial-hero-title"
        >
            <div
                className="editorial-hero-background"
                aria-hidden="true"
            >
                <div className="editorial-hero-grid" />
                <div className="editorial-hero-glow" />
            </div>

            <InteractivePortrait />

            <motion.div
                className="editorial-hero-inner"
                {...revealProps}
            >
                <motion.div
                    className="editorial-hero-topline"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    <span>Shaurya Saria</span>
                    <span>Bengaluru, India</span>
                    <span>AI + software builder</span>
                </motion.div>

                <motion.p
                    className="editorial-hero-eyebrow"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    Machine learning · Full-stack products ·
                    Interaction design
                </motion.p>

                <motion.h1
                    id="editorial-hero-title"
                    className="editorial-hero-title"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    I build systems that
                    <span> make difficult work</span>
                    easier to understand.
                </motion.h1>

                <motion.div
                    className="editorial-hero-bottom"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    <p className="editorial-hero-description">
                        I am Shaurya, a Bengaluru-based student
                        developer working across machine learning,
                        full-stack products and interfaces. I care
                        about making useful software honest enough
                        to inspect.
                    </p>

                    <div className="editorial-hero-actions">
                        <motion.div
                            whileHover={
                                shouldReduceMotion
                                    ? undefined
                                    : {
                                        y: -3,
                                        transition: {
                                            duration: 0.35,
                                            ease: EDITORIAL_EASE,
                                        },
                                    }
                            }
                        >
                            <Link
                                to="/projects"
                                className="editorial-hero-primary liquid-glass-control"
                            >
                                View selected work
                                <ArrowDownRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            </Link>
                        </motion.div>

                        <Link
                            to="/contact"
                            className="editorial-hero-secondary"
                        >
                            Contact me
                            <ArrowUpRight
                                size={17}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="editorial-hero-index"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                    aria-hidden="true"
                >
                    <span>Portfolio</span>
                    <span>2024–2026</span>
                    <span>Explore the site</span>
                </motion.div>

                <motion.section
                    className="hero-report-deck"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                    aria-labelledby="hero-report-deck-title"
                >
                    <div className="hero-report-deck-heading">
                        <span className="hero-report-deck-label">Reading list / 03</span>
                        <h2 id="hero-report-deck-title">
                            Reports and notes I keep <em>returning to.</em>
                        </h2>
                    </div>

                    <div className="hero-report-cards">
                        <a
                            className="hero-report-card hero-report-card--plan-a"
                            href="https://ai-2040.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="hero-report-card-topline">
                                <span>AI 2040</span>
                                <span>01</span>
                            </div>
                            <div className="hero-report-card-content">
                                <p className="hero-report-card-source">AI Futures Project</p>
                                <h3>Plan A</h3>
                                <p>
                                    A constructive scenario for slowing the race to
                                    superintelligence through transparency, coordination,
                                    and shared guardrails.
                                </p>
                            </div>
                            <span className="hero-report-card-link">
                                Read the report <span aria-hidden="true">↗</span>
                            </span>
                        </a>

                        <a
                            className="hero-report-card hero-report-card--ai-2027"
                            href="https://ai-2027.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="hero-report-card-topline">
                                <span>AI 2027</span>
                                <span>02</span>
                            </div>
                            <div className="hero-report-card-content">
                                <p className="hero-report-card-source">AI Futures Project</p>
                                <h3>A scenario, not a prophecy.</h3>
                                <p>
                                    A concrete forecast of how superhuman AI could reshape
                                    the next decade, with slowdown and race endings to test.
                                </p>
                            </div>
                            <span className="hero-report-card-link">
                                Read the report <span aria-hidden="true">↗</span>
                            </span>
                        </a>

                        <Link
                            className="hero-report-card hero-report-card--30-days-ai"
                            to="/blog?post=30-days-of-ai"
                        >
                            <div className="hero-report-card-topline">
                                <span>30 Days of AI</span>
                                <span>03</span>
                            </div>
                            <div className="hero-report-card-content">
                                <p className="hero-report-card-source">Personal note · Feb 2026</p>
                                <h3>From prompts to prototypes.</h3>
                                <p>
                                    What a month of prompting, data workflows, automation,
                                    agents, and rapid prototyping changed in how I work.
                                </p>
                            </div>
                            <span className="hero-report-card-link">
                                Read the note <span aria-hidden="true">↗</span>
                            </span>
                        </Link>
                    </div>
                </motion.section>
            </motion.div>
        </section>
    );
}
