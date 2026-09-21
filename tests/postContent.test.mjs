import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
    countReadableWords,
    getReadingTime,
    getReadingTimeFromWordCount,
} from "../src/lib/readingTime.js";
import { posts } from "../src/posts/index.js";
import { postWordCounts } from "../src/posts/generatedMetadata.js";

const postsDirectory = join(dirname(fileURLToPath(import.meta.url)), "../src/posts");

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

test("post sources leave the page shell as the only level-one heading", () => {
    const postFiles = readdirSync(postsDirectory).filter((fileName) => fileName.endsWith(".mdx"));

    for (const fileName of postFiles) {
        const source = readFileSync(join(postsDirectory, fileName), "utf8");
        assert.doesNotMatch(
            source,
            /^#\s/m,
            `${basename(fileName, ".mdx")} should use level-two headings inside the article body`,
        );
    }
});
