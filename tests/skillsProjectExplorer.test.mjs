import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

test("the Python explorer renders a labeled fallback for projects without a thumbnail", async () => {
    const server = await createServer({
        appType: "custom",
        logLevel: "silent",
        server: { middlewareMode: true },
    });

    try {
        const { default: SkillsProjectExplorer } = await server.ssrLoadModule(
            "/src/components/SkillsProjectExplorer.jsx",
        );
        const originalConsoleError = console.error;
        let markup;

        try {
            console.error = (...args) => {
                if (!String(args[0]).includes("useLayoutEffect does nothing on the server")) {
                    originalConsoleError(...args);
                }
            };
            markup = renderToStaticMarkup(
                createElement(
                    MemoryRouter,
                    null,
                    createElement(SkillsProjectExplorer, { initialSkillId: "python" }),
                ),
            );
        } finally {
            console.error = originalConsoleError;
        }

        assert.match(markup, /No preview image available/);
        assert.match(markup, /aria-label="No project preview available for Student Dropout Risk Prediction"/);
        assert.match(markup, /Student Dropout Risk Prediction/);
        assert.match(markup, /Archive record/);
        assert.match(markup, /Repository link pending/);
        assert.equal((markup.match(/class="skills-project-card__cover-fallback"/g) ?? []).length, 1);
        assert.doesNotMatch(markup, /<img[^>]+src="null"/);
    } finally {
        await server.close();
    }
});
