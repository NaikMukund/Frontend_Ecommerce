"use client";

import Navbar from "./component/layout/navbar";
import Footer from "./component/layout/footer";
import ProductGrid from "./component/product/ProductGrid";
import BannerSlider from "./component/banner/BannerSlider";
import Header from "./component/section-header/Header";
import "./style/home.css";

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="content">
        <BannerSlider />

        <section className="featured-products">
          <Header title="Featured Products" />
          <ProductGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}
