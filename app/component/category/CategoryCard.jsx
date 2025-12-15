"use client";
import Link from "next/link";
import "./category.css";

export default function CategoryCard({ product }) {
  // 🛡️ Safety check
  if (!product) return null;

  const images = Array.isArray(product.images) ? product.images : [];
  const raw = images.length > 0 ? images[0] : "";

  const clean = raw
    ? raw.replace(/^https?:\/\/[^/]+\/uploads\//, "")
    : "";

  const imgUrl = clean
    ? `${process.env.NEXT_PUBLIC_API_BASE}/uploads/${clean}`
    : "/placeholder.png"; // 👈 fallback image

  return (
    <Link
      href={`/products?category=${product.category}`}
      className="category-card"
    >
      <div className="category-img">
        <img src={imgUrl} alt={product.category || "Category"} />
      </div>

      <p className="category-name">
        {product.category || "Unknown"}
      </p>
    </Link>
  );
}
