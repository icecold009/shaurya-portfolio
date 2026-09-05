import test from "node:test";
import assert from "node:assert/strict";

import {
    getPostFromSearchParams,
    updatePostSearchParams,
} from "../src/lib/blogSelection.js";

const posts = [
    { slug: "first-post", title: "First post" },
    { slug: "second-post", title: "Second post" },
];

test("resolves a valid post from URL search params", () => {
    const params = new URLSearchParams("post=second-post&tag=systems");

    assert.equal(getPostFromSearchParams(params, posts)?.title, "Second post");
    assert.equal(getPostFromSearchParams(new URLSearchParams("post=missing"), posts), null);
});

test("opens a post without dropping unrelated URL parameters", () => {
    const next = updatePostSearchParams(
        new URLSearchParams("tag=systems&page=2"),
        "first-post",
    );

    assert.equal(next.toString(), "tag=systems&page=2&post=first-post");
});

test("closing a post removes only the post parameter", () => {
    const next = updatePostSearchParams(
        new URLSearchParams("tag=systems&post=first-post"),
    );

    assert.equal(next.toString(), "tag=systems");
});
