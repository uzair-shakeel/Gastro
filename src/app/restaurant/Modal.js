'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs } from 'swiper';

export default function Modal({ isOpen, onClose, images, currentIndex }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; 
    }
    return () => {
      document.body.style.overflow = 'unset';  
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl px-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-black shadow-lg transition-transform hover:scale-110"
        >
          <XIcon className="h-6 w-6" />
        </button>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          initialSlide={currentIndex}
          loop
          className="w-full aspect-video"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnails */}
        <div className="mt-4 flex justify-center gap-2 px-4">
          {images.map((src, index) => (
            <button
              key={index}
              className={`relative h-16 w-24 overflow-hidden rounded-lg border-2 ${
                index === currentIndex ? 'border-white' : 'border-transparent'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
