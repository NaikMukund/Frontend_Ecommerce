"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import Header from "../../component/section-header/Header";
import StatsCard from "../../component/admin/StatsCard";
import OrdersTable from "../../admin/Order/OrdersTable";
import UpdateOrderModal from "../../admin/Order/UpdateOrderModal";
import CreateOrderModal from "../../admin/Order/CreateOrderModal";
import { adminApi } from "../../lib/adminApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await adminApi.orders.getAll();
        setOrders(res); // FIXED — backend returns array, not res.orders
      } catch (err) {
        console.log("Error loading orders:", err);
      }
      setLoading(false);
    }

    loadOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Header title="Orders Dashboard" />

        <button
          onClick={() => setOpenCreate(true)}
          style={{
            margin: "10px 0",
            padding: "10px 15px",
            background: "#4b70f5",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Create Order
        </button>

        {/* Stats */}
        <div className="stats-grid">
          <StatsCard title="Total Orders" value={orders.length} />
          <StatsCard
            title="Pending Orders"
            value={orders.filter((o) => o.status === "pending").length}
          />
          <StatsCard
            title="Completed Orders"
            value={orders.filter((o) => o.status === "delivered").length}
          />
        </div>

        {/* ORDERS TABLE */}
        <OrdersTable
          orders={orders}
          onUpdate={(id) => {
            const order = orders.find((o) => o._id === id);
            setSelectedOrder(order);
            setOpenUpdate(true);
          }}
        />

        {/* CREATE ORDER MODAL */}
        <CreateOrderModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onSave={async (data) => {
            const res = await adminApi.createOrder(data);
            setOrders([...orders, res.order]);
            setOpenCreate(false);
          }}
        />

        {/* UPDATE ORDER MODAL */}
        <UpdateOrderModal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          order={selectedOrder}
          onSave={async (data) => {
            const res = await adminApi.updateOrder(selectedOrder._id, data);

            setOrders(
              orders.map((o) =>
                o._id === selectedOrder._id ? res.updatedOrder : o
              )
            );

            setOpenUpdate(false);
          }}
        />

        <footer className="dashboard-footer">
          © {new Date().getFullYear()} Admin Panel
        </footer>
      </div>
    </div>
  );
}
