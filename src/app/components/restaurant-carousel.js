import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { images } from "../restaurant/page";

export function RestaurantCarousel() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Swiper
          loop={true}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".main-swiper-next",
            prevEl: ".main-swiper-prev",
          }}
          pagination={{
            clickable: true,
            el: ".main-swiper-pagination",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          className="h-[400px] rounded-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt="slide-item"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton
          className="main-swiper-prev absolute bottom-4 left-4 z-10 bg-black hover:bg-black/80"
          sx={{
            width: 36,
            height: 36,
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          className="main-swiper-next absolute bottom-4 right-4 z-10 bg-black hover:bg-black/80"
          sx={{
            width: 36,
            height: 36,
            color: "white",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          }}
        >
          <ChevronRight />
        </IconButton>

        <div className="main-swiper-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex gap-1" />
      </div>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
