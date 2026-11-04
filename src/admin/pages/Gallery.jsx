
import { useState } from "react";

const categories = [
  "Dresses",
  "Tops",
  "Skirts",
  "Jackets",
  "Accessories",
  "New Arrivals",
];

function Gallery() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kidist_admin_gallery") || "[]");
    } catch {
      return [];
    }
  });

  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Dresses");
  const [image, setImage] = useState("");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  function saveItems(updated) {
    setItems(updated);
    localStorage.setItem("kidist_admin_gallery", JSON.stringify(updated));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setError("Please select an image smaller than 1.5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  function addImage(event) {
    event.preventDefault();

    if (!image) {
      setError("Please choose an image first.");
      return;
    }

    const newItem = {
      id: Date.now(),
      caption: caption.trim() || "KIDIST Collection",
      category,
      image,
      published: true,
    };

    saveItems([newItem, ...items]);
    setCaption("");
    setCategory("Dresses");
    setImage("");
    setError("");
    event.target.reset();
  }

  function togglePublished(id) {
    saveItems(
      items.map((item) =>
        item.id === id ? { ...item, published: !item.published } : item
      )
    );
  }

  function deleteImage(id) {
    if (!window.confirm("Delete this gallery image?")) return;
    saveItems(items.filter((item) => item.id !== id));
  }

  const visibleItems = items.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <div className="admin-gallery-page">
      <div className="admin-gallery-heading">
        <div>
          <span className="admin-gallery-eyebrow">VISUAL CONTENT</span>
          <h1>Fashion Gallery</h1>
          <p>Showcase your latest styles and collections.</p>
        </div>
      </div>

      <div className="admin-gallery-summary">
        <div><span>Total Images</span><strong>{items.length}</strong></div>
        <div><span>Published</span><strong>{items.filter((item) => item.published).length}</strong></div>
        <div><span>Hidden</span><strong>{items.filter((item) => !item.published).length}</strong></div>
      </div>

      <form className="admin-gallery-form" onSubmit={addImage}>
        <h2>Add a Gallery Image</h2>

        <label>
          Choose Image
          <input type="file" accept="image/*" onChange={handleImage} />
        </label>

        {image && (
          <img className="admin-gallery-preview" src={image} alt="Upload preview" />
        )}

        <label>
          Caption
          <input
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="e.g. Elegant evening collection"
            maxLength={100}
          />
        </label>

        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>

        {error && <p className="admin-gallery-error">{error}</p>}

        <button className="admin-gallery-primary" type="submit">
          + Add Image
        </button>
      </form>

      <div className="admin-gallery-list-heading">
        <h2>Your Gallery</h2>
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {visibleItems.length === 0 ? (
        <div className="admin-gallery-empty">
          <h3>Your gallery is ready for its first image.</h3>
          <p>Upload a fashion photo above to start building your collection.</p>
        </div>
      ) : (
        <div className="admin-gallery-grid">
          {visibleItems.map((item) => (
            <article className="admin-gallery-card" key={item.id}>
              <div className="admin-gallery-image-wrap">
                <img src={item.image} alt={item.caption} />
                <span className={`admin-gallery-badge ${item.published ? "published" : "hidden"}`}>
                  {item.published ? "Published" : "Hidden"}
                </span>
              </div>

              <div className="admin-gallery-card-content">
                <span className="admin-gallery-category">{item.category}</span>
                <h3>{item.caption}</h3>

                <div className="admin-gallery-actions">
                  <button onClick={() => togglePublished(item.id)}>
                    {item.published ? "Hide" : "Publish"}
                  </button>
                  <button className="delete" onClick={() => deleteImage(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
