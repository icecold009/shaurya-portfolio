import test from "node:test";
import assert from "node:assert/strict";

import {
    buildContributionWeeks,
    formatContributionLabel,
    getLastYearTotal,
} from "../src/lib/githubContributions.js";

test("builds a Sunday-to-Saturday calendar with month labels", () => {
    const weeks = buildContributionWeeks([
        { date: "2026-09-01", count: 3, level: 2 },
    ], "2026-09-05");

    assert.equal(weeks.length, 53);
    assert.equal(weeks[0].days[1].date, "2025-09-01");
    assert.equal(weeks[0].days[1].count, 0);
    assert.equal(weeks[52].days[2].date, "2026-09-01");
    assert.equal(weeks[52].days[2].count, 3);
    assert.equal(weeks[52].days[2].level, 2);
    assert.equal(weeks[0].monthLabel, "Sep");
    assert.equal(weeks[4].monthLabel, "Oct");
});

test("normalizes invalid contribution values and calculates a fallback total", () => {
    const weeks = buildContributionWeeks([
        { date: "2026-09-01", count: 2.8, level: 8 },
        { date: "2026-09-02", count: -4, level: -1 },
        { date: "2026-09-03", count: "bad", level: "bad" },
    ], "2026-09-05");

    assert.equal(weeks[52].days[2].count, 3);
    assert.equal(weeks[52].days[2].level, 4);
    assert.equal(weeks[52].days[3].count, 0);
    assert.equal(weeks[52].days[3].level, 0);
    assert.equal(getLastYearTotal({ contributions: [{ date: "2026-09-01", count: 3, level: 2 }] }), 3);
    assert.equal(getLastYearTotal({ total: { lastYear: 18 }, contributions: [] }), 18);
});

test("formats an accessible day label with singular and plural grammar", () => {
    assert.equal(
        formatContributionLabel({ date: "2026-09-01", count: 1 }),
        "1 contribution on September 1, 2026",
    );
    assert.equal(
        formatContributionLabel({ date: "2026-09-02", count: 4 }),
        "4 contributions on September 2, 2026",
    );
});
