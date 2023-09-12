import { useContext } from "react";
import { StoreLanguageActionsContext } from "./store-language-context";

function useStoreLanguageActions() {
  return useContext(StoreLanguageActionsContext);
}

export default useStoreLanguageActions;
