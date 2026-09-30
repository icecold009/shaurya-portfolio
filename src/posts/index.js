import { getReadingTimeFromWordCount } from "../lib/readingTime.js";
import { postWordCounts } from "./generatedMetadata.js";

const postMetadata = [
    {
        slug: 'study-progress-that-survives-refresh',
        title: 'A study plan has to survive the refresh',
        date: '2026-09-29',
        periodLabel: 'Aug–Sep 2026 · retrospective',
        tag: 'Product',
        excerpt: 'A useful study sprint keeps the next step clear, then brings a learner back to the same place after a break.',
        description: 'What a local-first study planner taught me about clear next steps, visible scoring, and keeping progress after a refresh.',
    },
    {
        slug: 'baseline-can-be-the-result',
        title: 'When the baseline is the result',
        date: '2026-09-29',
        periodLabel: 'Nov 2025–Sep 2026 · retrospective',
        tag: 'Research',
        excerpt: 'My F1 forecasting study became more interesting when the previous season order beat every fitted regressor overall.',
        description: 'A retrospective on leakage-safe F1 forecasting, chronological backtests, and learning to report a simple baseline honestly.',
    },
    {
        slug: 'past-papers-need-a-pipeline',
        title: 'Past papers need a pipeline, not a prompt',
        date: '2026-09-29',
        periodLabel: '2025–Apr 2026 · retrospective',
        tag: 'Learning',
        excerpt: 'A revision tool becomes easier to inspect when PDFs pass through clear extraction, segmentation, analysis, and generation steps.',
        description: 'How a CAIE practice-paper project grew from PDF extraction into a staged workflow with explicit corpus and generation boundaries.',
    },
    {
        slug: 'prediction-needs-context',
        title: 'A prediction needs its assumptions beside it',
        date: '2026-09-29',
        periodLabel: 'Dec 2025 · retrospective',
        tag: 'ML',
        excerpt: 'A price estimate is easier to question when the inputs, model comparison, and market limits stay visible.',
        description: 'A retrospective on presenting car-price predictions as estimates bounded by their data and evaluation, not as facts.',
    },
    {
        slug: 'patterns-to-practice-2025',
        title: 'From noticing patterns to sharing them',
        date: '2026-09-29',
        periodLabel: 'Jan–Jun 2025 · retrospective',
        tag: 'Field notes',
        excerpt: 'Two different settings made the same question useful: what should someone be able to do with what they have learned?',
        description: 'A retrospective on turning sales patterns into a planning conversation and making mathematics a shared activity in 2025.',
    },
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

const archiveYears = posts.flatMap((post) => [
    Number(post.date.slice(0, 4)),
    ...(post.periodLabel?.match(/20\d{2}/g) ?? []).map(Number),
]).filter(Number.isFinite);

export const writingPeriodLabel = `${Math.min(...archiveYears)}–${Math.max(...archiveYears)}`;

export function formatPostDate(date) {
    return new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
}
