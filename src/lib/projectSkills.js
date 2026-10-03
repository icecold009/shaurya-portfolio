import { getProjectEvidenceSummary } from "./projectEvidence.js";

export const SKILL_TOPICS = [
    {
        id: "audio",
        label: "Audio",
        description: "Sound recognition and browser-based playback.",
    },
    {
        id: "python",
        label: "Python",
        description: "Projects with Python in their recorded technology stack.",
    },
    {
        id: "local-first",
        label: "Local-first",
        description: "Experiences designed to work on the current device.",
    },
];

export function getSkillProjects(skillId, projects) {
    const topic = SKILL_TOPICS.find((skill) => skill.id === skillId);

    if (!topic) {
        return [];
    }

    return projects
        .filter((project) => Array.isArray(project.skills) && project.skills.includes(topic.label))
        .map((project) => ({
            project,
            evidence: getProjectEvidenceSummary(project),
        }));
}
