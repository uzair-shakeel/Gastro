"use client";
import { useState, useEffect } from "react";
import OrderCard from "./screens/orders";
import DeletePopup from "./components/popups/delete";
import CancelPopup from "./components/popups/cancel";
import Navbar from "./components/Navbar";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { initialOrders } from "../../public/data/initialOrders";
import { mockMessagesByRestaurant } from "../../public/data/mockMessagesByRestaurant";

export default function Home() {
  const [orders, setOrders] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mockMessages, setMockMessages] = useState(null);

  useEffect(() => {
    // Check if localStorage has orders
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      // Parse and set orders from localStorage
      setOrders(JSON.parse(storedOrders));
    } else {
      // If no orders in localStorage, initialize with initialOrders
      const initialOrdersData = JSON.stringify(initialOrders);
      localStorage.setItem("orders", initialOrdersData);
      setOrders(initialOrders);
    }

    // Check if localStorage has mockMessages
    const storedMessages = localStorage.getItem("mockMessages");
    if (storedMessages) {
      // Parse and set mockMessages from localStorage
      setMockMessages(JSON.parse(storedMessages));
    } else {
      // If no mockMessages in localStorage, initialize with mockMessagesByRestaurant
      const initialMessagesData = JSON.stringify(mockMessagesByRestaurant);
      localStorage.setItem("mockMessages", initialMessagesData);
      setMockMessages(mockMessagesByRestaurant);
    }
  }, []);

  useEffect(() => {
    setOrders((prevOrders) =>
      prevOrders
        .sort((a, b) => a.city.localeCompare(b.city))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  }, []);

  // If orders is not found
  if (!orders) {
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

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setOrders((prevOrders) =>
      prevOrders.filter((o) => o.id !== selectedOrder.id)
    );
    setShowDeletePopup(false);
    setSelectedOrder(null);
  };

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setShowCancelPopup(true);
  };

  const confirmCancel = () => {
    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Ensures AM/PM format
    });

    // Initialize updatedOrders and mockMessages only once
    let updatedOrders = [];
    let mockMessages = {};

    setOrders((prevOrders) => {
      updatedOrders = prevOrders.map((o) =>
        o.id === selectedOrder.id
          ? {
              ...o,
              status: "Cancelled",
              note: "The offer has been cancelled",
              time: formattedTime, // Update time
              date: formattedDate, // Update date
            }
          : o
      );

      // Update localStorage with the new orders state
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      return updatedOrders;
    });

    // Handle mock messages
    const storedMessages = localStorage.getItem("mockMessages");
    mockMessages = storedMessages ? JSON.parse(storedMessages) : {};

    const selectedOrderMessages = mockMessages[selectedOrder.id] || [];

    // Avoid adding duplicate messages
    const newMessage = {
      id: selectedOrderMessages.length + 1, // Ensure unique ID
      sender: "ME - FILIP",
      content: "OFFER CANCELLED",
      time: formattedTime, // Includes AM/PM
      date: formattedDate,
      type: "info", // Customize the type if needed
    };

    mockMessages[selectedOrder.id] = [...selectedOrderMessages, newMessage];

    // Save the updated messages to localStorage
    localStorage.setItem("mockMessages", JSON.stringify(mockMessages));

    // Close the cancel popup and reset selected order
    setShowCancelPopup(false);
    setSelectedOrder(null);
  };

  const handleClosePopup = () => {
    setShowDeletePopup(false);
    setShowCancelPopup(false);
    setSelectedOrder(null);
  };

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.city]) {
      acc[order.city] = [];
    }
    acc[order.city].push(order);
    return acc;
  }, {});

  return (
    <Box>
      <Navbar />
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
          <h1 className="text-[24px] font-[600] mb-[24px] tracking-[-2%]">
            Orders
          </h1>

          <div>
            {Object.keys(groupedOrders).map((city) => (
              <div key={city}>
                <h2 className="text-[20px] font-[600] mb-[16px] tracking-[-2%]">
                  {city} -{" "}
                  <span className="text-[18px] font-[500]">
                    {new Date(groupedOrders[city][0].date).toLocaleDateString()}
                  </span>
                </h2>
                <div className="space-y-6 mb-[24px]">
                  {groupedOrders[city].map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      setOrders={setOrders}
                      showPopup={showPopup}
                      setShowPopup={setShowPopup}
                      handleDelete={handleDelete}
                      handleCancel={handleCancel}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {showDeletePopup && selectedOrder && (
            <DeletePopup
              handleClosePopup={handleClosePopup}
              confirmDelete={confirmDelete}
              selectedOrder={selectedOrder}
            />
          )}

          {showCancelPopup && selectedOrder && (
            <CancelPopup
              handleClosePopup={handleClosePopup}
              confirmCancel={confirmCancel}
              selectedOrder={selectedOrder}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
