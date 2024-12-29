"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, Box, CircularProgress } from "@mui/material";
import MenuItem from "./MenuItem";
import MenuSection from "./MenuSection";
import Navbar from "../../components/Navbar";
import SubtotalSection from "./SubtotalSection";
import { GuestInput } from "./GuestInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialOrders } from "../../../../public/data/initialOrders";

export default function Menu() {
  const { id } = useParams(); // Extract the id from the URL
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(null); // State to store the selected restaurant
  const [guests, setGuests] = useState(7);
  const [originalGuests, setOriginalGuests] = useState(7);
  const [remarks, setRemarks] = useState("");
  const [editable, setEditable] = useState(false);
  const totalGuests = 21;
  const totalAmount = "6'000";

  useEffect(() => {
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
      setRemarks(foundRestaurant.remarks);
    }
  }, [id]);

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const handleTotalGuestChange = (value) => {
    setIsGuestFilled(value !== null && value !== undefined && value !== "");
    setGuests(value);
  };

  const handleToggleEditing = () => {
    setGuests(originalGuests);
    setRemarks(restaurant.remarks);
    setEditable(!editable);
  };

  const handleRequestClick = () => {
    if (restaurant) {
      const currentDate = new Date();
      const formattedDate = `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
      const formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensures AM/PM format
      });

      // Update the local state
      const updatedRestaurant = {
        ...restaurant,
        status: "In Review",
        note: "This offer is being reviewed by the restaurant.",
        remarks: remarks,
        time: formattedTime, // Add or update the time
        date: formattedDate, // Add or update the date
      };
      setRestaurant(updatedRestaurant);

      // Update localStorage
      let ordersData = JSON.parse(localStorage.getItem("orders"));
      const updatedOrders = ordersData.map((order) =>
        order.id === parseInt(id, 10)
          ? {
              ...order,
              status: "In Review",
              note: "This offer is being reviewed by the restaurant.",
              remarks: remarks,
              time: formattedTime, // Update the time
              date: formattedDate, // Update the date
            }
          : order
      );
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Add a new message for "Requested Offer"
      const storedMessages = localStorage.getItem("mockMessages");
      if (storedMessages) {
        const mockMessages = JSON.parse(storedMessages);
        const restaurantMessages = mockMessages[restaurant.id] || [];

        // Create a new message
        const newMessage = {
          id: restaurantMessages.length + 1, // Increment ID
          sender: "ME - FILIP",
          content: "REQUESTED OFFER",
          time: formattedTime, // Includes AM/PM
          date: formattedDate,
          type: "request", // Specify the type
        };

        // Add the new message to the restaurant's messages
        mockMessages[restaurant.id] = [...restaurantMessages, newMessage];

        // Save the updated messages to localStorage
        localStorage.setItem("mockMessages", JSON.stringify(mockMessages));
      }

      // Toggle edit mode
      setEditable(!editable);

      // Redirect to /messages page
      router.push(`/messages/${restaurant.id}`);
    }
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
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#fffff",
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
                  onInputChange={handleTotalGuestChange}
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
            handleToggleEditing={handleToggleEditing}
            remarks={remarks}
            onRemarksChange={handleRemarksChange}
            handleRequestClick={handleRequestClick}
          />
        </Box>
      </Box>
    </Box>
  );
}
