import { useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import Image from "next/image";

export default function MenuSection({ title, totalPrice, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "2px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        border: "1px solid #0000001A"
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
            fontSize: "20px",
            fontWeight: 600,
            color: "#000000",
            lineHeight: '24px',
            letterSpacing: "-0.02em"

          }}
        >
          {title}
        </Typography>

        {/* Price and Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              lineHeight: "26px",
              fontWeight: 600,
              color: "#000000",
              letterSpacing: "-0.02em"
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
            {isOpen ? <Image src='/open-arrow.svg' alt="open-arrow" width={24} height={24} /> : <Image src='/close-arrow.svg' alt="close-arrow" width={24} height={24} />}
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
