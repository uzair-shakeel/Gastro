import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { CreditCard } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ legendbg }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: legendbg,
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
  },
  "& .MuiOutlinedInput-input": {
    // padding: "10.5px 14px",
    paddingLeft: 0,
  },
  "& .MuiInputAdornment-root": {
    marginRight: "8px",
    marginLeft: "2px",
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

export function BudgetInput({
  legendbg = "#ffffff",
  legend = "Budget in CHF",
  onInputChange,
}) {
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };
  return (
    <StyledTextField
      fullWidth
      placeholder="Enter"
      variant="outlined"
      sx={{
        width: "150px",
        display: "flex",
        justifyContent: "start",
        height: "100%",
        background: legendbg,
      }}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CreditCard />
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
