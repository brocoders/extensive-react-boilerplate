import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ThemeProvider, { useThemeContext } from "./theme-provider";

const ThemeModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <ThemeProvider>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton sx={{ mr: 1 }} onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? (
            <Brightness7Icon sx={{ width: 35, height: 35 }} />
          ) : (
            <Brightness4Icon sx={{ width: 35, height: 35 }} />
          )}
        </IconButton>
      </Box>
    </ThemeProvider>
  );
};

export default ThemeModeToggle;
