export function getMediaFromSearchParams(searchParams, key, items) {
    const requestedId = searchParams.get(key);

    return items.find((item) => item.id === requestedId) ?? null;
}

export function updateMediaSearchParams(searchParams, key, id) {
    const next = new URLSearchParams(searchParams);

    if (id) {
        next.set(key, id);
    } else {
        next.delete(key);
    }

    return next;
}
