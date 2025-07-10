"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
// full-width container for list
import PageContainer from "@/components/page-container";
import OpportunitiesList from "@/components/opportunity/opportunities-list";

function PageContent() {
  return (
    <PageContainer sx={{ mt: 4, maxWidth: 800 }}>
      <OpportunitiesList />
    </PageContainer>
  );
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
