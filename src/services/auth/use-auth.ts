import { useContext } from "react";
import { AuthContext } from "./auth-context";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
