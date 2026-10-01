import { useId, useState } from "react";

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
    const storySteps = getStorySteps(project);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeComponentId, setActiveComponentId] = useState(SYSTEM_COMPONENTS[0].id);
    const panelId = `project-story-panel-${useId().replace(/:/g, "")}`;
    const activeStep = storySteps[activeIndex];
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
                        onClick={() => setActiveIndex(index)}
                    >
                        <span className="project-story__step-number">{String(index + 1).padStart(2, "0")}</span>
                        <span>{step.label}</span>
                    </button>
                ))}
            </div>

            <div className="project-story__panel" id={panelId} aria-live="polite" aria-atomic="true">
                <span className="project-story__panel-number">{String(activeIndex + 1).padStart(2, "0")}</span>
                <div>
                    <h4>{activeStep.heading}</h4>
                    <p>{activeStep.body}</p>
                </div>
            </div>

            {activeIndex === 2 ? (
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
                                onClick={() => setActiveComponentId(component.id)}
                            >
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <strong>{component.name}</strong>
                            </button>
                        ))}
                    </div>
                    <div className="project-story__component-detail" id={`${panelId}-component-detail`} aria-live="polite" aria-atomic="true">
                        <div>
                            <span>Role</span>
                            <p>{activeComponent.purpose}</p>
                        </div>
                        <div>
                            <span>Boundary</span>
                            <p>{activeComponent.boundary}</p>
                        </div>
                    </div>
                </div>
            ) : null}

            <p className="project-story__source-note">
                Story details use the project record and documented architecture. The four-tone homepage demo is a separate synthesized sketch.
            </p>
        </section>
    );
}
