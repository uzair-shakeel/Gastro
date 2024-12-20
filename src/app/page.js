"use client";
import { useState, useEffect } from "react";
import OrderCard from "./screens/orders";
import DeletePopup from "./components/popups/delete";
import CancelPopup from "./components/popups/cancel";

export const initialOrders = [
  {
    id: 1,
    location: "Restaurant 1",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "Confirmed",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isMessaged: true,
    isUnread: false,
    isArchived: true,
    city: "Zürich",
    time: "09:10 AM",
    isUnread: false,
    isArchived: true,
  },
  {
    id: 2,
    location: "Restaurant 2",
    persons: "x10",
    date: "11/02/2024",
    meal: "Lunch",
    status: "In Review",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isUnread: false,
    isArchived: false,
    isMessaged: true,
    city: "Zürich",
    time: "07:53 AM",
    isUnread: true,
    isArchived: false,
  },
  {
    id: 3,
    location: "Restaurant 3",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "In Review",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isUnread: false,
    isArchived: false,
    isMessaged: false,
    city: "Las Vegas",
    time: "LAST DAY",
    isUnread: false,
    isArchived: true,
  },
  {
    id: 4,
    location: "Restaurant 4",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "Adjusted",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isUnread: false,
    isArchived: false,
    isMessaged: false,
    city: "Las Vegas",
    time: "2D AGO",
    isUnread: false,
    isArchived: false,
  },
  {
    id: 5,
    location: "Restaurant 5",
    persons: "x10",
    date: "11/01/2024",
    meal: "Lunch",
    status: "Accepted",
    amount: "CHF 1500",
    description:
      "There will be any sort of internal notes which anyone can put there for remembrance and it will be shown to restaurants.",
    note: "The offer has been accepted by the restaurant.",
    isUnread: false,
    isArchived: false,
    isMessaged: false,
    city: "Las Vegas",
    time: "5D AGO",
    isUnread: true,
    isArchived: false,
  },
];

export default function Home() {
  const [orders, setOrders] = useState(initialOrders);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders((prevOrders) =>
      prevOrders
        .sort((a, b) => a.city.localeCompare(b.city))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  }, []);

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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {Object.keys(groupedOrders).map((city) => (
        <div key={city}>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            {city} -{new Date(groupedOrders[city][0].date).toLocaleDateString()}
          </h2>
          <div className="space-y-6">
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
  );
}
