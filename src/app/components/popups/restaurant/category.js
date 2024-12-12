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
  position: "relative",
}));

const CoursesSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 0",
  borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
  marginLeft: "16px",
  position: "relative",
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
  selectedCategories,
  setSelectedCategories,
  courses,
  setCourses,
}) {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
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
          color: "rgba(0, 0, 0, 0.70)",
          textTransform: "none",
          p: "0 10px",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.23)",
            backgroundColor: "transparent",
          },
        }}
        endIcon={<img
          src="/arrow-dropdown-filled.svg"
          alt="dropdown"
          style={{ width: "24px", height: "24px", marginRight: '0px' }}
        />}
      >
        <legend
          className={`absolute top-0 left-2 -translate-y-1/2 ${legendbg} px-[4px] text-[12px] font-roboto font-[400] text-[#000000B2]`}
        >
          Category
        </legend>
        <span className=" text-[#000000B2]" style={{ display: "flex", alignItems: "center" }}>
          <div className="mr-3">
            <img src="/category-icon.svg" alt="Category icon" />
          </div>
          {buttonText}
        </span>
      </Button>

      {open && (
        <DropdownContainer ref={dropdownRef} sx={{ p: "15px !important", width: '272px !important' }}>
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "#821101",
                height: "2px",
                display:"flex"
              },
            }}
          >
            <StyledTab
              label="TABLE SERVICE"
              sx={{
                color: selectedTab === 0 ? "#821101" : "#000000B2",  
                fontWeight: selectedTab === 0 ? "500" : "500",
                p:"0px !important",
                flex:1,
                fontFamily: "Roboto, sans-serif !important", 
              }}
            />
            <StyledTab
              label="SELF SERVICE"
              sx={{
                color: selectedTab === 1 ? "#821101" : "#000000B2",  
                fontWeight: selectedTab === 1 ? "500" : "500",
                p:"0px !important",
                flex:1,
                fontFamily: "Roboto, sans-serif !important", 
              }}
            />
          </Tabs>


          {categories.map((category) => (
            <CategoryOption key={category.id} sx={{ p: '0px !important', height: '56px', paddingLeft: '5px !important' }}>
              <div style={{ display: "flex", alignItems: "center", flex: 1, }}>
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
                <Typography sx={{ fontSize: "16px", color: "#000000", fontFamily: "Roboto, sans-serif !important", fontWeight: "400" }}>
                  {category.label}
                </Typography>
              </div>
              {category.hasCourses &&
                selectedCategories.includes(category.id) && (
                  <div className="border-l border-[#00000040] relative max-w-[110px] min-w-[110px]">
                    <span className="text-[#000000B2] text-[12px] font-roboto font-normal tracking-[0.15px] absolute -top-[22px] bg-white px-1 left-2">Courses</span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        height:"100%",
                        width: "100%",
                        justifyContent: "center",
                        padding: "0 16px",
                      }}
                    >
                      <CounterButton
                        size="small"
                        onClick={() => handleCourseChange(category.id, -1)}
                        disabled={courses[category.id] === 0}
                        sx={{bgcolor:"transparent"}}
                      >
                        <Remove fontSize="small" />
                      </CounterButton>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          // minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {courses[category.id]}
                      </Typography>
                      <CounterButton
                        size="small"
                        onClick={() => handleCourseChange(category.id, 1)}
                        sx={{bgcolor:"transparent"}}
                      >
                        <Add fontSize="small" />
                      </CounterButton>
                    </div>
                  </div>
                )}
            </CategoryOption>
          ))}

          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#821101",
              color: "#fff",
              marginTop: "5px",
              fontSize: "16px",
              fontWeight: 500,
              padding: "8px",
              borderRadius: "8px",
              fontFamily: 'Satoshi, sans-serif',
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
