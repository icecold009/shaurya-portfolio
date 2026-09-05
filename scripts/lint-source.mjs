import { readdirSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve(".");
const sourceRoot = join(root, "src");
const textExtensions = new Set([".css", ".js", ".jsx", ".mdx"]);
const failures = [];
let checkedFiles = 0;

function collectFiles(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const filePath = join(directory, entry.name);

        if (entry.isDirectory()) {
            return collectFiles(filePath);
        }

        return textExtensions.has(extname(entry.name).toLowerCase())
            ? [filePath]
            : [];
    });
}

for (const filePath of collectFiles(sourceRoot)) {
    checkedFiles += 1;
    const relativePath = filePath.slice(root.length + 1);
    const source = readFileSync(filePath, "utf8");

    if (source.includes("—")) {
        failures.push(`${relativePath}: contains an em dash (U+2014)`);
    }

    for (const match of source.matchAll(/<img\b[^>]*>/gis)) {
        if (!/\balt\s*=/.test(match[0])) {
            failures.push(`${relativePath}: image is missing an alt attribute`);
        }
    }

    for (const match of source.matchAll(/<a\b[^>]*target\s*=\s*["']_blank["'][^>]*>/gis)) {
        if (!/\brel\s*=\s*["'][^"']*(?:noopener|noreferrer)/i.test(match[0])) {
            failures.push(`${relativePath}: target=_blank link is missing noopener/noreferrer`);
        }
    }
}

if (failures.length > 0) {
    console.error(`[lint] ${failures.length} issue(s) found.`);
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

console.log(`[lint] Checked ${checkedFiles} source files with no issues.`);
