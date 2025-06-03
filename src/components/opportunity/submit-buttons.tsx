"use client";

import React from "react";
import { useFormState } from "react-hook-form";
import Button from "@mui/material/Button";
import { OpportunityFormData } from "./opportunity-form";
import { useTranslation } from "@/services/i18n/client";

export function SubmitButtons() {
  const { isSubmitting } = useFormState<OpportunityFormData>();
  const { t } = useTranslation("opportunities");
  return (
    <Button type="submit" variant="contained" disabled={isSubmitting}>
      {t("buttons.submit")}
    </Button>
  );
}
