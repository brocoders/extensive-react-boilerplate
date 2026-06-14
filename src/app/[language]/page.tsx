import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Link from "@/components/link";
import { Trans } from "react-i18next/TransWithoutContext";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export default async function Home(props: Props) {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="flex h-[90vh] flex-col justify-between gap-6 pt-6">
        <div className="flex-grow">
          <h1 className="mb-4 text-3xl font-semibold" data-testid="home-title">
            {t("title")}
          </h1>
          <p>
            <Trans
              i18nKey={`description`}
              t={t}
              components={[
                <a
                  key="1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                  href="https://github.com/brocoders/extensive-react-boilerplate/blob/main/docs/README.md"
                >
                  {}
                </a>,
              ]}
            />
          </p>
        </div>
        <div className="mx-auto">
          <Link
            href="/privacy-policy"
            className="text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
