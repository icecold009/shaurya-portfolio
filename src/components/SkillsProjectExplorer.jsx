import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { projects } from "../data/projects";
import { getSkillProjects, SKILL_TOPICS } from "../lib/projectSkills";

import "./SkillsProjectExplorer.css";

export default function SkillsProjectExplorer({ initialSkillId = "audio" } = {}) {
    const [activeSkillId, setActiveSkillId] = useState(initialSkillId);
    const [failedThumbnails, setFailedThumbnails] = useState({});
    const activeSkill = SKILL_TOPICS.find((skill) => skill.id === activeSkillId) ?? SKILL_TOPICS[0];
    const matches = getSkillProjects(activeSkill.id, projects);

    return (
        <div className="skills-project-explorer" data-skill={activeSkill.id}>
            <div className="skills-project-explorer__choices" role="group" aria-label="Choose a skill">
                {SKILL_TOPICS.map((skill) => (
                    <button
                        key={skill.id}
                        className="skills-project-explorer__choice"
                        data-skill={skill.id}
                        type="button"
                        aria-pressed={activeSkill.id === skill.id}
                        aria-controls="skills-project-results"
                        onClick={() => setActiveSkillId(skill.id)}
                    >
                        <span>{skill.label}</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                ))}
            </div>

            <div className="skills-project-explorer__results" id="skills-project-results">
                <div className="skills-project-explorer__summary">
                    <div>
                        <p className="skills-project-explorer__eyebrow">Selected skill / {activeSkill.label}</p>
                        <p>{activeSkill.description}</p>
                    </div>
                    <p className="skills-project-explorer__count" role="status" aria-live="polite" aria-atomic="true">
                        {matches.length} {matches.length === 1 ? "project" : "projects"}
                    </p>
                </div>

                <div className="skills-project-explorer__grid" role="list" aria-label={`${activeSkill.label} projects`}>
                    {matches.map(({ project, evidence }) => (
                        <article className="skills-project-card" key={project.id} role="listitem">
                            <div className="skills-project-card__cover">
                                {project.thumbnail && !failedThumbnails[project.id] ? (
                                    <img
                                        src={project.thumbnail}
                                        alt={project.thumbnailAlt}
                                        loading="lazy"
                                        decoding="async"
                                        onError={() => setFailedThumbnails((failed) => ({ ...failed, [project.id]: true }))}
                                    />
                                ) : (
                                    <div
                                        className="skills-project-card__cover-fallback"
                                        role="img"
                                        aria-label={`${project.thumbnail ? "Cover unavailable" : "No project preview available"} for ${project.title}`}
                                    >
                                        <span>{project.thumbnail ? "Cover unavailable" : "No preview image available"}</span>
                                    </div>
                                )}
                            </div>
                            <div className="skills-project-card__body">
                                <div className="skills-project-card__meta">
                                    <span>{project.category}</span>
                                    <span>{project.year}</span>
                                </div>
                                <h3>
                                    <Link to={`/projects?project=${encodeURIComponent(project.id)}`}>
                                        {project.title}
                                    </Link>
                                </h3>
                                <div className="skills-project-card__proof">
                                    <span>{activeSkill.label} match</span>
                                    <span>{evidence.label}</span>
                                    <span>{evidence.hasSource ? "Repository linked" : "Repository link pending"}</span>
                                </div>
                                <div className="skills-project-card__evidence">
                                    <div>
                                        <span>Outcome</span>
                                        <p>{project.outcome}</p>
                                    </div>
                                    <div>
                                        <span>Boundary</span>
                                        <p>{project.limitations}</p>
                                    </div>
                                </div>
                                <ul className="skills-project-card__stack" aria-label={`${project.title} technologies`}>
                                    {project.stack.map((technology) => (
                                        <li
                                            key={technology}
                                            data-highlight={activeSkill.id === "python"
                                                ? technology === "Python"
                                                : activeSkill.id === "audio"
                                                    ? ["Fingerprinting", "Web Audio"].includes(technology)
                                                    : false}
                                        >
                                            {technology}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    className="skills-project-card__link"
                                    to={`/projects?project=${encodeURIComponent(project.id)}`}
                                >
                                    View project evidence <ArrowUpRight size={15} aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
