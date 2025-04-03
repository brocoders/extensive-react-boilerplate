"use client";

// @mui
import { useTheme } from "@mui/material/styles";

// @types

/***************************  ICON - CIRCLE  ***************************/

export default function Circle({
  size = 24,
  color,
}: {
  size: number;
  color: any;
}) {
  const theme = useTheme();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 792 566"
      opacity="0.25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.3"
        cx="396"
        cy="236.626"
        r="395"
        stroke="url(#paint0_linear_1276_81353)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1276_81353"
          x1="396"
          y1="-211.607"
          x2="396"
          y2="662.785"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.45" stopColor={color || theme.palette.primary.main} />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}
