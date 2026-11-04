
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import initialProducts from "../../data/products.js";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("kidist_admin_products") || "[]"
      );

      const deletedIds = JSON.parse(
        localStorage.getItem("kidist_deleted_product_ids") || "[]"
      );

      const activeInitialProducts = initialProducts.filter(
        (product) => !deletedIds.includes(String(product.id))
      );

      setProducts([...activeInitialProducts, ...saved]);
    } catch (error) {
      console.error("Could not load products:", error);
      setProducts(initialProducts);
    }
  }, []);

  function handleDelete(product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    const saved = JSON.parse(
      localStorage.getItem("kidist_admin_products") || "[]"
    );

    const isAdminProduct = saved.some(
      (item) => String(item.id) === String(product.id)
    );

    if (isAdminProduct) {
      const updatedSaved = saved.filter(
        (item) => String(item.id) !== String(product.id)
      );

      localStorage.setItem(
        "kidist_admin_products",
        JSON.stringify(updatedSaved)
      );
    } else {
      const deletedIds = JSON.parse(
        localStorage.getItem("kidist_deleted_product_ids") || "[]"
      );

      if (!deletedIds.includes(String(product.id))) {
        localStorage.setItem(
          "kidist_deleted_product_ids",
          JSON.stringify([...deletedIds, String(product.id)])
        );
      }
    }

    setProducts((current) =>
      current.filter(
        (item) => String(item.id) !== String(product.id)
      )
    );
  }

  return (
    <div className="admin-products-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-section-label">CATALOG MANAGEMENT</p>
          <h1>Products</h1>
          <p>Manage your KIDIST fashion collection.</p>
        </div>

        <Link to="/admin/products/add" className="admin-primary-button">
          + Add Product
        </Link>
      </div>

      <div className="admin-product-table-card">
        {products.length === 0 ? (
          <p>No products found. Add your first product to get started.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-info">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="admin-product-thumbnail"
                          />
                        )}
                        <span>{product.name}</span>
                      </div>
                    </td>

                    <td>{product.category}</td>
                    <td>
                      ETB {Number(product.price || 0).toLocaleString()}
                    </td>
                    <td>{product.stock ?? "—"}</td>

                    <td>
                      <div className="admin-product-actions">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="admin-secondary-button"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="admin-delete-button"
                          onClick={() => handleDelete(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
