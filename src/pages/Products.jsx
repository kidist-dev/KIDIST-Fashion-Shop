
import { useState } from "react";
import { Link } from "react-router-dom";
import initialProducts from "../data/products.js";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load products added through the admin page, if available.
  const [adminProducts] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("kidist_admin_products") || "[]"
      );
    } catch {
      return [];
    }
  });

  const products = [
    ...initialProducts,
    ...adminProducts.filter(
      (adminProduct) =>
        !initialProducts.some(
          (product) => String(product.id) === String(adminProduct.id)
        )
    ),
  ];

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <main className="shop-page">
      <section className="shop-heading">
        <p className="shop-eyebrow">THE KIDIST COLLECTION</p>
        <h1>Discover Your Style</h1>
        <p>Elegant pieces selected for your everyday moments.</p>
      </section>

      <section className="shop-categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              selectedCategory === category
                ? "shop-category active"
                : "shop-category"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="shop-product-grid">
        {filteredProducts.map((product) => (
          <article className="shop-product-card" key={product.id}>
            <Link to={`/products/${product.id}`} className="shop-product-image">
              <img
                src={product.image}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.style.visibility = "hidden";
                }}
              />
            </Link>

            <div className="shop-product-info">
              <p>{product.category}</p>
              <h2>
                <Link to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </h2>
              <strong>
                ETB {Number(product.price || 0).toLocaleString()}
              </strong>

              <Link
                to={`/products/${product.id}`}
                className="shop-view-button"
              >
                View Product
              </Link>
            </div>
          </article>
        ))}
      </section>

      {filteredProducts.length === 0 && (
        <p className="shop-empty">No products found in this category.</p>
      )}
    </main>
  );
}

export default Products;
