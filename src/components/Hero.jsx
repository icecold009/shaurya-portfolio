import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";

import { REVEAL, REVEAL_CONTAINER } from "../lib/motion";
import { academicProfile } from "../data/profile";
import { projects } from "../data/projects";
import { positioningStatement } from "../lib/profileLinks";

import "./Hero.css";

const featuredProjects = ["movie-tracker", "past-paper-ai", "stadium-pulse-ai"]
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [isPageVisible, setIsPageVisible] = useState(true);
    const [keyboardChange, setKeyboardChange] = useState(false);
    const canAutoRotate = autoRotate && !shouldReduceMotion;

    useEffect(() => {
        const updateVisibility = () => setIsPageVisible(!document.hidden);
        updateVisibility();
        document.addEventListener("visibilitychange", updateVisibility);
        return () => document.removeEventListener("visibilitychange", updateVisibility);
    }, []);

    useEffect(() => {
        if (!canAutoRotate || isHovered || hasFocus || !isPageVisible || featuredProjects.length < 2) return undefined;
        const timer = window.setInterval(() => {
            setKeyboardChange(false);
            setActiveIndex((index) => (index + 1) % featuredProjects.length);
        }, 7000);
        return () => window.clearInterval(timer);
    }, [canAutoRotate, isHovered, hasFocus, isPageVisible]);

    const rotateCard = (direction, event) => {
        setAutoRotate(false);
        setKeyboardChange(event.detail === 0);
        setActiveIndex((index) => (index + direction + featuredProjects.length) % featuredProjects.length);
    };

    if (!featuredProjects.length) {
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
                    <h1 id="portfolio-hero-title" className="portfolio-hero__title">Shaurya <em>Saria</em></h1>
                    <p className="portfolio-hero__statement">{positioningStatement}</p>
                    <p className="portfolio-hero__context">
                        Studying <strong>{academicProfile.curriculum}</strong> at {academicProfile.school} · expected graduation {academicProfile.expectedGraduation}
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

                <motion.div
                    className="project-preview-stack"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Featured project previews"
                    data-keyboard={keyboardChange || shouldReduceMotion ? "true" : "false"}
                    variants={shouldReduceMotion ? undefined : REVEAL}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocusCapture={() => setHasFocus(true)}
                    onBlurCapture={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
                    }}
                >
                    <div className="project-preview-stack__stage">
                        {featuredProjects.map((project, index) => {
                            const depth = (index - activeIndex + featuredProjects.length) % featuredProjects.length;
                            const isActive = depth === 0;
                            const projectUrl = "/projects?project=" + project.id;
                            return (
                                <article
                                    key={project.id}
                                    className="portfolio-hero__feature project-preview-stack__card"
                                    aria-labelledby={"home-featured-project-title-" + project.id}
                                    aria-hidden={!isActive}
                                    inert={isActive ? undefined : ""}
                                    style={{
                                        zIndex: featuredProjects.length - depth,
                                        transform: depth === 0 ? "translate(0, 0) rotate(0deg) scale(1)" :
                                            "translate(" + depth * 8 + "px, " + depth * 10 + "px) rotate(" + (depth % 2 ? -3 : 4) + "deg) scale(" + (1 - depth * 0.025) + ")",
                                        pointerEvents: isActive ? "auto" : "none",
                                    }}
                                >
                                    <figure className="portfolio-hero__visual">
                                        <Link className="portfolio-hero__image-link" to={projectUrl} tabIndex={isActive ? undefined : -1} aria-label={"Open " + project.title + " project details"}>
                                            <img src={project.thumbnail} alt={project.thumbnailAlt || project.title + " project preview."} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
                                        </Link>
                                        <figcaption>Project preview / {project.year}</figcaption>
                                    </figure>
                                    <div className="portfolio-hero__feature-copy">
                                        <p className="portfolio-hero__feature-label">Featured work / {project.status}</p>
                                        <h2 id={"home-featured-project-title-" + project.id}>{project.title}</h2>
                                        <p>{project.description}</p>
                                        <p className="portfolio-hero__feature-decision">{project.decisions}</p>
                                        <Link className="home-text-link cta-link" to={projectUrl} tabIndex={isActive ? undefined : -1}>
                                            Read the project notes <ArrowUpRight size={16} aria-hidden="true" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    <div className="project-preview-stack__controls">
                        <div className="project-preview-stack__navigation">
                            <button type="button" aria-label="Previous project preview" onClick={(event) => rotateCard(-1, event)}><ChevronLeft size={18} aria-hidden="true" /></button>
                            <span aria-live={canAutoRotate ? "off" : "polite"} aria-atomic="true">{activeIndex + 1} / {featuredProjects.length}</span>
                            <button type="button" aria-label="Next project preview" onClick={(event) => rotateCard(1, event)}><ChevronRight size={18} aria-hidden="true" /></button>
                        </div>
                        <button type="button" className="project-preview-stack__rotation" disabled={shouldReduceMotion} onClick={() => setAutoRotate((value) => !value)} aria-label={canAutoRotate ? "Pause project rotation" : "Start project rotation"}>
                            {canAutoRotate ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                            {shouldReduceMotion ? "Manual rotation" : canAutoRotate ? "Pause" : "Auto rotate"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

