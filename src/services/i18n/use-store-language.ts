import { useContext } from "react";
import { StoreLanguageContext } from "./store-language-context";

function useStoreLanguage() {
  return useContext(StoreLanguageContext);
}

export default useStoreLanguage;
