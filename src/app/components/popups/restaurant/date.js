import React, { useState } from "react";
import { Button, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CalendarGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "8px",
  textAlign: "center",
  "& .weekday": {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    padding: "4px",
  },
  "& .day": {
    padding: "8px",
    cursor: "pointer",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.selected": {
      backgroundColor: "#8B0000",
      color: "white",
    },
    "&.today": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

export function DateSelectionDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState(null); // Temporary date for confirmation

  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setTempSelectedDate(selectedDate); // Reset to the previously confirmed date on close
    setAnchorEl(null);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const handleDateSelect = (day) => {
    setTempSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  };

  const handleConfirm = () => {
    setSelectedDate(tempSelectedDate); // Set the selected date
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          textTransform: "none",
          maxWidth: "140px",
          fontSize: "16px",
          justifyContent: "space-between",
          color: "gray",
          border: "1px solid #C4C4C4",
          borderRadius: "4px",
          height: "100%",
          width: "200px",
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            backgroundColor: "transparent",
          },
        }}
      >
        <legend className="absolute top-0 left-2 -translate-y-1/2 bg-white px-[4px] text-[12px] font-roboto font-[400] text-[#000000B2]">
          Date Selection
        </legend>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div className="mr-2">
            <img
              src="/CalendarTodayFilled.svg"
              className="w-[18px] h-[18px] min-w-[18px]"
            />
          </div>
          {selectedDate ? selectedDate.toLocaleDateString() : "Select"}
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "400px",
            p: 1,
          },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeft />
          </IconButton>
          <Typography>
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRight />
          </IconButton>
        </div>
        <CalendarGrid>
          {weekDays.map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
          {[...Array(firstDay)].map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {[...Array(days)].map((_, index) => {
            const day = index + 1;
            const isTempSelected =
              tempSelectedDate?.getDate() === day &&
              tempSelectedDate?.getMonth() === currentMonth.getMonth() &&
              tempSelectedDate?.getFullYear() === currentMonth.getFullYear();
            const isToday =
              new Date().getDate() === day &&
              new Date().getMonth() === currentMonth.getMonth() &&
              new Date().getFullYear() === currentMonth.getFullYear();
            return (
              <div
                key={day}
                className={`day ${isTempSelected ? "selected" : ""} ${
                  isToday ? "today" : ""
                }`}
                onClick={() => handleDateSelect(day)}
              >
                {day}
              </div>
            );
          })}
        </CalendarGrid>
        <MenuItem
          onClick={() => {
            setTempSelectedDate(new Date());
            setCurrentMonth(new Date());
          }}
          sx={{
            mt: 2,
            boxShadow: "none",
            color: "#8B0000",
            backgroundColor: "rgba(130, 17, 1, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "rgba(130, 17, 1, 0.2)",
              boxShadow: "none",
            },
          }}
        >
          TODAY
        </MenuItem>
        <MenuItem
          onClick={handleConfirm}
          sx={{
            mt: 1,
            backgroundColor: "#8B0000",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            "&:hover": {
              backgroundColor: "#660000",
            },
          }}
        >
          CONFIRM
        </MenuItem>
      </Menu>
    </>
  );
}
