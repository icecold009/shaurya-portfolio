const certificates = [
    {
        title: "Machine Learning Specialization",
        issuer: "Coursera / DeepLearning.AI",
        year: "2025",
        img: "/certificates/images/cert-coursera-ml.webp",
        pdf: "/certificates/pdfs/cert-coursera-ml.pdf",
    },
    // add more here
];

export default function CertificatesPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <p className="page-breadcrumb">certificates</p>
            </div>
            <section className="artwork-section">
                <div className="section-heading">
                    <p className="section-label">Credentials</p>
                    <h2>Courses and certifications.</h2>
                </div>
                <div className="artwork-grid">
                    {certificates.map((c, i) => (
                        <figure key={i} className="artwork-card">
                            <div className="artwork-img-wrap">
                                <img src={c.img} alt={c.title} loading="lazy" className="artwork-img" />
                            </div>
                            <figcaption className="artwork-caption">
                                <span className="artwork-title">{c.title}</span>
                                <span className="artwork-meta">{c.issuer} · {c.year}</span>
                                {c.pdf && (
                                    <a href={c.pdf} target="_blank" rel="noopener noreferrer"
                                        style={{ fontSize: '0.8rem', marginTop: '4px', display: 'inline-block' }}>
                                        View PDF ↗
                                    </a>
                                )}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </div>
    );
}