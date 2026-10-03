import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

test("the homepage keeps its project and skills sections without the audio pads", async () => {
    const server = await createServer({
        appType: "custom",
        logLevel: "silent",
        server: { middlewareMode: true },
    });

    try {
        const { default: Home } = await server.ssrLoadModule("/src/pages/home/Home.jsx");
        const originalConsoleError = console.error;
        let markup;

        try {
            console.error = (...args) => {
                if (!String(args[0]).includes("useLayoutEffect does nothing on the server")) {
                    originalConsoleError(...args);
                }
            };
            markup = renderToStaticMarkup(
                createElement(MemoryRouter, null, createElement(Home)),
            );
        } finally {
            console.error = originalConsoleError;
        }

        assert.match(markup, /home-work-title/);
        assert.match(markup, /home-skills-title/);
        assert.doesNotMatch(markup, /Four musical note pads|home-section--playground|Make a small/);
    } finally {
        await server.close();
    }
});
