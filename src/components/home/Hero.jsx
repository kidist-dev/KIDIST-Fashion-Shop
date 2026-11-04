import heroImage from "../../assets/hero.png";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-label">
          THE LUMÉ COLLECTION
        </p>

        <p className="hero-subtitle">
          NEW SEASON 2026
        </p>

        <h1 className="hero-title">
          ELEGANCE
          <br />
          <em>IN EVERY DETAIL</em>
        </h1>

        <p className="hero-description">
          Discover thoughtfully selected pieces designed
          to bring elegance, confidence, and individuality
          to every occasion.
        </p>

        <button
          className="hero-button"
          onClick={() => window.location.href = "/products"}
        >
          SHOP COLLECTION
          <span>→</span>
        </button>

      </div>

      <div className="hero-image">
        <img
          src={heroImage}
          alt="Women's Fashion Collection"
        />

        <div className="hero-image-label">
          <span>01</span>
          <span>NEW COLLECTION</span>
        </div>
      </div>

    </section>
  );
}

export default Hero;