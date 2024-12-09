"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import EventSearch from "../restaurant/EventSearch";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdownSearch = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full px-6">
      <div className="max-w-full mx-auto w-full flex items-center justify-between py-[22px]">
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
            <button>
              <Image
                src="/public.svg"
                alt="public"
                width={24}
                height={24}
                className="min-w-[24px]"
              />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="w-full p-6" ref={dropdownRef}>
          <div className="border absolute bg-white p-4 top-20 left-0 min-w-full w-full max-w-[1440px] transform translate-x-0 m-auto z-40">
            <EventSearch />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;