import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
    getInteractionTransition,
    INTERACTION_OFFSET,
    shouldAnimatePointerInteraction,
} from "../lib/motion";

import "./ProjectStory.css";

const SYSTEM_COMPONENTS = [
    {
        id: "surface",
        name: "16-pad surface",
        purpose: "A responsive 4 × 4 interface accepts touch, mouse, and keyboard input.",
        boundary: "Physical touchscreen behavior still needs separate device evidence.",
    },
    {
        id: "input",
        name: "Input adapter",
        purpose: "Pointer, keyboard, and other input are normalized into pad actions.",
        boundary: "All input still feeds a browser-only runtime.",
    },
    {
        id: "audio",
        name: "Audio and samples",
        purpose: "Web Audio handles playback for local samples and preview tones.",
        boundary: "Codec support and audio timing depend on the browser.",
    },
    {
        id: "stores",
        name: "Browser stores",
        purpose: "IndexedDB keeps sample blobs and kit records; localStorage tracks the active layout.",
        boundary: "Persistence stays in the current browser profile and device, without cross-device sync.",
    },
    {
        id: "offline",
        name: "Offline shell",
        purpose: "A service worker caches the application shell for offline navigation.",
        boundary: "The offline shell does not provide cloud storage or cross-device sync.",
    },
];

function getStorySteps(project) {
    return [
        {
            label: "Problem",
            heading: "Make the instrument feel immediate.",
            body: project.problem,
        },
        {
            label: "Input",
            heading: "A 16-pad surface starts the audio path.",
            body: project.contribution,
        },
        {
            label: "System",
            heading: "Keep layout, kit records, and audio separate.",
            body: project.decisions,
        },
        {
            label: "Output",
            heading: "Reload and play on the same device.",
            body: project.outcome,
        },
        {
            label: "Lessons",
            heading: "Local-first still has clear boundaries.",
            body: project.limitations,
        },
    ];
}

export default function ProjectStory({ project }) {
    const shouldReduceMotion = useReducedMotion();
    const storySteps = getStorySteps(project);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeComponentId, setActiveComponentId] = useState(SYSTEM_COMPONENTS[0].id);
    const [animateStoryChange, setAnimateStoryChange] = useState(false);
    const [animateArchitectureChange, setAnimateArchitectureChange] = useState(false);
    const [animateComponentChange, setAnimateComponentChange] = useState(false);
    const panelId = `project-story-panel-${useId().replace(/:/g, "")}`;
    const activeStep = storySteps[activeIndex];
    const isSystemStage = activeIndex === 2;
    const activeComponent = SYSTEM_COMPONENTS.find((component) => component.id === activeComponentId)
        ?? SYSTEM_COMPONENTS[0];

    return (
        <section className="project-story" aria-labelledby="project-story-title">
            <div className="project-story__heading">
                <p className="selected-work-kicker">Interactive project story</p>
                <h3 id="project-story-title">Follow the idea from problem to lesson.</h3>
            </div>

            <div className="project-story__steps" role="group" aria-label="Choose a project story stage">
                {storySteps.map((step, index) => (
                    <button
                        key={step.label}
                        type="button"
                        className={`project-story__step${index === activeIndex ? " project-story__step--active" : ""}`}
                        aria-pressed={index === activeIndex}
                        aria-controls={panelId}
                        onClick={(event) => {
                            setAnimateStoryChange(shouldAnimatePointerInteraction(event, shouldReduceMotion));
                            setAnimateArchitectureChange(shouldAnimatePointerInteraction(event, shouldReduceMotion));
                            setActiveIndex(index);
                        }}
                    >
                        <span className="project-story__step-number">{String(index + 1).padStart(2, "0")}</span>
                        <span>{step.label}</span>
                    </button>
                ))}
            </div>

            <div className="project-story__panel" id={panelId} aria-live="polite" aria-atomic="true">
                <motion.div
                    key={activeIndex}
                    className="project-story__panel-content"
                    initial={animateStoryChange ? {
                        opacity: 0,
                        transform: `translateY(${INTERACTION_OFFSET}px)`,
                    } : false}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={getInteractionTransition(animateStoryChange)}
                >
                    <span className="project-story__panel-number">{String(activeIndex + 1).padStart(2, "0")}</span>
                    <div>
                        <h4>{activeStep.heading}</h4>
                        <p>{activeStep.body}</p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="project-story__map-wrap"
                aria-hidden={!isSystemStage}
                inert={isSystemStage ? undefined : ""}
                initial={false}
                animate={isSystemStage
                    ? { height: "auto", opacity: 1, marginTop: 0 }
                    : { height: 0, opacity: 0, marginTop: "-1rem" }}
                transition={getInteractionTransition(animateArchitectureChange)}
            >
                <div className="project-story__map">
                    <div className="project-story__map-heading">
                        <h4>Inspect a system component</h4>
                        <p>Select a node to see its role and a documented boundary.</p>
                    </div>
                    <div className="project-story__components" role="group" aria-label="Touchscreen Launchpad architecture components">
                        {SYSTEM_COMPONENTS.map((component, index) => (
                            <button
                                key={component.id}
                                type="button"
                                className={`project-story__component${component.id === activeComponentId ? " project-story__component--active" : ""}`}
                                aria-pressed={component.id === activeComponentId}
                                aria-controls={`${panelId}-component-detail`}
                                onClick={(event) => {
                                    setAnimateComponentChange(shouldAnimatePointerInteraction(event, shouldReduceMotion));
                                    setActiveComponentId(component.id);
                                }}
                            >
                                {component.id === activeComponentId ? (
                                    <motion.span
                                        className="project-story__component-indicator"
                                        aria-hidden="true"
                                        layoutId="project-story-component-indicator"
                                        transition={getInteractionTransition(animateComponentChange)}
                                    />
                                ) : null}
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <strong>{component.name}</strong>
                            </button>
                        ))}
                    </div>
                    <div className="project-story__component-detail" id={`${panelId}-component-detail`} aria-live="polite" aria-atomic="true">
                        <motion.div
                            key={activeComponent.id}
                            className="project-story__component-detail-content"
                            initial={animateComponentChange ? {
                                opacity: 0,
                                transform: `translateY(${INTERACTION_OFFSET}px)`,
                            } : false}
                            animate={{ opacity: 1, transform: "translateY(0px)" }}
                            transition={getInteractionTransition(animateComponentChange)}
                        >
                            <div>
                                <span>Role</span>
                                <p>{activeComponent.purpose}</p>
                            </div>
                            <div>
                                <span>Boundary</span>
                                <p>{activeComponent.boundary}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <p className="project-story__source-note">
                Story details use the project record and documented architecture.
            </p>
        </section>
    );
}
