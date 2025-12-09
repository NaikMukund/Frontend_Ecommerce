import ProductGrid from "../component/product/ProductGrid";
import Navbar from "../component/layout/navbar";
import Footer from "../component/layout/footer";
import  "./index.css";
export default function ProductsPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="content">
        <ProductGrid />
      </main>

      <Footer />
    </div>
  );
}
