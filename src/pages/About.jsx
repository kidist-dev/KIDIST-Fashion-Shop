import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">

  

      <section className="about-hero">

        <p className="about-label">
          ABOUT LUMÉ
        </p>

        <h1>
          Fashion with intention.
          <br />
          Elegance without effort.
        </h1>

        <p className="about-intro">
          LUMÉ is a modern women's fashion brand created
          for women who express their individuality through
          timeless style, confidence, and elegance.
        </p>

      </section>


      {/* STORY */}

      <section className="about-story">

        <div className="about-story-image">

          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
            alt="LUMÉ fashion collection"
          />

        </div>


        <div className="about-story-content">

          <p className="about-small-label">
            OUR STORY
          </p>

          <h2>
            Designed for
            <br />
            the woman you are.
          </h2>

          <p>
            LUMÉ was created with a simple idea:
            fashion should make you feel confident,
            beautiful, and completely yourself.
          </p>

          <p>
            We carefully curate pieces that combine
            contemporary fashion with timeless elegance,
            giving every woman the freedom to create
            a wardrobe that reflects her personality.
          </p>

        </div>

      </section>


      

      <section className="about-philosophy">

        <p className="about-small-label">
          OUR PHILOSOPHY
        </p>

        <h2>
          Timeless style.
          <br />
          Thoughtful choices.
        </h2>

        <div className="about-values">

          <div className="about-value">

            <span>01</span>

            <h3>
              Quality
            </h3>

            <p>
              We believe beautiful fashion should
              be made to be enjoyed again and again.
            </p>

          </div>


          <div className="about-value">

            <span>02</span>

            <h3>
              Elegance
            </h3>

            <p>
              Clean silhouettes and refined details
              create effortless sophistication.
            </p>

          </div>


          <div className="about-value">

            <span>03</span>

            <h3>
              Confidence
            </h3>

            <p>
              The best outfit is the one that makes
              you feel confident in who you are.
            </p>

          </div>

        </div>

      </section>


      {/* BRAND IMAGE */}

      <section className="about-banner">

        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=80"
          alt="Elegant women's fashion"
        />

        <div className="about-banner-content">

          <p>
            YOUR STYLE. YOUR STORY.
          </p>

          <h2>
            Wear what
            <br />
            inspires you.
          </h2>

        </div>

      </section>


      {/* CTA */}

      <section className="about-cta">

        <p className="about-small-label">
          DISCOVER LUMÉ
        </p>

        <h2>
          Find your
          <br />
          signature style.
        </h2>

        <Link
          to="/products"
          className="about-cta-button"
        >
          Explore the Collection
        </Link>

      </section>

    </main>
  );
}

export default About;