export const posts = [
    {
        slug: 'shipping-is-a-design-decision',
        title: 'Shipping is a design decision',
        date: '2026-07-29',
        tag: 'Process',
        readingTime: '4 min read',
        excerpt: 'A smaller release is not a compromise when it gives the right question a chance to be answered.',
    },
    {
        slug: 'shazam-clone',
        title: 'Building a Shazam Clone with React + Supabase',
        date: '2026-06-15',
        tag: 'Project',
        readingTime: '5 min read',
        excerpt: 'How I built audio fingerprinting into a full-stack web app - the hard parts nobody talks about.',
    },
    {
        slug: 'designing-for-the-fallback',
        title: 'Designing for the fallback',
        date: '2026-05-21',
        tag: 'Design',
        readingTime: '4 min read',
        excerpt: 'The best product experiences still make sense when the connection drops, the model hesitates, or the user changes their mind.',
    },
    {
        slug: 'birdclef-2026',
        title: 'My BirdCLEF 2026 Competition Writeup',
        date: '2026-05-20',
        tag: 'ML',
        readingTime: '6 min read',
        excerpt: 'Lessons from my first serious Kaggle audio classification competition.',
    },
    {
        slug: 'data-products-need-honesty',
        title: 'Data products need a little more honesty',
        date: '2026-03-12',
        tag: 'Systems',
        readingTime: '5 min read',
        excerpt: 'Good dashboards do not hide uncertainty; they give people enough context to make a better call.',
    },
    {
        slug: '30-days-of-ai',
        title: 'What 30 days of AI taught me',
        date: '2026-02-28',
        tag: 'Learning',
        readingTime: '6 min read',
        excerpt: 'A practical month of prompting, data workflows, automation, agents, and rapid prototyping.',
    },
    {
        slug: 'smallest-useful-version',
        title: 'Find the smallest useful version',
        date: '2026-01-01',
        tag: 'Notes',
        readingTime: '3 min read',
        excerpt: 'The first version of a project should create a conversation with reality, not a monument to ambition.',
    },
];

export function formatPostDate(date) {
    return new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
}
