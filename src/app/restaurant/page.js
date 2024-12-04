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
import { Favorite, FavoriteBorder, Info, Star } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DateSelectionModal } from "../components/popups/restaurant/date";
import { CategoryModal } from "../components/popups/restaurant/category";
import { GuestsModal } from "../components/popups/restaurant/guests";
import { BudgetInput } from "../components/popups/restaurant/budget";
import Reviews from "../components/reviews";
import { QRCodeModal } from "../components/popups/restaurant/qr-code";
import { RestaurantCarousel } from "../components/restaurant-carousel";
("../globals.css");

const openingHours = [
  { day: "Monday", hours: "8AM - 1PM & 3PM - 11PM" },
  { day: "Tuesday", hours: "8AM - 1PM & 3PM - 11PM" },
  { day: "Wednesday", hours: "8AM - 1PM & 3PM - 11PM" },
  { day: "Thursday", hours: "8AM - 1PM & 3PM - 11PM" },
  { day: "Friday", hours: "11AM - 11PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "8AM - 1PM & 3PM - 11PM" },
];

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
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // This will only run on the client side
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: "24px" }}
      >
        <Grid item xs>
          <Typography variant="h4" component="h1" gutterBottom>
            Mondal Restaurant Islamabad
          </Typography>
          <div className="flex gap-4 items-center">
            <Typography
              variant="body2"
              color="primary"
              component="a"
              href="https://mondalislamabad.com"
              style={{ textDecoration: "none" }}
            >
              mondalislamabad.com
            </Typography>
            <Typography
              variant="body2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/italian.svg"
                alt="Italian flag"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              Italian
              <Star style={{ color: "#FFD700", marginLeft: "16px" }} />
              <span style={{ fontWeight: "bold", marginLeft: "4px" }}>4.7</span>
              <span style={{ color: "gray", marginLeft: "4px" }}>(591)</span>
              <Info
                style={{
                  color: "gray",
                  marginLeft: "4px",
                  width: "16px",
                  height: "16px",
                }}
              />
            </Typography>
          </div>
        </Grid>
        <Grid className="flex items-center gap-5">
          <Button onClick={() => setQrModalOpen(true)}>
            <img src="/qr_code.svg" />
          </Button>
          <Button
            variant="outlined"
            startIcon={
              isFavorite ? <Favorite color="error" /> : <FavoriteBorder />
            }
            onClick={() => setIsFavorite(!isFavorite)}
          >
            ADD TO FAVOURITE
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginBottom: "24px" }}>
        <Grid item xs="auto">
          <DateSelectionModal />
        </Grid>
        <Grid item xs="auto">
          <CategoryModal />
        </Grid>
        <Grid item xs="auto">
          <GuestsModal />
        </Grid>
        <Grid item xs="auto">
          <BudgetInput />
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            // color="#821101"
            fullWidth
            style={{
              height: "100%",
              backgroundColor: "#821101",
              padding: "14px 16px",
              boxShadow: "none",
            }} // Adjust padding for the button
          >
            VIEW OFFER
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
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
              {[1, 2, 3, 4, 5].map((index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`/3.jpeg`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
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
                className={`custom-swiper-button-next bg-black text-white z-50 `}
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

          <Grid container spacing={2} style={{ marginBottom: "24px" }}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Grid item xs={2.4} key={index}>
                <img
                  src={`/${index}.jpeg`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="body1" paragraph>
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

          <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
            Why do we use it?
          </Typography>
          <Typography variant="body1" paragraph>
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

          <Typography variant="h6" gutterBottom style={{ marginTop: "24px" }}>
            Tags:
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {tags.map((tag, index) => (
              <Typography
                key={index}
                variant="body2"
                style={{
                  color: "#821101",
                  backgroundColor: "rgba(130, 17, 1, 0.08)",
                  borderRadius: "16px",
                  padding: "4px 12px",
                }}
              >
                {tag}
              </Typography>
            ))}
          </div>

          <Reviews />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            style={{
              marginBottom: "24px",
              border: "1px solid rgba(0, 0, 0, 0.1)", // Black border with 10% opacity
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom className="font-bold">
                Opening Hours:
              </Typography>
              {openingHours.map((day) => (
                <div
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)} // Set selected day on click
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    cursor: "pointer", // Add pointer cursor
                    backgroundColor:
                      selectedDay === day.day ? "#8211011A" : "#F9F9F9", // Highlight selected day
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", display: "flex", gap: "5px" }}
                  >
                    <span>
                      {
                        day.day === "Saturday" ? (
                          <img src="/schedule-black.svg" />
                        ) : (
                          <img src="/schedule.svg" />
                        ) // Highlight selected day
                      }
                    </span>
                    {day.day}:
                  </Typography>
                  <Typography variant="body2">{day.hours}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card
            style={{
              marginBottom: "24px",
              border: "1px solid rgba(0, 0, 0, 0.1)", // Black border with 10% opacity
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom className="font-bold">
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
                  icon: "/schedule.svg",
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
                    marginBottom: "8px",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    backgroundColor: "#F9F9F9",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", display: "flex", gap: "5px" }}
                  >
                    <img
                      src={detail.icon}
                      alt={`${detail.label} icon`}
                      style={{ width: "20px", height: "20px" }}
                    />
                    {detail.label}
                  </Typography>
                  <Typography variant="body2" className="w-2/3 text-right">
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
  );
}
