"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        width: "250px",
      }}
    >
      <h3>{product.title}</h3>
      <p style={{ fontWeight: "bold" }}>₹{product.price}</p>

      {/* Use Next.js Link for SPA navigation */}
      <Link
        href={`/product/${product._id}`}
        style={{
          padding: "8px 10px",
          display: "inline-block",
          backgroundColor: "black",
          color: "white",
          borderRadius: "4px",
          textDecoration: "none",
          marginTop: "10px",
        }}
      >
        View Details
      </Link>
    </div>
  );
}
