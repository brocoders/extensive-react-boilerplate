"use client";

import { User } from "@/services/api/types/user";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthActionsContext,
  AuthContext,
  AuthTokensContext,
  TokensInfo,
} from "./auth-context";
import useFetch from "@/services/api/use-fetch";
import { AUTH_LOGOUT_URL, AUTH_ME_URL } from "@/services/api/config";
import HTTP_CODES_ENUM from "../api/types/http-codes";
import { getTokensInfo, setTokensInfoToStorage } from "./auth-tokens-info";
import { useKeycloak } from "@react-keycloak/web";

function AuthProvider(props: PropsWithChildren<{}>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authMethod, setAuthMethod] = useState<"local" | "keycloak" | null>(
    null
  );
  const fetchBase = useFetch();
  const { keycloak } = useKeycloak();
  // const setTokensInfo = useCallback((tokensInfo: TokensInfo) => {
  //   setTokensInfoToStorage(tokensInfo);

  //   if (!tokensInfo) {
  //     setUser(null);
  //   }
  // }, []);

  // Update setTokensInfo to handle method-specific storage
  const setTokensInfo = useCallback(
    (tokensInfo: TokensInfo, method: "local" | "keycloak") => {
      setAuthMethod(method);
      setTokensInfoToStorage(tokensInfo, method); // Store tokens with method-specific key
      if (!tokensInfo) setUser(null);
    },
    []
  );

  // const logOut = useCallback(async () => {
  //   const tokens = getTokensInfo();

  //   if (tokens?.token) {
  //     await fetchBase(AUTH_LOGOUT_URL, {
  //       method: "POST",
  //     });
  //   }
  //   setTokensInfo(null);
  // }, [setTokensInfo, fetchBase]);

  // Modified logout to handle Keycloak
  const logOut = useCallback(async () => {
    if (authMethod === "keycloak") {
      await keycloak.logout(); // Keycloak-specific logout
    } else {
      await fetchBase(AUTH_LOGOUT_URL, { method: "POST" }); // Local logout
    }
    setTokensInfo(null, authMethod!);
  }, [authMethod, fetchBase, keycloak, setTokensInfo]);

  const loadData = useCallback(async () => {
    const tokens = getTokensInfo("local");

    try {
      if (tokens?.token) {
        const response = await fetchBase(AUTH_ME_URL, {
          method: "GET",
        });

        if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          logOut();
          return;
        }

        const data = await response.json();
        setUser(data);
      }
    } finally {
      setIsLoaded(true);
    }
  }, [fetchBase, logOut]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      authMethod,
    }),
    [isLoaded, user, authMethod]
  );

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
      setAuthMethod, // Add setAuthMethod to the context actions
    }),
    [logOut, setAuthMethod]
  );

  const contextTokensValue = useMemo(
    () => ({
      setTokensInfo: (tokensInfo: TokensInfo) =>
        setTokensInfo(tokensInfo, "local"),
    }),
    [setTokensInfo]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <AuthTokensContext.Provider value={contextTokensValue}>
          {props.children}
        </AuthTokensContext.Provider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}
export default AuthProvider;
