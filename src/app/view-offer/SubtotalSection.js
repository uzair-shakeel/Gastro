import { Box, Typography, TextField, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InfoIcon from "@mui/icons-material/Info";

export default function SubtotalSection({ totalGuests, totalAmount }) {
  return (
    <Box sx={{ marginTop: "24px" }}>
      {/* Subtotal Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: "16px",
          borderTop: "1px solid rgb(229, 231, 235)",
          borderBottom: "1px solid rgb(229, 231, 235)",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "400" }}>
          Subtotal
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "400" }}>
            {totalGuests} Guests
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "400",
              minWidth: "100px",
              textAlign: "right",
            }}
          >
            CHF {totalAmount}
          </Typography>
        </Box>
      </Box>

      {/* Remarks Field */}
      <Box
        sx={{ position: "relative", marginTop: "24px", marginBottom: "32px" }}
      >
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "-10px",
            left: "8px",
            backgroundColor: "white",
            paddingX: "4px",
            fontSize: "0.75rem",
            color: "rgb(107, 114, 128)",
            zIndex: "10",
          }}
        >
          Remarks
        </Typography>
        <TextField
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          InputProps={{
            sx: {
              borderColor: "rgb(229, 231, 235)",
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
        <Box sx={{ display: "flex", alignItems: "start", gap: "8px" }}>
          <InfoIcon
            fontSize="small"
            sx={{
              color: "rgb(107, 114, 128)", // text-gray-500
              marginTop: "2px",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "rgb(107, 114, 128)", // text-gray-600
              fontSize: "0.875rem",
            }}
          >
            Food allergies, specific food instructions or questions about the
            origin of meat? Please contact the restaurant directly at{" "}
            <a
              href="tel:+41585620030"
              style={{ color: "rgb(37, 99, 235)", textDecoration: "underline" }}
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
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            sx={{
              backgroundColor: "rgb(254, 242, 242)", // bg-red-50
              color: "rgb(185, 28, 28)", // text-red-700
              "&:hover": { backgroundColor: "rgb(254, 226, 226)" }, // hover:bg-red-100
              textTransform: "none",
              width: "max-content",
            }}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(185, 28, 28)", // bg-red-700
              "&:hover": { backgroundColor: "rgb(153, 27, 27)" }, // hover:bg-red-800
              textTransform: "none",
            }}
          >
            Adjust
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(185, 28, 28)", // bg-red-700
              "&:hover": { backgroundColor: "rgb(153, 27, 27)" }, // hover:bg-red-800
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
