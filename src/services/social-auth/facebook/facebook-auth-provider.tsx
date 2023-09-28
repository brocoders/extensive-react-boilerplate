"use client";

import { useCallback, useEffect, useMemo } from "react";
import { FacebookAuthLoginResponse, FacebookContext } from "./facebook-context";
import { facebookAppId, isFacebookAuthEnabled } from "./facebook-config";
import { languages } from "@/services/i18n/config";
import useLanguage from "@/services/i18n/use-language";

type FacebookAuthProviderProps = {
  children: React.ReactNode;
};

type LanguageCode = (typeof languages)[number];

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (callback: (response: FacebookAuthLoginResponse) => void) => void;
    };
  }
}

// Add new languages here
const languageToCode: Record<LanguageCode, string> = {
  en: "en_US",
};

const useCodeFromLanguage = () => {
  const languageOrCode = useLanguage();
  const language = languageOrCode
    .replace("_", "-")
    .split("-")[0] as LanguageCode;

  return languageToCode[language] || languageToCode.en;
};

function FacebookProvider({ children }: FacebookAuthProviderProps) {
  const code = useCodeFromLanguage();

  useEffect(() => {
    window.fbAsyncInit = function () {
      if (facebookAppId) {
        window.FB.init({
          appId: facebookAppId,
          cookie: true,
          xfbml: true,
          version: "v11.0",
        });
      } else {
        throw Error("Facebook App ID not found");
      }
    };

    const scriptTag = document.createElement("script");
    scriptTag.src = `https://connect.facebook.net/${code}/sdk.js`;
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.crossOrigin = "anonymous";

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [code]);

  const login = useCallback(() => {
    return new Promise<FacebookAuthLoginResponse>((resolve, reject) => {
      window.FB.login((response) => {
        if (response.authResponse) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }, []);

  const valueContext = useMemo(() => ({ login }), [login]);

  return (
    <FacebookContext.Provider value={valueContext}>
      {children}
    </FacebookContext.Provider>
  );
}

export default function FacebookAuthProvider({
  children,
}: FacebookAuthProviderProps) {
  return isFacebookAuthEnabled ? (
    <FacebookProvider>{children}</FacebookProvider>
  ) : (
    children
  );
}
