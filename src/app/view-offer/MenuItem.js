import { Typography, Box } from "@mui/material";
import { BudgetInput as GuestInput } from "../components/popups/restaurant/budget";
import { useState } from "react";
import Image from "next/image";

export default function MenuItem({
  title,
  description,
  type,
  price,
  guests,
  onGuestsChange,
  isChild,
  isSideDish,
}) {
  const [isGuestFilled, setIsGuestFilled] = useState(false);
  const [guest, setGuest] = useState(null);
  const handleGuestChange = (value) => {
    setIsGuestFilled(value !== null && value !== undefined && value !== "");
    setGuest(value);
  };
  const getIcon = () => {
    const icons = [];

    switch (type) {
      case "meat":
        icons.push(
          <Box
            key="meat"
            sx={{
              pr: "50px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Image src='/kebab-dining.svg' alt="kebab-dining" width={24} height={24} />
            <Typography variant="caption" sx={{
              color: "#000000B2",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0.15px",
              fontWeight: "600"
            }}>
              Meat
            </Typography>
          </Box>
        );
        break;
      case "fish":
        icons.push(
          <Box
            key="fish"
            sx={{
              pr: "50px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Image src='/set-meal.svg' alt="set-meal" width={24} height={24} />
            <Typography variant="caption" sx={{
              color: "#000000B2",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0.15px",
              fontWeight: "600"
            }}>
              Fish
            </Typography>
          </Box>
        );
        break;
      case "vegetarian":
        icons.push(
          <Box
            key="vegetarian"
            sx={{
              pr: "50px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Image src='/grocery.svg' alt="grocery" width={24} height={24} />
            <Typography variant="caption" sx={{
              color: "#000000B2",
              fontSize: "16px",
              lineHeight: "24px",
              letterSpacing: "0.15px",
              fontWeight: "600"
            }}>
              Vegetarian
            </Typography>
          </Box>
        );
        break;
    }

    if (isChild) {
      icons.push(
        <Box
          key="kids"
          sx={{
            pr: "50px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginLeft: "8px",
          }}
        >
          <Image src='/child-care.svg' alt="child-care" width={24} height={24} />
          <Typography variant="caption" sx={{
            color: "#000000B2",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0.15px",
            fontWeight: "600"
          }}>
            KIDS
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icons}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        marginBottom: "16px",
        marginLeft: isSideDish ? "2rem" : 0,
        "&:last-child": { marginBottom: 0 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "56px",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #00000040",
            borderRadius: "4px",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: "-10px",
                left: "8px",
                backgroundColor: "white",
                paddingX: "4px",
                fontSize: "12px",
                color: "#000000B2",
                fontWeight: "400",
                letterSpacing: "0.15px",
                fontFamily: "'Roboto', sans-serif !important"
              }}
            >
              {isSideDish ? "Side Dish" : "Dish"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                padding: "12px 16px 8px",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "16px", fontWeight: 700, color: "#000000B2", lineHeight: "24px", letterSpacing: "0.15px" }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#000000B2",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0.15px"
                }}
              >
                {description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", padding: "12px" }}>
            {getIcon()}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "start", gap: "1rem" }}>
          <Box sx={{ position: "relative" }}>
            <GuestInput
              legend="Guests"
              legendbg="white"
              opacityInput="opacity-100"
              valueOfInput={guests}
              icon={false}
              onInputChange={handleGuestChange}
            />
          </Box>
          <Box
            sx={{ mr: 5, ml: 1, minWidth: "80px", textAlign: "right", paddingTop: "14px" }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "18px", fontWeight: 600, color: "#000000", letterSpacing: "-0.02em", lineHeight: "24px" }}
            >
              CHF {price}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
