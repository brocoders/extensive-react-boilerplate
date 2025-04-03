"use client";

import { Tokens } from "@/services/api/types/tokens";
import { User } from "@/services/api/types/user";
import { createContext } from "react";

export type AuthMethod = "local" | "keycloak" | null;
export type TokensInfo = Tokens | null;

export const AuthContext = createContext<{
  user: User | null;
  isLoaded: boolean;
  authMethod: AuthMethod;
}>({
  user: null,
  isLoaded: false,
  authMethod: null,
});

export const AuthActionsContext = createContext<{
  setUser: (user: User | null) => void;
  logOut: () => Promise<void>;
  setAuthMethod: (method: AuthMethod) => void;
}>({
  setUser: () => {},
  logOut: async () => {},
  setAuthMethod: () => {},
});

export const AuthTokensContext = createContext<{
  setTokensInfo: (
    tokensInfo: TokensInfo,
    method: Exclude<AuthMethod, null>
  ) => void;
}>({
  setTokensInfo: () => {},
});
