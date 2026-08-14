import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
            "A simulated stadium-operations dashboard for turning venue telemetry into zone status, grounded alerts and recommendations.",
        contribution:
            "I shaped the product surface and full-stack workflow around an operator's questions: what is happening, where, how urgent it is and what action is suggested.",
        outcome:
            "A focused prototype for making operational decisions legible during a crowded event without presenting simulated telemetry as live production data.",
        stack: ["React", "Supabase", "Gemini", "Realtime", "RLS"],
        github: "https://github.com/icecold009/stadiumpulse-ai",
        visual: "stadium",
        thumbnail: "/projects/stadiumpulse.svg",
        accent: "01",
    },
    {
        number: "02",
        year: "2025",
        category: "Audio · Python · Flask",
        title: "Audio Recognition",
        description:
            "The DIY Shazam-style project where I built a complete path from microphone input or upload to normalized audio and fingerprint matching.",
        contribution:
            "I built the shared audio pipeline, Flask browser UI and CLI flow, then added provider adapters alongside a local spectrogram and constellation-hash matcher.",
        outcome:
            "One same-origin application for microphone and file recognition, with bounded input handling, normalized results and honest no-match states.",
        stack: ["Python", "Flask", "FFmpeg", "Fingerprinting", "Docker"],
        github: "https://github.com/icecold009/Audio-Recognition",
        visual: "music",
        thumbnail: "/projects/music-recognition.svg",
        accent: "02",
    },
    {
        number: "03",
        year: "2025",
        category: "Education · AI · Product design",
        title: "Past Paper AI",
        description:
            "A Cambridge A-Level study tool that turns past papers into structured practice instead of leaving revision buried inside PDFs.",
        contribution:
            "I designed the experience around question extraction, subject and topic filtering, and mark-scheme-aware feedback across the supported paper set.",
        outcome:
            "A more direct revision workflow for finding the right question, practising a topic and understanding how an answer can improve.",
        stack: ["Python", "Gemini", "PDF parsing", "Flask"],
        github: "https://github.com/icecold009/past-paper-ai",
        visual: "paper",
        thumbnail: "/projects/past-paper-ai.svg",
        accent: "03",
    },
    {
        number: "04",
        year: "2026",
        category: "Full-stack · Web · Data",
        title: "Movie Tracker",
        description:
            "A personal watch tracker for movies and series, built around TMDB metadata, structured ratings, watch status and a transparent recommendation baseline.",
        contribution:
            "I built the Flask and PostgreSQL application, separated public browsing from protected mutations, and shaped the watchlist around how I actually choose what to watch next.",
        outcome:
            "A clear public and admin experience with TMDB-backed cover art and deterministic recommendations that stay transparent about their limits.",
        stack: ["Flask", "PostgreSQL", "Supabase", "TMDB", "Vercel"],
        github: "https://github.com/icecold009/movie-tracker",
        visual: "movie",
        thumbnail: "/projects/movie-tracker.svg",
        accent: "04",
    },
    {
        number: "05",
        year: "2026",
        category: "Computer vision · Offline · Flask",
        title: "Face Attendance System",
        description:
            "A local-first face recognition system that turns a webcam into an attendance workflow without requiring a cloud service.",
        contribution:
            "I built the Flask dashboard, enrollment workflow, live recognition loop, attendance deduplication and CSV reporting path, with a dependency-safe fallback for development.",
        outcome:
            "A self-contained workflow for enrolling people, recognizing faces at the camera and producing daily records while keeping the runtime local and inspectable.",
        stack: ["Python", "OpenCV", "Flask", "face-recognition", "CSV"],
        github: "https://github.com/icecold009/face-attendance-opencv-python",
        visual: "attendance",
        thumbnail: "/projects/face-attendance.svg",
        accent: "05",
    },
    {
        number: "06",
        year: "2026",
        category: "Data science · ML · Evaluation",
        title: "F1 Championship Prediction",
        description:
            "A leakage-safe forecasting study that estimates final Formula 1 standings from signals available before a season begins.",
        contribution:
            "I designed the leak-aware feature pipeline, rolling-origin evaluation and report generation so every forecast can be traced back to an earlier season.",
        outcome:
            "A reproducible benchmark whose most useful lesson was that a simple previous-season baseline can deserve more trust than a complex model.",
        stack: ["Python", "Pandas", "scikit-learn", "Jupyter", "Pytest"],
        github: "https://github.com/icecold009/f1-championship-prediction",
        visual: "f1",
        thumbnail: "/projects/f1-prediction.svg",
        accent: "06",
    },
    {
        number: "07",
        year: "2026",
        category: "AI · Routing · Full-stack",
        title: "Token Smart Router",
        description:
            "A compact AI routing layer that answers simple prompts locally and sends genuinely complex requests to a configured Fireworks model.",
        contribution:
            "I built the React/Vite interface, Express API and Docker workflow around a deliberately small routing policy that makes the cost decision visible.",
        outcome:
            "A focused prototype for reducing unnecessary model calls while keeping a clear path from prompt classification to hosted inference.",
        stack: ["React", "Express", "Docker", "Fireworks AI"],
        github: "https://github.com/icecold009/token-smart-router",
        visual: "router",
        thumbnail: "/projects/token-router.svg",
        accent: "07",
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
                                <small>Telemetry state</small>
                                <strong>Ready</strong>
                                <span>Simulation</span>
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

                        <span>matched</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (type === "movie") {
        return (
            <motion.div
                className="case-study-mockup case-study-mockup-movie"
                {...visualMotionProps}
            >
                <div className="movie-interface">
                    <div className="movie-topline">
                        <div>
                            <small>My watch tracker</small>
                            <strong>Keep the good stories close.</strong>
                        </div>
                        <span>Admin view</span>
                    </div>
                    <div className="movie-stats">
                        <article><small>Watched</small><strong>48</strong></article>
                        <article><small>To watch</small><strong>16</strong></article>
                        <article><small>Top tier</small><strong>08</strong></article>
                    </div>
                    <div className="movie-list">
                        <div><span className="movie-poster movie-poster-one" /><p><strong>Past Lives</strong><small>Drama · 10/10</small></p><b>Watched</b></div>
                        <div><span className="movie-poster movie-poster-two" /><p><strong>Arrival</strong><small>Science fiction · 9/10</small></p><b>Watched</b></div>
                        <div><span className="movie-poster movie-poster-three" /><p><strong>Perfect Days</strong><small>Drama · Want to watch</small></p><b>Queue</b></div>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (type === "attendance") {
        return (
            <motion.div
                className="case-study-mockup case-study-mockup-attendance"
                {...visualMotionProps}
            >
                <div className="attendance-interface">
                    <div className="attendance-topline"><span>Local camera / 01</span><b>● live</b></div>
                    <div className="attendance-grid">
                        <div className="attendance-camera">
                            <div className="attendance-face attendance-face-one"><span>ARJUN</span></div>
                            <div className="attendance-face attendance-face-two"><span>MEERA</span></div>
                            <div className="attendance-camera-label">Recognition feed · 05 fps</div>
                        </div>
                        <aside className="attendance-panel">
                            <small>Today</small>
                            <strong>12 / 18</strong>
                            <span>present</span>
                            <div className="attendance-progress"><i /></div>
                            <p>One record per person, per day.</p>
                        </aside>
                    </div>
                    <div className="attendance-log"><span>Latest mark</span><strong>Meera Kapoor</strong><small>09:42:18 · saved to CSV</small></div>
                </div>
            </motion.div>
        );
    }

    if (type === "f1") {
        return (
            <motion.div
                className="case-study-mockup case-study-mockup-f1"
                {...visualMotionProps}
            >
                <div className="f1-interface">
                    <div className="f1-header"><div><small>walk-forward / baseline check</small><strong>Championship outlook</strong></div><span>baseline</span></div>
                    <div className="f1-chart"><div className="f1-chart-axis"><span>300 pts</span><span>150</span><span>0</span></div><svg viewBox="0 0 600 220" role="img" aria-label="Illustrative predicted championship points chart"><path className="f1-grid-line" d="M0 40H600M0 110H600M0 180H600" /><path className="f1-chart-fill" d="M0 180 C70 164 86 92 155 108 S255 56 320 77 S420 34 488 58 S545 25 600 32 L600 220 L0 220Z" /><path className="f1-chart-line" d="M0 180 C70 164 86 92 155 108 S255 56 320 77 S420 34 488 58 S545 25 600 32" /></svg></div>
                    <div className="f1-table"><div><span>01</span><strong>Verstappen</strong><b>312 pts</b></div><div><span>02</span><strong>Norris</strong><b>278 pts</b></div><div><span>03</span><strong>Leclerc</strong><b>241 pts</b></div></div>
                </div>
            </motion.div>
        );
    }

    if (type === "router") {
        return (
            <motion.div
                className="case-study-mockup case-study-mockup-router"
                {...visualMotionProps}
            >
                <div className="router-interface">
                    <div className="router-topline"><span>Token Smart Router</span><small>routing policy active</small></div>
                    <div className="router-flow">
                        <div className="router-node router-input"><small>Prompt</small><strong>Explain recursion</strong><span>short / definitional</span></div>
                        <div className="router-branch"><i /><i /></div>
                        <div className="router-destinations"><div className="router-node router-local"><small>Local route</small><strong>Instant answer</strong><span>0 tokens spent</span></div><div className="router-node router-cloud"><small>Fireworks route</small><strong>Deep reasoning</strong><span>only when needed</span></div></div>
                    </div>
                    <div className="router-footer"><span>simple prompt / local path</span><b>route: local</b></div>
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
            id={`project-detail-${project.number}`}
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
                <h3
                    className={
                        ["02", "04", "06"].includes(project.number)
                            ? "heading-italic"
                            : undefined
                    }
                >
                    {project.title}
                </h3>

                <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                >
                    View repository
                    <ArrowUpRight size={18} aria-hidden="true" />
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
                    <ArrowUpRight size={18} aria-hidden="true" />
                </motion.a>
            </div>
        </motion.article>
    );
}

function ProjectFolderBrowser() {
    return (
        <div className="project-browser" aria-labelledby="project-browser-title">
            <div className="project-browser-heading">
                <div>
                    <p className="selected-work-kicker">Project index</p>
                    <h3>Browse the <em>archive.</em></h3>
                </div>
                <span className="project-browser-hint">
                    <ArrowRight size={15} aria-hidden="true" />
                    scroll to explore
                </span>
            </div>

            <div className="project-folder-rail" role="list">
                {projects.map((project) => (
                    <a
                        className="project-file"
                        href={`#project-detail-${project.number}`}
                        key={project.title}
                        role="listitem"
                        aria-label={`Open ${project.title} overview`}
                    >
                        <img
                            src={project.thumbnail}
                            alt={`${project.title} preview`}
                            loading="lazy"
                        />
                    </a>
                ))}
            </div>

            <nav className="project-list" aria-label="Project list">
                <div className="project-list-heading">
                    <span>Project list</span>
                    <span>{String(projects.length).padStart(2, "0")} files</span>
                </div>
                {projects.map((project) => (
                    <a
                        className="project-list-item"
                        href={`#project-detail-${project.number}`}
                        key={`list-${project.title}`}
                    >
                        <span>{project.number}</span>
                        <strong>{project.title}</strong>
                        <small>{project.category}</small>
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                ))}
            </nav>
        </div>
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
                    Projects,
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
                    A working archive across ML evaluation, audio systems,
                    education, operations and product tooling—showing what
                    I built, what I chose not to hide and what I learned.
                </motion.p>
            </motion.div>

            <nav className="project-index" aria-label="Project index">
                <div className="project-index__heading">
                    <span>Quick access</span>
                    <span>{String(projects.length).padStart(2, "0")} projects</span>
                </div>

                {projects.map((project) => (
                    <a
                        className="project-index__item"
                        href={`#project-detail-${project.number}`}
                        key={`quick-${project.title}`}
                    >
                        <span>{project.number}</span>
                        <strong>{project.title}</strong>
                        <small>{project.category}</small>
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                ))}
            </nav>

            <ProjectFolderBrowser />

            <div className="project-details-heading">
                <p className="selected-work-kicker">Detailed view</p>
                <span>Scroll vertically for the full case studies.</span>
            </div>

            <div className="case-study-list" id="project-details">
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
