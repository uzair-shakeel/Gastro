import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { CreditCard } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
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

export function BudgetInput() {
  return (
    <StyledTextField
      fullWidth
      placeholder="Enter"
      variant="outlined"
      sx={{
        maxWidth: "120px",
        display: "flex",
        justifyContent: "start",
        height: "100%",
      }}
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
      label="Budget"
    />
  );
}
