import type { Metadata } from "next";
import EditProfile from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "profile");

  return {
    title: t("title1"),
  };
}

export default function Page() {
  return <EditProfile />;
}
