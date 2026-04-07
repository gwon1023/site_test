import { Link, useLocation } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderId = location.state?.orderId ?? "ORD-DEMO01";
  const customerName = location.state?.customerName ?? "Customer";

  return (
    <section className="section success-card">
      <p className="eyebrow">Order complete</p>
      <h1>Thanks, {customerName}.</h1>
      <p>
        Your order has been recorded with reference <strong>{orderId}</strong>.
      </p>
      <p>
        Next step for production: replace this simulated confirmation flow with an
        actual payment gateway webhook and order persistence layer.
      </p>
      <Link className="button" to="/shop">
        Continue shopping
      </Link>
    </section>
  );
}
