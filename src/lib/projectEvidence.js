const proofRules = [
    ["simulated data", "Prototype / simulated data"],
    ["hosted path unverified", "Prototype / hosted path unverified"],
    ["archive record", "Archive record"],
    ["research study", "Research study"],
    ["hackathon", "Hackathon prototype"],
    ["community project", "Community project"],
    ["learning project", "Learning project"],
    ["local-first", "Prototype / local-first"],
    ["source linked", "Prototype / source linked"],
];

export function getProjectProofLabel(project = {}) {
    const status = String(project.status ?? "").toLowerCase();
    const matchingRule = proofRules.find(([needle]) => status.includes(needle));

    return matchingRule?.[1] ?? (project.github ? "Source linked" : "Evidence to add");
}

export function getProjectEvidenceSummary(project = {}) {
    return {
        label: getProjectProofLabel(project),
        hasSource: Boolean(project.github),
        hasVisual: Boolean(project.thumbnail),
        hasLimitations: Boolean(project.limitations),
    };
}
