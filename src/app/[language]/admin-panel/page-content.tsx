"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
// use PageContainer for full-width layout with padding
import PageContainer from "@/components/page-container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function AdminPanel() {
  const { t } = useTranslation("admin-panel-home");

  return (
    <PageContainer>
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid>
          <Typography variant="h3" gutterBottom>
            {t("title")}
          </Typography>
          <Typography>{t("description")}</Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default withPageRequiredAuth(AdminPanel, { roles: [RoleEnum.ADMIN] });
