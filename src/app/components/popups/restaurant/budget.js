import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import CreditCard from "@mui/icons-material/CreditCard";

const StyledTextField = styled(TextField)(({ legendbg, error }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: legendbg,
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

export function BudgetInput({
  legendbg = "#ffffff",
  legend = "Budget in CHF",
  onInputChange,
  error = false,
}) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^\d]/g, "")) || 0;

    const formattedValue = `${numericValue}`;
    setValue(formattedValue);

    onInputChange?.(numericValue);
  };

  return (
    <StyledTextField
      fullWidth
      placeholder={'Enter'}
      variant="outlined"
      error={error}
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CreditCard sx={{ color: error ? "#821101B2" : "#0000008C" }} />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
      label={legend}
      legendbg={legendbg}
    />
  );
}
