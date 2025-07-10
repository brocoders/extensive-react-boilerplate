import ResponsiveAppBar from "@/components/app-bar";
import AuthProvider from "@/services/auth/auth-provider";
import "../globals.css";
import { inter, lexendDeca } from "@/theme/fonts";
import CssBaseline from "@mui/material/CssBaseline";
import { dir } from "i18next";
import "@/services/i18n/config";
import { languages } from "@/services/i18n/config";
import type { Metadata } from "next";
import ToastContainer from "@/components/snackbar-provider";
import { getServerTranslation } from "@/services/i18n";
import StoreLanguageProvider from "@/services/i18n/store-language-provider";
import ThemeProvider from "@/components/theme/theme-provider";
import Sidebar from "@/components/sidebar";
import LeavePageProvider from "@/services/leave-page/leave-page-provider";
import QueryClientProvider from "@/services/react-query/query-client-provider";
import queryClient from "@/services/react-query/query-client";
import ReactQueryDevtools from "@/services/react-query/react-query-devtools";
import Box from "@mui/material/Box";
import GoogleAuthProvider from "@/services/social-auth/google/google-auth-provider";
import FacebookAuthProvider from "@/services/social-auth/facebook/facebook-auth-provider";
import ConfirmDialogProvider from "@/components/confirm-dialog/confirm-dialog-provider";
import InitColorSchemeScript from "@/components/theme/init-color-scheme-script";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "common");

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return languages.map((language) => ({ language }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}) {
  const params = await props.params;

  const { language } = params;

  const { children } = props;

  return (
    <html
      lang={language}
      dir={dir(language)}
      className={`${inter.variable} ${lexendDeca.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <InitColorSchemeScript />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider>
            <CssBaseline />

            <StoreLanguageProvider>
              <ConfirmDialogProvider>
                <AuthProvider>
                  <GoogleAuthProvider>
                    <FacebookAuthProvider>
                      <LeavePageProvider>
                        <ResponsiveAppBar />
                        <Box sx={{ display: "flex" }}>
                          <Sidebar />
                          <Box component="main" sx={{ flexGrow: 1 }}>
                            {children}
                          </Box>
                        </Box>
                        <ToastContainer
                          position="bottom-left"
                          hideProgressBar
                        />
                      </LeavePageProvider>
                    </FacebookAuthProvider>
                  </GoogleAuthProvider>
                </AuthProvider>
              </ConfirmDialogProvider>
            </StoreLanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
