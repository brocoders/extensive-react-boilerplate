"use client";

import React from "react";
import { useFormState } from "react-hook-form";
import Button from "@mui/material/Button";
import { OpportunityFormData } from "./opportunity-form";

export function SubmitButtons() {
  const { isSubmitting } = useFormState<OpportunityFormData>();
  return (
    <Button type="submit" variant="contained" disabled={isSubmitting}>
      Submit
    </Button>
  );
}
