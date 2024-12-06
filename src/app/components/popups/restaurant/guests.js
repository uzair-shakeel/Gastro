import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Remove, Person } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CounterWrapper = styled("div")(({ theme }) => ({
  marginBottom: "16px",
}));

const CounterLabel = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "rgba(0, 0, 0, 0.87)",
  marginBottom: "4px",
}));

const CounterContainer = styled("div")(({ theme }) => ({
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
}));

const CounterButton = styled(IconButton)(({ theme }) => ({
  padding: "4px",
  color: "rgba(0, 0, 0, 0.54)",
  "&.Mui-disabled": {
    color: "rgba(0, 0, 0, 0.26)",
  },
}));

const CounterValue = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  minWidth: "40px",
  textAlign: "center",
}));

const ResetButton = styled(Typography)(({ theme }) => ({
  color: "#8B0000",
  textAlign: "center",
  cursor: "pointer",
  marginTop: "16px",
  marginBottom: "16px",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8B0000",
  color: "#fff",
  padding: "12px",
  "&:hover": {
    backgroundColor: "#660000",
  },
}));

export function GuestsModal() {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    kids: 0,
    all: 0,
    meat: 0,
    fish: 0,
    vegetarian: 0,
    vegan: 0,
  });
  const [showExtended, setShowExtended] = useState(false);

  useEffect(() => {
    if (guests.adults > 0) {
      setShowExtended(true);
    } else {
      setShowExtended(false);
    }
  }, [guests.adults]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (guests.adults === 0) {
      setShowExtended(false);
    }
  };

  const handleIncrement = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  const handleReset = () => {
    setGuests({
      adults: 0,
      kids: 0,
      all: 0,
      meat: 0,
      fish: 0,
      vegetarian: 0,
      vegan: 0,
    });
    setShowExtended(false);
  };

  const GuestCounter = ({ label, value, type }) => (
    <CounterWrapper>
      <CounterLabel>{label}</CounterLabel>
      <CounterContainer>
        <CounterButton
          onClick={() => handleDecrement(type)}
          disabled={value === 0}
          size="small"
        >
          <Remove fontSize="small" />
        </CounterButton>
        <CounterValue>{value}</CounterValue>
        <CounterButton onClick={() => handleIncrement(type)} size="small">
          <Add fontSize="small" />
        </CounterButton>
      </CounterContainer>
    </CounterWrapper>
  );

  const totalGuests = guests.adults + guests.kids;

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          height: "100%",
          justifyContent: "flex-start",
          borderColor: "rgba(0, 0, 0, 0.23)",
          color: "rgba(0, 0, 0, 0.87)",
          textTransform: "none",
          // padding: "6px 12px",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            backgroundColor: "transparent",
          },
        }}
        endIcon={<ArrowDropDownIcon />}
      >
        <legend className="absolute top-0 left-2 -translate-y-1/2 bg-white px-[4px] text-[12px] font-roboto font-[400] text-[#000000B2]">
          Guests
        </legend>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div className="mr-3">
            <img src="/PeopleFilled.svg" />
          </div>

          {totalGuests > 0
            ? `${totalGuests} Guest${totalGuests !== 1 ? "s" : ""}`
            : "0"}
        </span>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "400px",
            p: 2,
            borderRadius: "8px",
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {showExtended ? "Guests - extended" : "Guests"}
          </Typography>

          {!showExtended ? (
            <>
              <GuestCounter
                label="Adults"
                value={guests.adults}
                type="adults"
              />
              <GuestCounter label="Kids" value={guests.kids} type="kids" />
            </>
          ) : (
            <>
              <GuestCounter
                label="Adults"
                value={guests.adults}
                type="adults"
              />
              <GuestCounter label="All" value={guests.all} type="all" />
              <GuestCounter label="Meat" value={guests.meat} type="meat" />
              <GuestCounter label="Fish" value={guests.fish} type="fish" />
              <GuestCounter
                label="Vegetarian"
                value={guests.vegetarian}
                type="vegetarian"
              />
              <GuestCounter label="Vegan" value={guests.vegan} type="vegan" />
              <GuestCounter label="Kids" value={guests.kids} type="kids" />
            </>
          )}

          <ResetButton onClick={handleReset}>Reset to default</ResetButton>

          <ConfirmButton fullWidth variant="contained" onClick={handleClose}>
            CONFIRM
          </ConfirmButton>
        </DialogContent>
      </Dialog>
    </>
  );
}
