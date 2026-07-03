import { useState, useEffect, Suspense, lazy } from 'react';

const postModules = {
    'shazam-clone': lazy(() => import('../posts/shazam-clone.mdx')),
    'birdclef-2026': lazy(() => import('../posts/birdclef-2026.mdx')),
};

function BlogPost({ post, onBack }) {
    const Content = postModules[post.slug];

    return (
        <section className="blog-post" id="blog">
            <button className="blog-back" onClick={onBack}>
                ← back to writing
            </button>

            <div className="blog-post-header">
                <span className="blog-tag">{post.tag}</span>
                <h1 className="blog-post-title">{post.title}</h1>
                <span className="blog-date">{post.date}</span>
            </div>

            <div className="blog-post-body">
                <Suspense fallback={<p className="blog-loading">Loading...</p>}>
                    <Content />
                </Suspense>
            </div>
        </section>
    );
}

export default BlogPost;