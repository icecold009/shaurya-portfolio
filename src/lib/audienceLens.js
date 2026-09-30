export function getAudienceLens(lenses, requestedId, fallbackId = lenses[0]?.id) {
    return lenses.find((lens) => lens.id === requestedId)
        ?? lenses.find((lens) => lens.id === fallbackId)
        ?? lenses[0]
        ?? null;
}

export function getLensProjects(lens, projects) {
    if (!lens) {
        return [];
    }

    const projectsById = new Map(projects.map((project) => [project.id, project]));

    return lens.projectIds
        .map((projectId) => projectsById.get(projectId))
        .filter(Boolean);
}
