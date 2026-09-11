import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
    getSeoMetadata,
    seoRoutes,
} from "../src/lib/seoMetadata.js";
import { positioningStatement } from "../src/lib/profileLinks.js";
import { posts } from "../src/posts/index.js";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(join(root, "index.html"), "utf8");
const robots = readFileSync(join(root, "public", "robots.txt"), "utf8");
const sitemap = readFileSync(join(root, "public", "sitemap.xml"), "utf8");
const canonicalUrl = "https://shauryasaria.me/";
const articleRoutes = posts.map((post) => `/blog/${post.slug}`);
const allRoutes = [...seoRoutes, ...articleRoutes];

function getJsonLdFromHtml(source) {
    const match = source.match(/<script id="site-json-ld" type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(match, "index.html should include the site JSON-LD script");
    return JSON.parse(match[1]);
}

function getStructuredDataTypes(data) {
    return data["@graph"]
        ? data["@graph"].map((entry) => entry["@type"])
        : [data["@type"]];
}

test("every public route has a unique title, description, and canonical", () => {
    const metadata = allRoutes.map((route) => getSeoMetadata(route));
    const titles = metadata.map((entry) => entry.title);
    const descriptions = metadata.map((entry) => entry.description);

    assert.equal(new Set(titles).size, allRoutes.length);
    assert.equal(new Set(descriptions).size, allRoutes.length);

    metadata.forEach((entry, index) => {
        assert.equal(entry.canonical, `https://shauryasaria.me${allRoutes[index] === "/" ? "/" : allRoutes[index]}`);
    });
});

test("homepage fallback HTML contains crawlable identity and homepage metadata", () => {
    const moduleScriptIndex = html.indexOf('<script type="module" src="/src/main.jsx"></script>');
    const initialHtml = html.slice(0, moduleScriptIndex);

    assert.match(initialHtml, /<h1 id="static-homepage-title">Shaurya Saria<\/h1>/);
    assert.match(initialHtml, new RegExp(positioningStatement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, /<title>Shaurya Saria \| Student Developer, AI &amp; Data Science<\/title>/);
    assert.match(html, new RegExp(`meta name="description"[\\s\\S]*?content="${positioningStatement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, new RegExp(`link rel="canonical" href="${canonicalUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(initialHtml, /<a href="https:\/\/github\.com\/icecold009">GitHub profile<\/a>/);
    assert.match(initialHtml, /<a href="https:\/\/linkedin\.com\/in\/shaurya-saria009">LinkedIn profile<\/a>/);
});

test("static JSON-LD uses homepage-safe WebSite and Person data", () => {
    const data = getJsonLdFromHtml(html);
    const graph = data["@graph"];
    const person = graph.find((entry) => entry["@type"] === "Person");

    assert.deepEqual(getStructuredDataTypes(data), ["WebSite", "Person"]);
    assert.equal(person.name, "Shaurya Saria");
    assert.equal(person.alternateName, "icecold009");
    assert.equal(person.image, "https://shauryasaria.me/images/shaurya-portrait.jpeg");
    assert.deepEqual(person.sameAs, [
        "https://github.com/icecold009",
        "https://linkedin.com/in/shaurya-saria009",
        "https://www.kaggle.com/icecold009",
    ]);
});

test("only the about route contains ProfilePage structured data", () => {
    allRoutes.forEach((route) => {
        const metadata = getSeoMetadata(route);
        const hasProfilePage = getStructuredDataTypes(metadata.structuredData).includes("ProfilePage");

        assert.equal(hasProfilePage, route === "/about", route);
    });
});

test("robots and sitemap advertise the canonical public site", () => {
    assert.match(robots, /^User-agent: \*\nAllow: \/\n\nSitemap: https:\/\/shauryasaria\.me\/sitemap\.xml\s*$/);

    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.deepEqual(urls, [
        canonicalUrl,
        "https://shauryasaria.me/projects",
        "https://shauryasaria.me/about",
        "https://shauryasaria.me/blog",
        "https://shauryasaria.me/contact",
        "https://shauryasaria.me/uses",
        "https://shauryasaria.me/artwork",
        "https://shauryasaria.me/certificates",
        "https://shauryasaria.me/achievements",
    ]);
    assert.doesNotMatch(sitemap, /localhost|\/api\/|404/);
});
