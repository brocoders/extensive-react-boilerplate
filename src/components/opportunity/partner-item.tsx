"use client";

import React, { useState } from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import FormSelectInput from "@/components/form/select/form-select";
import { OpportunityFormData } from "./opportunity-form";
import { useTranslation } from "@/services/i18n/client";
import Drawer from "@mui/material/Drawer";
import { FormCreateUser as CreateUserForm } from "@/app/[language]/admin-panel/users/create/page-content";

type User = { id: number; name: string };

interface PartnerItemProps {
  partnerIndex: number;
  indexKey: string;
  users: User[];
  onRemove: (index: number) => void;
}

export function PartnerItem({
  partnerIndex,
  indexKey,
  users,
  onRemove,
}: PartnerItemProps) {
  const { control, setValue } = useFormContext<OpportunityFormData>();
  const { t } = useTranslation("opportunities");
  const [drawerContactIndex, setDrawerContactIndex] = useState<number | null>(
    null
  );
  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({ name: `partners.${partnerIndex}.contacts`, control });
  const { errors } = useFormState({ control });

  return (
    <>
      <Grid container spacing={2} key={indexKey}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            {t("form.partners.contactLabel") + "s"}
          </Typography>
        </Grid>
        {contactFields.map((contactField, contactIndex) => (
          <Grid item xs={12} lg={6} key={contactField.id}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <FormSelectInput<OpportunityFormData, User>
                name={`partners.${partnerIndex}.contacts.${contactIndex}.id`}
                label={`${t("form.partners.contactLabel")} ${contactIndex + 1}`}
                options={users}
                keyValue="id"
                renderOption={(u) => u.name}
              />
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
          </Grid>
        ))}
        <Grid item xs={12} lg={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={() => appendContact({ id: 0, name: "" })}
            >
              Add Contact
            </Button>
            <Button
              size="small"
              onClick={() => setDrawerContactIndex(contactFields.length - 1)}
            >
              {t("form.partners.createUserButton")}
            </Button>
          </Box>
        </Grid>
        {errors.partners &&
          Array.isArray(errors.partners) &&
          errors.partners[partnerIndex]?.contacts && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                At least one contact required
              </Typography>
            </Grid>
          )}
        {partnerIndex > 0 && (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => onRemove(partnerIndex)}
            >
              {t("form.partners.removeButton")}
            </Button>
          </Grid>
        )}
      </Grid>
      <Drawer
        anchor="right"
        open={drawerContactIndex !== null}
        onClose={() => setDrawerContactIndex(null)}
        PaperProps={{ sx: { width: "50vw" } }}
      >
        <CreateUserForm
          onSuccess={(user) => {
            if (drawerContactIndex === null) return;
            setValue(
              `partners.${partnerIndex}.contacts.${drawerContactIndex}.id`,
              user.id
            );
            setValue(
              `partners.${partnerIndex}.contacts.${drawerContactIndex}.name`,
              user.name || ""
            );
            setDrawerContactIndex(null);
          }}
          onCancel={() => setDrawerContactIndex(null)}
        />
      </Drawer>
    </>
  );
}
