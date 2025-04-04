"use client";
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// @third-party
import { motion } from "framer-motion";
import Slider from "react-slick";

// @project
import ContainerWrapper from "@/components/ContainerWrapper";

import { SECTION_COMMON_PY } from "@/utils/constant";

/***************************  CLIENTELE - 3  ***************************/

interface Clientele3Props {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clienteleList: Array<Record<string, any>>;
}

export default function Clientele3({ title, clienteleList }: Clientele3Props) {
  const theme = useTheme();

  const settings = {
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2, centerMode: true },
      },
    ],
  };

  const shade = {
    content: `' '`,
    zIndex: 1,
    position: "absolute",
    width: { sm: 60, xs: 40 },
    height: 1,
    top: 0,
    background: `linear-gradient(90deg, ${theme.palette.background.default} -8.54%, ${alpha(theme.palette.background.default, 0)} 100%)`,
    transform: null,
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 2.5 }}>
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
          >
            <Typography
              variant="subtitle2"
              align="center"
              sx={{ color: "text.secondary" }}
            >
              {title}
            </Typography>
          </motion.div>
        )}
        <Box
          sx={{
            position: "relative",
            "&:before": { ...shade, left: 0 },
            "&:after": { ...shade, right: 0, rotate: "180deg" },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
          >
            <Slider {...settings}>
              {clienteleList.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    px: { xs: 0.25, sm: 0.5, md: 0.75 },
                    "& svg": {
                      opacity: 0.4,
                      transition: " all 0.5s ease-in-out",
                    },
                    "&:hover svg": {
                      opacity: 1,
                      transition: " all 0.5s ease-in-out",
                    },
                  }}
                >
                  <Chip
                    label={
                      <></>
                      //TTODO: Uncomment this when you have the GraphicsImage component ready
                      // <GraphicsImage
                      //   nestedChildren={item.nestedChildren || null}
                      //   image={item.image || ""}
                      //   sx={item.sx || {}}
                      //   cardMediaProps={item.cardMediaProps || {}}
                      // />
                    }
                    sx={{
                      bgcolor: "grey.100",
                      height: { xs: 40, sm: 46, md: 60 },
                      width: 1,
                      "& .MuiChip-label": { p: 0 },
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </motion.div>
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}
