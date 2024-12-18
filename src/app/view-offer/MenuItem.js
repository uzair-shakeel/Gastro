import { TextField, Typography, Box } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SetMealIcon from "@mui/icons-material/SetMeal";
import EggAltIcon from "@mui/icons-material/EggAlt";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { BudgetInput as GuestInput } from "../components/popups/restaurant/budget";
import { useState } from "react";

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
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "rgb(153, 27, 27)", // text-red-800
            }}
          >
            <RestaurantIcon sx={{ fontSize: "1rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
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
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "rgb(30, 58, 138)", // text-blue-800
            }}
          >
            <SetMealIcon sx={{ fontSize: "1rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
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
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "rgb(22, 101, 52)", // text-green-800
            }}
          >
            <EggAltIcon sx={{ fontSize: "1rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
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
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "rgb(234, 88, 12)", // text-orange-600
            marginLeft: "8px", // ml-2
          }}
        >
          <ChildCareIcon sx={{ fontSize: "1rem" }} />
          <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
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
        marginBottom: "1rem",
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
            justifyContent: "space-between",
            border: "1px solid rgb(229, 231, 235)",
            borderRadius: "8px",
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
                fontSize: "0.75rem",
                color: "rgb(107, 114, 128)",
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
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "rgb(107, 114, 128)", // text-gray-600
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
            sx={{ minWidth: "80px", textAlign: "right", paddingTop: "12px" }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              CHF {price}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
