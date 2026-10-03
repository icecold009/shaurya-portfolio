export function getSavedProjectComparisonPair(selectedIds, shortlistIds, projectRecords = []) {
    if (!Array.isArray(selectedIds) || selectedIds.length !== 2) {
        return [];
    }

    const [firstId, secondId] = selectedIds;
    if (!firstId || !secondId || firstId === secondId) {
        return [];
    }

    const projectsById = new Map(projectRecords.map((project) => [project.id, project]));
    const savedIds = new Set(shortlistIds.filter((projectId) => projectsById.has(projectId)));
    if (!savedIds.has(firstId) || !savedIds.has(secondId)) {
        return [];
    }

    const first = projectsById.get(firstId);
    const second = projectsById.get(secondId);
    return first && second ? [first, second] : [];
}
