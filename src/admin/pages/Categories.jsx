
import { useState } from "react";
import { Link } from "react-router-dom";

const defaultCategories = [
  { id: 1, name: "Dresses", description: "Elegant dresses for every occasion." },
  { id: 2, name: "Tops", description: "Stylish tops and blouses." },
  { id: 3, name: "Skirts", description: "Beautiful skirts for everyday wear." },
  { id: 4, name: "Jackets", description: "Fashionable jackets and blazers." },
  { id: 5, name: "Trousers", description: "Classic and modern trousers." },
  {
    id: 6,
    name: "Bags & Accessories",
    description: "Handbags and finishing touches.",
  },
];

function Categories() {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem("kidist_admin_categories");
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function saveCategories(updatedCategories) {
    setCategories(updatedCategories);
    localStorage.setItem(
      "kidist_admin_categories",
      JSON.stringify(updatedCategories)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      setMessage("Please enter a category name.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== editingId
    );

    if (duplicate) {
      setMessage("This category already exists.");
      return;
    }

    if (editingId !== null) {
      const updated = categories.map((category) =>
        category.id === editingId
          ? { ...category, name, description }
          : category
      );

      saveCategories(updated);
      setMessage("Category updated successfully.");
    } else {
      const newCategory = {
        id: Date.now(),
        name,
        description,
      };

      saveCategories([...categories, newCategory]);
      setMessage("Category added successfully.");
    }

    setForm({ name: "", description: "" });
    setEditingId(null);
  }

  function handleEdit(category) {
    setForm({
      name: category.name,
      description: category.description || "",
    });
    setEditingId(category.id);
    setMessage("");
  }

  function handleDelete(category) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    saveCategories(
      categories.filter((item) => item.id !== category.id)
    );

    if (editingId === category.id) {
      setEditingId(null);
      setForm({ name: "", description: "" });
    }

    setMessage("Category deleted from the admin category list.");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", description: "" });
    setMessage("");
  }

  return (
    <div className="admin-products-page admin-categories-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-section-label">CATALOG MANAGEMENT</p>
          <h1>Categories</h1>
          <p>Organize the collections available in your KIDIST store.</p>
        </div>

        <Link to="/admin/products" className="admin-primary-button">
          View Products
        </Link>
      </div>

      <div className="admin-product-summary">
        <div className="admin-product-summary-card">
          <span>Total Categories</span>
          <strong>{categories.length}</strong>
        </div>

        <div className="admin-product-summary-card">
          <span>Product Catalog</span>
          <strong>Clothing & Accessories</strong>
        </div>
      </div>

      <div className="admin-category-layout">
        <section className="admin-product-table-card admin-category-form-card">
          <h2>{editingId !== null ? "Edit Category" : "Add New Category"}</h2>

          <form onSubmit={handleSubmit} className="admin-category-form">
            <label className="admin-form-field">
              Category Name *
              <input
                type="text"
                placeholder="e.g. Dresses"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />
            </label>

            <label className="admin-form-field">
              Description
              <textarea
                rows="4"
                placeholder="Describe this category..."
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </label>

            {message && (
              <p className="admin-category-message" role="status">
                {message}
              </p>
            )}

            <button type="submit" className="admin-primary-button">
              {editingId !== null ? "Update Category" : "Add Category"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="admin-secondary-button"
                onClick={cancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </section>

        <section className="admin-product-table-card admin-category-list-card">
          <div className="admin-table-heading">
            <h2>All Categories</h2>
            <span>{categories.length} categories</span>
          </div>

          {categories.length === 0 ? (
            <p className="admin-empty-state">
              No categories yet. Add your first category.
            </p>
          ) : (
            <div className="admin-category-list">
              {categories.map((category) => (
                <article className="admin-category-item" key={category.id}>
                  <div className="admin-category-icon">
                    {category.name.toLowerCase().includes("dress")
                      ? "♕"
                      : category.name.toLowerCase().includes("bag")
                        ? "◇"
                        : "✧"}
                  </div>

                  <div className="admin-category-details">
                    <h3>{category.name}</h3>
                    <p>
                      {category.description || "No description provided."}
                    </p>
                  </div>

                  <div className="admin-category-actions">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="admin-category-edit"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      className="admin-category-delete"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Categories;
