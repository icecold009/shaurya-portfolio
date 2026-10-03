import { useEffect, useId, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { normalizeProjectShortlist } from "../lib/projectShortlist";
import { getSavedProjectComparisonPair } from "../lib/projectComparison";

import "./ProjectComparison.css";

const getInitialSelection = (savedProjects) => savedProjects.slice(0, 2).map((project) => project.id);

const comparisonDimensions = [
    {
        id: "goal",
        label: "Goal / problem",
        getValue: (project) => project.problem || "No problem statement is recorded.",
    },
    {
        id: "architecture",
        label: "Architecture note",
        getValue: (project) => project.architectureNote || "No separate architecture note is recorded.",
    },
    {
        id: "decision",
        label: "Key decision",
        getValue: (project) => project.decisions || "No key decision is recorded.",
    },
    {
        id: "technologies",
        label: "Technologies",
        getValue: (project) => project.stack ?? [],
    },
    {
        id: "limitations",
        label: "Limitations",
        getValue: (project) => project.limitations || "No limitations are recorded.",
    },
];

function ProjectDetailsLink({ project }) {
    const [currentSearchParams] = useSearchParams();
    const detailSearchParams = new URLSearchParams(currentSearchParams);
    detailSearchParams.set("project", project.id);

    return (
        <Link className="project-comparison__detail-link" to={`/projects?${detailSearchParams.toString()}`}>
            Open project details <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
    );
}

export default function ProjectComparison({ isOpen = true, shortlistIds = [], projectRecords = [] } = {}) {
    const componentId = useId();
    const savedProjects = useMemo(() => {
        const recordsById = new Map(projectRecords.map((project) => [project.id, project]));
        return normalizeProjectShortlist(shortlistIds, projectRecords)
            .map((projectId) => recordsById.get(projectId))
            .filter(Boolean);
    }, [projectRecords, shortlistIds]);
    const [selectedIds, setSelectedIds] = useState(() => getInitialSelection(savedProjects));
    const selectedPair = getSavedProjectComparisonPair(selectedIds, shortlistIds, projectRecords);
    const [firstProject, secondProject] = selectedPair;
    const firstSelectId = `project-comparison-first-${componentId}`;
    const secondSelectId = `project-comparison-second-${componentId}`;
    const firstTitleId = `project-comparison-first-title-${componentId}`;
    const secondTitleId = `project-comparison-second-title-${componentId}`;

    useEffect(() => {
        setSelectedIds((currentIds) => (
            getSavedProjectComparisonPair(currentIds, shortlistIds, projectRecords).length === 2
                ? currentIds
                : getInitialSelection(savedProjects)
        ));
    }, [projectRecords, savedProjects, shortlistIds]);

    const updateSelection = (index, projectId) => {
        setSelectedIds((currentIds) => {
            const nextIds = [...currentIds];
            const otherIndex = index === 0 ? 1 : 0;
            if (nextIds[otherIndex] === projectId) {
                nextIds[otherIndex] = "";
            }
            nextIds[index] = projectId;
            return nextIds;
        });
    };

    return (
        <section
            className="project-comparison"
            id="project-comparison"
            aria-labelledby="project-comparison-heading"
            hidden={!isOpen}
        >
            <div className="project-comparison__heading">
                <div>
                    <p className="selected-work-kicker">Reading list / side by side</p>
                    <h2 id="project-comparison-heading">Compare saved projects.</h2>
                    <p>Use the project records to compare their goals, architecture notes, tools, and limits.</p>
                </div>
                <p className="project-comparison__saved-count" role="status" aria-live="polite">
                    {savedProjects.length} saved {savedProjects.length === 1 ? "project" : "projects"}
                </p>
            </div>

            <div className="project-comparison__selectors">
                <div className="project-comparison__select-field">
                    <label htmlFor={firstSelectId}>First saved project</label>
                    <select
                        id={firstSelectId}
                        value={selectedIds[0] ?? ""}
                        onChange={(event) => updateSelection(0, event.target.value)}
                    >
                        {savedProjects.length === 0 ? <option value="">No saved projects yet</option> : null}
                        {savedProjects.map((project) => (
                            <option key={project.id} value={project.id}>{project.title}</option>
                        ))}
                    </select>
                </div>
                <div className="project-comparison__select-field">
                    <label htmlFor={secondSelectId}>Second saved project</label>
                    <select
                        id={secondSelectId}
                        value={selectedIds[1] ?? ""}
                        onChange={(event) => updateSelection(1, event.target.value)}
                    >
                        {savedProjects.length === 0 ? <option value="">No saved projects yet</option> : null}
                        {savedProjects.map((project) => (
                            <option key={project.id} value={project.id}>{project.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedPair.length === 2 ? (
                <>
                    <p className="project-comparison__announcement" role="status" aria-live="polite">
                        Comparing {firstProject.title} with {secondProject.title}.
                    </p>
                    <div className="project-comparison__projects" role="group" aria-label="Compared projects">
                        <article className="project-comparison__project" id={firstTitleId}>
                            <span>Project 01</span>
                            <h3>{firstProject.title}</h3>
                            <ProjectDetailsLink project={firstProject} />
                        </article>
                        <article className="project-comparison__project" id={secondTitleId}>
                            <span>Project 02</span>
                            <h3>{secondProject.title}</h3>
                            <ProjectDetailsLink project={secondProject} />
                        </article>
                    </div>

                    <div className="project-comparison__dimensions" aria-label={`${firstProject.title} and ${secondProject.title} comparison`}>
                        {comparisonDimensions.map((dimension) => {
                            const rowId = `${dimension.id}-${componentId}`;
                            return (
                                <section className="project-comparison__dimension" key={dimension.id} aria-labelledby={rowId}>
                                    <h3 id={rowId}>{dimension.label}</h3>
                                    <div className="project-comparison__values">
                                        {[firstProject, secondProject].map((project, index) => (
                                            <article
                                                className="project-comparison__value"
                                                key={project.id}
                                                aria-labelledby={`${rowId} ${index === 0 ? firstTitleId : secondTitleId}`}
                                            >
                                                <p className="project-comparison__value-project" aria-hidden="true">{project.title}</p>
                                                {dimension.id === "technologies" ? (
                                                    <ul className="project-comparison__technologies" aria-label={`${project.title} technology stack`}>
                                                        {dimension.getValue(project).map((technology) => (
                                                            <li key={technology}>{technology}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>{dimension.getValue(project)}</p>
                                                )}
                                                {dimension.id === "architecture" && project.architectureLink ? (
                                                    <a
                                                        className="project-comparison__detail-link"
                                                        href={project.architectureLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Open architecture diagram <ArrowUpRight size={14} aria-hidden="true" />
                                                    </a>
                                                ) : null}
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </>
            ) : (
                <p className="project-comparison__empty" role="status">
                    Save two different projects to compare their recorded details.
                </p>
            )}
        </section>
    );
}
