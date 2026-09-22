import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react";
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
import { getProjectProofLabel } from "../lib/projectEvidence";
import {
    readProjectShortlist,
    toggleProjectShortlist,
    writeProjectShortlist,
} from "../lib/projectShortlist";

import "./Projects.css";
import { projectProofIntro, projects } from "../data/projects";
import ProjectDetailDialog from "./ProjectDetailDialog";

function getPortfolioStorage() {
    try {
        return typeof window === "undefined" ? null : window.localStorage;
    } catch {
        return null;
    }
}

function ProjectCardPreview({ project }) {
    const [imageFailed, setImageFailed] = useState(false);
    const hasThumbnail = project.thumbnail && !imageFailed;

    return (
        <span className="project-card__preview" aria-hidden="true">
            {hasThumbnail ? (
                <img
                    className={project.thumbnailFit === "contain" ? "project-card__preview-image--contain" : undefined}
                    src={project.thumbnail}
                    alt=""
                    loading={project.number === "01" ? "eager" : "lazy"}
                    decoding="async"
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <span className="project-card__preview-fallback">
                    <strong>{project.number}</strong>
                    <small>{project.thumbnail ? "Cover unavailable" : "Archive record"}</small>
                </span>
            )}
        </span>
    );
}

function ProjectCaseStudy({ project, onOpenProject, isOpen, isSaved, onToggleSave }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.article
            id={`project-detail-${project.number}`}
            className={`case-study case-study-${project.accent}${project.number === "01" ? " case-study--featured" : ""}`}
            variants={shouldReduceMotion ? undefined : REVEAL}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.08 }}
        >
            <div className="project-card-shell">
                <button
                    type="button"
                    className={`project-card${isOpen ? " project-card--open" : ""}`}
                    onClick={(event) => onOpenProject(project, event.currentTarget)}
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? "project-detail-dialog" : undefined}
                >
                    <span className="project-card__visual">
                        <ProjectCardPreview project={project} />
                        <span className="project-card__visual-meta" aria-hidden="true">
                            <span>{project.number}</span>
                            <span>{project.year}</span>
                        </span>
                        <span className="project-card__visual-label" aria-hidden="true">
                            {project.number === "01" ? "Featured study" : getProjectTag(project)}
                        </span>
                    </span>

                    <span className="project-card__main">
                        <span className="project-card__meta">
                            <span className="project-card__category">{project.category}</span>
                        </span>
                        <span className="project-card__title-row">
                            <h2 className="project-card__title">{project.title}</h2>
                            <span className="project-card__action">
                                View details
                                <ArrowUpRight size={15} aria-hidden="true" />
                            </span>
                        </span>
                        <span className="project-card__lede">
                            {project.summary ?? project.description}
                        </span>
                        <span className="project-card__footer">
                            <span className="project-card__status">{getProjectProofLabel(project)}</span>
                            <span className="project-card__stack" aria-label={`${project.title} technology stack`}>
                                {project.stack.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}
                                {project.stack.length > 3 ? <span>+{project.stack.length - 3}</span> : null}
                            </span>
                        </span>
                    </span>
                </button>
                <button
                    type="button"
                    className={`project-card__save${isSaved ? " project-card__save--active" : ""}`}
                    onClick={() => onToggleSave(project.id)}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? `Remove ${project.title} from reading list` : `Save ${project.title} to reading list`}
                    title={isSaved ? "Remove from reading list" : "Save to reading list"}
                >
                    {isSaved ? <BookmarkCheck size={16} aria-hidden="true" /> : <Bookmark size={16} aria-hidden="true" />}
                    <span>{isSaved ? "Saved" : "Save"}</span>
                </button>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    const shouldReduceMotion = useReducedMotion();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [shortlistIds, setShortlistIds] = useState(() => (
        readProjectShortlist(getPortfolioStorage(), projects)
    ));
    const [hashValue, setHashValue] = useState(() =>
        typeof window === "undefined" ? "" : window.location.hash,
    );
    const triggerElementRef = useRef(null);

    const tag = searchParams.get("tag") ?? "";
    const savedOnly = searchParams.get("saved") === "1";
    const visibleProjects = useMemo(
        () => filterProjects(projects, { tag }).filter((project) => !savedOnly || shortlistIds.includes(project.id)),
        [savedOnly, shortlistIds, tag],
    );
    const isFiltered = Boolean(tag || savedOnly);
    const projectTags = useMemo(
        () => Array.from(new Set(projects.map(getProjectTag))),
        [],
    );
    const projectTagCounts = useMemo(
        () => projectTags.map((projectTag) => ({
            tag: projectTag,
            count: projects.filter((project) => getProjectTag(project) === projectTag).length,
        })),
        [projectTags],
    );
    const linkedProjectCount = projects.filter((project) => project.github).length;
    const categoryCount = new Set(projects.map(getProjectTag)).size;
    const queryProject = projects.find(
        (project) => project.id === searchParams.get("project"),
    );
    const hashProject = getProjectFromHash(hashValue, projects);
    const selectedProject = queryProject ?? hashProject;

    useEffect(() => {
        writeProjectShortlist(getPortfolioStorage(), shortlistIds, projects);
    }, [shortlistIds]);

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

    const toggleShortlist = useCallback((projectId) => {
        setShortlistIds((currentIds) => toggleProjectShortlist(currentIds, projectId));
    }, []);

    return (
        <>
            <section
                className="selected-work"
                id="selected-work"
                aria-labelledby="selected-work-title"
            >
                <motion.header
                    className="selected-work-header"
                    variants={shouldReduceMotion ? undefined : REVEAL_CONTAINER}
                    initial={shouldReduceMotion ? undefined : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={REVEAL_VIEWPORT}
                >
                    <div className="selected-work-header__copy">
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
                    </div>

                    <div className="selected-work-header__aside">
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

                        <div className="selected-work-facts" aria-label="Project archive overview">
                            <div>
                                <strong>{String(projects.length).padStart(2, "0")}</strong>
                                <span>Projects</span>
                            </div>
                            <div>
                                <strong>{String(linkedProjectCount).padStart(2, "0")}</strong>
                                <span>Source linked</span>
                            </div>
                            <div>
                                <strong>{String(categoryCount).padStart(2, "0")}</strong>
                                <span>Project lenses</span>
                            </div>
                        </div>
                    </div>
                </motion.header>

                <section
                    className="project-lens-browser"
                    aria-labelledby="project-lens-title"
                >
                    <div className="project-lens-browser__intro">
                        <p className="selected-work-kicker">Project archive</p>
                        <h2 id="project-lens-title">Follow a <em>signal.</em></h2>
                        <p>Choose a floating lens to move through the archive by discipline, not by noise.</p>
                    </div>

                    <div className="project-lens-grid" role="group" aria-label="Filter projects by type">
                        <button
                            type="button"
                            className={`project-lens ${!tag && !savedOnly ? "project-lens--active" : ""}`}
                            aria-pressed={!tag && !savedOnly}
                            onClick={() => writeSearchParams(
                                { q: "", tag: "", saved: "" },
                                { replace: false, clearProject: true },
                            )}
                        >
                            <span className="project-lens__index">00</span>
                            <span className="project-lens__body">
                                <strong>All projects</strong>
                                <small>{projects.length} projects</small>
                            </span>
                            <ArrowUpRight size={17} aria-hidden="true" />
                        </button>
                        {projectTagCounts.map(({ tag: projectTag, count }, index) => (
                            <button
                                type="button"
                                className={`project-lens ${tag === projectTag ? "project-lens--active" : ""}`}
                                aria-pressed={tag === projectTag}
                                key={projectTag}
                                onClick={() => writeSearchParams(
                                    { q: "", tag: projectTag, saved: "" },
                                    { replace: false, clearProject: true },
                                )}
                            >
                                <span className="project-lens__index">{String(index + 1).padStart(2, "0")}</span>
                                <span className="project-lens__body">
                                    <strong>{projectTag}</strong>
                                    <small>{count} {count === 1 ? "project" : "projects"}</small>
                                </span>
                                <ArrowUpRight size={17} aria-hidden="true" />
                            </button>
                        ))}
                        <button
                            type="button"
                            className={`project-lens project-lens--saved ${savedOnly ? "project-lens--active" : ""}`}
                            aria-pressed={savedOnly}
                            onClick={() => writeSearchParams(
                                { q: "", tag: "", saved: savedOnly ? "" : "1" },
                                { replace: false, clearProject: true },
                            )}
                        >
                            <span className="project-lens__index"><Bookmark size={15} aria-hidden="true" /></span>
                            <span className="project-lens__body">
                                <strong>Reading list</strong>
                                <small>{shortlistIds.length} saved</small>
                            </span>
                            <ArrowUpRight size={17} aria-hidden="true" />
                        </button>
                    </div>

                    <p className="project-explorer-results" aria-live="polite">
                        {isFiltered
                            ? `Showing ${visibleProjects.length} matching projects${savedOnly ? " in your reading list" : ""}`
                            : `${projects.length} projects in the archive`}
                    </p>
                </section>

                <div className="project-details-heading" id="project-details" tabIndex={-1}>
                    <div>
                        <p className="selected-work-kicker">Project details</p>
                        <h2>Open a project to see the full case study.</h2>
                    </div>
                    <span>{String(visibleProjects.length).padStart(2, "0")} results</span>
                </div>

                {visibleProjects.length > 0 ? (
                    <div className="case-study-list" id="project-cards">
                        {visibleProjects.map((project) => (
                            <ProjectCaseStudy
                                key={project.id}
                                project={project}
                                onOpenProject={openProject}
                                isOpen={selectedProject?.id === project.id}
                                isSaved={shortlistIds.includes(project.id)}
                                onToggleSave={toggleShortlist}
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
                    key={selectedProject.id}
                    project={selectedProject}
                    onClose={closeProject}
                    triggerElement={triggerElementRef.current}
                    fallbackFocusSelector="#selected-work-title"
                    isSaved={shortlistIds.includes(selectedProject.id)}
                    onToggleSave={toggleShortlist}
                />
            ) : null}
        </>
    );
}
