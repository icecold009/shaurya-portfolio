import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import {
    EDITORIAL_EASE,
    REVEAL,
    REVEAL_CONTAINER,
} from "../lib/motion";

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
                    <span>Student developer</span>
                </motion.div>

                <motion.p
                    className="editorial-hero-eyebrow"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    Full-stack development · AI products ·
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
                    I design and build
                    <span> digital products</span>
                    that solve real problems.
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
                        I build full-stack applications,
                        AI-powered tools and thoughtful web
                        experiences with a focus on clarity,
                        performance and useful interaction.
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
                                className="editorial-hero-primary"
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
            </motion.div>
        </section>
    );
}