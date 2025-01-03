"use client";
import { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import MainContent from "./MainContent";
import { initialOrders } from "../../../../public/data/initialOrders";
import Navbar from "../../components/Navbar";
import { Box, CircularProgress } from "@mui/material";
import { mockMessagesByRestaurant } from "../../../../public/data/mockMessagesByRestaurant";
import { useParams } from "next/navigation";

const tabs = ["ALL", "ACTIVE", "CONFIRMED", "CANCELLED", "ARCHIVED"];

const parseTime = (timeString) => {
  const currentTime = new Date();

  // Handle "LAST DAY", "5D AGO", "2D AGO"
  if (timeString.toUpperCase().includes("D AGO")) {
    const daysAgo = parseInt(timeString);
    currentTime.setDate(currentTime.getDate() - daysAgo);
    currentTime.setSeconds(0); // Ensure seconds are set to 0 for consistency
    return currentTime.getTime();
  }

  // Handle "LAST DAY"
  if (timeString.toUpperCase() === "LAST DAY") {
    currentTime.setDate(currentTime.getDate() - 1); // Subtract 1 day
    currentTime.setSeconds(0); // Ensure seconds are set to 0 for consistency
    return currentTime.getTime();
  }

  // Handle standard time format "07:53 AM" or "7:00 AM" (without seconds)
  const timeParts = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
  if (timeParts) {
    let [_, hours, minutes, period] = timeParts;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    // Convert AM/PM to 24-hour format
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    }
    if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);
    currentTime.setSeconds(0); // Ensure seconds are set to 0 for consistency
    return currentTime.getTime();
  }

  // Handle time format with seconds "07:53:30 AM"
  const timeWithSeconds = timeString.match(
    /(\d{1,2}):(\d{2}):(\d{2})\s?(AM|PM)/i
  );
  if (timeWithSeconds) {
    let [_, hours, minutes, seconds, period] = timeWithSeconds;
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = parseInt(seconds, 10);

    // Convert AM/PM to 24-hour format
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    }
    if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);
    currentTime.setSeconds(seconds); // Set seconds as per the input
    return currentTime.getTime();
  }

  // If no matching format, return the timestamp for the original string
  return new Date(timeString).getTime();
};

// Helper function to format time in 12-hour format
const formatTime = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", // Include seconds in the formatted time
    hour12: true, // Ensures time is in AM/PM format
  });
};

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantsState, setRestaurantsState] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [messages, setMessages] = useState(mockMessagesByRestaurant);
  const params = useParams();
  const restaurantId = params.id;

  useEffect(() => {
    // Check if mockMessages exist in localStorage
    const storedMessages = localStorage.getItem("mockMessages");

    if (storedMessages) {
      // Parse and set messages from localStorage
      setMessages(JSON.parse(storedMessages));
    } else {
      // If no messages in localStorage, initialize with mockMessagesByRestaurant
      const initialMessagesData = JSON.stringify(mockMessagesByRestaurant);
      localStorage.setItem("mockMessages", initialMessagesData);
      setMessages(mockMessagesByRestaurant);
    }
  }, []);

  // Fetch orders from localStorage or fallback to `initialOrders`
  useEffect(() => {
    const fetchInitialOrders = () => {
      if (typeof window !== "undefined") {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
          return JSON.parse(storedOrders);
        } else {
          // Use initialOrders if not found in localStorage
          return initialOrders;
        }
      }
      return initialOrders;
    };

    const orders = fetchInitialOrders();
    let updatedOrders = orders;

    if (orders.length > 0) {
      if (restaurantId) {
        const urlSelectedRestaurant = orders.find(
          (order) => order.id.toString() === restaurantId
        );
        if (urlSelectedRestaurant) {
          setSelectedRestaurant(urlSelectedRestaurant);

          // Update isUnread to false for the selected restaurant
          updatedOrders = orders.map((order) =>
            order.id.toString() === restaurantId
              ? { ...order, isUnread: false }
              : order
          );
        }
      } else {
        // If no restaurantId, default to the first order and set its isUnread to false
        setSelectedRestaurant(orders[0]);

        updatedOrders = orders.map((order, index) =>
          index === 0 ? { ...order, isUnread: false } : order
        );
      }

      // Update localStorage with the modified orders
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      // Update state with the modified orders
      setRestaurantsState(updatedOrders);
    }
  }, [restaurantId]);

  useEffect(() => {
    setFilteredRestaurants(getFilteredRestaurants());
  }, [restaurantsState, activeTab]);

  useEffect(() => {
    const storedOrderId = localStorage.getItem("currentOrderId");
    if (storedOrderId && restaurantsState.length > 0) {
      const updatedOrder = restaurantsState.find(
        (order) => order.id.toString() === storedOrderId
      );
      if (updatedOrder) {
        setSelectedRestaurant(updatedOrder);
      }
      localStorage.removeItem("currentOrderId");
    }
  }, [restaurantsState]);

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
        filtered = restaurantsState.filter((r) => r.isArchived !== true);
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
    // Update the selected restaurant
    setSelectedRestaurant(restaurant);

    // Update the restaurant state to mark the restaurant as read
    const updatedRestaurants = restaurantsState.map((r) =>
      r.id === restaurant.id ? { ...r, isUnread: false } : r
    );
    setRestaurantsState(updatedRestaurants);

    localStorage.setItem("orders", JSON.stringify(updatedRestaurants));
  };

  const updateRestaurantStatus = (id) => {
    // Toggle the isArchived status for the selected restaurant
    setSelectedRestaurant((prev) => ({
      ...prev,
      isArchived: !prev.isArchived,
    }));

    // Update the restaurant state
    const updatedRestaurants = restaurantsState.map((r) =>
      r.id === id
        ? {
            ...r,
            isArchived: !r.isArchived,
          }
        : r
    );
    setRestaurantsState(updatedRestaurants);

    // Update the filtered restaurants list
    setFilteredRestaurants(getFilteredRestaurants());

    // Update localStorage with the updated restaurant data
    localStorage.setItem("orders", JSON.stringify(updatedRestaurants));
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

      // Update localStorage with the updated restaurant data
      localStorage.setItem("orders", JSON.stringify(updatedRestaurants));

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

      // Update localStorage with the updated restaurant data
      localStorage.setItem("orders", JSON.stringify(updatedRestaurants));

      return updatedRestaurants;
    });

    // Re-sort the restaurant list after the new message is added
    setFilteredRestaurants(getFilteredRestaurants());
  };

  // If restaurant is not found, show an error message
  if (!selectedRestaurant) {
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
      <Box
        sx={{
          height: "75vh",
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
        </Box>
      </Box>
    </Box>
  );
}
