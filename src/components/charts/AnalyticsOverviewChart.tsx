"use client";
import { useState } from "react";

// @mui
import { useTheme } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

// @project
import MainCard from "@/components/cards/MainCard";
import Legend from "@/components/third-party/chart/Legend";
import { ViewMode } from "@/enum";

/***************************  CHART - DATA  ***************************/

const yearlyPoints = [
  new Date(2014, 0, 1),
  new Date(2014, 2, 1),
  new Date(2014, 5, 1),
  new Date(2014, 8, 1),
  new Date(2014, 11, 1),
  new Date(2015, 0, 1),
  new Date(2015, 2, 1),
  new Date(2015, 5, 1),
  new Date(2015, 8, 1),
  new Date(2015, 11, 1),
  new Date(2016, 0, 1),
  new Date(2016, 2, 1),
  new Date(2016, 5, 1),
  new Date(2016, 8, 1),
  new Date(2016, 11, 1),
  new Date(2017, 0, 1),
  new Date(2017, 2, 1),
  new Date(2017, 5, 1),
  new Date(2017, 8, 1),
  new Date(2017, 11, 1),
  new Date(2018, 0, 1),
  new Date(2018, 2, 1),
  new Date(2018, 5, 1),
  new Date(2018, 8, 1),
  new Date(2018, 11, 1),
  new Date(2019, 0, 1),
  new Date(2019, 2, 1),
  new Date(2019, 5, 1),
  new Date(2019, 8, 1),
  new Date(2019, 11, 1),
  new Date(2020, 0, 1),
  new Date(2020, 2, 1),
  new Date(2020, 5, 1),
  new Date(2020, 8, 1),
  new Date(2020, 11, 1),
  new Date(2021, 0, 1),
  new Date(2021, 2, 1),
  new Date(2021, 5, 1),
  new Date(2021, 8, 1),
  new Date(2021, 11, 1),
  new Date(2022, 0, 1),
  new Date(2022, 2, 1),
  new Date(2022, 5, 1),
  new Date(2022, 8, 1),
  new Date(2022, 11, 1),
  new Date(2023, 0, 1),
  new Date(2023, 2, 1),
  new Date(2023, 5, 1),
  new Date(2023, 8, 1),
  new Date(2023, 11, 1),
];

const yearlyData = {
  pageViewData: [
    190, 230, 240, 230, 240, 230, 250, 270, 300, 320, 340, 360, 400, 420, 450,
    470, 490, 500, 480, 450, 420, 380, 420, 380, 190, 230, 240, 230, 240, 230,
    250, 270, 300, 320, 400, 440, 480, 520, 540, 580, 620, 640, 680, 720, 650,
    680, 720, 840, 950, 800,
  ],
  uniqueVisitorData: [
    900, 920, 930, 860, 840, 820, 800, 840, 860, 840, 800, 780, 760, 790, 740,
    710, 670, 650, 690, 750, 780, 760, 730, 680, 650, 620, 500, 470, 430, 400,
    380, 360, 340, 320, 300, 280, 260, 240, 220, 260, 300, 340, 380, 420, 460,
    360, 450, 520, 450, 600,
  ],
};

const monthlyPoints = [
  new Date(2023, 0, 1),
  new Date(2023, 0, 15),
  new Date(2023, 0, 31),
  new Date(2023, 1, 1),
  new Date(2023, 1, 15),
  new Date(2023, 1, 28),
  new Date(2023, 2, 1),
  new Date(2023, 2, 15),
  new Date(2023, 2, 31),
  new Date(2023, 3, 1),
  new Date(2023, 3, 15),
  new Date(2023, 3, 30),
  new Date(2023, 4, 1),
  new Date(2023, 4, 15),
  new Date(2023, 4, 31),
  new Date(2023, 5, 1),
  new Date(2023, 5, 15),
  new Date(2023, 5, 30),
  new Date(2023, 6, 1),
  new Date(2023, 6, 15),
  new Date(2023, 6, 31),
  new Date(2023, 7, 1),
  new Date(2023, 7, 15),
  new Date(2023, 7, 31),
  new Date(2023, 8, 1),
  new Date(2023, 8, 15),
  new Date(2023, 8, 30),
  new Date(2023, 9, 1),
  new Date(2023, 9, 15),
  new Date(2023, 9, 31),
  new Date(2023, 10, 1),
  new Date(2023, 10, 15),
  new Date(2023, 10, 30),
  new Date(2023, 11, 1),
  new Date(2023, 11, 15),
  new Date(2023, 11, 31),
];

const monthlyData = {
  pageViewData: [
    190, 230, 240, 230, 300, 230, 250, 270, 230, 320, 340, 450, 400, 420, 485,
    470, 490, 500, 480, 450, 420, 380, 420, 380, 400, 600, 575, 540, 550, 520,
    580, 570, 600, 600, 720, 780,
  ],
  uniqueVisitorData: [
    900, 920, 930, 860, 840, 820, 800, 840, 860, 840, 800, 780, 760, 790, 740,
    710, 670, 650, 690, 750, 780, 760, 730, 680, 650, 680, 630, 510, 460, 460,
    405, 460, 415, 430, 410, 500,
  ],
};

const dailyPoints = [
  new Date(2024, 0, 1),
  new Date(2024, 0, 2),
  new Date(2024, 0, 3),
  new Date(2024, 0, 4),
  new Date(2024, 0, 5),
  new Date(2024, 0, 6),
  new Date(2024, 0, 7),
];

const dailyData = {
  pageViewData: [10, 5, 12, 8, 35, 14, 30],
  uniqueVisitorData: [15, 20, 22, 18, 21, 30, 38],
};

const timeFilter = ["Daily", "Monthly", "Yearly"];

const valueFormatter = (
  date: {
    toLocaleDateString: (
      arg0: string,
      arg1: { weekday?: string; month?: string }
    ) => any;
    getFullYear: () => {
      (): any;
      new (): any;
      toString: { (): any; new (): any };
    };
  },
  view: any
) => {
  switch (view) {
    case ViewMode.DAILY:
      return date.toLocaleDateString("en-us", { weekday: "short" });
    case ViewMode.MONTHLY:
      return date.toLocaleDateString("en-US", { month: "short" });
    case ViewMode.YEARLY:
    default:
      return date.getFullYear().toString();
  }
};

const tickInterval = (
  date: { getDate: () => number; getMonth: () => number },
  view: any
) => {
  switch (view) {
    case ViewMode.MONTHLY:
      return date.getDate() === 15;
    case ViewMode.YEARLY:
      return date.getMonth() === 5;
    case ViewMode.DAILY:
    default:
      return true;
  }
};

const dataMap = {
  [ViewMode.MONTHLY]: monthlyData,
  [ViewMode.DAILY]: dailyData,
  [ViewMode.YEARLY]: yearlyData,
};

/***************************  CHART - 1  ***************************/

export default function Chart1() {
  const theme = useTheme();

  const [view, setView] = useState(ViewMode.MONTHLY);
  const [visibilityOption, setVisibilityOption] = useState({
    page_views: true,
    unique_visitor: true,
  });

  const handleViewChange = (_event: any, newValue: any) => {
    setView(newValue);
  };

  const toggleVisibility = (id: string) => {
    setVisibilityOption((prev) => ({
      ...prev,
      [id as keyof typeof visibilityOption]:
        !prev[id as keyof typeof visibilityOption],
    }));
  };

  const seriesData = [
    {
      id: "page_views",
      data: dataMap[view].pageViewData,
      color: theme.palette.primary.light,
      visible: visibilityOption["page_views"],
      label: "Page View",
    },
    {
      id: "unique_visitor",
      data: dataMap[view].uniqueVisitorData,
      color: theme.palette.primary.main,
      visible: visibilityOption["unique_visitor"],
      label: "Unique Visitor",
    },
  ];

  const visibleSeries = seriesData.filter((s) => s.visible);
  const lagendItems = seriesData.map((series) => ({
    label: series.label,
    color: series.color,
    visible: series.visible,
    id: series.id,
  }));

  const xData =
    view === ViewMode.MONTHLY
      ? monthlyPoints
      : view === ViewMode.DAILY
        ? dailyPoints
        : yearlyPoints;

  // Dynamic styles for visible series
  const dynamicSeriesStyles = visibleSeries.reduce(
    (acc: Record<string, any>, series) => {
      acc[`& .MuiAreaElement-series-${series.id}`] = {
        fill: `url(#${series.id})`,
        opacity: series.id === "page_views" ? 0 : 0.15,
      };
      return acc;
    },
    {}
  );

  return (
    <MainCard>
      <Stack sx={{ gap: 3 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: "end",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Analysis
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.700" }}>
              Analyze user engagement and improve your product with real-time
              analytics.
            </Typography>
          </Stack>
          <Tabs
            value={view}
            onChange={handleViewChange}
            aria-label="filter tabs"
            sx={{ width: "fit-content" }}
          >
            {timeFilter.map((filter, index) => (
              <Tab label={filter} value={filter} key={index} />
            ))}
          </Tabs>
        </Stack>

        <Legend items={lagendItems} onToggle={toggleVisibility} />
      </Stack>

      <LineChart
        series={visibleSeries.map((series) => ({
          ...series,
          showMark: false,
          curve: "linear",
          area: true,
        }))}
        height={261}
        grid={{ horizontal: true }}
        margin={{ top: 25, right: 20, bottom: 20, left: 60 }}
        xAxis={[
          {
            data: xData,
            scaleType: "point",
            disableLine: true,
            disableTicks: true,
            valueFormatter: (value) => valueFormatter(value, view),
            tickInterval: (time) => tickInterval(time, view),
          },
        ]}
        yAxis={[
          {
            scaleType: "linear",
            disableLine: true,
            disableTicks: true,
            label: "Visits",
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        sx={{
          "& .MuiLineElement-root": { strokeDasharray: "0", strokeWidth: 2 },
          "& .MuiChartsAxis-left .MuiChartsAxis-label": {
            transform: "translate(-15px, 0)",
          },
          ...dynamicSeriesStyles,
        }}
      >
        <defs>
          {visibleSeries.map((series, index) => (
            <linearGradient
              id={series.id}
              key={index}
              gradientTransform="rotate(90)"
            >
              <stop offset="10%" stopColor={series.color} stopOpacity={1} />
              <stop offset="86%" stopColor={series.color} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
      </LineChart>
    </MainCard>
  );
}
