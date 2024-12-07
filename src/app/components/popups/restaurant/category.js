import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
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

const CategoryOption = styled("div")(({ theme }) => ({
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  padding: "12px 16px",
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

export function CategoryModal() {
  const [open, setOpen] = useState(false);
  const [openAperoModal, setOpenAperoModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [courses, setCourses] = useState(0);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCategoryToggle = (categoryId) => {
    if (categoryId !== "breakfast") {
      setOpenAperoModal(true);
      handleClose();
    }
    const currentIndex = selectedCategories.indexOf(categoryId);
    const newSelected = [...selectedCategories];

    if (currentIndex === -1) {
      newSelected.push(categoryId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelected);
  };

  const handleAperoClose = () => {
    setOpenAperoModal(false);
    setOpen(true);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setCourses(0);
  };

  // Generate button text based on selected categories
  const buttonText =
    selectedCategories.length > 0
      ? selectedCategories
          .map((id) => categories.find((cat) => cat.id === id)?.label)
          .filter(Boolean)
          .join(", ")
      : "Select";

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
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
        <legend className="absolute top-0 left-2 -translate-y-1/2 bg-white px-[4px] text-[12px] font-roboto font-[400] text-[#000000B2]">
          Category
        </legend>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div className="mr-3">
            <img src="/category.svg" />
          </div>
          {buttonText}
        </span>
      </Button>

      {/* Main Category Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "100%", maxWidth: "400px" },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "#8B0000",
              },
            }}
          >
            <StyledTab label="TABLE SERVICE" />
            <StyledTab label="SELF SERVICE" />
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
            onClick={handleClose}
            sx={{
              backgroundColor: "#8B0000",
              "&:hover": {
                backgroundColor: "#660000",
              },
            }}
          >
            CONFIRM
          </Button>
        </DialogContent>
      </Dialog>

      {/* Apero Courses Modal */}
      <Dialog
        open={openAperoModal}
        onClose={handleAperoClose}
        PaperProps={{
          sx: { width: "100%", maxWidth: "400px" },
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <CategoryOption>
            <Checkbox
              checked={false}
              sx={{
                color: "rgba(0, 0, 0, 0.54)",
                "&.Mui-checked": {
                  color: "#8B0000",
                },
              }}
            />
            <Typography>Apero</Typography>
          </CategoryOption>

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
            onClick={handleAperoClose}
            sx={{
              backgroundColor: "#8B0000",
              "&:hover": {
                backgroundColor: "#660000",
              },
            }}
          >
            CONFIRM
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
