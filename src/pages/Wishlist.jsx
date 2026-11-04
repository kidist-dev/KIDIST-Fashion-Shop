import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const size = product.sizes?.[0] || "M";
    const color = product.colors?.[0] || "Default";

    addToCart(product, size, color, 1);

    removeFromWishlist(product.id);

    alert(`${product.name} has been added to your cart.`);
  };

  if (wishlist.length === 0) {
    return (
      <main className="wishlist-page">
        <div className="wishlist-empty-container">
          <p className="wishlist-label">YOUR FAVORITES</p>

          <div className="wishlist-heart">♡</div>

          <h1>Your Wishlist Is Empty</h1>

          <p>
            Save your favorite pieces here and come back whenever you're ready
            to shop.
          </p>

          <Link to="/products" className="wishlist-shop-button">
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <section className="wishlist-header">
        <p className="wishlist-label">YOUR FAVORITES</p>
        <h1>My Wishlist</h1>

        <p>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </section>

      <section className="wishlist-container">
        <div className="wishlist-topbar">
          <h2>Saved Pieces</h2>

          <button
            className="wishlist-clear-button"
            onClick={clearWishlist}
          >
            Clear Wishlist
          </button>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <article className="wishlist-card" key={product.id}>
              <div className="wishlist-image-wrapper">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>

                <button
                  className="wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  ♡
                </button>

                {product.stock === 0 && (
                  <span className="wishlist-stock">Sold Out</span>
                )}
              </div>

              <div className="wishlist-card-info">
                <p className="wishlist-category">
                  {product.category}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="wishlist-product-name"
                >
                  {product.name}
                </Link>

                <p className="wishlist-price">
                  ${Number(product.price).toFixed(2)}
                </p>

                <div className="wishlist-actions">
                  <Link
                    to={`/products/${product.id}`}
                    className="wishlist-view-button"
                  >
                    View Details
                  </Link>

                  <button
                    className="wishlist-cart-button"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0
                      ? "Sold Out"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Wishlist;