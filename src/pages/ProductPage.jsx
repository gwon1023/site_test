import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products, returnPolicy, shippingPolicy } from "../data/products";
import { useCart } from "../store/CartContext";

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((item) => item.id === productId) ?? products[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addItem(product, selectedSize, selectedColor, quantity);
    navigate("/checkout");
  }

  return (
    <section className="section product-detail">
      <div className="product-detail__media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail__content">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <div className="price-row">
          <strong>${product.price}</strong>
          {product.originalPrice ? (
            <span className="price-row__original">${product.originalPrice}</span>
          ) : null}
        </div>
        <p>{product.description}</p>

        <div className="selector-group">
          <label htmlFor="size-select">Size</label>
          <select
            id="size-select"
            value={selectedSize}
            onChange={(event) => setSelectedSize(event.target.value)}
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-group">
          <label htmlFor="color-select">Color</label>
          <select
            id="color-select"
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
          >
            {product.colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-group">
          <label htmlFor="quantity-select">Quantity</label>
          <input
            id="quantity-select"
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </div>

        <button className="button" onClick={handleAddToCart}>
          Add to cart
        </button>

        <div className="detail-panel">
          <h2>Product details</h2>
          <ul>
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="detail-panel">
          <h2>Shipping</h2>
          <ul>
            {shippingPolicy.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="detail-panel">
          <h2>Returns</h2>
          <ul>
            {returnPolicy.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
