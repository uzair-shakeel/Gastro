import React from "react";

export default function RestaurantList({
  restaurants,
  selectedRestaurant,
  onSelectAndMarkRead,
  getStatusStyle,
}) {
  // Function to format time without seconds (for display purposes)
  const formatTimeWithoutSeconds = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Ensures time is in AM/PM format
    });
  };

  // Function to parse time and handle different time formats
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

    // Handle standard time format "08:20:05 pm" or "7:00 pm"
    const timeParts = timeString.match(
      /(\d{1,2}):(\d{2}):?(\d{2})?\s?(AM|PM)/i
    );
    if (timeParts) {
      let [_, hours, minutes, seconds, period] = timeParts;
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);
      if (seconds) {
        seconds = parseInt(seconds, 10);
      } else {
        seconds = 0; // Default to 0 if no seconds provided
      }

      if (period.toUpperCase() === "PM" && hours !== 12) {
        hours += 12; // Convert PM to 24-hour format
      }
      if (period.toUpperCase() === "AM" && hours === 12) {
        hours = 0; // Convert 12 AM to 00
      }

      currentTime.setHours(hours);
      currentTime.setMinutes(minutes);
      currentTime.setSeconds(seconds); // Keep seconds for internal use
      return currentTime.getTime();
    }

    // If no matching format, return the timestamp for the original string
    return new Date(timeString).getTime();
  };

  return (
    <div className="lg:w-[30%] w-[280px] custom-scrollbar space-y-[12px] overflow-y-auto h-[72vh]">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className={`p-[12px] hover:bg-gray-100 cursor-pointer relative rounded-[4px] ${
            selectedRestaurant.id === restaurant.id
              ? "border border-[#82110140] bg-[#8211010D]"
              : "border border-[#00000040]"
          }`}
          onClick={() => onSelectAndMarkRead(restaurant)}
        >
          <div className="flex gap-4">
            <div className="lg:w-[114px] w-[80px] lg:h-[93px] h-[80px] bg-gray-200 rounded-[4px]">
              <img
                src="/restaurent-img.jpg"
                className="w-full h-full object-cover rounded-[4px]"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-[600]">{restaurant.location}</h3>
                {restaurant.isUnread && (
                  <span className="w-[12px] h-[12px] bg-[#821101] rounded-full"></span>
                )}
              </div>
              <p className="text-[15px] font-[500] text-black font-satoshi mt-[4px] mb-[8px]">
                {restaurant.date}
              </p>
              <div className="flex flex-wrap justify-between items-center gap-1">
                <span
                  className={`text-[14px] px-2 py-[7px] lg:w-[150px] text-center font-[700] rounded-full ${getStatusStyle(
                    restaurant.status
                  )}`}
                >
                  {restaurant.status}
                </span>
                <span className="text-[14px] text-black font-satoshi uppercase">
                  {formatTimeWithoutSeconds(parseTime(restaurant.time))}{" "}
                  {/* Display without seconds */}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
