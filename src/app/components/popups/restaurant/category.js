import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Typography,
  Checkbox,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Remove } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#8B0000",
  borderBottom: "2px solid transparent",
  "&.Mui-selected": {
    color: "#8B0000",
    borderBottom: "2px solid #8B0000",
  },
}));

const DropdownContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: 1000,
  backgroundColor: "white",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "16px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  maxWidth: "300px",
  width: "100%",
}));

const CategoryOption = styled("div")(({ theme }) => ({
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "8px 16px",
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#000",
  },
}));

const CoursesCounter = styled("div")(({ theme }) => ({
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "8px",
}));

const categories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
];

export function CategoryDropdown({ legendBg = "bg-white", generalSearch }) {
  const [open, setOpen] = useState(false);
  const [openAperoDropdown, setOpenAperoDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [courses, setCourses] = useState(0);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
      setOpenAperoDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryToggle = (categoryId) => {
    const currentIndex = selectedCategories.indexOf(categoryId);
    const newSelected = [...selectedCategories];

    if (currentIndex === -1) {
      // Add the category if it's not selected
      newSelected.push(categoryId);
    } else {
      // Remove the category if it's already selected
      newSelected.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelected);

    // If the category is being selected and it's "Lunch" or "Dinner", open the apero dropdown
    if (
      (categoryId === "lunch" || categoryId === "dinner") &&
      currentIndex === -1 && // Only open if it's being selected
      !openAperoDropdown
    ) {
      setOpenAperoDropdown(true);
    }

    // If "Lunch" or "Dinner" is being deselected, ensure the apero dropdown doesn't open
    if (
      (categoryId === "lunch" || categoryId === "dinner") &&
      currentIndex !== -1 // If it's being deselected
    ) {
      setOpenAperoDropdown(false);
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setCourses(0);
  };

  const buttonText =
    selectedCategories.length > 0
      ? selectedCategories
          .map((id) => categories.find((cat) => cat.id === id)?.label)
          .filter(Boolean)
          .join(", ")
      : "Select";

  return (
    <>
      <div style={{ position: "relative", height: "100%", minWidth: "272px" }}>
        <Button
          variant="outlined"
          onClick={() => setOpen((prev) => !prev)}
          fullWidth
          sx={{
            textTransform: "none",
            fontSize: "16px",
            justifyContent: "space-between",
            color: "gray",
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            height: "100%",
            fontWeight: 400,
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
          endIcon={<ArrowDropDownIcon />}
        >
          <legend
            className={`absolute top-0 left-2 -translate-y-1/2 ${legendBg} px-[4px] text-[12px] font-roboto font-[400] text-[#000000B2]`}
          >
            Category
          </legend>
          <span style={{ display: "flex", alignItems: "center" }}>
            <div className="mr-3">
              <img src="/category.svg" />
            </div>
            {buttonText}
          </span>
        </Button>

        {open && (
          <DropdownContainer ref={dropdownRef} style={{ width: "272px" }}>
            <Tabs
              value={selectedTab}
              onChange={(event, newValue) => setSelectedTab(newValue)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mb: 3,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#8B0000",
                },
              }}
            >
              <StyledTab sx={{ paddingX: "8px" }} label="TABLE SERVICE" />
              <StyledTab sx={{ paddingX: "8px" }} label="SELF SERVICE" />
            </Tabs>

            {categories.map((category) => (
              <CategoryOption
                key={category.id}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    "&.Mui-checked": {
                      color: "#8B0000",
                    },
                  }}
                />
                <Typography>{category.label}</Typography>
              </CategoryOption>
            ))}

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 2,
                mb: 2,
                color: "#8B0000",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleReset}
            >
              Reset to default
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpen(false)}
              sx={{
                backgroundColor: "#8B0000",
                "&:hover": {
                  backgroundColor: "#660000",
                },
              }}
            >
              CONFIRM
            </Button>
          </DropdownContainer>
        )}

        {openAperoDropdown && (
          <DropdownContainer
            ref={dropdownRef}
            style={{
              top: "218px",
              width: "272px",
              right: generalSearch ? "-243px" : "-153px",
            }}
          >
            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
              Courses
            </Typography>

            <CoursesCounter>
              <IconButton
                onClick={() => setCourses(Math.max(0, courses - 1))}
                size="small"
              >
                <Remove />
              </IconButton>
              <Typography variant="body1">{courses}</Typography>
              <IconButton onClick={() => setCourses(courses + 1)} size="small">
                <Add />
              </IconButton>
            </CoursesCounter>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 2,
                mb: 2,
                color: "#8B0000",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleReset}
            >
              Reset to default
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenAperoDropdown(false)}
              sx={{
                backgroundColor: "#8B0000",
                "&:hover": {
                  backgroundColor: "#660000",
                },
              }}
            >
              CONFIRM
            </Button>
          </DropdownContainer>
        )}
      </div>
    </>
  );
}
