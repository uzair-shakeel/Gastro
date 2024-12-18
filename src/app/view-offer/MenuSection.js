import { useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function MenuSection({ title, totalPrice, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#F9FAFB" },
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.125rem",
            fontWeight: 400,
          }}
        >
          {title}
        </Typography>

        {/* Price and Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.125rem",
              fontWeight: 400,
            }}
          >
            CHF {totalPrice}
          </Typography>
          <IconButton
            size="small"
            sx={{
              padding: 0,
            }}
          >
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Content Section */}
      {isOpen && (
        <Box
          sx={{
            padding: "1rem",
            position: "relative",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}
