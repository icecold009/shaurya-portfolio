// src/pages/ArtworkPage.jsx
const pieces = [
    {
        title: "Artwork Title",
        medium: "Digital / Pencil / etc.",
        year: "2025",
        src: "/assets/artwork/piece-01.jpg",
    },
    // add more here
];

export default function ArtworkPage() {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <p className="page-breadcrumb">artwork</p>
            </div>
            <section className="artwork-section">
                <div className="section-heading">
                    <p className="section-label">Creative Work</p>
                    <h2>Things I make outside of code.</h2>
                </div>
                <div className="artwork-grid">
                    {pieces.map((p, i) => (
                        <figure key={i} className="artwork-card">
                            <div className="artwork-img-wrap">
                                <img
                                    src={p.src}
                                    alt={p.title}
                                    loading="lazy"
                                    className="artwork-img"
                                />
                            </div>
                            <figcaption className="artwork-caption">
                                <span className="artwork-title">{p.title}</span>
                                <span className="artwork-meta">{p.medium} · {p.year}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>
        </div>
    );
}