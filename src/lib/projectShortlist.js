export const PROJECT_SHORTLIST_STORAGE_KEY = "portfolio-project-shortlist-v1";

export function normalizeProjectShortlist(value, projects = []) {
    const validIds = new Set(projects.map((project) => project.id));
    const values = Array.isArray(value) ? value : [];

    return Array.from(new Set(values.filter((projectId) => validIds.has(projectId))));
}

export function readProjectShortlist(storage, projects = []) {
    if (!storage) {
        return [];
    }

    try {
        const value = JSON.parse(storage.getItem(PROJECT_SHORTLIST_STORAGE_KEY) ?? "[]");
        return normalizeProjectShortlist(value, projects);
    } catch {
        return [];
    }
}

export function writeProjectShortlist(storage, projectIds, projects = []) {
    if (!storage) {
        return false;
    }

    try {
        storage.setItem(
            PROJECT_SHORTLIST_STORAGE_KEY,
            JSON.stringify(normalizeProjectShortlist(projectIds, projects)),
        );
        return true;
    } catch {
        return false;
    }
}

export function toggleProjectShortlist(projectIds, projectId) {
    return projectIds.includes(projectId)
        ? projectIds.filter((id) => id !== projectId)
        : [...projectIds, projectId];
}
