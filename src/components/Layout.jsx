import { NavLink, Outlet } from "react-router-dom";
import { useCart } from "../store/CartContext";

function cartCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export default function Layout() {
  const { items } = useCart();

  return (
    <div className="site-shell">
      <div className="topbar">Free shipping over $120. Secure checkout ready.</div>
      <header className="site-header">
        <NavLink className="brand" to="/">
          Offbeat Apparel
        </NavLink>
        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
        <div className="cart-pill">Cart {cartCount(items)}</div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <h4>Support</h4>
          <p>Shipping, returns, and sizing are visible on every product page.</p>
        </div>
        <div>
          <h4>Policy</h4>
          <p>Refunds within 14 days for unused items.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>hello@offbeat-apparel.test</p>
        </div>
      </footer>
    </div>
  );
}
