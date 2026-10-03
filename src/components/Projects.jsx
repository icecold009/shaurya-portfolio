import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, ArrowRight, ArrowUpRight, Bookmark, BookmarkCheck, Search } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
    EDITORIAL_DURATION,
    EDITORIAL_EASE,
    PRESS,
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
import ProjectComparison from "./ProjectComparison";
import ProjectDetailDialog from "./ProjectDetailDialog";
import ProjectFinder from "./ProjectFinder";
import ProjectTechnologyTag from "./ProjectTechnologyTag";

function getPortfolioStorage() {
    try {
        return typeof window === "undefined" ? null : window.localStorage;
    } catch {
        return null;
    }
}

function ProjectCardPreview({ project, layoutEnabled }) {
    const [imageFailed, setImageFailed] = useState(false);
    const hasThumbnail = project.thumbnail && !imageFailed;
    const sharedLayoutId = layoutEnabled ? `project-cover-${project.id}` : undefined;

    return (
        <motion.span
            className="project-card__preview"
            aria-hidden="true"
            layoutId={sharedLayoutId}
            transition={layoutEnabled ? {
                layout: { duration: EDITORIAL_DURATION.normal, ease: EDITORIAL_EASE },
            } : undefined}
        >
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
        </motion.span>
    );
}

function getProjectVisualLabel(project) {
    if (!project.thumbnail) {
        return "Archive record";
    }

    if (project.thumbnailKind === "editorial") {
        return "Original cover art";
    }

    if (project.thumbnailKind === "research") {
        return "Research visual";
    }

    if (project.thumbnailKind === "brand") {
        return "Project mark";
    }

    return "Product screen";
}

function ProjectCaseStudy({ project, onOpenProject, isOpen, isSaved, onToggleSave, sharedTransition }) {
    const shouldReduceMotion = useReducedMotion();
    const pressFeedback = shouldReduceMotion ? undefined : PRESS;
    const layoutEnabled = !shouldReduceMotion && (!isOpen || sharedTransition);

    return (
        <motion.article
            id={`project-detail-${project.number}`}
            className={`case-study case-study-${project.accent}${project.number === "01" ? " case-study--featured" : ""}`}
            layout={shouldReduceMotion ? false : "position"}
            transition={shouldReduceMotion ? undefined : {
                layout: { duration: EDITORIAL_DURATION.normal, ease: EDITORIAL_EASE },
            }}
            variants={shouldReduceMotion ? undefined : REVEAL}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.08 }}
        >
            <div className={`project-card-shell${isOpen ? " project-card-shell--open" : ""}`}>
                <motion.button
                    type="button"
                    className={`project-card__open${isOpen ? " project-card__open--active" : ""}`}
                    whileTap={pressFeedback}
                    onClick={(event) => onOpenProject(project, event.currentTarget)}
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? "project-detail-dialog" : undefined}
                    aria-label={`Open ${project.title} project details`}
                >
                    <span className="project-card__visual">
                        <ProjectCardPreview project={project} layoutEnabled={layoutEnabled} />
                        <span className="project-card__visual-meta" aria-hidden="true">
                            <span>{project.number}</span>
                            <span>{project.year}</span>
                        </span>
                        <span className="project-card__visual-label" aria-hidden="true">
                            {project.number === "01" ? "Featured project" : getProjectVisualLabel(project)}
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
                            <span className="project-card__stack" aria-label={`${project.title} technology stack: ${project.stack.join(", ")}`}>
                                {project.stack.slice(0, 3).map((technology) => (
                                    <ProjectTechnologyTag key={technology} technology={technology} compact />
                                ))}
                                {project.stack.length > 3 ? (
                                    <span className="project-card__stack-more" aria-hidden="true">
                                        +{project.stack.length - 3}
                                    </span>
                                ) : null}
                            </span>
                        </span>
                    </span>
                </motion.button>
                <div className="project-card__utilities">
                    <div className="project-card__links">
                        {project.github ? (
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                Source code <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        ) : (
                            <span>Source link pending</span>
                        )}
                        {project.submission ? (
                            <a href={project.submission} target="_blank" rel="noopener noreferrer">
                                Submission <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                        ) : null}
                    </div>
                    <motion.button
                        type="button"
                        className={`project-card__save${isSaved ? " project-card__save--active" : ""}`}
                        whileTap={pressFeedback}
                        onClick={() => onToggleSave(project.id)}
                        aria-pressed={isSaved}
                        aria-label={isSaved ? `Remove ${project.title} from reading list` : `Save ${project.title} to reading list`}
                        title={isSaved ? "Remove from reading list" : "Save to reading list"}
                    >
                        {isSaved ? <BookmarkCheck size={16} aria-hidden="true" /> : <Bookmark size={16} aria-hidden="true" />}
                        <span>{isSaved ? "Saved" : "Save"}</span>
                    </motion.button>
                </div>
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
    const [comparisonOpen, setComparisonOpen] = useState(false);
    const [hashValue, setHashValue] = useState(() =>
        typeof window === "undefined" ? "" : window.location.hash,
    );
    const triggerElementRef = useRef(null);
    const triggerProjectIdRef = useRef(null);

    const query = searchParams.get("q") ?? "";
    const tag = searchParams.get("tag") ?? "";
    const savedOnly = searchParams.get("saved") === "1";
    const canCompareProjects = shortlistIds.length >= 2;
    const showComparison = canCompareProjects && comparisonOpen;
    const pressFeedback = shouldReduceMotion ? undefined : PRESS;
    const visibleProjects = useMemo(
        () => filterProjects(projects, { query, tag }).filter((project) => !savedOnly || shortlistIds.includes(project.id)),
        [query, savedOnly, shortlistIds, tag],
    );
    const isFiltered = Boolean(query || tag || savedOnly);
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
        if (!canCompareProjects) {
            setComparisonOpen(false);
        }
    }, [canCompareProjects]);

    useEffect(() => {
        const handleHashChange = () => setHashValue(window.location.hash);

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    useEffect(() => {
        if (!selectedProject || triggerProjectIdRef.current !== selectedProject.id) {
            triggerElementRef.current = null;
            triggerProjectIdRef.current = null;
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
            triggerProjectIdRef.current = project.id;
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

                <ProjectFinder projects={projects} onOpenProject={openProject} />

                <section className="project-archive-tools" aria-labelledby="project-archive-title">
                    <div className="project-archive-tools__heading">
                        <div>
                            <p className="selected-work-kicker">Project archive</p>
                            <h2 id="project-archive-title">Find the work that <em>fits.</em></h2>
                        </div>
                        <label className="project-search">
                            <Search size={18} aria-hidden="true" />
                            <span>Search projects</span>
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => writeSearchParams(
                                    { q: event.currentTarget.value },
                                    { replace: true, clearProject: true },
                                )}
                                placeholder="Name, technology, or topic"
                                aria-label="Search projects by name, technology, or topic"
                                aria-controls="project-cards"
                            />
                        </label>
                    </div>

                    <div className="project-archive-tools__filters">
                        <div className="project-filter-chips" role="group" aria-label="Filter projects by area">
                            <motion.button
                                type="button"
                                className={`project-filter-chip${!tag && !savedOnly ? " project-filter-chip--active" : ""}`}
                                whileTap={pressFeedback}
                                aria-pressed={!tag && !savedOnly}
                                onClick={() => writeSearchParams(
                                    { tag: "", saved: "" },
                                    { replace: false, clearProject: true },
                                )}
                            >
                                <span>All projects</span>
                                <small>{projects.length}</small>
                            </motion.button>
                            {projectTagCounts.map(({ tag: projectTag, count }) => (
                                <motion.button
                                    type="button"
                                    className={`project-filter-chip${tag === projectTag ? " project-filter-chip--active" : ""}`}
                                    whileTap={pressFeedback}
                                    aria-pressed={tag === projectTag}
                                    key={projectTag}
                                    onClick={() => writeSearchParams(
                                        { tag: projectTag, saved: "" },
                                        { replace: false, clearProject: true },
                                    )}
                                >
                                    <span>{projectTag}</span>
                                    <small>{count}</small>
                                </motion.button>
                            ))}
                        </div>
                        <motion.button
                            type="button"
                            className={`project-filter-chip project-filter-chip--saved${savedOnly ? " project-filter-chip--active" : ""}`}
                            whileTap={pressFeedback}
                            aria-pressed={savedOnly}
                            onClick={() => writeSearchParams(
                                { tag: "", saved: savedOnly ? "" : "1" },
                                { replace: false, clearProject: true },
                            )}
                        >
                            <Bookmark size={15} aria-hidden="true" />
                            <span>Reading list</span>
                            <small>{shortlistIds.length}</small>
                        </motion.button>
                        <div className="project-comparison-toggle">
                            <motion.button
                                type="button"
                                className={`project-filter-chip project-comparison-toggle__button${showComparison ? " project-filter-chip--active" : ""}`}
                                whileTap={pressFeedback}
                                disabled={!canCompareProjects}
                                aria-expanded={showComparison}
                                aria-controls="project-comparison"
                                onClick={() => setComparisonOpen((open) => !open)}
                            >
                                <ArrowLeftRight size={15} aria-hidden="true" />
                                <span>{showComparison ? "Close comparison" : "Compare saved projects"}</span>
                                <small>{shortlistIds.length}</small>
                            </motion.button>
                            {!canCompareProjects ? (
                                <p>Save two projects to compare their recorded details.</p>
                            ) : null}
                        </div>
                    </div>

                    <div className="project-archive-tools__status">
                        <p className="project-explorer-results" aria-live="polite">
                            {isFiltered
                                ? `${visibleProjects.length} matching ${visibleProjects.length === 1 ? "project" : "projects"}${savedOnly ? " in your reading list" : ""}`
                                : `${projects.length} projects in the archive`}
                        </p>
                        {isFiltered ? (
                            <motion.button
                                type="button"
                                className="project-filter-clear"
                                whileTap={pressFeedback}
                                onClick={() => writeSearchParams(
                                    { q: "", tag: "", saved: "" },
                                    { replace: false, clearProject: true },
                                )}
                            >
                                Clear filters
                            </motion.button>
                        ) : null}
                    </div>
                    <ProjectComparison
                        isOpen={showComparison}
                        shortlistIds={shortlistIds}
                        projectRecords={projects}
                    />
                </section>

                <div className="project-details-heading" id="project-details" tabIndex={-1}>
                    <div>
                        <p className="selected-work-kicker">Project details</p>
                        <h2>Choose a project to see the details.</h2>
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
                                sharedTransition={triggerProjectIdRef.current === project.id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="project-explorer-empty" role="status">
                        <strong>No projects match those filters.</strong>
                        <motion.button
                            type="button"
                            onClick={() => writeSearchParams(
                                { q: "", tag: "", saved: "" },
                                { replace: true, clearProject: true },
                            )}
                            whileTap={pressFeedback}
                        >
                            Clear filters
                        </motion.button>
                    </div>
                )}
            </section>

            <AnimatePresence>
                {selectedProject ? (
                    <ProjectDetailDialog
                        key={selectedProject.id}
                        project={selectedProject}
                        onClose={closeProject}
                        triggerElement={triggerElementRef.current}
                        fallbackFocusSelector="#selected-work-title"
                        isSaved={shortlistIds.includes(selectedProject.id)}
                        onToggleSave={toggleShortlist}
                        sharedTransition={triggerProjectIdRef.current === selectedProject.id}
                    />
                ) : null}
            </AnimatePresence>
        </>
    );
}
