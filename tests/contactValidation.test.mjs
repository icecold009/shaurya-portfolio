import assert from "node:assert/strict";
import test from "node:test";

import { validateContactForm } from "../src/lib/contactValidation.js";

test("contact validation accepts a useful complete message", () => {
    assert.deepEqual(validateContactForm({
        name: "Shaurya",
        email: "hello@example.com",
        message: "I would like to discuss a thoughtful project.",
    }), {});
});

test("contact validation reports field-level errors", () => {
    assert.deepEqual(validateContactForm({
        name: "",
        email: "not-an-email",
        message: "short",
    }), {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        message: "Please share a little more detail so I can respond usefully.",
    });
});
