import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(".");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const checks = ["lint", "test", "verify:assets", "build"];

for (const check of checks) {
    console.log(`\n[verify] Running npm run ${check}`);
    const command = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : npm;
    const args = process.platform === "win32"
        ? ["/d", "/s", "/c", `${npm} run ${check}`]
        : ["run", check];
    const result = spawnSync(command, args, {
        cwd: root,
        stdio: "inherit",
    });

    if (result.error || result.status !== 0) {
        console.error(`[verify] Failed at npm run ${check}.`);
        process.exit(result.status || 1);
    }
}

console.log("\n[verify] All quality gates passed.");
