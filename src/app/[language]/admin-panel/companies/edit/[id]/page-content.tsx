"use client";

import Button from "@mui/material/Button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useEffect } from "react";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import {
  useGetCompanyService,
  usePatchCompanyService,
} from "@/services/api/services/companies";
import { useParams } from "next/navigation";
import FormTextInput from "@/components/form/text-input/form-text-input";
import { RoleEnum } from "@/services/api/types/role";

type EditFormData = {
  name: string;
  address?: string;
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-companies-edit");

  return yup.object().shape({
    name: yup.string().required(t("inputs.name.validation.required")),
    address: yup.string().optional(),
  });
};

function EditFormActions() {
  const { t } = useTranslation("admin-panel-companies-edit");
  const { isSubmitting } = useFormState();
  // const { isSubmitting, isDirty } = useFormState();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("actions.submit")}
    </Button>
  );
}

function FormEditCompany() {
  const params = useParams<{ id: string }>();
  const companyId = params.id;
  const fetchGetCompany = useGetCompanyService();
  const fetchPatchCompany = usePatchCompanyService();
  const { t } = useTranslation("admin-panel-companies-edit");
  const validationSchema = useValidationSchema();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchPatchCompany({
      id: companyId,
      data: formData,
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
      reset(formData);
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
    }
  });

  useEffect(() => {
    const getInitialData = async () => {
      const { status, data } = await fetchGetCompany({ id: companyId });

      if (status === HTTP_CODES_ENUM.OK) {
        reset({
          name: data?.name ?? "",
          address: data?.address ?? "",
        });
      }
    };

    getInitialData();
  }, [companyId, reset, fetchGetCompany]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t("title")}</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditFormData>
                name="name"
                label={t("inputs.name.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<EditFormData>
                name="address"
                label={t("inputs.address.label")}
              />
            </Grid>

            <Grid item xs={12}>
              <EditFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/companies"
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

function EditCompany() {
  return <FormEditCompany />;
}

export default withPageRequiredAuth(EditCompany, { roles: [RoleEnum.ADMIN] });
