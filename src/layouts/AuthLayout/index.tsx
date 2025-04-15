"use client";

// @mui
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// @project
import LogoMain from "@/components/logo/LogoMain";
import GetImagePath from "@/utils/GetImagePath";

const dashBoardImage = {
  light: "/assets/images/graphics/hosting/dashboard-light.svg",
  dark: "/assets/images/graphics/hosting/dashboard-dark.svg",
};

/***************************  AUTH LAYOUT  ***************************/

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid size={{ xs: 12, md: 6, lg: 7 }} sx={{ p: { xs: 3, sm: 7 } }}>
        {children}
      </Grid>
      <Grid
        size={{ xs: 12, md: 6, lg: 5 }}
        sx={{
          bgcolor: "grey.100",
          pt: 7,
          display: { xs: "none", md: "block" },
        }}
      >
        <Stack sx={{ height: 1, justifyContent: "space-between" }}>
          <Stack sx={{ alignItems: "center", gap: 2 }}>
            <LogoMain />
            <Typography
              variant="body2"
              color="grey.700"
              align="center"
              sx={{ maxWidth: 400 }}
            >
              SaaS platform for seamless data management and user insights.
              Unlock growth with real-time analytics and flexible features.
            </Typography>
          </Stack>
          <Box sx={{ pt: 6, pl: 6, height: "calc(100% - 114px)" }}>
            <CardMedia
              image={GetImagePath(dashBoardImage.light)}
              sx={{
                height: 1,
                border: "4px solid",
                borderColor: "grey.300",
                borderBottom: "none",
                borderRight: "none",
                backgroundPositionX: "left",
                backgroundPositionY: "top",
                borderTopLeftRadius: 24,
              }}
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
