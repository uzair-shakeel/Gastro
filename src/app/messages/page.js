"use client";
import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import MainContent from "./MainContent";
import { initialOrders } from "../page";

const tabs = ["ALL", "ACTIVE", "CONFIRMED", "CANCELLED", "ARCHIVED"];
const mockMessagesByRestaurant = {
  1: [
    {
      id: 1,
      sender: "RESTAURANT 1",
      content: "OFFER WAS UPDATED",
      details: 'SUMMARY:\nREPLACED "STEAK" WITH "FISH"',
      time: "11:55 AM",
      date: "11/28/2024",
      type: "update",
    },
    {
      id: 2,
      sender: "ME - FILIP",
      content: "REQUESTED OFFER",
      time: "11:24 AM",
      date: "11/28/2024",
      type: "request",
    },
    {
      id: 3,
      sender: "ME - FILIP",
      content: "OFFER APPROVED",
      time: "08:53 PM",
      date: "11/28/2024",
      type: "approval",
    },
  ],
  2: [
    {
      id: 1,
      sender: "RESTAURANT 2",
      content: "TABLE RESERVED",
      time: "12:30 PM",
      date: "11/28/2024",
      type: "info",
    },
  ],
  3: [
    {
      id: 1,
      sender: "RESTAURANT 3",
      content: "OFFER UNDER REVIEW",
      time: "10:00 AM",
      date: "11/28/2024",
      type: "review",
    },
  ],
};

const parseTime = (timeString) => {
  const currentTime = new Date();

  // Handle "LAST DAY", "5D AGO", "2D AGO"
  if (timeString.toUpperCase().includes("D AGO")) {
    const daysAgo = parseInt(timeString);
    currentTime.setDate(currentTime.getDate() - daysAgo);
    return currentTime.getTime();
  }

  // Handle "LAST DAY"
  if (timeString.toUpperCase() === "LAST DAY") {
    currentTime.setDate(currentTime.getDate() - 1); // Subtract 1 day
    return currentTime.getTime();
  }

  // Handle standard time format "07:53 AM" or "7:00 AM"
  const timeParts = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (timeParts) {
    let [_, hours, minutes, period] = timeParts;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12; // Convert PM to 24-hour format
    }
    if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 00
    }
    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);
    currentTime.setSeconds(0);
    return currentTime.getTime();
  }

  // If no matching format, return the timestamp for the original string
  return new Date(timeString).getTime();
};

// Helper function to format time in 12 hour format
const formatTime = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures time is in AM/PM format
  });
};

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    initialOrders[0]
  );
  const [messages, setMessages] = useState(mockMessagesByRestaurant);
  const [restaurantsState, setRestaurantsState] = useState(initialOrders);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    setFilteredRestaurants(getFilteredRestaurants());
  }, [restaurantsState, activeTab]);

  useEffect(() => {
    const storedOrderId = localStorage.getItem("currentOrderId");
    if (storedOrderId) {
      const updatedOrder = initialOrders.find(
        (order) => order.id.toString() === storedOrderId
      );
      if (updatedOrder) {
        setSelectedRestaurant(updatedOrder);
      }
      localStorage.removeItem("currentOrderId");
    }
  }, []);

  const getFilteredRestaurants = () => {
    let filtered = [];

    switch (activeTab) {
      case "ACTIVE":
        filtered = restaurantsState.filter((r) =>
          ["In Review", "Accepted", "Adjusted"].includes(r.status)
        );
        break;
      case "CONFIRMED":
        filtered = restaurantsState.filter((r) => r.status === "Confirmed");
        break;
      case "CANCELLED":
        filtered = restaurantsState.filter((r) => r.status === "Cancelled");
        break;
      case "ARCHIVED":
        filtered = restaurantsState.filter((r) => r.isArchived === true);
        break;
      case "ALL":
      default:
        filtered = restaurantsState;
        break;
    }

    // Sort by time in descending order (latest first)
    return filtered.sort((a, b) => {
      const timeA = parseTime(a.time);
      const timeB = parseTime(b.time);
      return timeB - timeA; // Sort descending by time (latest first)
    });
  };

  const onSelectAndMarkRead = (restaurant) => {
    setSelectedRestaurant(restaurant);
    const updatedRestaurants = restaurantsState.map((r) =>
      r.id === restaurant.id ? { ...r, isUnread: false } : r
    );
    setRestaurantsState(updatedRestaurants);
  };

  const updateRestaurantStatus = (id) => {
    setSelectedRestaurant((prev) => ({
      ...prev,
      isArchived: !prev.isArchived,
    }));

    const updatedRestaurants = restaurantsState.map((r) =>
      r.id === id
        ? {
            ...r,
            isArchived: !r.isArchived,
          }
        : r
    );
    setRestaurantsState(updatedRestaurants);

    setFilteredRestaurants(getFilteredRestaurants());
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-[#28FF4833] text-[#00B61B]";
      case "Cancelled":
        return "bg-[#E6000033] text-[#E65100]";
      case "In Review":
        return "bg-[#FFA11426] text-[#D37E00]";
      case "Adjusted":
        return "bg-[#FFF1DC] text-[#D88C1C]";
      case "Accepted":
        return "bg-[#FFF1DC] text-[#D88C1C]";
      default:
        return "bg-gray-200/50 text-gray-800";
    }
  };

  const updateTimeAndisUnread = (restaurantId, newTime, isUnread) => {
    setRestaurantsState((prevRestaurants) => {
      const updatedRestaurants = prevRestaurants.map((restaurant) =>
        restaurant.id === restaurantId
          ? { ...restaurant, time: newTime, isUnread }
          : restaurant
      );
      return updatedRestaurants;
    });

    // Re-sort filtered restaurants list after state change
    setFilteredRestaurants((prevFilteredRestaurants) => {
      const updatedFilteredRestaurants = prevFilteredRestaurants.map(
        (restaurant) =>
          restaurant.id === restaurantId
            ? { ...restaurant, time: newTime, isUnread }
            : restaurant
      );
      return updatedFilteredRestaurants.sort((a, b) => {
        const timeA = parseTime(a.time);
        const timeB = parseTime(b.time);
        return timeB - timeA; // Sort by latest first
      });
    });
  };

  const handleAddAutoMessage = (message) => {
    const autoMessage = {
      id: Date.now() + 1,
      sender: "Restaurant",
      content: "Thank you for your message! We will get back to you shortly.",
      time: formatTime(new Date()),
      date: new Date().toLocaleDateString(),
      type: "received",
    };

    const currentTime = autoMessage.time;

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedRestaurant.id]: [
        ...(prevMessages[selectedRestaurant.id] || []),
        autoMessage,
      ],
    }));

    updateTimeAndisUnread(selectedRestaurant.id, currentTime, true);

    // After updating the restaurant state, reapply filtering and sorting
    setRestaurantsState((prevRestaurants) => {
      const updatedRestaurants = prevRestaurants.map((restaurant) =>
        restaurant.id === selectedRestaurant.id
          ? { ...restaurant, time: currentTime, isUnread: true }
          : restaurant
      );
      return updatedRestaurants;
    });

    // Re-sort the restaurant list after the new message is added
    setFilteredRestaurants(getFilteredRestaurants());
  };

  return (
    <div className="h-screen bg-white px-4 lg:px-[24px]">
      {/* Header */}
      <div className="flex justify-between w-full items-center">
        <h1 className="text-[24px] font-[600]">Messages</h1>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-[#CCCCCC33] rounded-[8px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[32px] py-[16px] font-roboto whitespace-nowrap font-[500] text-[14px] ${
                activeTab === tab
                  ? "text-[#821101] border-b-2 border-[#821101]"
                  : "text-[#000000B2]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex pt-[24px] gap-[16px]">
        <RestaurantList
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          onSelectAndMarkRead={onSelectAndMarkRead}
          getStatusStyle={getStatusStyle}
        />
        <MainContent
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          messages={messages}
          setMessages={setMessages}
          getStatusStyle={getStatusStyle}
          updateRestaurantStatus={updateRestaurantStatus}
          setRestaurantsState={setRestaurantsState}
          handleAddAutoMessage={handleAddAutoMessage}
          updateTimeAndisUnread={updateTimeAndisUnread}
        />
      </div>
    </div>
  );
}
