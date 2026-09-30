export const academicProfile = {
    school: "Vidyashilp Academy",
    curriculum: "Cambridge International A Levels",
    expectedGraduation: "May 2027",
    focus: ["Mathematics", "Further Mathematics", "Physics", "Computer Science"],
    interests: "Computer science, AI, data, and product engineering",
    location: "Bengaluru, India",
};

export const availability = {
    headline: "Open to focused collaborations",
    detail: "Internships, research conversations, and carefully scoped web or AI prototypes.",
    responseTime: "I aim to reply within a few days.",
};

export const audienceLenses = [
    {
        id: "admissions",
        label: "Admissions",
        kicker: "For academic reviewers",
        title: "Trace the student behind the systems.",
        description: "Start with the academic context, then follow the projects where mathematics, computer science, and careful evaluation meet.",
        projectIds: ["past-paper-ai", "f1-championship-prediction", "audio-recognition"],
        actionLabel: "Open the academic snapshot",
        actionTo: "/achievements",
    },
    {
        id: "collaboration",
        label: "Collaboration",
        kicker: "For founders and teams",
        title: "Find the smallest useful version.",
        description: "See the product surfaces, data interfaces, and prototypes that show how I move from a rough problem to a reviewable build.",
        projectIds: ["stadium-pulse-ai", "movie-tracker", "past-paper-ai"],
        actionLabel: "Explore working together",
        actionTo: "/work-with-me",
    },
    {
        id: "curious",
        label: "Curious",
        kicker: "For anyone following the thread",
        title: "Move between ideas, evidence, and experiments.",
        description: "Browse the work by the question behind it: how can a technical system become more understandable, useful, and honest?",
        projectIds: ["audio-recognition", "f1-championship-prediction", "token-router"],
        actionLabel: "Browse the full archive",
        actionTo: "/projects",
    },
];

export const serviceOffers = [
    {
        number: "01",
        id: "portfolio-site",
        title: "Portfolio and product sites",
        summary: "A fast, clear public surface for a person, product, or small team.",
        deliverables: ["Responsive interface", "Content structure", "SEO-ready route setup"],
        fit: "Best for a focused launch, not a large marketing website.",
    },
    {
        number: "02",
        id: "dashboard",
        title: "Dashboards and data interfaces",
        summary: "Useful views for turning structured data into decisions people can act on.",
        deliverables: ["Information architecture", "Interactive states", "Loading and failure paths"],
        fit: "Best when the first version has one clear user and one clear outcome.",
    },
    {
        number: "03",
        id: "ai-prototype",
        title: "AI and ML prototypes",
        summary: "A bounded experiment that makes the data, model, and limitations visible.",
        deliverables: ["Prototype workflow", "Evaluation notes", "Reviewable source and handover"],
        fit: "Best for exploration before investing in a production system.",
    },
];

export const workProcess = [
    {
        number: "01",
        title: "Frame",
        detail: "Clarify the audience, the input, the smallest useful outcome, and what is out of scope.",
    },
    {
        number: "02",
        title: "Scope",
        detail: "Agree the pages, states, evidence, timeline, and review points before building.",
    },
    {
        number: "03",
        title: "Build",
        detail: "Create a focused version with responsive behavior, accessible controls, and visible fallbacks.",
    },
    {
        number: "04",
        title: "Handover",
        detail: "Leave a reviewable repository, setup notes, and an honest list of what the first version proves.",
    },
];
