"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../component/layout/navbar";
import Footer from "../component/layout/footer";
import { publicApi } from "../lib/publicApi";
import "./order.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await publicApi.getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) return <p className="center">Loading orders...</p>;

  return (
    <>
      <Navbar />

      <section className="orders-page">
        <h2>My Orders</h2>

        {orders.length === 0 && <p>No orders found.</p>}

        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span>
                <b>Order ID:</b> {order._id}
              </span>
              <span className={`status ${order.status}`}>
                {order.status}
              </span>
            </div>

            <p>
              <b>Total:</b> ₹{order.totalAmount}
            </p>

            <p>
              <b>Payment:</b> {order.payment.method} (
              {order.payment.status})
            </p>

            <Link href={`/orders/${order._id}`} className="track-btn">
              Track Order
            </Link>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}
