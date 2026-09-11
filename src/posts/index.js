import { getReadingTimeFromWordCount } from "../lib/readingTime.js";
import { postWordCounts } from "./generatedMetadata.js";

const postMetadata = [
    {
        slug: 'shipping-is-a-design-decision',
        title: 'Shipping is a design decision',
        date: '2026-07-29',
        tag: 'Process',
        excerpt: 'A smaller release is not a compromise when it gives the right question a chance to be answered.',
        description: 'Why smaller releases can be a design decision when they give the right product question a chance to be answered.',
    },
    {
        slug: 'shazam-clone',
        title: 'Audio recognition: two implementations, one clear path',
        date: '2026-06-15',
        tag: 'Project',
        excerpt: 'A clear distinction between a React + Supabase browser prototype and the Python/Flask project linked in the archive.',
        description: 'What two audio-recognition implementations reveal about choosing a clear, local-first path and documenting its limits.',
    },
    {
        slug: 'designing-for-the-fallback',
        title: 'Designing for the fallback',
        date: '2026-05-21',
        tag: 'Design',
        excerpt: 'The best product experiences still make sense when the connection drops, the model hesitates, or the user changes their mind.',
        description: 'How resilient interfaces stay useful when the connection drops, a model hesitates, or a user changes their mind.',
    },
    {
        slug: 'data-products-need-honesty',
        title: 'Data products need a little more honesty',
        date: '2026-03-12',
        tag: 'Systems',
        excerpt: 'Good dashboards do not hide uncertainty; they give people enough context to make a better call.',
        description: 'Why honest data products make uncertainty visible and give people enough context to make a better decision.',
    },
    {
        slug: '30-days-of-ai',
        title: 'What 30 days of AI taught me',
        date: '2026-02-28',
        tag: 'Learning',
        excerpt: 'A practical month of prompting, data workflows, automation, agents, and rapid prototyping.',
        description: 'A practical account of a month spent learning through prompting, data workflows, automation, agents, and rapid prototyping.',
    },
    {
        slug: 'smallest-useful-version',
        title: 'Find the smallest useful version',
        date: '2026-01-01',
        tag: 'Notes',
        excerpt: 'The first version of a project should create a conversation with reality, not a monument to ambition.',
        description: 'How starting with the smallest useful version creates a conversation with reality instead of a monument to ambition.',
    },
];

export const posts = postMetadata.map((post) => ({
    ...post,
    readingTime: getReadingTimeFromWordCount(postWordCounts[post.slug]),
}));

export function formatPostDate(date) {
    return new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
}
