import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import CartItem from "./CartItem";
import  "./index.css"
export default function CartPage({ cart }) {
  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="content">
        {cart.items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </main>

      <Footer />
    </div>
  );
}
