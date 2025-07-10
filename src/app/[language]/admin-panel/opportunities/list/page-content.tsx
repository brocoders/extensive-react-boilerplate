"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import OpportunitiesList from "@/components/opportunity/opportunities-list";

function PageContent() {
  return <OpportunitiesList />;
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
