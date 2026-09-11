import { useEffect, useId, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { createPortal } from "react-dom";

import "../styles/components/media-detail-dialog.css";

function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
    );
}

export default function MediaDetailDialog({
    item,
    kind,
    onClose,
    triggerElement,
    fallbackFocusSelector = "#main-content",
}) {
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    const closeRef = useRef(onClose);
    const titleId = `media-dialog-title-${useId().replace(/:/g, "")}`;
    const descriptionId = `media-dialog-description-${useId().replace(/:/g, "")}`;

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

    const isCertificate = kind === "certificate";
    const itemDescription = isCertificate
        ? `${item.organization} certificate from ${item.year}.`
        : `${item.medium} artwork from ${item.year}.`;

    return createPortal(
        <div
            className="media-detail-dialog-backdrop"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    closeRef.current();
                }
            }}
        >
            <section
                id="media-detail-dialog"
                ref={dialogRef}
                className="media-detail-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <div className="media-detail-dialog__rail">
                    <span>{isCertificate ? "Certificate record" : "Artwork study"}</span>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="media-detail-dialog__close"
                        onClick={() => closeRef.current()}
                        aria-label={`Close ${item.title} details`}
                    >
                        <X size={19} aria-hidden="true" />
                    </button>
                </div>

                <div className="media-detail-dialog__body">
                    <figure className="media-detail-dialog__media">
                        <img src={item.src} alt={item.alt ?? item.title} />
                        <figcaption>{item.title}</figcaption>
                    </figure>

                    <div className="media-detail-dialog__content">
                        <p className="section-label">{isCertificate ? item.section : "Work away from the terminal"}</p>
                        <h2 id={titleId}>{item.title}</h2>
                        <p id={descriptionId} className="media-detail-dialog__description">
                            {itemDescription}
                        </p>

                        <dl className="media-detail-dialog__facts">
                            <div>
                                <dt>{isCertificate ? "Organization" : "Medium"}</dt>
                                <dd>{isCertificate ? item.organization : item.medium}</dd>
                            </div>
                            <div>
                                <dt>Year</dt>
                                <dd>{item.year}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="media-detail-dialog__footer">
                    <span>{isCertificate ? "Image record" : "Original study"}</span>
                    <div className="media-detail-dialog__actions">
                        {item.pdf ? (
                            <a href={item.pdf} target="_blank" rel="noopener noreferrer" aria-label={`Open PDF for ${item.title} in a new tab`}>
                                Open full PDF
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
