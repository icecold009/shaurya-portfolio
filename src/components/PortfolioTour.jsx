import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { audienceLenses } from "../data/profile";
import { projects } from "../data/projects";
import { getAudienceTourStops } from "../lib/audienceLens";

import "./PortfolioTour.css";

const tourStops = getAudienceTourStops(audienceLenses, projects);

export default function PortfolioTour() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeStop, setActiveStop] = useState(0);
    const startButtonRef = useRef(null);
    const stopHeadingRef = useRef(null);
    const stop = tourStops[activeStop];

    const focusStopHeading = () => {
        window.requestAnimationFrame(() => stopHeadingRef.current?.focus());
    };

    const startTour = () => {
        setActiveStop(0);
        setIsOpen(true);
        focusStopHeading();
    };

    const closeTour = () => {
        setIsOpen(false);
        setActiveStop(0);
        window.requestAnimationFrame(() => startButtonRef.current?.focus({ preventScroll: true }));
    };

    const moveToStop = (nextStop) => {
        setActiveStop(nextStop);
        window.requestAnimationFrame(() => stopHeadingRef.current?.focus());
    };

    if (tourStops.length !== audienceLenses.length || !stop) {
        return null;
    }

    const isLastStop = activeStop === tourStops.length - 1;

    return (
        <section className="portfolio-tour" aria-labelledby="portfolio-tour-heading">
            <div className="portfolio-tour__intro">
                <div>
                    <p className="home-kicker">One minute / three perspectives</p>
                    <h3 id="portfolio-tour-heading">Take a short tour through the work.</h3>
                    <p>Three stops, about 60 seconds. Choose a project through the eyes of its audience.</p>
                </div>
                <button
                    ref={startButtonRef}
                    className="portfolio-tour__start"
                    type="button"
                    aria-controls="portfolio-tour-panel"
                    aria-expanded={isOpen}
                    onClick={startTour}
                >
                    {isOpen ? "Restart the tour" : "Take the 60-second tour"}
                    <ArrowRight size={16} aria-hidden="true" />
                </button>
            </div>

            <div id="portfolio-tour-panel" className="portfolio-tour__panel" hidden={!isOpen}>
                {isOpen && (
                    <div className="portfolio-tour__stop" data-audience={stop.lens.id}>
                        <div className="portfolio-tour__progress-row">
                            <p role="status" aria-live="polite" aria-atomic="true">
                                Stop {activeStop + 1} of {tourStops.length}: {stop.lens.label} · {stop.project.title}
                            </p>
                            <span>About 60 seconds</span>
                        </div>
                        <progress
                            className="portfolio-tour__progress"
                            max={tourStops.length}
                            value={activeStop + 1}
                            aria-label={`Tour progress: stop ${activeStop + 1} of ${tourStops.length}`}
                        />

                        <div className="portfolio-tour__story">
                            <div className="portfolio-tour__image-wrap">
                                <img
                                    className="portfolio-tour__image"
                                    src={stop.project.thumbnail}
                                    alt={stop.project.thumbnailAlt}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span className="portfolio-tour__audience">{stop.lens.label}</span>
                            </div>
                            <div className="portfolio-tour__copy">
                                <p className="portfolio-tour__eyebrow">{stop.lens.kicker}</p>
                                <h4 ref={stopHeadingRef} tabIndex={-1}>{stop.project.title}</h4>
                                <p className="portfolio-tour__summary">
                                    {stop.project.summary ?? stop.project.description}
                                </p>
                                <div className="portfolio-tour__rationale">
                                    <span>Why it matters for {stop.lens.label}</span>
                                    <p>{stop.rationale}</p>
                                </div>
                                <Link
                                    className="portfolio-tour__project-link"
                                    to={`/projects?project=${encodeURIComponent(stop.project.id)}`}
                                >
                                    Open this project <ArrowUpRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>

                        <div className="portfolio-tour__controls">
                            <button
                                className="portfolio-tour__control portfolio-tour__control--back"
                                type="button"
                                disabled={activeStop === 0}
                                onClick={() => moveToStop(Math.max(0, activeStop - 1))}
                            >
                                <ArrowLeft size={16} aria-hidden="true" /> Back
                            </button>
                            <div className="portfolio-tour__control-group">
                                <button className="portfolio-tour__control" type="button" onClick={closeTour}>
                                    Close tour
                                </button>
                                <button
                                    className="portfolio-tour__control portfolio-tour__control--next"
                                    type="button"
                                    onClick={() => {
                                        if (isLastStop) {
                                            closeTour();
                                            return;
                                        }

                                        moveToStop(Math.min(tourStops.length - 1, activeStop + 1));
                                    }}
                                >
                                    {isLastStop ? "Finish tour" : "Next stop"}
                                    {!isLastStop && <ArrowRight size={16} aria-hidden="true" />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
