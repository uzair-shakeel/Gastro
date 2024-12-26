"use client";
import { useState, useEffect } from "react";
import OrderCard from "./screens/orders";
import DeletePopup from "./components/popups/delete";
import CancelPopup from "./components/popups/cancel";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
  }, []);

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
