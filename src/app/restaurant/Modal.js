'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { RxCross2 } from "react-icons/rx";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import { Box, IconButton } from '@mui/material';

export default function Modal({ isOpen, onClose, images, currentIndex }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
                <button
                    onClick={onClose}
                    className="absolute right-8 top-4 z-10 bg-white/90 w-6 h-6 flex items-center justify-center rounded-full"
                >
                   <RxCross2 className=' text-black' />

                </button>

                {/* Main Swiper */}
                <Swiper
                    modules={[Navigation, Thumbs, Pagination]}
                    navigation={{
                        nextEl: `.custom-swiper-button-next`,
                        prevEl: `.custom-swiper-button-prev`,
                    }}
                    loop
                    initialSlide={currentIndex}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    pagination={{ clickable: true }}
                    className="w-full aspect-video"
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full w-full">
                                <Image
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <Box className="absolute bottom-[10px] left-[20px]">
                    <IconButton className="custom-swiper-button-prev z-10">
                        <img
                            src="/left-arrow.svg"
                            alt="left-arrow"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </Box>
                <Box className="absolute bottom-[10px] right-[20px]">
                    <IconButton className="custom-swiper-button-next z-50">
                        <img
                            src="/right-arrow.svg"
                            alt="right-arrow"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </Box>
            </div>
        </div>
    );
}
