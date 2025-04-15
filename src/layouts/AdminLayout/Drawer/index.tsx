import { useMemo } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

// @project
import DrawerHeader from "./DrawerHeader";
import DrawerContent from "./DrawerContent";
import MiniDrawerStyled from "./MiniDrawerStyled";

import { handlerDrawerOpen, useGetMenuMaster } from "@/states/menu";
import { DRAWER_WIDTH } from "@/config";

/***************************  ADMIN LAYOUT - DRAWER  ***************************/

export default function MainDrawer({ window }: { window?: () => Window }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;
  const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  // Define container for drawer when window is specified
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Memoize drawer content and header to prevent unnecessary re-renders
  const drawerContent = useMemo(() => <DrawerContent />, []);
  const drawerHeader = useMemo(
    () => <DrawerHeader open={drawerOpen} />,
    [drawerOpen]
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1200 }}
      aria-label="mailbox folders"
    >
      {/* Temporary drawer for small media */}
      <Drawer
        container={container}
        variant="temporary"
        open={drawerOpen && downLG}
        onClose={() => handlerDrawerOpen(!drawerOpen)}
        slotProps={{
          paper: {
            sx: {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: "1px solid",
              borderRightColor: "divider",
              backgroundImage: "none",
              boxShadow: "inherit",
            },
          },
        }}
      >
        {drawerHeader}
        <Divider sx={{ mx: 2 }} />
        {drawerContent}
      </Drawer>

      {/* Permanent mini-drawer for large media */}
      {!downLG && (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          <Divider sx={{ mx: 2 }} />
          {drawerContent}
        </MiniDrawerStyled>
      )}
    </Box>
  );
}

MainDrawer.propTypes = { window: PropTypes.func };
