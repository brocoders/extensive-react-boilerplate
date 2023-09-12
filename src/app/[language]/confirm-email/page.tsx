import type { Metadata } from "next";
import ConfirmEmail from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "confirm-email");

  return {
    title: t("title"),
  };
}

export default ConfirmEmail;
