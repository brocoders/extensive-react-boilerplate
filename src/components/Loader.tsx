"use client";

import { useEffect, useState } from "react";

// @mui
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

/***************************  LOADER  ***************************/

export default function Loader() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2001,
            width: "100%",
          }}
        >
          <LinearProgress variant="indeterminate" color="primary" />
        </Box>
      )}
    </>
  );
}
