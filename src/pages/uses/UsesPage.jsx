// src/pages/UsesPage.jsx
const uses = [
    {
        category: "Editor & Terminal",
        items: [
            { name: "VS Code", desc: "Primary editor. Minimal setup — JetBrains Mono, dark theme, no distractions." },
            { name: "PowerShell / Git Bash", desc: "CLI for all git ops, curl testing, and running dev servers." },
            { name: "JetBrains Mono", desc: "The font everywhere — editor, terminal, this portfolio." },
        ],
    },
    {
        category: "Frontend",
        items: [
            { name: "React + Vite", desc: "Fast DX, HMR, no webpack config pain. Used in this portfolio and the music recognition frontend." },
            { name: "CSS (vanilla)", desc: "No Tailwind — I write raw CSS with custom properties. More control, less magic." },
        ],
    },
    {
        category: "Backend & APIs",
        items: [
            { name: "Python + FastAPI", desc: "REST APIs, signal processing pipelines, Gemini API integration." },
            { name: "Flask", desc: "Lightweight server for smaller tools — face attendance system, Shazam clone backend." },
            { name: "Supabase", desc: "Postgres + auth + storage. Replaces a full backend for most projects." },
        ],
    },
    {
        category: "Deployment",
        items: [
            { name: "Vercel", desc: "Zero-config deploys for React frontends. Push to main, it's live." },
            { name: "GitHub", desc: "Version control, project management, and public portfolio of everything I build." },
        ],
    },
    {
        category: "Languages",
        items: [
            { name: "Python", desc: "ML, signal processing, scripting, competitive programming." },
            { name: "JavaScript / JSX", desc: "Everything frontend, plus Node.js for API prototyping." },
            { name: "SQL", desc: "Schema design, queries, joins. Used daily with Supabase Postgres." },
            { name: "TypeScript", desc: "Gradually adopting it — used in the Spotify clone mini-project." },
        ],
    },
    {
        category: "AI & Research",
        items: [
            { name: "Gemini API", desc: "AI integration in Past Paper AI — mark-scheme-aware feedback on exam answers." },
            { name: "RapidAPI", desc: "Song recognition matching in the Shazam clone project." },
        ],
    },
];

export default function UsesPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <p className="page-breadcrumb">uses</p>
            </div>
            <section className="uses-section">
                <div className="section-heading">
                    <p className="section-label">Setup</p>
                    <h2>What I use to build things.</h2>
                </div>
                <div className="uses-grid">
                    {uses.map((group) => (
                        <div key={group.category} className="uses-group">
                            <h3 className="uses-group-title">{group.category}</h3>
                            <ul className="uses-list">
                                {group.items.map((item) => (
                                    <li key={item.name} className="uses-item">
                                        <span className="uses-name">{item.name}</span>
                                        <span className="uses-desc">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}