export function getPostFromSearchParams(searchParams, posts) {
    const requestedSlug = searchParams.get("post");

    return posts.find((post) => post.slug === requestedSlug) ?? null;
}

export function updatePostSearchParams(searchParams, slug) {
    const next = new URLSearchParams(searchParams);

    if (slug) {
        next.set("post", slug);
    } else {
        next.delete("post");
    }

    return next;
}
