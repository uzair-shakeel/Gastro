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

export function CategoryDropdown({
  legendbg = "bg-white",
  generalSearch,
  onCategoryChange,
}) {
  const [open, setOpen] = useState(false);
  const [openAperoDropdown, setOpenAperoDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [lunchCourses, setLunchCourses] = useState(0);
  const [dinnerCourses, setDinnerCourses] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
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
      newSelected.push(categoryId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelected);

    // Notify the parent of category changes (pass the updated list)
    onCategoryChange && onCategoryChange(newSelected);

    if (
      (categoryId === "lunch" || categoryId === "dinner") &&
      currentIndex === -1 &&
      !openAperoDropdown
    ) {
      setOpenAperoDropdown(true);
      setActiveCategory(categoryId);
    }

    if (
      (categoryId === "lunch" || categoryId === "dinner") &&
      currentIndex !== -1
    ) {
      if (categoryId === activeCategory) {
        setOpenAperoDropdown(false);
        setActiveCategory(null);
      }
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setLunchCourses(0);
    setDinnerCourses(0);
    setActiveCategory(null);
    // Notify the parent that categories have been reset
    onCategoryChange && onCategoryChange([]);
  };

  const buttonText =
    selectedCategories.length > 0
      ? selectedCategories
          .map((id) => {
            const category = categories.find((cat) => cat.id === id);
            if (category) {
              if (id === "lunch" && lunchCourses > 0) {
                return `${category.label} (${lunchCourses})`;
              } else if (id === "dinner" && dinnerCourses > 0) {
                return `${category.label} (${dinnerCourses})`;
              }
              return category.label;
            }
            return null;
          })
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
              right: generalSearch ? "-220px" : "-180px",
            }}
          >
            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
              Courses
            </Typography>

            {activeCategory === "lunch" && (
              <CoursesCounter>
                <IconButton
                  onClick={() => setLunchCourses(Math.max(0, lunchCourses - 1))}
                  size="small"
                >
                  <Remove />
                </IconButton>
                <Typography variant="body1">{lunchCourses}</Typography>
                <IconButton
                  onClick={() => setLunchCourses(lunchCourses + 1)}
                  size="small"
                >
                  <Add />
                </IconButton>
              </CoursesCounter>
            )}

            {activeCategory === "dinner" && (
              <CoursesCounter>
                <IconButton
                  onClick={() =>
                    setDinnerCourses(Math.max(0, dinnerCourses - 1))
                  }
                  size="small"
                >
                  <Remove />
                </IconButton>
                <Typography variant="body1">{dinnerCourses}</Typography>
                <IconButton
                  onClick={() => setDinnerCourses(dinnerCourses + 1)}
                  size="small"
                >
                  <Add />
                </IconButton>
              </CoursesCounter>
            )}

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
