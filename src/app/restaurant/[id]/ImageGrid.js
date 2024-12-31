"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { images } from "./page";

export default function ImageGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((src, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-md"
            onClick={() => openModal(index)}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover "
            />
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentImageIndex}
      />
    </>
  );
}
