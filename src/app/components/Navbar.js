"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import EventSearch from "../restaurant/EventSearch";
import UserProfile from "./UserProfile";
import LanguageSelector from "./language-selector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdownSearch = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full px-6 relative z-40">
      <div className="max-w-[1440px] bg-white z-[600] mx-auto w-full flex items-center justify-between py-[22px]">
        <div className="w-full">
          <Image src="/logo-website.svg" alt="navbar" width={250} height={34} />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#82110126] min-w-[44px] h-[42px] rounded flex items-center justify-center mr-6"
            onClick={toggleDropdownSearch}
          >
            <Image
              src="/search-filled.svg"
              alt="search-filled"
              width={24}
              height={24}
            />
          </button>

          <div className="px-6 border-x border-[#CCCCCC]">
            <h2 className="text-[#5E5D3E] font-medium font-satoshi text-center uppercase text-[15px] leading-[26px] tracking-[0.46px] w-[190px]">
              List your Service
            </h2>
          </div>

          <div className="pl-6 flex items-center gap-6">
            <button>
              <Image
                src="/favorite-filled.svg"
                alt="favorite-filled"
                width={24}
                height={24}
                className="min-w-[24px]"
              />
            </button>
            <UserProfile />
            <LanguageSelector />
          </div>
        </div>
      </div>
      <div
        ref={dropdownRef}
        className={`bg-white absolute !z-50 block min-w-full duration-700 w-full max-w-full m-auto left-0 right-0 ${
          isOpen ? "top-0" : "-top-[900px]"
        }`}
      >
        <div className=" border-b absolute pr-2 xl:pr-0 bg-white max-w-full mx-auto top-20 left-0 py-4 min-w-full w-full transform translate-x-0">
          <EventSearch
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
