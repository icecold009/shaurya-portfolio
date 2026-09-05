import { strict as assert } from "node:assert";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const script = join(root, "scripts", "sync-resume.mjs");

function runResume(source, ...args) {
    const environment = { ...process.env, RESUME_TEX: source };
    const result = spawnSync(process.execPath, [script, ...args], {
        cwd: root,
        encoding: "utf8",
        env: environment,
    });

    return {
        ...result,
        output: `${result.stdout ?? ""}${result.stderr ?? ""}`,
    };
}

test("optional resume sync skips a missing source", () => {
    const directory = mkdtempSync(join(tmpdir(), "shaurya-portfolio-resume-test-"));

    try {
        const result = runResume(join(directory, "missing.tex"), "--optional");

        assert.equal(result.status, 0);
        assert.match(result.output, /Skipping sync/);
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
});

test("resume sync rejects a present non-LaTeX source", () => {
    const directory = mkdtempSync(join(tmpdir(), "shaurya-portfolio-resume-test-"));

    try {
        const source = join(directory, "resume.txt");
        writeFileSync(source, "not a LaTeX document", "utf8");
        const result = runResume(source);

        assert.equal(result.status, 1);
        assert.match(result.output, /Expected a LaTeX \.tex source/);
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
});
