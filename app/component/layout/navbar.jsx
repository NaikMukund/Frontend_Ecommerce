"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "15px 20px",
    background: "#362424",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
            position: "sticky", 
        top: 0,             
        zIndex: 999, 
      }}
    >
      <h2 style={{ margin: 0 }}>E-Commerce</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/auth/login" style={{ color: "#fff", textDecoration: "none" }}>
          Log-in
        </Link>

        <Link href="/products" style={{ color: "#fff", textDecoration: "none" }}>
          Products
        </Link>

        <Link href="/cart" style={{ color: "#fff", textDecoration: "none" }}>
          Cart
        </Link>

        <Link href="/profile" style={{ color: "#fff", textDecoration: "none" }}>
          Profile
        </Link>
      </div>
    </nav>
  );
}
