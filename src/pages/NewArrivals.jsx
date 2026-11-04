import { Link } from "react-router-dom";
import products from "../data/products";

function NewArrivals() {
  const newProducts = products.filter(
    (product) =>
      product.isNew === true ||
      [11, 12, 13].includes(product.id)
  );

  return (
    <main className="new-arrivals-page">

      {/* Header */}
      <section className="new-arrivals-header">

        <p className="new-arrivals-label">
          KIDIST COLLECTION
        </p>

        <h1>New Arrivals</h1>

        <p>
          Discover the latest pieces added to our collection.
        </p>

      </section>

      {/* Products */}
      <section className="new-arrivals-container">

        {newProducts.length === 0 ? (

          <div className="new-arrivals-empty">

            <h2>No New Arrivals Yet</h2>

            <p>
              New pieces will be added soon.
            </p>

            <Link
              to="/products"
              className="new-arrivals-button"
            >
              Shop All Products
            </Link>

          </div>

        ) : (

          <div className="new-arrivals-grid">

            {newProducts.map((product) => (

              <article
                className="new-arrival-card"
                key={product.id}
              >

                {/* Product Image */}
                <Link
                  to={`/products/${product.id}`}
                  className="new-arrival-image-link"
                >

                  <div className="new-arrival-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span className="new-badge">
                      NEW
                    </span>

                  </div>

                </Link>

                {/* Product Information */}
                <div className="new-arrival-info">

                  <p>
                    {product.category}
                  </p>

                  <h2>
                    {product.name}
                  </h2>

                  <strong>
                    ${product.price.toFixed(2)}
                  </strong>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default NewArrivals;