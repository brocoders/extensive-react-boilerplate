"use client";

// @mui
import Stack, { StackOwnProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// @assets
import DumpingDoodle from "@/images/illustration/DumpingDoodle";
import { CommonProps } from "@mui/material/OverridableComponent";
import { JSX, ElementType } from "react";

/***************************  HEADER - EMPTY SEARCH ***************************/

export default function EmptySearch(
  props: JSX.IntrinsicAttributes & {
    component: ElementType<any, keyof JSX.IntrinsicElements>;
  } & StackOwnProps &
    CommonProps &
    Omit<any, keyof CommonProps | keyof StackOwnProps>,
  ref: unknown
) {
  return (
    <Stack
      ref={ref}
      {...props}
      sx={{
        width: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 1.5,
        p: 1.5,
      }}
    >
      <Box sx={{ width: 230, height: 170 }}>
        <DumpingDoodle />
      </Box>
      <Stack sx={{ gap: 0.5, width: 220 }}>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          No search Result
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          We have searched more than 120 result but didn’t found anything
        </Typography>
      </Stack>
    </Stack>
  );
}
