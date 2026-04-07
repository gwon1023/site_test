import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const featuredProducts = products.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Compact Fashion Storefront</p>
          <h1>Streetwear-inspired essentials without the clutter.</h1>
          <p>
            This storefront takes the useful patterns from the reference site and
            trims the experience down to a faster MVP flow.
          </p>
          <div className="hero__actions">
            <Link className="button" to="/shop">
              Shop collection
            </Link>
            <a className="button button--ghost" href="#home-policies">
              Shipping and returns
            </a>
          </div>
        </div>
        <div className="hero__panel">
          <div className="hero-card">
            <span>Best seller spotlight</span>
            <strong>{products[0].name}</strong>
            <p>Oversized silhouette, embroidered finish, and a clear CTA.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>What to surface on the home page</h2>
          </div>
          <Link to="/shop">See all products</Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Categories</p>
            <h2>Keep navigation shallow</h2>
          </div>
        </div>
        <div className="category-grid">
          <div className="category-card">
            <strong>Hoodies</strong>
            <p>Hero products with the highest visual impact.</p>
          </div>
          <div className="category-card">
            <strong>T-Shirts</strong>
            <p>Daily basics with lighter pricing and easier conversion.</p>
          </div>
          <div className="category-card">
            <strong>Accessories</strong>
            <p>Support average order value without expanding the core flow.</p>
          </div>
        </div>
      </section>

      <section className="section policy-strip" id="home-policies">
        <div>
          <strong>Free shipping threshold</strong>
          <p>Visible trust cue carried over from the reference store.</p>
        </div>
        <div>
          <strong>Returns policy</strong>
          <p>Concise refund guidance instead of a dense footer maze.</p>
        </div>
        <div>
          <strong>Secure checkout</strong>
          <p>Checkout route is always one click away from the header.</p>
        </div>
      </section>
    </>
  );
}
