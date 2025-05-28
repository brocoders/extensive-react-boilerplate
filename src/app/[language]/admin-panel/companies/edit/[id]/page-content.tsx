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
import FormDatePickerInput from "@/components/form/date-pickers/date-picker";
import FormCheckboxBooleanInput from "@/components/form/checkbox-boolean/form-checkbox-boolean";
import AddressFieldArray from "../../address-field-array";
import { RoleEnum } from "@/services/api/types/role";
import { InferType } from "yup";

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-companies-edit");

  return yup.object().shape({
    name: yup.string().required(t("inputs.name.validation.required")),
    legalForm: yup.string().required(),
    siren: yup.string().required(),
    siret: yup.string().required(),
    tvaNumber: yup.string().required(),
    creationDate: yup.date().required(),
    isActive: yup.boolean().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    website: yup.string().required(),
    addresses: yup
      .array()
      .of(
        yup.object({
          street: yup.string().required(),
          postalCode: yup.string().required(),
          city: yup.string().required(),
          country: yup.string().required(),
        })
      )
      .required(),
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
  type EditFormData = InferType<typeof validationSchema>;
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      legalForm: "",
      siren: "",
      siret: "",
      tvaNumber: "",
      creationDate: new Date(),
      isActive: false,
      email: "",
      phone: "",
      website: "",
      addresses: [],
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
          legalForm: data?.legalForm ?? "",
          siren: data?.siren ?? "",
          siret: data?.siret ?? "",
          tvaNumber: data?.tvaNumber ?? "",
          creationDate: data?.creationDate
            ? new Date(data.creationDate)
            : new Date(),
          isActive: data?.isActive ?? false,
          email: data?.email ?? "",
          phone: data?.phone ?? "",
          website: data?.website ?? "",
          addresses: data?.addresses ?? [],
        });
      }
    };

    getInitialData();
  }, [companyId, reset, fetchGetCompany]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <Grid pt={4} size={12}>
          <Typography variant="h6">{t("title")}</Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="name"
                label={t("inputs.name.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="legalForm"
                label={t("inputs.legalForm.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="siren"
                label={t("inputs.siren.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="siret"
                label={t("inputs.siret.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="tvaNumber"
                label={t("inputs.tvaNumber.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
              <FormDatePickerInput<EditFormData>
                name="creationDate"
                label={t("inputs.creationDate.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 2, lg: 1 }}>
              <FormCheckboxBooleanInput<EditFormData>
                name="isActive"
                label={t("inputs.isActive.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="email"
                label={t("inputs.email.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="phone"
                label={t("inputs.phone.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<EditFormData>
                name="website"
                label={t("inputs.website.label")}
              />
            </Grid>

            <Grid size={12}>
              <AddressFieldArray<EditFormData> namespace="admin-panel-companies-edit" />
            </Grid>

            <Grid size={12}>
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
