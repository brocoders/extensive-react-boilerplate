"use client";

import React from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import FormSelectInput from "@/components/form/select/form-select";
import { OpportunityFormData } from "./opportunity-form";
import { PartnerItem } from "./partner-item";

type Company = { id: number; name: string };
type User = { id: number; name: string };

interface PartnerFieldArrayProps {
  companies: Company[];
  users: User[];
  emptyPartner: {
    type: string | undefined;
    company: { id: number; name: string };
    contacts: { id: number; name: string }[];
  };
}

export function PartnerFieldArray({ companies, users, emptyPartner }: PartnerFieldArrayProps) {
  const { control } = useFormContext<OpportunityFormData>();
  const { fields, append, remove } = useFieldArray({ name: "partners", control });
  const { errors } = useFormState({ control });

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
                label="Partner Type"
                options={[{ id: "factor" }, { id: "credit_insurer" }]}
                keyValue="id"
                renderOption={(o) => (o.id === "factor" ? "Factor" : "Credit Insurer")}
              />
              <FormSelectInput<OpportunityFormData, Company>
                name={`partners.${index}.company.id`}
                label="Company"
                options={companies}
                keyValue="id"
                renderOption={(c) => c.name}
                sx={{ mt: 1 }}
              />
              <Button size="small" sx={{ mt: 1 }} onClick={() => { /* TODO: open Create Company drawer */ }}>
                + Create Company
              </Button>
            </Grid>
            <Grid item xs={12} lg={6}>
              <PartnerItem partnerIndex={index} indexKey={field.id} users={users} onRemove={remove} />
            </Grid>
            {index === fields.length - 1 && errors.partners && (
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography color="error" variant="body2">
                  {(errors.partners as any).message || "At least one partner required"}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Button startIcon={<AddIcon />} variant="outlined" onClick={() => append(emptyPartner)}>
          Add Partner
        </Button>
      </Grid>
    </>
  );
}
