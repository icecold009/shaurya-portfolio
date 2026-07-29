import { useState } from "react";

import { posts } from "../../posts/index.js";
import BlogPostPage from "./BlogPostPage";

export default function BlogPage() {
    const [activeSlug, setActiveSlug] = useState(null);

    if (activeSlug) {
        const post = posts.find((entry) => entry.slug === activeSlug);
        return (
            <BlogPostPage
                post={post}
                onBack={() => setActiveSlug(null)}
            />
        );
    }

    return (
        <section className="blog" id="blog">
            <div className="section-heading">
                <p className="section-label">Writing</p>
                <h2>Things I've <em>figured out.</em></h2>
            </div>

            <div className="blog-list">
                    {posts.map((post, index) => (
                    <article
                        key={post.slug}
                        className="blog-row"
                        onClick={() => setActiveSlug(post.slug)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                setActiveSlug(post.slug);
                            }
                        }}
                    >
                        <span className="blog-date">{post.date}</span>
                        <span className="blog-tag">{post.tag}</span>
                        <h3
                            className={`blog-title ${
                                index === 1 ? "heading-italic" : ""
                            }`}
                        >
                            {post.title}
                        </h3>
                        <p className="blog-excerpt">{post.excerpt}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
