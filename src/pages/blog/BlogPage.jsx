import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { formatPostDate, posts } from "../../posts/index.js";

function BlogPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const legacySlug = searchParams.get("post");
    const legacyPost = posts.find((post) => post.slug === legacySlug);

    useEffect(() => {
        if (!legacySlug) {
            return;
        }

        navigate(legacyPost ? `/blog/${legacyPost.slug}` : "/blog", {
            replace: true,
        });
    }, [legacyPost, legacySlug, navigate]);

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

                <Link
                    className="blog-featured"
                    data-blog-post-link="true"
                    to={`/blog/${featuredPost.slug}`}
                    aria-label={`Read ${featuredPost.title}`}
                >
                    <div className="blog-featured-meta">
                        <span>{formatPostDate(featuredPost.date)}</span>
                        <span>{featuredPost.readingTime}</span>
                    </div>
                    <div className="blog-featured-content">
                        <h2 className="heading-italic">{featuredPost.title}</h2>
                        <p>{featuredPost.excerpt}</p>
                    </div>
                    <div className="blog-featured-footer">
                        <span>Essay / 01</span>
                        <span className="blog-read-link">
                            Read essay <span aria-hidden="true">↗</span>
                        </span>
                    </div>
                </Link>

                <div className="blog-list-heading">
                    <span>Archive</span>
                    <span>{String(archivePosts.length).padStart(2, "0")} more essays</span>
                </div>

                <div className="blog-list">
                    {archivePosts.map((post, index) => (
                        <Link
                            key={post.slug}
                            className="blog-row"
                            data-blog-post-link="true"
                            to={`/blog/${post.slug}`}
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
                                <h2 className={index % 2 === 1 ? "heading-italic" : ""}>
                                    {post.title}
                                </h2>
                                <p className="blog-excerpt">{post.excerpt}</p>
                            </div>
                            <span className="blog-row-arrow" aria-hidden="true">↗</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default BlogPage;
