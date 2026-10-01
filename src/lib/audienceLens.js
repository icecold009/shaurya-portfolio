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

export function getAudienceTourStops(lenses, projects) {
    const projectsById = new Map(projects.map((project) => [project.id, project]));

    return lenses
        .map((lens) => {
            const project = projectsById.get(lens.tourProjectId);

            if (!project || !lens.projectIds?.includes(project.id) || !lens.tourContext) {
                return null;
            }

            return { lens, project, rationale: lens.tourContext };
        })
        .filter(Boolean);
}
