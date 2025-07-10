"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  ArrayPath,
  Path,
  useFieldArray,
  useFormContext,
  FieldArray,
} from "react-hook-form";
import FormTextInput from "@/components/form/text-input/form-text-input";
import { useTranslation } from "@/services/i18n/client";

export type Address = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
  type: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type AddressFieldArrayProps<T extends { addresses: Address[] }> = {
  namespace: string;
};
function AddressFieldArray<T extends { addresses: Address[] }>({
  namespace,
}: AddressFieldArrayProps<T>) {
  const { t } = useTranslation(namespace);
  const { control } = useFormContext<T>();
  const { fields, append, remove } = useFieldArray<T, ArrayPath<T>>({
    control,
    name: "addresses" as ArrayPath<T>,
  });

  return (
    <Grid container spacing={2}>
      {fields.map((field, index) => (
        <Grid key={field.id} container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            {/*@Todo: replace the input by a select or remove it according to backend*/}
            <FormTextInput<T>
              name={`addresses[${index}].type` as Path<T>}
              label={"Type"}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput<T>
              name={`addresses[${index}].street` as Path<T>}
              label={t("inputs.addresses.street.label")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput<T>
              name={`addresses.${index}.postalCode` as Path<T>}
              label={t("inputs.addresses.postalCode.label")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput<T>
              name={`addresses.${index}.city` as Path<T>}
              label={t("inputs.addresses.city.label")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormTextInput<T>
              name={`addresses.${index}.country` as Path<T>}
              label={t("inputs.addresses.country.label")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => remove(index)}
            >
              {t("actions.removeAddress")}
            </Button>
          </Grid>
        </Grid>
      ))}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Button
          variant="contained"
          onClick={() =>
            append({
              street: "",
              postalCode: "",
              city: "",
              country: "",
              type: "",
            } as unknown as FieldArray<T, ArrayPath<T>>)
          }
        >
          {t("actions.addAddress")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddressFieldArray;
