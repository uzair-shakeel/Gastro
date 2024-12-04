"use client";
import { Box, Typography, Button, Modal } from "@mui/material";

export default function DeletePopup({ handleClosePopup, confirmDelete }) {
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
          Delete?
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "16px" }}>
          Are you sure to delete the item? Make sure this action will not
          reversible.
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
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            sx={{
              px: 3,
              py: 1,
              textTransform: "uppercase",
              bgcolor: "#D32F2F",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
