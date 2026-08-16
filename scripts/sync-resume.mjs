import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const optional = args.includes("--optional");
const requestedSource = args.find((arg) => !arg.startsWith("--"));
const source = resolve(
    requestedSource || process.env.RESUME_TEX || "resume/resume.tex",
);
const output = resolve("public/resume.pdf");

if (!existsSync(source)) {
    const message = `Resume source not found at ${source}. Set RESUME_TEX or pass a .tex path.`;

    if (optional) {
        console.warn(`[resume] ${message} Skipping sync.`);
        process.exit(0);
    }

    console.error(`[resume] ${message}`);
    process.exit(1);
}

if (extname(source).toLowerCase() !== ".tex") {
    console.error(`[resume] Expected a LaTeX .tex source, received ${source}.`);
    process.exit(1);
}

const buildDirectory = join(
    tmpdir(),
    `shaurya-portfolio-resume-${Date.now()}`,
);

mkdirSync(buildDirectory, { recursive: true });

try {
    const result = spawnSync(
        "latexmk",
        [
            "-pdf",
            "-interaction=nonstopmode",
            "-halt-on-error",
            "-outdir",
            buildDirectory,
            source,
        ],
        { stdio: "inherit", shell: process.platform === "win32" },
    );

    if (result.error || result.status !== 0) {
        console.error(
            "[resume] LaTeX compilation failed. The existing public/resume.pdf was left unchanged.",
        );
        process.exit(result.status || 1);
    }

    const compiledPdf = join(
        buildDirectory,
        `${basename(source, extname(source))}.pdf`,
    );

    if (!existsSync(compiledPdf)) {
        console.error(
            `[resume] latexmk completed without producing ${compiledPdf}. The existing public/resume.pdf was left unchanged.`,
        );
        process.exit(1);
    }

    mkdirSync(dirname(output), { recursive: true });
    copyFileSync(compiledPdf, output);
    console.log(`[resume] Synced ${source} -> ${output}`);
} finally {
    for (const entry of readdirSync(buildDirectory)) {
        rmSync(join(buildDirectory, entry), { recursive: true, force: true });
    }
    rmSync(buildDirectory, { recursive: true, force: true });
}
