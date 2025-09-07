"use client";

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useMemo, PropsWithChildren } from "react";
import StyledJsxRegistry from "./registry";

function ThemeProvider(props: PropsWithChildren) {
  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: {
          colorSchemeSelector: "class",
        },
        colorSchemes: { light: true, dark: true },
      }),
    []
  );

  return (
    <StyledJsxRegistry>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </StyledJsxRegistry>
  );
}

export default ThemeProvider;
