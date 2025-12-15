"use client";

import { useEffect, useState } from "react";
import Navbar from "./component/layout/navbar";
import Footer from "./component/layout/footer";
import BannerSlider from "./component/banner/BannerSlider";
import Header from "./component/section-header/Header";
import WhyBestBanner from "./component/banner/WhyBestBanner";
import CategoryCard from "./component/category/CategoryCard";
import  HeroBanner from "./component/banner/HeroBanner";
import { publicApi } from "./lib/publicApi";
import "./style/home.css";

export default function HomePage() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await publicApi.getProducts();

        const items =
          data?.items || data?.products || data?.data || [];

        // 🔥 first product per category
        const map = {};
        items.forEach((item) => {
          if (!item || !item.category) return;

          if (!map[item.category]) {
            map[item.category] = item;
          }
        });

        setCategoryProducts(Object.values(map));
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="content">
        {/* <BannerSlider /> */}
        <HeroBanner></HeroBanner>

        <section className="featured-products">
          <Header title="Categories" />

          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <div className="category-grid">
              {categoryProducts.map((product) => (
                <CategoryCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>

        <WhyBestBanner></WhyBestBanner>
      </main>

      <Footer />
    </div>
  );
}
