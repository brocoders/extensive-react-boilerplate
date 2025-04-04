"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// @third-party
import { motion } from "framer-motion";

// @project
import ButtonAnimationWrapper from "@/components/ButtonAnimationWrapper";
import ContainerWrapper from "@/components/ContainerWrapper";
import GraphicsCard from "@/components/cards/GraphicsCard";
import GraphicsImage from "@/components/GraphicsImage";
import SvgIcon from "@/components/SvgIcon";
import Typeset from "@/components/Typeset";
import { SECTION_COMMON_PY } from "@/utils/constant";

// @assets
import Star from "@/images/graphics/Star";

/***************************  FEATURE - 20  ***************************/

interface Feature20Props {
  heading?: string;
  caption?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  features: Array<{ icon: string | object; title?: string; content?: string }>;
  actionBtn?: object;
  secondaryBtn?: object;
}

export default function Feature20({
  heading,
  caption,
  image,
  features,
  actionBtn,
  secondaryBtn,
}: Feature20Props) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  const partitionInExtraSmall = 1;
  const partitionInSmall = 2;
  const partitionInLarge = 3;

  const columns = downSM
    ? partitionInExtraSmall
    : downMD
      ? partitionInSmall
      : partitionInLarge;

  const calculateElementsInLastRow = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataArray: string | any[],
    columns: number
  ) => {
    const totalItems = dataArray.length;
    const elementsInLastRow = totalItems % columns || columns;
    return elementsInLastRow;
  };

  const calculateIndexOfFirstElementInLastRow = (
    dataArray: string | any[],
    elementsInLastRow: number
  ) => {
    const totalItems = dataArray.length;
    const indexOfFirstElementInLastRow = totalItems - elementsInLastRow;
    return indexOfFirstElementInLastRow;
  };

  const elementsInLastRow = calculateElementsInLastRow(features, columns);
  const indexOfFirstElementInLastRow = calculateIndexOfFirstElementInLastRow(
    features,
    elementsInLastRow
  );

  const calculateIndexOfLastElementOfEachRow = (
    dataArray: string | any[],
    columns: number
  ) => {
    const indices = [];
    const totalItems = dataArray.length;
    const rows = Math.ceil(totalItems / columns);

    for (let i = 1; i <= rows; i++) {
      const lastIndexInRow = i * columns - 1;
      indices.push(
        lastIndexInRow < totalItems ? lastIndexInRow : totalItems - 1
      );
    }

    return indices;
  };

  const indicesOfLastElements = calculateIndexOfLastElementOfEachRow(
    features,
    columns
  );
  const gc = theme.palette.background.default;

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
        >
          <Typeset
            {...{
              heading: heading || "",
              stackProps: {
                sx: {
                  maxWidth: { md: 500 },
                  ...(!image && { maxWidth: 1, textAlign: "center" }),
                },
              },
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
        >
          <GraphicsCard
            sx={{ position: "relative", overflow: "visible" }}
            bgImage={undefined}
          >
            {image && (
              <GraphicsCard
                sx={{
                  height: { md: 267 },
                  width: { md: 456 },
                  bgcolor: "transparent",
                  position: "absolute",
                  top: -190,
                  right: 45,
                  zIndex: -1,
                  display: { xs: "none", md: "block" },
                }}
                bgImage={undefined}
              >
                <GraphicsImage
                  sx={{
                    height: 1,
                    backgroundPositionX: "right",
                    backgroundPositionY: "top",
                  }}
                  image={image}
                  nestedChildren={
                    <Box
                      sx={{
                        width: 1,
                        height: 1,
                        background: `linear-gradient(180deg, ${alpha(gc, 0)} 0%, ${alpha(gc, 0.6)} 100%)`,
                      }}
                    />
                  }
                  cardMediaProps={undefined}
                />
              </GraphicsCard>
            )}
            <Box sx={{ p: 3 }}>
              <Grid container>
                {features.map((item, index) => (
                  <Grid
                    key={index}
                    size={{
                      xs: 12 / partitionInExtraSmall,
                      sm: 12 / partitionInSmall,
                      md: 12 / partitionInLarge,
                    }}
                    sx={{
                      position: "relative",
                      ...(index < indexOfFirstElementInLastRow && {
                        borderBottom: `1px solid ${theme.palette.grey[300]}`,
                      }),
                      ...(!indicesOfLastElements.includes(index) && {
                        borderRight: `1px solid ${theme.palette.grey[300]}`,
                      }),
                    }}
                  >
                    <Stack
                      sx={{
                        gap: { xs: 3, sm: 4 },
                        height: 1,
                        py: { xs: 1.5, sm: 3, md: 4 },
                        px: { xs: 0, sm: 3, md: 4 },
                      }}
                    >
                      <Avatar
                        sx={{ width: 60, height: 60, bgcolor: "grey.300" }}
                      >
                        {/*  //TODO: Uncomment this when the icon is available */}
                        <SvgIcon
                          {...(typeof item.icon === "string" && item.icon
                            ? { name: item.icon }
                            : typeof item.icon === "object"
                              ? { ...item.icon }
                              : {})}
                        />
                      </Avatar>
                      <Stack sx={{ gap: { xs: 0.5, md: 1 } }}>
                        {item.title && (
                          <Typography variant="h4">{item.title}</Typography>
                        )}
                        {item.content && (
                          <Typography sx={{ color: "text.secondary" }}>
                            {item.content}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                    {index < indexOfFirstElementInLastRow &&
                      !indicesOfLastElements.includes(index) && (
                        <Stack
                          sx={{ position: "absolute", bottom: -9, right: -9 }}
                        >
                          <Star />
                        </Stack>
                      )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </GraphicsCard>
        </motion.div>
        <Stack sx={{ alignItems: "center", gap: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: { xs: "75%", sm: "45%" },
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4,
              }}
            >
              {caption}
            </motion.div>
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "center", gap: 1.5 }}
            >
              {secondaryBtn && (
                <ButtonAnimationWrapper>
                  <Button variant="outlined" {...secondaryBtn} />
                </ButtonAnimationWrapper>
              )}
              {actionBtn && (
                <ButtonAnimationWrapper>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={
                      <SvgIcon
                        name="tabler-sparkles"
                        size={16}
                        stroke={3}
                        color="background.default"
                      />
                    }
                    {...actionBtn}
                  />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </motion.div>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}
