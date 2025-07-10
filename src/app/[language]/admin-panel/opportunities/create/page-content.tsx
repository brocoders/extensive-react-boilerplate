"use client";

// use PageContainer for consistent spacing
import PageContainer from "@/components/page-container";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import OpportunityForm from "@/components/opportunity/opportunity-form";
import { useRouter } from "next/navigation";

function PageContent() {
  const router = useRouter();
  return (
    <PageContainer sx={{ mt: 4, maxWidth: 800 }}>
      <OpportunityForm onSuccess={() => router.push("/opportunities")} />
    </PageContainer>
  );
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
