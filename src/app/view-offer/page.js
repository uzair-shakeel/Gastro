"use client";

import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SetMealIcon from "@mui/icons-material/SetMeal";
import EggAltIcon from "@mui/icons-material/EggAlt";
import ChildCareIcon from "@mui/icons-material/ChildCare";

const menuData = [
  {
    title: "1 - Course Starter",
    price: "CHF 630",
    dishes: [
      {
        name: "Daprese Saled",
        description:
          "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
        price: "CHF 140",
        icon: "meat",
      },
      {
        name: "Daprese Saled",
        description:
          "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction and if the text will be the ma...",
        price: "CHF 210",
        icon: "fish",
      },
      {
        name: "Daprese Saled",
        description:
          "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
        price: "CHF 280",
        icon: "vegetarian",
      },
    ],
  },
  {
    title: "2 - Course Main",
    price: "CHF 6000",
    dishes: [
      {
        name: "Daprese Saled",
        description:
          "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
        price: "CHF 1500",
        icon: "meat",
      },
      {
        name: "Daprese Saled",
        description:
          "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
        price: "CHF 1500",
        icon: "side",
      },
      {
        name: "Daprese Saled",
        description:
          "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
        price: "CHF 1500",
        icon: "meat",
        isKids: true,
      },
      {
        name: "Daprese Saled",
        description:
          "Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
        price: "CHF 1500",
        icon: "side",
      },
    ],
  },
  {
    title: "3 - Course Dessert",
    price: "CHF 0.00",
    dishes: [],
  },
];

export default function Home() {
  const [expanded, setExpanded] = useState("panel0");
  const [guestCounts, setGuestCounts] = useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleGuestCountChange = (courseIndex, dishIndex, value) => {
    setGuestCounts((prev) => ({
      ...prev,
      [`${courseIndex}-${dishIndex}`]: value,
    }));
  };

  const getIcon = (icon) => {
    switch (icon) {
      case "meat":
        return <RestaurantIcon className="text-red-600" />;
      case "fish":
        return <SetMealIcon className="text-blue-600" />;
      case "vegetarian":
        return <EggAltIcon className="text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Restaurant Sonnenberg - Lunch - 29.10.2024
        </h1>
        <span className="text-red-600 font-semibold">A LA CARTE</span>
      </div>

      {menuData.map((course, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className="mb-4 shadow-md"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="bg-gray-100"
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold">{course.title}</span>
              <span className="text-red-600 font-semibold">{course.price}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {course.dishes.map((dish, dishIndex) => (
              <div key={dishIndex} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{dish.name}</div>
                    <div className="text-sm text-gray-600">
                      {dish.description}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getIcon(dish.icon)}
                    {dish.isKids && (
                      <ChildCareIcon className="ml-2 text-orange-500" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <input
                    type="number"
                    className="w-16 p-1 border rounded"
                    value={guestCounts[`${index}-${dishIndex}`] || ""}
                    onChange={(e) =>
                      handleGuestCountChange(index, dishIndex, e.target.value)
                    }
                    placeholder="Guests"
                  />
                  <span className="font-semibold">{dish.price}</span>
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold">Subtotal</span>
        <span className="font-semibold">CHF 6'000</span>
      </div>

      <textarea
        className="w-full mt-4 p-2 border rounded"
        placeholder="Remarks"
        rows="4"
      ></textarea>

      <div className="mt-4 text-sm text-gray-600">
        <span className="text-red-600 mr-2">*</span>
        Food allergies, specific food instructions or questions about the
        origins of meat: Please contact the restaurant directly at +41588562030
        or add your questions to the remark section.
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button className="bg-red-600 text-white px-4 py-2 rounded">
          DOWNLOAD PDF
        </button>
        <button className="bg-red-800 text-white px-4 py-2 rounded">
          ADJUST
        </button>
        <button className="bg-red-800 text-white px-4 py-2 rounded">
          CANCEL
        </button>
      </div>
    </div>
  );
}
