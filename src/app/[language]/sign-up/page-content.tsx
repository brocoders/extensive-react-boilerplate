"use client";
import Button from "@mui/material/Button";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import {
  useAuthLoginService,
  useAuthSignUpService,
} from "@/services/api/services/auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextInput from "@/components/form/text-input/form-text-input";
import FormCheckboxInput from "@/components/form/checkbox/form-checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "@/components/link";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import SocialAuth from "@/services/social-auth/social-auth";
import { isGoogleAuthEnabled } from "@/services/social-auth/google/google-config";
import { isFacebookAuthEnabled } from "@/services/social-auth/facebook/facebook-config";

type TPolicy = {
  id: string;
  name: string;
};

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  policy: TPolicy[];
};

const useValidationSchema = () => {
  const { t } = useTranslation("sign-up");

  return yup.object().shape({
    firstName: yup
      .string()
      .required(t("sign-up:inputs.firstName.validation.required")),
    lastName: yup
      .string()
      .required(t("sign-up:inputs.lastName.validation.required")),
    email: yup
      .string()
      .email(t("sign-up:inputs.email.validation.invalid"))
      .required(t("sign-up:inputs.email.validation.required")),
    password: yup
      .string()
      .min(6, t("sign-up:inputs.password.validation.min"))
      .required(t("sign-up:inputs.password.validation.required")),
    policy: yup
      .array()
      .min(1, t("sign-up:inputs.policy.validation.required"))
      .required(),
  });
};

function FormActions() {
  const { t } = useTranslation("sign-up");
  const { isSubmitting } = useFormState();

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="sign-up-submit"
    >
      {t("sign-up:actions.submit")}
    </Button>
  );
}

function Form() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();
  const fetchAuthSignUp = useAuthSignUpService();
  const { t } = useTranslation("sign-up");
  const validationSchema = useValidationSchema();
  const policyOptions = [
    { id: "policy", name: t("sign-up:inputs.policy.agreement") },
  ];

  const methods = useForm<SignUpFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      policy: [],
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data: dataSignUp, status: statusSignUp } =
      await fetchAuthSignUp(formData);

    if (statusSignUp === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(dataSignUp.errors) as Array<keyof SignUpFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `sign-up:inputs.${key}.validation.server.${dataSignUp.errors[key]}`
            ),
          });
        }
      );

      return;
    }

    const { data: dataSignIn, status: statusSignIn } = await fetchAuthLogin({
      email: formData.email,
      password: formData.password,
    });

    if (statusSignIn === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: dataSignIn.token,
        refreshToken: dataSignIn.refreshToken,
        tokenExpires: dataSignIn.tokenExpires,
      });
      setUser(dataSignIn.user);
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="xs">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">{t("sign-up:title")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="firstName"
                label={t("sign-up:inputs.firstName.label")}
                type="text"
                autoFocus
                testId="first-name"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="lastName"
                label={t("sign-up:inputs.lastName.label")}
                type="text"
                testId="last-name"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="email"
                label={t("sign-up:inputs.email.label")}
                type="email"
                testId="email"
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextInput<SignUpFormData>
                name="password"
                label={t("sign-up:inputs.password.label")}
                type="password"
                testId="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormCheckboxInput
                name="policy"
                label=""
                testId="privacy"
                options={policyOptions}
                keyValue="id"
                keyExtractor={(option) => option.id.toString()}
                renderOption={(option) => (
                  <span>
                    {option.name}
                    <MuiLink href="/privacy-policy" target="_blank">
                      {t("sign-up:inputs.policy.label")}
                    </MuiLink>
                  </span>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  data-testid="login"
                  href="/sign-in"
                >
                  {t("sign-up:actions.accountAlreadyExists")}
                </Button>
              </Box>
            </Grid>

            {[isGoogleAuthEnabled, isFacebookAuthEnabled].some(Boolean) && (
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }}>
                  <Chip label={t("sign-up:or")} />
                </Divider>

                <SocialAuth />
              </Grid>
            )}
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function SignUp() {
  return <Form />;
}

export default withPageRequiredGuest(SignUp);
