// @mui
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

// @project
import { DRAWER_WIDTH } from "@/config";

/***************************  HEADER - APP BAR STYLED  ***************************/

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1, // Ensure AppBar appears above the Drawer
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH, // Shift AppBar to the right by the drawer width
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBarStyled;
