"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="mb-8 flex aspect-video w-full items-center justify-center bg-neutral-100 font-serif text-sm text-neutral-400">
        No photo available
      </div>
    );
  }

  const currentImage = images[selectedIndex]?.image_url;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="mb-14">
      {/* Active Featured Image Window */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        <img
          src={currentImage}
          alt={`${title} - image ${selectedIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-neutral-950/60 p-2 text-white transition hover:bg-neutral-950"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-neutral-950/60 p-2 text-white transition hover:bg-neutral-950"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 bg-neutral-950/75 px-2.5 py-1 font-serif text-[10px] uppercase tracking-widest text-white">
              {selectedIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-32 shrink-0 overflow-hidden border-2 transition ${
                selectedIndex === idx
                  ? "border-neutral-900 opacity-100"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={img.image_url}
                alt={`${title} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
