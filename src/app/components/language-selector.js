import { useState, useRef, useEffect } from "react";
import {
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";

const DropdownContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  right: 0,
  width: "240px",
  backgroundColor: "#FDF7F7",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  marginTop: "8px",
  padding: "8px 0",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "12px 16px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(130, 17, 1, 0.04)",
  },
}));

const languages = [
  { code: "en-US", name: "English (US)", flag: "/flags/us.png" },
  { code: "en-UK", name: "English (UK)", flag: "/flags/uk.png" },
  { code: "fr", name: "French", flag: "/flags/fr.png" },
  { code: "zh", name: "Chinese", flag: "/flags/cn.png" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          minWidth: "24px",
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Image
          src="/public.svg"
          alt="language selector"
          width={24}
          height={24}
          className="min-w-[24px]"
        />
      </Button>

      {isOpen && (
        <DropdownContainer ref={dropdownRef}>
          <List sx={{ padding: 0 }}>
            {languages.map((language) => (
              <StyledListItem
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center">
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Image
                      src={language.flag}
                      alt={language.name}
                      width={36}
                      height={36}
                      className="min-h-[36px] min-w-[36px]"
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={language.name}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#000000DE",
                      },
                    }}
                  />
                </div>
                {selectedLanguage === language.code && (
                  <CheckIcon sx={{ color: "#821101" }} />
                )}
              </StyledListItem>
            ))}
          </List>
        </DropdownContainer>
      )}
    </div>
  );
}
