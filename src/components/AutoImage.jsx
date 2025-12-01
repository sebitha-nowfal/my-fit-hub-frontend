// src/components/AutoImage.jsx
import React, { useState, useEffect } from "react";
import "./AutoImage.css";

const images = [
  "/images/slider1.jpg",
  "/images/slider2.jpg",
  "/images/slider3.jpg",
  "/images/slider4.jpg",
  "/images/slider5.jpg",
  "/images/slider6.jpg",
  "/images/slider7.jpg",
];

function AutoImage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auto-image-container">
      <img src={images[current]} alt="slider" width="600" />
    </div>
  );
}

// ✅ Make sure to have default export
export default AutoImage;
