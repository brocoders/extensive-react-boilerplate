"use client";
import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
// @mui
import { useTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// @third-party
import { motion } from "framer-motion";
import Slider from "react-slick";

// @project
import ButtonAnimationWrapper from "@/components/ButtonAnimationWrapper";
import ContainerWrapper from "@/components/ContainerWrapper";
import FaqDetails from "@/components/faq/FaqDetails";
import SvgIcon from "@/components/SvgIcon";
import Typeset from "@/components/Typeset";

import useFocusWithin from "@/hooks/useFocusWithin";
import { generateFocusVisibleStyles } from "@/utils/CommonFocusStyle";
import { SECTION_COMMON_PY } from "@/utils/constant";
import Link from "../link";

/***************************  FAQ - 6  ***************************/

interface Faq6Props {
  heading: string;
  caption: string;
  defaultExpanded?: boolean;
  faqList: {
    question: string;
    answer:
      | string
      | { content: string; type: "list"; data: { primary: string }[] };
    category: string;
  }[];
  getInTouch: { link: { href: string; [key: string]: any } };
  categories: string[];
  activeCategory?: string;
}

export default function Faq6({
  heading,
  caption,
  defaultExpanded,
  faqList,
  getInTouch,
  categories,
  activeCategory,
}: Faq6Props) {
  const theme = useTheme();
  const isFocusWithin = useFocusWithin();
  const [expanded, setExpanded] = useState<string | false>(
    defaultExpanded ? "panel0" : false
  );
  const [activeTopic, setActiveTopic] = useState(activeCategory || "");
  const [filterFaqList, setFilterFaqList] = useState(
    activeCategory
      ? faqList.filter((item) => item.category === activeCategory)
      : faqList
  );

  const cardRadius = { xs: 4, sm: 6 };
  const accordionRadius = { xs: cardRadius.xs * 4, sm: cardRadius.sm * 4 };
  const accordionPX = { xs: 2, sm: 3 };
  const iconProps = { color: "text.primary" };

  // Handles the expansion of accordion panels
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : false);

  const slickStyle = {
    "& .slick-slide": { " > div": { px: { xs: 0.5, md: 0.75 } } },
  };

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    initialSlide: 0,
    variableWidth: true,
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
        >
          <Stack
            direction={{ sm: "row" }}
            sx={{
              gap: 4,
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "end" },
            }}
          >
            <Typeset {...{ heading, caption }} />
            <ButtonAnimationWrapper>
              <Button
                variant="contained"
                size="large"
                {...getInTouch.link}
                {...(getInTouch.link &&
                  getInTouch.link.href && { component: Link })}
                sx={{ minWidth: 215 }}
              />
            </ButtonAnimationWrapper>
          </Stack>
        </motion.div>
        <Stack sx={{ gap: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
          >
            <Stack sx={slickStyle}>
              <Slider {...settings}>
                <Button
                  sx={{
                    minHeight: { xs: 40, sm: 48 },
                    color: "text.primary",
                    borderColor: "divider",
                    bgcolor: activeTopic === "" ? "grey.100" : "inherit",
                    "&.MuiButton-root:hover": {
                      bgcolor: "grey.100",
                      borderColor: "divider",
                    },
                  }}
                  variant="outlined"
                  onClick={() => {
                    setActiveTopic("");
                    setFilterFaqList(faqList);
                  }}
                >
                  All
                </Button>
                {categories.map((item, index) => (
                  <Button
                    key={index}
                    sx={{
                      minHeight: { xs: 40, sm: 48 },
                      color: "text.primary",
                      borderColor: "divider",
                      bgcolor: activeTopic === item ? "grey.100" : "inherit",
                      "&.MuiButton-root:hover": {
                        bgcolor: "grey.100",
                        borderColor: "divider",
                      },
                    }}
                    variant="outlined"
                    onClick={() => {
                      setActiveTopic(item);
                      setFilterFaqList(
                        faqList.filter((list) => list.category === item)
                      );
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Slider>
            </Stack>
          </motion.div>
          <Stack
            sx={{
              gap: 1.5,
              "& .MuiAccordion-root:first-of-type": {
                borderTopLeftRadius: accordionRadius,
                borderTopRightRadius: accordionRadius,
              },
              "& .MuiAccordion-root:last-of-type": {
                borderBottomLeftRadius: accordionRadius,
                borderBottomRightRadius: accordionRadius,
              },
            }}
          >
            {filterFaqList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <Accordion
                  key={index}
                  expanded={expanded === (`panel${index}` as string)}
                  onChange={handleChange(`panel${index}`)}
                  sx={{
                    borderRadius: cardRadius,
                    backgroundColor: "grey.100",
                    ...(isFocusWithin && {
                      "&:focus-within": generateFocusVisibleStyles(
                        theme.palette.primary.main
                      ),
                    }),
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <SvgIcon
                        name={
                          expanded === `panel${index}`
                            ? "tabler-minus"
                            : "tabler-plus"
                        }
                        {...iconProps}
                        size={20}
                      />
                    }
                    sx={{
                      p: accordionPX,
                      "& .MuiAccordionSummary-expandIconWrapper": {
                        color: "text.primary",
                      },
                      "& .MuiAccordionSummary-content": { my: 0 },
                      "&.Mui-focusVisible": { bgcolor: "transparent" },
                      "&:hover, &:hover svg": { color: "primary.dark" },
                    }}
                  >
                    <Typography variant="h4">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ px: accordionPX, pt: 0, pb: accordionPX }}
                    key={index}
                  >
                    <FaqDetails answer={item.answer} />
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}
