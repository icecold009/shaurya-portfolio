import test from "node:test";
import assert from "node:assert/strict";

import { projects } from "../src/data/projects.js";
import { getSkillProjects, SKILL_TOPICS } from "../src/lib/projectSkills.js";

const idsFor = (skillId) => getSkillProjects(skillId, projects).map(({ project }) => project.id);

test("skill selections return only the explicitly tagged projects in archive order", () => {
    assert.deepEqual(idsFor("audio"), ["audio-recognition", "touchscreen-launchpad"]);
    assert.deepEqual(idsFor("python"), [
        "audio-recognition",
        "past-paper-ai",
        "face-attendance-system",
        "f1-championship-prediction",
        "student-dropout-risk-prediction",
        "car-price-predictor",
    ]);
    assert.deepEqual(idsFor("local-first"), [
        "audio-recognition",
        "face-attendance-system",
        "touchscreen-launchpad",
    ]);
});

test("the Python project tags agree with each canonical technology stack", () => {
    for (const project of projects) {
        assert.equal(
            project.skills?.includes("Python") ?? false,
            project.stack.includes("Python"),
            `${project.title} skill tag should match its technology stack`,
        );
    }
});

test("every skill result carries existing proof state, outcome, and limitations", () => {
    for (const { id } of SKILL_TOPICS) {
        for (const { project, evidence } of getSkillProjects(id, projects)) {
            assert.ok(project.outcome, `${project.title} needs an existing outcome`);
            assert.ok(project.limitations, `${project.title} needs an existing limitation`);
            assert.ok(evidence.label);
            assert.equal(evidence.hasSource, Boolean(project.github));
        }
    }

    const archiveRecord = getSkillProjects("python", projects)
        .find(({ project }) => project.id === "student-dropout-risk-prediction");
    assert.equal(archiveRecord?.evidence.hasSource, false);
    assert.equal(archiveRecord?.evidence.label, "Archive record");
});

test("unknown skill selections return no projects", () => {
    assert.deepEqual(getSkillProjects("unknown", projects), []);
});
