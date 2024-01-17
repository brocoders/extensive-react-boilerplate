"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useMemo, PropsWithChildren, useContext, useState } from "react";
import React from "react";

interface ThemeProviderProps {}

interface ThemeContextProps {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ mode, toggleColorMode }}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
