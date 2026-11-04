import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <Link
        to={`/products/${product.id}`}
        className="product-image-link"
      >
        <img
          src={product.image}
          alt={product.name}
        />
      </Link>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <p className="product-price">
          ${product.price}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="view-product"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;