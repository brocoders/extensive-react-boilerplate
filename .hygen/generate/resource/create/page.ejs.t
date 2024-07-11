---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page.tsx
---
import type { Metadata } from "next";
import Create<%= name %> from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-create"
  );

  return {
    title: t("title"),
  };
}

export default Create<%= name %>;
