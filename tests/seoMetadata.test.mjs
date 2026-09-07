import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(join(root, "index.html"), "utf8");
const robots = readFileSync(join(root, "public", "robots.txt"), "utf8");
const sitemap = readFileSync(join(root, "public", "sitemap.xml"), "utf8");
const description = "Shaurya Saria is a student developer in Bengaluru building projects across data science, machine learning, AI, and full-stack software.";
const canonicalUrl = "https://shauryasaria.me/";

test("homepage entry HTML contains crawlable identity and metadata", () => {
    const moduleScriptIndex = html.indexOf('<script type="module" src="/src/main.jsx"></script>');
    const initialHtml = html.slice(0, moduleScriptIndex);

    assert.match(initialHtml, /<h1 id="static-homepage-title">Shaurya Saria<\/h1>/);
    assert.match(initialHtml, new RegExp(description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, /<title>Shaurya Saria \| Student Developer, AI &amp; Data Science<\/title>/);
    assert.match(html, new RegExp(`<meta name="description"\\s+content="${description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonicalUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(initialHtml, /<a href="https:\/\/github\.com\/icecold009">GitHub profile<\/a>/);
    assert.match(initialHtml, /<a href="https:\/\/linkedin\.com\/in\/shaurya-saria009">LinkedIn profile<\/a>/);
});

test("homepage JSON-LD maps the site to Shaurya's real profiles", () => {
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(match, "index.html should include a JSON-LD script");

    const data = JSON.parse(match[1]);
    assert.equal(data["@type"], "ProfilePage");
    assert.equal(data.mainEntity["@type"], "Person");
    assert.equal(data.mainEntity.name, "Shaurya Saria");
    assert.equal(data.mainEntity.url, canonicalUrl);
    assert.equal(data.mainEntity.description, description);
    assert.deepEqual(data.mainEntity.sameAs, [
        "https://github.com/icecold009",
        "https://linkedin.com/in/shaurya-saria009",
    ]);
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

