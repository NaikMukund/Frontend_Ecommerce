"use client";

import Navbar from "../.././component/layout/navbar";
import Footer from "../.././component/layout/footer";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { publicApi } from "../.././lib/publicApi";
import "../.././../app/style/product-details.css";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    publicApi
      .getProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Product not found</p>;

  // FIX IMAGE URL HERE
  const raw = product.images?.[0] || "";
  const clean = raw.replace(/^https?:\/\/[^/]+\/uploads\//, "");
  const imgUrl = `${process.env.NEXT_PUBLIC_API_BASE}/uploads/${clean}`;

  const handleAddToCart = async () => {
    await publicApi.addCart(product._id);
    router.push("/cart");

      const loggedIn =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("merchantToken") ||
      sessionStorage.getItem("adminToken");

    if (!loggedIn) {
      alert("Please login to add items to cart");
      router.push("/auth/login");
      return;
    }

    // ✅ USER IS LOGGED IN → ADD TO CART API CALL
    console.log("Add to cart:", product._id);
  };

  return (
    <>
      <Navbar />
      <div className="product-container">

        {/* IMAGE */}
        <img src={imgUrl} alt={product.title} className="product-img" />

        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">₹{product.price}</p>
        <p className="product-description">{product.description}</p>

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <Footer />
    </>
  );
}
