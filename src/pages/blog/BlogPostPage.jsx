import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import NotFound from "../not-found/NotFound";
import { formatPostDate, posts, writingPeriodLabel } from "../../posts/index.js";

const postModules = {
    "study-progress-that-survives-refresh": lazy(() =>
        import("../../posts/study-progress-that-survives-refresh.mdx")
    ),
    "baseline-can-be-the-result": lazy(() =>
        import("../../posts/baseline-can-be-the-result.mdx")
    ),
    "past-papers-need-a-pipeline": lazy(() =>
        import("../../posts/past-papers-need-a-pipeline.mdx")
    ),
    "prediction-needs-context": lazy(() =>
        import("../../posts/prediction-needs-context.mdx")
    ),
    "patterns-to-practice-2025": lazy(() =>
        import("../../posts/patterns-to-practice-2025.mdx")
    ),
    "shazam-clone": lazy(() => import("../../posts/shazam-clone.mdx")),
    "shipping-is-a-design-decision": lazy(() =>
        import("../../posts/shipping-is-a-design-decision.mdx")
    ),
    "designing-for-the-fallback": lazy(() =>
        import("../../posts/designing-for-the-fallback.mdx")
    ),
    "data-products-need-honesty": lazy(() =>
        import("../../posts/data-products-need-honesty.mdx")
    ),
    "30-days-of-ai": lazy(() => import("../../posts/30-days-of-ai.mdx")),
    "smallest-useful-version": lazy(() =>
        import("../../posts/smallest-useful-version.mdx")
    ),
};

function slugifyHeading(value) {
    return value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function collectArticleHeadings(container) {
    const usedIds = new Set();

    return Array.from(container.querySelectorAll("h2, h3"))
        .map((heading, index) => {
            const title = heading.textContent.trim();
            const baseId = heading.id || slugifyHeading(title) || `section-${index + 1}`;
            let id = baseId;
            let suffix = 2;

            while (usedIds.has(id)) {
                id = `${baseId}-${suffix}`;
                suffix += 1;
            }

            usedIds.add(id);
            heading.id = id;

            return {
                id,
                level: Number(heading.tagName.slice(1)),
                title,
            };
        });
}

function ArticleLoadingState() {
    return (
        <div className="blog-loading" role="status" aria-live="polite">
            <span className="blog-loading__label">Loading essay</span>
            <span className="blog-loading__line blog-loading__line--long" aria-hidden="true" />
            <span className="blog-loading__line blog-loading__line--medium" aria-hidden="true" />
            <span className="blog-loading__line blog-loading__line--short" aria-hidden="true" />
            <span className="blog-loading__block" aria-hidden="true" />
        </div>
    );
}

export default function BlogPostPage() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const headingRef = useRef(null);
    const bodyRef = useRef(null);
    const [outline, setOutline] = useState([]);
    const [readingProgress, setReadingProgress] = useState(0);
    const post = posts.find((candidate) => candidate.slug === slug);
    const Content = postModules[post?.slug];
    const postIndex = posts.findIndex((candidate) => candidate.slug === slug);
    const newerPost = postIndex > 0 ? posts[postIndex - 1] : null;
    const earlierPost = postIndex >= 0 ? posts[postIndex + 1] ?? null : null;
    const returnToArchive = location.state?.from ?? "/blog";
    const progressStyle = useMemo(
        () => ({ transform: `scaleX(${readingProgress / 100})` }),
        [readingProgress],
    );

    useEffect(() => {
        const focusFrame = window.requestAnimationFrame(() => {
            headingRef.current?.focus();
        });

        return () => window.cancelAnimationFrame(focusFrame);
    }, [slug]);

    useEffect(() => {
        const container = bodyRef.current;
        if (!container) {
            return undefined;
        }

        const refreshOutline = () => {
            const nextOutline = collectArticleHeadings(container);
            setOutline(nextOutline);
        };
        const observer = new MutationObserver(refreshOutline);
        observer.observe(container, { childList: true, characterData: true, subtree: true });
        refreshOutline();

        return () => observer.disconnect();
    }, [slug, Content]);

    useEffect(() => {
        const container = bodyRef.current;
        if (!container) {
            return undefined;
        }

        let frame = null;
        const updateProgress = () => {
            if (frame !== null) {
                return;
            }

            frame = window.requestAnimationFrame(() => {
                const top = container.getBoundingClientRect().top + window.scrollY;
                const readableHeight = Math.max(1, container.offsetHeight - window.innerHeight * 0.68);
                const readingPosition = window.scrollY + window.innerHeight * 0.32 - top;
                const nextProgress = Math.max(0, Math.min(100, Math.round((readingPosition / readableHeight) * 100)));
                setReadingProgress(nextProgress);
                frame = null;
            });
        };

        const resizeObserver = new ResizeObserver(updateProgress);
        resizeObserver.observe(container);
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
        updateProgress();

        return () => {
            if (frame !== null) {
                window.cancelAnimationFrame(frame);
            }

            resizeObserver.disconnect();
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, [slug, Content]);

    if (!post || !Content) {
        return <NotFound />;
    }

    return (
        <div className="page-wrapper blog-page-shell">
            <article
                className="blog-post"
                id="blog"
                itemScope
                itemType="https://schema.org/Article"
            >
                <meta itemProp="headline" content={post.title} />
                <meta itemProp="description" content={post.description} />
                <meta itemProp="datePublished" content={post.date} />
                <meta itemProp="author" content="Shaurya Saria" />

                <div className="blog-reading-progress" aria-hidden="true">
                    <span className="blog-reading-progress__fill" style={progressStyle} />
                </div>

                <div className="blog-post-rail">
                    <Link to={returnToArchive} className="blog-back">
                        <ArrowLeft size={15} aria-hidden="true" /> All writing
                    </Link>
                    <span>{post.periodLabel ?? `Essay / ${post.tag}`}</span>
                    <span>{post.readingTime}</span>
                </div>

                <header className="blog-post-header">
                    <div className="blog-post-kicker">
                        <span>Writing / {writingPeriodLabel}</span>
                        <time dateTime={post.date} itemProp="datePublished">
                            Published {formatPostDate(post.date)}
                        </time>
                    </div>
                    <h1 ref={headingRef} tabIndex="-1" className="blog-post-title" itemProp="headline">
                        {post.title}
                    </h1>
                    <p className="blog-post-deck" itemProp="description">{post.description}</p>
                </header>

                <div className="blog-post-layout">
                    <aside className="blog-post-aside">
                        <div className="blog-post-metadata">
                            <span className="section-label">{post.periodLabel ? "Period covered" : "Topic"}</span>
                            <span className="blog-post-aside-rule" />
                            <span>{post.periodLabel ?? post.tag}</span>
                            <span className="section-label blog-post-aside-published">Published</span>
                            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        </div>

                        {outline.length > 0 && (
                            <nav className="blog-toc" aria-label="Article contents">
                                <p className="section-label">In this essay</p>
                                <ol>
                                    {outline.map((item) => (
                                        <li
                                            className={item.level === 3 ? "blog-toc__subitem" : undefined}
                                            key={item.id}
                                        >
                                            <a
                                                href={`#${item.id}`}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    navigate(`${location.pathname}#${item.id}`, {
                                                        state: location.state,
                                                        preventScrollReset: true,
                                                    });
                                                    document.getElementById(item.id)?.scrollIntoView({
                                                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                                                            ? "auto"
                                                            : "smooth",
                                                        block: "start",
                                                    });
                                                }}
                                            >
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        )}
                    </aside>

                    <div className="blog-post-body" itemProp="articleBody" ref={bodyRef}>
                        <Suspense fallback={<ArticleLoadingState />}>
                            <Content />
                        </Suspense>
                    </div>
                </div>

                <footer className="blog-post-footer">
                    <div className="blog-post-footer-heading">
                        <span className="section-label">Keep reading</span>
                        <Link to={returnToArchive}>Browse all writing</Link>
                    </div>
                    <nav className="blog-neighbor-nav" aria-label="More essays">
                        {earlierPost ? (
                            <Link
                                className="blog-neighbor-card"
                                to={`/blog/${earlierPost.slug}`}
                                state={location.state}
                            >
                                <span><ArrowLeft size={15} aria-hidden="true" /> Earlier essay</span>
                                <strong>{earlierPost.title}</strong>
                                <small>{earlierPost.readingTime}</small>
                            </Link>
                        ) : <span className="blog-neighbor-card blog-neighbor-card--empty" />}
                        {newerPost ? (
                            <Link
                                className="blog-neighbor-card blog-neighbor-card--newer"
                                to={`/blog/${newerPost.slug}`}
                                state={location.state}
                            >
                                <span>Newer essay <ArrowRight size={15} aria-hidden="true" /></span>
                                <strong>{newerPost.title}</strong>
                                <small>{newerPost.readingTime}</small>
                            </Link>
                        ) : <span className="blog-neighbor-card blog-neighbor-card--empty" />}
                    </nav>
                </footer>
            </article>
        </div>
    );
}
