"use client";

import { InputBase } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";

export default function WhereInput({ onLocationChange, error }) {
  const [distance, setDistance] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDistanceHovered, setIsDistanceHovered] = useState(false);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedLocationChange = useMemo(
    () => debounce(onLocationChange, 300),
    [onLocationChange]
  );

  useEffect(() => {
    debouncedLocationChange({ distance, inputValue });
  }, [distance, inputValue, debouncedLocationChange]);

  const handleIncrement = () => {
    setDistance((prev) => Math.min(10, prev + 1));
  };

  const handleDecrement = () => {
    setDistance((prev) => Math.max(0, prev - 1));
  };

  const isInputEmpty = inputValue.trim() === "";

  return (
    <div className="relative max-h-[50px] h-[50px]">
      <div className="absolute -top-3 left-4 px-1 bg-white">
        <label
          htmlFor="location-input"
          className={`text-[12px] !font-roboto font-[400] tracking-[0.15px] ${
            !isInputEmpty
              ? "text-[#000000B2]"
              : isFocused || isHovered
              ? "text-[#0000008C]"
              : error
              ? "text-[#821101]"
              : "text-[#000000B2]"
          }`}
        >
          Where
        </label>
      </div>
      <div
        className={`border rounded-[4px] overflow-hidden transition-colors duration-200 ${
          !isInputEmpty
            ? "border-[#BBBBBB]"
            : isFocused || isHovered
            ? "border-[#BBBBBB]"
            : error
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
                className={`text-2xl mr-1.5 ${
                  !isInputEmpty
                    ? "text-[#0000008C]"
                    : isFocused || isHovered
                    ? "text-[#0000008C]"
                    : error
                    ? "text-[#821101B2]"
                    : "text-[#0000008C]"
                }`}
              />
              <InputBase
                id="location-input"
                fullWidth
                placeholder="Search"
                inputProps={{
                  "aria-label": "Search location",
                  style: { "--tw-placeholder-opacity": "100" },
                  className:
                    "text-black !font-roboto opacity-100 placeholder:text-black/70 font-normal tracking-[0.15px]",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    opacity: 1,
                    color: "#000000",
                  },
                }}
              />
            </div>
          </div>

          <div
            className={`flex items-center justify-center w-[112px] px-3 border-l transition-colors duration-200 ${
              isDistanceHovered ? "border-[#BBBBBB]" : "border-[#BBBBBB]"
            }`}
            onMouseEnter={() => setIsDistanceHovered(true)}
            onMouseLeave={() => setIsDistanceHovered(false)}
          >
            <button
              onClick={handleDecrement}
              disabled={distance === 0}
              className={distance === 0 ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Image
                src="/RemoveFilled.svg"
                alt="RemoveFilled"
                width={24}
                height={24}
              />
            </button>
            <span className="text-base px-1 text-[#000000] tracking-[0.15px] !font-roboto font-normal text-center">
              {distance}km
            </span>
            <button
              onClick={handleIncrement}
              disabled={distance === 10}
              className={distance === 10 ? "opacity-50 cursor-not-allowed" : ""}
            >
              <Image
                src="/AddFilled.svg"
                alt="addFilled"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
