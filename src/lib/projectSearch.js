export function getProjectTag(project) {
    return project.category.split(" · ")[0];
}

export function projectMatches(project, query = "", tag = "") {
    if (tag && getProjectTag(project) !== tag) {
        return false;
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return true;
    }

    return [
        project.title,
        project.description,
        project.category,
        project.status,
        ...project.stack,
    ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
}

export function filterProjects(projects, { query = "", tag = "" } = {}) {
    return projects.filter((project) => projectMatches(project, query, tag));
}

export function getProjectFromHash(hash, projects) {
    const match = /^#project-detail-(\d+)$/.exec(hash);

    return match
        ? projects.find((project) => project.number === match[1]) ?? null
        : null;
}
