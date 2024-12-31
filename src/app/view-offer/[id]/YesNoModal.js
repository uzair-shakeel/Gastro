import { Box, Modal, Button, Typography } from "@mui/material";

export default function YesNoModal({
  title,
  message,
  open,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="cancel-modal-title"
      aria-describedby="cancel-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 282,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
          p: "16px",
        }}
      >
        <Typography
          id="cancel-modal-title"
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            mb: "16px",
          }}
        >
          {title}
        </Typography>
        <Typography
          id="cancel-modal-description"
          sx={{
            mb: "16px",
            color: "#000000B2",
            fontSize: "16px",
          }}
        >
          {message}
        </Typography>
        <Box sx={{ display: "flex", gap: "12px", justifyContent: "end" }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              bgcolor: "#CCCCCC",
              color: "#000000B2",
              padding: "8px 22px",
              fontWeight: "500",
              fontSize: "16px",
              borderRadius: "4px",
              "&:hover": {
                bgcolor: "#D1D5DB",
              },
            }}
          >
            NO
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{
              bgcolor: "#D32F2F",
              color: "#F9F9F9",
              padding: "8px 22px",
              fontWeight: "500",
              fontSize: "16px",
              borderRadius: "4px",
              "&:hover": {
                bgcolor: "#B91C1C",
              },
            }}
          >
            YES
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
