import { useState } from 'react';
import { posts } from '../posts/index.js';
import BlogPost from './BlogPost';

function Blog() {
    const [activeSlug, setActiveSlug] = useState(null);

    if (activeSlug) {
        const post = posts.find(p => p.slug === activeSlug);
        return <BlogPost post={post} onBack={() => setActiveSlug(null)} />;
    }

    return (
        <section className="blog" id="blog">
            <div className="section-heading">
                <p className="section-label">Writing</p>
                <h2>Things I've figured out.</h2>
            </div>

            <div className="blog-list">
                {posts.map(post => (
                    <article
                        key={post.slug}
                        className="blog-row"
                        onClick={() => setActiveSlug(post.slug)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setActiveSlug(post.slug)}
                    >
                        <span className="blog-date">{post.date}</span>
                        <span className="blog-tag">{post.tag}</span>
                        <h3 className="blog-title">{post.title}</h3>
                        <p className="blog-excerpt">{post.excerpt}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Blog;