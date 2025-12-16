"use client";

import Link from "next/link";
import "./navbar.css";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../../store/cartSlice";

export default function Navbar() {
    const orderCount = useSelector(selectCartCount);

  return (

    <header className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link href="/" className="logo">
          <span className="logo-icon">G</span>
          <span className="logo-text">GroceryCart</span>
        </Link>
      </div>

  

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
          <span className="cart-badge">{orderCount}</span>
        </Link>

        <Link href="/auth/login" className="login-btn">
          Login
        </Link>
      </div>
    </header>
  );
}
