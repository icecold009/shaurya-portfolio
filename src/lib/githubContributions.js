const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const CONTRIBUTION_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
});

function asUtcDate(value) {
    if (value instanceof Date) {
        return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
    }

    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [year, month, day] = value.split("-").map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }

    return asUtcDate(new Date());
}

function addDays(date, amount) {
    return new Date(date.getTime() + amount * DAY_IN_MILLISECONDS);
}

function dateKey(date) {
    return date.toISOString().slice(0, 10);
}

function toContribution(record) {
    if (!record || typeof record.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(record.date)) {
        return null;
    }

    const count = Number(record.count);
    const level = Number(record.level);

    return {
        date: record.date,
        count: Number.isFinite(count) && count >= 0 ? Math.round(count) : 0,
        level: Number.isFinite(level) ? Math.max(0, Math.min(4, Math.round(level))) : 0,
    };
}

function formatMonth(date) {
    return MONTH_NAMES[date.getUTCMonth()];
}

export function buildContributionWeeks(contributions = [], endDate = new Date()) {
    const end = asUtcDate(endDate);
    const visibleStart = addDays(end, -364);
    const start = addDays(visibleStart, -visibleStart.getUTCDay());
    const visibleEnd = addDays(end, 6 - end.getUTCDay());
    const records = new Map(
        contributions
            .map(toContribution)
            .filter(Boolean)
            .map((record) => [record.date, record]),
    );
    const weeks = [];

    for (let weekStart = start; weekStart <= visibleEnd; weekStart = addDays(weekStart, 7)) {
        const days = Array.from({ length: 7 }, (_, index) => {
            const date = addDays(weekStart, index);
            const key = dateKey(date);
            const record = records.get(key);

            return record ?? {
                date: key,
                count: 0,
                level: 0,
            };
        });
        const monthStart = days.find((day) => day.date.endsWith("-01"));

        weeks.push({
            days,
            monthLabel: monthStart ? formatMonth(asUtcDate(monthStart.date)) : "",
        });
    }

    return weeks;
}

export function getLastYearTotal(payload) {
    const reportedTotal = Number(payload?.total?.lastYear);

    if (Number.isFinite(reportedTotal) && reportedTotal >= 0) {
        return Math.round(reportedTotal);
    }

    return (payload?.contributions ?? [])
        .map(toContribution)
        .filter(Boolean)
        .reduce((total, record) => total + record.count, 0);
}

export function formatContributionLabel(record) {
    const countLabel = record.count === 1 ? "1 contribution" : `${record.count} contributions`;
    const date = asUtcDate(record.date);
    const formattedDate = CONTRIBUTION_DATE_FORMATTER.format(date);

    return `${countLabel} on ${formattedDate}`;
}
