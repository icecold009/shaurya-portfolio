import { Suspense, lazy, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import NotFound from "../not-found/NotFound";
import { formatPostDate, posts } from "../../posts/index.js";

const postModules = {
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

export default function BlogPostPage() {
    const { slug } = useParams();
    const headingRef = useRef(null);
    const post = posts.find((candidate) => candidate.slug === slug);
    const Content = postModules[post?.slug];

    useEffect(() => {
        const focusFrame = window.requestAnimationFrame(() => {
            headingRef.current?.focus();
        });

        return () => window.cancelAnimationFrame(focusFrame);
    }, [slug]);

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

                <div className="blog-post-rail">
                    <Link to="/blog" className="blog-back">
                        <span aria-hidden="true">←</span> All writing
                    </Link>
                    <span>Essay / {post.tag}</span>
                    <span>{post.readingTime}</span>
                </div>

                <header className="blog-post-header">
                    <div className="blog-post-kicker">
                        <span>Writing / 2026</span>
                        <time dateTime={post.date} itemProp="datePublished">
                            {formatPostDate(post.date)}
                        </time>
                    </div>
                    <h1 ref={headingRef} tabIndex="-1" className="blog-post-title" itemProp="headline">
                        {post.title}
                    </h1>
                    <p className="blog-post-deck" itemProp="description">{post.description}</p>
                </header>

                <div className="blog-post-layout">
                    <aside className="blog-post-aside">
                        <span className="section-label">On this page</span>
                        <span className="blog-post-aside-rule" />
                        <span>{post.tag}</span>
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    </aside>
                    <div className="blog-post-body" itemProp="articleBody">
                        <Suspense
                            fallback={(
                                <div className="blog-loading" role="status" aria-live="polite">
                                    <span className="blog-loading__label">Loading essay</span>
                                    <span className="blog-loading__line blog-loading__line--long" aria-hidden="true" />
                                    <span className="blog-loading__line blog-loading__line--medium" aria-hidden="true" />
                                    <span className="blog-loading__line blog-loading__line--short" aria-hidden="true" />
                                    <span className="blog-loading__block" aria-hidden="true" />
                                </div>
                            )}
                        >
                            <Content />
                        </Suspense>
                    </div>
                </div>
            </article>
        </div>
    );
}
