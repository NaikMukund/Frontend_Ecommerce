"use client";
import Navbar from "../.././component/layout/navbar";
import Footer from "../.././component/layout/footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { publicApi } from "../.././lib/publicApi";
import "../.././../app/style/product-details.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const data = await publicApi.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
<>

      <Navbar/>
    <div className="product-container">

      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">₹{product.price}</p>
      <p className="product-description">{product.description}</p>

      <button className="add-cart-btn" onClick={() => alert("Added to cart")}>
        Add to Cart
      </button>
    </div>
    <Footer/>
    </>

  );
}
