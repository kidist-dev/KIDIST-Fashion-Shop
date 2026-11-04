
import { useMemo, useState } from "react";
import initialProducts from "../../data/products.js";

function Inventory() {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  const products = useMemo(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("kidist_admin_products") || "[]"
      );

      return [
        ...initialProducts,
        ...saved.filter(
          (item) =>
            !initialProducts.some(
              (original) => original.id === item.id
            )
        ),
      ];
    } catch {
      return initialProducts;
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const stock = Number(product.stock ?? 0);

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      stockFilter === "all" ||
      (stockFilter === "in" && stock > 5) ||
      (stockFilter === "low" && stock > 0 && stock <= 5) ||
      (stockFilter === "out" && stock === 0);

    return matchesSearch && matchesFilter;
  });

  const totalUnits = products.reduce(
    (total, product) => total + Math.max(0, Number(product.stock) || 0),
    0
  );

  const lowStockCount = products.filter(
    (product) => Number(product.stock) > 0 && Number(product.stock) <= 5
  ).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.stock) === 0
  ).length;

  function getStatus(stock) {
    if (stock === 0) return "Out of stock";
    if (stock <= 5) return "Low stock";
    return "In stock";
  }

  return (
    <div className="admin-products-page admin-inventory-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-section-label">STOCK MANAGEMENT</p>
          <h1>Inventory</h1>
          <p>Track product availability across your KIDIST store.</p>
        </div>
      </div>

      <div className="admin-product-summary">
        <div className="admin-product-summary-card">
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="admin-product-summary-card">
          <span>Total Units in Stock</span>
          <strong>{totalUnits.toLocaleString()}</strong>
        </div>

        <div className="admin-product-summary-card">
          <span>Low Stock Products</span>
          <strong>{lowStockCount}</strong>
        </div>

        <div className="admin-product-summary-card">
          <span>Out of Stock</span>
          <strong>{outOfStockCount}</strong>
        </div>
      </div>

      <section className="admin-product-table-card">
        <div className="admin-inventory-toolbar">
          <div>
            <h2>Stock Overview</h2>
            <p>Search products and check their availability.</p>
          </div>

          <input
            type="search"
            className="admin-inventory-search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="admin-inventory-filter"
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value)}
            aria-label="Filter products by stock status"
          >
            <option value="all">All stock</option>
            <option value="in">In stock</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>

        <div className="admin-table-scroll">
          <table className="admin-product-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Stock Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const stock = Math.max(
                    0,
                    Number(product.stock) || 0
                  );

                  const status = getStatus(stock);

                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="admin-product-info">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="admin-product-image"
                          />
                          <div>
                            <strong>{product.name}</strong>
                            <span>ID: {product.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>{product.category}</td>

                      <td>
                        ETB{" "}
                        {Number(product.price || 0).toLocaleString()}
                      </td>

                      <td>
                        <strong>{stock}</strong>
                      </td>

                      <td>
                        <span
                          className={`admin-stock-status ${
                            stock === 0
                              ? "out-of-stock"
                              : stock <= 5
                                ? "low-stock"
                                : "in-stock"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="admin-inventory-empty">
                    No products match your search or stock filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Inventory;
