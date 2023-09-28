"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { isGoogleAuthEnabled, googleClientId } from "./google-config";

function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return isGoogleAuthEnabled && googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  ) : (
    children
  );
}

export default GoogleAuthProvider;
