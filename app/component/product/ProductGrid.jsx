"use client";

import { useEffect, useState } from "react";
import { publicApi } from "../../lib/publicApi";
import ProductCard from "../../component/product/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await publicApi.getProducts();

        // Safe check for different API formats
        const productList =
          data?.products ||
          data?.items ||
          data?.data ||
          [];

        if (Array.isArray(productList)) {
          setProducts(productList);
        } else {
          setProducts([]);
          setError("Invalid product data received from API");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
