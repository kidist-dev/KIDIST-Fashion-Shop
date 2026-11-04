
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Dresses",
    price: "",
    stock: "",
    sizes: "S, M, L, XL",
    colors: "",
    description: "",
    isNew: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Please choose an image smaller than 2 MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!image) {
      setMessage("Please select a product image from your device.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const savedProducts = JSON.parse(
          localStorage.getItem("kidist_admin_products") || "[]"
        );

        const newProduct = {
          id: Date.now(),
          name: formData.name.trim(),
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          sizes: formData.sizes
            .split(",")
            .map((size) => size.trim())
            .filter(Boolean),
          colors: formData.colors
            .split(",")
            .map((color) => color.trim())
            .filter(Boolean),
          description: formData.description.trim(),
          image: reader.result,
          isNew: formData.isNew,
        };

        localStorage.setItem(
          "kidist_admin_products",
          JSON.stringify([...savedProducts, newProduct])
        );

        navigate("/admin/products");
      } catch (error) {
        console.error("Could not save product:", error);
        setMessage(
          "Could not save this product. Try a smaller image or remove some saved products."
        );
      }
    };

    reader.onerror = () => {
      setMessage("Could not read the selected image. Please try again.");
    };

    reader.readAsDataURL(image);
  }

  return (
    <div className="admin-products-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-section-label">CATALOG MANAGEMENT</p>
          <h1>Add Product</h1>
          <p>Add a new clothing item to your KIDIST store.</p>
        </div>

        <Link
          to="/admin/products"
          className="admin-primary-button"
        >
          Back to Products
        </Link>
      </div>

      <form className="admin-add-product-form" onSubmit={handleSubmit}>
        <section className="admin-product-table-card">
          <h2>Product Information</h2>

          <div className="admin-form-grid">
            <label className="admin-form-field">
              Product Name *
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Elegant Evening Dress"
                required
              />
            </label>

            <label className="admin-form-field">
              Category *
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Dresses">Dresses</option>
                <option value="Tops">Tops</option>
                <option value="Skirts">Skirts</option>
                <option value="Jackets">Jackets</option>
                <option value="Trousers">Trousers</option>
                <option value="Bags & Accessories">
                  Bags & Accessories
                </option>
              </select>
            </label>

            <label className="admin-form-field">
              Price (ETB) *
              <input
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 120"
                required
              />
            </label>

            <label className="admin-form-field">
              Stock Quantity *
              <input
                name="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g. 10"
                required
              />
            </label>

            <label className="admin-form-field">
              Available Sizes
              <input
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
              />
            </label>

            <label className="admin-form-field">
              Available Colors
              <input
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Black, White, Pink"
              />
            </label>

            <label className="admin-form-field admin-form-full">
              Description *
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product..."
                rows="4"
                required
              />
            </label>

            <label className="admin-form-checkbox admin-form-full">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
              />
              Mark as a new arrival
            </label>
          </div>
        </section>

        <section className="admin-product-table-card">
          <h2>Product Image</h2>
          <p>Select an image saved on your computer.</p>

          <label className="admin-image-upload">
            {preview ? (
              <img src={preview} alt="Product preview" />
            ) : (
              <div className="admin-image-placeholder">
                <span>＋</span>
                <strong>Choose Product Image</strong>
                <small>JPG, PNG, or WEBP · Maximum 2 MB</small>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>

          {image && <p>Selected: {image.name}</p>}
        </section>

        {message && (
          <p role="alert" className="admin-form-message">
            {message}
          </p>
        )}

        <div className="admin-form-actions">
              <Link
             to="/admin/products"
             className="admin-secondary-button"
  >
               Cancel
           </Link>

          <button
               type="submit"
               className="admin-primary-button"
                disabled={loading}
  >
               {loading ? "Saving Product..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
