import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* HERO */}

      <section className="contact-hero">

        <p className="contact-label">
          CONTACT LUMÉ
        </p>

        <h1>
          We'd love to
          <br />
          hear from you.
        </h1>

        <p className="contact-intro">
          Whether you have a question about an order,
          need help choosing the perfect piece, or
          simply want to say hello, we're here for you.
        </p>

      </section>


      {/* CONTACT CONTENT */}

      <section className="contact-section">

        {/* CONTACT INFORMATION */}

        <div className="contact-info">

          <p className="contact-small-label">
            GET IN TOUCH
          </p>

          <h2>
            Let's start
            <br />
            a conversation.
          </h2>

          <p className="contact-description">
            Our team is always happy to help. Reach out
            to us using any of the contact details below.
          </p>


          {/* EMAIL */}

          <div className="contact-detail">

            <span>
              EMAIL
            </span>

            <a href="mailto:hello@lume.com">
              hello@lume.com
            </a>

          </div>


          {/* PHONE */}

          <div className="contact-detail">

            <span>
              PHONE
            </span>

            <a href="tel:+251900000000">
              +251 900 000 000
            </a>

          </div>


          {/* LOCATION */}

          <div className="contact-detail">

            <span>
              LOCATION
            </span>

            <p>
              Addis Ababa, Ethiopia
            </p>

          </div>


          {/* HOURS */}

          <div className="contact-detail">

            <span>
              BUSINESS HOURS
            </span>

            <p>
              Monday – Saturday
              <br />
              9:00 AM – 6:00 PM
            </p>

          </div>

        </div>


        {/* CONTACT FORM */}

        <div className="contact-form-wrapper">

          <h2>
            Send us a message
          </h2>

          {submitted && (
            <div className="contact-success">
              Thank you! Your message has been received.
              We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>


            {/* MESSAGE */}

            <div className="form-group">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              />

            </div>


            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>


      {/* MAP */}

      <section className="contact-map-section">

        <div className="contact-map-header">

          <p className="contact-small-label">
            FIND US
          </p>

          <h2>
            Visit LUMÉ
          </h2>

        </div>

        <div className="contact-map">

          <iframe
            title="LUMÉ Location"
            src="https://www.google.com/maps?q=Addis%20Ababa%2C%20Ethiopia&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>

        </div>

      </section>


      {/* SOCIAL */}

      <section className="contact-social">

        <p className="contact-small-label">
          FOLLOW ALONG
        </p>

        <h2>
          Stay inspired.
        </h2>

        <div className="social-links">

          <a href="#" aria-label="Instagram">
            Instagram
          </a>

          <a href="#" aria-label="Facebook">
            Facebook
          </a>

          <a href="#" aria-label="TikTok">
            TikTok
          </a>

        </div>

      </section>

    </main>
  );
}

export default Contact;