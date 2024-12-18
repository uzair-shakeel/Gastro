"use client";
import { useState } from "react";
import { Typography, Box } from "@mui/material";
import MenuItem from "./MenuItem";
import MenuSection from "./MenuSection";
import Navbar from "../components/Navbar";
import SubtotalSection from "./SubtotalSection";

export default function Menu() {
  const [guests, setGuests] = useState(7);

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const totalGuests = 49;
  const totalAmount = "6'000";

  return (
    <Box>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <Box sx={{ minHeight: "100vh", backgroundColor: "#fffff" }}>
        <Box
          sx={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "2rem 1rem",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            {/* Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  color: "#333333",
                }}
              >
                Restaurant Sonnenberg
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "0.875rem", color: "#666666" }}
              >
                - Lunch - 29.10.2024
              </Typography>
            </Box>

            {/* A La Carte Badge */}
            <Typography
              sx={{
                minWidth: "40%",
                minHeight: "42px",
                maxHeight: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "500",
                fontSize: "14px",
                fontFamily: '"Roboto", sans-serif',
                borderBottom: "2px solid #821101",
                color: "#821101",
                backgroundColor: "#CCCCCC33",
                padding: "0.5rem",
              }}
            >
              A LA CARTE
            </Typography>
          </Box>

          {/* Sections */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Course Starter */}
            <MenuSection title="1 - Course Starter" totalPrice="630">
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="meat"
                price="140"
                guests={guests}
                onGuestsChange={handleGuestsChange}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction and if the text will be the ma..."
                type="fish"
                price="210"
                guests={guests}
                onGuestsChange={handleGuestsChange}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="vegetarian"
                price="280"
                guests={guests}
                onGuestsChange={handleGuestsChange}
              />
            </MenuSection>

            {/* Course Main */}
            <MenuSection title="2 - Course Main" totalPrice="6000">
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="meat"
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                isSideDish
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                type="meat"
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                isChild
              />
              <MenuItem
                title="Daprese Salad"
                description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
                price="1500"
                guests={guests}
                onGuestsChange={handleGuestsChange}
                isSideDish
              />
            </MenuSection>
          </Box>
          <SubtotalSection
            totalGuests={totalGuests}
            totalAmount={totalAmount}
          />
        </Box>
      </Box>
    </Box>
  );
}
