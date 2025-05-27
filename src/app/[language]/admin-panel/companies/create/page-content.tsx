"use client";

import Button from "@mui/material/Button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
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
import FormTextInput from "@/components/form/text-input/form-text-input";
import { RoleEnum } from "@/services/api/types/role";

type CreateFormData = {
  name: string;
  address: string;
};

const defaultValues: CreateFormData = {
  name: "",
  address: "",
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-companies-create");

  return yup.object().shape({
    name: yup.string().required(t("inputs.name.validation.required")),
    address: yup.string().required(t("inputs.address.validation.required")),
  });
};

function CreateFormActions() {
  const { t } = useTranslation("admin-panel-companies-create");
  const { isSubmitting } = useFormState();
  // const { isSubmitting, isDirty } = useFormState();

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

function FormCreate() {
  const router = useRouter();
  const fetchCreateCompany = usePostCompanyService();
  const { t } = useTranslation("admin-panel-companies-create");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<CreateFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchCreateCompany(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof CreateFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
          });
        }
      );

      return;
    }

    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
      router.push("/admin-panel/companies");
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <Grid component="div" container spacing={2} mb={3} mt={3}>
            <Grid component="div" item xs={12}>
              <Typography variant="h6">{t("title")}</Typography>
            </Grid>

            <Grid item xs={12} component="div">
              <FormTextInput<CreateFormData>
                name="name"
                label={t("inputs.name.label")}
              />
            </Grid>

            <Grid item xs={12} component="div">
              <FormTextInput<CreateFormData>
                name="address"
                label={t("inputs.address.label")}
              />
            </Grid>

            <Grid item xs={12} component="div">
              <CreateFormActions />
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

function CreateCompany() {
  return <FormCreate />;
}

export default withPageRequiredAuth(CreateCompany, { roles: [RoleEnum.ADMIN] });
