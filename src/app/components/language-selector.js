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
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  marginTop: "8px",
  padding: "8px 0",
}));

// Use a forwardRef to ensure props are passed correctly
const StyledListItem = styled(
  ({ isActive, ...props }) => <ListItem {...props} />
)(({ isActive }) => ({
  padding: "12px 16px",
  cursor: "pointer",
  backgroundColor: isActive ? "rgba(130, 17, 1, 0.1)" : "transparent",
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
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen]);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
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
        <DropdownContainer 
          ref={dropdownRef} 
          sx={{minWidth:"220px"}}
          onClick={(e) => e.stopPropagation()}
        >
          <List sx={{ padding: 0 }}>
            {languages.map((language) => (
              <StyledListItem
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                isActive={selectedLanguage === language.code}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center">
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <Image
                      src={language.flag}
                      alt={language.name}
                      width={24}
                      height={24}
                      className="min-h-[24px] min-w-[24px]"
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
                        fontWeight: 500,
                        color: "#000000",
                        letterSpacing:"0.15px",
                        fontFamily: 'Roboto, sans-serif'
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

