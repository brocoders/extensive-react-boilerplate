"use client";

import { ReactNode } from "react";
import { ReactKeycloakProvider as OriginalProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";

import type { KeycloakInstance } from "keycloak-js";
import { keycloakConfig } from "./keycloak-config";
import useAuthActions from "@/services/auth/use-auth-actions";
import { User } from "@/services/api/types/user";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactKeycloakProvider = OriginalProvider as any; // Type assertion

const keycloak: KeycloakInstance = new Keycloak(keycloakConfig);

type KeycloakTokenParsed = {
  sub?: string;
  email?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional properties
};

type ParsedToken = KeycloakTokenParsed & {
  email?: string;

  preferred_username?: string;

  given_name?: string;

  family_name?: string;
};
export default function KeycloakAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { setUser /* , setAuthMethod */ } = useAuthActions();
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "check-sso", pkceMethod: "S256" }}
      onEvent={(event: string) => {
        if (event === "onAuthSuccess") {
          const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;

          const userInfo = {
            username: parsedToken?.preferred_username,
            email: parsedToken?.email,
            firstName: parsedToken?.given_name,
            lastName: parsedToken?.family_name,
            id: parsedToken?.sub,
            // photo?: FileEntity;
            // provider?: UserProviderEnum;
            // socialId?: string;
            roles: parsedToken?.resource_access?.account?.roles,
          };
          setUser(userInfo as User); // Sync user to AuthProvider
        }
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
