"use client";

// @mui
import { Theme, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

// @project
import OverviewCard from "@/components/cards/OverviewCard";
import { getRadiusStyles } from "@/utils/getRadiusStyles";

// @assets
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

/***************************  CARDS - BORDER WITH RADIUS  ***************************/

export function applyBorderWithRadius(radius: number, theme: Theme) {
  return {
    overflow: "hidden",
    "--Grid-borderWidth": "1px",
    borderTop: "var(--Grid-borderWidth) solid",
    borderLeft: "var(--Grid-borderWidth) solid",
    borderColor: "divider",
    "& > div": {
      overflow: "hidden",
      borderRight: "var(--Grid-borderWidth) solid",
      borderBottom: "var(--Grid-borderWidth) solid",
      borderColor: "divider",
      [theme.breakpoints.down("md")]: {
        "&:nth-of-type(1)": getRadiusStyles(radius, "topLeft"),
        "&:nth-of-type(2)": getRadiusStyles(radius, "topRight"),
        "&:nth-of-type(3)": getRadiusStyles(radius, "bottomLeft"),
        "&:nth-of-type(4)": getRadiusStyles(radius, "bottomRight"),
      },
      [theme.breakpoints.up("md")]: {
        "&:first-of-type": getRadiusStyles(radius, "topLeft", "bottomLeft"),
        "&:last-of-type": getRadiusStyles(radius, "topRight", "bottomRight"),
      },
    },
  };
}

/***************************   OVERVIEW CARD -DATA  ***************************/

const overviewAnalytics = [
  {
    title: "Unique Visitors",
    value: "23,876",
    compare: "Compare to last week",
    chip: {
      label: "24.5%",
      avatar: <ArrowUpwardIcon />,
    },
  },
  {
    title: "Page View",
    value: "30,450",
    compare: "Compare to last week",
    chip: {
      label: "20.5%",
      avatar: <ArrowUpwardIcon />,
    },
  },
  {
    title: "Events",
    value: "34,789",
    compare: "Compare to last week",
    chip: {
      label: "20.5%",
      color: "error",
      avatar: <ArrowDownwardIcon />,
    },
  },
  {
    title: "Live Visitor",
    value: "45,687",
    compare: "Compare to last week",
    chip: {
      label: "24.5%",
      avatar: <ArrowUpwardIcon />,
    },
  },
];

/***************************   OVERVIEW - CARDS  ***************************/

export default function AnalyticsOverviewCard() {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        borderRadius: 4,
        /* boxShadow: theme.customShadows.section, */ ...applyBorderWithRadius(
          16,
          theme
        ),
      }}
    >
      {overviewAnalytics.map((item, index) => (
        <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
          <OverviewCard
            {...{
              ...item,
              cardProps: {
                sx: { border: "none", borderRadius: 0, boxShadow: "none" },
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
