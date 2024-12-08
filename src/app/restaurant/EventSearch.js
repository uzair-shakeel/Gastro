import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BudgetInput } from "../components/popups/restaurant/budget";
import { GuestsModal } from "../components/popups/restaurant/guests";
import { CategoryModal } from "../components/popups/restaurant/category";
import { DateSelectionDropdown } from "../components/popups/restaurant/date";
import Image from "next/image";

const EventSearch = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", borderRadius: 1, mt: 3 }}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        centered
        sx={{
          bgcolor: "#F5F5F5",
          borderRadius: "5px",
          "& .MuiTabs-indicator": {
            backgroundColor: "transparent",
          },
        }}
      >
        {/* RESTAURANT Tab */}
        <Tab
          sx={{
            minWidth: "25%",
            display: "flex",
            minHeight: "42px !important",
            maxHeight: "48px !important",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            color: "#000000B2",
            fontWeight: 500,
            fontSize: "14px !important",
            fontFamily: '"Roboto", sans-serif !important',
            borderBottom: "2px solid transparent",
            "& .MuiTab-iconWrapper": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
              padding: "2px",
            },
            "&.Mui-selected": {
              color: "#821101",
              borderBottom: "2px solid #821101",
            },
          }}
          icon={
            <Image
              src="/local-dining.svg"
              alt="Catering Service"
              width={24}
              height={24}
            />
          }
          label="RESTAURANT"
        />

        {/* CATERING SERVICE Tab */}
        <Tab
          sx={{
            minWidth: "25%",
            minHeight: "42px !important",
            maxHeight: "48px !important",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            color: "#000000B2",
            fontWeight: 500,
            fontFamily: '"Roboto", sans-serif !important',
            borderBottom: "2px solid transparent",
            "& .MuiTab-iconWrapper": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
              padding: "2px",
            },
            "&.Mui-selected": {
              color: "#821101",
              borderBottom: "2px solid #821101",
            },
          }}
          icon={
            <Image
              src="/catering-service.svg"
              alt="Catering Service"
              width={24}
              height={24}
            />
          }
          label="CATERING SERVICE"
        />

        {/* FOOD TRUCK Tab */}
        <Tab
          sx={{
            minWidth: "25%",
            minHeight: "42px !important",
            maxHeight: "48px !important",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            color: "#000000B2",
            fontWeight: 500,
            fontFamily: '"Roboto", sans-serif !important',
            borderBottom: "2px solid transparent",
            "& .MuiTab-iconWrapper": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
              padding: "2px",
            },
            "&.Mui-selected": {
              color: "#821101",
              borderBottom: "2px solid #821101",
            },
          }}
          icon={
            <Image
              src="/local-shipping.svg"
              alt="Catering Service"
              width={24}
              height={24}
            />
          }
          label="FOOD TRUCK"
        />

        {/* EVENT LOCATION Tab */}
        <Tab
          sx={{
            minWidth: "25%",
            minHeight: "42px !important",
            maxHeight: "48px !important",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            color: "#000000B2",
            fontWeight: 500,
            fontFamily: '"Roboto", sans-serif !important',
            borderBottom: "2px solid transparent",
            "& .MuiTab-iconWrapper": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
              padding: "2px",
            },
            "&.Mui-selected": {
              color: "#821101",
              borderBottom: "2px solid #821101",
            },
          }}
          icon={
            <Image
              src="/locations-icons.svg"
              alt="Catering Service"
              width={24}
              height={24}
            />
          }
          label="EVENT LOCATION"
        />
      </Tabs>

      <Grid
        sx={{
          border: "1px solid #CCCCCC33",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          mt: "24px",
          p: "12px",
          bgcolor: "#F9F9F9",
          borderRadius: "4px",
        }}
      >
        <Box sx={{ width: "302px", minHeight: "56px" }}>
          <TextField
            fullWidth
            label="Where?"
            variant="outlined"
            sx={{ width: "100%", minHeight: "56px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <DateSelectionDropdown />
          </Box>
          <Box flexGrow={1}>
            <CategoryModal />
          </Box>
          <Box>
            <GuestsModal />
          </Box>
          <Box>
            <BudgetInput />
          </Box>
          <Box>
            <Button
              fullWidth
              className=" h-[56px] bg-[#821101] font-satoshi "
              style={{
                boxShadow: "none",
                backgroundColor: "#821101",
                fontWeight: "500",
                color: "#F9F9F9",
                width: "137px",
                fontSize: "15px",
                letterSpacing: "0.46px",
              }}
            >
              VIEW OFFER
            </Button>
          </Box>
        </Box>
        {/* Buttons */}
        <Grid item xs={12} sm={6} md={2}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              width: "161px",
              textTransform: "uppercase",
              bgcolor: "#CCCCCC",
              border: "none",
              height: "56px",
              color: "#000000B2",
              fontWeight: "600",
            }}
          >
            More Options
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              width: "106px",
              textTransform: "uppercase",
              bgcolor: "#821101",
              height: "56px",
              color: "#F9F9F9",
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventSearch;
