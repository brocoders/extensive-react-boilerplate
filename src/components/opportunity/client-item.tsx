"use client";

import React from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormSelectInput from "@/components/form/select/form-select";
import { OpportunityFormData } from "./opportunity-form";
import { useTranslation } from "@/services/i18n/client";

type User = { id: number; firstName: string; lastName: string };

interface ClientItemProps {
  clientIndex: number;
  indexKey: string; // pour key unique
  users: User[];
  onRemove: (index: number) => void;
}

export function ClientItem({
  clientIndex,
  indexKey,
  users,
  onRemove,
}: ClientItemProps) {
  // Accès au contexte du formulaire
  const { control } = useFormContext<OpportunityFormData>();
  const { t } = useTranslation("opportunities");

  // Champ “contacts” (FieldArray imbriqué) pour ce client
  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control,
    name: `clients.${clientIndex}.contacts`,
  });

  // Validation errors pour cette partie “contacts”
  const { errors } = useFormState({ control });

  return (
    <Grid container spacing={2}>
      {/* Contacts Section */}
      <Grid size={12}>
        <Typography variant="subtitle1">
          {t("form.clients.contactLabel") + "s"}
        </Typography>

        {contactFields.map((contactField, contactIndex) => (
          <Box
            key={contactField.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 1,
            }}
          >
            <FormSelectInput<OpportunityFormData, User>
              name={`clients.${clientIndex}.contacts.${contactIndex}.id`}
              label={`${t("form.clients.contactLabel")} ${contactIndex + 1}`}
              options={users}
              keyValue="id"
              renderOption={(u) => u.firstName + " " + u.lastName}
            />
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={() => appendContact({ id: 0, name: "" })}
            >
              Add
            </Button>
            {contactIndex > 0 && (
              <IconButton
                onClick={() => removeContact(contactIndex)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          size="small"
          onClick={() => {
            // TODO : ouvrir le Drawer “Create User”
          }}
        >
          {t("form.clients.createUserButton")}
        </Button>

        {/* Erreur de validation du tableau “contacts” */}
        {errors.clients &&
          Array.isArray(errors.clients) &&
          errors.clients[clientIndex]?.contacts && (
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography color="error" variant="body2">
                At least one contact required
              </Typography>
            </Grid>
          )}
      </Grid>

      {/* Remove Client Button */}
      {clientIndex > 0 && (
        <Grid size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => onRemove(clientIndex)}
          >
            {t("form.clients.removeButton")}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
