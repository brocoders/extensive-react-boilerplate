"use client";

import { createContext } from "react";
export type Language = string | null;

export const StoreLanguageContext = createContext<{
  language: Language;
}>({
  language: null,
});

export const StoreLanguageActionsContext = createContext<{
  setLanguage: (language: Language) => void;
}>({
  setLanguage: () => {},
});
