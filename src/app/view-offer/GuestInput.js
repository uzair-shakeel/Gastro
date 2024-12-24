import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CreditCard from "@mui/icons-material/CreditCard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledTextField = styled(TextField)(({ legendbg, error, icon }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: legendbg,
    textAlign: icon ? "left" : "center", // Center align when no icon
    "& fieldset": {
      border: error
        ? "1.5px solid #821101 !important"
        : "1px solid #BBBBBB !important",
    },
    "&:hover fieldset": {
      border: "1px solid #00000040 !important",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #00000040 !important",
    },
    "& input": {
      textAlign: icon ? "left" : "center", // Center the text
    },
    "& input::placeholder": {
      color: error ? "#821101" : "#000000B2",
      opacity: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: error ? "#821101" : "#000000B2",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#000000B2",
  },
  width: "150px",
  maxWidth: "150px",
  minWidth: "150px",
  display: "flex",
  justifyContent: "start",
  height: "100%",
}));

export function GuestInput({
  onInputChange,
  error = false,
  valueOfInput = "",
  icon = true,
  disable = false,
}) {
  const [value, setValue] = useState(valueOfInput);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      setValue("");
      onInputChange?.(null); // Pass null for empty input
      return;
    }

    const numericValue = parseFloat(inputValue.replace(/[^\d]/g, "")) || 0;
    const formattedValue = `${numericValue}`;
    setValue(formattedValue);
    onInputChange?.(numericValue);
  };

  const handleIncrement = () => {
    const newValue = (parseInt(value, 10) || 0) + 1;
    setValue(newValue.toString());
    onInputChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max((parseInt(value, 10) || 0) - 1, 0);
    setValue(newValue.toString());
    onInputChange?.(newValue);
  };

  return (
    <StyledTextField
      fullWidth
      placeholder={"Enter"}
      variant="outlined"
      error={error}
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      label="Guests"
      legendbg="#ffffff"
      disabled={disable}
      InputProps={{
        startAdornment: !disable && (
          <InputAdornment position="start">
            <IconButton
              onClick={handleDecrement}
              disabled={parseInt(value, 10) <= 0}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: !disable && (
          <InputAdornment position="end">
            <IconButton onClick={handleIncrement} size="small">
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
