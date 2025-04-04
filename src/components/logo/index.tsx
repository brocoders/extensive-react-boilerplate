"use client";

// @next

// @project
import Link from "../link";
// import Link from "../link";
/***************************  MAIN - LOGO  ***************************/

interface LogoSectionProps {
  isIcon?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: any;
  to?: string;
}

export default function LogoSection({} /* isIcon, sx, to  */ : LogoSectionProps) {
  // const theme = useTheme();
  return (
    <Link href={process.env.NEXT_PUBLIC_BASE_NAME || ""}>
      {/* //TODO */}
      {/* <ButtonBase
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
        </ButtonBase> */}
    </Link>
  );
}
