---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/page.tsx
---
"use server";

import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import <%= h.inflection.transform(name, ['pluralize']) %>PageContent from "./page-content";

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

export default async function Page() {
  return <<%= h.inflection.transform(name, ['pluralize']) %>PageContent />;
}
