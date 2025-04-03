// keycloak-auth.tsx
"use client";

import { useKeycloak } from "@react-keycloak/web";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import useAuthActions from "@/services/auth/use-auth-actions";
import { User } from "@/services/api/types/user";
import Box from "@mui/material/Box";

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

export const Default_Org =
  process.env.NEXT_PUBLIC_DEFAULT_ORGANIZATION ?? "SakaTaka";
export default function KeycloakAuth() {
  const { keycloak } = useKeycloak();
  const { setUser } = useAuthActions();

  useEffect(() => {
    if (keycloak.authenticated) {
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
  }, [keycloak.authenticated, keycloak.tokenParsed, setUser]);

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={
        <Box
          component="img"
          src="/images/keycloak-logo.png" // Add your logo path
          alt="Keycloak logo"
          sx={{
            width: 20,
            height: 20,
            mr: 1,
          }}
        />
      }
      sx={{
        height: 40,
        backgroundColor: "white",
        color: "#444",
        borderColor: "#ddd",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#f8f9fa",
          borderColor: "#ccc",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        "&:active": {
          backgroundColor: "#f1f3f4",
        },
      }}
      onClick={() => keycloak.login()}
    >
      Sign in with {Default_Org}
    </Button>
  );
}
