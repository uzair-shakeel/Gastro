"use client";
import { Box, Typography, Button, Modal } from "@mui/material";

export default function CancelPopup({ handleClosePopup, confirmCancel }) {
  return (
    <Modal open={true} onClose={handleClosePopup}>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          maxWidth: "350px",
          p: 4,
          borderRadius: "8px",
          boxShadow: 24,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontSize: "20px", fontWeight: "bold", mb: 1 }}
        >
          Cancel?
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "16px" }}>
          Are you sure you want to cancel this order?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            onClick={handleClosePopup}
            sx={{
              px: 3,
              py: 1,
              color: "black",
              textTransform: "uppercase",
              bgcolor: "#CCCCCC",
              borderRadius: "4px",
            }}
          >
            NO
          </Button>
          <Button
            onClick={confirmCancel}
            sx={{
              px: 3,
              py: 1,
              textTransform: "uppercase",
              bgcolor: "#D32F2F",
              color: "white",
              borderRadius: "4px",
            }}
          >
            YES
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
