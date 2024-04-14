"use client";

import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  useAuthConfirmNewEmailService,
  useAuthGetMeService,
} from "@/services/api/services/auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import useAuthActions from "@/services/auth/use-auth-actions";
import useAuth from "@/services/auth/use-auth";

export default function ConfirmNewEmail() {
  const { enqueueSnackbar } = useSnackbar();
  const fetchConfirmNewEmail = useAuthConfirmNewEmailService();
  const fetchAuthGetMe = useAuthGetMeService();
  const router = useRouter();
  const { t } = useTranslation("confirm-new-email");
  const { setUser } = useAuthActions();
  const { user, isLoaded } = useAuth();

  useEffect(() => {
    const confirm = async () => {
      if (!isLoaded) return;

      const params = new URLSearchParams(window.location.search);
      const hash = params.get("hash");

      if (!hash) return;

      const { status } = await fetchConfirmNewEmail({
        hash,
      });

      if (status === HTTP_CODES_ENUM.NO_CONTENT) {
        enqueueSnackbar(t("confirm-new-email:emailConfirmed"), {
          variant: "success",
        });

        if (user) {
          const { data, status: statusGetMe } = await fetchAuthGetMe();

          if (statusGetMe === HTTP_CODES_ENUM.OK) {
            setUser(data);
          }

          router.replace("/profile");
        } else {
          router.replace("/");
        }
      } else {
        enqueueSnackbar(t("confirm-new-email:emailConfirmFailed"), {
          variant: "error",
        });
        router.replace("/");
      }
    };

    confirm();
  }, [
    fetchConfirmNewEmail,
    router,
    enqueueSnackbar,
    t,
    isLoaded,
    setUser,
    fetchAuthGetMe,
  ]);

  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
