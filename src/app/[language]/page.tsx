import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import ContainerWrapper from "@/components/ContainerWrapper";
import Stack from "@mui/material/Stack";
import Hero from "@/sections/Hero";
import { CardMedia, Chip } from "@mui/material";
import Features from "@/sections/Features";
import LazySection from "@/components/LazySection";
import Benefits from "@/sections/benefit";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home({ language }: { language: string }) {
  const { t } = await getServerTranslation(language, "home");
  const hero = {
    headLine: "Powering Waste Collectors, Cleaning Up Communities",
    captionLine:
      "Kata gives waste collectors and community groups the tools to streamline operations, track payments, and scale sustainably—because waste management shouldn’t be messy",
    primaryBtn: {
      children: "Download the App (For Garbage Collectors)",
      href: "",
    },
    videoSrc: "https://d2elhhoq00m1pj.cloudfront.net/saasable-intro.mp4",
    videoThumbnail: "/assets/videos/thumbnails/intro-thumbnail.png",
    listData: [],
  };
  const all_features = {
    heading: "Comprehensive UI Kit Tailored to your Need",
    caption: "Ready to transform your SaaS designs with one powerful UI Kit?",
    actionBtn: { children: "Buy Now", href: "" },
    secondaryBtn: { children: "Explore Blocks", href: "" },
    features: [
      {
        icon: "tabler-accessible",
        title: "WCAG Compliant",
        content:
          "Ensure accessibility with WCAG compliant design for browsing.",
      },
      {
        icon: "tabler-brand-google",
        title: "SEO Friendly",
        content:
          "Boost visibility with SEO-friendly features for better search rankings.",
      },
      {
        icon: "tabler-stack-2",
        title: "MUI Components",
        content:
          "Customize Material 3 design MUI components for enhanced aesthetics.",
      },
      {
        icon: "tabler-rocket",
        title: "High Performance UI",
        content:
          "Adjust content layout for visual coherence on various screen sizes.",
      },
      {
        icon: "tabler-help",
        title: "Detailed Documentation",
        content:
          "Access comprehensive documentation for easy guidance on platform usage.",
      },
      {
        icon: "tabler-refresh",
        title: "Regular Updates",
        content:
          "Receive consistent updates to keep the platform secure and up-to-date with the latest features.",
      },
    ],
  };
  const benefit = {
    heading: "Endless Possibilities",
    caption:
      "Everything you need to design both the marketing site and the admin interface for your SaaS product.",
    blockDetail: [
      {
        animationDelay: 0.1,
        counter: 200,
        defaultUnit: "+",
        caption: "Blocks",
      },
      {
        animationDelay: 0.2,
        counter: 50,
        defaultUnit: "+",
        caption: "Admin Pages",
      },
      {
        animationDelay: 0.3,
        counter: 7,
        defaultUnit: "+",
        caption: "Landing Demos",
      },
      {
        animationDelay: 0.4,
        counter: 1200,
        defaultUnit: "+",
        caption: "Hours Saved",
      },
    ],
  };
  return (
    <ContainerWrapper sx={undefined}>
      <Stack sx={{ py: 1, gap: { xs: 3, sm: 4, md: 5 } }}></Stack>
      <Grid
        container
        spacing={3}
        wrap="nowrap"
        pt={3}
        direction="column"
        sx={{ height: "90vh", justifyContent: "space-between" }}
      >
        <Grid size="grow">
          <Hero
            headLine={hero.headLine}
            captionLine={hero.captionLine}
            primaryBtn={hero.primaryBtn}
            videoSrc={hero.videoSrc}
            videoThumbnail={hero.videoThumbnail}
            listData={hero.listData}
          />
          <Features
            heading={all_features.heading}
            caption={all_features.caption}
            features={all_features.features}
            actionBtn={all_features.actionBtn}
            secondaryBtn={all_features.secondaryBtn}
          />

          <LazySection
            sections={
              [
                // { componentKey: "Features", props: {} },
                // {
                //   component: dynamic(() => import("@/sections/Features")),
                //   props: {},
                // },
                // {
                //   component: dynamic(() => import("@/sections/OtherSection")), // Replace with actual component
                //   props: {},
                // },
              ]
            }
            offset="200px"
          />

          {/* <Benefits heading={"dsdsd"} caption={"sdsds"} blockDetail={benefit} /> */}
        </Grid>
        <Grid sx={{ mx: "auto" }}>
          <MuiLink href="/privacy-policy">Privacy Policy</MuiLink>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}
