import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

test("the homepage leads with lablab.ai hackathons and keeps deeper portfolio paths reachable", async () => {
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

        assert.match(markup, /home-hackathons-title/);
        assert.match(markup, /AMD Developer Hackathon: ACT II/);
        assert.match(markup, /Alpaca AI Trading Agents Hackathon/);
        assert.match(markup, /IBM Bob 2\.0 Hackathon/);
        assert.equal((markup.match(/class="home-hackathon-item"/g) || []).length, 3);
        assert.match(markup, /href="\/certificates"/);
        assert.match(markup, /home-selected-work-title/);
        assert.match(markup, /home-curated-card--past-paper-ai/);
        assert.match(markup, /home-curated-card--f1-championship-prediction/);
        assert.match(markup, /home-curated-card--audio-recognition/);
        assert.match(markup, /home-exploration__summary/);
        assert.match(markup, /home-interlude-title/);
        assert.match(markup, /home-writing-title/);
        assert.match(markup, /home-skills-title/);
        assert.doesNotMatch(markup, /Four musical note pads|home-section--playground|Make a small/);

        const sectionOrder = [
            "home-hackathons-title",
            "home-selected-work-title",
            "home-exploration__summary",
            "home-interlude-title",
            "home-writing-title",
        ].map((marker) => markup.indexOf(marker));
        assert.ok(sectionOrder.every((position) => position >= 0));
        assert.deepEqual(sectionOrder, [...sectionOrder].sort((left, right) => left - right));
    } finally {
        await server.close();
    }
});
