const achievements = [
    {
        category: 'Academic',
        items: [
            {
                title: 'Cambridge A-Level Predicted Grades',
                detail: 'A*, A*, A*, A, A — Further Mathematics · Computer Science · Mathematics · Physics · English Language',
                meta: 'Vidyashilp Academy · 2025-2027',
            },
            {
                title: 'Cambridge IGCSE Grades',
                detail: 'A*, A*, A*, A*, A, A, A, B — Mathematics · Computer Science · Chemistry · Physics · Additional Mathematics · Economics · English Language · Hindi',
                meta: 'Vidyashilp Academy · 2023-2025',
            },
            {
                title: 'SAT Score',
                detail: '1490 (780 Math, 710 Evidence-Based Reading & Writing) — 99th percentile overall, 99th percentile in Math, 97th percentile in EBRW.',
                meta: 'Standardised Test · 2025',
            },
        ],
    },
    {
        category: 'Mathematics & Science Olympiads',
        items: [
            {
                title: 'IYMC Silver Prize & Outstanding Submission',
                detail: 'International Youth Mathematics Challenge — Silver Prize winner (Final Round) and outstanding submission award (Qualification Round).',
                meta: '2025 - Present',
            },
            {
                title: 'AMC 12 — Third-Highest in School',
                detail: 'American Mathematics Competition — ranked third-highest scorer school-wide.',
                meta: '2025',
            },
            {
                title: 'Climate Science Olympiad — Top 100 Worldwide',
                detail: 'Finalist 2024 (Top 100 worldwide); Semi-finalist 2023 (Top 2000). Multi-round challenges on clean energy and sustainable agriculture.',
                meta: '2023 & 2024',
            },
            {
                title: 'IOQM & Logiquids Final Rounds',
                detail: 'Qualified for Logiquids final rounds; participated in Indian Olympiad Qualifier in Mathematics (IOQM).',
                meta: '2023 - Present',
            },
        ],
    },
    {
        category: 'Competitions',
        items: [
            {
                title: 'MIT Engineers Without Borders — Team Honor Award & Individual Merit Award',
                detail: 'Placed top 2 in school; team received Honor Award and individually awarded Merit Award.',
                meta: 'International · Mar 2026',
            },
            {
                title: 'National Finance Olympiad — Top 500 National',
                detail: 'Achieved top 500 national ranking across qualifying and final rounds in finance and quantitative reasoning.',
                meta: 'National · Feb 2026',
            },
            {
                title: 'World Scholars Cup — 12 Medals, Gold Yale Qualifier',
                detail: 'Earned 12 medals across Regional (Bangalore) and Global (Bangkok) rounds. Gold qualifier for Yale Tournament of Champions.',
                meta: 'Regional & Global · Oct 2023',
            },
            {
                title: 'Startup Building Competition — Team Runners-up',
                detail: "Runners-up (Grades 8-12) at Masters' Union interschool competition. Co-designed full startup concept with business model, market analysis, and financial projections across 10+ teams.",
                meta: 'Interschool · Sep 2024',
            },
            {
                title: 'Immerse Education Essay Competition — Scholarship Recipient',
                detail: 'Awarded partial scholarship for summer program through competitive international essay selection.',
                meta: 'International · Dec 2025',
            },
            {
                title: 'Wharton Global High School Investment Competition',
                detail: 'Conducted equity research and company valuations, assessing risk-return profiles and analyzing client case studies.',
                meta: 'International · Oct 2024 & 2025',
            },
        ],
    },
    {
        category: 'Leadership & Community',
        items: [
            {
                title: 'President & Co-founder — Mathematics Club, Vidyashilp Academy',
                detail: 'Co-founded the club, growing it from 3 to 20+ active members. Delivered sessions on olympiad-level topics including number theory, complex vectors, and combinatorics. Coordinated IOQM and AMC preparation using past papers and curated problem sets.',
                meta: 'Bengaluru · Jun 2025 - Present',
            },
            {
                title: 'Treasurer — Student Government AY 2025-26, Vidyashilp Academy',
                detail: 'Managed finances across 9 school events with total revenue of ₹8.46L and a net surplus of ₹2.37L. Allocated student council funds across three councils, overseeing a ₹2.24L disbursement pool.',
                meta: 'Bengaluru · 2025 - 2026',
            },
            {
                title: 'Peer Tutoring — Government School Students',
                detail: 'Tutored 5-8 government school students weekly in mathematics and science, accumulating 20+ volunteer hours. Part of school community service initiatives.',
                meta: 'Bengaluru · Jun 2024 - Mar 2025',
            },
            {
                title: 'Blood Donation Drive — School Organiser',
                detail: 'Assisted in organising a blood donation drive for school support staff as part of school community service.',
                meta: 'Bengaluru · Jun 2024 - Mar 2025',
            },
            {
                title: 'Lake Clean-up Initiative',
                detail: 'Participated in a local lake clean-up drive as part of the school\'s environmental community service programme.',
                meta: 'Bengaluru · Jun 2024 - Mar 2025',
            },
            {
                title: "Children's Home — Orphanage Visits",
                detail: 'Organised monthly family visits to a local orphanage from age 7, providing books and educational materials to 20+ children over three years.',
                meta: 'Bengaluru · 2017 - 2020',
            },
        ],
    },
    {
        category: 'Kaggle Competitions',
        items: [
            {
                title: 'Digit Recognizer',
                detail: 'TODO: Add your rank/percentile and score.',
                meta: 'Kaggle · 2024',
            },
            {
                title: 'BirdCLEF',
                detail: 'TODO: Add your rank/percentile and score.',
                meta: 'Kaggle · 2024',
            },
            {
                title: 'NeurIPS Competition',
                detail: 'TODO: Add your rank/percentile and score.',
                meta: 'Kaggle · 2024',
            },
        ],
    },
];

function Achievements() {
    return (
        <section className="achievements" id="achievements">
            <div className="section-heading">
                <p className="section-label">Achievements</p>
                <h2>Competitions, awards, and recognition.</h2>
            </div>

            <div className="achievements-body">
                {achievements.map((group) => (
                    <div className="achievement-group" key={group.category}>
                        <h3 className="achievement-category">{group.category}</h3>
                        <div className="achievement-list">
                            {group.items.map((item) => (
                                <div className="achievement-card" key={item.title}>
                                    <div className="achievement-card-header">
                                        <span className="achievement-title">{item.title}</span>
                                        <span className="achievement-meta">{item.meta}</span>
                                    </div>
                                    <p className="achievement-detail">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Achievements;