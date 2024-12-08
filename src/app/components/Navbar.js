"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import EventSearch from "../restaurant/EventSearch";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownSearch = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="w-full px-6  ">
      <div className="max-w-full mx-auto  w-full flex items-center justify-between py-[22px]">
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
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown}>
                <Image
                  src="/person-filled.svg"
                  alt="person-filled"
                  width={24}
                  height={24}
                  className="min-w-[24px] mt-2"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="custom-shadow absolute top-10 -right-5 w-[220px] bg-[#FFFFFF] z-20 rounded pt-3">
                  {/* User Info */}
                  <div className="pb-5 border-b border-[#0000005a] px-4">
                    <h2 className="text-[#000000B2] text-[16px] leading-[24px] roboto font-normal tracking-[0.15px]">
                      John Doue
                    </h2>
                    <h4 className="text-[#000000B2] text-[14px] leading-[20.02px] tracking-[0.17px] roboto">
                      jdoe@acme.com
                    </h4>
                  </div>

                  {/* Dropdown Links */}
                  <div className="px-4 py-4 flex items-start flex-col gap-1">
                    <Link
                      href="/restaurant"
                      className="flex items-center gap-3 h-[36px]"
                    >
                      <Image
                        src="/profile-icon.svg"
                        alt="profile-icon"
                        width={24}
                        height={24}
                      />
                      <h2 className="text-[#000000B2] text-[16px] leading-[24px] tracking-[0.15px] roboto">
                        Manage account
                      </h2>
                    </Link>
                    <Link
                      href="/restaurant"
                      className="flex items-center gap-3 h-[36px]"
                    >
                      <Image
                        src="/mail-filled.svg"
                        alt="mail-filled"
                        width={24}
                        height={24}
                      />
                      <h2 className="text-[#000000B2] text-[16px] leading-[24px] tracking-[0.15px] roboto">
                        Messages
                      </h2>
                    </Link>
                    <Link
                      href="/restaurant"
                      className="flex items-center gap-3 h-[36px]"
                    >
                      <Image
                        src="/orders.svg"
                        alt="orders"
                        width={24}
                        height={24}
                      />
                      <h2 className="text-[#000000B2] text-[16px] leading-[24px] tracking-[0.15px] roboto">
                        Orders
                      </h2>
                    </Link>
                    <Link
                      href="/restaurant"
                      className="flex items-center gap-3 h-[36px]"
                    >
                      <Image
                        src="/favorite-filled-icons.svg"
                        alt="favorite-filled-icons.svg"
                        width={24}
                        height={24}
                      />
                      <h2 className="text-[#000000B2] text-[16px] leading-[24px] tracking-[0.15px] roboto">
                        Saved
                      </h2>
                    </Link>
                    <Link
                      href="/restaurant"
                      className="flex items-center gap-3 h-[36px]"
                    >
                      <Image
                        src="/help-center-icons.svg"
                        alt="help-center-icons"
                        width={24}
                        height={24}
                      />
                      <h2 className="text-[#000000B2] text-[16px] leading-[24px] tracking-[0.15px] roboto">
                        Help center
                      </h2>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="py-3 border-t border-[#0000005a] px-4">
                    <Link
                      href="/restaurant"
                      className="flex items-center gap-3 h-[36px]"
                    >
                      <Image
                        src="/logout-filled-icons.svg"
                        alt="logout-filled-icons"
                        width={24}
                        height={24}
                      />
                      <h2 className="text-[#000000B2] text-[16px] leading-[24px] tracking-[0.15px] roboto">
                        Sign out
                      </h2>
                    </Link>
                  </div>
                </div>
              )}
            </div>
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

        <div></div>
      </div>

      {isOpen && (
        <div className="w-full p-6">
          <div className="border absolute bg-white p-4 top-20 left-0 min-w-full  w-full max-w-[1440px] transform translate-x-0 m-auto z-40">
            <EventSearch />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
