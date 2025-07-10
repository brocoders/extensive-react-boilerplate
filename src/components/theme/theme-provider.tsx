"use client";

import { useMemo, PropsWithChildren } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

function ThemeProvider(props: PropsWithChildren<object>) {
  const memoTheme = useMemo(() => theme, []);
  return (
    <MuiThemeProvider theme={memoTheme}>{props.children}</MuiThemeProvider>
  );
}

export default ThemeProvider;
