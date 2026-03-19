"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { isGoogleAuthEnabled, googleClientId } from "./google-config";
import useLanguage from "@/services/i18n/use-language";

function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguage();

  return isGoogleAuthEnabled && googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId} locale={language}>
      {children}
    </GoogleOAuthProvider>
  ) : (
    children
  );
}

export default GoogleAuthProvider;
