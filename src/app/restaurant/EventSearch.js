import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Button,
  Grid,
  Collapse,
} from "@mui/material";
import { BudgetInput } from "../components/popups/restaurant/budget";
import { CategoryDropdown } from "../components/popups/restaurant/category";
import { DateSelectionDropdown } from "../components/popups/restaurant/date";
import Image from "next/image";
import WhereInput from "../components/WhereInput";
import MoreOptions from "./MoreOptions";
import GuestsDropdown from "../components/popups/restaurant/guests-dropdown";

const EventSearch = () => {
  const [tabValue, setTabValue] = useState(0);
  const [locationData, setLocationData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isBudgetFilled, setIsBudgetFilled] = useState(false);
  const [budget, setBudget] = useState(null);
  const [isGuestsFilled, setIsGuestsFilled] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [courses, setCourses] = useState({
    lunch: 3,
    dinner: 2,
  });

  const handleLocationChange = (updatedData) => {
    setLocationData(updatedData);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleBudgetChange = (value) => {
    setIsBudgetFilled(value.trim() !== "");
    setBudget(value);
  };

  const handleGuestsChange = (guestCount) => {
    setIsGuestsFilled(guestCount > 0);
  };

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
  }, []);

  useEffect(() => {
    console.log("Checking button enable state:", {
      locationData,
      selectedDate,
      isBudgetFilled,
      isGuestsFilled,
      selectedCategories,
      buttonEnabled:
        locationData &&
        selectedDate &&
        isBudgetFilled &&
        isGuestsFilled &&
        selectedCategories.length > 0,
    });

    setIsButtonEnabled(
      locationData &&
      selectedDate &&
      isBudgetFilled &&
      isGuestsFilled &&
      selectedCategories.length > 0
    );
  }, [
    locationData,
    selectedDate,
    isBudgetFilled,
    isGuestsFilled,
    selectedCategories,
  ]);



  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        borderRadius: 1,
        mt: 3,
      }}
    >
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
          display: "flex",
          alignItems: "center",
          gap: "12px",
          mt: "24px",
          p: "12px",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
          width="100%"
        >
          <Box flexGrow={1}>
            <WhereInput onLocationChange={handleLocationChange} />
          </Box>
          <Box>
            <DateSelectionDropdown
              legend="Date Selection"
              legendbg="bg-white"
              onDateChange={handleDateChange}
            />
          </Box>
          <Box flexGrow={1}>
            <CategoryDropdown
              courses={courses}
              setCourses={setCourses}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              generalSearch={true}
              legendbg="bg-white"
              onCategoryChange={handleCategoryChange}
            />
          </Box>
          <Box>
            <GuestsDropdown
              legendbg="bg-white"
              onSelectionChange={handleGuestsChange}
            />
          </Box>
          <Box>
            <BudgetInput
              legend="Budget in CHF"
              legendbg="white"
              onInputChange={handleBudgetChange}
            />
          </Box>
        </Box>
        {/* Buttons */}
        <Grid item xs={12} sm={6} md={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              width: "137px",
              whiteSpace: "nowrap",
              height: "56px",
              textTransform: "uppercase",
              fontWeight: "500",
              bgcolor: showMoreOptions ? "#5E5D3E" : "#CCCCCC",
              color: showMoreOptions ? "white" : "#000000B2",
              fontFamily: "Satoshi, sans-serif"
            }}
            onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
            MORE OPTIONS
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

      <Collapse in={showMoreOptions}>
        <MoreOptions />
      </Collapse>
    </Box>
  );
};

export default EventSearch;
