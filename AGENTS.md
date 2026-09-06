## Codex package workflow

- Work only on a feature branch. Never edit or merge `main` directly.
- One bounded package uses one feature branch and one pull request.
- Before editing, inspect the current checkout, branch, remote, working tree, backlog, and existing PRs.
- Use the repository’s existing canonical backlog. Do not create duplicate TODO plans.
- Every package must define its goal, scope, non-goals, files, tests, acceptance criteria, and evidence.
- Preserve unrelated work and never discard dirty changes without explicit approval.
- Run the repository’s real verification commands and report exact results and commit SHA.
- Treat local checks, GitHub checks, reviews, hosted testing, deployment, and user-reported evidence as separate.
- Do not fabricate external evidence, live-provider results, deployment results, or review approval.
- Do not merge, deploy, publish, submit, or expose secrets without explicit user approval.
- After implementation, stop for independent ChatGPT validation before the next package.

## Model routing and delegation workflow

- **Astra planning lead:** When Astra is the active Codex model for a bounded plan or material decision, request one concise, bounded Gemini/Antigravity second opinion when the delegation path is available. Ask Gemini for alternatives, risks, and token-efficient recommendations; Astra remains responsible for the final plan.
- **Delegation gate:** Run the Antigravity availability check before the first delegation. Count Gemini as used only when the delegated response is non-empty, complete, well-formed, and addresses the requested constraints. A prompt-only `READY`, a truncated response, an unavailable CLI, or an auto-denied permission is not successful delegation.
- **Privacy boundary:** Do not send secrets, credentials, tokens, or private repository contents to Gemini unless the user has explicitly authorized that scope. If repository-specific context cannot be safely shared, use an abstract prompt and verify the repository locally in Codex.
- **Plan-to-implementation gate:** Do not begin implementation until the plan and Gemini second opinion have been synthesized and the plan is accepted. Keep all implementation on the feature branch; never modify or merge `main` directly.
- **Luna implementation preference:** After plan acceptance, select Luna with extra-high (`xhigh`) reasoning for implementation when the current Codex model/effort selector supports it. If the selector is unavailable or exposes a different supported value, do not claim Luna or extra-high was used; proceed with the configured model and record the fallback.
- **Independent verification:** Codex must inspect the diff and run the repository's real verification commands independently of Gemini or any implementation-agent report. Gemini is advisory and never substitutes for tests, review, browser evidence, hosted checks, deployment evidence, or user approval.
- **No blocking fallback:** If Gemini is unavailable or fails the delegation gate, record that fact and continue with Astra's plan when safe; do not use dangerous permission bypasses or recursive delegation.
