import type { Metadata } from "next";
import ForgotPassword from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "forgot-password");

  return {
    title: t("title"),
  };
}

export default function Page() {
  return <ForgotPassword />;
}
