"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import OpportunityForm, { OpportunityFormData } from "@/components/opportunity/opportunity-form";
import { useGetOpportunityService } from "@/services/api/services/opportunities";
import { useParams, useRouter } from "next/navigation";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";

function PageContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const fetchOpportunity = useGetOpportunityService();
  const [initialValues, setInitialValues] = useState<OpportunityFormData & { id: number }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { status, data } = await fetchOpportunity({ id: Number(params.id) });
      if (status === HTTP_CODES_ENUM.OK) {
        const mapped = {
          id: data.id,
          type: data.type,
          clients: data.clients,
          partners: data.partners,
        };
        setInitialValues(mapped);
      }
      setLoading(false);
    };
    load();
  }, [fetchOpportunity, params.id]);

  if (loading) return <p>Loading...</p>;
  if (!initialValues) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <OpportunityForm
        initialValues={initialValues}
        onSuccess={() => router.push("/opportunities")}
      />
    </Container>
  );
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
