"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { FacilityImage } from "./types";

interface FacilityGalleryClientProps {
  facilityImages: FacilityImage[];
}

const FacilityGalleryClient = ({
  facilityImages,
}: FacilityGalleryClientProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setCurrentImageIndex(null);
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  const goToPrevious = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + facilityImages.length) % facilityImages.length,
      );
    }
  };

  const goToNext = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((currentImageIndex + 1) % facilityImages.length);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (currentImageIndex !== null) {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilityImages.map((image, index) => (
          <div
            key={image.id}
            className="relative h-64 rounded-card overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <div className="absolute inset-0 bg-boxing-black">
              {/* Replace with actual images when available */}
              <div className="w-full h-full bg-steel-gray opacity-40 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="font-semibold text-lg">{image.title}</h3>
              <p className="text-sm text-gray-200">{image.description}</p>
            </div>
            <div className="absolute inset-0 bg-boxing-red opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {currentImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={(e) => {
            // Close lightbox when clicking on the background
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-boxing-red transition-colors p-2"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FiX size={32} />
          </button>

          <button
            className="absolute left-4 text-white hover:text-boxing-red transition-colors p-4"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <FiChevronLeft size={48} />
          </button>

          <div className="max-w-4xl max-h-[80vh] relative">
            <div className="h-[60vh] bg-steel-gray relative">
              {/* This would be replaced with a real image */}
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-30">
                <p className="text-lg font-accent">Image placeholder</p>
              </div>
            </div>
            <div className="bg-boxing-black p-4 text-white">
              <h3 className="font-semibold text-xl">
                {facilityImages[currentImageIndex].title}
              </h3>
              <p className="text-steel-gray mt-1">
                {facilityImages[currentImageIndex].description}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 text-white hover:text-boxing-red transition-colors p-4"
            onClick={goToNext}
            aria-label="Next image"
          >
            <FiChevronRight size={48} />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {facilityImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityGalleryClient;
