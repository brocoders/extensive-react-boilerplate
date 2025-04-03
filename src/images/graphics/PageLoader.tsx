"use client";

// @mui
import { keyframes } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

//@project
import LogoSection from "@/components/logo";

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(-360deg) }
`;

const dotAnimation = keyframes`
  0% { transform: rotate(-360deg) }
  100% { transform: rotate(0deg) }
`;

/***************************  PAGE LOADER  ***************************/

export default function PageLoader() {
  const commonProps = {
    disableShrink: true,
    size: 100,
    variant: "determinate" as const,
    thickness: 4,
    color: "primary" as const,
  };

  return (
    <Stack
      direction="row"
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          width: 65,
          height: 65,
          bgcolor: "primary.lighter",
          "& .MuiBox-root": { height: "fit-content", width: 28 },
        }}
      >
        <LogoSection isIcon sx={undefined} to={undefined} />
      </Avatar>
      <CircularProgress
        {...commonProps}
        value={100}
        sx={{
          position: "absolute",
          zIndex: 1,
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
            strokeDasharray: "6 9.5 !important",
          },
          animation: `${dotAnimation} 6s linear infinite`,
        }}
      />
      <CircularProgress
        {...commonProps}
        value={60}
        sx={{
          position: "absolute",
          zIndex: 1,
          "& .MuiCircularProgress-circle": { strokeLinecap: "round" },
          animation: `${rotateAnimation} 35s linear infinite`,
        }}
      />
    </Stack>
  );
}
