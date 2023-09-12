export const fallbackLanguage = "en";
export const languages = [fallbackLanguage];
export const defaultNamespace = "common";
export const cookieName = "i18next";

export function getOptions(
  language = fallbackLanguage,
  namespace = defaultNamespace
) {
  return {
    debug: process.env.NODE_ENV === "development",
    supportedLngs: languages,
    fallbackLng: fallbackLanguage,
    lng: language,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns: namespace,
  };
}
