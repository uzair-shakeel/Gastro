import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { PiPaperPlaneRightLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";

export default function MainContent({
  selectedRestaurant,
  setSelectedRestaurant,
  messages,
  setMessages,
  getStatusStyle,
  updateRestaurantStatus,
  setRestaurantsState,
  handleAddAutoMessage,
  updateTimeAndisUnread,
}) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // For popup visibility
  const messagesAreaRef = useRef(null); // Ref to the scrollable messages area
  const popupRef = useRef(null); // Ref for popup

  // Scroll to the bottom of the messages area after the component is mounted or when messages change
  useLayoutEffect(() => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  }, [messages]); // Trigger whenever messages change

  // Close the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "ME - FILIP",
      content: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString(),
      type: "sent",
    };

    const currentTime = newMessage.time; // Capture the message time

    // Add the new message to the messages state
    setMessages((prev) => ({
      ...prev,
      [selectedRestaurant.id]: [
        ...(prev[selectedRestaurant.id] || []),
        newMessage,
      ],
    }));

    setMessage(""); // Clear the input field

    // Trigger automatic response if the message matches the condition
    if (message.trim().toLowerCase() === "sth") {
      setTimeout(() => {
        handleAddAutoMessage(); // Call the function passed from the parent
      }, 10000); // Delay response by 10 seconds
    }

    // Update only the time, without changing isUnread
    updateTimeAndisUnread(selectedRestaurant.id, currentTime, false);
  };

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const handleArchivedClick = () => {
    updateRestaurantStatus(selectedRestaurant.id);
    setIsPopupVisible(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-[24px] h-[88vh] p-[16px] border border-[#0000001A] rounded-[4px]">
      {/* Selected restaurant header */}
      <div className="flex items-center justify-between border-b border-[#CCCCCC80] bg-white pb-[12px]">
        <div className="flex items-center gap-[12px]">
          <div className="w-[93px] h-[63px] bg-gray-200 rounded-[4px]">
            <img
              src="/restaurent-img.jpg"
              className="w-full h-full object-cover rounded-[4px]"
            />
          </div>
          <div>
            <Link href="/restaurant">
              <h2 className="font-[600] pb-[8px]">
                {selectedRestaurant.location}
              </h2>
            </Link>
            <div className="flex flex-wrap gap-[12px] items-center">
              <span
                className={`text-[14px] px-2 py-[7px] lg:w-[150px] text-center font-[700] rounded-full ${getStatusStyle(
                  selectedRestaurant.status
                )}`}
              >
                {selectedRestaurant.status}
              </span>
              <p className="text-[15px] uppercase font-[500] font-satoshi text-[#00000099]">
                CREATED ON:{" "}
                <span className="text-black">{selectedRestaurant.date}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
          <button className="px-[22px] py-[8px] bg-[#821101] satoshi text-[15px] text-white rounded-[4px]">
            VIEW OFFER
          </button>
          <button
            onClick={togglePopup}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <HiOutlineDotsVertical className="w-5 h-5" />
          </button>
          {/* Popup for archiving */}
          {isPopupVisible && (
            <div
              ref={popupRef} // Attach the ref to the popup div
              className={`absolute top-[40px] bg-white px-[16px] py-[14px] hover:bg-gray-50 transition rounded-[4px] mt-2 border shadow-lg right-[-5px] ${
                selectedRestaurant.isArchived === true
                  ? "w-[225px]"
                  : "w-[180px]"
              }`}
            >
              <div
                onClick={handleArchivedClick}
                className="flex items-center gap-[12px] cursor-pointer"
              >
                {selectedRestaurant.isArchived === true ? (
                  <img
                    src="/unarchive.svg"
                    alt="unarchive"
                    className="w-[24px] h-[24px]"
                  />
                ) : (
                  <img
                    src="/archive.svg"
                    alt="archive"
                    className="w-[24px] h-[24px]"
                  />
                )}
                <span className="text-[#000000B2] font-roboto">
                  {selectedRestaurant.isArchived === true
                    ? "Remove from Archive"
                    : "Add to Archive"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesAreaRef} // Ref added here for the scrollable container
        className="flex-1 overflow-y-auto space-y-4 custom-scrollbar lg:pe-1 font-satoshi"
      >
        {/* Grouping messages by date */}
        {Object.entries(
          (messages[selectedRestaurant.id] || []).reduce((acc, msg) => {
            const dateString = msg.date;
            if (!acc[dateString]) {
              acc[dateString] = [];
            }
            acc[dateString].push(msg);
            return acc;
          }, {})
        ).map(([date, msgs], index) => {
          const isToday = date === new Date().toLocaleDateString(); // Check if the date is today's date
          const displayDate = isToday ? "Today" : date; // Show "Today" if it's the current date

          return (
            <div key={index} className="space-y-[24px]">
              {/* Message Date */}
              <div className="flex justify-center">
                <span className="px-[24px] py-[4px] bg-[#0000000D] rounded-full text-[13px] font-[#0000000D] text-gray-600">
                  {displayDate}
                </span>
              </div>

              {/* Message Events */}
              {msgs.map((msg, index) => (
                <div
                  key={index}
                  className={`space-y-[24px] w-full flex ${
                    msg.sender.startsWith("ME")
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="space-y-[8px] w-1/2">
                    {/* Sender and Time */}
                    <div
                      className={`flex items-center w-full justify-between gap-2`}
                    >
                      {!msg.sender.startsWith("ME") && (
                        <div className="flex items-center gap-[8px]">
                          <span className="w-[20px] h-[20px] rounded-full flex items-center justify-center">
                            <ImSpoonKnife className="text-[#821101] text-[24px]" />
                          </span>
                          <span className="text-[15px] font-[700] font-satoshi">
                            {msg.sender}
                          </span>
                        </div>
                      )}
                      <span className="text-[15px] font-[500] font-satoshi text-black">
                        {msg.time}
                      </span>
                      {msg.sender.startsWith("ME") && (
                        <div className="flex items-center gap-1">
                          <span className="text-[15px] font-[700] font-satoshi">
                            <span className="text-[#00000099]">Me -</span>{" "}
                            <span className="text-black">
                              {msg.sender.slice(5)}{" "}
                              {/* Remove "Me -" and show the rest */}
                            </span>
                          </span>
                          <span className="w-[24] h-[24px] mb-[2px] rounded-full flex items-center justify-center">
                            <FaRegUser size={16} strokeWidth={2} />
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`p-[12px] bg-[#8211010D] rounded-[4px] ${
                        msg.sender.startsWith("ME") ? "text-right" : "text-left"
                      }`}
                    >
                      {/* Message Content */}
                      <p className="font-[500] font-satoshi text-[#821101] italic">
                        {msg.content}
                      </p>

                      {/* Message Details */}
                      {msg.details && (
                        <p className="text-black font-satoshi whitespace-pre-line mt-2">
                          {msg.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Message input */}
      <div className="flex gap-[12px] pt-[16px]">
        <div className="relative w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(); // Trigger message send on Enter
              }
            }}
            className="peer w-full rounded-[4px] border border-gray-300 px-4 py-4 text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none"
            placeholder="Message"
          />
          <label
            className={`absolute left-2 -top-2.5 bg-white px-1 text-sm transition-all
  peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base
  peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm
  ${isFocused || message ? "text-gray-600" : "text-gray-400"}`}
          >
            Message
          </label>
        </div>
        <button
          onClick={handleSendMessage}
          className="px-[22px] py-[15px] bg-[#821101] text-white rounded-[4px] flex items-center gap-2"
        >
          SEND
          <PiPaperPlaneRightLight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
