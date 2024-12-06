'use client'

import { useState } from 'react'
import Image from 'next/image'
import Modal from './Modal'

const images = [
    '/1.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/4.jpeg',
    '/5.jpeg',
]

export default function ImageGrid() {
    const [modalOpen, setModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const openModal = (index) => {
        setCurrentImageIndex(index)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => openModal(index)}
                    >
                        <Image
                            src={src}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                images={images}
                currentIndex={currentImageIndex}
                onNext={nextImage}
                onPrev={prevImage}
            />
        </>
    )
}

