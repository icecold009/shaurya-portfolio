import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";

import { formatPostDate, posts, writingPeriodLabel } from "../../posts/index.js";

const topics = [...new Set(posts.map((post) => post.tag))].sort((a, b) =>
    a.localeCompare(b),
);

function BlogPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const legacySlug = searchParams.get("post");
    const legacyPost = posts.find((post) => post.slug === legacySlug);
    const query = searchParams.get("q") ?? "";
    const activeTopic = searchParams.get("topic") ?? "";

    useEffect(() => {
        if (!legacySlug) {
            return;
        }

        navigate(legacyPost ? `/blog/${legacyPost.slug}` : "/blog", {
            replace: true,
        });
    }, [legacyPost, legacySlug, navigate]);

    const updateArchiveParams = (updates) => {
        setSearchParams((current) => {
            const next = new URLSearchParams(current);
            next.delete("post");

            for (const [key, value] of Object.entries(updates)) {
                if (value) {
                    next.set(key, value);
                } else {
                    next.delete(key);
                }
            }

            return next;
        }, { replace: true });
    };

    const filteredPosts = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        const normalizedTopic = activeTopic.toLocaleLowerCase();

        return posts.filter((post) => {
            if (normalizedTopic && post.tag.toLocaleLowerCase() !== normalizedTopic) {
                return false;
            }

            if (!normalizedQuery) {
                return true;
            }

            const searchableText = [
                post.title,
                post.excerpt,
                post.description,
                post.tag,
                post.periodLabel,
                post.slug,
            ]
                .filter(Boolean)
                .join(" ")
                .toLocaleLowerCase();

            return searchableText.includes(normalizedQuery);
        });
    }, [activeTopic, query]);

    const [featuredPost, ...archivePosts] = filteredPosts;
    const archivePath = `${location.pathname}${location.search}`;
    const [latestPost] = posts;

    const clearFilters = () => updateArchiveParams({ q: "", topic: "" });

    return (
        <div className="page-wrapper blog-page-shell">
            <section className="blog" id="blog">
                <header className="blog-archive-header">
                    <div className="blog-archive-rail">
                        <span>Writing / {writingPeriodLabel}</span>
                        <span>{String(posts.length).padStart(2, "0")} essays</span>
                        <span>Updated {formatPostDate(latestPost.date)}</span>
                    </div>

                    <div className="blog-archive-heading">
                        <div>
                            <p className="section-label">Field notes</p>
                            <h1>Notes from the <em>workbench.</em></h1>
                        </div>
                        <p className="blog-archive-description">
                            Essays on building, studying, and learning. Find a
                            topic, follow an idea, or pick up the latest note.
                        </p>
                    </div>
                </header>

                <section className="blog-explorer" aria-label="Find writing">
                    <div className="blog-search-row">
                        <label className="blog-search-label" htmlFor="writing-search">
                            Find an essay
                        </label>
                        <div className="blog-search-field">
                            <Search size={17} aria-hidden="true" />
                            <input
                                id="writing-search"
                                type="search"
                                value={query}
                                onChange={(event) => updateArchiveParams({ q: event.target.value })}
                                placeholder="Search titles, topics, or ideas"
                                aria-label="Search writing by title, topic, or idea"
                            />
                            {query && (
                                <button
                                    className="blog-search-clear"
                                    type="button"
                                    onClick={() => updateArchiveParams({ q: "" })}
                                    aria-label="Clear writing search"
                                >
                                    <X size={16} aria-hidden="true" />
                                </button>
                            )}
                        </div>
                        <p className="blog-result-count" aria-live="polite" aria-atomic="true">
                            <strong>{filteredPosts.length}</strong>
                            {filteredPosts.length === 1 ? " essay" : " essays"}
                        </p>
                    </div>

                    <div className="blog-topic-group" role="group" aria-label="Filter writing by topic">
                        <span className="blog-topic-label">Topics</span>
                        <div className="blog-topic-list">
                            <button
                                className={`blog-topic-chip${activeTopic ? "" : " is-active"}`}
                                type="button"
                                aria-pressed={!activeTopic}
                                onClick={() => updateArchiveParams({ topic: "" })}
                            >
                                All topics
                            </button>
                            {topics.map((topic) => (
                                <button
                                    className={`blog-topic-chip${activeTopic.toLocaleLowerCase() === topic.toLocaleLowerCase() ? " is-active" : ""}`}
                                    key={topic}
                                    type="button"
                                    aria-pressed={activeTopic.toLocaleLowerCase() === topic.toLocaleLowerCase()}
                                    onClick={() => updateArchiveParams({ topic: activeTopic === topic ? "" : topic })}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {featuredPost ? (
                    <>
                        <div className="blog-featured-label">
                            <span>{filteredPosts.length === posts.length ? "01 / Latest note" : "01 / Best match"}</span>
                            <span>{featuredPost.tag}</span>
                        </div>

                        <Link
                            className="blog-featured"
                            data-blog-post-link="true"
                            to={`/blog/${featuredPost.slug}`}
                            state={{ from: archivePath }}
                            aria-label={`Read ${featuredPost.title}`}
                        >
                            <div className="blog-featured-meta">
                                <span>{featuredPost.periodLabel ?? formatPostDate(featuredPost.date)}</span>
                                <span>Published {formatPostDate(featuredPost.date)}</span>
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

                        {archivePosts.length > 0 && (
                            <>
                                <div className="blog-list-heading">
                                    <span>More writing</span>
                                    <span>{String(archivePosts.length).padStart(2, "0")} more essays</span>
                                </div>

                                <div className="blog-list">
                                    {archivePosts.map((post, index) => (
                                        <Link
                                            key={post.slug}
                                            className="blog-row"
                                            data-blog-post-link="true"
                                            to={`/blog/${post.slug}`}
                                            state={{ from: archivePath }}
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
                                                    {post.periodLabel && (
                                                        <span className="blog-period-label">{post.periodLabel}</span>
                                                    )}
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
                            </>
                        )}
                    </>
                ) : (
                    <div className="blog-empty" role="status">
                        <span className="section-label">No matches yet</span>
                        <h2>Try another phrase or topic.</h2>
                        <p>The full archive is still here. Clear the filters to start again.</p>
                        <button className="blog-empty-clear" type="button" onClick={clearFilters}>
                            Clear search and topics
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default BlogPage;
