"use client";
import "./whyBestBanner.css";
export default function WhyBestBanner() {
  return (
    <section className="why-banner">
      <div className="why-container">
        {/* LEFT IMAGE */}
        <div className="why-left">


    
    
        </div>

        {/* RIGHT CONTENT */}
        <div className="why-right">
          <h2>Why We Are the Best?</h2>

          <div className="why-item">
            <span className="icon">🚚</span>
            <div>
              <h4>Fastest Delivery</h4>
              <p>Groceries delivered in under 30 minutes.</p>
            </div>
          </div>

          <div className="why-item">
            <span className="icon">🌱</span>
            <div>
              <h4>Freshness Guaranteed</h4>
              <p>Fresh produce straight from the source.</p>
            </div>
          </div>

          <div className="why-item">
            <span className="icon">💰</span>
            <div>
              <h4>Affordable Prices</h4>
              <p>Quality groceries at unbeatable prices.</p>
            </div>
          </div>

          <div className="why-item">
            <span className="icon">❤️</span>
            <div>
              <h4>Trusted by Thousands</h4>
              <p>Loved by 10,000+ happy customers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
