"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const UserProfile = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isDropdownOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [isDropdownOpen]);

    return (
        <div>
            <div className="relative">
                <button onClick={toggleDropdown} ref={buttonRef}>
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
                    <div 
                        ref={dropdownRef}
                        className="custom-shadow absolute z-50 top-10 -right-5 w-[220px] bg-[#FFFFFF] rounded pt-3"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                                href="/messages"
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
                                href="/"
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
        </div>
    )
}

export default UserProfile

