import React, { useCallback, useEffect, useState } from "react";
import { Box, Tabs, Tab, Button, Grid, Collapse } from "@mui/material";
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
  const [guests, setGuests] = useState({
    adults: 0,
    kids: 0,
    all: 0,
    meat: 0,
    fish: 0,
    vegetarian: 0,
    vegan: 0,
  });
  const [errors, setErrors] = useState({
    location: false,
    date: false,
    category: false,
    guests: false,
    budget: false,
  });
  const [showErrors, setShowErrors] = useState(false);

  const handleLocationChange = (updatedData) => {
    setLocationData(updatedData);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handleBudgetChange = (value) => {
    setIsBudgetFilled(value !== null && value !== undefined && value !== "");
    setBudget(value);
  };

  const handleGuestsChange = (guestCount) => {
    setIsGuestsFilled(guestCount > 0);
  };

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
  }, []);

  const validateInputs = () => {
    const newErrors = {
      location: !locationData || !locationData.inputValue?.trim(),
      date: !selectedDate,
      category: selectedCategories.length === 0,
      guests: !isGuestsFilled,
      budget: !isBudgetFilled,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSearch = () => {
    if (validateInputs()) {
      console.log("Searching...");
    } else {
      setShowErrors(true);
    }
  };

  useEffect(() => {
    setIsButtonEnabled(!Object.values(errors).some(Boolean));
  }, [errors]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
          height: "60px",
          minHeight: "60px",
          maxHeight: "60px",
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
          sx={{
            height: "56px",
            minHeight: "56px",
            maxHeight: "56px",
          }}
        >
          {/* Done */}
          <Box
            flexGrow={1}
            sx={{
              height: "56px",
              minHeight: "56px",
              maxHeight: "56px",
            }}
          >
            <WhereInput onLocationChange={handleLocationChange}
              error={showErrors && errors.location}
            />
          </Box>
          {/* Done */}
          <Box>
            <DateSelectionDropdown
              legend="Date"
              legendbg="bg-white"
              opacity="opacity-100"
              onDateChange={handleDateChange}
              error={showErrors && errors.date}
            />

          </Box>
          {/* Done */}
          <Box flexGrow={1}>
            <CategoryDropdown
              courses={courses}
              setCourses={setCourses}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              generalSearch={true}
              legendbg="bg-white"
              opacity="opacity-100"
              onCategoryChange={handleCategoryChange}
              error={showErrors && errors.category}
            />
          </Box>
          <Box>
            <GuestsDropdown
              setGuests={setGuests}
              guests={guests}
              legendbg="bg-white"
              opacity="opacity-100"
              onSelectionChange={handleGuestsChange}
              error={showErrors && errors.guests}
            />
          </Box>

          {/* Done */}
          <Box>
            <BudgetInput
              legend="Budget"
              legendbg="white"
              opacityInput={40}
              onInputChange={handleBudgetChange}
              error={showErrors && errors.budget}
            />
          </Box>
        </Box>
        {/* Buttons */}
        <Grid item xs={12} sm={6} md={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              width: "161px",
              whiteSpace: "nowrap",
              fontSize: "15px",
              height: "56px",
              textTransform: "uppercase",
              fontWeight: "500 !important",
              bgcolor: showMoreOptions ? "#5E5D3E" : "#CCCCCC",
              color: showMoreOptions ? "white" : "#000000B2",
              fontFamily: "Satoshi, sans-serif !important",
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
            onClick={handleSearch}
            sx={{
              width: "106px",
              textTransform: "uppercase",
              bgcolor: isButtonEnabled ? "#821101" : "#CCCCCC",
              height: "56px",
              color: isButtonEnabled ? "white" : "black",
              fontFamily: "Satoshi, sans-serif !important",
              '&:hover': {
                bgcolor: isButtonEnabled ? "#6a0e01" : "#CCCCCC",
              },
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

