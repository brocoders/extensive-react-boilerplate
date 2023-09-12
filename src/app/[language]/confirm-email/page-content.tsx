"use client";

import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuthConfirmEmailService } from "@/services/api/services/auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";

export default function ConfirmEmail() {
  const { enqueueSnackbar } = useSnackbar();
  const fetchConfirmEmail = useAuthConfirmEmailService();
  const router = useRouter();
  const { t } = useTranslation("confirm-email");

  useEffect(() => {
    const confirm = async () => {
      const params = new URLSearchParams(window.location.search);
      const hash = params.get("hash");

      if (hash) {
        const { status } = await fetchConfirmEmail({
          hash,
        });

        if (status === HTTP_CODES_ENUM.NO_CONTENT) {
          enqueueSnackbar(t("confirm-email:emailConfirmed"), {
            variant: "success",
          });
          router.replace("/profile");
        } else {
          enqueueSnackbar(t("confirm-email:emailConfirmFailed"), {
            variant: "error",
          });
          router.replace("/");
        }
      }
    };

    confirm();
  }, [fetchConfirmEmail, router, enqueueSnackbar, t]);

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
