"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import ContactForm from "@/components/form/contact-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/use-snackbar";
import { useTranslation } from "@/services/i18n/client";
// fluid container for full width
import PageContainer from "@/components/page-container";

function CreateContactPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("contacts");

  return (
    <PageContainer>
      <ContactForm
        onSuccess={() => {
          enqueueSnackbar(t("alerts.created"), { variant: "success" });
          router.push("/admin-panel/contacts");
        }}
      />
    </PageContainer>
  );
}

export default withPageRequiredAuth(CreateContactPage, {
  roles: [RoleEnum.ADMIN],
});
