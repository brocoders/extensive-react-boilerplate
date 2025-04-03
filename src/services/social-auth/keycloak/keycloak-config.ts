// src/services/social-auth/keycloak/keycloak-config.ts
export const isKeycloakAuthEnabled =
  process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_ENABLED === "true";

export const keycloakConfig = {
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL!,
};
