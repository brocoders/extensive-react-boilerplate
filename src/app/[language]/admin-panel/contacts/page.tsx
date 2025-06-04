import type { Metadata } from "next";
import PageContent from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "contacts");
  return { title: t("title.list") };
}

export default function Page() {
  return <PageContent />;
}
