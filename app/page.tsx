import Navbar from "./component/layout/navbar";
import Footer from "./component/layout/footer";
import ProductGrid from "./component/product/ProductGrid";
import "../app/style/home.css";
import Header from "../app/component/section-header/Header"
export default function HomePage() {
  return (
    <div className="home-page">

      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to My Store</h1>
          <p>Premium quality products at unbeatable prices.</p>
          <button className="shop-btn">Shop Now</button>
        </div>

        {/* <div className="hero-banner">
          <img
            src="https://i.ibb.co/4pDNDk1/ecommerce-banner.png"
            alt="Store Banner"
          />
        </div> */}
      </section>
      <div className="featured-products">
{/* <Header title="Featured Products" /> */}

      {/* Featured Products */}

        <div className="product-grid">
          <ProductGrid />
        </div>
        <button>
          create product
        </button>
      </div>

      <Footer />
    </div>
  );
}
