import { projects } from "../src/data/projects.js";
import {
    createProjectFinderRequest,
    normalizeProjectFinderQuery,
    PROJECT_FINDER_MAX_QUERY_LENGTH,
    selectProjectFinderIds,
} from "../src/lib/projectFinder.js";

const MAX_BODY_BYTES = 4096;
const TYPESAFE_ENDPOINT = "https://api.typesafe.ai/v1/systemone";
const PROVIDER_TIMEOUT_MS = 8000;
const providerBudget = createProjectFinderBudget();

export function createProjectFinderBudget({
    maxRequests = 20,
    maxConcurrent = 3,
    windowMs = 60_000,
    now = () => Date.now(),
} = {}) {
    const requestTimes = [];
    let activeRequests = 0;

    return {
        acquire() {
            const currentTime = now();
            while (requestTimes.length && requestTimes[0] <= currentTime - windowMs) {
                requestTimes.shift();
            }
            if (requestTimes.length >= maxRequests || activeRequests >= maxConcurrent) {
                return null;
            }

            requestTimes.push(currentTime);
            activeRequests += 1;
            return () => { activeRequests = Math.max(0, activeRequests - 1); };
        },
    };
}

function sendJson(response, statusCode, payload) {
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.end(JSON.stringify(payload));
}

function parseBodyValue(value) {
    if (typeof value === "string") {
        return JSON.parse(value);
    }
    return value;
}

async function readRequestBody(request) {
    if (request.body !== undefined) {
        const serialized = typeof request.body === "string"
            ? request.body
            : JSON.stringify(request.body);
        if (Buffer.byteLength(serialized ?? "", "utf8") > MAX_BODY_BYTES) {
            throw Object.assign(new Error("Request body too large."), { statusCode: 413 });
        }
        return parseBodyValue(serialized);
    }

    const chunks = [];
    let byteLength = 0;
    for await (const chunk of request) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        byteLength += buffer.length;
        if (byteLength > MAX_BODY_BYTES) {
            throw Object.assign(new Error("Request body too large."), { statusCode: 413 });
        }
        chunks.push(buffer);
    }

    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function handleProjectPickerRequest(request, response, {
    apiKey = process.env.TYPESAFE_API_KEY,
    fetchImpl = fetch,
    projectRecords = projects,
    budget = providerBudget,
} = {}) {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");

    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { code: "METHOD_NOT_ALLOWED" });
    }

    const mediaType = String(request.headers?.["content-type"] ?? "")
        .split(";", 1)[0]
        .trim()
        .toLowerCase();
    if (mediaType !== "application/json") {
        return sendJson(response, 415, { code: "JSON_REQUIRED" });
    }

    let body;
    try {
        body = await readRequestBody(request);
    } catch (error) {
        return sendJson(response, error.statusCode ?? 400, {
            code: error.statusCode === 413 ? "BODY_TOO_LARGE" : "INVALID_JSON",
        });
    }

    const query = normalizeProjectFinderQuery(body?.query);
    if (!query || body.query.length > PROJECT_FINDER_MAX_QUERY_LENGTH) {
        return sendJson(response, 400, { code: "INVALID_QUERY" });
    }

    if (!apiKey) {
        return sendJson(response, 503, { code: "PROVIDER_UNAVAILABLE" });
    }

    const releaseBudget = budget.acquire();
    if (!releaseBudget) {
        response.setHeader("Retry-After", "60");
        return sendJson(response, 429, { code: "RATE_LIMITED" });
    }

    let timer;
    try {
        const controller = new AbortController();
        timer = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
        const providerResponse = await fetchImpl(TYPESAFE_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createProjectFinderRequest(query, projectRecords)),
            signal: controller.signal,
        });

        if (!providerResponse.ok) {
            return sendJson(response, 502, { code: "PROVIDER_UNAVAILABLE" });
        }

        const typedResponse = await providerResponse.json();
        const matches = selectProjectFinderIds(typedResponse, projectRecords);
        return sendJson(response, 200, { mode: "typesafe", matches });
    } catch {
        return sendJson(response, 502, { code: "PROVIDER_UNAVAILABLE" });
    } finally {
        clearTimeout(timer);
        releaseBudget();
    }
}

export default function projectPicker(request, response) {
    return handleProjectPickerRequest(request, response);
}
