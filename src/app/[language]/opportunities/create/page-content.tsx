"use client";

import Container from "@mui/material/Container";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import OpportunityForm from "@/components/opportunity/opportunity-form";
import { useRouter } from "next/navigation";

function PageContent() {
  const router = useRouter();
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <OpportunityForm onSuccess={() => router.push("/opportunities")}/>
    </Container>
  );
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
