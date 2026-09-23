import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Bookmark, BookmarkCheck, X } from "lucide-react";
import { createPortal } from "react-dom";

import "../styles/components/project-detail-dialog.css";
import { getProjectEvidenceSummary } from "../lib/projectEvidence";

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
}) {
    const evidence = getProjectEvidenceSummary(project);
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    const closeRef = useRef(onClose);
    const [mediaFailed, setMediaFailed] = useState(false);
    const titleId = `project-dialog-title-${useId().replace(/:/g, "")}`;
    const descriptionId = `project-dialog-description-${useId().replace(/:/g, "")}`;

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
        <div
            className="project-detail-dialog-backdrop"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    closeRef.current();
                }
            }}
        >
            <section
                id="project-detail-dialog"
                ref={dialogRef}
                className="project-detail-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <div className="project-detail-dialog__rail">
                    <span>
                        Project {project.number} / {project.category}
                    </span>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="project-detail-dialog__close"
                        onClick={() => closeRef.current()}
                        aria-label={`Close ${project.title} details`}
                    >
                        <X size={19} aria-hidden="true" />
                    </button>
                </div>

                <div className="project-detail-dialog__body">
                    <div className="project-detail-dialog__media">
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
                    </div>

                    <div className="project-detail-dialog__content">
                        <p className="selected-work-kicker">Detailed view · {project.year}</p>
                        <h2 id={titleId}>{project.title}</h2>
                        <p id={descriptionId} className="project-detail-dialog__description">
                            {project.description}
                        </p>

                        <div className="project-detail-dialog__evidence" role="note">
                            <span>Evidence level</span>
                            <strong>{evidence.label}</strong>
                            <small>{evidence.hasSource ? "Repository linked" : "No repository linked"} · {evidence.hasVisual ? "Visual included" : "Visual pending"}</small>
                        </div>

                        <div className="project-detail-dialog__outcome">
                            <span>Outcome</span>
                            <p>{project.outcome}</p>
                        </div>

                        {project.architectureNote && (
                            <div className="project-detail-dialog__outcome project-detail-dialog__architecture">
                                <span>Read this diagram</span>
                                <p>{project.architectureNote}</p>
                                {project.architectureLink && (
                                    <a className="project-detail-dialog__architecture-link" href={project.architectureLink} target="_blank" rel="noreferrer">
                                        Open architecture diagram
                                        <ArrowUpRight size={15} aria-hidden="true" />
                                    </a>
                                )}
                            </div>
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
                            {project.stack.map((technology) => (
                                <span key={technology}>{technology}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="project-detail-dialog__footer">
                    <span className="case-study-proof-status">
                        <span>Status</span>
                        {project.status}
                    </span>

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
                            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository in a new tab`}>
                                View source code
                                <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                        ) : (
                            <span className="case-study-source-note">Repository not linked</span>
                        )}
                        {project.submission ? (
                            <a href={project.submission} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} hackathon submission in a new tab`}>
                                View hackathon submission
                                <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                        ) : null}
                        <button type="button" onClick={() => closeRef.current()}>
                            Close details
                        </button>
                    </div>
                </div>
            </section>
        </div>,
        document.body,
    );
}
