"use client";

// @mui
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// @third-party
import MainSimpleBar from "simplebar-react";
import { BrowserView, MobileView } from "react-device-detect";

// root style
const RootStyle = styled(BrowserView)({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
});

// scroll bar wrapper
const SimpleBarStyle = styled(MainSimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": { background: alpha(theme.palette.grey[500], 0.48) },
    "&.simplebar-visible:before": { opacity: 1 },
  },
  "& .simplebar-track.simplebar-vertical": { width: 10 },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": { height: 6 },
  "& .simplebar-mask": { zIndex: "inherit" },
}));

/***************************  SIMPLE SCROLL BAR   ***************************/

interface SimpleBarProps {
  children: React.ReactNode;
  sx?: object;
  [key: string]: any;
}

export default function SimpleBar({ children, sx, ...other }: SimpleBarProps) {
  return (
    <>
      <RootStyle>
        <SimpleBarStyle
          clickOnTrack={false}
          sx={sx}
          data-simplebar-direction="ltr"
          {...other}
        >
          {children}
        </SimpleBarStyle>
      </RootStyle>
      <MobileView>
        <Box sx={{ overflowX: "auto", ...sx }} {...other}>
          {children}
        </Box>
      </MobileView>
    </>
  );
}
