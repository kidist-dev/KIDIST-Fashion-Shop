import categories from "../../data/categories";

function CategorySection() {
  return (
    <section className="category-section">

      <div className="category-header">
        <p className="category-subtitle">
          EXPLORE OUR COLLECTION
        </p>

        <h2>Shop By Category</h2>

        <p>
          Discover elegant pieces curated for every style and occasion.
        </p>
      </div>

      <div className="category-grid">

        {categories.map((category) => (
          <div
            className="category-card"
            key={category.id}
            onClick={() => {
              window.location.href = `/products?category=${encodeURIComponent(
                category.name
              )}`;
            }}
          >

            <div className="category-image">
              <img
                src={category.image}
                alt={category.name}
              />
            </div>

            <div className="category-content">
              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <span>SHOP NOW →</span>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default CategorySection;