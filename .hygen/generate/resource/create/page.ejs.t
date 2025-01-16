---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page.tsx
---
import type { Metadata } from "next";
import Create<%= name %> from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-create"
  );

  return {
    title: t("title"),
  };
}

export default function Page() {
  return <Create<%= name %> />;
}
