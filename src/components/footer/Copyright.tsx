"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// @next

import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//@project
import branding from "@/branding.json";
import { CopyrightType } from "@/enum";

/***************************  FOOTER - COPYRIGHT  ***************************/

export default function Copyright({
  type = CopyrightType.TYPE1,
  isDivider = true,
}) {
  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const dividerProps = {
    ...(!downSM && { orientation: "vertical" as const }),
    ...(downSM && { variant: "middle" as const }),
    flexItem: true,
  };

  const linkProps = {
    variant: "caption" as const,
    color: "text.secondary",
    target: "_blank",
    rel: "noopener noreferrer",
    underline: "hover" as const,
    "aria-label": "Opens in a new tab",
    sx: { "&:hover": { color: "primary.main" } },
  };

  return (
    <Stack
      direction={{ sm: "row" }}
      sx={{
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-end" },
        gap: { xs: 1.5, sm: isDivider ? 1.5 : 3 },
      }}
    >
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Copyright © {new Date().getFullYear()}
        <Link
          {...linkProps}
          href={branding.company.url}
          sx={{ ...linkProps.sx, ml: 0.5 }}
        >
          {branding.company.name}
        </Link>
      </Typography>
      {type !== CopyrightType.TYPE3 && (
        <>
          {isDivider && <Divider {...dividerProps} />}
          <Stack
            direction={
              downSM && type !== CopyrightType.TYPE2 ? "column" : "row"
            }
            sx={{
              gap: {
                xs: downSM && type === CopyrightType.TYPE2 ? 3 : 1.5,
                sm: isDivider ? 1.5 : 3,
              },
              alignItems: "center",
            }}
          >
            <Link {...linkProps} href="/privacy-policy">
              Privacy Policy
            </Link>
            {isDivider && (
              <Divider
                {...dividerProps}
                {...(downSM &&
                  type === CopyrightType.TYPE2 && {
                    orientation: "vertical",
                    sx: { my: 0 },
                  })}
              />
            )}
            <Link {...linkProps} href="/privacy-policy">
              Terms & Conditions
            </Link>
          </Stack>
        </>
      )}
    </Stack>
  );
}
