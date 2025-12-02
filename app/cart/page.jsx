"use client";

import { useEffect, useState } from "react";
import { api } from "././../lib/api";
import CartItem from "../component/cart/CartItem";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await api.getCart();
        setCart(data);
      } catch (err) {
        setError(err.message || "Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <h3>Total: ₹{total}</h3>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              background: "green",
              color: "white",
              marginTop: "10px",
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
