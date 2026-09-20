import test from "node:test";
import assert from "node:assert/strict";

import {
    getAudienceLens,
    getLensProjects,
} from "../src/lib/audienceLens.js";

const lenses = [
    { id: "first", projectIds: ["two", "missing", "one"] },
    { id: "second", projectIds: ["one"] },
];
const projects = [
    { id: "one", title: "One" },
    { id: "two", title: "Two" },
];

test("resolves a requested audience lens with a safe fallback", () => {
    assert.equal(getAudienceLens(lenses, "second")?.id, "second");
    assert.equal(getAudienceLens(lenses, "unknown")?.id, "first");
});

test("keeps lens project order while dropping stale ids", () => {
    assert.deepEqual(
        getLensProjects(lenses[0], projects).map((project) => project.id),
        ["two", "one"],
    );
});
