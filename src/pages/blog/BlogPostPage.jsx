import { Suspense, lazy } from "react";

import { formatPostDate } from "../../posts/index.js";

const postModules = {
    "shazam-clone": lazy(() => import("../../posts/shazam-clone.mdx")),
    "birdclef-2026": lazy(() => import("../../posts/birdclef-2026.mdx")),
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

export default function BlogPostPage({ post, onBack }) {
    const Content = postModules[post.slug];

    return (
        <section className="blog-post" id="blog">
            <div className="blog-post-rail">
                <button className="blog-back" onClick={onBack}>
                    <span aria-hidden="true">←</span> All writing
                </button>
                <span>Essay / {post.tag}</span>
                <span>{post.readingTime}</span>
            </div>

            <header className="blog-post-header">
                <div className="blog-post-kicker">
                    <span>Writing / 2026</span>
                    <span>{formatPostDate(post.date)}</span>
                </div>
                <h1 className="blog-post-title">{post.title}</h1>
                <p className="blog-post-deck">{post.excerpt}</p>
            </header>

            <div className="blog-post-layout">
                <aside className="blog-post-aside">
                    <span className="section-label">On this page</span>
                    <span className="blog-post-aside-rule" />
                    <span>{post.tag}</span>
                    <span>{formatPostDate(post.date)}</span>
                </aside>
                <div className="blog-post-body">
                    <Suspense fallback={<p className="blog-loading">Loading essay...</p>}>
                        <Content />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
