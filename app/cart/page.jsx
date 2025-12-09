"use client";

import { useEffect, useState } from "react";
import Navbar from "../component/layout/navbar";
import Footer from "../component/layout/footer";
import { publicApi } from ".././lib/publicApi";
import "./cart.css";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load cart on mount
  useEffect(() => {
    async function loadCart() {
      try {
        const data = await publicApi.getCart();
        setCart(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const validItems = cart.items.filter((item) => item?.product);

  const total = validItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // -------------------------------
  // INCREMENT QUANTITY
  // -------------------------------
  const incrementQty = async (item) => {
    const newQty = item.qty + 1;
    setLoading(true);

    try {
      const updated = await publicApi.updateCart(item.product._id, newQty);

      setCart(updated); // backend returns full updated cart
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // -------------------------------
  // DECREMENT QUANTITY
  // -------------------------------
  const decrementQty = async (item) => {
    if (item.qty === 1) return; // prevent 0 qty

    const newQty = item.qty - 1;
    setLoading(true);

    try {
      const updated = await publicApi.updateCart(item.product._id, newQty);

      setCart(updated);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // -------------------------------
  // DELETE ITEM
  // -------------------------------
  const deleteItem = async (item) => {
    setLoading(true);

    try {
      const updated = await publicApi.removeCart(item.product._id);

      setCart(updated);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

    // -------------------------------
  // clear ITEM
  // -------------------------------
  const clearcart = async () => {
       const updated = await publicApi.clearCart();
    setCart(updated);
  }

  // -------------------------------
  // UI
  // -------------------------------

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h2 className="title">Your Cart</h2>

        {validItems.length === 0 && <p>Your cart is empty.</p>}

        {validItems.map((item,index) => (
  <div
    key={`${item?.product?._id || "no-id"}-${index}`}
    className="cart-item"
  >
            {/* Product Image */}
            <img
              src={item?.product?.images?.[0] ?? null}
              width={80}
              height={80}
              className="cart-img"
              alt={item.product.title}
            />

            {/* Product Info */}
            <div className="cart-info">
              <h3>{item.product.title}</h3>
              <p>₹{item.price}</p>

              {/* Quantity Buttons */}
              <div className="qty-controls">
                <button disabled={loading} onClick={() => decrementQty(item)}>
                  -
                </button>

                <span>{item.qty}</span>

                <button disabled={loading} onClick={() => incrementQty(item)}>
                  +
                </button>
              </div>

              <p>
                <b>Total: ₹{item.price * item.qty}</b>
              </p>
            </div>

            {/* Delete Button */}
            <button
              className="delete-btn"
              disabled={loading}
              onClick={() => deleteItem(item)}
            >
              ❌
            </button>
          </div>
        ))}

        {/* Grand Total */}
        <h2 className="title">Total Price: ₹{total}</h2>
            <button
              className="Clear-btn"
              disabled={loading}
              onClick={() => clearcart()}
            >
     All Item Remove
            </button>
      </div>

      <Footer />
    </>
  );
}
