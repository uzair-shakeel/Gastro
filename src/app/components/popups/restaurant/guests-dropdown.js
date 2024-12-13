"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Typography, IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Remove } from "@mui/icons-material";

const CounterWrapper = styled("div")({
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden",
});

const CounterLabel = styled(Typography)({
  fontSize: "16px",
  color: "#000",
  fontWeight: 500,
  marginBottom: "0px",
});

const CounterContainer = styled("div")({
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
});

const CounterButton = styled(IconButton)({
  padding: "4px",
  color: "#000",
  borderRadius: "4px",
  "&:hover": {},
  "&.Mui-disabled": {
    // backgroundColor: '#F5F5F5',
    color: "rgba(0, 0, 0, 0.26)",
  },
});

const CounterValue = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  minWidth: "40px",
  textAlign: "center",
  color: "#000",
});

const DropdownContainer = styled("div")({
  position: "absolute",
  zIndex: 1000,
  backgroundColor: "white",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: "360px",
  width: "100%",
});

const ConfirmButton = styled(Button)({
  backgroundColor: "#821101",
  color: "#FFFFFF",
  fontFamily: "Satoshi, sans-serif",
  padding: "8px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#6a0e01",
  },
});

export default function GuestsDropdown({
  legendbg = "bg-white",
  opacity = "opacity-100",
  onSelectionChange,
  setGuests,
  guests,
}) {
  const [open, setOpen] = useState(false);
  const [showExtended, setShowExtended] = useState(false);
  const dropdownRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getGuestsIcon = () => {
    if (isFocused) {
      return "/PeopleFilled2.svg";
    } else if (isHovered) {
      return "/PeopleFilled2.svg";
    } else {
      return "/PeopleFilled.svg";
    }
  };

  const handleIncrement = (type) => {
    setGuests((prev) => {
      const newGuests = { ...prev };

      if (["all", "meat", "fish", "vegetarian", "vegan"].includes(type)) {
        newGuests[type] += 1;

        if (newGuests.adults > 1) {
          newGuests.adults += 1;
        } else if (newGuests.adults === 1 && newGuests[type] > 1) {
          newGuests.adults += 1;
        }
      } else {
        newGuests[type] += 1;
      }

      return newGuests;
    });
  };

  const handleDecrement = (type) => {
    setGuests((prev) => {
      const newGuests = { ...prev };

      if (["all", "meat", "fish", "vegetarian", "vegan"].includes(type)) {
        if (newGuests[type] > 0) {
          newGuests[type] -= 1;

          if (newGuests.adults > 1) {
            newGuests.adults -= 1;
          }
        }
      } else if (type === "adults" && newGuests.adults > 1) {
        console.warn(
          "Cannot decrement adults directly. Adjust subfields instead."
        );
      } else if (newGuests[type] > 0) {
        newGuests[type] -= 1;
      }

      return newGuests;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowExtended(guests.adults > 0);
  }, [guests.adults]);

  useEffect(() => {
    const totalGuests = guests.adults + guests.kids;
    onSelectionChange(totalGuests);
  }, [guests, onSelectionChange]);

  const validateMealCounts = (newGuests) => {
    const totalMealCount =
      newGuests.meat + newGuests.fish + newGuests.vegetarian + newGuests.vegan;
    return totalMealCount <= newGuests.adults;
  };

  const GuestCounter = ({ label, value, type }) => {
    const isMealType = ["meat", "fish", "vegetarian", "vegan"].includes(type);
    const totalMealCount =
      guests.meat + guests.fish + guests.vegetarian + guests.vegan;
    const disableIncrement = isMealType && totalMealCount >= guests.adults;

    return (
      <CounterWrapper>
        <CounterLabel
          sx={{
            fontSize: "16px",
            color: "#000000",
            fontFamily: "Roboto, sans-serif !important",
            fontWeight: !showExtended ? "400" : "400",
          }}
        >
          {label}
        </CounterLabel>
        <CounterContainer>
          <CounterButton
            onClick={() => handleDecrement(type)}
            disabled={value === 0}
            size="small"
            sx={{
              width: "24px",
              height: "24px",
              backgroundImage: `url('/remove-icon.svg')`,
            }}
          />
          <CounterValue sx={{ color: "#000000", fontSize: "16px" }}>
            {value}
          </CounterValue>
          <CounterButton
            onClick={() => handleIncrement(type)}
            disabled={disableIncrement}
            size="small"
            sx={{
              width: "24px",
              height: "24px",
              backgroundImage: `url('/add-icon.svg')`,
            }}
          />
        </CounterContainer>
      </CounterWrapper>
    );
  };

  const totalGuests = guests.adults + guests.kids;

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          height: "56px",
          justifyContent: "space-between",
          borderColor: isFocused || isHovered ? "#821101" : "rgba(0, 0, 0, 0.23)",
          color: "rgba(0, 0, 0, 0.87)",
          textTransform: "none",
          width: "125px",
          maxWidth: "125px",
          minWidth: "125px",
          p: "0 10px 0 10px",
          "&:hover": {
            border: "1.5px solid #821101",
            backgroundColor: "transparent",
          },
        }}
        endIcon={
          <img
            src="/arrow-dropdown-filled.svg"
            alt="dropdown"
            style={{ width: "24px", height: "24px", marginRight: "0px" }}
          />
        }
      >
        <legend
          className={`absolute top-0 left-2 -translate-y-1/2 ${legendbg} px-[4px] text-[12px] font-roboto font-[400] ${isFocused || isHovered ? "text-[#821101]" : "text-[#000000B2]"
            }`}
        >
          Guests
        </legend>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div className="mr-2">
            <img src={getGuestsIcon()} alt="people" width={24} height={24} />
          </div>
          <h3
            className={`text-[#000000B2] text-[16px] !font-roboto font-normal tracking-[0.15px] ${opacity}`}
          >
            {totalGuests > 0 ? `${totalGuests}` : "Select"}
          </h3>
        </span>
      </Button>

      {open && (
        <DropdownContainer
          ref={dropdownRef}
          sx={{ padding: "15px !important", maxWidth: "272px" }}
        >
          {!showExtended ? (
            <>
              <GuestCounter
                label="Adults"
                value={guests.adults}
                type="adults"
              />
              <GuestCounter label="Kids" value={guests.kids} type="kids" />
            </>
          ) : (
            <Box>
              <GuestCounter
                label="Adults"
                value={guests.adults}
                type="adults"
              />
              <Box sx={{ marginLeft: "12px" }}>
                <GuestCounter label="All" value={guests.all} type="all" />
                <GuestCounter label="Meat" value={guests.meat} type="meat" />
                <GuestCounter label="Fish" value={guests.fish} type="fish" />
                <GuestCounter
                  label="Vegetarian"
                  value={guests.vegetarian}
                  type="vegetarian"
                />
                <GuestCounter label="Vegan" value={guests.vegan} type="vegan" />
              </Box>
              <Box sx={{ borderTop: "1px solid #CCCCCC", paddingTop: "15px" }}>
                <GuestCounter label="Kids" value={guests.kids} type="kids" />
              </Box>
            </Box>
          )}

          <ConfirmButton
            fullWidth
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{ mt: 0 }}
          >
            CONFIRM
          </ConfirmButton>
        </DropdownContainer>
      )}
    </>
  );
}

