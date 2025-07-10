"use client";

import Button from "@mui/material/Button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
// use fluid container for create form
import PageContainer from "@/components/page-container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useRouter } from "next/navigation";
import { usePostCompanyService } from "@/services/api/services/companies";
import { Company } from "@/services/api/types/company";
import FormTextInput from "@/components/form/text-input/form-text-input";
import FormDatePickerInput from "@/components/form/date-pickers/date-picker";
import FormCheckboxBooleanInput from "@/components/form/checkbox-boolean/form-checkbox-boolean";
import AddressFieldArray from "../address-field-array";
import { RoleEnum } from "@/services/api/types/role";
import { InferType } from "yup";

const defaultValues = {
  name: "",
  legalForm: "",
  siren: "",
  siret: "",
  tvaNumber: "",
  creationDate: new Date(),
  isActive: false,
  email: "",
  phone: "",
  // website: "",
  // addresses: [
  //   {
  //     street: "",
  //     postalCode: "",
  //     city: "",
  //     country: "",
  //     type: ""
  //   },
  // ],
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-companies-create");

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
    // website: yup.string().required(),
    // addresses: yup
    //   .array()
    //   .of(
    //     yup.object({
    //       street: yup.string().required(),
    //       postalCode: yup.string().required(),
    //       city: yup.string().required(),
    //       country: yup.string().required(),
    //       type: yup.string().required()
    //     })
    //   )
    //   .required(),
  });
};

function CreateFormActions() {
  const { t } = useTranslation("admin-panel-companies-create");
  const { isSubmitting } = useFormState();

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

export function FormCreate({
  onSuccess,
  onCancel,
}: {
  onSuccess?: (company: Company) => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const fetchCreateCompany = usePostCompanyService();
  const { t } = useTranslation("admin-panel-companies-create");
  const validationSchema = useValidationSchema();
  type CreateFormData = InferType<typeof validationSchema>;

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<CreateFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const { data, status } = await fetchCreateCompany(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      console
        .log(data)(Object.keys(data.errors) as Array<keyof CreateFormData>)
        .forEach((key) => {
          setError(key, {
            type: "manual",
            message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
          });
        });
      return;
    }

    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
      if (onSuccess) {
        onSuccess(data);
      } else {
        router.push("/admin-panel/companies");
      }
    }
    if (status === HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR) {
      enqueueSnackbar(t("alerts.error"), {
        variant: "error",
      });
    }
  });

  return (
    <FormProvider {...methods}>
      <PageContainer>
        <Grid paddingTop={4} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Typography variant="h6">{t("title")}</Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid component="div" container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12 }}>
              <FormCheckboxBooleanInput<CreateFormData>
                name="isActive"
                label={t("inputs.isActive.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<CreateFormData>
                name="name"
                label={t("inputs.name.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<CreateFormData>
                name="legalForm"
                label={t("inputs.legalForm.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<CreateFormData>
                name="siren"
                label={t("inputs.siren.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<CreateFormData>
                name="siret"
                label={t("inputs.siret.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<CreateFormData>
                name="tvaNumber"
                label={t("inputs.tvaNumber.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormDatePickerInput<CreateFormData>
                name="creationDate"
                label={t("inputs.creationDate.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<CreateFormData>
                name="email"
                label={t("inputs.email.label")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <FormTextInput<CreateFormData>
                name="phone"
                label={t("inputs.phone.label")}
              />
            </Grid>

            {/*<Grid size={{ xs: 12, sm: 6, lg: 4 }}>*/}
            {/*  <FormTextInput<CreateFormData>*/}
            {/*    name="website"*/}
            {/*    label={t("inputs.website.label")}*/}
            {/*  />*/}
            {/*</Grid>*/}

            {/*<Grid size={{ xs: 12 }}>*/}
            {/*  <AddressFieldArray<CreateFormData> namespace="admin-panel-companies-create" />*/}
            {/*</Grid>*/}

            <Grid size={{ xs: 12 }}>
              <CreateFormActions />
              <Box ml={1} component="span">
                {onCancel ? (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={onCancel}
                  >
                    {t("actions.cancel")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="inherit"
                    LinkComponent={Link}
                    href="/admin-panel/companies"
                  >
                    {t("actions.cancel")}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </PageContainer>
    </FormProvider>
  );
}

function CreateCompany() {
  return <FormCreate />;
}

export default withPageRequiredAuth(CreateCompany, { roles: [RoleEnum.ADMIN] });
