"use client";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { useForm, FormProvider, useFormState } from "react-hook-form";
// container full width with responsive spacing
import PageContainer from "@/components/page-container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import FormAvatarInput from "@/components/form/avatar-input/form-avatar-input";
import { FileEntity } from "@/services/api/types/file-entity";
import useLeavePage from "@/services/leave-page/use-leave-page";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { usePostUserService } from "@/services/api/services/users";
import { useGetCompaniesService } from "@/services/api/services/companies";
import { Company } from "@/services/api/types/company";
import { User } from "@/services/api/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Role, RoleEnum } from "@/services/api/types/role";
import FormSelectInput from "@/components/form/select/form-select";
import FormPhoneInput from "@/components/form/phone-input/form-phone-input";
import FormCheckboxBooleanInput from "@/components/form/checkbox-boolean/form-checkbox-boolean";
import { FormCreate as CreateCompanyForm } from "@/app/[language]/admin-panel/companies/create/page-content";

const serviceOptions = [
  { id: "Management" },
  { id: "Sales" },
  { id: "Accounting" },
  { id: "Customer Relations" },
  { id: "Operations" },
  { id: "Procurement" },
  { id: "Retail" },
  { id: "Support" },
];

type CreateFormData = {
  email: string;
  firstName: string;
  lastName: string;
  // password: string;
  // passwordConfirmation: string;
  photo?: FileEntity;
  role: Role;
  company: { id: string | number; name?: string | null };
  service?: string;
  job?: string;
  phone?: string;
  enabled: boolean;
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-users-create");

  return yup.object().shape({
    email: yup
      .string()
      .email(t("admin-panel-users-create:inputs.email.validation.invalid"))
      .required(
        t("admin-panel-users-create:inputs.firstName.validation.required")
      ),
    firstName: yup
      .string()
      .required(
        t("admin-panel-users-create:inputs.firstName.validation.required")
      ),
    lastName: yup
      .string()
      .required(
        t("admin-panel-users-create:inputs.lastName.validation.required")
      ),
    // password: yup
    //   .string()
    //   .min(6, t("admin-panel-users-create:inputs.password.validation.min"))
    //   .required(
    //     t("admin-panel-users-create:inputs.password.validation.required")
    //   ),
    // passwordConfirmation: yup
    //   .string()
    //   .oneOf(
    //     [yup.ref("password")],
    //     t(
    //       "admin-panel-users-create:inputs.passwordConfirmation.validation.match"
    //     )
    //   )
    //   .required(
    //     t(
    //       "admin-panel-users-create:inputs.passwordConfirmation.validation.required"
    //     )
    //   ),
    role: yup
      .object()
      .shape({
        id: yup.mixed<string | number>().required(),
        name: yup.string(),
      })
      .required(t("admin-panel-users-create:inputs.role.validation.required")),
    company: yup
      .object()
      .shape({
        id: yup.mixed<string | number>().required(),
        name: yup.string().nullable().notRequired(),
      })
      .required(
        t("admin-panel-users-create:inputs.company.validation.required")
      ),
    // service: yup.string().optional(),
    // job: yup.string().optional(),
    // phone: yup.string().optional(),
    enabled: yup.boolean().required(),
  });
};

function CreateUserFormActions() {
  const { t } = useTranslation("admin-panel-users-create");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
    >
      {t("admin-panel-users-create:actions.submit")}
    </Button>
  );
}

export function FormCreateUser({
  onSuccess,
  onCancel,
}: {
  onSuccess?: (user: User) => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const fetchPostUser = usePostUserService();
  const fetchCompanies = useGetCompaniesService();
  const { t } = useTranslation("admin-panel-users-create");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loadCompanies = useCallback(async () => {
    const { status, data } = await fetchCompanies({ page: 1, limit: 50 });
    if (status === HTTP_CODES_ENUM.OK) {
      setCompanies(data.data);
    }
  }, [fetchCompanies]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const methods = useForm<CreateFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      // password: "",
      // passwordConfirmation: "",
      role: {
        id: RoleEnum.USER,
        name: undefined,
      },
      photo: undefined,
      company: { id: "", name: "" },
      service: undefined,
      job: "",
      phone: "",
      enabled: false,
    },
  });

  const { handleSubmit, setError, setValue } = methods;

  const handleDrawerClose = () => setDrawerOpen(false);

  const handleCompanyCreated = async (company: Company) => {
    await loadCompanies();
    setValue("company.id", company.id);
    setValue("company.name", company.name);
    handleDrawerClose();
  };

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchPostUser(formData);
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof CreateFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-users-create:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar(t("admin-panel-users-create:alerts.user.success"), {
        variant: "success",
      });
      if (onSuccess) {
        onSuccess(data);
      } else {
        router.push("/admin-panel/users");
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <PageContainer sx={{ maxWidth: 400 }}>
        <form onSubmit={onSubmit} autoComplete="create-new-user">
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">
                {t("admin-panel-users-create:title")}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormAvatarInput<CreateFormData> name="photo" testId="photo" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormCheckboxBooleanInput<CreateFormData>
                name="enabled"
                label={t("admin-panel-users-create:inputs.enabled.label")}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="email"
                testId="new-user-email"
                autoComplete="new-user-email"
                label={t("admin-panel-users-create:inputs.email.label")}
              />
            </Grid>

            {/*<Grid size={{ xs: 12 }}>*/}
            {/*  <FormTextInput<CreateFormData>*/}
            {/*    name="password"*/}
            {/*    type="password"*/}
            {/*    testId="new-user-password"*/}
            {/*    autoComplete="new-user-password"*/}
            {/*    label={t("admin-panel-users-create:inputs.password.label")}*/}
            {/*  />*/}
            {/*</Grid>*/}

            {/*<Grid size={{ xs: 12 }}>*/}
            {/*  <FormTextInput<CreateFormData>*/}
            {/*    name="passwordConfirmation"*/}
            {/*    testId="new-user-password-confirmation"*/}
            {/*    label={t(*/}
            {/*      "admin-panel-users-create:inputs.passwordConfirmation.label"*/}
            {/*    )}*/}
            {/*    type="password"*/}
            {/*  />*/}
            {/*</Grid>*/}

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="firstName"
                testId="first-name"
                label={t("admin-panel-users-create:inputs.firstName.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="lastName"
                testId="last-name"
                label={t("admin-panel-users-create:inputs.lastName.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormSelectInput<CreateFormData, Pick<Role, "id">>
                name="role"
                testId="role"
                label={t("admin-panel-users-create:inputs.role.label")}
                options={[
                  {
                    id: RoleEnum.ADMIN,
                  },
                  {
                    id: RoleEnum.USER,
                  },
                ]}
                keyValue="id"
                renderOption={(option) =>
                  t(`admin-panel-users-create:inputs.role.options.${option.id}`)
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormSelectInput<CreateFormData, Company>
                name="company"
                label={t("admin-panel-users-create:inputs.company.label")}
                options={companies}
                keyValue="id"
                renderOption={(option) => option.name}
              />
              <Button
                sx={{ ml: 1 }}
                size="small"
                onClick={() => setDrawerOpen(true)}
              >
                {t("admin-panel-users-create:actions.createCompany")}
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormSelectInput<CreateFormData, { id: string }>
                name="service"
                label={t("admin-panel-users-create:inputs.service.label")}
                options={serviceOptions}
                keyValue="id"
                renderOption={(option) =>
                  t(
                    `admin-panel-users-create:inputs.service.options.${option.id}`
                  )
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="job"
                label={t("admin-panel-users-create:inputs.job.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormPhoneInput<CreateFormData>
                className={"w-full"}
                name="phone"
                label={t("admin-panel-users-create:inputs.phone.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CreateUserFormActions />
              <Box ml={1} component="span">
                {onCancel ? (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={onCancel}
                  >
                    {t("admin-panel-users-create:actions.cancel")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="inherit"
                    LinkComponent={Link}
                    href="/admin-panel/users"
                  >
                    {t("admin-panel-users-create:actions.cancel")}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </PageContainer>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { width: "50vw" } }}
      >
        <CreateCompanyForm
          onSuccess={handleCompanyCreated}
          onCancel={handleDrawerClose}
        />
      </Drawer>
    </FormProvider>
  );
}

function CreateUser() {
  return <FormCreateUser />;
}

export default withPageRequiredAuth(CreateUser);
