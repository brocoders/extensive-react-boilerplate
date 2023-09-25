"use client";

import GoogleSignIn from "./google/google-auth";
import { isGoogleAuthEnabled } from "./google/google-config";

export default function SocialAuth() {
  return <>{isGoogleAuthEnabled && <GoogleSignIn />}</>;
}
