import test from "node:test";
import assert from "node:assert/strict";

import { projects } from "../src/data/projects.js";
import { getSavedProjectComparisonPair } from "../src/lib/projectComparison.js";

test("selects exactly two distinct canonical projects from the saved list", () => {
    const savedIds = ["stadium-pulse-ai", "audio-recognition", "past-paper-ai"];
    const pair = getSavedProjectComparisonPair(
        ["audio-recognition", "stadium-pulse-ai"],
        savedIds,
        projects,
    );

    assert.deepEqual(pair.map((project) => project.id), ["audio-recognition", "stadium-pulse-ai"]);
    assert.equal(pair[0], projects.find((project) => project.id === "audio-recognition"));
    assert.equal(pair[1], projects.find((project) => project.id === "stadium-pulse-ai"));
});

test("rejects duplicate, unsaved, stale, and incomplete comparisons", () => {
    const savedIds = ["stadium-pulse-ai", "audio-recognition", "removed-project"];

    assert.deepEqual(getSavedProjectComparisonPair(["audio-recognition", "audio-recognition"], savedIds, projects), []);
    assert.deepEqual(getSavedProjectComparisonPair(["audio-recognition", "past-paper-ai"], savedIds, projects), []);
    assert.deepEqual(getSavedProjectComparisonPair(["audio-recognition", "removed-project"], savedIds, projects), []);
    assert.deepEqual(getSavedProjectComparisonPair(["audio-recognition"], savedIds, projects), []);
    assert.deepEqual(getSavedProjectComparisonPair(["audio-recognition", "missing-id"], savedIds, projects), []);
});
