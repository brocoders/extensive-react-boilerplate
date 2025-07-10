"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "@/components/app-bar";
import Sidebar from "@/components/sidebar";

const drawerWidth = 240;

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleToggleSidebar = () => setMobileOpen((o) => !o);
  return (
    <Box sx={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <ResponsiveAppBar onMenuClick={handleToggleSidebar} />
      <Sidebar mobileOpen={mobileOpen} onToggle={handleToggleSidebar} />
      <Box
        component="main"
        /* shift content right when sidebar is visible on desktop and add top
           margin equal to app bar height */
        sx={{
          flexGrow: 1,
          // ml: { md: `${drawerWidth}px` },
          width: "100%",
          mt: 5,
          // p: { xs: 2, sm: 3, md: 2 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
