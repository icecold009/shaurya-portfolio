function About() {
    return (
        <section className="about" id="about">
            <div className="section-heading">
                <p className="section-label">About</p>
                <h2>A developer focused on useful products.</h2>
            </div>

            <div className="about-grid about-grid--3col">

                {/* ── Avatar / Photo ── */}
                <div className="about-avatar-wrap">
                    <div className="about-avatar">
                        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-label="Shaurya Saria avatar" width="160" height="160">
                            <rect width="160" height="160" rx="8" fill="var(--bg-2)" stroke="var(--line-bright)" strokeWidth="1" />
                            {/* Terminal grid lines */}
                            {[20, 40, 60, 80, 100, 120, 140].map(y => (
                                <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="var(--line)" strokeWidth="0.5" />
                            ))}
                            {[20, 40, 60, 80, 100, 120, 140].map(x => (
                                <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="var(--line)" strokeWidth="0.5" />
                            ))}
                            {/* Stylised bust */}
                            <circle cx="80" cy="62" r="28" fill="var(--green-faint)" stroke="var(--green)" strokeWidth="1.5" />
                            <circle cx="80" cy="57" r="16" fill="var(--surface-2, var(--surface))" stroke="var(--green-dim)" strokeWidth="1" />
                            <path d="M38 138 Q38 105 80 105 Q122 105 122 138" fill="var(--green-faint)" stroke="var(--green)" strokeWidth="1.5" />
                            {/* Scanline shimmer */}
                            <rect width="160" height="160" rx="8" fill="url(#scan)" opacity="0.06" />
                            <defs>
                                <pattern id="scan" patternUnits="userSpaceOnUse" width="160" height="4">
                                    <rect width="160" height="2" fill="var(--green)" />
                                </pattern>
                            </defs>
                            {/* Corner brackets */}
                            <path d="M4 20 L4 4 L20 4" fill="none" stroke="var(--green)" strokeWidth="1.5" />
                            <path d="M140 4 L156 4 L156 20" fill="none" stroke="var(--green)" strokeWidth="1.5" />
                            <path d="M4 140 L4 156 L20 156" fill="none" stroke="var(--green)" strokeWidth="1.5" />
                            <path d="M156 140 L156 156 L140 156" fill="none" stroke="var(--green)" strokeWidth="1.5" />
                        </svg>
                    </div>
                    <p className="about-avatar-label">shaurya.saria</p>
                    <p className="about-avatar-sub">bengaluru, in</p>
                </div>

                {/* ── Bio copy ── */}
                <div className="about-copy">
                    <p>
                        Student and junior developer based in Bengaluru. I work across the full stack —
                        backend APIs, React frontends, cloud databases, and deployment pipelines.
                    </p>
                    <p>
                        Currently studying Computer Science while building real projects:
                        a music recognition engine, an AI study tool, and more.
                        I care about code that's clean, products that work, and shipping things that matter.
                    </p>

                    {/* Where I'm headed */}
                    <div className="about-headed">
                        <h3>Where I'm headed</h3>
                        <p>
                            Applying for undergraduate CS&nbsp;/ Data Science programmes at
                            <span className="about-hl"> NUS</span>,
                            <span className="about-hl"> NTU</span>, and top UK universities (2025 intake).
                            My goal is to bridge rigorous mathematics with real-world ML systems —
                            building tools that are genuinely useful to students and researchers.
                        </p>
                    </div>

                    {/* Kaggle link */}
                    <a
                        className="about-kaggle-link"
                        href="https://www.kaggle.com/icecold009"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Shaurya's Kaggle profile"
                    >
                        <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                            <path d="M16.24 0C7.27 0 0 7.27 0 16.24s7.27 16.24 16.24 16.24 16.24-7.27 16.24-16.24S25.21 0 16.24 0zm4.98 24.17l-5.44-6.01-1.58 1.52v4.49H10.8V7.83h3.4v8.46l6.56-8.46h4.12l-6.3 7.95 6.81 8.39h-4.17z" />
                        </svg>
                        kaggle.com/icecold009
                    </a>
                </div>

                {/* ── Right panel: Education + Focus ── */}
                <div className="about-note">
                    <h3>Education</h3>
                    <div className="about-edu">
                        <p className="about-edu-school">Inventure Academy</p>
                        <p className="about-edu-sub">Cambridge A-Levels · 2025</p>
                        <ul className="about-edu-subjects">
                            <li><span className="about-subject-code">9709</span> Mathematics</li>
                            <li><span className="about-subject-code">9702</span> Physics</li>
                            <li><span className="about-subject-code">9231</span> Further Mathematics</li>
                            <li><span className="about-subject-code">9618</span> Computer Science</li>
                        </ul>
                    </div>

                    <h3 style={{ marginTop: "1.75rem" }}>Current focus</h3>
                    <ul>
                        <li>Full-stack React applications</li>
                        <li>AI integration with Gemini API</li>
                        <li>Backend APIs and database design</li>
                        <li>Deployment and DevOps workflows</li>
                        <li>Building tools for students and developers</li>
                    </ul>
                </div>

                {/* ── GitHub Activity Heatmap ── */}
                <div className="about-heatmap">
                    <p className="about-heatmap-label">// github_activity</p>
                    <div className="about-heatmap-frame">
                        <img
                            src="https://ghchart.rshah.org/00ff41/icecold009"
                            alt="GitHub contribution activity for icecold009"
                            width="100%"
                            height="auto"
                            loading="lazy"
                            style={{
                                display: 'block',
                                width: '100%',
                                mixBlendMode: 'screen',
                                filter: 'hue-rotate(160deg) saturate(1.4) brightness(0.9)',
                            }}
                        />
                    </div>
                    <p className="about-heatmap-meta">icecold009 · contributions past year</p>
                </div>

            </div>
        </section>
    );
}

export default About;