import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
    STRUCTURED_DATA_ID,
    getSeoMetadata,
} from "../lib/seoMetadata";

const metaDefinitions = [
    ["name", "description", (metadata) => metadata.description],
    ["property", "og:type", (metadata) => metadata.type],
    ["property", "og:url", (metadata) => metadata.canonical],
    ["property", "og:title", (metadata) => metadata.title],
    ["property", "og:description", (metadata) => metadata.description],
    ["property", "og:image", (metadata) => metadata.image],
    ["property", "og:image:alt", (metadata) => metadata.imageAlt],
    ["name", "twitter:card", () => "summary_large_image"],
    ["name", "twitter:title", (metadata) => metadata.title],
    ["name", "twitter:description", (metadata) => metadata.description],
    ["name", "twitter:image", (metadata) => metadata.image],
    ["name", "twitter:image:alt", (metadata) => metadata.imageAlt],
];

function upsertMeta(attribute, key, content) {
    let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
}

function upsertCanonical(href) {
    let element = document.head.querySelector('link[rel="canonical"]');

    if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        document.head.appendChild(element);
    }

    element.setAttribute("href", href);
}

function updateArticleMeta(metadata) {
    document.head
        .querySelectorAll('meta[property^="article:"]')
        .forEach((element) => element.remove());

    if (metadata.type !== "article") {
        return;
    }

    upsertMeta("property", "article:published_time", metadata.publishedTime);
}

export default function RouteMetadata() {
    const { pathname } = useLocation();

    useEffect(() => {
        const metadata = getSeoMetadata(pathname);

        document.title = metadata.title;
        metaDefinitions.forEach(([attribute, key, getContent]) => {
            upsertMeta(attribute, key, getContent(metadata));
        });
        upsertCanonical(metadata.canonical);
        updateArticleMeta(metadata);

        let structuredData = document.getElementById(STRUCTURED_DATA_ID);
        if (!structuredData) {
            structuredData = document.createElement("script");
            structuredData.id = STRUCTURED_DATA_ID;
            structuredData.type = "application/ld+json";
            document.head.appendChild(structuredData);
        }

        structuredData.textContent = JSON.stringify(metadata.structuredData);
    }, [pathname]);

    return null;
}
