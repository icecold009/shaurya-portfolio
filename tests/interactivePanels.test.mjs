import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
    EDITORIAL_DURATION,
    EDITORIAL_EASE,
    IMMEDIATE_TRANSITION,
    INTERACTION_OFFSET,
    INTERACTION_TRANSITION,
    getInteractionTransition,
    shouldAnimatePointerInteraction,
} from "../src/lib/motion.js";

test("interactive motion is brief, small, and enabled only for pointer changes without reduced motion", () => {
    assert.equal(INTERACTION_OFFSET, 7);
    assert.equal(INTERACTION_TRANSITION.duration, 0.24);
    assert.deepEqual(INTERACTION_TRANSITION.ease, EDITORIAL_EASE);
    assert.equal(INTERACTION_TRANSITION.duration, EDITORIAL_DURATION.normal);
    assert.strictEqual(getInteractionTransition(true), INTERACTION_TRANSITION);
    assert.strictEqual(getInteractionTransition(false), IMMEDIATE_TRANSITION);
    assert.deepEqual(IMMEDIATE_TRANSITION, { duration: 0 });

    assert.equal(shouldAnimatePointerInteraction({ detail: 1 }, false), true);
    assert.equal(shouldAnimatePointerInteraction({ detail: 0 }, false), false);
    assert.equal(shouldAnimatePointerInteraction(undefined, false), false);
    assert.equal(shouldAnimatePointerInteraction({ detail: 1 }, true), false);
});

test("the project story no longer refers to the removed homepage audio demo", () => {
    const projectStory = readFileSync(new URL("../src/components/ProjectStory.jsx", import.meta.url), "utf8");

    assert.doesNotMatch(projectStory, /four-tone homepage demo/i);
});
