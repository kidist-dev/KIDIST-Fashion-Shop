import { Link } from "react-router-dom";

function Collections() {
  const collections = [
    {
      id: 1,
      title: "New Arrivals",
      description: "Discover the latest pieces designed for the modern woman.",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
    {
      id: 2,
      title: "Elegant Dresses",
      description: "Timeless silhouettes made for unforgettable moments.",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
    {
      id: 3,
      title: "Everyday Essentials",
      description: "Effortless styles created for your everyday wardrobe.",
      image:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
    {
      id: 4,
      title: "Evening Edit",
      description: "Sophisticated pieces for evenings that deserve something special.",
      image:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80",
      link: "/products",
    },
  ];

  return (
    <main className="collections-page">

      {/* HERO */}

      <section className="collections-hero">

        <p className="collections-label">
          THE LUMÉ COLLECTIONS
        </p>

        <h1>
          Curated for
          <br />
          Every Moment
        </h1>

        <p className="collections-intro">
          Explore our carefully curated collections,
          designed to bring elegance, confidence,
          and effortless style into your wardrobe.
        </p>

      </section>


      {/* COLLECTION GRID */}

      <section className="collections-section">

        <div className="collections-grid">

          {collections.map((collection) => (

            <article
              className="collection-card"
              key={collection.id}
            >

              <div className="collection-image-wrapper">

                <img
                  src={collection.image}
                  alt={collection.title}
                  className="collection-image"
                />

                <div className="collection-overlay">
                  <Link
                    to={collection.link}
                    className="collection-button"
                  >
                    Explore Collection
                  </Link>
                </div>

              </div>

              <div className="collection-content">

                <p className="collection-number">
                  0{collection.id}
                </p>

                <h2>
                  {collection.title}
                </h2>

                <p>
                  {collection.description}
                </p>

                <Link
                  to={collection.link}
                  className="collection-link"
                >
                  Discover
                  <span>→</span>
                </Link>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="collections-cta">

        <p>
          YOUR STYLE, YOUR STORY
        </p>

        <h2>
          Find something
          <br />
          uniquely you.
        </h2>

        <Link
          to="/products"
          className="collections-cta-button"
        >
          Shop All Pieces
        </Link>

      </section>

    </main>
  );
}

export default Collections;