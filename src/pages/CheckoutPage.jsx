import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";

function currency(value) {
  return `$${value.toFixed(2)}`;
}

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: ""
  });

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 120 || subtotal === 0 ? 0 : 8;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping
    };
  }, [items]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!items.length) {
      return;
    }

    const orderId = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    clearCart();
    navigate("/order-success", {
      state: {
        orderId,
        customerName: customer.name || "Customer"
      }
    });
  }

  return (
    <section className="section checkout-layout">
      <div>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Checkout</p>
            <h1>Review cart and place order</h1>
          </div>
        </div>

        <div className="cart-list">
          {items.length ? (
            items.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>
                    {item.color} / {item.size}
                  </p>
                  <strong>{currency(item.price)}</strong>
                </div>
                <div className="cart-item__actions">
                  <input
                    aria-label={`${item.name} quantity`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.id, Number(event.target.value))
                    }
                  />
                  <button
                    className="button button--ghost"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Your cart is empty</h2>
              <p>Add a product from the catalog before continuing to checkout.</p>
            </div>
          )}
        </div>
      </div>

      <aside className="checkout-sidebar">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              required
              value={customer.name}
              onChange={(event) =>
                setCustomer((current) => ({ ...current, name: event.target.value }))
              }
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={customer.email}
              onChange={(event) =>
                setCustomer((current) => ({ ...current, email: event.target.value }))
              }
            />
          </label>
          <label>
            Shipping address
            <textarea
              required
              rows="4"
              value={customer.address}
              onChange={(event) =>
                setCustomer((current) => ({
                  ...current,
                  address: event.target.value
                }))
              }
            />
          </label>

          <div className="order-summary">
            <div>
              <span>Subtotal</span>
              <strong>{currency(totals.subtotal)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>{currency(totals.shipping)}</strong>
            </div>
            <div className="order-summary__total">
              <span>Total</span>
              <strong>{currency(totals.total)}</strong>
            </div>
          </div>

          <button className="button" type="submit" disabled={!items.length}>
            Place order
          </button>
          <p className="form-note">
            This MVP uses a local order simulation. A real payment provider will
            replace this submit action in the next phase.
          </p>
        </form>
      </aside>
    </section>
  );
}
