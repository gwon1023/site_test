import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function ShopPage() {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>All products</h1>
        </div>
        <p className="section-copy">
          Product listing, category context, and direct entry into product detail.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
