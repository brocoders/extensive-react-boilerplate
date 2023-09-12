import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./config";

const initI18next = async (language: string, namespace: string) => {
  // On server side we create a new instance for each render, because during
  // compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(language, namespace));

  return i18nInstance;
};

export async function getServerTranslation(
  language: string,
  namespace: string | string[],
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(
    language,
    Array.isArray(namespace) ? namespace[0] : namespace
  );

  return {
    t: i18nextInstance.getFixedT(
      language,
      Array.isArray(namespace) ? namespace[0] : namespace,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
