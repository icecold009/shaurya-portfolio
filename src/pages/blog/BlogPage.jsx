import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import {
    getPostFromSearchParams,
    updatePostSearchParams,
} from "../../lib/blogSelection";
import { formatPostDate, posts } from "../../posts/index.js";
import BlogPostPage from "./BlogPostPage";

function openOnKeyboard(event, onOpen) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpen(event.currentTarget);
    }
}

function BlogPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activePost = getPostFromSearchParams(searchParams, posts);
    const triggerElementRef = useRef(null);
    const triggerSlugRef = useRef(null);
    const postHeadingRef = useRef(null);

    useEffect(() => {
        if (!searchParams.has("post") || activePost) {
            return undefined;
        }

        setSearchParams(updatePostSearchParams(searchParams), { replace: true });
        return undefined;
    }, [activePost, searchParams, setSearchParams]);

    useEffect(() => {
        const focusFrame = window.requestAnimationFrame(() => {
            if (activePost) {
                postHeadingRef.current?.focus();
                return;
            }

            const restoredTrigger = triggerElementRef.current?.isConnected
                ? triggerElementRef.current
                : Array.from(document.querySelectorAll("[data-blog-post-trigger]"))
                    .find((element) => element.dataset.postSlug === triggerSlugRef.current);

            if (restoredTrigger) {
                restoredTrigger.focus();
                triggerElementRef.current = null;
                triggerSlugRef.current = null;
            }
        });

        return () => window.cancelAnimationFrame(focusFrame);
    }, [activePost]);

    const openPost = useCallback(
        (slug, triggerElement) => {
            triggerElementRef.current = triggerElement;
            triggerSlugRef.current = slug;
            setSearchParams(updatePostSearchParams(searchParams, slug), {
                replace: false,
            });
        },
        [searchParams, setSearchParams],
    );

    const closePost = useCallback(() => {
        setSearchParams(updatePostSearchParams(searchParams), {
            replace: false,
        });
    }, [searchParams, setSearchParams]);

    if (activePost) {
        return (
            <div className="page-wrapper blog-page-shell">
                <BlogPostPage
                    post={activePost}
                    headingRef={postHeadingRef}
                    onBack={closePost}
                />
            </div>
        );
    }

    const [featuredPost, ...archivePosts] = posts;

    return (
        <div className="page-wrapper blog-page-shell">
            <section className="blog" id="blog">
                <header className="blog-archive-header">
                    <div className="blog-archive-rail">
                        <span>Writing / 2026</span>
                        <span>{String(posts.length).padStart(2, "0")} essays</span>
                        <span>Updated {formatPostDate(featuredPost.date)}</span>
                    </div>

                    <div className="blog-archive-heading">
                        <div>
                            <p className="section-label">Field notes</p>
                            <h1>Notes from the <em>workbench.</em></h1>
                        </div>
                        <p className="blog-archive-description">
                            A running log of building, studying and learning in
                            public, from model limits to the smallest useful version.
                        </p>
                    </div>
                </header>

                <div className="blog-featured-label">
                    <span>01 / Latest note</span>
                    <span>{featuredPost.tag}</span>
                </div>

                <article
                    className="blog-featured"
                    data-blog-post-trigger="true"
                    data-post-slug={featuredPost.slug}
                    onClick={(event) => openPost(featuredPost.slug, event.currentTarget)}
                    onKeyDown={(event) =>
                        openOnKeyboard(event, (triggerElement) =>
                            openPost(featuredPost.slug, triggerElement)
                        )
                    }
                    role="button"
                    tabIndex={0}
                    aria-label={`Read ${featuredPost.title}`}
                >
                    <div className="blog-featured-meta">
                        <span>{formatPostDate(featuredPost.date)}</span>
                        <span>{featuredPost.readingTime}</span>
                    </div>
                    <div className="blog-featured-content">
                        <h3 className="heading-italic">{featuredPost.title}</h3>
                        <p>{featuredPost.excerpt}</p>
                    </div>
                    <div className="blog-featured-footer">
                        <span>Essay / 01</span>
                        <span className="blog-read-link">
                            Read essay <span aria-hidden="true">↗</span>
                        </span>
                    </div>
                </article>

                <div className="blog-list-heading">
                    <span>Archive</span>
                    <span>{String(archivePosts.length).padStart(2, "0")} more essays</span>
                </div>

                <div className="blog-list">
                    {archivePosts.map((post, index) => (
                        <article
                            key={post.slug}
                            className="blog-row"
                            data-blog-post-trigger="true"
                            data-post-slug={post.slug}
                            onClick={(event) => openPost(post.slug, event.currentTarget)}
                            onKeyDown={(event) =>
                                openOnKeyboard(event, (triggerElement) =>
                                    openPost(post.slug, triggerElement)
                                )
                            }
                            role="button"
                            tabIndex={0}
                            aria-label={`Read ${post.title}`}
                        >
                            <div className="blog-row-meta">
                                <span className="blog-index">
                                    {String(index + 2).padStart(2, "0")}
                                </span>
                                <span className="blog-date">
                                    {formatPostDate(post.date)}
                                </span>
                            </div>
                            <div className="blog-row-content">
                                <div className="blog-row-topline">
                                    <span className="blog-tag">{post.tag}</span>
                                    <span className="blog-reading-time">{post.readingTime}</span>
                                </div>
                                <h3 className={index % 2 === 1 ? "heading-italic" : ""}>
                                    {post.title}
                                </h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                            </div>
                            <span className="blog-row-arrow" aria-hidden="true">↗</span>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default BlogPage;
