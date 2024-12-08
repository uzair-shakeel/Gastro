"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DateSelectionDropdown } from "../components/popups/restaurant/date";
import { CategoryModal } from "../components/popups/restaurant/category";
import { GuestsModal } from "../components/popups/restaurant/guests";
import { BudgetInput } from "../components/popups/restaurant/budget";
import Reviews from "../components/reviews";
import { QRCodeModal } from "../components/popups/restaurant/qr-code";
import Image from "next/image";
import ImageGrid from "./ImageGrid";
import Modal from "./Modal";
import Navbar from "../components/Navbar";
import EventSearch from "./EventSearch";
("../globals.css");

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

export default function RestaurantDetails() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div>
      <Navbar />
      <div
        className="container"
        style={{
          margin: "0 auto",
          padding: "0px 24px 24px",
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
              Mondal Restaurant Islamabad
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
                mondalislamabad.com
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
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                />
                Italian
              </Typography>
              <Box style={{ display: "flex" }}>
                <Star style={{ color: "#FFD700" }} />
                <span style={{ fontWeight: "600", marginLeft: "4px" }}>4.7</span>
                <span
                  style={{
                    fontWeight: "600",
                    color: "#000000",
                    marginLeft: "4px",
                  }}
                >
                  (591)
                </span>
                <Image
                  src="/help .svg"
                  alt="help"
                  width={20}
                  height={20}
                  className="ml-2"
                />
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
                fontWeight: "500",
              }}
              startIcon={
                isFavorite ? (
                  <Favorite style={{ color: "#821101" }} />
                ) : (
                  <FavoriteBorder style={{ color: "#821101" }} />
                )
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
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
              mb={3}
            >
              <Box>
                <DateSelectionDropdown />
              </Box>
              <Box flexGrow={1}>
                <CategoryModal />
              </Box>
              <Box>
                <GuestsModal />
              </Box>
              <Box>
                <BudgetInput />
              </Box>
              <Box>
                <Button
                  fullWidth
                  className=" h-[56px] bg-[#821101] font-satoshi "
                  style={{
                    boxShadow: "none",
                    backgroundColor: "#821101",
                    fontWeight: "500",
                    color: "#F9F9F9",
                    width: "137px",
                    fontSize: "15px",
                    letterSpacing: "0.46px",
                  }}
                >
                  VIEW OFFER
                </Button>
              </Box>
            </Box>

            <Box className="relative mb-8 bg-purple-500 h-[400px] w-full rounded-lg overflow-hidden">
              <Swiper
                loop={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: `.custom-swiper-button-next`,
                  prevEl: `.custom-swiper-button-prev`,
                }}
                className="mySwiper h-full"
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
              style={{
                marginTop: "24px !important",
                color: "black",
                fontSize: "18px",
                lineHeight: "27px",
                fontWeight: "500",
                letterSpacing: "-0.02em",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum.
            </Typography>

            <Typography
              style={{
                marginTop: "24px !important",
                color: "black",
                fontSize: "18px",
                lineHeight: "27px",
                fontWeight: "600",
                letterSpacing: "-0.02em",
              }}
            >
              Why do we use it?
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
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The point
              of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop publishing
              packages and web page editors now use Lorem Ipsum as their default
              model text, and a search for 'lorem ipsum' will uncover many web
              sites still in their infancy. Various versions have evolved over the
              years, sometimes by accident, sometimes on purpose (injected humour
              and the like).
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

            <Reviews />
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
                    new Date().toLocaleString("en-US", { weekday: "long" }) ===
                    day.day;
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
                        paddingRight: "15px",
                        backgroundColor:
                          day.day === "Saturday"
                            ? "#F9F9F9"
                            : isToday
                              ? "#FFEBEB"
                              : "#F9F9F9",
                        opacity:
                          day.day === "Saturday"
                            ? "80%"
                            : isToday
                              ? "100%"
                              : "100%",
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
                            <img src="/schedule-black.svg" alt="Schedule Icon" />
                          ) : (
                            <img src="/schedule.svg" alt="Schedule Icon" />
                          )}
                        </span>
                        {day.day}:
                      </Typography>
                      <div
                        className={`flex items-center ${showSeparator ? "gap-1.5" : ""
                          }`}
                      >
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "16px",
                            lineHeight: "19.2px",
                            fontWeight: "500",
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
                    icon: "/schedule.svg",
                    label: "Email:",
                    value: "mondalislamabad@hotel.com",
                  },
                  {
                    icon: "/schedule.svg",
                    label: "Mobile:",
                    value: "+1 234 567 8910",
                  },
                  {
                    icon: "/schedule.svg",
                    label: "WhatsApp:",
                    value: "+1 234 567 8910",
                  },
                  {
                    icon: "/distance.svg",
                    label: "Address:",
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
                      className="flex gap-1.5 text-opacity-80"
                    >
                      <img
                        src={detail.icon}
                        alt={`${detail.label} icon`}
                        style={{ width: "20px", height: "20px" }}
                      />
                      {detail.label}
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
      </div>
    </div>
  );
}
