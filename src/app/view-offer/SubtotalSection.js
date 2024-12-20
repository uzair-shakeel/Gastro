import { Box, Typography, TextField, Button } from "@mui/material";
import Image from "next/image";

export default function SubtotalSection({ totalGuests, totalAmount }) {
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
        <Typography variant="subtitle1" sx={{ fontWeight: "600", fontSize:"20px", color:"#000000", letterSpacing:"-0.02em", lineHeight:"24px" }}>
          Subtotal
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "500", fontSize:"20px", color:"#000000CC", lineHeight:"24px", letterSpacing:"-0.02em" }}>
            {totalGuests} Guests
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              textAlign: "right",
              color:"#000000",
              fontSize:"22px",
              lineHeight:"26px", 
              letterSpacing:"-0.02em",
              fontFamily: "'Urbanist', sans-serif !important"
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
            letterSpacing:"0.15px",
            fontWeight:"400",
            zIndex: "10",
            fontFamily: "'Roboto', sans-serif !important"
          }}
        >
          Remarks
        </Typography>
        <TextField
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00000040', 
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00000040',  
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00000040',  
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
          <Image src='/help.svg' alt="" width={18} height={18} />
          <Typography
            variant="body2"
            sx={{
              maxWidth: "771px",
              width: "100%",
              color: "rgba(0, 0, 0, 0.7)",
              fontSize: "16px",
              letterSpacing: "-0.02em",
              fontWeight: "500",
              lineHeight: "24px"
            }}
          >
            Food allergies, specific food instructions or questions about the
            origin of meat? Please contact the restaurant directly at   {" "}
            <a
              href="tel:+41585620030"
              style={{ color: "rgba(29, 155, 240, 0.7)", textDecoration: "underline" }}
            >
              +41585620030
            </a>  or add your questions to the remark section.
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
            startIcon={
              <Image src='/download-pdf.svg' alt="download-pdf" width={18} height={22} className="-mt-0.5" />
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

          <Button
            variant="contained"
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
            Adjust
          </Button>

          <Button
            variant="contained"
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
            Cancle
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
