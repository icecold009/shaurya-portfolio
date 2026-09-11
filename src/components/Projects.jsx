import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
    EDITORIAL_EASE,
    REVEAL,
    REVEAL_CONTAINER,
    REVEAL_VIEWPORT,
} from "../lib/motion";
import {
    filterProjects,
    getProjectFromHash,
    getProjectTag,
} from "../lib/projectSearch";

import "./Projects.css";
import { projectProofIntro, projects } from "../data/projects";
import ProjectDetailDialog from "./ProjectDetailDialog";

function ProjectIndexLink({ project, className, onOpenProject, children }) {
    return (
        <a
            className={className}
            href={`#project-detail-${project.number}`}
            onClick={(event) => {
                event.preventDefault();
                onOpenProject(project, event.currentTarget);
            }}
        >
            {children}
        </a>
    );
}

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

function ProjectCardPreview({ project }) {
    return (
        <span className="case-study-toggle__preview" aria-hidden="true">
            {project.thumbnail ? (
                <img
                    src={project.thumbnail}
                    alt=""
                    loading="eager"
                    decoding="async"
                />
            ) : (
                <span className="case-study-toggle__preview-fallback">
                    {project.number}
                </span>
            )}
        </span>
    );
}

function ProjectCaseStudy({ project, onOpenProject }) {
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
            <button
                type="button"
                className="case-study-toggle"
                onClick={(event) => onOpenProject(project, event.currentTarget)}
                aria-haspopup="dialog"
            >
                <ProjectCardPreview project={project} />

                <span className="case-study-toggle__name">
                    <span
                        className={`case-study-toggle__title ${["02", "04", "06"].includes(project.number) ? "heading-italic" : ""}`}
                        role="heading"
                        aria-level="2"
                    >
                        {project.title}
                    </span>
                </span>
            </button>
        </motion.article>
    );
}

function ProjectFolderBrowser({ visibleProjects, onOpenProject }) {
    return (
        <div className="project-browser" aria-labelledby="project-browser-title">
            <div className="project-browser-heading">
                <div>
                    <p className="selected-work-kicker">Project index</p>
                    <h3 id="project-browser-title">Browse the <em>archive.</em></h3>
                </div>
                <span className="project-browser-hint">
                    <ArrowRight size={15} aria-hidden="true" />
                    scroll to explore
                </span>
            </div>

            <div className="project-folder-rail" role="list">
                {visibleProjects.map((project) => (
                    <ProjectIndexLink
                        className="project-file"
                        key={project.title}
                        role="listitem"
                        aria-label={`Open ${project.title} overview`}
                        onOpenProject={onOpenProject}
                        project={project}
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
                    </ProjectIndexLink>
                ))}
            </div>

            <nav className="project-list" aria-label="Project list">
                <div className="project-list-heading">
                    <span>Project list</span>
                    <span>{String(visibleProjects.length).padStart(2, "0")} files</span>
                </div>
                {visibleProjects.map((project) => (
                    <ProjectIndexLink
                        className="project-list-item"
                        key={`list-${project.title}`}
                        onOpenProject={onOpenProject}
                        project={project}
                    >
                        <span>{project.number}</span>
                        <strong>{project.title}</strong>
                        <small>{project.category}</small>
                        <ArrowUpRight size={17} aria-hidden="true" />
                    </ProjectIndexLink>
                ))}
            </nav>
        </div>
    );
}

export default function Projects() {
    const shouldReduceMotion = useReducedMotion();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [hashValue, setHashValue] = useState(() =>
        typeof window === "undefined" ? "" : window.location.hash,
    );
    const triggerElementRef = useRef(null);

    const query = searchParams.get("q") ?? "";
    const tag = searchParams.get("tag") ?? "";
    const visibleProjects = useMemo(
        () => filterProjects(projects, { query, tag }),
        [query, tag],
    );
    const projectTags = useMemo(
        () => Array.from(new Set(projects.map(getProjectTag))),
        [],
    );
    const queryProject = projects.find(
        (project) => project.id === searchParams.get("project"),
    );
    const hashProject = getProjectFromHash(hashValue, projects);
    const selectedProject = queryProject ?? hashProject;

    useEffect(() => {
        const handleHashChange = () => setHashValue(window.location.hash);

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const writeSearchParams = useCallback(
        (updates, { replace = true, clearProject = false } = {}) => {
            const next = new URLSearchParams(searchParams);

            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    next.set(key, value);
                } else {
                    next.delete(key);
                }
            });

            if (clearProject) {
                next.delete("project");
            }

            const nextSearch = next.toString();
            navigate(
                {
                    pathname: location.pathname,
                    search: nextSearch ? `?${nextSearch}` : "",
                    hash: "",
                },
                { replace },
            );
            setHashValue("");
        },
        [location.pathname, navigate, searchParams],
    );

    const openProject = useCallback(
        (project, triggerElement) => {
            triggerElementRef.current = triggerElement;
            const next = new URLSearchParams(searchParams);
            next.set("project", project.id);

            navigate(
                {
                    pathname: location.pathname,
                    search: `?${next.toString()}`,
                    hash: "",
                },
                { replace: false },
            );
            setHashValue("");
        },
        [location.pathname, navigate, searchParams],
    );

    const closeProject = useCallback(() => {
        const next = new URLSearchParams(searchParams);
        next.delete("project");
        const nextSearch = next.toString();

        navigate(
            {
                pathname: location.pathname,
                search: nextSearch ? `?${nextSearch}` : "",
                hash: "",
            },
            { replace: false },
        );
        setHashValue("");
    }, [location.pathname, navigate, searchParams]);

    return (
        <>
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
                        {projectProofIntro}
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

                <section
                    className="project-explorer-controls"
                    aria-labelledby="project-explorer-title"
                >
                    <div className="project-explorer-controls__intro">
                        <p className="selected-work-kicker">Interactive archive</p>
                        <h2 id="project-explorer-title">Find the right <em>thread.</em></h2>
                        <p>Search by problem, stack or project type, then open a focused overview without losing your place.</p>
                    </div>

                    <div className="project-explorer-controls__actions">
                        <label htmlFor="project-search">Search projects</label>
                        <input
                            id="project-search"
                            type="search"
                            value={query}
                            onChange={(event) => writeSearchParams(
                                { q: event.target.value },
                                { replace: true, clearProject: true },
                            )}
                            placeholder="e.g. React, ML, dashboard"
                        />
                        <div className="project-filter-group" aria-label="Filter projects by type">
                            <button
                                type="button"
                                className={`project-filter ${!tag ? "project-filter--active" : ""}`}
                                aria-pressed={!tag}
                                onClick={() => writeSearchParams(
                                    { tag: "" },
                                    { replace: false, clearProject: true },
                                )}
                            >
                                All
                            </button>
                            {projectTags.map((projectTag) => (
                                <button
                                    type="button"
                                    className={`project-filter ${tag === projectTag ? "project-filter--active" : ""}`}
                                    aria-pressed={tag === projectTag}
                                    key={projectTag}
                                    onClick={() => writeSearchParams(
                                        { tag: projectTag },
                                        { replace: false, clearProject: true },
                                    )}
                                >
                                    {projectTag}
                                </button>
                            ))}
                        </div>
                        <p className="project-explorer-results" aria-live="polite">
                            Showing {visibleProjects.length} of {projects.length} projects
                        </p>
                    </div>
                </section>

                <nav className="project-index" aria-label="Project index">
                    <div className="project-index__heading">
                        <span>Find a project</span>
                        <span>{String(visibleProjects.length).padStart(2, "0")} projects</span>
                    </div>

                    {visibleProjects.map((project) => (
                        <ProjectIndexLink
                            className="project-index__item"
                            key={`quick-${project.title}`}
                            onOpenProject={openProject}
                            project={project}
                        >
                            <span>{project.number}</span>
                            <strong>{project.title}</strong>
                            <small>{project.category}</small>
                            <ArrowUpRight size={17} aria-hidden="true" />
                        </ProjectIndexLink>
                    ))}
                </nav>

                {visibleProjects.length > 0 ? (
                    <ProjectFolderBrowser
                        visibleProjects={visibleProjects}
                        onOpenProject={openProject}
                    />
                ) : (
                    <div className="project-explorer-empty" role="status">
                        <strong>No projects match those filters.</strong>
                        <button
                            type="button"
                            onClick={() => writeSearchParams(
                                { q: "", tag: "" },
                                { replace: true, clearProject: true },
                            )}
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                <div className="project-details-heading">
                    <p className="selected-work-kicker">Project details</p>
                    <span>Open a card to view its full case study.</span>
                </div>

                <div className="case-study-list" id="project-details">
                    {visibleProjects.map((project) => (
                        <ProjectCaseStudy
                            key={project.id}
                            project={project}
                            onOpenProject={openProject}
                        />
                    ))}
                </div>
            </section>

            {selectedProject ? (
                <ProjectDetailDialog
                    project={selectedProject}
                    onClose={closeProject}
                    triggerElement={triggerElementRef.current}
                />
            ) : null}
        </>
    );
}
