"use client";
import Link from "next/link";
import Image from "next/image"; 
import "./productcard.css";
import nav_cart_icon from "../../../public/nav_cart_icon.svg";
export default function ProductCard({ product }) {
  const raw = product.images?.[0] || "";
  const clean = raw.replace(/^https?:\/\/[^/]+\/uploads\//, "");
  const imgUrl = `${process.env.NEXT_PUBLIC_API_BASE}/uploads/${clean}`;

  return (
    <div className="gc-card">
      <div className="gc-image">
        <img src={imgUrl} alt={product.title} />
      </div>

      <span className="gc-category">{product.category}</span>

      <h4 className="gc-title">{product.title}</h4>

      <div className="gc-bottom">
        <span className="gc-price">₹{product.price}</span>

<Link href={`/product/${product._id}`} className="gc-add-link">
  <Image
    src={nav_cart_icon}
    alt="add to cart"
    className="gc-add-btn "
  />

</Link>

      </div>


    </div>
  );
}
