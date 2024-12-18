import { Box, Typography, TextField, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InfoIcon from "@mui/icons-material/Info";

export default function SubtotalSection({ totalGuests, totalAmount }) {
  return (
    <Box className="mt-[24px]">
      {/* Subtotal Row */}
      <Box className="flex items-center justify-between py-4 border-t border-b border-gray-200">
        <Typography variant="subtitle1" className="font-normal">
          Subtotal
        </Typography>
        <Box className="flex items-center gap-8">
          <Typography variant="subtitle1" className="font-normal">
            {totalGuests} Guests
          </Typography>
          <Typography
            variant="subtitle1"
            className="font-normal min-w-[100px] text-right"
          >
            CHF {totalAmount}
          </Typography>
        </Box>
      </Box>

      {/* Remarks Field */}
      <Box className="relative mt-6 mb-8">
        <Typography
          variant="caption"
          className="absolute -top-2.5 left-2 bg-white px-1 text-xs text-gray-500 z-10"
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

      <Box className="flex gap-2 items-center justify-between">
        {/* Notice Section */}
        <Box className="flex items-start gap-2 text-sm">
          <InfoIcon className="text-gray-500 mt-0.5" fontSize="small" />
          <Typography variant="body2" className="text-gray-600">
            Food allergies, specific food instrctions or questions about the
            origion of meat? Please contact the restaurant directly at{" "}
            <a
              href="tel:+41585620030"
              className="text-blue-600 hover:underline"
            >
              +41585620030
            </a>{" "}
            or add your questions to the remark section.
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box className="flex items-center justify-end gap-4">
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            className="bg-red-50 text-red-700 hover:bg-red-100 normal-case w-max"
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            className="bg-red-700 hover:bg-red-800 normal-case"
          >
            Adjust
          </Button>
          <Button
            variant="contained"
            className="bg-red-700 hover:bg-red-800 normal-case"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
