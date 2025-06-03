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

interface ClientFieldArrayProps {
  companies: Company[];
  users: User[];
  emptyClient: {
    company: { id: number; name: string };
    contacts: { id: number; name: string }[];
  };
}

export function ClientFieldArray({
  companies,
  users,
  emptyClient,
}: ClientFieldArrayProps) {
  const { control } = useFormContext<OpportunityFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "clients",
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
          {/* Company + Create Company Button */}
          <Grid item xs={12} lg={6}>
            <FormSelectInput<OpportunityFormData, Company>
              name={`clients.${index}.company.id`}
              label="Company"
              options={companies}
              keyValue="id"
              renderOption={(c) => c.name}
            />
            <Button
              size="small"
              sx={{ mt: 1 }}
              onClick={() => {
                // TODO: ouvrir le Drawer “Create Company”
              }}
            >
              + Create Company
            </Button>
          </Grid>

          {/* Contact + Create User Button */}
          <Grid item xs={12} lg={6}>
            <FormSelectInput<OpportunityFormData, User>
              name={`clients.${index}.contacts.0.id`}
              label="Contact"
              options={users}
              keyValue="id"
              renderOption={(u) => u.name}
            />
            <Button
              size="small"
              sx={{ mt: 1 }}
              onClick={() => {
                // TODO: ouvrir le Drawer “Create User”
              }}
            >
              + Create User
            </Button>
          </Grid>

          {/* Remove Client Button */}
          <Grid item xs={12}>
            <IconButton onClick={() => remove(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add Client Button */}
      <Grid item xs={12}>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => append(emptyClient)}
        >
          + Add Client
        </Button>
      </Grid>

      {/* Validation error for clients array */}
      {errors.clients && (
        <Grid item xs={12}>
          <Typography color="error" variant="body2">
            {Array.isArray(errors.clients)
              ? "At least one client required"
              : "Invalid clients"}
          </Typography>
        </Grid>
      )}
    </>
  );
}
