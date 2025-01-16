---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/page.tsx
---
import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import <%= h.inflection.transform(name, ['pluralize']) %> from "./page-content";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>"
  );

  return {
    title: t("title"),
  };
}

export default function Page() {
  return <<%= h.inflection.transform(name, ['pluralize']) %> />;
}
