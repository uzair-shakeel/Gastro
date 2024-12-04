import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import { Close, ContentCopy, Share } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "24px",
    maxWidth: "400px",
    width: "100%",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "24px",
  top: "24px",
}));

const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  marginTop: "24px",
}));

const ShareButton = styled(Button)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#FFF1F1",
  color: "#8B0000",
  "&:hover": {
    backgroundColor: "#FFE6E6",
  },
}));

const CopyButton = styled(Button)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#8B0000",
  color: "white",
  "&:hover": {
    backgroundColor: "#660000",
  },
}));

export function QRCodeModal({ open, onClose, url }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to check if it's the client-side

  useEffect(() => {
    // This will only run on the client side
    setIsClient(true);
  }, []);

  const handleShare = async () => {
    if (isClient && navigator.share) {
      try {
        await navigator.share({
          title: "Restaurant Details",
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const handleCopyLink = () => {
    if (isClient && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose} fullWidth>
        <Typography variant="h6">Scan or Share QR code</Typography>
        <CloseButton onClick={onClose} size="large">
          <Close />
        </CloseButton>

        <DialogContent>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              height: "216px",
              width: "216px",
              justifyContent: "center",
              marginBottom: "24px",
            }}
            className="mx-auto"
          >
            <img src="/qr-code.png" className="w-full h-full" />
          </div>

          <ButtonsContainer>
            <ShareButton
              variant="contained"
              startIcon={<Share />}
              onClick={handleShare}
              disabled={!isClient || !navigator.share}
            >
              SHARE
            </ShareButton>
            <CopyButton
              variant="contained"
              startIcon={<ContentCopy />}
              onClick={handleCopyLink}
            >
              COPY LINK
            </CopyButton>
          </ButtonsContainer>
        </DialogContent>
      </StyledDialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard"
      />
    </>
  );
}
