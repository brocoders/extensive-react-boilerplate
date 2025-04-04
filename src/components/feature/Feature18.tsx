"use client";

import { SetStateAction, useState } from "react";

// @mui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// @project
import ContainerWrapper from "@/components/ContainerWrapper";
import GraphicsCard from "@/components/cards/GraphicsCard";
import SvgIcon from "@/components/SvgIcon";
import Typeset from "@/components/Typeset";
import { SECTION_COMMON_PY } from "@/utils/constant";

// @assets
import GraphicsImage from "@/components/GraphicsImage";

/***************************  FEATURE - 18  ***************************/

interface Feature18Props {
  heading: string;
  caption: string;
  topics: Array<{
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: string | { name: string; [key: string]: any };
    image: string;
    title2?: string;
    description?: string;
    list?: Array<{ primary: string }>;
    actionBtn?: object;
    actionBtn2?: object;
  }>;
}

export default function Feature18({
  heading,
  caption,
  topics,
}: Feature18Props) {
  const boxPadding = { xs: 3, md: 5 };
  const imagePadding = { xs: 3, sm: 4, md: 5 };

  const [value, setValue] = useState("1");

  // Handle tab change
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any, newValue: SetStateAction<string>) => {
    setValue(newValue);
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset
          {...{
            heading,
            caption,
            stackProps: {
              sx: {
                alignItems: "center",
                textAlign: "center",
                maxWidth: { sm: 470, md: 800 },
                mx: "auto",
              },
            },
          }}
        />
        <Stack sx={{ gap: 1.5, alignItems: "center" }}>
          <TabContext value={value}>
            <GraphicsCard sx={{ width: { xs: 1, sm: "unset" } }}>
              <Box sx={{ p: 0.25 }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    "& .MuiTabs-indicator": { display: "none" },
                    minHeight: "unset",
                    p: 0.25,
                  }}
                  variant="scrollable"
                >
                  {topics.map((item, index) => (
                    <Tab
                      label={item.title}
                      disableFocusRipple
                      icon={
                        <SvgIcon
                          {...(typeof item.icon === "string"
                            ? { name: item.icon }
                            : { ...item.icon })}
                          size={16}
                          stroke={2}
                          color="text.secondary"
                        />
                      }
                      value={String(index + 1)}
                      key={index}
                      iconPosition="start"
                      tabIndex={0}
                      sx={{
                        minHeight: 44,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "transparent",
                        "& svg ": { mr: 1 },
                        "&.Mui-selected": {
                          bgcolor: "grey.200",
                          borderColor: "grey.400",
                          color: "text.primary",
                          "& svg": { stroke: "text.primary" },
                        },
                        "&.Mui-focusVisible": { bgcolor: "grey.300" },
                        "&:hover": { bgcolor: "grey.200" },
                      }}
                    />
                  ))}
                </TabList>
              </Box>
            </GraphicsCard>
            {topics.map((item, index) => (
              <TabPanel
                value={String(index + 1)}
                key={index}
                sx={{ p: 0, width: 1 }}
              >
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <GraphicsCard>
                      <Box
                        sx={{
                          pl: imagePadding,
                          pt: imagePadding,
                          height: { xs: 260, sm: 396, md: 434 },
                        }}
                      >
                        <GraphicsImage
                          nestedChildren={null}
                          cardMediaProps={{}}
                          sx={{
                            height: 1,
                            backgroundPositionX: "left",
                            backgroundPositionY: "top",
                            border: "5px solid",
                            borderColor: "grey.200",
                            borderBottom: "none",
                            borderRight: "none",
                            borderTopLeftRadius: { xs: 12 },
                            borderBottomRightRadius: { xs: 20, sm: 32, md: 40 },
                          }}
                          image={item.image}
                        />
                      </Box>
                    </GraphicsCard>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 7 }}>
                    <GraphicsCard sx={{ height: 1 }}>
                      <Stack
                        sx={{
                          justifyContent: "space-between",
                          gap: 5,
                          height:
                            item.actionBtn || item.actionBtn2
                              ? {
                                  sm: "calc(100% - 98px)",
                                  md: "calc(100%  - 114px)",
                                }
                              : 1,
                          pt: boxPadding,
                          px: boxPadding,
                        }}
                      >
                        <Stack direction="row" sx={{ gap: 1 }}>
                          <SvgIcon
                            {...(typeof item.icon === "string"
                              ? { name: item.icon }
                              : { ...item.icon })}
                            size={16}
                            stroke={2}
                            color="text.primary"
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "text.secondary" }}
                          >
                            {item.title}
                          </Typography>
                        </Stack>
                        <Stack sx={{ gap: { xs: 2, md: 3 }, pb: boxPadding }}>
                          <Stack sx={{ gap: 0.5 }}>
                            <Typography variant="h4">{item.title2}</Typography>
                            {item.description && (
                              <Typography sx={{ color: "text.secondary" }}>
                                {item.description}
                              </Typography>
                            )}
                          </Stack>
                          {item.list && (
                            <Grid container spacing={{ xs: 0.75, md: 1 }}>
                              {item.list.map((list, index) => (
                                <Grid key={index} size={{ xs: 12, md: 6 }}>
                                  <Stack
                                    direction="row"
                                    sx={{
                                      gap: 0.5,
                                      alignItems: "center",
                                      "& svg.tabler-rosette-discount-check": {
                                        width: { xs: 16, md: 24 },
                                        height: { xs: 16, md: 24 },
                                      },
                                    }}
                                  >
                                    <SvgIcon
                                      name="tabler-rosette-discount-check"
                                      stroke={1}
                                      color="text.secondary"
                                    />
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "text.secondary" }}
                                    >
                                      {list.primary}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              ))}
                            </Grid>
                          )}
                        </Stack>
                      </Stack>
                      {(item.actionBtn || item.actionBtn2) && (
                        <GraphicsCard sx={{ bgcolor: "grey.200" }}>
                          <Stack
                            direction="row"
                            sx={{
                              alignItems: "flex-start",
                              gap: 1.5,
                              p: { xs: 2, sm: 3, md: 4 },
                            }}
                          >
                            {item.actionBtn2 && (
                              <Button
                                variant="outlined"
                                color="primary"
                                startIcon={
                                  <SvgIcon
                                    name="tabler-help"
                                    size={16}
                                    stroke={3}
                                  />
                                }
                                {...item.actionBtn2}
                              />
                            )}
                            {item.actionBtn && (
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={
                                  <SvgIcon
                                    name="tabler-link"
                                    size={16}
                                    stroke={3}
                                    color="background.default"
                                  />
                                }
                                {...item.actionBtn}
                              />
                            )}
                          </Stack>
                        </GraphicsCard>
                      )}
                    </GraphicsCard>
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
          </TabContext>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}
