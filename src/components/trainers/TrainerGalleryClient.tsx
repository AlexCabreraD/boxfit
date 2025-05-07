"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const images = [
  {
    src: "/images/trainer-gallery-1.jpg",
    alt: "Coach Pablo training a boxer",
    caption: "One-on-one training session",
  },
  {
    src: "/images/trainer-gallery-2.jpg",
    alt: "Group boxing class",
    caption: "Group boxing fundamentals class",
  },
  {
    src: "/images/trainer-gallery-3.jpg",
    alt: "Youth boxing training",
    caption: "Youth boxing development program",
  },
  {
    src: "/images/trainer-gallery-4.jpg",
    alt: "Competition preparation",
    caption: "Competition training and strategy session",
  },
];

const TrainerGalleryClient = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-card shadow-card gallery-image">
        <div className="relative aspect-w-16 aspect-h-9">
          {/* Placeholder image until real photos are available */}
          <div className="w-full h-full bg-steel-gray opacity-40 flex items-center justify-center">
            <span className="text-white text-lg">
              {images[currentIndex].alt}
            </span>
          </div>
        </div>

        <div className="bg-boxing-black text-white p-4">
          <p className="text-center">{images[currentIndex].caption}</p>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="animated-button absolute left-4 top-1/2 -translate-y-1/2 bg-boxing-red text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none hover:bg-opacity-90 transition-colors"
        aria-label="Previous image"
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="animated-button absolute right-4 top-1/2 -translate-y-1/2 bg-boxing-red text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none hover:bg-opacity-90 transition-colors"
        aria-label="Next image"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-boxing-red" : "bg-steel-gray"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainerGalleryClient;
