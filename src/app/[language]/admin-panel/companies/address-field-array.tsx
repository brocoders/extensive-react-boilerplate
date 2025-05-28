"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormTextInput from "@/components/form/text-input/form-text-input";
import { useTranslation } from "@/services/i18n/client";

export type Address = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export type AddressFieldArrayProps<T extends { addresses: Address[] }> = {
  namespace: string;
};

function AddressFieldArray<T extends { addresses: Address[] }>({ namespace }: AddressFieldArrayProps<T>) {
  const { t } = useTranslation(namespace);
  const { control } = useFormContext<T>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  return (
    <Grid container spacing={2}>
      {fields.map((field, index) => (
        <Grid item xs={12} key={field.id}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormTextInput<T>
                name={`addresses.${index}.street` as const}
                label={t("inputs.addresses.street.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<T>
                name={`addresses.${index}.postalCode` as const}
                label={t("inputs.addresses.postalCode.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<T>
                name={`addresses.${index}.city` as const}
                label={t("inputs.addresses.city.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<T>
                name={`addresses.${index}.country` as const}
                label={t("inputs.addresses.country.label")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="inherit" onClick={() => remove(index)}>
                {t("actions.removeAddress")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() =>
            append({ street: "", postalCode: "", city: "", country: "" })
          }
        >
          {t("actions.addAddress")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddressFieldArray;
