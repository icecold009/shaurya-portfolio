import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(".");
const publicRoot = resolve(root, "public");
const failures = [];
const assetReferences = new Map();
const assetExtensions = new Set([
    ".gif",
    ".ico",
    ".jpeg",
    ".jpg",
    ".pdf",
    ".png",
    ".svg",
    ".webm",
    ".webp",
    ".woff",
    ".woff2",
]);

function collectTextFiles(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const filePath = join(directory, entry.name);

        if (entry.isDirectory()) {
            return collectTextFiles(filePath);
        }

        return /\.(html|js|jsx|mdx|css)$/.test(entry.name) ? [filePath] : [];
    });
}

function recordAssetReferences(filePath) {
    const source = readFileSync(filePath, "utf8");
    const relativePath = filePath.slice(root.length + 1);

    for (const match of source.matchAll(/["'`](\/[^"'`\s]*)["'`]/g)) {
        const rawPath = match[1];
        const assetPath = rawPath.split(/[?#]/, 1)[0];

        if (!assetExtensions.has(extname(assetPath).toLowerCase())) {
            continue;
        }

        const references = assetReferences.get(assetPath) ?? [];
        references.push(relativePath);
        assetReferences.set(assetPath, references);
    }
}

for (const filePath of [...collectTextFiles(join(root, "src")), join(root, "index.html")]) {
    recordAssetReferences(filePath);
}

for (const [assetPath, references] of assetReferences) {
    const target = resolve(publicRoot, `.${assetPath}`);

    if (!target.startsWith(publicRoot) || !existsSync(target)) {
        failures.push(`Missing asset ${assetPath} referenced by ${references.join(", ")}`);
    }
}

const routesSource = readFileSync(join(root, "src", "app", "AnimatedRoutes.jsx"), "utf8");
const routes = [...routesSource.matchAll(/<Route\b[^>]*\bpath\s*=\s*["']([^"']+)["']/g)].map(
    (match) => match[1],
);
const expectedRoutes = [
    "/",
    "/projects",
    "/about",
    "/blog",
    "/contact",
    "/uses",
    "/artwork",
    "/certificates",
    "/achievements",
];

for (const route of expectedRoutes) {
    if (!routes.includes(route)) {
        failures.push(`Missing expected route ${route}`);
    }
}

if (!routes.includes("*")) {
    failures.push("Missing wildcard not-found route");
}

if (new Set(routes).size !== routes.length) {
    failures.push("Duplicate route path found in AnimatedRoutes.jsx");
}

const { projects } = await import(pathToFileURL(join(root, "src", "data", "projects.js")).href);
const { artworkPieces } = await import(pathToFileURL(join(root, "src", "data", "artwork.js")).href);

function checkUniqueIds(records, label) {
    const ids = records.map((record) => record.id);

    if (new Set(ids).size !== ids.length) {
        failures.push(`Duplicate ${label} identifier found`);
    }
}

checkUniqueIds(projects, "project");
checkUniqueIds(artworkPieces, "artwork");

for (const project of projects) {
    for (const field of ["problem", "contribution", "outcome", "limitations", "status"]) {
        if (!project[field]) {
            failures.push(`Project ${project.id} is missing ${field} evidence context`);
        }
    }

    if (project.github && !/^https:\/\/github\.com\//.test(project.github)) {
        failures.push(`Project ${project.id} has an unexpected repository URL`);
    }
}

if (failures.length > 0) {
    console.error(`[integrity] ${failures.length} issue(s) found.`);
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

console.log(
    `[integrity] Checked ${assetReferences.size} local assets, ${routes.length} routes, ${projects.length} projects, and ${artworkPieces.length} artwork records.`,
);
