"use client";

import { InputBase, IconButton } from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";

export default function WhereInput({ onLocationChange }) {
  const [distance, setDistance] = useState(0);
  const [inputValue, setInputValue] = useState("");

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
    <div className="relative h-fit">
      <div className="absolute -top-3 left-4 px-1 bg-white">
        <label
          htmlFor="location-input"
          className="text-[12px] text-[#000000B2] !font-roboto font-[400] tracking-[0.15px]"
        >
          Where
        </label>
      </div>
      <div className="border border-[#BBBBBB] rounded-[4px] overflow-hidden bg-white">
        <div className="flex items-stretch">
          <div className="flex-1 ">
            <div className="px-4 py-3 flex items-center">
              <IoMdSearch className="text-[#0000008C] text-2xl mr-1.5" />
              <InputBase
                id="location-input"
                fullWidth
                placeholder="Search"
                className="text-[16px]"
                inputProps={{
                  "aria-label": "Search location",
                  className: "text-black placeholder-[#0000008F] !font-roboto font-normal tracking-[0.15px]",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>

          {inputValue && (
            <div className="flex items-center justify-center w-[112px] px-3 border-l border-[#BBBBBB]">
              <button onClick={handleDecrement}>
                <Image src='/RemoveFilled.svg' alt="RemoveFilled" width={24} height={24} />
              </button>
              <span className="text-base px-1 text-[#000000] tracking-[0.15px] !font-roboto font-normal text-center">
                {distance}km
              </span>
              <button onClick={handleIncrement}>
                <Image src='/AddFilled.svg' alt="addFilled" width={24} height={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
