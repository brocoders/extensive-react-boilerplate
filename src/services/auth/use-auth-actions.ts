import { useContext } from "react";
import { AuthActionsContext } from "./auth-context";

function useAuthActions() {
  return useContext(AuthActionsContext);
}

export default useAuthActions;
