import { posts } from "../posts/index.js";
import { positioningStatement, profileLinks } from "./profileLinks.js";

export const SITE_URL = "https://shauryasaria.me";
export const PROFILE_IMAGE_URL = `${SITE_URL}/images/shaurya-portrait.jpeg`;
export const STRUCTURED_DATA_ID = "site-json-ld";

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;
const sameAs = profileLinks
    .filter((link) => ["github", "linkedin", "kaggle"].includes(link.key))
    .map((link) => link.href);

const pageMetadata = {
    "/": {
        title: "Shaurya Saria | Student Developer, AI & Data Science",
        description: positioningStatement,
        type: "website",
    },
    "/about": {
        title: "About Shaurya Saria | Student Developer in Bengaluru",
        description: "Learn how Shaurya Saria approaches machine-learning evaluation, full-stack products, and useful interfaces from Bengaluru.",
        type: "website",
    },
    "/projects": {
        title: "Projects | Shaurya Saria",
        description: "Explore Shaurya Saria's data-driven AI, machine-learning evaluation, audio, education, operations, and full-stack projects.",
        type: "website",
    },
    "/blog": {
        title: "Writing | Shaurya Saria",
        description: "Field notes from Shaurya Saria on building, studying, machine-learning systems, product decisions, and useful software.",
        type: "website",
    },
    "/contact": {
        title: "Contact Shaurya Saria | Student Developer",
        description: "Contact Shaurya Saria in Bengaluru about internships, research, AI and data products, or thoughtful full-stack collaborations.",
        type: "website",
    },
    "/uses": {
        title: "Uses | Shaurya Saria",
        description: "The tools, software, and working habits Shaurya Saria uses to build, study, evaluate models, and make useful interfaces.",
        type: "website",
    },
    "/artwork": {
        title: "Artwork | Shaurya Saria",
        description: "A visual archive of artwork and creative experiments by Shaurya Saria in Bengaluru.",
        type: "website",
    },
    "/certificates": {
        title: "Certificates | Shaurya Saria",
        description: "Selected certificates and learning milestones from Shaurya Saria's work across mathematics, data science, AI, and software.",
        type: "website",
    },
    "/achievements": {
        title: "Achievements | Shaurya Saria",
        description: "Selected competitions, recognitions, and academic milestones from Shaurya Saria's learning journey.",
        type: "website",
    },
};

export const seoRoutes = Object.keys(pageMetadata);

const postBySlug = new Map(posts.map((post) => [post.slug, post]));

function normalizePathname(pathname = "/") {
    if (!pathname || pathname === "/") {
        return "/";
    }

    const withoutTrailingSlash = pathname.replace(/\/+$/, "");
    return withoutTrailingSlash || "/";
}

function getCanonicalUrl(pathname) {
    return `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
}

function buildPerson() {
    return {
        "@type": "Person",
        "@id": personId,
        name: "Shaurya Saria",
        alternateName: "icecold009",
        url: SITE_URL,
        image: PROFILE_IMAGE_URL,
        description: positioningStatement,
        sameAs,
    };
}

export function buildStructuredData(metadata) {
    if (metadata.pathname === "/") {
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": websiteId,
                    url: SITE_URL,
                    name: metadata.title,
                    description: metadata.description,
                    publisher: { "@id": personId },
                },
                buildPerson(),
            ],
        };
    }

    if (metadata.pathname === "/about") {
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "ProfilePage",
                    "@id": `${metadata.canonical}#profile-page`,
                    url: metadata.canonical,
                    name: metadata.title,
                    description: metadata.description,
                    mainEntity: { "@id": personId },
                },
                buildPerson(),
            ],
        };
    }

    if (metadata.type === "article") {
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${metadata.canonical}#article`,
            url: metadata.canonical,
            headline: metadata.title,
            description: metadata.description,
            datePublished: metadata.publishedTime,
            author: { "@id": personId },
            image: PROFILE_IMAGE_URL,
            isPartOf: { "@id": websiteId },
        };
    }

    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${metadata.canonical}#webpage`,
        url: metadata.canonical,
        name: metadata.title,
        description: metadata.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
    };
}

export function getSeoMetadata(pathname = "/") {
    const normalizedPathname = normalizePathname(pathname);
    const postSlug = normalizedPathname.startsWith("/blog/")
        ? normalizedPathname.slice("/blog/".length)
        : null;
    const post = postSlug ? postBySlug.get(postSlug) : null;

    const metadata = post
        ? {
            pathname: normalizedPathname,
            title: `${post.title} | Shaurya Saria`,
            description: post.description,
            type: "article",
            publishedTime: `${post.date}T00:00:00Z`,
        }
        : pageMetadata[normalizedPathname] ?? {
            pathname: normalizedPathname,
            title: "Page not found | Shaurya Saria",
            description: "The requested page could not be found on Shaurya Saria's portfolio.",
            type: "website",
        };

    const completeMetadata = {
        ...metadata,
        pathname: normalizedPathname,
        canonical: getCanonicalUrl(normalizedPathname),
        image: PROFILE_IMAGE_URL,
        imageAlt: "Shaurya Saria",
    };

    return {
        ...completeMetadata,
        structuredData: buildStructuredData(completeMetadata),
    };
}
