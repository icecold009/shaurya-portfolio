import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

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
        problem:
            "Event operators need a fast way to move from scattered signals to a grounded next action.",
        constraints:
            "The telemetry is simulated, so the interface must never imply live venue monitoring or production alerting.",
        contribution:
            "I shaped the product surface and full-stack workflow around an operator's questions: what is happening, where, how urgent it is and what action is suggested.",
        decisions:
            "I made the operator's questions the primary information architecture and kept alert context beside the action it supports.",
        outcome:
            "A focused prototype for making operational decisions legible during a crowded event without presenting simulated telemetry as live production data.",
        limitations:
            "It still needs real operator feedback, authorized data sources and a hosted verification pass before any deployment claim.",
        status: "Prototype · simulated data",
        stack: ["React", "Supabase", "Gemini", "Realtime", "RLS"],
        github: "https://github.com/icecold009/stadiumpulse-ai",
        visual: "stadium",
        thumbnail: "/projects/stadiumpulse-live-login.png",
        thumbnailAlt: "StadiumPulse AI PulseOps command center sign-in screen",
        accent: "01",
    },
    {
        number: "02",
        year: "2025",
        category: "Audio · Python · Flask",
        title: "Audio Recognition",
        description:
            "The DIY Shazam-style project where I built a complete path from microphone input or upload to normalized audio and fingerprint matching.",
        problem:
            "Recognition is only useful when inconsistent audio inputs can reach one understandable result path.",
        constraints:
            "Uploads, microphone capture, conversion and no-match states need to stay bounded and inspectable on a local-first stack.",
        contribution:
            "I built the shared audio pipeline, Flask browser UI and CLI flow, then added provider adapters alongside a local spectrogram and constellation-hash matcher.",
        decisions:
            "I kept provider adapters beside a local matcher so the interface can distinguish a useful result from an unavailable provider.",
        outcome:
            "One same-origin application for microphone and file recognition, with bounded input handling, normalized results and honest no-match states.",
        limitations:
            "Catalog coverage, noisy audio performance and any public hosted flow remain to be measured outside the repository.",
        status: "Prototype · source linked",
        stack: ["Python", "Flask", "FFmpeg", "Fingerprinting", "Docker"],
        github: "https://github.com/icecold009/Audio-Recognition",
        visual: "music",
        thumbnail: "/projects/audio-recognition-fft.png",
        thumbnailAlt: "Audio Recognition frequency spectrum diagnostic",
        accent: "02",
    },
    {
        number: "03",
        year: "2025",
        category: "Education · AI · Product design",
        title: "Past Paper AI",
        description:
            "A Cambridge A-Level study tool that turns past papers into structured practice instead of leaving revision buried inside PDFs.",
        problem:
            "Students need to reach the right question and feedback without manually searching a pile of past-paper PDFs.",
        constraints:
            "The supported paper set, extraction quality and mark-scheme context define what the product can responsibly promise.",
        contribution:
            "I designed the experience around question extraction, subject and topic filtering, and mark-scheme-aware feedback across the supported paper set.",
        decisions:
            "I treated the supported corpus and feedback path as first-class product boundaries instead of presenting every PDF as equally understood.",
        outcome:
            "A more direct revision workflow for finding the right question, practising a topic and understanding how an answer can improve.",
        limitations:
            "Coverage, model quality and real student outcomes need corpus, identity and production evidence before broader claims.",
        status: "Prototype · source linked",
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
        problem:
            "A watchlist becomes less useful when status, ratings and the next recommendation live in separate places.",
        constraints:
            "Public browsing, protected mutations, third-party metadata and recommendation logic need separate trust boundaries.",
        contribution:
            "I built the Flask and PostgreSQL application, separated public browsing from protected mutations, and shaped the watchlist around how I actually choose what to watch next.",
        decisions:
            "I kept recommendations deterministic and visible so a suggestion can be inspected instead of treated as a mysterious score.",
        outcome:
            "A clear public and admin experience with TMDB-backed cover art and deterministic recommendations that stay transparent about their limits.",
        limitations:
            "The hosted database, authentication and deployment behavior still need live verification before this is presented as a public service.",
        status: "Prototype · source linked",
        stack: ["Flask", "PostgreSQL", "Supabase", "TMDB", "Vercel"],
        github: "https://github.com/icecold009/movie-tracker",
        visual: "movie",
        thumbnail: "/projects/movie-tracker-production.png",
        thumbnailAlt: "Movie Tracker production watchlist screenshot",
        accent: "04",
    },
    {
        number: "05",
        year: "2026",
        category: "Computer vision · Offline · Flask",
        title: "Face Attendance System",
        description:
            "A local-first face recognition system that turns a webcam into an attendance workflow without requiring a cloud service.",
        problem:
            "Small teams need attendance records without sending camera input to a third-party service by default.",
        constraints:
            "Camera permissions, local dependencies, duplicate marks and uncertain recognition results must fail visibly.",
        contribution:
            "I built the Flask dashboard, enrollment workflow, live recognition loop, attendance deduplication and CSV reporting path, with a dependency-safe fallback for development.",
        decisions:
            "I kept the workflow local and separated enrollment, recognition and export so each step can be checked independently.",
        outcome:
            "A self-contained workflow for enrolling people, recognizing faces at the camera and producing daily records while keeping the runtime local and inspectable.",
        limitations:
            "Recognition accuracy, consent, hardware coverage and real-world privacy review are outside this portfolio preview.",
        status: "Prototype · local-first",
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
        problem:
            "A forecast is not useful if its features quietly contain information from after the prediction point.",
        constraints:
            "Chronological splits, pre-season features and a simple baseline are more important than a flattering single score.",
        contribution:
            "I designed the leak-aware feature pipeline, rolling-origin evaluation and report generation so every forecast can be traced back to an earlier season.",
        decisions:
            "I compared the model with a previous-season baseline and treated the evaluation design as part of the result.",
        outcome:
            "A reproducible benchmark whose most useful lesson was that a simple previous-season baseline can deserve more trust than a complex model.",
        limitations:
            "The dataset is historical and the forecast is not a live betting, strategy or future-results guarantee.",
        status: "Research study · source linked",
        stack: ["Python", "Pandas", "scikit-learn", "Jupyter", "Pytest"],
        github: "https://github.com/icecold009/f1-championship-prediction",
        visual: "f1",
        thumbnail: "/projects/f1-predicted-vs-actual-2023.png",
        thumbnailAlt: "F1 Championship Prediction chart comparing predicted and actual standings",
        accent: "06",
    },
    {
        number: "07",
        year: "2026",
        category: "AI · Routing · Full-stack",
        title: "Token Smart Router",
        description:
            "A compact AI routing layer that answers simple prompts locally and sends genuinely complex requests to a configured Fireworks model.",
        problem:
            "Not every prompt needs a hosted model, but the cost and routing decision is often hidden from the person using the tool.",
        constraints:
            "The router depends on configured credentials and a deliberately small policy; it is not a general model-quality benchmark.",
        contribution:
            "I built the React/Vite interface, Express API and Docker workflow around a deliberately small routing policy that makes the cost decision visible.",
        decisions:
            "I exposed the route beside the response and kept the policy small enough to inspect before adding more model complexity.",
        outcome:
            "A focused prototype for reducing unnecessary model calls while keeping a clear path from prompt classification to hosted inference.",
        limitations:
            "Hosted inference, credentials, latency and routing quality need an authorized environment before performance claims are made.",
        status: "Prototype · hosted path unverified",
        stack: ["React", "Express", "Docker", "Fireworks AI"],
        github: "https://github.com/icecold009/token-smart-router",
        visual: "router",
        thumbnail: "/projects/token-router.svg",
        accent: "07",
    },
    {
        number: "08",
        year: "2025",
        category: "Data science · Education · Risk modeling",
        title: "Student Dropout Risk Prediction",
        description:
            "A student-dropout risk prediction project documented through a report, template workbook, sample data and an updated dataset.",
        problem:
            "A structured prediction exercise should show how the inputs and reporting support a decision, not turn a student into a fixed label.",
        constraints:
            "The available workbook, sample data and academic context limit what can be inferred responsibly.",
        contribution:
            "I completed the prediction exercise by working through the supplied workbook and datasets, keeping the analysis structured and traceable.",
        decisions:
            "I kept the report and data artifacts together so the analysis can be read as a documented exercise rather than a production risk system.",
        outcome:
            "A documented academic project showing how structured data and reporting can support risk analysis without turning a prediction into a fixed label.",
        limitations:
            "There is no linked source repository or production evaluation record in this portfolio entry.",
        status: "Archive record · source link pending",
        stack: ["Python", "Pandas", "scikit-learn", "Matplotlib"],
        github: null,
        visual: "dropout",
        thumbnail: null,
        accent: "08",
    },
];

function ProjectVisual({ type, shouldReduceMotion, thumbnail, thumbnailAlt, title }) {
    const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
            whileHover: canHover
                ? {
                    scale: 1.018,
                }
                : undefined,
            viewport: {
                once: true,
                amount: 0.25,
            },
            transition: {
                duration: 0.7,
                ease: EDITORIAL_EASE,
            },
        };

    const hasRealThumbnail = thumbnail && !thumbnail.endsWith(".svg");

    if (hasRealThumbnail) {
        return (
            <motion.figure
                className={`case-study-mockup case-study-mockup-image case-study-mockup-image--${type}`}
                {...visualMotionProps}
            >
                <img
                    src={thumbnail}
                    alt={thumbnailAlt ?? `${title} project screenshot`}
                    loading="lazy"
                    decoding="async"
                />
            </motion.figure>
        );
    }

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
                                Simulation
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

    if (type === "dropout") {
        return (
            <motion.div
                className="case-study-mockup case-study-mockup-dropout"
                {...visualMotionProps}
            >
                <div className="dropout-interface">
                    <div className="dropout-header">
                        <div>
                            <small>project archive / illustrative view</small>
                            <strong>Early intervention view</strong>
                        </div>
                        <span>review, do not label</span>
                    </div>

                    <div className="dropout-score-grid">
                        <article>
                            <small>Attendance signal</small>
                            <strong>Review</strong>
                            <span>recent change detected</span>
                        </article>
                        <article>
                            <small>Academic signal</small>
                            <strong>Stable</strong>
                            <span>compare with context</span>
                        </article>
                        <article>
                            <small>Next step</small>
                            <strong>Talk first</strong>
                            <span>human review required</span>
                        </article>
                    </div>

                    <div className="dropout-table">
                        <div><span>Signal</span><span>Weight</span><span>Action</span></div>
                        <div><strong>Attendance trend</strong><b>medium</b><small>check in</small></div>
                        <div><strong>Assessment pattern</strong><b>low</b><small>monitor</small></div>
                        <div><strong>Support context</strong><b>unknown</b><small>ask, don't assume</small></div>
                    </div>
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

function ProjectCaseStudy({ project, featured = false }) {
    const shouldReduceMotion = useReducedMotion();
    const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    return (
        <motion.article
            id={`project-detail-${project.number}`}
            className={`case-study case-study-${project.accent} ${featured ? "case-study--featured" : "case-study--archive"}`}
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

                {project.github ? (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                    >
                        Source
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                ) : (
                    <span className="case-study-source-note">
                        CV / Drive record
                    </span>
                )}
            </div>

            <div className="case-study-lede">
                <p>{project.outcome}</p>
                <span>{project.status}</span>
            </div>

            <ProjectVisual
                type={project.visual}
                shouldReduceMotion={shouldReduceMotion}
                thumbnail={project.thumbnail}
                thumbnailAlt={project.thumbnailAlt}
                title={project.title}
            />

            <div className="case-study-details">
                <p className="case-study-introduction">
                    {project.problem}
                </p>

                <div className="case-study-detail-grid">
                    <div className="case-study-detail">
                        <span>What I built</span>
                        <p>{project.contribution}</p>
                    </div>

                    <div className="case-study-detail">
                        <span>Constraints</span>
                        <p>{project.constraints}</p>
                    </div>

                    <div className="case-study-detail">
                        <span>Decisions</span>
                        <p>{project.decisions}</p>
                    </div>

                    <div className="case-study-detail">
                        <span>Result</span>
                        <p>{project.outcome}</p>
                    </div>

                    <div className="case-study-detail">
                        <span>Limitations</span>
                        <p>{project.limitations}</p>
                    </div>
                </div>
            </div>

            <div
                className="case-study-proof"
                id={`project-evidence-${project.number}`}
                aria-label={`${project.title} proof and status`}
            >
                <div className="case-study-proof-copy">
                    <span>Evidence</span>
                    <p>
                        {project.github
                            ? "Linked repository is the current inspectable source for this entry."
                            : "This entry is a documented project record without a linked public repository."}
                    </p>
                </div>

                <div className="case-study-proof-actions">
                    {project.github ? (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="case-study-proof-action"
                        >
                            Source
                            <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                    ) : (
                        <span
                            className="case-study-proof-action case-study-proof-action--disabled"
                            aria-disabled="true"
                            title="No public source link has been verified for this project."
                        >
                            Source · not linked
                        </span>
                    )}

                    {project.demo ? (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="case-study-proof-action"
                        >
                            Try it
                            <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                    ) : (
                        <span
                            className="case-study-proof-action case-study-proof-action--disabled"
                            aria-disabled="true"
                            title="No hosted demo has been verified for this project."
                        >
                            Try it · not verified
                        </span>
                    )}

                    {project.github ? (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="case-study-proof-action"
                            title="Open the repository evidence"
                        >
                            Evidence
                            <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                    ) : (
                        <span
                            className="case-study-proof-action case-study-proof-action--disabled"
                            aria-disabled="true"
                        >
                            Evidence · pending
                        </span>
                    )}

                    <span className="case-study-proof-status">
                        <span>Status</span>
                        {project.status}
                    </span>
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

                {project.github ? (
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="case-study-link"
                        whileHover={
                            shouldReduceMotion || !canHover
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
                        Open repository
                        <ArrowUpRight size={18} aria-hidden="true" />
                    </motion.a>
                ) : (
                    <span className="case-study-source-note">
                        Project record · repository not linked
                    </span>
                )}
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
                        {project.thumbnail ? (
                            <img
                                src={project.thumbnail}
                                alt={project.thumbnailAlt ?? `${project.title} project preview`}
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <span className="project-file-placeholder" aria-hidden="true">
                                {project.number}
                            </span>
                        )}
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

                <motion.h1
                    id="selected-work-title"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    Projects,
                    <span> explored in depth.</span>
                </motion.h1>

                <motion.p
                    className="selected-work-intro"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    Three featured projects, followed by a working archive across
                    ML evaluation, audio systems, education, operations and product
                    tooling, showing what I built, what I chose not to hide and what I learned.
                </motion.p>

                <motion.a
                    className="selected-work-primary"
                    href="#project-details"
                    variants={
                        shouldReduceMotion
                            ? undefined
                            : REVEAL
                    }
                >
                    Read the case studies
                    <ArrowRight size={17} aria-hidden="true" />
                </motion.a>
            </motion.div>

            <nav className="project-index" aria-label="Project index">
                <div className="project-index__heading">
                    <span>Find a project</span>
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

            <div className="project-writing-callout">
                <div>
                    <span className="selected-work-kicker">Competition note</span>
                    <h3>How I approached <em>BirdCLEF 2026.</em></h3>
                </div>
                <p>
                    The Kaggle audio-classification write-up sits alongside the
                    project archive, with the decisions and limitations left visible.
                </p>
                <Link to="/blog?post=birdclef-2026">
                    Read the write-up
                    <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
            </div>

            <div className="project-details-heading">
                <p className="selected-work-kicker">Detailed view</p>
                <span>Scroll vertically for the full case studies.</span>
            </div>

            <div className="case-study-list" id="project-details">
                {projects.map((project, index) => (
                    <Fragment key={project.title}>
                        {index === 3 && (
                            <div className="project-archive-divider" role="separator" aria-label="More work in the archive">
                                <span>More work</span>
                                <span>{String(projects.length - 3).padStart(2, "0")} projects in the archive</span>
                            </div>
                        )}
                        <ProjectCaseStudy
                            project={project}
                            featured={index < 3}
                        />
                    </Fragment>
                ))}
            </div>
        </section>
    );
}
