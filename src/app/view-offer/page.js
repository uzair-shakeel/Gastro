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
      <Navbar />

      <Box sx={{ minHeight: "100vh", backgroundColor: "#fffff" }}>
        <Box
          sx={{
            maxWidth: "1473px",
            margin: "0 auto",
            padding: "2rem 1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#000000",
                  lineHeight: "28px",
                  letterSpacing: "-0.02em"
                }}
              >
                Restaurant Sonnenberg
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "24px", color: "#000000B2", letterSpacing: "-0.02em", fontWeight: "600" }}
              >
                - Lunch - 29.10.2024
              </Typography>
            </Box>

            <Typography
              sx={{
                minWidth: "40%",
                minHeight: "56px",
                maxHeight: "56px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "500",
                fontSize: "14px",
                fontFamily: '"Roboto", sans-serif !important',
                borderBottom: "2px solid #821101",
                color: "#821101",
                backgroundColor: "#CCCCCC33",
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
