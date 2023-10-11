import type { Metadata } from "next";
import EditUser from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-users-edit"
  );

  return {
    title: t("title1"),
  };
}

export default EditUser;
