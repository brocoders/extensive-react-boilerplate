"use client";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import { RoleEnum } from "@/services/api/types/role";
import ThemeSwitchButton from "@/components/switch-theme-button";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./logo";

const StyledAppBar = styled(AppBar)((/* { theme } */) => ({
  background: "transparent",
  boxShadow: "none",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 56,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    minHeight: 48,
  },
}));

const ResponsiveAppBar = () => {
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorNav(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorUser(null);

  return (
    <Box sx={{ bgcolor: "grey.100" }}>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <StyledToolbar>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              {/* Logo */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Logo />
              </Box>

              {/* Mobile Menu Button */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorNav}
                  open={Boolean(anchorNav)}
                  onClose={handleCloseNavMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <MenuItem
                    component={Link}
                    href="/"
                    onClick={handleCloseNavMenu}
                  >
                    {t("common:navigation.home")}
                  </MenuItem>
                  {!!user?.role &&
                    [RoleEnum.ADMIN].includes(Number(user?.role?.id)) && (
                      <MenuItem
                        component={Link}
                        href="/admin-panel/users"
                        onClick={handleCloseNavMenu}
                      >
                        {t("common:navigation.users")}
                      </MenuItem>
                    )}
                  {isLoaded && !user && (
                    <>
                      <Divider />
                      <MenuItem
                        component={Link}
                        href="/sign-in"
                        onClick={handleCloseNavMenu}
                      >
                        {t("common:navigation.signIn")}
                      </MenuItem>
                      {IS_SIGN_UP_ENABLED && (
                        <MenuItem
                          component={Link}
                          href="/sign-up"
                          onClick={handleCloseNavMenu}
                        >
                          {t("common:navigation.signUp")}
                        </MenuItem>
                      )}
                    </>
                  )}
                </Menu>
              </Box>

              {/* Title for Mobile */}
              <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                {t("common:app-name")}
              </Typography>

              {/* Desktop Menu */}
              <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
                {!!user?.role &&
                  [RoleEnum.ADMIN].includes(Number(user?.role?.id)) && (
                    <Button
                      component={Link}
                      href="/admin-panel/users"
                      sx={{ mx: 1 }}
                    >
                      {t("common:navigation.users")}
                    </Button>
                  )}
              </Box>

              {/* Right-side Icons */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThemeSwitchButton />
                {!isLoaded ? (
                  <CircularProgress size={24} sx={{ ml: 2 }} />
                ) : user ? (
                  <>
                    <Tooltip title="Profile">
                      <IconButton onClick={handleOpenUserMenu} sx={{ ml: 1 }}>
                        <Avatar
                          alt={`${user?.firstName} ${user?.lastName}`}
                          src={user.photo?.path}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorUser}
                      open={Boolean(anchorUser)}
                      onClose={handleCloseUserMenu}
                      sx={{ mt: 5 }}
                    >
                      <MenuItem
                        component={Link}
                        href="/profile"
                        onClick={handleCloseUserMenu}
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
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Button component={Link} href="/sign-in">
                      {t("common:navigation.signIn")}
                    </Button>
                    {IS_SIGN_UP_ENABLED && (
                      <Button component={Link} href="/sign-up" sx={{ ml: 1 }}>
                        {t("common:navigation.signUp")}
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Stack>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </Box>
  );
};

export default ResponsiveAppBar;
