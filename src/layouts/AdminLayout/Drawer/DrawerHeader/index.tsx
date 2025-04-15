// @mui
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// @project
import { handlerDrawerOpen, useGetMenuMaster } from "@/states/menu";
import Logo from "@/components/logo";

// @mui/icons-material
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/***************************  DRAWER HEADER  ***************************/

export default function DrawerHeader({ open }: { open: boolean }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;

  return (
    <Box sx={{ width: 1, px: 2, py: { xs: 2, md: 2.5 } }}>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          height: 36,
        }}
      >
        {open && <Logo />}
        <IconButton
          aria-label="open drawer"
          onClick={() => handlerDrawerOpen(!drawerOpen)}
          size="small"
          color="secondary"
        >
          {!drawerOpen ? (
            <ChevronRightIcon fontSize="small" />
          ) : (
            <ChevronLeftIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
