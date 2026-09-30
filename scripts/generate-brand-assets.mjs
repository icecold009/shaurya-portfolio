import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(".");
const publicRoot = join(root, "public");
const faviconSource = join(publicRoot, "favicon.png");

await mkdir(publicRoot, { recursive: true });

for (const [filename, size] of [
    ["favicon-16.png", 16],
    ["favicon-32.png", 32],
    ["apple-touch-icon.png", 180],
    ["site-icon-192.png", 192],
    ["site-icon-512.png", 512],
]) {
    await sharp(faviconSource)
        .resize(size, size, { fit: "cover" })
        .png()
        .toFile(join(publicRoot, filename));
}

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0b1220" />
            <stop offset="0.58" stop-color="#13233e" />
            <stop offset="1" stop-color="#244d91" />
        </linearGradient>
        <radialGradient id="glow" cx="78%" cy="15%" r="70%">
            <stop offset="0" stop-color="#7da8ff" stop-opacity="0.42" />
            <stop offset="1" stop-color="#7da8ff" stop-opacity="0" />
        </radialGradient>
        <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" fill="none" stroke="#dbeafe" stroke-opacity="0.08" />
        </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#background)" />
    <rect width="1200" height="630" fill="url(#glow)" />
    <rect x="42" y="42" width="1116" height="546" rx="18" fill="url(#grid)" stroke="#dbeafe" stroke-opacity="0.2" />
    <circle cx="1010" cy="154" r="92" fill="#7da8ff" fill-opacity="0.16" />
    <circle cx="1010" cy="154" r="66" fill="none" stroke="#9abaff" stroke-opacity="0.5" />
    <path d="M958 154h104M1010 102v104" stroke="#dbeafe" stroke-opacity="0.32" />
    <text x="94" y="124" fill="#9abaff" font-family="Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="5">SHAURYA SARIA</text>
    <text x="94" y="294" fill="#f4f7fb" font-family="Arial, sans-serif" font-size="78" font-weight="700" letter-spacing="-3">Useful systems.</text>
    <text x="94" y="380" fill="#9abaff" font-family="Arial, sans-serif" font-size="78" font-weight="700" font-style="italic" letter-spacing="-3">Clearer work.</text>
    <text x="98" y="486" fill="#b7c4d9" font-family="Arial, sans-serif" font-size="27">AI, data, and full-stack tools built with human scale.</text>
    <text x="98" y="544" fill="#8d9bb2" font-family="monospace" font-size="18" letter-spacing="2">SHAURYASARIA.ME  /  PORTFOLIO</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicRoot, "og-image.png"));

console.log("[brand-assets] Generated favicons, install icons, and public/og-image.png.");
