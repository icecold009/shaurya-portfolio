import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "vite";

import { projects } from "../src/data/projects.js";

test("compares two saved projects using their recorded fields and available links", async () => {
    const server = await createServer({
        appType: "custom",
        logLevel: "silent",
        server: { middlewareMode: true },
    });

    try {
        const { default: ProjectComparison } = await server.ssrLoadModule(
            "/src/components/ProjectComparison.jsx",
        );
        const savedIds = ["stadium-pulse-ai", "audio-recognition", "past-paper-ai"];
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
                    { initialEntries: ["/projects?q=Python&tag=AI&saved=1&lens=admissions"] },
                    createElement(ProjectComparison, { shortlistIds: savedIds, projectRecords: projects }),
                ),
            );
        } finally {
            console.error = originalConsoleError;
        }
        const stadium = projects.find((project) => project.id === "stadium-pulse-ai");
        const audio = projects.find((project) => project.id === "audio-recognition");

        assert.match(markup, /First saved project/);
        assert.match(markup, /Second saved project/);
        assert.match(markup, /value="stadium-pulse-ai"/);
        assert.match(markup, /value="audio-recognition"/);
        assert.doesNotMatch(markup, /value="movie-tracker"/);
        assert.ok(markup.includes(stadium.problem));
        assert.ok(markup.includes(stadium.architectureNote));
        assert.match(markup, /No separate architecture note is recorded/);
        assert.ok(markup.includes(stadium.decisions.replaceAll("'", "&#x27;")));
        assert.ok(markup.includes(audio.limitations));
        assert.match(markup, /React/);
        assert.match(markup, /Open architecture diagram/);
        const detailHrefs = [...markup.matchAll(/href="(\/projects\?[^\"]*)"/g)]
            .map((match) => match[1].replaceAll("&amp;", "&"));
        const detailParams = detailHrefs.map((href) => new URL(href, "https://portfolio.example").searchParams);
        assert.equal(detailParams.length, 2);
        for (const params of detailParams) {
            assert.equal(params.get("q"), "Python");
            assert.equal(params.get("tag"), "AI");
            assert.equal(params.get("saved"), "1");
            assert.equal(params.get("lens"), "admissions");
        }
        assert.deepEqual(detailParams.map((params) => params.get("project")), ["stadium-pulse-ai", "audio-recognition"]);
        assert.match(markup, /Comparing StadiumPulse AI with Audio Recognition/);
    } finally {
        await server.close();
    }
});
