"use client";

// @next

// @mui
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

// @project
import LogoMain from "./LogoMain";
import LogoIcon from "./LogoIcon";
import { generateFocusVisibleStyles } from "@/utils/CommonFocusStyle";
// import Link from "../link";
/***************************  MAIN - LOGO  ***************************/

interface LogoSectionProps {
  isIcon?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: any;
  /* to?: string; */
}

export default function LogoSection({ isIcon, sx }: LogoSectionProps) {
  const theme = useTheme();
  return (
    // <Link
    //   href={!to ? process.env.NEXT_PUBLIC_BASE_NAME || "/" : to}
    //   passHref
    // >
    <ButtonBase
      disableRipple
      sx={{
        ...sx,
        display: "block",
        "&:focus-visible": generateFocusVisibleStyles(
          theme.palette.primary.main
        ),
      }}
      aria-label="logo"
    >
      {isIcon ? <LogoIcon /> : <LogoMain />}
    </ButtonBase>
    // </Link>
  );
}
