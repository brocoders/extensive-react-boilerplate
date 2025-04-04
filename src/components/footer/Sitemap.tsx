"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// @mui
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// @project
import branding from "@/branding.json";
import { generateFocusVisibleStyles } from "@/utils/CommonFocusStyle";
import Link from "../link";

/***************************  SITEMAP - DATA  ***************************/

const linkProps = { target: "_blank", rel: "noopener noreferrer" };
const menuItems = [
  {
    id: "use-case",
    grid: { size: { xs: 12, sm: "auto" } },
    title: "Use Case",
    menu: [
      {
        label: "Business Analytics",
        link: { href: "#" },
      },
      {
        label: "Marketing Automation",
        link: { href: "#" },
      },
      {
        label: "Collaboration Suites",
        link: { href: "#" },
      },
      {
        label: "Project Management",
        link: { href: "#" },
      },
    ],
  },
  {
    id: "support",
    grid: { size: { xs: 6, sm: "auto" } },
    title: "Support",
    menu: [
      {
        label: "Pricing",
        link: { href: "/", ...linkProps },
      },
      {
        label: "FAQ",
        link: { href: "/", ...linkProps },
      },
      {
        label: "Support",
        link: { href: branding.company.socialLink.support, ...linkProps },
      },
      {
        label: "License Terms",
        link: { href: "", ...linkProps },
      },
    ],
  },
  {
    id: "company",
    grid: { size: { xs: 6, sm: "auto" } },
    title: "Company",
    menu: [
      {
        label: "Why SakaTaka?",
        link: {
          href: "",
          ...linkProps,
        },
      },
      {
        label: "About",
        link: { href: "/", ...linkProps },
      },
      {
        label: "Contact Us",
        link: { href: "/", ...linkProps },
      },
    ],
  },
];

/***************************  FOOTER - SITEMAP  ***************************/

interface SitemapProps {
  list?: {
    id: string;
    grid: { size: { xs: number | string; sm: number | string } };
    title: string;
    menu: { label: string; link: { href: string; [key: string]: any } }[];
  }[];
  isMenuDesign?: boolean;
}

export default function Sitemap({ list, isMenuDesign }: SitemapProps) {
  const theme = useTheme();

  const menuItemStyle = {
    color: "text.secondary",
    justifyContent: "flex-start",
    px: 0,
    minHeight: { xs: 36, sm: 40 },
    "&:hover": { color: "primary.main", bgcolor: "transparent" },
    "&.Mui-focusVisible": {
      bgcolor: "transparent",
      ...generateFocusVisibleStyles(theme.palette.primary.main),
    },
  };

  return (
    <Grid
      container
      spacing={{ xs: 2.5, md: 4 }}
      sx={{ justifyContent: "space-between" }}
    >
      {(list || menuItems).map((item, index) => (
        <Grid
          key={index}
          sx={{ gridColumn: { xs: item.grid.size.xs, sm: item.grid.size.sm } }}
        >
          <Stack sx={{ alignItems: "flex-start", gap: { md: 3 } }}>
            <Typography variant="h4">{item.title}</Typography>
            <MenuList>
              {item?.menu &&
                item?.menu.map((menu, i) => (
                  <MenuItem
                    key={i}
                    disableRipple
                    sx={{
                      ...menuItemStyle,
                      ...(isMenuDesign && {
                        ...theme.typography.caption,
                        fontWeight: 400,
                        my: 0.25,
                      }),
                    }}
                    {...(menu.link && { component: Link, ...menu.link })}
                    tabIndex={0}
                    aria-label={menu.label}
                  >
                    {menu.label}
                  </MenuItem>
                ))}
            </MenuList>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
