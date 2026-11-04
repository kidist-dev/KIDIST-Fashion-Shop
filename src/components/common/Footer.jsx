import {
  FaTiktok,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="lume-footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            LUMÉ<span>.</span>
          </Link>

          <p>
            Elegance in every detail. Discover timeless fashion
            designed to make every moment special.
          </p>

          {/* Social media */}
          <div className="footer-socials">
            <h3>Follow Our Journey</h3>

            <a
              href="https://www.tiktok.com/@kidist3590"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit our TikTok profile"
            >
              <span className="social-icon tiktok-icon">♪</span>
              <span>
                <strong>TikTok</strong>
                <small>@kidist3590</small>
              </span>
              <span className="social-arrow">↗</span>
            </a>

            <a
              href="https://www.instagram.com/kidis_ttilahun/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit our Instagram profile"
            >
              <span className="social-icon instagram-icon">◎</span>
              <span>
                <strong>Instagram</strong>
                <small>@kidis_ttilahun</small>
              </span>
              <span className="social-arrow">↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/kidist-tilahun"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Visit our LinkedIn profile"
            >
              <span className="social-icon linkedin-icon">in</span>
              <span>
                <strong>LinkedIn</strong>
                <small>Kidist Tilahun</small>
              </span>
              <span className="social-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About Us</Link>
        </div>

        {/* Customer care */}
        <div className="footer-links">
          <h3>Customer Care</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/login">My Account</Link>
        </div>

        {/* Follow call to action */}
        <div className="footer-newsletter">
          <span className="footer-eyebrow">THE LUMÉ EXPERIENCE</span>
          <h3>Stay in Style</h3>

          <p>
            Discover new collections, timeless pieces, and
            inspiration for your everyday elegance.
          </p>

          <a
            href="https://www.tiktok.com/@kidist3590"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-follow-button"
          >
            Explore Our TikTok ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LUMÉ. All rights reserved.</p>
        <p>Elegance in Every Detail.</p>
      </div>
    </footer>
  );
}

export default Footer;
