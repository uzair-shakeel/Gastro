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
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: "Cancelled" } : o
      )
    );
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
    <div>
      <Navbar />
      <div className="px-4 py-6">
        <div className="max-w-[1440px] mx-auto">
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
        </div>
      </div>
    </div>
  );
}
