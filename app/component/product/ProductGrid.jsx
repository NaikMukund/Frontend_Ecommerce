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
  const query = searchParams.get("q"); // 🔥 SEARCH TEXT

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        let data;

        // 🔥 CATEGORY + SEARCH
        if (category && query) {
          data = await publicApi.searchProducts(query);
          const filtered = (data.items || []).filter(
            (p) => p.category === category
          );
          setProducts(filtered);
        }

        // 🔥 SEARCH ONLY
        else if (query) {
          data = await publicApi.searchProducts(query);
          setProducts(data?.items || []);
        }

        // 🔥 CATEGORY ONLY
        else if (category) {
          data = await publicApi.getProductsByCategory(category);
          setProducts(data?.products || []);
        }

        // 🔥 ALL PRODUCTS
        else {
          data = await publicApi.getProducts();
          setProducts(data?.products || data?.items || []);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, query]);

  if (loading) return <p className="page-status">Loading products...</p>;
  if (error) return <p className="page-status error">{error}</p>;

  return (
    <section className="products-page">
      {/* TITLE */}
      {(category || query) && (
        <h2 className="category-title">
          {query
            ? `Search results for "${query}"`
            : category.toUpperCase()}
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
