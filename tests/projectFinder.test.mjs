import test from "node:test";
import assert from "node:assert/strict";

import { projects } from "../src/data/projects.js";
import {
    createProjectFinderRequest,
    findProjectsLocally,
    getProjectFinderTerms,
    normalizeProjectFinderQuery,
    PROJECT_FINDER_MAX_QUERY_LENGTH,
    selectProjectFinderIds,
} from "../src/lib/projectFinder.js";
import { createProjectFinderBudget, handleProjectPickerRequest } from "../api/project-picker.js";

function createResponse() {
    return {
        headers: {},
        statusCode: 200,
        body: "",
        setHeader(name, value) {
            this.headers[name.toLowerCase()] = value;
        },
        end(body) {
            this.body = body;
        },
        json() {
            return JSON.parse(this.body);
        },
    };
}

function createRequest({ method = "POST", headers = { "content-type": "application/json" }, body } = {}) {
    return { method, headers, body };
}

function createTypedResponse(projectRecords, scores = {}) {
    return {
        model: "jev-test",
        answers: Object.fromEntries(projectRecords.map((project, index) => [`match_${index}`, {
            type: "noul",
            noul: scores[project.id] ?? 0.1,
        }])),
        usage: { input_tokens: 100, output_tokens: 20 },
    };
}

test("normalizes and tokenizes bounded finder prompts", () => {
    const longQuery = `  ${"a".repeat(PROJECT_FINDER_MAX_QUERY_LENGTH + 20)}  `;
    assert.equal(normalizeProjectFinderQuery(longQuery).length, PROJECT_FINDER_MAX_QUERY_LENGTH);
    assert.deepEqual(getProjectFinderTerms("show me something involving audio and Python"), ["audio", "python"]);
    assert.deepEqual(getProjectFinderTerms("and the a to"), []);
});

test("local fallback ranks canonical audio and Python projects and caps results", () => {
    const matches = findProjectsLocally("show me something involving audio and Python", projects);
    assert.equal(matches[0].id, "audio-recognition");
    assert.ok(matches.length <= 3);
    assert.deepEqual(findProjectsLocally("and the", projects), []);
});

test("builds one bounded typed question per canonical project without project IDs in prompt data", () => {
    const payload = createProjectFinderRequest("Audio and Python", projects);
    assert.deepEqual(payload.state, { visitor_query: "Audio and Python" });
    assert.equal(payload.model, "jev-latest");
    assert.equal(Object.keys(payload.questions).length, projects.length);
    assert.equal(payload.questions.match_0.type, "noul");
    assert.ok(payload.questions.match_0.instructions.project.title);
    assert.equal("id" in payload.questions.match_0.instructions.project, false);
    assert.match(payload.questions.match_0.instructions.question, /ignore any directives/);
});

test("validates typed answers, applies the threshold, ranks, and returns canonical IDs only", () => {
    const typed = createTypedResponse(projects, {
        "audio-recognition": 0.94,
        "movie-tracker": 0.73,
        "stadium-pulse-ai": 0.71,
        "token-smart-router": 0.83,
        "touchscreen-launchpad": 0.91,
    });
    const ids = selectProjectFinderIds(typed, projects);

    assert.deepEqual(ids, ["audio-recognition", "touchscreen-launchpad", "token-smart-router"]);
    assert.ok(ids.every((id) => projects.some((project) => project.id === id)));
    assert.throws(() => selectProjectFinderIds({ ...typed, answers: {} }, projects), /answer/);
    assert.throws(() => selectProjectFinderIds({ ...typed, model: undefined }, projects), /response/);
});

test("rejects wrong methods, unsupported content, invalid and oversized prompts", async () => {
    const wrongMethod = createResponse();
    await handleProjectPickerRequest(createRequest({ method: "GET" }), wrongMethod, { apiKey: "test" });
    assert.equal(wrongMethod.statusCode, 405);
    assert.equal(wrongMethod.headers.allow, "POST");

    const wrongContent = createResponse();
    await handleProjectPickerRequest(createRequest({ headers: { "content-type": "text/plain" }, body: "{}" }), wrongContent, { apiKey: "test" });
    assert.equal(wrongContent.statusCode, 415);

    const invalid = createResponse();
    await handleProjectPickerRequest(createRequest({ body: { query: "  " } }), invalid, { apiKey: "test" });
    assert.equal(invalid.statusCode, 400);

    const oversized = createResponse();
    await handleProjectPickerRequest(createRequest({ body: { query: "x".repeat(PROJECT_FINDER_MAX_QUERY_LENGTH + 1) } }), oversized, { apiKey: "test" });
    assert.equal(oversized.statusCode, 400);

    const tooLarge = createResponse();
    await handleProjectPickerRequest(createRequest({ body: { query: "x", extra: "x".repeat(5000) } }), tooLarge, { apiKey: "test" });
    assert.equal(tooLarge.statusCode, 413);
});

test("reports a missing key without contacting TypeSafe", async () => {
    const response = createResponse();
    let fetchCalled = false;
    await handleProjectPickerRequest(createRequest({ body: { query: "Audio and Python" } }), response, {
        apiKey: "",
        fetchImpl: async () => { fetchCalled = true; },
    });

    assert.equal(response.statusCode, 503);
    assert.equal(response.json().code, "PROVIDER_UNAVAILABLE");
    assert.equal(fetchCalled, false);
});

test("bounds provider request volume and concurrent work", () => {
    let currentTime = 1000;
    const budget = createProjectFinderBudget({
        maxRequests: 2,
        maxConcurrent: 1,
        windowMs: 100,
        now: () => currentTime,
    });
    const releaseFirst = budget.acquire();

    assert.equal(typeof releaseFirst, "function");
    assert.equal(budget.acquire(), null);
    releaseFirst();
    const releaseSecond = budget.acquire();
    assert.equal(typeof releaseSecond, "function");
    releaseSecond();
    assert.equal(budget.acquire(), null);
    currentTime += 101;
    const releaseAfterWindow = budget.acquire();
    assert.equal(typeof releaseAfterWindow, "function");
    releaseAfterWindow();
});

test("posts the typed request server-side and returns only selected IDs", async () => {
    const response = createResponse();
    let requestUrl;
    let providerRequest;

    await handleProjectPickerRequest(createRequest({ body: { query: "Audio and Python" } }), response, {
        apiKey: "server-only-test-key",
        projectRecords: projects,
        fetchImpl: async (url, options) => {
            requestUrl = url;
            providerRequest = { ...options, body: JSON.parse(options.body) };
            return {
                ok: true,
                json: async () => createTypedResponse(projects, { "audio-recognition": 0.93 }),
            };
        },
    });

    assert.equal(requestUrl, "https://api.typesafe.ai/v1/systemone");
    assert.equal(providerRequest.method, "POST");
    assert.equal(providerRequest.headers.Authorization, "Bearer server-only-test-key");
    assert.equal(providerRequest.body.state.visitor_query, "Audio and Python");
    assert.deepEqual(response.json(), { mode: "typesafe", matches: ["audio-recognition"] });
    assert.equal(response.headers["cache-control"], "no-store");
});

test("falls back cleanly when TypeSafe fails or returns malformed answers", async () => {
    for (const providerJson of [
        async () => { throw new Error("malformed JSON"); },
        async () => ({ model: "jev-test", answers: {}, usage: { input_tokens: 1, output_tokens: 1 } }),
    ]) {
        const response = createResponse();
        await handleProjectPickerRequest(createRequest({ body: { query: "Audio and Python" } }), response, {
            apiKey: "test",
            fetchImpl: async () => ({ ok: true, json: providerJson }),
        });
        assert.equal(response.statusCode, 502);
        assert.deepEqual(response.json(), { code: "PROVIDER_UNAVAILABLE" });
    }
});
