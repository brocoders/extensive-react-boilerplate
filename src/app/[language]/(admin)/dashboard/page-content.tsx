"use client";

import AnalyticsOverviewCard from "@/components/charts/AnalyticsOverviewCard";
import AnalyticsOverviewChart from "@/components/charts/AnalyticsOverviewChart";
import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function DashboardPanel() {
  return (
    <Container>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <AnalyticsOverviewCard />
        </Grid>
        <Grid size={12}>
          <AnalyticsOverviewChart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(DashboardPanel, {
  roles: [RoleEnum.ADMIN],
});
