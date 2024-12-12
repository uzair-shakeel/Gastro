"use client";

import { InputBase, IconButton } from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function WhereInput({ onLocationChange }) {
  const [distance, setDistance] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // Call the parent's callback whenever distance or inputValue changes
  useEffect(() => {
    onLocationChange({ distance, inputValue });
  }, [distance, inputValue]);

  const handleIncrement = () => {
    setDistance((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setDistance((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="relative">
      <div className="absolute -top-3 left-4 px-1 bg-white">
        <label
          htmlFor="location-input"
          className="text-[12px] text-[#000000B2] font-[400] font-roboto tracking-[0.15px]"
        >
          Where
        </label>
      </div>
      <div className="border border-[#BBBBBB] rounded-[4px] overflow-hidden bg-white">
        <div className="flex items-stretch">
          <div className="flex-1 ">
            <div className="px-4 py-3 flex items-center">
              <IoMdSearch className="text-[#0000008C] text-2xl mr-[10px]" />
              <InputBase
                id="location-input"
                fullWidth
                placeholder="Search"
                className="text-[16px]"
                inputProps={{
                  "aria-label": "Search location",
                  className: "text-black placeholder-[#0000008F]",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
          {/* Show distance adjustment only if input has content */}
          {inputValue && (
            <div className="flex items-center px-1 border-l border-[#BBBBBB]">
              <IconButton
                onClick={handleDecrement}
                className="text-[#0000008F] hover:text-gray-600 p-1"
                aria-label="Decrease distance"
              >
                <AiOutlineMinus className="text-xl" />
              </IconButton>
              <span className="text-lg font-medium min-w-[3.5ch] text-center">
                {distance}km
              </span>
              <IconButton
                onClick={handleIncrement}
                className="text-[#0000008F] hover:text-gray-600 p-1"
                aria-label="Increase distance"
              >
                <AiOutlinePlus className="text-xl" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
