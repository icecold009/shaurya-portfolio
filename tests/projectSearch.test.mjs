import test from "node:test";
import assert from "node:assert/strict";

import { filterProjects, getProjectFromHash } from "../src/lib/projectSearch.js";

const projects = [
    {
        id: "stadium-pulse-ai",
        number: "01",
        category: "AI · Full-stack · Operations",
        title: "StadiumPulse AI",
        description: "A dashboard for venue operations.",
        status: "Prototype · simulated data",
        stack: ["React", "Supabase"],
    },
    {
        id: "audio-recognition",
        number: "02",
        category: "Audio · Python · Flask",
        title: "Audio Recognition",
        description: "Fingerprint matching for uploaded audio.",
        status: "Prototype · source linked",
        stack: ["Python", "Flask"],
    },
];

test("filters projects by tag and case-insensitive search", () => {
    assert.deepEqual(
        filterProjects(projects, { tag: "AI" }).map((project) => project.id),
        ["stadium-pulse-ai"],
    );
    assert.deepEqual(
        filterProjects(projects, { query: "FLASK" }).map((project) => project.id),
        ["audio-recognition"],
    );
});

test("an empty query and tag preserve the full project list", () => {
    assert.equal(filterProjects(projects).length, projects.length);
    assert.equal(filterProjects(projects, { query: "  " }).length, projects.length);
});

test("legacy numbered hashes resolve to the matching project", () => {
    assert.equal(getProjectFromHash("#project-detail-02", projects)?.id, "audio-recognition");
    assert.equal(getProjectFromHash("#project-detail-99", projects), null);
    assert.equal(getProjectFromHash("#other-section", projects), null);
});
