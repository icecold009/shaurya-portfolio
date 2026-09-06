import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(join(root, "index.html"), "utf8");
const inlineScript = html.match(/<script>\s*\(\(\) => \{[\s\S]*?\}\)\(\);\s*<\/script>/)?.[0];

assert.ok(inlineScript, "index.html should contain the inline intro loader script");

const scriptSource = inlineScript
    .replace(/^<script>\s*/, "")
    .replace(/\s*<\/script>$/, "");
const introKey = "shaurya-portfolio:hello-intro-seen-v4";

function createClassList() {
    const values = new Set();

    return {
        add(...names) {
            names.forEach((name) => values.add(name));
        },
        contains(name) {
            return values.has(name);
        },
    };
}

function createStyle() {
    return {
        removeProperty(name) {
            delete this[name];
        },
    };
}

function createHarness({ search = "", sessionSeen = false, reducedMotion = false } = {}) {
    let now = 0;
    const rafQueue = [];
    const timerQueue = [];
    const events = {};
    const storage = new Map(sessionSeen ? [[introKey, "1"]] : []);
    let setCalls = 0;

    const sessionStorage = {
        getItem(key) {
            return storage.get(key) ?? null;
        },
        setItem(key, value) {
            setCalls += 1;
            storage.set(key, String(value));
        },
    };
    const helloPath = { style: createStyle() };
    const skipButton = {
        addEventListener(type, callback) {
            events[`skip:${type}`] = callback;
        },
    };
    const loader = {
        classList: createClassList(),
        contains() {
            return false;
        },
        querySelector(selector) {
            return selector === ".app-loader__hello-path" ? helloPath : skipButton;
        },
        remove() {
            events.loaderRemoved = true;
        },
        style: createStyle(),
    };
    const rootElement = {
        classList: createClassList(),
        style: createStyle(),
    };
    const document = {
        activeElement: null,
        getElementById(id) {
            if (id === "app-loader") return loader;
            if (id === "root") return rootElement;
            return null;
        },
    };
    const window = {
        cancelAnimationFrame() {},
        location: { search },
        matchMedia() {
            return { matches: reducedMotion };
        },
        performance: {
            now() {
                return now;
            },
        },
        requestAnimationFrame(callback) {
            rafQueue.push(callback);
            return rafQueue.length;
        },
        sessionStorage,
        setTimeout(callback, delay) {
            timerQueue.push({ callback, delay });
            return timerQueue.length;
        },
        addEventListener(type, callback) {
            events[`window:${type}`] = callback;
        },
    };

    Object.defineProperty(window, "localStorage", {
        get() {
            assert.fail("the intro loader must not read localStorage");
        },
    });

    vm.runInNewContext(scriptSource, { document, URLSearchParams, window }, { filename: "index.html" });

    return {
        events,
        flushAnimationFrame(timestamp) {
            now = timestamp;
            const callbacks = rafQueue.splice(0);
            callbacks.forEach((callback) => callback(timestamp));
        },
        flushTimers() {
            const timers = timerQueue.splice(0);
            timers.forEach(({ callback, delay }) => {
                now += delay;
                callback();
            });
        },
        helloPath,
        loader,
        rootElement,
        sessionStorage,
        setCalls: () => setCalls,
        storage,
        window,
    };
}

function completeAnimatedIntro(harness) {
    harness.window.__appLoaderAppReady();
    harness.flushAnimationFrame(0);
    harness.flushAnimationFrame(5000);
    const halfwayOffset = harness.helloPath.style.strokeDashoffset;
    harness.flushAnimationFrame(10000);
    harness.flushAnimationFrame(10500);
    return halfwayOffset;
}

test("plays the intro in a fresh session and remembers it in sessionStorage", () => {
    const harness = createHarness();

    const halfwayOffset = completeAnimatedIntro(harness);

    assert.equal(halfwayOffset, "685px");
    assert.equal(harness.storage.get(introKey), "1");
    assert.equal(harness.setCalls(), 1);
    assert.equal(harness.events.loaderRemoved, true);
    assert.equal(harness.rootElement.classList.contains("app-loader__site-visible"), true);
});

test("skips the intro when the current session has already seen it", () => {
    const harness = createHarness({ sessionSeen: true });

    harness.window.__appLoaderAppReady();

    assert.equal(harness.events.loaderRemoved, true);
    assert.equal(harness.setCalls(), 1);
    assert.equal(harness.loader.classList.contains("app-loader--hidden"), true);
});

test("forced animation replays without changing the session flag", () => {
    const harness = createHarness({ search: "?intro=animate", sessionSeen: true });

    const halfwayOffset = completeAnimatedIntro(harness);

    assert.equal(halfwayOffset, "685px");
    assert.equal(harness.setCalls(), 0);
    assert.equal(harness.storage.get(introKey), "1");
});

test("reduced motion completes without drawing the animated path", () => {
    const harness = createHarness({ reducedMotion: true });

    harness.window.__appLoaderAppReady();
    harness.flushTimers();
    harness.flushTimers();

    assert.equal(harness.helloPath.style.strokeDashoffset, undefined);
    assert.equal(harness.storage.get(introKey), "1");
    assert.equal(harness.events.loaderRemoved, true);
});
