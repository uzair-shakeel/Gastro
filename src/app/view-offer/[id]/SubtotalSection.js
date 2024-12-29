import { Box, Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CancelModal from "./CancelModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SubtotalSection({
  totalGuests,
  totalAmount,
  setEditable,
  editable,
  restaurant,
  setRestaurant,
  handleToggleEditing,
  remarks,
  onRemarksChange,
  handleRequestClick,
}) {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const toggleCancelModal = () => {
    if (restaurant.status === "Confirmed") {
      toast.warning("The order is already confirmed and cannot be Cancelled.", {
        className: "custom-toast",
      });
    } else if (restaurant.status === "Cancelled") {
      toast.warning("The order is already Cancelled.", {
        className: "custom-toast",
      });
    } else {
      setIsCancelModalOpen(!isCancelModalOpen);
    }
  };

  const handleConfirmCancel = () => {
    if (typeof window !== "undefined") {
      const storedOrders = localStorage.getItem("orders");

      if (storedOrders) {
        const currentDate = new Date();
        const formattedDate = `${
          currentDate.getMonth() + 1
        }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Ensures AM/PM format
        });

        // Parse the stored orders
        const orders = JSON.parse(storedOrders);
        // Find the restaurant to update
        const updatedOrders = orders.map((order) =>
          order.id === restaurant.id
            ? {
                ...order,
                status: "Cancelled", // Update status to Cancelled
                note: "The offer has been cancelled", // Add or update note
                time: formattedTime, // Update time
                date: formattedDate, // Update date
              }
            : order
        );

        // Update the orders in localStorage with the modified order
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        // Optionally, update the state as well if needed
        setRestaurant(updatedOrders);
      }

      const storedMessages = localStorage.getItem("mockMessages");
      const currentDate = new Date();
      const formattedDate = `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
      const formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensures AM/PM format
      });

      if (storedMessages) {
        const mockMessages = JSON.parse(storedMessages);
        const restaurantMessages = mockMessages[restaurant.id] || [];

        // Create a new mock message for the current action with sender as "ME - FILIP"
        const newMessage = {
          id: restaurantMessages.length + 1, // Ensure unique ID (based on existing messages)
          sender: "ME - FILIP", // Set sender to "ME - FILIP"
          content: "OFFER CANCELLED",
          time: formattedTime, // Includes AM/PM
          date: formattedDate,
          type: "info", // You can customize the type (info, update, etc.)
        };

        // Add the new message to the restaurant's messages
        mockMessages[restaurant.id] = [...restaurantMessages, newMessage];

        // Save the updated mockMessages to localStorage
        localStorage.setItem("mockMessages", JSON.stringify(mockMessages));
      }
    }

    // Redirect to /messages page
    router.push(`/messages/${restaurant.id}`);
  };

  const toggleEditable = () => {
    if (restaurant.status === "Confirmed") {
      toast.warning("The order is already confirmed and cannot be modified.", {
        className: "custom-toast",
      });
    } else if (restaurant.status === "Cancelled") {
      toast.warning("The order is already Cancelled and cannot be modified.", {
        className: "custom-toast",
      });
    } else {
      handleToggleEditing();
    }
  };

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      const currentDate = new Date();
      const formattedDate = `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
      const formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensures AM/PM format
      });

      const storedOrders = localStorage.getItem("orders");

      if (storedOrders) {
        // Parse the stored orders
        const orders = JSON.parse(storedOrders);

        // Find the restaurant to update
        const updatedOrders = orders.map((order) =>
          order.id === restaurant.id
            ? {
                ...order,
                status: "Confirmed", // Update status to Confirmed
                note: "The offer has been accepted by the restaurant.", // Add or update note
                time: formattedTime, // Update time
                date: formattedDate, // Update date
              }
            : order
        );

        // Update the orders in localStorage with the modified order
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        // Optionally, update the state as well if needed
        setRestaurant(updatedOrders);
      }

      const storedMessages = localStorage.getItem("mockMessages");

      if (storedMessages) {
        const mockMessages = JSON.parse(storedMessages);
        const restaurantMessages = mockMessages[restaurant.id] || [];

        // Create a new mock message for the current action with sender as "ME - FILIP"
        const newMessage = {
          id: restaurantMessages.length + 1, // Ensure unique ID (based on existing messages)
          sender: "ME - FILIP", // Set sender to "ME - FILIP"
          content: "OFFER APPROVED",
          time: formattedTime, // Includes AM/PM
          date: formattedDate,
          type: "info", // You can customize the type (info, update, etc.)
        };

        // Add the new message to the restaurant's messages
        mockMessages[restaurant.id] = [...restaurantMessages, newMessage];

        // Save the updated mockMessages to localStorage
        localStorage.setItem("mockMessages", JSON.stringify(mockMessages));
      }
    }

    // Redirect to /messages page
    router.push(`/messages/${restaurant.id}`);
  };

  return (
    <Box sx={{ marginTop: "24px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: "25px",
          borderTop: "1px solid #CCCCCC",
          borderBottom: "1px solid #CCCCCC",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#000000",
            letterSpacing: "-0.02em",
            lineHeight: "24px",
          }}
        >
          Subtotal
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#000000CC",
              lineHeight: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            {totalGuests} Guests
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              textAlign: "right",
              color: "#000000",
              fontSize: "22px",
              lineHeight: "26px",
              letterSpacing: "-0.02em",
              fontFamily: "'Urbanist', sans-serif !important",
            }}
          >
            CHF {totalAmount}
          </Typography>
        </Box>
      </Box>

      {/* Remarks Field */}
      <Box
        sx={{ position: "relative", marginTop: "24px", marginBottom: "24px" }}
      >
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "-10px",
            left: "8px",
            backgroundColor: "white",
            paddingX: "4px",
            fontSize: "12px",
            color: "#000000B2",
            letterSpacing: "0.15px",
            fontWeight: "400",
            zIndex: "10",
            fontFamily: "'Roboto', sans-serif !important",
          }}
        >
          Remarks
        </Typography>
        <TextField
          multiline
          rows={1}
          fullWidth
          value={remarks}
          onChange={onRemarksChange}
          variant="outlined"
          disabled={!editable}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000040",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000040",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00000040",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Notice Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image src="/help.svg" alt="" width={18} height={18} />
          <Typography
            variant="body2"
            sx={{
              maxWidth: "771px",
              width: "100%",
              color: "rgba(0, 0, 0, 0.7)",
              fontSize: "16px",
              letterSpacing: "-0.02em",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            Food allergies, specific food instructions or questions about the
            origin of meat? Please contact the restaurant directly at{" "}
            <a
              href="tel:+41585620030"
              style={{
                color: "rgba(29, 155, 240, 0.7)",
                textDecoration: "underline",
              }}
            >
              +41585620030
            </a>{" "}
            or add your questions to the remark section.
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "16px",
          }}
        >
          {!editable && (
            <Button
              variant="contained"
              startIcon={
                <Image
                  src="/download-pdf.svg"
                  alt="download-pdf"
                  width={18}
                  height={22}
                  className="-mt-0.5"
                />
              }
              sx={{
                backgroundColor: "#82110126",
                width: "196px",
                height: "50px",
                fontSize: "15px",
                pt: "10px",
                fontFamily: "'Satoshi', sans-serif !important",
                fontWeight: "500",
                letterSpacing: "0.46px",
                color: "#821101",
                "&:hover": { backgroundColor: "#82110126" },
              }}
            >
              Download PDF
            </Button>
          )}

          {(restaurant.status === "Adjusted" ||
            restaurant.status === "Accepted") && (
            <Button
              variant="contained"
              onClick={handleAccept}
              sx={{
                backgroundColor: "#821101",
                height: "50px",
                width: "103px",
                color: "#FFFFFF",
                fontSize: "15px",
                fontFamily: "'Satoshi', sans-serif !important",
                fontWeight: "500",
                letterSpacing: "0.46px",
              }}
            >
              Accept
            </Button>
          )}

          <Button
            variant="contained"
            onClick={toggleEditable}
            sx={{
              backgroundColor: "#821101",
              height: "50px",
              width: "103px",
              color: "#FFFFFF",
              fontSize: "15px",
              fontFamily: "'Satoshi', sans-serif !important",
              fontWeight: "500",
              letterSpacing: "0.46px",
            }}
          >
            {editable ? "Cancel" : "Adjust"}
          </Button>

          {editable ? (
            <Button
              variant="contained"
              onClick={handleRequestClick}
              sx={{
                backgroundColor: "#821101",
                height: "50px",
                width: "106px",
                color: "#FFFFFF",
                fontSize: "15px",
                fontFamily: "'Satoshi', sans-serif !important",
                fontWeight: "500",
                letterSpacing: "0.46px",
              }}
            >
              Request
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={toggleCancelModal}
              sx={{
                backgroundColor:
                  restaurant.status === "Adjusted" ||
                  restaurant.status === "Accepted"
                    ? "#82110126"
                    : "#821101",
                height: "50px",
                width: "106px",
                color:
                  restaurant.status === "Adjusted" ||
                  restaurant.status === "Accepted"
                    ? "#821101"
                    : "#FFFFFF",
                fontSize: "15px",
                fontFamily: "'Satoshi', sans-serif !important",
                fontWeight: "500",
                letterSpacing: "0.46px",
              }}
            >
              Cancle
            </Button>
          )}
        </Box>
      </Box>

      <CancelModal
        open={isCancelModalOpen}
        onClose={toggleCancelModal}
        onConfirm={handleConfirmCancel}
      />
    </Box>
  );
}
