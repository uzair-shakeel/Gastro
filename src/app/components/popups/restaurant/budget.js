import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { CreditCard } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ legendbg }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: legendbg,
    "& fieldset": {
      borderColor: "#00000040",
    },
    "&:hover fieldset": {
      border: "1.5px solid #821101 !important",
    },
    "&.Mui-focused fieldset": {
      border: "1.5px solid #821101 !important",
    },
  },
  "& .MuiOutlinedInput-input": {
    paddingLeft: 0,
    color: "#000000B2",
    fontFamily: "Roboto, sans-serif !important",
    fontSize: "16px",
    fontWeight: "normal",
    letterSpacing: "0.15px",
  },
  "& .MuiInputAdornment-root": {
    marginRight: "8px",
    marginLeft: "2px",
    color: "rgba(0, 0, 0, 0.54)",
  },
  "& .MuiInputBase-input::placeholder": {
    opacity: 1,
    color: "#000000B2",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: "normal",
  },
  "& .MuiInputLabel-root": {
    color: "#000000B2 ",
    transition: "color 0.3s ease",
  },
  "&. Mui-focused .MuiInputLabel-root": {
    color: "#821101 !important",
  },
  "&:hover .MuiInputLabel-root": {
    color: "#821101 !important",
  },
}));

export function BudgetInput({
  legendbg = "#ffffff",
  legend = "Budget in CHF",
  onInputChange,
}) {
  const [value, setValue] = useState("");

  const formatCurrency = (amount) => {
    const numericValue = amount.replace(/[^\d]/g, "");
    if (!numericValue) return "";
    return `$${Number(numericValue).toLocaleString("en-US")}`;
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatCurrency(inputValue);
    setValue(formattedValue);
    onInputChange?.(formattedValue);
  };

  return (
    <StyledTextField
      fullWidth
      placeholder="Enter"
      variant="outlined"
      sx={{
        width: "150px",
        maxWidth: "150px",
        minWidth: "150px",
        display: "flex",
        justifyContent: "start",
        height: "100%",
        background: legendbg,
        "&:hover .MuiInputAdornment-root svg": {
          color: "#821101B2", // change icon color on hover
        },
      }}
      value={value}
      onChange={handleChange}
      inputProps={{
        inputMode: "text",
        pattern: "\\d*",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CreditCard sx={{ color: "#0000008C" }} />
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
