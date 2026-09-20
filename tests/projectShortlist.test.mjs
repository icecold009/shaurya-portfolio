import test from "node:test";
import assert from "node:assert/strict";

import {
    PROJECT_SHORTLIST_STORAGE_KEY,
    normalizeProjectShortlist,
    readProjectShortlist,
    toggleProjectShortlist,
    writeProjectShortlist,
} from "../src/lib/projectShortlist.js";

const projects = [{ id: "one" }, { id: "two" }];

function createStorage(initial = {}) {
    const values = new Map(Object.entries(initial));

    return {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
    };
}

test("normalizes a shortlist to unique project ids that still exist", () => {
    assert.deepEqual(
        normalizeProjectShortlist(["two", "one", "two", "missing"], projects),
        ["two", "one"],
    );
});

test("reads and writes the shortlist through versioned storage", () => {
    const storage = createStorage({
        [PROJECT_SHORTLIST_STORAGE_KEY]: JSON.stringify(["two", "stale"]),
    });

    assert.deepEqual(readProjectShortlist(storage, projects), ["two"]);
    assert.equal(writeProjectShortlist(storage, ["one", "stale"], projects), true);
    assert.deepEqual(readProjectShortlist(storage, projects), ["one"]);
});

test("toggles one project without mutating the input list", () => {
    const current = ["one"];

    assert.deepEqual(toggleProjectShortlist(current, "two"), ["one", "two"]);
    assert.deepEqual(toggleProjectShortlist(current, "one"), []);
    assert.deepEqual(current, ["one"]);
});
