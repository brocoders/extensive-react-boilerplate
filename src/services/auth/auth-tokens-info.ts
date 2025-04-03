import { TokensInfo } from "./auth-context";
// import Cookies from "js-cookie";
// import { AUTH_TOKEN_KEY } from "./config";

// export function getTokensInfo() {
//   return JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? "null") as TokensInfo;
// }

// export function setTokensInfo(tokens: TokensInfo) {
//   if (tokens) {
//     Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokens));
//   } else {
//     Cookies.remove(AUTH_TOKEN_KEY);
//   }
// }
export const LOCAL_TOKEN_KEY = "local-token";
export const KEYCLOAK_TOKEN_KEY = "keycloak-token";

export const getTokensInfo = (method: "local" | "keycloak") => {
  const key = method === "local" ? LOCAL_TOKEN_KEY : KEYCLOAK_TOKEN_KEY;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setTokensInfoToStorage = (
  tokensInfo: TokensInfo | null,
  method: "local" | "keycloak"
) => {
  const key = method === "local" ? "local-tokens" : "keycloak-tokens";
  if (tokensInfo) localStorage.setItem(key, JSON.stringify(tokensInfo));
  else localStorage.removeItem(key);
};
