"use client";
import "./heroBanner.css";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <h1>
            Freshness You Can <br />
            Trust, Savings You <br />
            will Love!
          </h1>

          <div className="hero-actions">
           <Link href="/products" className="shop-btn">
    Shop now
  </Link>
            <span className="explore">
              Explore deals →
            </span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right">
          {/* <Image
            src={main_banner_bg}
            alt="Fresh vegetables"
            width={420}
            height={320}
            priority
          /> */}
        </div>
      </div>
    </section>
  );
}
