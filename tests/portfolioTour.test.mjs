import test from "node:test";
import assert from "node:assert/strict";

import { audienceLenses } from "../src/data/profile.js";
import { projects } from "../src/data/projects.js";
import { getAudienceTourStops } from "../src/lib/audienceLens.js";

const tourStops = getAudienceTourStops(audienceLenses, projects);

test("the guided tour has one source-backed project for each audience lens", () => {
    assert.deepEqual(
        tourStops.map(({ lens, project }) => [lens.id, project.id]),
        [
            ["admissions", "past-paper-ai"],
            ["collaboration", "stadium-pulse-ai"],
            ["curious", "audio-recognition"],
        ],
    );
});

test("each guided-tour rationale is linked to a project in that lens", () => {
    assert.equal(tourStops.length, 3);
    for (const { lens, project, rationale } of tourStops) {
        assert.ok(lens.projectIds.includes(project.id));
        assert.ok(project.problem);
        assert.ok(project.outcome);
        assert.ok(rationale.length > 20);
    }
});
