"use client";

import React from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { ClientItem } from "./client-item";
import { OpportunityFormData } from "./opportunity-form";
import FormSelectInput from "@/components/form/select/form-select";
import Box from "@mui/material/Box";

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
  // Accès au contrôle du formulaire
  const { control } = useFormContext<OpportunityFormData>();

  // FieldArray pour "clients"
  const {
    fields: clientFields,
    append: appendClient,
    remove: removeClient,
  } = useFieldArray({
    control,
    name: "clients",
  });

  // Validation errors pour "clients"
  const { errors } = useFormState({ control });

  return (
    <>
      {clientFields.map((clientField, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "5px",
            my: 1,
          }}
        >
          <Grid size={12} key={clientField.id}>
            {/* Champ "Company" pour chaque client */}
            <Grid container spacing={2}>
              <Grid size={5}>
                <Typography variant="subtitle1">Client #{index + 1}</Typography>
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
                    // TODO : ouvrir le Drawer “Create Company”
                  }}
                >
                  + Create Company
                </Button>
              </Grid>

              {/* Si erreur sur la company */}
              {errors.clients &&
                Array.isArray(errors.clients) &&
                errors.clients[index]?.company && (
                  <Grid size={12}>
                    <Typography color="error" variant="body2">
                      Client’s company is required
                    </Typography>
                  </Grid>
                )}
              {/* Sous-composant pour gérer les "Contacts" de ce client */}
              <Grid size={7}>
                <ClientItem
                  clientIndex={index}
                  indexKey={clientField.id}
                  users={users}
                  onRemove={removeClient}
                />
              </Grid>
            </Grid>

            {/* Erreur de validation globale sur la liste "clients" */}
            {index === clientFields.length - 1 && errors.clients && (
              <Grid size={12} sx={{ mt: 1 }}>
                <Typography color="error" variant="body2">
                  {(errors.clients as any).message ||
                    "At least one client required"}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}

      {/* Add Client Button */}
      <Grid size={12}>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => appendClient(emptyClient)}
        >
          Add Client
        </Button>
      </Grid>
    </>
  );
}
