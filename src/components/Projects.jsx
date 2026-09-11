import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
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

function ProjectCardPreview({ project }) {
    return (
        <span className="case-study-toggle__preview" aria-hidden="true">
            {project.thumbnail ? (
                <img
                    className={project.thumbnailFit === "contain" ? "case-study-toggle__preview-image--contain" : undefined}
                    src={project.thumbnail}
                    alt=""
                    loading={project.number === "01" ? "eager" : "lazy"}
                    decoding="async"
                />
            ) : (
                <span className="case-study-toggle__preview-fallback">
                    <strong>{project.number}</strong>
                    <small>Archive record</small>
                </span>
            )}
        </span>
    );
}

function ProjectCaseStudy({ project, onOpenProject, isOpen }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.article
            id={`project-detail-${project.number}`}
            className={`case-study case-study-${project.accent}`}
            variants={shouldReduceMotion ? undefined : REVEAL}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.08 }}
        >
            <button
                type="button"
                className={`case-study-toggle${isOpen ? " case-study-toggle--open" : ""}`}
                onClick={(event) => onOpenProject(project, event.currentTarget)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls={isOpen ? "project-detail-dialog" : undefined}
            >
                <ProjectCardPreview project={project} />

                <span className="case-study-toggle__main">
                    <span className="case-study-toggle__meta">
                        <span>{project.number}</span>
                        <span>{project.year}</span>
                        <span>{project.category}</span>
                    </span>
                    <span className="case-study-toggle__title-row">
                        <h2 className="case-study-toggle__title">{project.title}</h2>
                        <span className="case-study-toggle__action">
                            View details
                            <ArrowUpRight size={15} aria-hidden="true" />
                        </span>
                    </span>
                    <span className="case-study-toggle__lede">
                        {project.summary ?? project.description}
                    </span>
                    <span className="case-study-toggle__status">{project.status}</span>
                </span>
            </button>
        </motion.article>
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

    useEffect(() => {
        if (!selectedProject) {
            triggerElementRef.current = null;
        }
    }, [selectedProject]);

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
                    variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                    initial={shouldReduceMotion ? undefined : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={REVEAL_VIEWPORT}
                >
                    <motion.p
                        className="selected-work-kicker"
                        variants={shouldReduceMotion ? undefined : REVEAL}
                    >
                        Selected work · 2025–2026
                    </motion.p>

                    <motion.h1
                        id="selected-work-title"
                        tabIndex={-1}
                        variants={shouldReduceMotion ? undefined : REVEAL}
                    >
                        Projects,
                        <span> explored in depth.</span>
                    </motion.h1>

                    <motion.p
                        className="selected-work-intro"
                        variants={shouldReduceMotion ? undefined : REVEAL}
                    >
                        {projectProofIntro}
                    </motion.p>

                    <motion.a
                        className="selected-work-primary"
                        href="#project-details"
                        variants={shouldReduceMotion ? undefined : REVEAL}
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
                        <p className="selected-work-kicker">Project archive</p>
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

                <div className="project-details-heading">
                    <div>
                        <p className="selected-work-kicker">Project details</p>
                        <h2>Open a project to see the full case study.</h2>
                    </div>
                    <span>{String(visibleProjects.length).padStart(2, "0")} results</span>
                </div>

                {visibleProjects.length > 0 ? (
                    <div className="case-study-list" id="project-details">
                        {visibleProjects.map((project) => (
                            <ProjectCaseStudy
                                key={project.id}
                                project={project}
                                onOpenProject={openProject}
                                isOpen={selectedProject?.id === project.id}
                            />
                        ))}
                    </div>
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
            </section>

            {selectedProject ? (
                <ProjectDetailDialog
                    project={selectedProject}
                    onClose={closeProject}
                    triggerElement={triggerElementRef.current}
                    fallbackFocusSelector="#selected-work-title"
                />
            ) : null}
        </>
    );
}
