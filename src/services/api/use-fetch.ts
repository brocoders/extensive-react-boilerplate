"use client";

import { useCallback } from "react";
import { FetchInputType, FetchInitType } from "./types/fetch-params";
import useLanguage from "../i18n/use-language";
import { useKeycloak } from "@react-keycloak/web";

function useFetch() {
  const language = useLanguage();
  const { keycloak } = useKeycloak();

  return useCallback(
    async (input: FetchInputType, init?: FetchInitType) => {
      // Ensure token is fresh before making requests
      if (keycloak.authenticated) {
        try {
          await keycloak.updateToken(60); // Refresh token if it expires within 60 seconds
        } catch (error) {
          console.error("Failed to refresh token:", error);
          keycloak.logout();
          throw error;
        }
      }

      let headers: HeadersInit = {
        "x-custom-lang": language,
      };

      if (!(init?.body instanceof FormData)) {
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }

      if (keycloak.token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${keycloak.token}`,
        };
      }

      return fetch(input, {
        ...init,
        headers: {
          ...headers,
          ...init?.headers,
        },
      });
    },
    [language, keycloak]
  );
}

export default useFetch;
