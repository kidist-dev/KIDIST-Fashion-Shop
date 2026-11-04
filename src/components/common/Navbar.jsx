import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import products from "../../data/products";

function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const matchingProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchTerm.trim();

    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const handleSearchToggle = () => {
    setSearchOpen((open) => !open);
    setSearchTerm("");
  };

  return (
    <>
      {/* Luxury announcement bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span>✦</span>
          <span>Elevate Your Style With KIDIST</span>
        </div>

        <div className="top-bar-center">
          <span>Elegance</span>
          <span>•</span>
          <span>Style</span>
          <span>•</span>
          <span>Confidence</span>
        </div>

        <div className="top-bar-right">
          <span>Follow us</span>
          <span>Instagram</span>
          <span>TikTok</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img
              src="/images/kidist-logo.png"
              alt="KIDIST Female Cloth Shop"
            />
          </Link>

          {/* Navigation */}
          <nav className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/products" className="nav-link">
              Shop
            </Link>

            <Link to="/collections" className="nav-link">
              Categories <span className="nav-arrow">⌄</span>
            </Link>

            <Link to="/new-arrivals" className="nav-link">
              New Arrivals
            </Link>

            <Link to="/about" className="nav-link">
              About
            </Link>

            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="nav-actions">
            {/* Search */}
            <button
              type="button"
              className="nav-icon search-button"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={handleSearchToggle}
            >
              {searchOpen ? (
                <span className="search-close-icon">×</span>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="11"
                    cy="11"
                    r="6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M16 16L21 21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="nav-icon"
              aria-label="Wishlist"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.8 8.8C20.8 13.5 12 19 12 19S3.2 13.5 3.2 8.8C3.2 6.2 5 4.5 7.4 4.5c1.6 0 3.2.9 4.1 2.2.9-1.3 2.5-2.2 4.1-2.2 2.4 0 5.2 1.7 5.2 4.3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="nav-icon"
              aria-label="Shopping cart"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 4h2l2 11h10l3-8H6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="19"
                  r="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="17"
                  cy="19"
                  r="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <Link to="/profile" className="account-link">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="8"
                    r="3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{user?.name || "Account"}</span>
              </Link>
            ) : (
              <Link to="/login" className="account-link">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="8"
                    r="3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Account</span>
              </Link>
            )}
          </div>
        </div>

        {/* Expandable Search */}
        {searchOpen && (
          <div className="navbar-search-panel">
            <form className="navbar-search-form" onSubmit={handleSearch}>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dresses, tops, bags..."
                aria-label="Search products"
                autoFocus
              />

              <button type="submit">Search</button>
            </form>

            {searchTerm.trim() && (
              <div className="search-suggestions">
                {matchingProducts.length > 0 ? (
                  matchingProducts.map((product) => (
                    <Link
                      to={`/products/${product.id}`}
                      className="search-suggestion"
                      key={product.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <img src={product.image} alt="" />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.category}</small>
                      </span>
                      <strong>${Number(product.price).toFixed(2)}</strong>
                    </Link>
                  ))
                ) : (
                  <p className="search-no-results">
                    No matching products found. Press Search to view results.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;