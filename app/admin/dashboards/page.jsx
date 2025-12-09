"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import Header from "../../component/section-header/Header";
import StatsCard from "../../component/admin/StatsCard";
import UsersTable from "../../component/admin/UsersTable";
import ProductsTable from "../../component/admin/ProductsTable";
import { adminApi } from "../../lib/adminApi";

// ⬇️ IMPORT external CSS
import "../../style/admin.css";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log("Token:", localStorage.getItem("accessToken"));

  useEffect(() => {
    async function load() {
      try {
        const usersData = await adminApi.users.getAll();
        console.log(usersData);
        
        const productsData = await adminApi.products.getAll();
        console.log("usersData", usersData);


        setUsers(usersData.users);
        setProducts(productsData.products);
        setLoading(false);
      } catch (err) {
        console.log("Error:", err);
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p style={{ padding: "20px", fontSize: "20px" }}>Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Header title="Admin Dashboard" />

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatsCard title="Total Users" value={users.length} />
          <StatsCard title="Total Products" value={products.length} />
          <StatsCard
            title="Admins"
            value={users.filter((u) => u.role === "admin").length}
          />
        </div>

        <UsersTable users={users} />
        <ProductsTable products={products} />

        <footer className="dashboard-footer">
          © {new Date().getFullYear()} Admin Panel
        </footer>
      </div>
    </div>
  );
}
