"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DateSelectionDropdown } from "../../components/popups/restaurant/date";
import { CategoryDropdown } from "../../components/popups/restaurant/category";
import { BudgetInput } from "../../components/popups/restaurant/budget";
import GestroOfferReviews from "../../components/GestroOfferReviews";
import GoogleReviews from "../../components/GoogleReviews";
import { QRCodeModal } from "../../components/popups/restaurant/qr-code";
import Image from "next/image";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import Navbar from "../../components/Navbar";
import GuestsDropdown from "../../components/popups/restaurant/guests-dropdown";
import Link from "next/link";
import { maxWidth, width } from "@mui/system";
("../globals.css");
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useParams } from "next/navigation";
import { initialOrders } from "../../../../public/data/initialOrders";

const openingHours = [
  { day: "Monday", hoursOne: "8AM - 1PM", hoursTwo: " 3PM - 11PM" },
  { day: "Tuesday", hoursOne: "8AM - 1PM", hoursTwo: " 3PM - 11PM" },
  { day: "Wednesday", hoursOne: "8AM - 1PM", hoursTwo: " 3PM - 11PM" },
  { day: "Thursday", hoursOne: "8AM - 1PM ", hoursTwo: " 3PM - 11PM" },
  { day: "Friday", hoursOne: "11AM - 11PM" },
  { day: "Saturday", hoursOne: "Closed" },
  { day: "Sunday", hoursOne: "8AM - 1PM ", hoursTwo: " 3PM - 11PM" },
];

export const images = ["/3.jpeg", "/1.jpeg", "/2.jpeg", "/4.jpeg", "/2.jpeg"];

const tags = [
  "Romantic",
  "Live music",
  "Sea View",
  "Sea View",
  "Live music",
  "Child-friendly",
  "Child-friendly",
  "Romantic",
  "Live music",
  "Sea View",
  "Sea View",
  "Live music",
  "Child-friendly",
  "Child-friendly",
];

const matter = {
  name: "Mondal Restaurant Islamabad",
  email: "mondalislamabad.com",
  rating: 4.7,
  reviews: 521,
  title: "Why do we use it?",
  category: "Italian",
  desc1: `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of
          Lorem Ipsum.`,
};

export default function RestaurantDetails() {
  const { id } = useParams(); // Extract the id from the URL
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [locationData, setLocationData] = useState(null);

  const [currentUrl, setCurrentUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isBudgetFilled, setIsBudgetFilled] = useState(false);
  const [budget, setBudget] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [courses, setCourses] = useState({
    lunch: 3,
    dinner: 2,
  });
  const [guests, setGuests] = useState({
    adults: 0,
    kids: 0,
    all: 0,
    meat: 0,
    fish: 0,
    vegetarian: 0,
    vegan: 0,
  });
  const [errors, setErrors] = useState({
    location: false,
    date: false,
    category: false,
    guests: false,
    budget: false,
  });
  const [showErrors, setShowErrors] = useState(false);
  const [restaurant, setRestaurant] = useState(null); // State to store the selected restaurant

  useEffect(() => {
    if (!id) return; // Ensure id is defined before proceeding

    // Retrieve orders from localStorage
    let ordersData = localStorage.getItem("orders");

    // If no orders are found in localStorage, use initialOrders
    if (!ordersData) {
      ordersData = JSON.stringify(initialOrders);
      localStorage.setItem("orders", ordersData);
    }

    const parsedOrders = JSON.parse(ordersData);

    // Find the restaurant by ID
    const foundRestaurant = parsedOrders.find(
      (order) => order.id === parseInt(id, 10)
    );

    // Set the restaurant in state
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    }
  }, [id]);

  useEffect(() => {
    setIsButtonEnabled(!Object.values(errors).some(Boolean));
  }, [errors]);

  const validateInputs = () => {
    const newErrors = {
      location: !locationData || !locationData.inputValue?.trim(),
      date: !selectedDate,
      category: selectedCategories.length === 0,
      guests: !isGuestsFilled,
      budget: !isBudgetFilled,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSearch = () => {
    if (validateInputs()) {
      console.log("Searching...");
    } else {
      setShowErrors(true);
    }
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Disable Button
  const [selectedDate, setSelectedDate] = useState(null);
  const [isGuestsFilled, setIsGuestsFilled] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleGuestsChange = (guestCount) => {
    setIsGuestsFilled(guestCount > 0);
  };

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
  }, []);

  useEffect(() => {
    console.log("Checking button enable state:", {
      selectedDate,
      isGuestsFilled,
      selectedCategories,
      buttonEnabled:
        selectedDate && isGuestsFilled && selectedCategories.length > 0,
    });

    setIsButtonEnabled(
      selectedDate && isGuestsFilled && selectedCategories.length > 0
    );
  }, [selectedDate, isGuestsFilled, selectedCategories]);

  const handleBudgetChange = (value) => {
    setIsBudgetFilled(value !== null && value !== undefined && value !== "");
    setBudget(value);
  };

  // If restaurant is not found
  if (!restaurant) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#821101" }} />
      </Box>
    );
  }

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          padding: {
            xs: "24px 16px", // Top-Bottom: 24px, Left-Right: 16px for smaller devices
            lg: "24px 24px", // Top-Bottom: 24px, Left-Right: 24px for large devices and up
          },
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "1440px",
            width: "100%",
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{ marginBottom: "24px" }}
          >
            <Grid item xs>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                style={{
                  fontWeight: "600",
                  fontSize: "28px",
                  lineHeight: "33.6px",
                  letterSpacing: "-0.02em",
                }}
              >
                {restaurant.location}
              </Typography>
              <div className="flex gap-4 items-center">
                <Typography
                  variant="body2"
                  color="#1D9BF0"
                  component="a"
                  sx={{ fontSize: "16px", fontWeight: "600" }}
                  className="underline flex items-center gap-2 font-semibold border-r border-[#CCCCCC] pr-4"
                  href="https://mondalislamabad.com"
                >
                  <img src="/link-logo.svg" alt="link-logo" />
                  {matter.email}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "600",
                  }}
                  className=" border-r border-[#CCCCCC] pr-4"
                >
                  <img
                    src="/italian.svg"
                    alt="Italian flag"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  />
                  {matter.category}
                </Typography>
                <Box style={{ display: "flex" }}>
                  <Image
                    src="/single-review.svg"
                    alt="single-review"
                    width={20}
                    height={20}
                    className="-mt-1"
                  />
                  <span style={{ fontWeight: "600", marginLeft: "4px" }}>
                    {matter.rating}
                  </span>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#000000",
                      marginLeft: "4px",
                    }}
                  >
                    {matter.reviews}
                  </span>

                  <button
                    className="ml-1 relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() =>
                      alert("This is a Mondal Restaurant Islamabad")
                    }
                  >
                    <Image src="/help .svg" alt="help" width={20} height={20} />
                    {showTooltip && (
                      <div className="absolute flex items-center justify-center w-[230px] h-[30px] top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3  py-1 rounded-md shadow-lg z-50">
                        Mondal Restaurant Islamabad
                      </div>
                    )}
                  </button>
                </Box>
              </div>
            </Grid>

            <Grid className="flex items-center gap-5">
              <Button onClick={() => setQrModalOpen(true)}>
                <img src="/qr_code.svg" />
              </Button>
              <Button
                variant="outlined"
                style={{
                  backgroundColor: isFavorite ? "#82110126" : "#8211010D",
                  border: "none",
                  color: "#000000",
                  height: "42px",
                  marginTop: "-1px",
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: "500",
                }}
                startIcon={
                  <img
                    src={
                      isFavorite ? "/favorite-outline.svg" : "/favorite-two.svg"
                    }
                    alt="Favorite Icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                }
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? "ADDED TO FAVOURITE" : "ADD TO FAVOURITE"}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={{ xs: "center", sm: "space-between" }}
                gap={2}
                mb={3}
              >
                <Box width={{ xs: "100%", sm: "auto" }}>
                  <DateSelectionDropdown
                    onDateChange={handleDateChange}
                    error={showErrors && errors.date}
                  />
                </Box>

                <Box
                  flexGrow={1}
                  width={{ xs: "100%", sm: "2%" }}
                  sx={{ minWidth: { sm: "130px", md: "170px" }, flexShrink: 1 }}
                >
                  <CategoryDropdown
                    courses={courses}
                    setCourses={setCourses}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    generalSearch={false}
                    onCategoryChange={handleCategoryChange}
                    error={showErrors && errors.category}
                  />
                </Box>

                <Box width={{ xs: "100%", sm: "auto" }}>
                  <GuestsDropdown
                    setGuests={setGuests}
                    guests={guests}
                    onSelectionChange={handleGuestsChange}
                    error={showErrors && errors.guests}
                  />
                </Box>

                <Box width={{ xs: "100%", sm: "auto" }}>
                  <BudgetInput onInputChange={handleBudgetChange} />
                </Box>

                <Box width={{ xs: "100%", sm: "auto" }}>
                  <Link href="#">
                    <Button
                      fullWidth
                      onClick={handleSearch}
                      style={{
                        height: 56,
                        fontFamily: "Satoshi, sans-serif",
                        background: "#821101",
                        boxShadow: "none",
                        fontWeight: 500,
                        color: "#F9F9F9",
                        width: "137px",
                        fontSize: "15px",
                        letterSpacing: "0.46px",
                      }}
                    >
                      VIEW OFFER
                    </Button>
                  </Link>
                </Box>
              </Box>

              <Box className="relative mb-8 bg-purple-500 h-[400px] w-full rounded-lg overflow-hidden cursor-pointer">
                <Swiper
                  loop={true}
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  navigation={{
                    nextEl: `.custom-swiper-button-next`,
                    prevEl: `.custom-swiper-button-prev`,
                  }}
                  className="mySwiper h-full "
                  style={{ height: "400px", marginBottom: "16px" }}
                >
                  export{" "}
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt="slide-img"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          userSelect: "none",
                        }}
                        onClick={() => openModal(index)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Modal
                  isOpen={modalOpen}
                  onClose={closeModal}
                  images={images}
                  currentIndex={currentImageIndex}
                />
                <Box className="absolute bottom-[10px] left-[10px]">
                  <IconButton className={`custom-swiper-button-prev  z-10`}>
                    <img
                      src="/left-arrow.svg"
                      alt="left-arrow"
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </Box>
                <Box className="absolute bottom-[10px] right-[10px]">
                  <IconButton
                    className={`custom-swiper-button-next  text-white z-20 `}
                  >
                    <img
                      src="/right-arrow.svg"
                      alt="right-arrow"
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </Box>
              </Box>

              <ImageGrid />

              <Typography
                sx={{
                  paddingTop: "24px !important",
                  color: "black",
                  fontSize: "18px",
                  lineHeight: "27px",
                  fontWeight: "500",
                  letterSpacing: "-0.02em",
                }}
              >
                {matter.desc1}
              </Typography>

              <Typography
                sx={{
                  paddingTop: "24px !important",
                  color: "black",
                  fontSize: "18px",
                  lineHeight: "27px",
                  fontWeight: "600",
                  letterSpacing: "-0.02em",
                }}
              >
                {matter.title}
              </Typography>

              <Typography
                style={{
                  color: "black",
                  fontSize: "18px",
                  lineHeight: "27px",
                  fontWeight: "500",
                  letterSpacing: "-0.02em",
                }}
              >
                {matter.desc1}
              </Typography>

              <div className="border border-[#0000001A] rounded p-4 mt-6">
                <Typography
                  style={{
                    marginBottom: "12px",
                    color: "#000000",
                    fontSize: "20px",
                    lineHeight: "26px",
                    fontWeight: "600",
                  }}
                >
                  Tags:
                </Typography>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {tags.map((tag, index) => (
                    <Typography
                      key={index}
                      style={{
                        color: "#821101",
                        fontFamily: "'Roboto', sans-serif !important",
                        backgroundColor: "#82110114",
                        borderRadius: "16px",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "18px",
                        letterSpacing: "0.16px",
                        padding: "4px 12px",
                      }}
                    >
                      {tag}
                    </Typography>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <GestroOfferReviews />
              <GoogleReviews />
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                style={{
                  marginBottom: "24px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      lineHeight: "26px",
                      fontWeight: "600",
                      marginBottom: "16px",
                    }}
                  >
                    Opening Hours:
                  </Typography>
                  {openingHours.map((day) => {
                    const isToday =
                      new Date().toLocaleString("en-US", {
                        weekday: "long",
                      }) === day.day;
                    const showSeparator =
                      day.hoursTwo &&
                      day.day !== "Friday" &&
                      day.day !== "Saturday";
                    return (
                      <div
                        key={day.day}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                          padding: "10px",
                          paddingLeft: "15px",
                          opacity: day.day === "Saturday" ? "70%" : "100%",
                          paddingRight: "15px",
                          backgroundColor:
                            day.day === "Saturday"
                              ? "#F9F9F9"
                              : isToday
                              ? "#FFEBEB"
                              : "#F9F9F9",
                        }}
                      >
                        <Typography
                          style={{
                            color: isToday ? "black" : "inherit",
                            display: "flex",
                            gap: "5px",
                          }}
                          sx={{
                            color: "black",
                            fontSize: "16px",
                            lineHeight: "19.2px",
                            fontWeight: "600",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          <span>
                            {day.day === "Saturday" ? (
                              <img
                                src="/schedule-black.svg"
                                alt="Schedule Icon"
                                className="!opacity-70"
                              />
                            ) : (
                              <img src="/schedule.svg" alt="Schedule Icon" />
                            )}
                          </span>
                          {day.day}:
                        </Typography>
                        <div
                          className={`flex items-center ${
                            showSeparator ? "gap-1.5" : ""
                          }`}
                        >
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "16px",
                              lineHeight: "19.2px",
                              fontWeight: "500",
                              opacity: day.day === "Saturday" ? "70%" : "100%",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {day.hoursOne}
                          </Typography>
                          {day.hoursTwo &&
                            day.day !== "Friday" &&
                            day.day !== "Saturday" && (
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: "16px",
                                  lineHeight: "19.2px",
                                  fontWeight: "500",
                                  letterSpacing: "-0.02em",
                                  opacity: "50%",
                                }}
                              >
                                &
                              </Typography>
                            )}
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "16px",
                              lineHeight: "19.2px",
                              fontWeight: "500",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {day.hoursTwo}
                          </Typography>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card
                style={{
                  marginBottom: "24px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "20px",
                      lineHeight: "26px",
                      fontWeight: "600",
                      marginBottom: "16px",
                    }}
                  >
                    Contact Details:
                  </Typography>
                  {[
                    {
                      icon: (
                        <EmailIcon
                          sx={{
                            width: "20px",
                            height: "20px",
                            color: "#821101",
                          }}
                        />
                      ),
                      label: "Email",
                      value: "mondalislamabad@hotel.com",
                    },
                    {
                      icon: (
                        <LocalPhoneIcon
                          sx={{
                            width: "20px",
                            height: "20px",
                            color: "#821101",
                          }}
                        />
                      ),
                      label: "Mobile",
                      value: "+1 234 567 8910",
                    },
                    {
                      icon: (
                        <WhatsAppIcon
                          sx={{
                            width: "20px",
                            height: "20px",
                            color: "#821101",
                          }}
                        />
                      ),
                      label: "WhatsApp",
                      value: "+1 234 567 8910",
                    },
                    {
                      icon: "/distance.svg",
                      label: "Address",
                      value:
                        "Food Street near Cricket Stadium, Islamabad, Pakistan",
                    },
                  ].map((detail, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "16px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "16px",
                          lineHeight: "19.2px",
                          fontWeight: "600",
                          letterSpacing: "-0.02em",
                        }}
                        className="flex gap-[6px] text-opacity-80"
                      >
                        {detail.label === "Address" ? (
                          <img
                            src={detail.icon}
                            alt={`${detail.label} icon`}
                            style={{ width: "20px", height: "20px" }}
                          />
                        ) : (
                          detail.icon
                        )}
                        {detail.label}:
                      </Typography>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "16px",
                          lineHeight: "19.2px",
                          fontWeight: "500",
                          letterSpacing: "-0.02em",
                        }}
                        className="w-2/3 text-right"
                      >
                        {detail.value}
                      </Typography>
                    </div>
                  ))}
                  <Box style={{ height: "300px" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.8755163013743!2d73.0290297!3d33.6938229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbef8c1c9669f%3A0x2b24f27c6c226856!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1629789876543!5m2!1sen!2s&controls=0&disableDefaultUI=true&zoomControl=false"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <QRCodeModal
            open={qrModalOpen}
            onClose={() => setQrModalOpen(false)}
            url={currentUrl}
          />
        </Box>
      </Box>
    </div>
  );
}
