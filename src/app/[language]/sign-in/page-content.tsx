"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { useAuthLoginService } from "@/services/api/services/auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "@/components/link";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import SocialAuth from "@/services/social-auth/social-auth";
import { isGoogleAuthEnabled } from "@/services/social-auth/google/google-config";
import { isFacebookAuthEnabled } from "@/services/social-auth/facebook/facebook-config";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

type SignInFormData = {
  email: string;
  password: string;
};

const useValidationSchema = () => {
  const { t } = useTranslation("sign-in");

  return yup.object().shape({
    email: yup
      .string()
      .email(t("sign-in:inputs.email.validation.invalid"))
      .required(t("sign-in:inputs.email.validation.required")),
    password: yup
      .string()
      .min(6, t("sign-in:inputs.password.validation.min"))
      .required(t("sign-in:inputs.password.validation.required")),
  });
};

function FormActions() {
  const { t } = useTranslation("sign-in");
  const { isSubmitting } = useFormState();

  return (
    <Button type="submit" disabled={isSubmitting} data-testid="sign-in-submit">
      {t("sign-in:actions.submit")}
    </Button>
  );
}

function Form() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const fetchAuthLogin = useAuthLoginService();
  const { t } = useTranslation("sign-in");
  const validationSchema = useValidationSchema();

  const methods = useForm<SignInFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchAuthLogin(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof SignInFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `sign-in:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );

      return;
    }

    if (status === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-md px-4">
        <form onSubmit={onSubmit}>
          <div className="mb-4 grid grid-cols-12 gap-4">
            <div className="col-span-12 mt-6">
              <h1 className="text-xl font-semibold">{t("sign-in:title")}</h1>
            </div>
            <div className="col-span-12">
              <FormTextInput<SignInFormData>
                name="email"
                label={t("sign-in:inputs.email.label")}
                type="email"
                testId="email"
                autoFocus
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<SignInFormData>
                name="password"
                label={t("sign-in:inputs.password.label")}
                type="password"
                testId="password"
              />
            </div>
            <div className="col-span-12">
              <Link
                href="/forgot-password"
                data-testid="forgot-password"
                className="text-sm text-primary underline-offset-4 underline"
              >
                {t("sign-in:actions.forgotPassword")}
              </Link>
            </div>

            <div className="col-span-12">
              <FormActions />

              {IS_SIGN_UP_ENABLED && (
                <span className="ms-2">
                  <Button
                    asChild
                    variant="secondary"
                    data-testid="create-account"
                  >
                    <Link href="/sign-up">
                      {t("sign-in:actions.createAccount")}
                    </Link>
                  </Button>
                </span>
              )}
            </div>

            {[isGoogleAuthEnabled, isFacebookAuthEnabled].some(Boolean) && (
              <div className="col-span-12">
                <div className="mb-4 flex items-center gap-2">
                  <Separator className="flex-1" />
                  <span className="rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {t("sign-in:or")}
                  </span>
                  <Separator className="flex-1" />
                </div>

                <div className="flex flex-col items-center gap-2 w-full">
                  <SocialAuth />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function SignIn() {
  return <Form />;
}

export default withPageRequiredGuest(SignIn);
