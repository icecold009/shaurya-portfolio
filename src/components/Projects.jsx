import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
    EDITORIAL_EASE,
    REVEAL,
    REVEAL_CONTAINER,
    REVEAL_VIEWPORT,
} from "../lib/motion";

import "./Projects.css";

const projects = [
    {
        number: "01",
        year: "2026",
        category: "AI · Full-stack · Operations",
        title: "StadiumPulse AI",
        description:
            "An AI-assisted operations platform designed to help stadium teams manage alerts, crowd movement and real-time decisions during large sporting events.",
        contribution:
            "I designed the product experience and built the full-stack application, including role-based workflows, live operational alerts and AI-generated recommendations.",
        outcome:
            "A single operational interface for venue staff, volunteers and managers to identify issues and respond faster.",
        stack: ["React", "Supabase", "Gemini", "Realtime", "RLS"],
        github: "https://github.com/icecold009/stadiumpulse-ai",
        visual: "stadium",
        accent: "01",
    },
    {
        number: "02",
        year: "2025",
        category: "Audio · Machine learning · Web",
        title: "Music Recognition System",
        description:
            "A Shazam-style recognition system that records audio in the browser, creates frequency fingerprints and matches them against stored songs.",
        contribution:
            "I built the complete pipeline from microphone capture and audio processing to the Python matching API and Supabase fingerprint database.",
        outcome:
            "A working browser-based recognition flow capable of returning likely song matches from short audio samples.",
        stack: ["Python", "FastAPI", "React", "FFT", "Supabase"],
        github: "https://github.com/icecold009/music-recognition",
        visual: "music",
        accent: "02",
    },
    {
        number: "03",
        year: "2025",
        category: "Education · AI · Product design",
        title: "Past Paper AI",
        description:
            "An AI study assistant for Cambridge A-Level students that turns past papers into structured, interactive practice.",
        contribution:
            "I designed the experience around real revision problems, including question extraction, topic filtering and mark-scheme-aware feedback.",
        outcome:
            "A more direct way for students to navigate papers, practise specific topics and understand how their answers can improve.",
        stack: ["React", "Gemini", "PDF parsing", "Vercel"],
        github: "https://github.com/icecold009/past-paper-ai",
        visual: "paper",
        accent: "03",
    },
];

function ProjectVisual({ type, shouldReduceMotion }) {
    const visualMotionProps = shouldReduceMotion
        ? {}
        : {
            initial: {
                opacity: 0,
                scale: 0.985,
            },
            whileInView: {
                opacity: 1,
                scale: 1,
            },
            whileHover: {
                scale: 1.018,
            },
            viewport: {
                once: true,
                amount: 0.25,
            },
            transition: {
                duration: 0.7,
                ease: EDITORIAL_EASE,
            },
        };

    if (type === "stadium") {
        return (
            <motion.div
                className="case-study-mockup case-study-mockup-stadium"
                style={{
                    transformOrigin: "center center",
                }}
                {...visualMotionProps}
            >
                <div className="mockup-window-bar">
                    <span />
                    <span />
                    <span />
                    <small>operations.stadiumpulse.ai</small>
                </div>

                <div className="stadium-dashboard">
                    <aside className="stadium-sidebar">
                        <strong>SP</strong>
                        <span className="active" />
                        <span />
                        <span />
                        <span />
                    </aside>

                    <div className="stadium-dashboard-content">
                        <div className="stadium-dashboard-heading">
                            <div>
                                <small>Operations overview</small>
                                <strong>Venue status</strong>
                            </div>

                            <span className="stadium-live-status">
                                Live
                            </span>
                        </div>

                        <div className="stadium-stat-grid">
                            <article>
                                <small>Active zones</small>
                                <strong>24</strong>
                                <span>All monitored</span>
                            </article>

                            <article>
                                <small>Open alerts</small>
                                <strong>06</strong>
                                <span>2 priority</span>
                            </article>

                            <article>
                                <small>System health</small>
                                <strong>98%</strong>
                                <span>Operational</span>
                            </article>
                        </div>

                        <div className="stadium-lower-grid">
                            <div className="stadium-chart">
                                <div className="stadium-chart-label">
                                    <span>Crowd activity</span>
                                    <small>Last 60 minutes</small>
                                </div>

                                <svg
                                    viewBox="0 0 500 170"
                                    role="img"
                                    aria-label="Illustrative crowd activity graph"
                                >
                                    <path
                                        className="stadium-chart-area"
                                        d="M0,145 C45,134 55,102 98,112 C140,122 155,72 205,82 C250,92 270,48 315,62 C365,77 385,28 430,42 C462,51 480,20 500,25 L500,170 L0,170 Z"
                                    />

                                    <path
                                        className="stadium-chart-line"
                                        d="M0,145 C45,134 55,102 98,112 C140,122 155,72 205,82 C250,92 270,48 315,62 C365,77 385,28 430,42 C462,51 480,20 500,25"
                                    />
                                </svg>
                            </div>

                            <div className="stadium-alert">
                                <small>Latest alert</small>

                                <strong>
                                    Gate B congestion
                                </strong>

                                <p>
                                    Increased crowd density detected near
                                    the east entrance.
                                </p>

                                <span>
                                    Recommendation ready
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (type === "music") {
        return (
            <motion.div
                className="case-study-mockup case-study-mockup-music"
                style={{
                    transformOrigin: "center center",
                }}
                {...visualMotionProps}
            >
                <div className="music-interface">
                    <div className="music-topline">
                        <span>Listening session</span>
                        <small>Live input</small>
                    </div>

                    <div
                        className="music-disc"
                        aria-hidden="true"
                    >
                        <div className="music-disc-ring" />

                        <div className="music-disc-core">
                            <span>S</span>
                        </div>
                    </div>

                    <div
                        className="music-waveform"
                        aria-hidden="true"
                    >
                        {[
                            22, 38, 65, 42, 78, 54, 96, 62,
                            84, 48, 70, 34, 88, 58, 74, 46,
                            92, 60, 78, 40, 68, 30, 52, 24,
                        ].map((height, index) => (
                            <span
                                key={`${height}-${index}`}
                                style={{
                                    "--wave-height": `${height}%`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="music-result">
                        <div>
                            <small>Closest match</small>
                            <strong>
                                Audio fingerprint found
                            </strong>
                        </div>

                        <span>94.8%</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="case-study-mockup case-study-mockup-paper"
            style={{
                transformOrigin: "center center",
            }}
            {...visualMotionProps}
        >
            <div className="paper-interface">
                <aside className="paper-sidebar">
                    <div className="paper-logo">PA</div>
                    <span className="active">Papers</span>
                    <span>Topics</span>
                    <span>Practice</span>
                    <span>Progress</span>
                </aside>

                <div className="paper-workspace">
                    <div className="paper-workspace-header">
                        <div>
                            <small>
                                Cambridge A-Level Mathematics
                            </small>

                            <strong>Topic practice</strong>
                        </div>

                        <span>9709</span>
                    </div>

                    <div className="paper-question">
                        <div className="paper-question-meta">
                            <span>Question 4</span>

                            <small>
                                Integration · 6 marks
                            </small>
                        </div>

                        <p>
                            Find the exact value of the area enclosed
                            by the curve and the coordinate axes.
                        </p>

                        <div className="paper-equation">
                            y = 3x² − 2x + 4
                        </div>
                    </div>

                    <div className="paper-feedback">
                        <span>AI feedback</span>

                        <p>
                            Your method is correct. Include the limits
                            before evaluating the integral.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectCaseStudy({ project }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.article
            className={`case-study case-study-${project.accent}`}
            variants={shouldReduceMotion ? undefined : REVEAL}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={
                shouldReduceMotion ? undefined : "visible"
            }
            viewport={{
                once: true,
                amount: 0.08,
            }}
        >
            <div className="case-study-meta">
                <span>{project.number}</span>
                <span>{project.category}</span>
                <span>{project.year}</span>
            </div>

            <div className="case-study-heading">
                <h3>{project.title}</h3>

                <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                >
                    View repository
                    <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                    />
                </a>
            </div>

            <ProjectVisual
                type={project.visual}
                shouldReduceMotion={shouldReduceMotion}
            />

            <div className="case-study-details">
                <p className="case-study-introduction">
                    {project.description}
                </p>

                <div className="case-study-detail">
                    <span>My role</span>
                    <p>{project.contribution}</p>
                </div>

                <div className="case-study-detail">
                    <span>Result</span>
                    <p>{project.outcome}</p>
                </div>
            </div>

            <div className="case-study-footer">
                <div className="case-study-stack">
                    {project.stack.map((technology) => (
                        <span key={technology}>
                            {technology}
                        </span>
                    ))}
                </div>

                <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="case-study-link"
                    whileHover={
                        shouldReduceMotion
                            ? undefined
                            : {
                                x: 6,
                                transition: {
                                    duration: 0.35,
                                    ease: EDITORIAL_EASE,
                                },
                            }
                    }
                >
                    Explore project

                    <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                    />
                </motion.a>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            className="selected-work"
            id="selected-work"
            aria-labelledby="selected-work-title"
        >
            <motion.div
                className="selected-work-header"
                variants={
                    shouldReduceMotion
                        ? undefined
                        : REVEAL_CONTAINER
                }
                initial={
                    shouldReduceMotion
                        ? undefined
                        : "hidden"
                }
                whileInView={
                    shouldReduceMotion
                        ? undefined
                        : "visible"
                }
                viewport={REVEAL_VIEWPORT}
            >
                <motion.p
                    className="selected-work-kicker"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    Selected work · 2025–2026
                </motion.p>

                <motion.h2
                    id="selected-work-title"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    Three projects,
                    <span> explored in depth.</span>
                </motion.h2>

                <motion.p
                    className="selected-work-intro"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    A closer look at the problems, systems and product
                    decisions behind some of my most important work.
                </motion.p>
            </motion.div>

            <div className="case-study-list">
                {projects.map((project) => (
                    <ProjectCaseStudy
                        project={project}
                        key={project.title}
                    />
                ))}
            </div>
        </section>
    );
}