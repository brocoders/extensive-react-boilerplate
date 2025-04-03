"use client";

// @next

// @mui
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

// @project
import { generateFocusVisibleStyles } from "@/utils/CommonFocusStyle";
import LogoMain from "./LogoMain";
import LogoIcon from "./LogoIcon";
import Link from "next/link";

/***************************  MAIN - LOGO  ***************************/

interface LogoSectionProps {
  isIcon?: boolean;
  sx?: any;
  to?: string;
}

export default function LogoSection({ isIcon, sx, to }: LogoSectionProps) {
  const theme = useTheme();
  return (
    <Link
      href={!to ? process.env.NEXT_PUBLIC_BASE_NAME || "/" : to}
      passHref
      legacyBehavior
    >
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
    </Link>
  );
}
