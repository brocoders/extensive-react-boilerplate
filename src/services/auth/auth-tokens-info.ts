import Cookies from "js-cookie";
import type { TokensInfo } from "./auth-context";
import { AUTH_TOKEN_COOKIE_EXPIRES_DAYS, AUTH_TOKEN_KEY } from "./config";

function cookieOptions(): Cookies.CookieAttributes {
  return {
    path: "/",
    expires: AUTH_TOKEN_COOKIE_EXPIRES_DAYS,
    sameSite: "lax",
    secure:
      typeof window !== "undefined" && window.location.protocol === "https:",
  };
}

export function getTokensInfo() {
  try {
    return JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? "null") as TokensInfo;
  } catch {
    return null;
  }
}

export function setTokensInfo(tokens: TokensInfo) {
  if (tokens) {
    Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokens), cookieOptions());
  } else {
    Cookies.remove(AUTH_TOKEN_KEY, cookieOptions());
  }
}
