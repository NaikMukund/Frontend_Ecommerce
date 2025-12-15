"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { publicApi } from "../../lib/publicApi";
import ProductCard from "../../component/product/ProductCard";
import "./product.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        let data;
        if (category) {
          data = await publicApi.getProductsByCategory(category);
          setProducts(data?.products || []);
        } else {
          data = await publicApi.getProducts();
          setProducts(data?.products || data?.items || data?.data || []);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (loading) return <p className="page-status">Loading products...</p>;
  if (error) return <p className="page-status error">{error}</p>;

  return (
    <section className="products-page">
      {/* CATEGORY TITLE */}
      {category && (
        <h2 className="category-title">
          {category.toUpperCase()}
        </h2>
      )}

      {/* PRODUCT GRID */}
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="page-status">No products found.</p>
        )}
      </div>
    </section>
  );
}
