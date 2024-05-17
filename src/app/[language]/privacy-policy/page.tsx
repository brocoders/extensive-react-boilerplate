import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import PrivacyPolicy from "./page-contex";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "privacy-policy");

  return {
    title: t("title"),
  };
}

export default PrivacyPolicy;
