"use client";

import { useEffect, useState } from "react";
import Navbar from "../component/layout/navbar";
import Footer from "../component/layout/footer";
import { publicApi } from "../lib/publicApi";
import "./cart.css";
import Link from "next/link";
import PlaceOrder from "../component/order/PlaceOrder";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCart() {
      const data = await publicApi.getCart();
      setCart(data);
    }
    loadCart();
  }, []);

  if (!cart) return <p className="cart-loading">Loading cart...</p>;

  const items = cart.items.filter((i) => i?.product);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.02);
  const total = subtotal + tax;

  const updateQty = async (item, qty) => {
    if (qty < 1) return;
    setLoading(true);
    const updated = await publicApi.updateCart(item.product._id, qty);
    setCart(updated);
    setLoading(false);
  };

  const removeItem = async (item) => {
    setLoading(true);
    const updated = await publicApi.removeCart(item.product._id);
    setCart(updated);
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <section className="cart-page">
        {/* LEFT */}
        <div className="cart-left">
          <h2>Shopping Cart <span>{items.length} Items</span></h2>

          <div className="cart-header">
            <span>Product Details</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>

          {items.map((item) => (
            <div key={item.product._id} className="cart-row">
              <div className="cart-product">
                <img src={item.product.images?.[0]} alt="" />
                <div>
                  <h4>{item.product.title}</h4>
                  <p>Qty: {item.qty}</p>
                  <div className="qty-btns">
                    <button onClick={() => updateQty(item, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item, item.qty + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="cart-price">
                ${item.price * item.qty}
              </div>

              <button
                className="cart-remove"
                onClick={() => removeItem(item)}
                disabled={loading}
              >
                ✖
              </button>
            </div>
          ))}

          <Link href="/" className="continue">
            ← Continue Shopping
          </Link>
        </div>

        {/* RIGHT */}
        {/* <div className="cart-right">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Price</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping Fee</span>
            <span className="green">Free</span>
          </div>

          <div className="summary-row">
            <span>Tax (2%)</span>
            <span>${tax}</span>
          </div>

          <div className="summary-total">
            <span>Total Amount:</span>
            <span>${total}</span>
          </div>

          <button className="place-order">Place Order</button>
        </div> */}
        <PlaceOrder
  subtotal={subtotal}
  tax={tax}
  total={total}
  onPlaceOrder={async ({ paymentMethod }) => {
    // 🔥 CALL BACKEND PLACE ORDER API
    await publicApi.placeOrder({ paymentMethod });
    console.log("paymentMethod",paymentMethod);
    
    alert("Order placed successfully!");
  }}
/>
      </section>

      <Footer />
    </>
  );
}
