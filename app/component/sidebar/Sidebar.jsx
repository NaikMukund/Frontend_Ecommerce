"use client";

import "./index.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
 const handlelogout=()=>{
  localStorage.removeItem("admiintoken")
 }
  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">Admin Panel</h2>

      <nav className="sidebar-nav">
        <Link
          href="/admin/dashboards"
          className={`sidebar-link ${isActive("/admin/dashbords") ? "active" : ""}`}
        >
          Dashboard
        </Link>

        <Link
          href="/admin/users"
          className={`sidebar-link ${isActive("/admin/users") ? "active" : ""}`}
        >
          Users
        </Link>

        <Link
          href="/admin/product"
          className={`sidebar-link ${isActive("/admin/products") ? "active" : ""}`}
        >
          Products
        </Link>

        <Link
          href="/admin/Order"
          className={`sidebar-link ${isActive("/admin/settings") ? "active" : ""}`}
        >
        Orders
        </Link>
      </nav>
      <div className="down">
            <Link
          href="/auth/login"
          className={`sidebar-link ${isActive("/admin/settings") ? "active" : ""}`}
          onClick={handlelogout}
        >
logout

        </Link>
      </div>
    </aside>
  );
}
