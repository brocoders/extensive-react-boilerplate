"use client";

// @mui
import { useTheme } from "@mui/material/styles";

export default function Loader() {
  const theme = useTheme();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Linear Progress Loader</title>
    <style>
    body {
      margin: 0;
      }
      .progress-bar-container {
        width: 100%;
        background-color: ${theme.palette.primary.light}; /* This is the background for the progress bar */
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar {
        height: 4px; /* Thickness of the progress bar */
        width: 0; /* Set this to 0 initially */
        background-color: ${theme.palette.primary.main};
        animation: load 1.5s linear infinite;
      }

      @keyframes load {
        0% {
          width: 30%;
        }
        50% {
          margin-left: 40%;
          width: 50%;
        }
        100% {
          width: 30%;
          margin-left: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  </body>
</html>
`;
}
