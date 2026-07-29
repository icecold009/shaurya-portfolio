const achievements = [
    {
        category: 'Academic',
        items: [
            {
                title: 'Cambridge A-Level Predicted Grades',
                detail: 'A*, A*, A*, A, A - Further Mathematics, Computer Science, Mathematics, Physics, English Language',
                meta: 'Vidyashilp Academy · 2025-2027',
            },
            {
                title: 'Cambridge IGCSE Grades',
                detail: 'A*, A*, A*, A*, A, A, A, B across Mathematics, Computer Science, Chemistry, Physics, Additional Mathematics, Economics, English Language and Hindi.',
                meta: 'Vidyashilp Academy · 2023-2025',
            },
            {
                title: 'SAT Score',
                detail: '1490 total: 780 Math and 710 Evidence-Based Reading & Writing. 99th percentile overall and in Math; 97th percentile in EBRW.',
                meta: 'Standardised test · 2025',
            },
        ],
    },
    {
        category: 'Mathematics & Science Olympiads',
        items: [
            {
                title: 'IYMC Silver Prize & Outstanding Submission',
                detail: 'Silver Prize winner in the Final Round and Outstanding Submission award in the Qualification Round of the International Youth Mathematics Challenge.',
                meta: 'International · 2025-present',
            },
            {
                title: 'AMC 12 - Third-Highest in School',
                detail: 'Third-highest scorer school-wide in the American Mathematics Competition.',
                meta: 'School-wide · 2025',
            },
            {
                title: 'Climate Science Olympiad - Top 100 Worldwide',
                detail: 'Finalist in 2024, placing in the top 100 worldwide; semi-finalist in 2023, placing in the top 2,000.',
                meta: 'International · 2023-2024',
            },
            {
                title: 'IOQM & Logiquids Final Rounds',
                detail: 'Qualified for Logiquids final rounds and participated in the Indian Olympiad Qualifier in Mathematics.',
                meta: 'Mathematics · 2023-present',
            },
        ],
    },
    {
        category: 'Competitions',
        items: [
            {
                title: 'MIT Engineers Without Borders - Team Honor Award & Individual Merit Award',
                detail: 'Placed top two in school; the team received an Honor Award and I received an individual Merit Award.',
                meta: 'International · Mar 2026',
            },
            {
                title: 'National Finance Olympiad - Top 500 National',
                detail: 'Placed in the top 500 nationally across qualifying and final rounds in finance and quantitative reasoning.',
                meta: 'National · Feb 2026',
            },
            {
                title: 'World Scholars Cup - 12 Medals, Gold Yale Qualifier',
                detail: 'Earned 12 medals across the Bangalore Regional and Bangkok Global rounds; gold qualifier for the Yale Tournament of Champions.',
                meta: 'Regional & global · Oct 2023',
            },
            {
                title: 'Startup Building Competition - Team Runners-up',
                detail: "Runners-up at the Masters' Union interschool competition after co-designing a startup concept, business model, market analysis and financial projections.",
                meta: 'Interschool · Sep 2024',
            },
            {
                title: 'Immerse Education Essay Competition - Scholarship Recipient',
                detail: 'Awarded a partial scholarship for a summer programme through competitive international essay selection.',
                meta: 'International · Dec 2025',
            },
            {
                title: 'Wharton Global High School Investment Competition',
                detail: 'Conducted equity research and company valuations, assessing risk-return profiles and analysing client case studies.',
                meta: 'International · Oct 2024 & 2025',
            },
        ],
    },
    {
        category: 'Leadership & Community',
        items: [
            {
                title: 'President & Co-founder - Mathematics Club, Vidyashilp Academy',
                detail: 'Co-founded the club and grew it from 3 to 20+ active members. Delivered sessions on number theory, complex vectors and combinatorics, and coordinated IOQM and AMC preparation.',
                meta: 'Bengaluru · Jun 2025-present',
            },
            {
                title: 'Treasurer - Student Government AY 2025-26',
                detail: 'Managed finances across 9 school events with total revenue of Rs 8.46L and a net surplus of Rs 2.37L. Oversaw a Rs 2.24L student council disbursement pool.',
                meta: 'Bengaluru · 2025-2026',
            },
            {
                title: 'Peer Tutoring - Government School Students',
                detail: 'Tutored 5-8 government school students weekly in mathematics and science, accumulating 20+ volunteer hours.',
                meta: 'Bengaluru · Jun 2024-Mar 2025',
            },
            {
                title: 'Blood Donation Drive - School Organiser',
                detail: 'Assisted in organising a blood donation drive for school support staff as part of a community service initiative.',
                meta: 'Bengaluru · Jun 2024-Mar 2025',
            },
            {
                title: 'Lake Clean-up Initiative',
                detail: "Participated in a local lake clean-up drive as part of the school's environmental community service programme.",
                meta: 'Bengaluru · Jun 2024-Mar 2025',
            },
            {
                title: "Children's Home - Orphanage Visits",
                detail: 'Organised monthly family visits to a local orphanage from age 7, providing books and educational materials to 20+ children over three years.',
                meta: 'Bengaluru · 2017-2020',
            },
        ],
    },
    {
        category: 'Kaggle Competitions',
        items: [
            {
                title: 'Digit Recognizer',
                detail: 'Competition result to be added.',
                meta: 'Kaggle · 2024',
            },
            {
                title: 'BirdCLEF',
                detail: 'Competition result to be added.',
                meta: 'Kaggle · 2024',
            },
            {
                title: 'NeurIPS Competition',
                detail: 'Competition result to be added.',
                meta: 'Kaggle · 2024',
            },
        ],
    },
];

const totalAchievements = achievements.reduce(
    (total, group) => total + group.items.length,
    0
);

function Achievements() {
    return (
        <section className="achievements" id="achievements">
            <div className="achievements-rail">
                <span>Recognition / 2023-2026</span>
                <span>{String(totalAchievements).padStart(2, '0')} records</span>
                <span>Bengaluru, India</span>
            </div>

            <div className="achievements-intro">
                <div>
                    <p className="section-label">Selected record</p>
                    <h1>Work that earned its <em>place.</em></h1>
                </div>
                <p className="achievements-intro-copy">
                    Academic milestones, competitions and community work that
                    have shaped how I think, build and contribute.
                </p>
            </div>

            <div className="achievements-overview" aria-label="Achievements overview">
                <div>
                    <strong>{String(achievements.length).padStart(2, '0')}</strong>
                    <span>areas of work</span>
                </div>
                <div>
                    <strong>{String(totalAchievements).padStart(2, '0')}</strong>
                    <span>entries documented</span>
                </div>
                <div>
                    <strong>01</strong>
                    <span>ongoing chapter</span>
                </div>
            </div>

            <div className="achievements-body">
                {achievements.map((group, groupIndex) => (
                    <section className="achievement-group" key={group.category}>
                        <div className="achievement-group-heading">
                            <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                            <h2>{group.category}</h2>
                            <span>{String(group.items.length).padStart(2, '0')} entries</span>
                        </div>

                        <div className="achievement-list">
                            {group.items.map((item, itemIndex) => (
                                <article className="achievement-card" key={item.title}>
                                    <div className="achievement-card-header">
                                        <span className="achievement-card-index">
                                            {String(itemIndex + 1).padStart(2, '0')}
                                        </span>
                                        <span className="achievement-meta">{item.meta}</span>
                                    </div>
                                    <h3 className="achievement-title">{item.title}</h3>
                                    <p className="achievement-detail">{item.detail}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </section>
    );
}

export default Achievements;
