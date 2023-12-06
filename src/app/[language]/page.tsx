import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Trans } from "react-i18next/TransWithoutContext";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home({ params }: Props) {
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {t("title")}
          </Typography>
          <Typography>
            <Trans
              i18nKey={`description`}
              t={t}
              components={[
                <MuiLink
                  key="1"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/brocoders/extensive-react-boilerplate/blob/main/docs/README.md"
                >
                  {}
                </MuiLink>,
              ]}
            />
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
