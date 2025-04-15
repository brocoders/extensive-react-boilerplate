"use client";

// @mui
import { alpha } from "@mui/material/styles";

/***************************  COMMON - FOCUS STYLE  ***************************/

export const generateFocusStyle = (color: string) => ({
  boxShadow: `0px 0px 0px 3px ${alpha(color, 0.2)}`,
});
