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

  const getFilteredRestaurants = () => {
    switch (activeTab) {
      case "ACTIVE":
        return restaurantsState.filter((r) =>
          ["In Review", "Accepted", "Adjusted"].includes(r.status)
        );
      case "CONFIRMED":
        return restaurantsState.filter((r) => r.status === "Confirmed");
      case "CANCELLED":
        return restaurantsState.filter((r) => r.status === "Cancelled");
      case "ARCHIVED":
        return restaurantsState.filter((r) => r.isArchived === true);
      case "ALL":
      default:
        return restaurantsState;
    }
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

    setFilteredRestaurants((prevFilteredRestaurants) => {
      const updatedFilteredRestaurants = prevFilteredRestaurants.map(
        (restaurant) =>
          restaurant.id === restaurantId
            ? { ...restaurant, time: newTime, isUnread }
            : restaurant
      );
      return updatedFilteredRestaurants;
    });
  };

  const handleAddAutoMessage = (message) => {
    const autoMessage = {
      id: Date.now() + 1,
      sender: "Restaurant",
      content: "Thank you for your message! We will get back to you shortly.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
              className={`px-[32px] py-[16px] font-roboto whitespace-nowrap font-[500] text-[14px] ${activeTab === tab
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
