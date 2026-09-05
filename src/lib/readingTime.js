export function countReadableWords(source = "") {
    const readableText = String(source)
        .replace(/^---[\s\S]*?---\s*/m, "")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/<[^>]+>/g, " ")
        .replace(/https?:\/\/\S+/g, " ")
        .replace(/[#>*_~]/g, " ");

    return readableText.match(/\b[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*\b/gu)?.length ?? 0;
}

export function getReadingTimeFromWordCount(wordCount, wordsPerMinute = 200) {
    const safeWordsPerMinute = Math.max(1, Number(wordsPerMinute) || 200);
    const safeWordCount = Math.max(0, Number(wordCount) || 0);
    const minutes = Math.max(1, Math.ceil(safeWordCount / safeWordsPerMinute));

    return `${minutes} min read`;
}

export function getReadingTime(source, wordsPerMinute = 200) {
    return getReadingTimeFromWordCount(countReadableWords(source), wordsPerMinute);
}
