"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextInput from "@/components/form/text-input/form-text-input";
import { useTranslation } from "@/services/i18n/client";
import { FC } from "react";

export type SimpleUser = { id: number; firstName: string; lastName: string };

type Props = {
  onSuccess?: (user: SimpleUser) => void;
  onCancel?: () => void;
};

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const CreateUserForm: FC<Props> = ({ onSuccess, onCancel }) => {
  const { t } = useTranslation("admin-panel-users-create");

  const methods = useForm<{ firstName: string; lastName: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: { firstName: "", lastName: "" },
  });

  const { handleSubmit, setError } = methods;
  const { isSubmitting } = useFormState({ control: methods.control });

  const submit = handleSubmit(async (data) => {
    try {
      const newUser: SimpleUser = {
        id: Date.now(),
        firstName: data.firstName,
        lastName: data.lastName,
      };
      onSuccess?.(newUser);
    } catch (e) {
      setError("firstName", { type: "manual", message: String(e) });
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>
        <Grid container spacing={2} p={2} width={{ xs: "80vw", sm: "50vw" }}>
          <Grid item xs={12}>
            <FormTextInput
              name="firstName"
              label={t("inputs.firstName.label") || "First Name"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextInput
              name="lastName"
              label={t("inputs.lastName.label") || "Last Name"}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", gap: 1 }}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {t("actions.submit")}
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t("actions.cancel")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default CreateUserForm;
