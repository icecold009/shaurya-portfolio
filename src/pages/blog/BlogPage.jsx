import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { formatPostDate, posts } from "../../posts/index.js";
import BlogPostPage from "./BlogPostPage";

function openOnKeyboard(event, onOpen) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpen();
    }
}

function BlogPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedSlug = searchParams.get("post");
    const [activeSlug, setActiveSlug] = useState(() =>
        posts.some((post) => post.slug === requestedSlug) ? requestedSlug : null
    );

    if (activeSlug) {
        const post = posts.find((entry) => entry.slug === activeSlug);

        return (
            <BlogPostPage
                post={post}
                onBack={() => {
                    setActiveSlug(null);
                    setSearchParams({});
                }}
            />
        );
    }

    const [featuredPost, ...archivePosts] = posts;

    return (
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
                        <h2>Things I've <em>figured out.</em></h2>
                    </div>
                    <p className="blog-archive-description">
                        Notes from building products, studying systems, and
                        trying to make complicated things feel a little clearer.
                    </p>
                </div>
            </header>

            <div className="blog-featured-label">
                <span>01 / Latest note</span>
                <span>{featuredPost.tag}</span>
            </div>

            <article
                className="blog-featured"
                onClick={() => setActiveSlug(featuredPost.slug)}
                onKeyDown={(event) =>
                    openOnKeyboard(event, () => setActiveSlug(featuredPost.slug))
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
                        onClick={() => setActiveSlug(post.slug)}
                        onKeyDown={(event) =>
                            openOnKeyboard(event, () => setActiveSlug(post.slug))
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
    );
}

export default BlogPage;
