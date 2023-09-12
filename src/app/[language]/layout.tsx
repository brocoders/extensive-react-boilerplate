import ResponsiveAppBar from "@/components/app-bar";
import AuthProvider from "@/services/auth/auth-provider";
import "../globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { dir } from "i18next";
import "@/services/i18n/config";
import { languages } from "@/services/i18n/config";
import type { Metadata } from "next";
import SnackbarProvider from "@/components/snackbar-provider";
import { getServerTranslation } from "@/services/i18n";
import StoreLanguageProvider from "@/services/i18n/store-language-provider";
import ThemeProvider from "@/components/theme-provider";
import LeavePageProvider from "@/services/leave-page/leave-page-provider";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "common");

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return languages.map((language) => ({ language }));
}

export default function RootLayout({
  children,
  params: { language },
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  return (
    <html lang={language} dir={dir(language)}>
      <body>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <StoreLanguageProvider>
              <AuthProvider>
                <LeavePageProvider>
                  <ResponsiveAppBar />
                  {children}
                </LeavePageProvider>
              </AuthProvider>
            </StoreLanguageProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
