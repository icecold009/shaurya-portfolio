// src/pages/ArtworkPage.jsx
const pieces = [
    { title: "Jeep", medium: "Charcoal-Pencil", year: "2023", src: "/artwork/compressed/image 1.webp" },
    { title: "Cheetah", medium: "Pencil Shading", year: "2022", src: "/artwork/compressed/image 2.webp" },
    { title: "Wolf", medium: "Pencil Shading", year: "2023", src: "/artwork/compressed/image 3.webp" },
    { title: "Giraffe", medium: "Pencil Shading", year: "2022", src: "/artwork/compressed/image 4.webp" },
    { title: "Horsee", medium: "Pencil Shading", year: "2022", src: "/artwork/compressed/image 5.webp" },
    { title: "Dragon Face", medium: "Pencil Shading", year: "2022", src: "/artwork/compressed/image 6.webp" },
    { title: "Dog", medium: "Pencil Shading", year: "2023", src: "/artwork/compressed/image 7.webp" },
    { title: "Tiger", medium: "Pencil Shading", year: "2022", src: "/artwork/compressed/image 8.webp" },
    { title: "Leopard", medium: "Pencil Shading", year: "2022", src: "/artwork/compressed/image 9.webp" },
    { title: "3D City", medium: "Pencil Shading and Pen", year: "2020", src: "/artwork/compressed/image 10.webp" },
    { title: "Figurene", medium: "Color Pencils", year: "2020", src: "/artwork/compressed/image 11.webp" },
    { title: "Mech Dragon", medium: "Markers", year: "2021", src: "/artwork/compressed/image 12.webp" },
    { title: "3D House", medium: "Pencil Shading and Pen", year: "2021", src: "/artwork/compressed/image 13.webp" },
    { title: "Thanos", medium: "Paint", year: "2024", src: "/artwork/compressed/image 14.webp" },
    { title: "Mech", medium: "Pencil Shading and Pen", year: "2021", src: "/artwork/compressed/image 15.webp" },
    { title: "Elephant", medium: "Pen", year: "2020", src: "/artwork/compressed/image 16.webp" },
    { title: "Plant", medium: "Paint", year: "2020", src: "/artwork/compressed/image 17.webp" },
    { title: "Dragon Full", medium: "Pen", year: "2020", src: "/artwork/compressed/image 18.webp" },
    { title: "Face mask", medium: "Markers", year: "2021", src: "/artwork/compressed/image 19.webp" },
    { title: "Portrait", medium: "Oil Pastels", year: "2023", src: "/artwork/compressed/image 20.webp" },
    { title: "Leaves", medium: "Pencil Shading", year: "2023", src: "/artwork/compressed/image 21.webp" },
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