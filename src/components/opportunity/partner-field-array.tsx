"use client";

import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import FormSelectInput from "@/components/form/select/form-select";
import { OpportunityFormData } from "./opportunity-form";
import { PartnerItem } from "./partner-item";
import { useGetCompaniesService } from "@/services/api/services/companies";
import { useGetUsersService } from "@/services/api/services/users";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";

type Company = { id: number; name: string };
type User = { id: number; name: string };

interface PartnerFieldArrayProps {
  emptyPartner: {
    type: string | undefined;
    company: { id: number; name: string };
    contacts: { id: number; name: string }[];
  };
}

export function PartnerFieldArray({ emptyPartner }: PartnerFieldArrayProps) {
  const { t } = useTranslation("opportunities");
  const fetchCompanies = useGetCompaniesService();
  const fetchUsers = useGetUsersService();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { control } = useFormContext<OpportunityFormData>();
  const { fields, append, remove } = useFieldArray({ name: "partners", control });
  const { errors } = useFormState({ control });

  useEffect(() => {
    const loadCompanies = async () => {
      const { status, data } = await fetchCompanies({ page: 1, limit: 50 });
      if (status === HTTP_CODES_ENUM.OK) {
        setCompanies(data.data as Company[]);
      }
    };
    loadCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const loadUsers = async () => {
      const { status, data } = await fetchUsers({ page: 1, limit: 50 });
      if (status === HTTP_CODES_ENUM.OK) {
        setUsers(data.data as User[]);
      }
    };
    loadUsers();
  }, [fetchUsers]);

  return (
    <>
      {fields.map((field, index) => (
        <Box key={field.id} sx={{ p: 2, border: "1px dashed grey", borderRadius: "5px", my: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Partner #{index + 1}</Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormSelectInput<OpportunityFormData, { id: string }>
                name={`partners.${index}.type`}
                label={t("form.partners.type.label")}
                options={[{ id: "factor" }, { id: "credit_insurer" }]}
                keyValue="id"
                renderOption={(o) => (o.id === "factor" ? "Factor" : "Credit Insurer")}
              />
              <FormSelectInput<OpportunityFormData, Company>
                name={`partners.${index}.company.id`}
                label={t("form.partners.company.label")}
                options={companies}
                keyValue="id"
                renderOption={(c) => c.name}
                sx={{ mt: 1 }}
                disabled={companies.length === 0}
              />
              <Button size="small" sx={{ mt: 1 }} onClick={() => { /* TODO: open Create Company drawer */ }}>
                {t("form.partners.createCompanyButton")}
              </Button>
            </Grid>
            <Grid item xs={12} lg={6}>
              <PartnerItem partnerIndex={index} indexKey={field.id} users={users} onRemove={remove} />
            </Grid>
            {index === fields.length - 1 && errors.partners && (
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography color="error" variant="body2">
                  {(errors.partners as any).message || t("validation.minPartners")}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button startIcon={<AddIcon />} variant="outlined" onClick={() => append(emptyPartner)}>
          {t("form.partners.addButton")}
        </Button>
      </Grid>
    </>
  );
}
