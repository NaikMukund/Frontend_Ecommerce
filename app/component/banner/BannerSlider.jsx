"use client";
import "./SLIDER.css"
import { useState } from "react";
import Image from "next/image";

export default function BannerSlider() {
  const images = ["/banner3.jpg", "/wwe.jpg", "/banner3.jpg"];
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="slider">
      <Image
        src={images[current]}
        alt="banner"
        width={1000}
        height={400}
        className="slider-img"
      />

      <button className="left-arrow" onClick={prev}>❮</button>
      <button className="right-arrow" onClick={next}>❯</button>

      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={current === i ? "dot active" : "dot"}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
