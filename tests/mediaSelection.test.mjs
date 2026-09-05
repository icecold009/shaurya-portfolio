import test from "node:test";
import assert from "node:assert/strict";

import {
    getMediaFromSearchParams,
    updateMediaSearchParams,
} from "../src/lib/mediaSelection.js";

const items = [
    { id: "piece-01", title: "Jeep" },
    { id: "certificate-01", title: "IYMC Final Round Silver" },
];

test("resolves media by its stable URL identifier", () => {
    assert.equal(
        getMediaFromSearchParams(new URLSearchParams("piece=piece-01"), "piece", items)?.title,
        "Jeep",
    );
    assert.equal(
        getMediaFromSearchParams(new URLSearchParams("certificate=missing"), "certificate", items),
        null,
    );
});

test("updates one media parameter without dropping other query state", () => {
    const opened = updateMediaSearchParams(
        new URLSearchParams("section=competitions&view=grid"),
        "certificate",
        "competitions-1-1",
    );
    const closed = updateMediaSearchParams(opened, "certificate");

    assert.equal(opened.toString(), "section=competitions&view=grid&certificate=competitions-1-1");
    assert.equal(closed.toString(), "section=competitions&view=grid");
});
