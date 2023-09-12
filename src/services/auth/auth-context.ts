"use client";

import { Tokens } from "@/services/api/types/tokens";
import { User } from "@/services/api/types/user";
import { createContext } from "react";

export type TokensInfo = Tokens | null;

export const AuthContext = createContext<{
  user: User | null;
  isLoaded: boolean;
}>({
  user: null,
  isLoaded: true,
});

export const AuthActionsContext = createContext<{
  setUser: (user: User) => void;
  logOut: () => Promise<void>;
}>({
  setUser: () => {},
  logOut: async () => {},
});

export const AuthTokensContext = createContext<{
  tokensInfoRef: React.MutableRefObject<Tokens>;
  setTokensInfo: (tokensInfo: TokensInfo) => void;
}>({
  tokensInfoRef: {
    current: {
      token: null,
      refreshToken: null,
      tokenExpires: null,
    },
  },
  setTokensInfo: () => {},
});
