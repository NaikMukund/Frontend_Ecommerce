"use client";

import "./orderTrack.css";

export default function OrderTrack({ order }) {
  // Order status flow (must match backend status values)
  const steps = [
    "placed",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  const labels = {
    placed: "Order Placed",
    packed: "Packed",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

  const currentIndex = steps.indexOf(order.status);

  return (
    <div className="track-wrapper">
      <h2>Track Order</h2>

      <div className="order-info">
        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Total:</b> ₹{order.totalAmount}</p>
        <p><b>Payment:</b> {order.payment.method}</p>
      </div>

      <div className="track-steps">
        {steps.map((step, index) => (
          <div className="step" key={step}>
            <div className={`circle ${index <= currentIndex ? "active" : ""}`}>
              {index + 1}
            </div>

            <span className={`label ${index <= currentIndex ? "active" : ""}`}>
              {labels[step]}
            </span>

            {index !== steps.length - 1 && (
              <div className={`line ${index < currentIndex ? "active" : ""}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
