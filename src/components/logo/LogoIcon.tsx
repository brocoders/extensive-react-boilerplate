"use client";

// @mui
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

// @project
import branding from "@/branding.json";

/***************************  LOGO - ICON  ***************************/

export default function LogoIcon() {
  const theme = useTheme();
  const logoIconPath = branding.logo.logoIcon;

  return (
    <Box
      className="icon-logo"
      sx={{
        width: { xs: 19.5, sm: 22, md: 24 },
        height: 1,
        position: "relative",
        cursor: "pointer",
        display: "block",
        WebkitTapHighlightColor: "transparent",
        "& svg": {
          display: "block",
        },
      }}
    >
      {logoIconPath ? (
        <CardMedia
          src={logoIconPath}
          component="img"
          alt="logo"
          sx={{ height: 1 }}
          loading="lazy"
        />
      ) : (
        <svg viewBox="0 0 37 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.0507 0.657088C32.9601 -1.47888 37.5881 1.90736 36.7407 6.28379L31.081 35.5123C31.0417 35.7758 30.9823 36.0375 30.9023 36.2952C30.7256 36.8969 30.4697 37.3981 30.1515 37.802L30.1236 37.8405C28.4079 40.1894 25.1144 40.7015 22.7675 38.9843C21.6036 38.1327 20.8911 36.8926 20.6777 35.5724L20.6789 35.5732C20.0277 33.124 20.9582 26.5495 25.8412 16.0258L27.7227 18.1367L30.214 7.96335C30.3258 7.50659 29.8291 7.14315 29.4282 7.3884L20.4986 12.8509L23.1853 14.0825C18.1195 19.426 11.0662 24.4251 6.06551 24.9519C4.81627 25.0835 3.32109 24.7555 2.15767 23.9042C-0.18924 22.187 -0.700904 18.8907 1.01484 16.5418L1.02814 16.5237L1.0433 16.5032C1.33101 16.0776 1.73015 15.6819 2.24875 15.3311C2.4702 15.1762 2.70184 15.0398 2.9413 14.9222L29.0507 0.657088ZM9.83615 35.6327C11.3428 36.7129 13.4456 36.3571 14.5329 34.8379C15.2554 33.8285 15.7862 30.5405 16.0612 28.4476C16.1668 27.6438 15.3569 27.0632 14.6305 27.4219C12.739 28.3558 9.79931 29.9167 9.07685 30.9261C7.98955 32.4453 8.3295 34.5525 9.83615 35.6327Z"
            fill={theme.palette.primary.main}
          />
        </svg>
      )}
    </Box>
  );
}
