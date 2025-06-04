"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import ContactList from "@/components/list/contact-list";

function PageContent() {
  return <ContactList />;
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
