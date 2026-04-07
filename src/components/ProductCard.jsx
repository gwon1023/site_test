import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-link">
        <img src={product.image} alt={product.name} className="product-card__image" />
      </Link>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.category}</span>
          {product.badge ? <span className="badge">{product.badge}</span> : null}
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-row">
          <strong>${product.price}</strong>
          {product.originalPrice ? (
            <span className="price-row__original">${product.originalPrice}</span>
          ) : null}
        </div>
        <Link to={`/product/${product.id}`} className="button button--secondary">
          View product
        </Link>
      </div>
    </article>
  );
}
