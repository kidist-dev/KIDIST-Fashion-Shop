import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image
  );

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>

        <Link to="/products">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Check whether product is already in wishlist
  const savedInWishlist = isInWishlist(product.id);

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add product to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }

    addToCart(
      product,
      selectedSize,
      selectedColor,
      quantity
    );

    alert("Product added to cart!");
  };

  // Add or remove product from wishlist
  const handleWishlist = () => {
    if (savedInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className="product-details-page">

      {/* BACK BUTTON */}
      <div className="product-back">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <div className="product-details">

        {/* =========================
            LEFT SIDE
        ========================= */}
        <div className="product-details-left">

          <div className="product-details-image">
            <img
              src={selectedImage}
              alt={product.name}
              className="main-product-image"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="product-thumbnails">

            {(product.images || [product.image]).map(
              (image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={
                    selectedImage === image
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              )
            )}

          </div>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}
        <div className="product-details-info">

          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="product-details-price">
            ${product.price}
          </p>

          <p className="product-description">
            {product.description}
          </p>

          {/* STOCK */}
          <p className="product-stock">
            {product.stock > 0
              ? `${product.stock} items available`
              : "Sold Out"}
          </p>

          {/* =========================
              SIZE
          ========================= */}
          <div className="product-option">

            <h3>
              Select Size
              {selectedSize && `: ${selectedSize}`}
            </h3>

            <div className="option-buttons">

              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={
                    selectedSize === size
                      ? "option-button selected"
                      : "option-button"
                  }
                >
                  {size}
                </button>
              ))}

            </div>

          </div>

          {/* =========================
              COLOR
          ========================= */}
          <div className="product-option">

            <h3>
              Select Color
              {selectedColor && `: ${selectedColor}`}
            </h3>

            <div className="color-options">

              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={
                    selectedColor === color
                      ? "color-button selected"
                      : "color-button"
                  }
                >
                  {color}
                </button>
              ))}

            </div>

          </div>

          {/* =========================
              QUANTITY
          ========================= */}
          <div className="quantity-section">

            <h3>Quantity</h3>

            <div className="quantity-controls">

              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity === product.stock}
              >
                +
              </button>

            </div>

          </div>

          {/* =========================
              PRODUCT ACTIONS
          ========================= */}
          <div className="product-actions">

            <button
              className="add-cart-btn"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className={
                savedInWishlist
                  ? "wishlist-btn active"
                  : "wishlist-btn"
              }
              type="button"
              onClick={handleWishlist}
              aria-label={
                savedInWishlist
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              title={
                savedInWishlist
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              {savedInWishlist ? "♥" : "♡"}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;