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
import Image from "next/image";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "4px",
    padding: "16px",
    maxWidth: "434px",
    width: "100%",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "10px",
  top: "8px",
}));

const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: '48px',
  gap: "12px",
}));
 

export function QRCodeModal({ open, onClose, url }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
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
        <Typography style={{ fontSize: '20px', lineHeight: '26px', letterSpacing: '-2%', fontWeight: '600' }}>Scan or Share QR code</Typography>
        <CloseButton onClick={onClose} size="large">
          <Close />
        </CloseButton>

        <div className="pt-12">
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              height: "216px",
              width: "216px",
              justifyContent: "center",
            }}
            className="mx-auto"
          >
            <img src="/qr-code.png" className="w-full h-full" />
          </div>

          <ButtonsContainer>
            <button
              className="w-full h-[42px] bg-[#82110126] text-[#821101] rounded flex items-center justify-center gap-2 text-[15px] font-medium font-satoshi tracking-[0.46px] leading-[26px]"
              variant="contained"
              starticon={<Share />}
              onClick={handleShare}
              disabled={!isClient || !navigator.share}
            >
              SHARE
              <Image src='/share.svg' alt="share" width={24} height={24} />
            </button>
            <button
              className="w-full h-[42px] bg-[#821101] text-[#F9F9F9] rounded flex items-center justify-center gap-2 text-[15px] font-medium font-satoshi tracking-[0.46px] leading-[26px]"
              variant="contained"
              starticon={<ContentCopy />}
              onClick={handleCopyLink}
            >
              <Image src='/copy-link.svg' alt="copy-link" width={24} height={24} />
              COPY LINK
            </button>
          </ButtonsContainer>
        </div>
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
