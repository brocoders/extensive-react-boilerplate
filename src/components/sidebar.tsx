"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Link from "@/components/link";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ mobileOpen, onToggle }: SidebarProps) {
  const drawer = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <Box sx={{ px: 2, py: 2, fontWeight: 700, fontSize: 20 }}>ACFI Link</Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/admin-panel">
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/admin-panel/users">
            <ListItemIcon>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/admin-panel/companies">
            <ListItemIcon>
              <BusinessIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/admin-panel/opportunities">
            <ListItemIcon>
              <WorkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Opportunities" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/admin-panel/contacts">
            <ListItemIcon>
              <ContactMailIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
