import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { getSeoMetadata, seoRoutes } from "../src/lib/seoMetadata.js";
import { posts } from "../src/posts/index.js";

const root = resolve(".");
const distRoot = join(root, "dist");
const indexPath = join(distRoot, "index.html");

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("\"", "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceOrInsertMeta(html, attribute, key, content) {
    const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
    const expression = new RegExp(
        `<meta\\s+${attribute}=["']${escapeRegExp(key)}["'][^>]*>`,
        "i",
    );

    if (expression.test(html)) {
        return html.replace(expression, tag);
    }

    return html.replace("</head>", `    ${tag}\n</head>`);
}

function replaceCanonical(html, href) {
    const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
    const expression = /<link\s+rel=["']canonical["'][^>]*>/i;

    if (expression.test(html)) {
        return html.replace(expression, tag);
    }

    return html.replace("</head>", `    ${tag}\n</head>`);
}

function renderMetadata(template, metadata) {
    let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
    html = replaceOrInsertMeta(html, "name", "description", metadata.description);
    html = replaceOrInsertMeta(html, "name", "robots", metadata.robots);
    html = replaceOrInsertMeta(html, "property", "og:type", metadata.type);
    html = replaceOrInsertMeta(html, "property", "og:url", metadata.canonical);
    html = replaceOrInsertMeta(html, "property", "og:title", metadata.title);
    html = replaceOrInsertMeta(html, "property", "og:description", metadata.description);
    html = replaceOrInsertMeta(html, "property", "og:image", metadata.image);
    html = replaceOrInsertMeta(html, "property", "og:image:alt", metadata.imageAlt);
    html = replaceOrInsertMeta(html, "property", "og:image:width", "1200");
    html = replaceOrInsertMeta(html, "property", "og:image:height", "630");
    html = replaceOrInsertMeta(html, "name", "twitter:title", metadata.title);
    html = replaceOrInsertMeta(html, "name", "twitter:description", metadata.description);
    html = replaceOrInsertMeta(html, "name", "twitter:image", metadata.image);
    html = replaceOrInsertMeta(html, "name", "twitter:image:alt", metadata.imageAlt);
    html = replaceCanonical(html, metadata.canonical);
    html = html.replace(/\s*<meta\s+property=["']article:published_time["'][^>]*>/gi, "");

    if (metadata.type === "article") {
        html = html.replace(
            "</head>",
            `    <meta property="article:published_time" content="${escapeHtml(metadata.publishedTime)}" />\n</head>`,
        );
    }

    return html.replace(
        /<script id="site-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
        `<script id="site-json-ld" type="application/ld+json">${JSON.stringify(metadata.structuredData)}</script>`,
    );
}

const template = await readFile(indexPath, "utf8");
const routePaths = [
    ...seoRoutes,
    ...posts.map((post) => `/blog/${post.slug}`),
];

for (const route of routePaths) {
    if (route === "/") {
        continue;
    }

    const routeDirectory = join(distRoot, route.slice(1));
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(
        join(routeDirectory, "index.html"),
        renderMetadata(template, getSeoMetadata(route)),
        "utf8",
    );
}

await writeFile(
    join(distRoot, "404.html"),
    renderMetadata(template, getSeoMetadata("/missing")),
    "utf8",
);

console.log(`[static-routes] Generated ${routePaths.length} route documents and dist/404.html.`);
