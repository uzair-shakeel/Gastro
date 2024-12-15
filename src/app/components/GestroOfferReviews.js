import React, { useRef, useState } from "react";
import { Info, Star, ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";


const Reviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Omar Sundaram",
            time: "9 hours ago",
            stars: 3,
            review:
                "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },
        {
            id: 2,
            name: "Omar Sundaram",
            time: "9 hours ago",
            stars: 4,
            review:
                "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },
        {
            id: 3,
            name: "Omar Sundaram",
            time: "9 hours ago",
            stars: 5,
            review:
                "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },
        {
            id: 4,
            name: "Omar Sundaram",
            time: "9 hours ago",
            stars: 4,
            review:
                "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },
    ];

    const gestroSwiperRef = useRef(null);
     const [showTooltip, setShowTooltip] = useState(false);

    const renderStars = (filledStars) => {
        return (
            <>
                {Array.from({ length: 5 }, (_, i) => (
                    <IoMdStar
                        key={i}
                        className={`h-6 w-6 ${i < filledStars
                            ? "fill-[#FFB400] text-[#FFB400]"
                            : "text-gray-300"
                            }`}
                    />
                ))}
            </>
        );
    };

    const renderReviewCard = (review, isGoogle = false) => (
        <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-start gap-2">
                <div className="min-w-10 min-h-10">
                    <img
                        src="/gastro-reviews-avatar.svg"
                        alt={review.name}
                        className="w-full h-full"
                    />
                </div>

                <div>
                    <div className="flex">{renderStars(review.stars)}</div>
                    <div className="flex items-center gap-2 py-2">
                        <div className="font-medium !font-roboto text-sm leading-[22px] text-[#000000DE]">{review.name}</div>
                        <div className="font-medium !font-roboto text-sm leading-[22px] text-[#000000DE]">{review.time}</div>
                    </div>
                    <p className="text-[#00000099] text-[15px] leading-[22.5px] tracking-[0.15px] font-normal !font-roboto">{review.review}</p>
                </div>
            </div>
        </div>
    );

    const NavigationButtons = ({ swiperRef, direction }) => {
        const handleClick = () => {
            if (swiperRef.current) {
                if (direction === "prev") {
                    swiperRef.current.swiper.slidePrev();
                } else if (direction === "next") {
                    swiperRef.current.swiper.slideNext();
                }
            }
        };

        return (
            <button
                onClick={handleClick}
                className={`p-2 rounded-full ${direction === "prev" ? " " : ""
                    }`}
            >
                {direction === "prev" ? (
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                ) : (
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                )}
            </button>
        );
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold mr-2">Gestro-offer Reviews</h2>
                    <div className="flex items-center gap-1">
                        <Image src='/rating-one.svg' alt="rating" width={20} height={20} />
                        <div className="text-[#000000] flex items-center gap-1">
                            <span className="font-semibold">4.7</span>
                            <span className="font-semibold">(591)</span>
                        </div>
                         <button
                                        className="ml-1 relative"
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                        onClick={() => alert("Gestro-offer Reviews")}
                                      >
                                        <Image
                                          src="/question-mark.svg"
                                          alt="question-mark"
                                          width={20}
                                          height={20}
                                        />
                                        {showTooltip && (
                                          <div className="absolute flex items-center justify-center w-[170px] h-[30px] top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3  py-1 rounded-md shadow-lg z-50">
                                            Gestro-offer Reviews
                                          </div>
                                        )}
                                      </button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <NavigationButtons swiperRef={gestroSwiperRef} direction="prev" />
                    <NavigationButtons swiperRef={gestroSwiperRef} direction="next" />
                </div>
            </div>
            <div className="relative">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={2}
                    ref={gestroSwiperRef}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                    }}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            {renderReviewCard(review)}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;
