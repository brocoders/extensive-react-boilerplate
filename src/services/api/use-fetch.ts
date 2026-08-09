"use client";

import { useCallback } from "react";
import { AUTH_REFRESH_URL } from "./config";
import { FetchInputType, FetchInitType } from "./types/fetch-params";
import HTTP_CODES_ENUM from "./types/http-codes";
import type { Tokens } from "./types/tokens";
import useLanguage from "../i18n/use-language";
import { getTokensInfo, setTokensInfo } from "../auth/auth-tokens-info";
import { emitAuthEvent } from "../auth/auth-events";
import type { TokensInfo } from "../auth/auth-context";

const TOKEN_EXPIRES_SKEW_MS = 60000;
const REFRESH_TIMEOUT_MS = 10000;
const REFRESH_LOCK_WAIT_MS = 15000;

type RefreshResult = "refreshed" | "unauthorized" | "error";

type StoredTokensChange = "unchanged" | "rotated" | "other-account";

let refreshPromise: Promise<RefreshResult> | null = null;

function isTokenExpiringSoon(tokenExpires: Tokens["tokenExpires"]): boolean {
  return Boolean(
    tokenExpires && tokenExpires - TOKEN_EXPIRES_SKEW_MS <= Date.now()
  );
}

function getTokenAccountId(token: Tokens["token"]): string | null {
  const payload = token?.split(".")[1];

  if (!payload) return null;

  try {
    const claims: unknown = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    if (typeof claims !== "object" || claims === null) return null;

    const id = (claims as { id?: unknown }).id;

    return id === null || id === undefined ? null : String(id);
  } catch {
    return null;
  }
}

function classifyStoredTokens(before: TokensInfo): StoredTokensChange {
  const after = getTokensInfo();

  if (!after?.refreshToken || after.refreshToken === before?.refreshToken) {
    return "unchanged";
  }

  const beforeAccountId = getTokenAccountId(before?.token);
  const afterAccountId = getTokenAccountId(after.token);

  if (beforeAccountId === null || afterAccountId === null) {
    return "rotated";
  }

  return beforeAccountId === afterAccountId ? "rotated" : "other-account";
}

async function requestNewTokens(): Promise<RefreshResult> {
  const tokens = getTokensInfo();

  if (!tokens?.refreshToken) {
    return "unauthorized";
  }

  let response: Response;

  try {
    response = await fetch(AUTH_REFRESH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.refreshToken}`,
      },

      signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
    });
  } catch {
    return "error";
  }

  if (
    response.status === HTTP_CODES_ENUM.UNAUTHORIZED ||
    response.status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY
  ) {
    const change = classifyStoredTokens(tokens);

    if (change === "rotated") {
      return "refreshed";
    }

    if (change === "other-account") {
      return "error";
    }

    setTokensInfo(null);
    emitAuthEvent({ type: "logout" });

    return "unauthorized";
  }

  try {
    const newTokens = await response.json();

    if (newTokens.token) {
      setTokensInfo({
        token: newTokens.token,
        refreshToken: newTokens.refreshToken,
        tokenExpires: newTokens.tokenExpires,
      });

      return "refreshed";
    }
  } catch {
    // Malformed response body — treated like a network failure below.
  }

  return "error";
}

async function refreshTokensExclusive(
  tokensBefore: TokensInfo
): Promise<RefreshResult> {
  const change = classifyStoredTokens(tokensBefore);

  if (change === "rotated") {
    return "refreshed";
  }

  if (change === "other-account") {
    return "error";
  }

  return requestNewTokens();
}

async function refreshTokens(): Promise<RefreshResult> {
  if (refreshPromise) return refreshPromise;

  const tokensBefore = getTokensInfo();

  refreshPromise = (async () => {
    try {
      // The Web Lock serializes refreshes across same-origin tabs so two
      // tabs cannot both consume the single-use refresh token; browsers
      // without navigator.locks still get the per-tab refreshPromise dedupe.
      if (typeof navigator !== "undefined" && navigator.locks) {
        let result: RefreshResult = "error";

        try {
          await navigator.locks.request(
            "auth-token-refresh",
            { signal: AbortSignal.timeout(REFRESH_LOCK_WAIT_MS) },
            async () => {
              result = await refreshTokensExclusive(tokensBefore);
            }
          );
        } catch {
          return classifyStoredTokens(tokensBefore) === "rotated"
            ? "refreshed"
            : "error";
        }

        return result;
      }

      return await refreshTokensExclusive(tokensBefore);
    } catch {
      return "error";
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function useFetch() {
  const language = useLanguage();

  return useCallback(
    async (input: FetchInputType, init?: FetchInitType) => {
      const doFetch = () => {
        const tokens = getTokensInfo();

        let headers: HeadersInit = {
          "x-custom-lang": language,
        };

        if (!(init?.body instanceof FormData)) {
          headers = {
            ...headers,
            "Content-Type": "application/json",
          };
        }

        if (tokens?.token) {
          headers = {
            ...headers,
            Authorization: `Bearer ${tokens.token}`,
          };
        }

        return fetch(input, {
          ...init,
          headers: {
            ...headers,
            ...init?.headers,
          },
        });
      };

      if (isTokenExpiringSoon(getTokensInfo()?.tokenExpires)) {
        await refreshTokens();
      }

      const response = await doFetch();

      const isRetryable =
        response.status === HTTP_CODES_ENUM.UNAUTHORIZED &&
        input !== AUTH_REFRESH_URL &&
        Boolean(getTokensInfo()?.refreshToken);

      if (isRetryable && (await refreshTokens()) === "refreshed") {
        return doFetch();
      }

      return response;
    },
    [language]
  );
}

export default useFetch;
