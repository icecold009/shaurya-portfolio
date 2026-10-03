import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { findProjectsLocally, PROJECT_FINDER_MAX_QUERY_LENGTH } from "../lib/projectFinder";
import "./ProjectFinder.css";

export default function ProjectFinder({ projects, onOpenProject }) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const submittedQuery = query.trim();
        if (!submittedQuery || isSearching) {
            return;
        }

        setIsSearching(true);
        setResult(null);

        try {
            const response = await fetch("/api/project-picker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: submittedQuery }),
                signal: AbortSignal.timeout(9000),
            });
            if (!response.ok) {
                throw new Error("Project suggestions are unavailable.");
            }

            const payload = await response.json();
            if (payload.mode !== "typesafe" || !Array.isArray(payload.matches)
                || payload.matches.some((id) => typeof id !== "string")) {
                throw new Error("Project suggestions are unavailable.");
            }

            const allowedIds = new Set(projects.map((project) => project.id));
            const matches = payload.matches
                .filter((id, index) => allowedIds.has(id) && payload.matches.indexOf(id) === index)
                .map((id) => projects.find((project) => project.id === id))
                .filter(Boolean)
                .slice(0, 3);
            setResult({ mode: "typesafe", matches });
        } catch {
            setResult({ mode: "local", matches: findProjectsLocally(submittedQuery, projects) });
        } finally {
            setIsSearching(false);
        }
    }

    const resultMessage = isSearching
        ? "Finding projects that fit your request…"
        : result?.mode === "local"
            ? result.matches.length
                ? "Jev is unavailable. These keyword matches were found locally."
                : "Jev is unavailable, and no local keyword matches were found. Try a project topic or technology."
            : result?.matches.length
                ? `${result.matches.length} ${result.matches.length === 1 ? "project" : "projects"} selected from the archive.`
                : result
                    ? "No clear matches found. Try a different topic or technology."
                    : "";

    return (
        <section className="project-finder" aria-labelledby="project-finder-title">
            <div className="project-finder__intro">
                <p className="project-finder__eyebrow"><Sparkles size={14} aria-hidden="true" /> Guided discovery</p>
                <h2 id="project-finder-title">Find a project for me</h2>
                <p>Describe a topic, skill, or kind of work. When available, Jev matches it to projects already in this archive.</p>
            </div>

            <form className="project-finder__form" onSubmit={handleSubmit}>
                <label htmlFor="project-finder-query">What would you like to explore?</label>
                <textarea
                    id="project-finder-query"
                    name="query"
                    rows="2"
                    maxLength={PROJECT_FINDER_MAX_QUERY_LENGTH}
                    value={query}
                    onChange={(event) => setQuery(event.currentTarget.value)}
                    placeholder="Show me something involving audio and Python"
                    aria-describedby="project-finder-privacy project-finder-count"
                    required
                />
                <div className="project-finder__form-footer">
                    <span id="project-finder-count">{query.length}/{PROJECT_FINDER_MAX_QUERY_LENGTH}</span>
                    <button type="submit" disabled={isSearching || !query.trim()}>
                        {isSearching ? "Searching…" : "Find projects"}
                        <ArrowRight size={16} aria-hidden="true" />
                    </button>
                </div>
                <p className="project-finder__privacy" id="project-finder-privacy">
                    When TypeSafe is available, submitting sends your prompt and public project titles, summaries, categories, technology stacks, skills, and outcomes to TypeSafe. This feature does not save your prompt in browser storage or the page URL. Avoid personal or private information. <Link to="/privacy">Privacy details</Link>
                </p>
            </form>

            {result || isSearching ? (
                <div className="project-finder__results" aria-live="polite" aria-busy={isSearching}>
                    <p className="project-finder__status">{resultMessage}</p>
                    {result?.matches.length ? (
                        <ul>
                            {result.matches.map((project) => (
                                <li key={project.id}>
                                    <div>
                                        <span>{project.category}</span>
                                        <h3>{project.title}</h3>
                                        <p>{project.summary ?? project.description}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(event) => onOpenProject(project, event.currentTarget)}
                                        aria-label={`Open ${project.title} project details`}
                                    >
                                        View details <ArrowRight size={15} aria-hidden="true" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            ) : null}
        </section>
    );
}
