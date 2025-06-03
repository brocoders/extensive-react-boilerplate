"use client";

import React from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import FormSelectInput from "@/components/form/select/form-select";
import { OpportunityFormData } from "./opportunity-form";

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

export function PartnerFieldArray({
  companies,
  users,
  emptyPartner,
}: PartnerFieldArrayProps) {
  const { control } = useFormContext<OpportunityFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "partners",
  });
  const { errors } = useFormState({ control });

  return (
    <>
      {fields.map((field, index) => (
        <Grid
          container
          spacing={2}
          key={field.id}
          alignItems="center"
          marginBottom={2}
        >
          {/* Partner Type + Company */}
          <Grid item xs={12} lg={6}>
            <FormSelectInput<OpportunityFormData, { id: string }>
              name={`partners.${index}.type`}
              label="Partner Type"
              options={[{ id: "factor" }, { id: "credit_insurer" }]}
              keyValue="id"
              renderOption={(o) =>
                o.id === "factor" ? "Factor" : "Credit Insurer"
              }
            />
            <FormSelectInput<OpportunityFormData, Company>
              name={`partners.${index}.company.id`}
              label="Company"
              options={companies}
              keyValue="id"
              renderOption={(c) => c.name}
              sx={{ mt: 1 }}
            />
            <Button
              size="small"
              sx={{ mt: 1 }}
              onClick={() => {
                // TODO: ouvrir Drawer “Create Company”
              }}
            >
              + Create Company
            </Button>
          </Grid>

          {/* Partner Contact + Create User */}
          <Grid item xs={12} lg={6}>
            <FormSelectInput<OpportunityFormData, User>
              name={`partners.${index}.contacts.0.id`}
              label="Contact"
              options={users}
              keyValue="id"
              renderOption={(u) => u.name}
            />
            <Button
              size="small"
              sx={{ mt: 1 }}
              onClick={() => {
                // TODO: ouvrir Drawer “Create User”
              }}
            >
              + Create User
            </Button>
          </Grid>

          {/* Remove Partner Button */}
          <Grid item xs={12}>
            <IconButton onClick={() => remove(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add Partner Button */}
      <Grid item xs={12}>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => append(emptyPartner)}
        >
          + Add Partner
        </Button>
      </Grid>

      {/* Validation error for partners array */}
      {errors.partners && (
        <Grid item xs={12}>
          <Typography color="error" variant="body2">
            {Array.isArray(errors.partners)
              ? "At least one partner required"
              : "Invalid partners"}
          </Typography>
        </Grid>
      )}
    </>
  );
}
