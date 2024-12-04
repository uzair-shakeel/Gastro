import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
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

export function DateSelectionModal() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  };

  const handleConfirm = () => {
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          textTransform: "none",
          maxWidth: "110px",
          fontSize: "16px",
          justifyContent: "space-between",
          color: "gray",
          border: "1px solid #C4C4C4",
          borderRadius: "4px",
          // padding: "8px 12px",

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
        <span style={{ display: "flex", alignItems: "center" }}>
          <div className="mr-3">
            <img src="/CalendarTodayFilled.svg" />
          </div>
          {selectedDate ? selectedDate.toLocaleDateString() : "Date"}
        </span>
      </Button>

      <Dialog
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
        <DialogContent
          sx={{
            maxHeight: "550px", // Set a height limit for scrolling
            overflowY: "scroll", // Enable vertical scrolling
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar in Webkit browsers (Chrome, Safari)
            },
            scrollbarWidth: "none", // For Firefox
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
              const isSelected =
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentMonth.getMonth() &&
                selectedDate?.getFullYear() === currentMonth.getFullYear();
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentMonth.getMonth() &&
                new Date().getFullYear() === currentMonth.getFullYear();
              return (
                <div
                  key={day}
                  className={`day ${isSelected ? "selected" : ""} ${
                    isToday ? "today" : ""
                  }`}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </div>
              );
            })}
          </CalendarGrid>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setSelectedDate(new Date())}
            sx={{
              mt: 2,
              boxShadow: "none", // Remove shadow
              color: "#8B0000",
              backgroundColor: "rgba(130, 17, 1, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(130, 17, 1, 0.2)",
                boxShadow: "none", // Remove shadow
              },
            }}
          >
            TODAY
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirm}
            sx={{
              mt: 2,
              backgroundColor: "#8B0000",
              boxShadow: "none", // Remove shadow

              "&:hover": {
                backgroundColor: "#660000",
                boxShadow: "none", // Remove shadow
              },
            }}
          >
            CONFIRM
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
