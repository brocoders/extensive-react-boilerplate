import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Grid from "@mui/material/Grid2";
import MuiLink from "@mui/material/Link";
import ContainerWrapper from "@/components/ContainerWrapper";
import Hero from "@/components/hero/Hero";
import Stack from "@mui/material/Stack";
import { Benefit } from "@/components/benefit";
import { Integration } from "@/components/integration";
import Feature18 from "@/components/feature/Feature18";

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
// @asssets
const imagePrefix = "/assets/images/presentation";
export default async function Home(/* props: Props */) {
  // const params = await props.params;
  // const { t } = await getServerTranslation(params.language, "home");

  const linkProps = { target: "_blank", rel: "noopener noreferrer" };
  const hero = {
    headLine: "Powering Waste Collectors, Cleaning Up Communities",
    captionLine:
      "Kata gives waste collectors and community groups the tools to streamline operations, track payments, and scale sustainably—because waste management shouldn’t be messy",
    primaryBtn: {
      children: "Download the App (For Garbage Collectors)",
      href: "",
    },
    videoSrc:
      "https://www.youtube.com/embed/JrhLKkqwZ5s" /* "https://d2elhhoq00m1pj.cloudfront.net/saasable-intro.mp4" */,
    videoThumbnail: "/assets/videos/thumbnails/intro-thumbnail.png",
    listData: [],
  };

  const benefit = {
    heading: "What We’ve Built (So Far!)",
    caption: "",
    blockDetail: [
      {
        animationDelay: 0.1,
        counter: 200,
        defaultUnit: "+",
        caption: "Smart Payment Tracking",
      },
      {
        animationDelay: 0.2,
        counter: 50,
        defaultUnit: "+",
        caption: "Automated Reports ",
      },
      {
        animationDelay: 0.2,
        counter: 50,
        defaultUnit: "+",
        caption: "",
      },
      {
        animationDelay: 0.2,
        counter: 50,
        defaultUnit: "+",
        caption: " ",
      },
    ],
  };

  const tags = {
    heading: `Blocks `,
    description:
      "Explore a wide range of ready-made blocks—from Hero to CTA, Features, and more to speed up your design process.",
    primaryBtn: { children: "Explore all Blocks", href: "" },
    sections: [
      {
        animationDelay: 0.2,
        title: "Hero",
        subTitle: "17 Different Variants",
        image: `${imagePrefix}/hero-light.svg`,
        link: "/",
      },
      {
        animationDelay: 0.3,
        title: "Call to Action",
        subTitle: "12 Different Variants",
        image: `${imagePrefix}/cta-light.svg`,
        link: "/",
      },
      {
        animationDelay: 0.4,
        title: "Feature",
        subTitle: "23 Different Variants",
        image: `${imagePrefix}/feature-light.svg`,
        link: "/",
      },
      {
        animationDelay: 0.2,
        title: "Benefits",
        subTitle: "9 Different Variants",
        image: `${imagePrefix}/benefits-light.svg`,
        link: "/",
      },
      {
        animationDelay: 0.3,
        title: "Process",
        subTitle: "7 Different Variants",
        image: `${imagePrefix}/process-light.svg`,
        link: "/",
      },
      {
        animationDelay: 0.4,
        title: "Integration",
        subTitle: "8 Different Variants",
        image: `${imagePrefix}/integration-light.svg`,
        link: "/",
      },
    ],
  };
  const feature18 = {
    heading: "Powerful Admin Interface",
    caption:
      "Manage data, users, and workflows effortlessly with intuitive, customizable admin controls and features.",
    topics: [
      {
        icon: "tabler-sparkles",
        title: "Material UI Powered",
        title2: "Leverage Power of Material UI Components",
        description:
          "The power and flexibility of Material UI components in admin template",
        image: "/assets/images/graphics/default/admin-dashboard.png",
        list: [
          { primary: "Nextjs JavaScript/TypeScript" },
          { primary: "Customizable Themes" },
          { primary: "Rich Form and Table Components" },
          { primary: "Responsive Grid System" },
        ],
        actionBtn: { children: "View Dashboard", href: "", ...linkProps },
        actionBtn2: { children: "Docs", href: "", ...linkProps },
      },
      {
        icon: "tabler-palette",
        title: "Customizable Themes",
        title2: "Flexible Theming Options",
        description:
          "Tailor themes effortlessly with MUI v6 robust theming system.",
        image: "/assets/images/graphics/default/admin-dashboard-2.png",
        list: [
          { primary: "Easy options for Theming" },
          { primary: "Layout Options" },
          { primary: "Color Presets tailored to your Web Apps" },
          { primary: "Consistency in Design" },
        ],
        actionBtn: { children: "View Dashboard", href: "", ...linkProps },
        actionBtn2: { children: "Docs", href: "", ...linkProps },
      },
      {
        icon: "tabler-rocket",
        title: "Faster Development",
        title2: "Rapid Development",
        description:
          "Launch projects quicker with pre-built layouts and components.",
        image: "/assets/images/graphics/default/admin-dashboard-3.png",
        list: [
          { primary: "Time Saving" },
          { primary: "Tested and Reliable" },
          { primary: "Customization Ready" },
          { primary: "Enhanced User Experience" },
        ],
        actionBtn: { children: "View Dashboard", href: "", ...linkProps },
        actionBtn2: { children: "Docs", href: "", ...linkProps },
      },
      {
        icon: "tabler-scale",
        title: "Scalability",
        title2: "Build to Scale",
        description:
          "Easily scale your app with flexible, modular, and extensible templates.",
        image: "/assets/images/graphics/default/admin-dashboard.png",
        list: [
          { primary: "Modular Architecture" },
          { primary: "Performance Optimized" },
          { primary: "Extensible Codebase" },
          { primary: "Future Proof Design" },
        ],
        actionBtn: { children: "View Dashboard", href: "", ...linkProps },
        actionBtn2: { children: "Docs", href: "", ...linkProps },
      },
    ],
  };

  return (
    // <Container maxWidth="md">
    //   <Grid
    //     container
    //     spacing={3}
    //     wrap="nowrap"
    //     pt={3}
    //     direction="column"
    //     sx={{ height: "90vh", justifyContent: "space-between" }}
    //   >
    //     <Grid size="grow">
    //       <Typography variant="h3" data-testid="home-title" gutterBottom>
    //         {t("title")}
    //       </Typography>
    //       <Typography>
    //         <Trans
    //           i18nKey={`description`}
    //           t={t}
    //           components={[
    //             <MuiLink
    //               key="1"
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               href="https://github.com/brocoders/extensive-react-boilerplate/blob/main/docs/README.md"
    //             >
    //               {}
    //             </MuiLink>,
    //           ]}
    //         />
    //       </Typography>
    //     </Grid>
    //     <Grid sx={{ mx: "auto" }}>
    //       <MuiLink href="/privacy-policy">Privacy Policy</MuiLink>
    //     </Grid>
    //   </Grid>
    // </Container>
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

          <Benefit
            heading={benefit.heading}
            caption={benefit.caption}
            blockDetail={benefit.blockDetail}
          />
          <Integration
            headLine={tags.heading}
            primaryBtn={tags.primaryBtn}
            captionLine={tags.description}
            tagList={tags.sections.map((section) => ({
              label: section.title,
              icon: section.image,
            }))}
          />
          <Feature18
            heading={feature18.heading}
            caption={feature18.caption}
            topics={feature18.topics}
          />
        </Grid>
        <Grid sx={{ mx: "auto" }}>
          <MuiLink href="/privacy-policy">Privacy Policy</MuiLink>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}
