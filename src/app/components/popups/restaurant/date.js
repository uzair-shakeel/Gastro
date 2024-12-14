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
const weekDays = [
  { label: "S", key: "sun" },
  { label: "M", key: "mon" },
  { label: "T", key: "tue" },
  { label: "W", key: "wed" },
  { label: "T", key: "thu" },
  { label: "F", key: "fri" },
  { label: "S", key: "sat" },
];

export function DateSelectionDropdown({
  legendbg = "bg-white",
  legend = "Date",
  opacity = "opacity-100",
  onDateChange,
  error,  
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState(null);
  const [focused, setFocused] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setTempSelectedDate(selectedDate);
    setAnchorEl(null);
  };

  const handleHover = () => setFocused(true);
  const handleBlur = () => setFocused(false);

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
    setSelectedDate(tempSelectedDate);
    onDateChange(tempSelectedDate);
    setAnchorEl(null);
  };


  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        onMouseEnter={handleHover}
        onMouseLeave={handleBlur}
        onFocus={handleHover}
        onBlur={handleBlur}
        sx={{
          textTransform: "none",
          minWidth: "121px",
          maxWidth: "121px",
          fontSize: "16px",
          justifyContent: "space-between",
          color: error
            ? "red"
            : focused
              ? "#BBBBBB"
              : "gray",
          border: error
            ? "1.5px solid #821101"
            : focused
              ? "1px solid #BBBBBB"
              : "1px solid #C4C4C4",
          borderRadius: "4px",
          height: "56px",
          width: "121px",
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
          transition: "border-color 0.3s, color 0.3s",
          bgcolor: "transparent",
        }}
      >
        <legend
          className={`absolute top-0 left-2 -translate-y-1/2 ${legendbg} px-[4px] text-[12px] font-roboto font-[400] ${error
              ? "text-[#821101]"
              : focused
                ? "text-[#000000B2]"
                : "text-[#000000B2]"
            }`}
        >
          {legend}
        </legend>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <img
              src={
                error
                  ? "/red-date.svg"
                  : focused
                    ? "/CalendarTodayFilled.svg"
                    : "/CalendarTodayFilled.svg"
              }
              className="w-[24px] h-[24px] min-w-[24px] max-w-[24px] max-h-[24px] min-h-[24px]"
              alt="calendar icon"
            />
          </div>
          <h3
            className={`text-[#000000B2] ${opacity} tracking-[0.15px] text-[16px] ml-2 mt-1 font-normal !font-roboto ${error ? "text-[#000000B2]" : ""
              }`}
          >
            {selectedDate
              ? selectedDate.toLocaleDateString(undefined, {
                month: "2-digit",
                day: "2-digit",
              })
              : "Select"}
          </h3>
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "350px",
            p: 1,
            marginTop: 1,
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
            <div key={day.key} className="weekday">
              {day.label}
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
                className={`day ${isTempSelected ? "selected" : ""} ${isToday ? "today" : ""
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

