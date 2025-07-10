"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import Container from "@mui/material/Container";
import OpportunitiesList from "@/components/opportunity/opportunities-list";

function PageContent() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <OpportunitiesList />
    </Container>
  );
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
