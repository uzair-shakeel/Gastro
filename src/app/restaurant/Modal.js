'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

export default function Modal({ isOpen, onClose, images, currentIndex, onNext, onPrev }) {
    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                onClose()
            } else if (event.key === 'ArrowRight') {
                onNext()
            } else if (event.key === 'ArrowLeft') {
                onPrev()
            }
        },
        [onClose, onNext, onPrev]
    )

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            // Restore body scroll when modal is closed
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, handleKeyDown])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div className="relative w-full max-w-7xl px-4">
                {/* Main Image */}
                <div className="relative aspect-[16/9] w-full [800px] h-[400px]">
                    <Image
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        fill
                        className="object-cover w-full"
                        priority
                    />
                </div>

                {/* Navigation Buttons */}
                <button
                    className="absolute left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-lg transition-transform hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation()
                        onPrev()
                    }}
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                    className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-lg transition-transform hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation()
                        onNext()
                    }}
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>

                {/* Thumbnails */}
                <div className="mt-4 flex justify-center gap-2 px-4">
                    {images.map((src, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation()
                                setCurrentIndex(index)
                            }}
                            className={`relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-transform hover:scale-105 ${index === currentIndex ? 'border-white' : 'border-transparent'
                                }`}
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
    )
}

