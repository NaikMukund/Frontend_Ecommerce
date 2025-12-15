"use client";

import Link from "next/link";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-col brand">
          <h3 className="logo">
            <span>G</span>GroceryCart
          </h3>
          <p>
            We deliver fresh groceries and snacks straight to your door.
            Trusted by thousands, we aim to make your shopping experience
            simple and affordable.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Best Sellers</Link></li>
            <li><Link href="/">Offers & Deals</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div className="footer-col">
          <h4>Need help?</h4>
          <ul>
            <li>Delivery Information</li>
            <li>Return & Refund Policy</li>
            <li>Payment Methods</li>
            <li>Track your Order</li>
            <li>Contact Support</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright {new Date().getFullYear()} © GroceryCart.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
