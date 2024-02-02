"use client";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { useMemo, PropsWithChildren } from "react";

function ThemeProvider(props: PropsWithChildren<{}>) {
  const theme = useMemo(() => extendTheme(), []);

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      {props.children}
    </CssVarsProvider>
  );
}

export default ThemeProvider;
