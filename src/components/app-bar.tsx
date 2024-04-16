"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import { RoleEnum } from "@/services/api/types/role";
import Divider from "@mui/material/Divider";
import ThemeSwitchButton from "@/components/switch-theme-button";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

function ResponsiveAppBar() {
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();
  const [anchorElementNav, setAnchorElementNav] = useState<null | HTMLElement>(
    null
  );
  const [anchorElementUser, setAnchorElementUser] =
    useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElementNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElementUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElementNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElementUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("common:app-name")}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElementNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElementNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} href="/">
                <Typography textAlign="center">
                  {t("common:navigation.home")}
                </Typography>
              </MenuItem>

              {!!user?.role &&
                [RoleEnum.ADMIN].includes(Number(user?.role?.id)) && [
                  <MenuItem
                    key="users"
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href="/admin-panel/users"
                  >
                    <Typography textAlign="center">
                      {t("common:navigation.users")}
                    </Typography>
                  </MenuItem>,
                ]}
              {isLoaded &&
                !user && [
                  <Divider key="divider" />,
                  <MenuItem
                    key="sign-in"
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href="/sign-in"
                  >
                    <Typography textAlign="center">
                      {t("common:navigation.signIn")}
                    </Typography>
                  </MenuItem>,
                  IS_SIGN_UP_ENABLED ? (
                    <MenuItem
                      key="sign-up"
                      onClick={handleCloseNavMenu}
                      component={Link}
                      href="/sign-up"
                    >
                      <Typography textAlign="center">
                        {t("common:navigation.signUp")}
                      </Typography>
                    </MenuItem>
                  ) : null,
                ]}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("common:app-name")}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              href="/"
            >
              {t("common:navigation.home")}
            </Button>

            {!!user?.role &&
              [RoleEnum.ADMIN].includes(Number(user?.role?.id)) && (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  href="/admin-panel/users"
                >
                  {t("common:navigation.users")}
                </Button>
              )}
          </Box>

          {!isLoaded ? (
            <CircularProgress color="inherit" />
          ) : user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile menu">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  data-testid="profile-menu-item"
                >
                  <Avatar
                    alt={user?.firstName + " " + user?.lastName}
                    src={user.photo?.path}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: 5.5 }}
                id="menu-appbar"
                anchorEl={anchorElementUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElementUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  component={Link}
                  href="/profile"
                  data-testid="user-profile"
                >
                  <Typography textAlign="center">
                    {t("common:navigation.profile")}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logOut();
                    handleCloseUserMenu();
                  }}
                  data-testid="logout-menu-item"
                >
                  <Typography textAlign="center">
                    {t("common:navigation.logout")}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <ThemeSwitchButton />
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                href="/sign-in"
              >
                {t("common:navigation.signIn")}
              </Button>
              {IS_SIGN_UP_ENABLED && (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  href="/sign-up"
                >
                  {t("common:navigation.signUp")}
                </Button>
              )}
            </Box>
          )}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <ThemeSwitchButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
