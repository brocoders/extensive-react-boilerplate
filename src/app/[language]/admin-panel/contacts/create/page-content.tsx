"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import ContactForm from "@/components/form/contact-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/use-snackbar";
import { useTranslation } from "@/services/i18n/client";

function CreateContactPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("contacts");

  return (
    <ContactForm
      onSuccess={() => {
        enqueueSnackbar(t("alerts.created"), { variant: "success" });
        router.push("/admin-panel/contacts");
      }}
    />
  );
}

export default withPageRequiredAuth(CreateContactPage, { roles: [RoleEnum.ADMIN] });
