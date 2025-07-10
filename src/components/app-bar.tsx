"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import ThemeSwitchButton from "@/components/switch-theme-button";
import Button from "@mui/material/Button";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

interface AppBarProps {
  onMenuClick: () => void;
}

export default function ResponsiveAppBar({ onMenuClick }: AppBarProps) {
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            {t("common:app-name")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThemeSwitchButton />
            {!isLoaded ? (
              <CircularProgress color="inherit" size={24} />
            ) : user ? (
              <>
                <Tooltip title="Profile menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.firstName + " " + user.lastName}
                      src={user.photo?.path}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: 5.5 }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link}
                    href="/profile"
                  >
                    {t("common:navigation.profile")}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logOut();
                      handleCloseUserMenu();
                    }}
                  >
                    {t("common:navigation.logout")}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                <Button color="inherit" component={Link} href="/sign-in">
                  {t("common:navigation.signIn")}
                </Button>
                {IS_SIGN_UP_ENABLED && (
                  <Button color="inherit" component={Link} href="/sign-up">
                    {t("common:navigation.signUp")}
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
