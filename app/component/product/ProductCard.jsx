"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
const raw = product.images?.[0] || "";
const clean = raw.replace(/^https?:\/\/[^/]+\/uploads\//, "");
const imgUrl = `${process.env.NEXT_PUBLIC_API_BASE}/uploads/${clean}`;


  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        width: "250px",
        background:"white",
        color:"black"
      }}
    >
      <img
        src={imgUrl}
        alt={product.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "contain",
          borderRadius: "6px",
        }}
      />

      <h3>{product.title}</h3>
      <p style={{ fontWeight: "bold" }}>₹{product.price}</p>

      <Link
        href={`/product/${product._id}`}
        style={{
          padding: "8px 10px",
          display: "inline-block",
               background:"red",
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
