---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
---
"use client";

import {
  // React dependencies here
  useEffect
} from "react";
import Button from "@mui/material/Button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import useLeavePage from "@/services/leave-page/use-leave-page";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useParams, useRouter } from "next/navigation";
import { useEdit<%= name %>Service } from "@/services/api/services/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>";
import { useGet<%= name %>Query } from "../../queries/queries";

type EditFormData = {
  // types here
};

const defaultValues: EditFormData = {
  // default values here
};

const useValidationSchema = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-edit");

  return yup.object().shape({
    // Do not remove this comment. <edit-form-validation-schema />
  });
};

// Do not remove this comment. <edit-component-reference-field />

function EditFormActions() {
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-edit");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="submit-button"
    >
      {t("actions.submit")}
    </Button>
  );
}

function FormEdit() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const entityId = params.id;
  const fetchEdit<%= name %> = useEdit<%= name %>Service();
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-edit");
  const validationSchema = useValidationSchema();
  const { data: initialData } = useGet<%= name %>Query({ id: entityId });

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formData
  ) => {
    const { data, status } = await fetchEdit<%= name %>({
      id: entityId,
      data: {
        // Do not remove this comment. <edit-form-submit-property />
      },
    });

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof EditFormData>).forEach((key) => {
        setError(key, {
          type: "manual",
          message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
        });
      });
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
      router.push("/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>");
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        // Do not remove this comment. <edit-form-reset-property />
      });
    }
  }, [initialData, reset]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">{t("title")}</Typography>
            </Grid>

            {/* Do not remove this comment. <edit-component-field />  */}

            <Grid size={{ xs: 12 }}>
              <EditFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>"
                >
                  {t("actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function Edit() {
  return <FormEdit />;
}

export default withPageRequiredAuth(Edit);
