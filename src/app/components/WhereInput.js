"use client";

import { InputBase, IconButton } from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function WhereInput() {
  const [distance, setDistance] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleIncrement = () => {
    setDistance((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setDistance((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="relative">
      <div className="absolute -top-3 left-4 px-2 bg-[#F9F9F9]">
        <label
          htmlFor="location-input"
          className="text-[12px] text-[#000000B2] font-[400] font-roboto"
        >
          Where?
        </label>
      </div>
      <div className="border border-[#BBBBBB] rounded-[4px] overflow-hidden bg-[#F9F9F9]">
        <div className="flex items-stretch">
          <div className="flex-1 border-r-2">
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
            <div className="flex items-center px-1 ">
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