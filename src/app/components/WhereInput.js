"use client";

import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";

export default function WhereInput({ onLocationChange }) {
  const [distance, setDistance] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDistanceHovered, setIsDistanceHovered] = useState(false);

  useEffect(() => {
    onLocationChange({ distance, inputValue });
  }, [distance, inputValue]);

  const handleIncrement = () => {
    setDistance((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setDistance((prev) => Math.max(1, prev - 1));
  };

  const isInputEmpty = inputValue.trim() === "";

  return (
    <div className="relative max-h-[50px] h-[50px]">
      <div className="absolute -top-3 left-4 px-1 bg-white">
        <label
          htmlFor="location-input"
          className={`text-[12px] text-[#000000B2] !font-roboto font-[400] tracking-[0.15px] ${isFocused
              ? "text-[#821101]"
              : isInputEmpty && isHovered
                ? "text-[#821101]"
                : ""
            }`}
        >
          Where
        </label>
      </div>
      <div
        className={`border rounded-[4px] overflow-hidden transition-colors duration-200 ${isFocused
            ? "border-[#821101]"
            : isInputEmpty && isHovered
              ? "border-[#821101]"
              : "border-[#BBBBBB]"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-stretch">
          <div className="flex-1">
            <div className="px-4 py-2.5 flex items-center">
              <IoMdSearch
                className={`text-[#0000008C] text-2xl mr-1.5 ${isFocused
                    ? "text-[#821101]"
                    : isInputEmpty && isHovered
                      ? "text-[#821101]"
                      : ""
                  }`}
              />
              <InputBase
                id="location-input"
                fullWidth
                placeholder="Search"
                className="text-[16px]"
                inputProps={{
                  "aria-label": "Search location",
                  className:
                    "text-black placeholder-[#0000008F] !font-roboto font-normal tracking-[0.15px]",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>

          {inputValue && (
            <div
              className={`flex items-center justify-center w-[112px] px-3 border-l transition-colors duration-200 ${isDistanceHovered ? "border-[#821101]" : "border-[#BBBBBB]"
                }`}
              onMouseEnter={() => setIsDistanceHovered(true)}
              onMouseLeave={() => setIsDistanceHovered(false)}
            >
              <button onClick={handleDecrement}>
                <Image
                  src="/RemoveFilled.svg"
                  alt="RemoveFilled"
                  width={24}
                  height={24}
                />
              </button>
              <span
                className={`text-base px-1 text-[#000000] tracking-[0.15px] !font-roboto font-normal text-center ${isDistanceHovered ? "text-[#821101]" : ""
                  }`}
              >
                {distance}km
              </span>
              <button onClick={handleIncrement}>
                <Image
                  src="/AddFilled.svg"
                  alt="addFilled"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
