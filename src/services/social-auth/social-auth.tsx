"use client";

import FacebookAuth from "./facebook/facebook-auth";
import { isFacebookAuthEnabled } from "./facebook/facebook-config";
import GoogleAuth from "./google/google-auth";
import { isGoogleAuthEnabled } from "./google/google-config";

export default function SocialAuth() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
      {isGoogleAuthEnabled && (
        <div className="w-full">
          <GoogleAuth />
        </div>
      )}
      {isFacebookAuthEnabled && (
        <div className="w-full">
          <FacebookAuth />
        </div>
      )}
    </div>
  );
}
