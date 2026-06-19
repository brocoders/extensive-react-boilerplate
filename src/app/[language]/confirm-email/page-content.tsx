"use client";

import { useEffect } from "react";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import { useAuthConfirmEmailService } from "@/services/api/services/auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/use-snackbar";
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
    <div className="mx-auto w-full max-w-xl px-4">
      <div className="flex items-center justify-center p-4">
        <Loader2 className="size-10 animate-spin" />
      </div>
    </div>
  );
}
