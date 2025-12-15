"use client";

import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link href="/" className="logo">
          <span className="logo-icon">G</span>
          <span className="logo-text">GroceryCart</span>
        </Link>
      </div>

      {/* Center: Menu */}
      {/* <nav className="navbar-center">
        <Link href="/">Home</Link>
        <Link href="/products">All Product</Link>
      
      </nav> */}

      {/* Right: Search + Cart + Login */}
      <div className="navbar-right">
           <Link href="/">Home</Link>
        <Link href="/products">All Product</Link>
          <Link href="/order">Order</Link>
        <div className="search-box">
          <input type="text" placeholder="Search products" />
          <span className="search-icon">🔍</span>
        </div>

        <Link href="/cart" className="cart">
          🛒
          <span className="cart-badge">0</span>
        </Link>

        <Link href="/auth/login" className="login-btn">
          Login
        </Link>
      </div>
    </header>
  );
}
