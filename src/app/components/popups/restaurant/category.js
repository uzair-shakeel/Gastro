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
  color: "#821101",
  textTransform: "uppercase",
  fontSize: "14px",
  fontWeight: 500,
  padding: "12px 24px",
  "&.Mui-selected": {
    color: "#821101",
  },
}));

const DropdownContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: 1000,
  backgroundColor: "white",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  width: "360px",
}));

const CategoryOption = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  marginBottom: "12px",
  cursor: "pointer",
  position: "relative", // Added for absolute positioning of label
   
}));

const CoursesSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0", // Removed horizontal padding
  borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
  marginLeft: "16px",
  position: "relative", // Added for absolute positioning of label
  outline: "none",
  flex: 1,
  "&::before": {
    content: '"Courses"',
    position: "absolute",
    top: "-20px",
    left: "25%",
    transform: "translateX(-50%)",
    background: "white",
    padding: "0 8px",
    fontSize: "12px",
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: 400,
  },
}));

const CounterButton = styled(IconButton)(({ theme }) => ({
  padding: "4px",
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
  color: "#000",
  "&:hover": {
    backgroundColor: "#EEEEEE",
  },
  "&.Mui-disabled": {
    backgroundColor: "#F5F5F5",
    color: "rgba(0, 0, 0, 0.26)",
  },
}));

const categories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch", hasCourses: true },
  { id: "dinner", label: "Dinner", hasCourses: true },
];

export function CategoryDropdown({
  legendbg = "bg-white",
  generalSearch,
  onCategoryChange,
}) {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [courses, setCourses] = useState({
    lunch: 3,
    dinner: 2,
  });
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
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
      newSelected.push(categoryId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelected);
    onCategoryChange?.(newSelected);
  };

  const handleCourseChange = (category, delta) => {
    setCourses((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] + delta),
    }));
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setCourses({ lunch: 3, dinner: 2 });
    onCategoryChange?.([]);
  };

  const buttonText =
    selectedCategories.length > 0
      ? selectedCategories
          .map((id) => {
            const category = categories.find((cat) => cat.id === id);
            if (category?.hasCourses) {
              return `${category.label} (${courses[id]})`;
            }
            return category?.label;
          })
          .join(", ")
      : "Select";

  return (
    <div style={{ position: "relative", height: "100%", minWidth: "272px" }}>
      <Button
        variant="outlined"
        onClick={() => setOpen((prev) => !prev)}
        fullWidth
        sx={{
          height: "100%",
          justifyContent: "space-between",
          borderColor: "rgba(0, 0, 0, 0.23)",
          color: "rgba(0, 0, 0, 0.87)",
          textTransform: "none",
          p: "0 10px",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            backgroundColor: "transparent",
          },
        }}
        endIcon={<ArrowDropDownIcon />}
      >
        <legend
          className={`absolute top-0 left-2 -translate-y-1/2 ${legendbg} px-[4px] text-[12px] font-roboto font-[400] text-[#000000B2]`}
        >
          Category
        </legend>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div className="mr-3">
            <img src="/category.svg" alt="Category icon" />
          </div>
          {buttonText}
        </span>
      </Button>

      {open && (
        <DropdownContainer ref={dropdownRef}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            sx={{
              mb: 3,
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              "& .MuiTabs-indicator": {
                backgroundColor: "#821101",
                height: "2px",
              },
            }}
          >
            <StyledTab label="TABLE SERVICE" />
            <StyledTab label="SELF SERVICE" />
          </Tabs>

          {categories.map((category) => (
            <CategoryOption key={category.id}>
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  sx={{
                    color: "rgba(0, 0, 0, 0.54)",
                    "&.Mui-checked": {
                      color: "#821101",
                    },
                  }}
                />
                <Typography sx={{ fontSize: "16px", color: "#000000DE" }}>
                  {category.label}
                </Typography>
              </div>
              {category.hasCourses &&
                selectedCategories.includes(category.id) && (
                  <CoursesSection>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                        justifyContent: "center",
                        padding: "0 16px",
                      }}
                    >
                      <CounterButton
                        size="small"
                        onClick={() => handleCourseChange(category.id, -1)}
                        disabled={courses[category.id] === 0}
                      >
                        <Remove fontSize="small" />
                      </CounterButton>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {courses[category.id]}
                      </Typography>
                      <CounterButton
                        size="small"
                        onClick={() => handleCourseChange(category.id, 1)}
                      >
                        <Add fontSize="small" />
                      </CounterButton>
                    </div>
                  </CoursesSection>
                )}
            </CategoryOption>
          ))}

          <Typography
            onClick={handleReset}
            sx={{
              textAlign: "center",
              mt: 2,
              mb: 3,
              color: "#821101",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Reset to default
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#821101",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 500,
              padding: "16px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#6a0e01",
              },
            }}
          >
            CONFIRM
          </Button>
        </DropdownContainer>
      )}
    </div>
  );
}
