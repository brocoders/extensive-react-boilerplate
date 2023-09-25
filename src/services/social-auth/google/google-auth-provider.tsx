"use client";

import { GoogleOAuthProvider as GoogleProvider } from "@react-oauth/google";
import { isGoogleAuthEnabled, googleClientId } from "./google-config";

function GoogleOAuthProvider({ children }: { children: React.ReactNode }) {
  return isGoogleAuthEnabled && googleClientId ? (
    <GoogleProvider clientId={googleClientId}>{children}</GoogleProvider>
  ) : (
    children
  );
}

export default GoogleOAuthProvider;
