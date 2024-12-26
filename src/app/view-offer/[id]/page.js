"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Box } from "@mui/material";
import MenuItem from "./MenuItem";
import MenuSection from "./MenuSection";
import Navbar from "../../components/Navbar";
import SubtotalSection from "./SubtotalSection";
import { GuestInput } from "./GuestInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Menu() {
  const { id } = useParams(); // Extract the id from the URL
  const [restaurant, setRestaurant] = useState(null); // State to store the selected restaurant

  useEffect(() => {
    // Retrieve orders from localStorage
    const ordersData = localStorage.getItem("orders");
    const parsedOrders = ordersData ? JSON.parse(ordersData) : [];

    // Find the restaurant by ID
    const foundRestaurant = parsedOrders.find(
      (order) => order.id === parseInt(id, 10)
    );

    // Set the restaurant in state
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    }
  }, [id]);

  const [editable, setEditable] = useState(false);
  const [guests, setGuests] = useState(7);

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const totalGuests = 21;
  const totalAmount = "6'000";

  const handleGuestChange = (value) => {
    setIsGuestFilled(value !== null && value !== undefined && value !== "");
    setGuests(value);
  };

  // If restaurant is not found, show an error message
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
        <Typography variant="h4" color="error">
          Restaurant not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box sx={{ minHeight: "100vh", backgroundColor: "#fffff" }}>
        <Box
          sx={{
            maxWidth: "1473px",
            margin: "0 auto",
            padding: "2rem 1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#000000",
                  lineHeight: "28px",
                  letterSpacing: "-0.02em",
                }}
              >
                {restaurant.location}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "24px",
                  color: "#000000B2",
                  letterSpacing: "-0.02em",
                  fontWeight: "600",
                }}
              >
                - Lunch - 29.10.2024
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: "48%",
                display: "flex",
                width: "auto",
                gap: "16px",
              }}
            >
              <Typography
                sx={{
                  minWidth: "40%",
                  minHeight: "56px",
                  maxHeight: "56px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: '"Roboto", sans-serif !important',
                  borderBottom: "2px solid #821101",
                  color: "#821101",
                  backgroundColor: "#CCCCCC33",
                }}
              >
                A LA CARTE
              </Typography>
              {editable && (
                <GuestInput
                  opacityInput="opacity-100"
                  valueOfInput={totalGuests}
                  onInputChange={handleGuestChange}
                  disable={!editable}
                />
              )}
            </Box>
          </Box>

          {/* Sections */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Course Starter */}
            <MenuSection
              title="1 - Course Starter"
              totalPrice="630"
              editable={editable}
            >
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="meat"
                price="140"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                editable={editable}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction and if the text will be the ma..."
                type="fish"
                price="210"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                editable={editable}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="vegetarian"
                price="280"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                editable={editable}
              />
            </MenuSection>

            {/* Course Main */}
            <MenuSection
              title="2 - Course Main"
              totalPrice="6000"
              editable={editable}
            >
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="meat"
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                editable={editable}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                isSideDish
                editable={editable}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="meat"
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                isChild
                editable={editable}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                isSideDish
                editable={editable}
              />
            </MenuSection>
          </Box>
          <SubtotalSection
            totalGuests={totalGuests}
            totalAmount={totalAmount}
            editable={editable}
            setEditable={setEditable}
            restaurant={restaurant}
            setRestaurant={setRestaurant}
          />
        </Box>
      </Box>
    </Box>
  );
}
