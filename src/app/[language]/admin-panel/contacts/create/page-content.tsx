"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import ContactForm from "@/components/form/contact-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/use-snackbar";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";

function CreateContactPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("contacts");

  return (
    <Container maxWidth={"md"}>
      <ContactForm
        onSuccess={() => {
          enqueueSnackbar(t("alerts.created"), { variant: "success" });
          router.push("/admin-panel/contacts");
        }}
      />
    </Container>
  );
}

export default withPageRequiredAuth(CreateContactPage, {
  roles: [RoleEnum.ADMIN],
});
