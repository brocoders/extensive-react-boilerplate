"use client";

import Grid from "@mui/material/Grid2";
import FacebookAuth from "./facebook/facebook-auth";
import { isFacebookAuthEnabled } from "./facebook/facebook-config";
import GoogleAuth from "./google/google-auth";
import { isGoogleAuthEnabled } from "./google/google-config";
import KeycloakAuth from "./keycloak/keycloak-auth";
import { isKeycloakAuthEnabled } from "./keycloak/keycloak-config";

export default function SocialAuth() {
  return (
    <Grid container spacing={2}>
      {isKeycloakAuthEnabled && (
        <Grid sx={{ xs: 12 }}>
          <KeycloakAuth />
        </Grid>
      )}
      {isGoogleAuthEnabled && (
        <Grid sx={{ xs: 12 }}>
          <GoogleAuth />
        </Grid>
      )}
      {isFacebookAuthEnabled && (
        <Grid sx={{ xs: 12 }}>
          <FacebookAuth />
        </Grid>
      )}
    </Grid>
  );
}
