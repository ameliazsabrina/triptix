"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/phuket.jpg", "/phuket2.jpg", "/phuket3.jpg", "/phuket4.jpg"];

const ImageSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 w-full">
      <Image
        src={images[currentImageIndex]}
        alt="Location"
        className="w-[650px] h-full object-cover rounded-lg"
      />
      <button
        onClick={() =>
          setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() =>
          setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
