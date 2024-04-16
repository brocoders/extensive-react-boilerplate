import type { Metadata } from "next";
import SignUp from "./page-content";
import { getServerTranslation } from "@/services/i18n";
import { redirect } from "next/navigation";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";

type Props = {
  params: { language: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "sign-up");

  return {
    title: t("title"),
  };
}

export default function SignUpPage(props: Props) {
  if (!IS_SIGN_UP_ENABLED) {
    return redirect("/");
  }

  return <SignUp {...props} />;
}
