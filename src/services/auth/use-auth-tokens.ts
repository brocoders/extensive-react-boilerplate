import { useContext } from "react";
import { AuthTokensContext } from "./auth-context";

function useAuthTokens() {
  return useContext(AuthTokensContext);
}

export default useAuthTokens;
