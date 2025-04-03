import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Grid from "@mui/material/Grid2";
import MuiLink from "@mui/material/Link";
import ContainerWrapper from "@/components/ContainerWrapper";
import Hero from "@/components/hero/Hero";
import Stack from "@mui/material/Stack";

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

export default async function Home(/* props: Props */) {
  // const params = await props.params;
  // const { t } = await getServerTranslation(params.language, "home");
  const hero = {
    headLine: "Powering Waste Collectors, Cleaning Up Communities",
    captionLine:
      "Kata gives waste collectors and community groups the tools to streamline operations, track payments, and scale sustainably—because waste management shouldn’t be messy",
    primaryBtn: {
      children: "Download the App (For Garbage Collectors)",
      href: "",
    },
    videoSrc:
      "" /* "https://d2elhhoq00m1pj.cloudfront.net/saasable-intro.mp4" */,
    videoThumbnail: "/assets/videos/thumbnails/intro-thumbnail.png",
    listData: [],
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

          {/* <Benefits heading={"dsdsd"} caption={"sdsds"} blockDetail={benefit} /> */}
        </Grid>
        <Grid sx={{ mx: "auto" }}>
          <MuiLink href="/privacy-policy">Privacy Policy</MuiLink>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}
