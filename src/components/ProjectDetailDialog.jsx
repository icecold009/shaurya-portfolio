import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bookmark, BookmarkCheck, X } from "lucide-react";
import { createPortal } from "react-dom";

import "../styles/components/project-detail-dialog.css";
import { EDITORIAL_DURATION, EDITORIAL_EASE, PRESS } from "../lib/motion";
import { getProjectEvidenceSummary } from "../lib/projectEvidence";
import AudioSignalExplorer from "./AudioSignalExplorer";
import ProjectTechnologyTag from "./ProjectTechnologyTag";
import ProjectStory from "./ProjectStory";

function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])"
        )
    );
}

export default function ProjectDetailDialog({
    project,
    onClose,
    triggerElement,
    fallbackFocusSelector = "#main-content",
    isSaved = false,
    onToggleSave,
    sharedTransition = false,
}) {
    const evidence = getProjectEvidenceSummary(project);
    const shouldReduceMotion = useReducedMotion();
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    const closeRef = useRef(onClose);
    const [mediaFailed, setMediaFailed] = useState(false);
    const titleId = `project-dialog-title-${useId().replace(/:/g, "")}`;
    const descriptionId = `project-dialog-description-${useId().replace(/:/g, "")}`;
    const pressFeedback = shouldReduceMotion ? undefined : PRESS;
    const sharedLayoutId = sharedTransition && !shouldReduceMotion
        ? `project-cover-${project.id}`
        : undefined;
    const dialogTransition = {
        duration: shouldReduceMotion ? EDITORIAL_DURATION.fast : EDITORIAL_DURATION.popover,
        ease: EDITORIAL_EASE,
    };
    const dialogInitial = shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, transform: "translateY(0.75rem) scale(0.985)" };
    const dialogExit = shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, transform: "translateY(0.45rem) scale(0.99)" };

    closeRef.current = onClose;

    useEffect(() => {
        const previousActiveElement = triggerElement instanceof HTMLElement
            ? triggerElement
            : document.activeElement instanceof HTMLElement
                && document.activeElement !== document.body
                && document.activeElement.matches("a[href], button, input, textarea, select, [tabindex]:not([tabindex='-1'])")
                ? document.activeElement
                : null;
        const previousOverflow = document.body.style.overflow;
        const previousPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const focusFrame = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeRef.current();
                return;
            }

            if (event.key !== "Tab" || !dialogRef.current) {
                return;
            }

            const focusableElements = getFocusableElements(dialogRef.current);
            if (!focusableElements.length) {
                event.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;

            if (previousActiveElement instanceof HTMLElement && previousActiveElement.isConnected) {
                previousActiveElement.focus();
                return;
            }

            const fallback = document.querySelector(fallbackFocusSelector)
                ?? document.getElementById("main-content");
            fallback?.focus({ preventScroll: true });
        };
    }, [fallbackFocusSelector, triggerElement]);

    return createPortal(
        <motion.div
            className="project-detail-dialog-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={dialogTransition}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    closeRef.current();
                }
            }}
        >
            <motion.section
                id="project-detail-dialog"
                ref={dialogRef}
                className="project-detail-dialog"
                initial={dialogInitial}
                animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
                exit={dialogExit}
                transition={dialogTransition}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <div className="project-detail-dialog__rail">
                    <span className="project-detail-dialog__identity">
                        <strong>{project.number}</strong>
                        <span>Project archive / {project.category}</span>
                    </span>
                    <motion.button
                        ref={closeButtonRef}
                        type="button"
                        className="project-detail-dialog__close"
                        whileTap={pressFeedback}
                        onClick={() => closeRef.current()}
                        aria-label={`Close ${project.title} details`}
                    >
                        <X size={19} aria-hidden="true" />
                    </motion.button>
                </div>

                <div className="project-detail-dialog__body">
                    <div className="project-detail-dialog__hero">
                        <motion.div
                            className="project-detail-dialog__media"
                            layoutId={sharedLayoutId}
                            transition={shouldReduceMotion ? undefined : {
                                layout: { duration: EDITORIAL_DURATION.normal, ease: EDITORIAL_EASE },
                            }}
                        >
                            {project.thumbnail && !mediaFailed ? (
                                <img
                                    src={project.thumbnail}
                                    alt={project.thumbnailAlt ?? `${project.title} project preview`}
                                    onError={() => setMediaFailed(true)}
                                />
                            ) : (
                                <span className="project-detail-dialog__media-fallback" aria-hidden="true">
                                    <strong>{project.number}</strong>
                                    <small>{project.thumbnail ? "Cover unavailable" : "Archive record"}</small>
                                </span>
                            )}
                        </motion.div>

                        <div className="project-detail-dialog__content">
                            <p className="selected-work-kicker">Detailed view · {project.year}</p>
                            <h2 id={titleId}>{project.title}</h2>
                            <p id={descriptionId} className="project-detail-dialog__description">
                                {project.description}
                            </p>

                            <div className="project-detail-dialog__evidence" role="note">
                                <div className="project-detail-dialog__evidence-level">
                                    <span>Evidence level</span>
                                    <strong>{evidence.label}</strong>
                                </div>
                                <div className="project-detail-dialog__evidence-meta">
                                    <small>{evidence.hasSource ? "Repository linked" : "No repository linked"} · {evidence.hasVisual ? "Visual included" : "Visual pending"}</small>
                                    <span className="case-study-proof-status">
                                        <span>Status</span>
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {project.id === "audio-recognition" ? <AudioSignalExplorer /> : null}
                    {project.id === "touchscreen-launchpad" ? <ProjectStory project={project} /> : null}

                    <div className="project-detail-dialog__details">
                        <section className="project-detail-dialog__outcome">
                            <h3>Outcome</h3>
                            <p>{project.outcome}</p>
                        </section>

                        {project.architectureNote && (
                            <section className="project-detail-dialog__architecture">
                                <div>
                                    <h3>Read this diagram</h3>
                                    <p>{project.architectureNote}</p>
                                </div>
                                {project.architectureLink && (
                                    <a className="project-detail-dialog__architecture-link" href={project.architectureLink} target="_blank" rel="noreferrer">
                                        Open architecture diagram
                                        <ArrowUpRight size={15} aria-hidden="true" />
                                    </a>
                                )}
                            </section>
                        )}

                        <dl className="project-detail-dialog__facts">
                            <div>
                                <dt>What I built</dt>
                                <dd>{project.contribution}</dd>
                            </div>
                            <div>
                                <dt>Key decision</dt>
                                <dd>{project.decisions}</dd>
                            </div>
                            <div>
                                <dt>Limitations</dt>
                                <dd>{project.limitations}</dd>
                            </div>
                        </dl>

                        <div className="project-detail-dialog__stack" aria-label="Technology stack">
                            <span className="project-detail-dialog__stack-label" aria-hidden="true">Technology stack</span>
                            {project.stack.map((technology) => (
                                <ProjectTechnologyTag key={technology} technology={technology} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="project-detail-dialog__footer">
                    <div className="project-detail-dialog__actions">
                        {onToggleSave ? (
                            <button
                                type="button"
                                className="project-detail-dialog__save"
                                onClick={() => onToggleSave(project.id)}
                                aria-pressed={isSaved}
                            >
                                {isSaved ? <BookmarkCheck size={16} aria-hidden="true" /> : <Bookmark size={16} aria-hidden="true" />}
                                {isSaved ? "Saved to reading list" : "Save to reading list"}
                            </button>
                        ) : null}
                        {project.github ? (
                            <a className="project-detail-dialog__source-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository in a new tab`}>
                                View source code
                                <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                        ) : (
                            <span className="case-study-source-note">Repository not linked</span>
                        )}
                        {project.submission ? (
                            <a className="project-detail-dialog__submission-link" href={project.submission} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} hackathon submission in a new tab`}>
                                View hackathon submission
                                <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                        ) : null}
                        <button type="button" onClick={() => closeRef.current()}>
                            Close details
                        </button>
                    </div>
                </div>
            </motion.section>
        </motion.div>,
        document.body,
    );
}
