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
import Image from "next/image";

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
  border: "1px solid #BFBFBF",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  // width: "100%",
  width: "160px",
  maxWidth: "360px",
}));

const CategoryOption = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #BFBFBF",
  marginBottom: "12px",
  cursor: "pointer",
  position: "relative",
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
  opacity = "opacity-100",
  onCategoryChange,
  selectedCategories,
  setSelectedCategories,
  courses = { lunch: 3, dinner: 3 },
  setCourses,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    // Add the event listener to the document
    document.addEventListener("click", handleClickOutside, true);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    setCourses({
      ...courses,
      lunch: 3,
      dinner: 3,
    });
  }, []);

  const handleCategoryToggle = (categoryId) => {
    const currentIndex = selectedCategories.indexOf(categoryId);
    const newSelected = [...selectedCategories];

    if (currentIndex === -1) {
      newSelected.push(categoryId);
      if (categoryId === "lunch" || categoryId === "dinner") {
        setCourses((prev) => ({
          ...prev,
          [categoryId]: 3,
        }));
      }
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelected);
    onCategoryChange?.(newSelected);
  };

  const handleCourseChange = (category, delta) => {
    setCourses((prev) => ({
      ...prev,
      [category]: Math.min(Math.max(1, prev[category] + delta), 9),
    }));
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

  const getCategoryIcon = () => {
    if (selectedCategories.length > 0) {
      return "/SpaceDashboardFilled2.svg";
    } else if (error) {
      return "/SpaceDashboardFilled.svg";
    } else if (isFocused || isHovered) {
      return "/SpaceDashboardFilled2.svg";
    } else {
      return "/SpaceDashboardFilled2.svg";
    }
  };

  return (
    <div style={{ position: "relative", height: "100%", minWidth: "172px" }}>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={buttonRef}
        fullWidth
        sx={{
          height: "56px",
          justifyContent: "space-between",
          borderColor:
            selectedCategories.length > 0
              ? "rgba(0, 0, 0, 0.23)"
              : error
              ? "#821101"
              : isFocused || isHovered
              ? "#00000040"
              : "rgba(0, 0, 0, 0.23)",
          color:
            selectedCategories.length > 0
              ? "rgba(0, 0, 0, 0.70)"
              : error
              ? "#821101"
              : isFocused || isHovered
              ? "#00000040"
              : "rgba(0, 0, 0, 0.70)",
          textTransform: "none",
          padding: "0 10px",
          "&:hover": {
            border:
              selectedCategories.length > 0 || error
                ? "1.5px solid #00000040"
                : "1.5px solid #00000040",
            backgroundColor: "transparent",
          },
          "&:focus": {
            borderColor:
              selectedCategories.length > 0 || error
                ? "#00000040"
                : "#00000040",
          },
        }}
      >
        <legend
          className={`absolute top-0 left-2 -translate-y-1/2 ${legendbg} px-[4px] text-[12px] font-roboto font-[400] ${
            selectedCategories.length > 0
              ? "text-[#000000B2]"
              : error
              ? "text-[#821101]"
              : isFocused || isHovered
              ? "text-[#000000B2]"
              : "text-[#000000B2]"
          } category-legend`}
        >
          Category
        </legend>
        <span
          className="text-[#000000B2] mt-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="mr-2">
            <Image
              src={getCategoryIcon()}
              alt="Category icon"
              width={24}
              height={24}
              className="category-icon"
            />
          </div>
          <h3
            className={`text-[#000000B2] text-[16px] ${opacity} font-normal !font-roboto tracking-[0.15px] mt-0.5`}
          >
            {buttonText}
          </h3>
        </span>
      </Button>

      {open && (
        <DropdownContainer
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
          sx={{ p: "15px !important", width: "272px !important", marginTop: 1 }}
        >
          <Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "#821101",
                height: "2px",
                display: "flex",
              },
            }}
          >
            <StyledTab
              label="TABLE SERVICE"
              sx={{
                color: selectedTab === 0 ? "#821101" : "#000000B2",
                fontWeight: selectedTab === 0 ? "500" : "500",
                p: "0px !important",
                flex: 1,
                fontFamily: "Roboto, sans-serif !important",
              }}
            />
            <StyledTab
              label="SELF SERVICE"
              sx={{
                color: selectedTab === 1 ? "#821101" : "#000000B2",
                fontWeight: selectedTab === 1 ? "500" : "500",
                p: "0px !important",
                flex: 1,
                fontFamily: "Roboto, sans-serif !important",
              }}
            />
          </Tabs>

          {categories.map((category) => (
            <CategoryOption
              key={category.id}
              sx={{
                p: "0px !important",
                height: "56px",
                paddingLeft: "5px !important",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", flex: 1 }}
                className="h-full"
              >
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
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#000000",
                    fontFamily: "Roboto, sans-serif !important",
                    fontWeight: "400",
                  }}
                >
                  {category.label}
                </Typography>
              </div>
              {category.hasCourses &&
                selectedCategories.includes(category.id) && (
                  <div className="border-l border-[#BFBFBF] h-full relative max-w-[110px] min-w-[110px]">
                    <span className="text-[#000000B2] text-[12px] !font-roboto font-normal tracking-[0.15px] absolute -top-[9.5px] bg-white px-1 left-2">
                      Courses
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        padding: "0 16px",
                      }}
                    >
                      <CounterButton
                        size="small"
                        onClick={() => handleCourseChange(category.id, -1)}
                        disabled={courses[category.id] === 1}
                        sx={{ bgcolor: "transparent" }}
                      >
                        <Remove fontSize="small" />
                      </CounterButton>
                      <Typography
                        sx={{ fontSize: "16px", textAlign: "center" }}
                      >
                        {courses[category.id]}
                      </Typography>
                      <CounterButton
                        size="small"
                        onClick={() => handleCourseChange(category.id, 1)}
                        sx={{ bgcolor: "transparent" }}
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
              fontFamily: "Satoshi, sans-serif",
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
