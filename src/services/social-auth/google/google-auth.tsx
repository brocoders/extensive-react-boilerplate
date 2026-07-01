"use client";

import { useAuthGoogleLoginService } from "@/services/api/services/auth";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { FullPageLoader } from "@/components/full-page-loader";

// Google Identity Services caps the rendered button width at 400px.
const GOOGLE_BUTTON_MAX_WIDTH = 400;

export default function GoogleAuth() {
  const { setUser } = useAuthActions();
  const { setTokensInfo } = useAuthTokens();
  const authGoogleLoginService = useAuthGoogleLoginService();
  const [isLoading, setIsLoading] = useState(false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      setWidth(Math.min(element.offsetWidth, GOOGLE_BUTTON_MAX_WIDTH));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const onSuccess = async (tokenResponse: CredentialResponse) => {
    if (!tokenResponse.credential) return;

    setIsLoading(true);

    const { status, data } = await authGoogleLoginService({
      idToken: tokenResponse.credential,
    });

    if (status === HTTP_CODES_ENUM.OK) {
      setTokensInfo({
        token: data.token,
        refreshToken: data.refreshToken,
        tokenExpires: data.tokenExpires,
      });
      setUser(data.user);
    }
    setIsLoading(false);
  };

  const isReady = mounted && width > 0 && resolvedTheme !== undefined;
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <div ref={containerRef} className="w-full min-h-10 [color-scheme:light]">
        {isReady && (
          <GoogleLogin
            key={`${resolvedTheme}-${width}`}
            onSuccess={onSuccess}
            theme={isDark ? "filled_black" : "outline"}
            width={String(width)}
          />
        )}
      </div>
      <FullPageLoader isLoading={isLoading} />
    </>
  );
}
