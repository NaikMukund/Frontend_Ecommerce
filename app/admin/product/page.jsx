"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar/Sidebar";
import Header from "../../component/section-header/Header";
import StatsCard from "../../component/admin/StatsCard";
import ProductsTable from "../../component/admin/ProductsTable";
import CreateProductModal from "../../component/product/CreateProductModal";
import UpdateProductModal from "../../component/product/UpdateProductModal";
import { adminApi } from "../../lib/adminApi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await adminApi.products.getAll();
        setProducts(res.products);
      } catch (err) {
        console.log("Error:", err);
      }
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Header title="Products Dashboard" />

        {/* CREATE PRODUCT BUTTON */}
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
          + Create Product
        </button>

        {/* Stats */}
        <div className="stats-grid">
          <StatsCard title="Total Products" value={products.length} />
          <StatsCard
            title="In Stock"
            value={products.filter((p) => p.stock > 0).length}
          />
          <StatsCard
            title="Out of Stock"
            value={products.filter((p) => p.stock === 0).length}
          />
        </div>

        {/* PRODUCTS TABLE */}
        <ProductsTable
          products={products}

          onDelete={async (id) => {
            await adminApi.products.delete(id);
            setProducts((prev) => prev.filter((p) => p._id !== id));
          }}

          onUpdate={(id) => {
            setSelectedProduct(products.find((p) => p._id === id));
            setOpenUpdate(true);
          }}
        />


        {/* CREATE PRODUCT MODAL */}
        <CreateProductModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onSave={async (data) => {
            const res = await adminApi.products.create(data);
            setProducts([...products, res]);
            setOpenCreate(false);
          }}
        />

        {/* UPDATE PRODUCT MODAL */}
        <UpdateProductModal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          product={selectedProduct}
          onSave={async (data) => {
            const res = await adminApi.products.update(selectedProduct._id, data);

            setProducts(
              products.map((p) =>
                p._id === selectedProduct._id ? res.updatedProduct : p
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
