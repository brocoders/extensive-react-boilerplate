"use client";

import { useAuthFacebookLoginService } from "@/services/api/services/auth";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import { useState } from "react";
import { FullPageLoader } from "@/components/full-page-loader";
import Button from "@mui/material/Button";
import useFacebookAuth from "./use-facebook-auth";
import { useTranslation } from "@/services/i18n/client";

export default function FacebookAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const authFacebookLoginService = useAuthFacebookLoginService();
  const facebook = useFacebookAuth();
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      const loginResponse = await facebook.login();
      if (!loginResponse.authResponse) return;

      setIsLoading(true);

      const { status, data } = await authFacebookLoginService({
        accessToken: loginResponse.authResponse.accessToken,
      });

      if (status === HTTP_CODES_ENUM.OK) {
        setTokensInfo({
          token: data.token,
          refreshToken: data.refreshToken,
          tokenExpires: data.tokenExpires,
        });
        setUser(data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={onLogin}>
        {t("common:auth.facebook.action")}
      </Button>
      <FullPageLoader isLoading={isLoading} />
    </>
  );
}
