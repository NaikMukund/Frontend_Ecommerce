"use client";

import { useState } from "react";
import "./placeOrder.css";

export default function PlaceOrder({
  subtotal,
  tax,
  total,
  onPlaceOrder,
}) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleOrder = async () => {
    setLoading(true);
    await onPlaceOrder({ paymentMethod });
    setLoading(false);
  };

  return (
    <div className="order-box">
      <h3>Order Summary</h3>

      {/* Address */}
      <div className="order-section">
        <div className="order-row">
          <span>Delivery Address</span>
          <button className="link-btn">Change</button>
        </div>
        <p className="muted">Mumbai, 400001</p>
      </div>

      {/* Payment */}
      <div className="order-section">
        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cod">Cash On Delivery</option>
          <option value="wallet">Wallet</option>
        </select>
      </div>

      {/* Price */}
      <div className="price-row">
        <span>Price</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="price-row">
        <span>Shipping Fee</span>
        <span className="green">Free</span>
      </div>

      <div className="price-row">
        <span>Tax (2%)</span>
        <span>₹{tax}</span>
      </div>

      <div className="price-total">
        <span>Total Amount:</span>
        <span>₹{total}</span>
      </div>

      <button
        className="place-btn"
        disabled={loading}
        onClick={handleOrder}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
