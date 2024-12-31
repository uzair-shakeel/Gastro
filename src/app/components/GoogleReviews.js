import React, { useRef, useState, useEffect } from "react";
import { Info, ArrowRight, ArrowLeft } from "lucide-react";
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
      review: "Lorem Ipsum",
    },
    {
      id: 2,
      name: "Omar Sundaram",
      time: "9 hours ago",
      stars: 3,
      review: "Lorem Ipsum",
    },
    {
      id: 3,
      name: "Omar Sundaram",
      time: "9 hours ago",
      stars: 3,
      review: "Lorem Ipsum",
    },
  ];

  const googleSwiperRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const renderStars = (filledStars) => (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <IoMdStar
          key={i}
          className={`h-6 w-6 ${
            i < filledStars
              ? "fill-[#FFB400] text-[#FFB400]"
              : "text-[#0000003B]"
          }`}
        />
      ))}
    </>
  );

  const renderReviewCard = (review) => (
    <div className="p-4 border rounded-lg bg-white shadow-custom-one">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Image
            src="/google-review-profile.svg"
            alt="google-review"
            width={40}
            height={40}
          />
          <div className="flex-grow">
            <div className="font-medium text-[#000000DE] text-[14px] leading-[22px] tracking-[0.1px] !font-roboto">
              {review.name}
            </div>
            <div className="font-normal text-[#00000099] text-[14px] leading-[21px] tracking-[0.15px] !font-roboto">
              {review.time}
            </div>
          </div>
        </div>
        <img src="/google.svg" alt="Google" className="w-11 h-11" />
      </div>

      <div className="flex mb-2">{renderStars(review.stars)}</div>
      <p className="text-[#000000] text-[15px] leading-[22px] font-normal !font-roboto">
        {review.review}
      </p>
    </div>
  );

  const NavigationButtons = ({ swiperRef, direction, disabled }) => {
    const handleClick = () => {
      if (swiperRef.current && !disabled) {
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
        disabled={disabled}
        className={`p-2 rounded-full ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
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

  useEffect(() => {
    const swiper = googleSwiperRef.current?.swiper;

    if (swiper) {
      const updateButtonsState = () => {
        setIsPrevDisabled(swiper.isBeginning);
        setIsNextDisabled(swiper.isEnd);
      };

      updateButtonsState();

      swiper.on("slideChange", updateButtonsState);

      // Cleanup swiper event listener on component unmount
      return () => {
        swiper.off("slideChange", updateButtonsState);
      };
    }
  }, []);

  return (
    <div>
      {/* Google Reviews Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold mr-2">Google Reviews</h2>
            <div className="relative flex items-center gap-1">
              <Image
                src="/rating-one.svg"
                alt="rating"
                width={20}
                height={20}
              />
              <div className="text-[#000000] flex items-center gap-1 mt-1">
                <span className="font-semibold">4.7</span>
                <span className="font-semibold">(591)</span>
              </div>
              <button
                className="mt-1 ml-1 relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => alert("This is a Google Rating")}
              >
                <Image
                  src="/question-mark.svg"
                  alt="question-mark"
                  width={20}
                  height={20}
                />
                {showTooltip && (
                  <div className="absolute flex items-center justify-center w-[130px] h-[30px] top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg z-50">
                    Google Rating
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NavigationButtons
              swiperRef={googleSwiperRef}
              direction="prev"
              disabled={isPrevDisabled}
            />
            <NavigationButtons
              swiperRef={googleSwiperRef}
              direction="next"
              disabled={isNextDisabled}
            />
          </div>
        </div>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            ref={googleSwiperRef}
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
    </div>
  );
};

export default Reviews;
