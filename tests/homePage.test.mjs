import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

test("the homepage prominently features lablab.ai hackathons before its project and skills sections", async () => {
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

        const hackathonsIndex = markup.indexOf("home-section--hackathons");
        const workIndex = markup.indexOf("home-work-title");

        assert.ok(hackathonsIndex >= 0 && hackathonsIndex < workIndex);
        assert.match(markup, /AMD Developer Hackathon: ACT II/);
        assert.match(markup, /Alpaca AI Trading Agents Hackathon/);
        assert.match(markup, /IBM Bob 2\.0 Hackathon/);
        assert.match(markup, /href="\/certificates"/);
        assert.match(markup, /home-skills-title/);
        assert.doesNotMatch(markup, /Four musical note pads|home-section--playground|Make a small/);
    } finally {
        await server.close();
    }
});
