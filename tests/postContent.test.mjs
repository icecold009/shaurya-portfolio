import test from "node:test";
import assert from "node:assert/strict";

import {
    countReadableWords,
    getReadingTime,
    getReadingTimeFromWordCount,
} from "../src/lib/readingTime.js";
import { posts } from "../src/posts/index.js";
import { postWordCounts } from "../src/posts/generatedMetadata.js";

test("counts readable words without markdown syntax", () => {
    const source = "# Heading\n\nA [useful link](https://example.com) and `inline code`.";

    assert.equal(countReadableWords(source), 5);
});

test("calculates reading time from the source word count", () => {
    assert.equal(getReadingTime("word ".repeat(200)), "1 min read");
    assert.equal(getReadingTime("word ".repeat(201)), "2 min read");
    assert.equal(getReadingTime(""), "1 min read");
});

test("published post metadata uses generated source word counts", () => {
    const shazamPost = posts.find((post) => post.slug === "shazam-clone");

    assert.ok(shazamPost);
    assert.equal(
        shazamPost.readingTime,
        getReadingTimeFromWordCount(postWordCounts["shazam-clone"]),
    );
    assert.ok(postWordCounts["shazam-clone"] > 200);
});
