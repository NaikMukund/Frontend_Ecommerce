"use client";

import Link from "next/link";
import "./navbar.css";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../../store/cartSlice";

export default function Navbar() {
  const orderCount = useSelector(selectCartCount);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname(); // 🔥 current route

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/products?q=${encodeURIComponent(search)}`);
    setSearch("");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link href="/" className="logo">
          <span className="logo-icon">G</span>
          <span className="logo-text">GroceryCart</span>
        </Link>
      </div>

      <div className="navbar-right">
        {/* HOME */}
        <Link
          href="/"
          className={pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Home
        </Link>

        {/* PRODUCTS */}
        <Link
          href="/products"
          className={pathname.startsWith("/products") ? "nav-link active" : "nav-link"}
        >
          All Product
        </Link>

        {/* ORDERS */}
        <Link
          href="/order"
          className={pathname.startsWith("/order") ? "nav-link active" : "nav-link"}
        >
          Order
        </Link>
          <Link
          href="/wallet"
          className={pathname.startsWith("/order") ? "nav-link active" : "nav-link"}
        >
        Wallet
        </Link>

        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <span className="search-icon" onClick={handleSearch}>
            🔍
          </span>
        </div>

        {/* CART */}
        <Link href="/cart" className="cart">
          🛒
          <span className="cart-badge">{orderCount}</span>
        </Link>

        {/* LOGIN */}
        <Link href="/auth/login" className="login-btn">
          Login
        </Link>
      </div>
    </header>
  );
}
