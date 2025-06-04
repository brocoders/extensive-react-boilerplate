"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import ContactForm from "@/components/form/contact-form";
import { useRouter, useParams } from "next/navigation";
import { useSnackbar } from "@/hooks/use-snackbar";
import { useTranslation } from "@/services/i18n/client";
import { useEffect, useState } from "react";
import { useGetContactByIdService } from "@/services/api/services/contacts";
import { ContactFormData } from "@/services/api/types/contact";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";

function EditContactPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("contacts");
  const fetchContact = useGetContactByIdService();
  const [initialValues, setInitialValues] = useState<
    ContactFormData | undefined
  >();

  useEffect(() => {
    (async () => {
      const { status, data } = await fetchContact({ id });
      if (status === HTTP_CODES_ENUM.OK) {
        setInitialValues({
          email: data.email,
          phone: data.phone,
          firstname: data.firstname,
          lastname: data.lastname,
          birthdate: data.birthdate,
          job: data.job,
          companies: data.companies,
        });
      }
    })();
  }, [fetchContact, id]);

  if (!initialValues) return null;

  return (
    <ContactForm
      initialValues={initialValues}
      onSuccess={() => {
        enqueueSnackbar(t("alerts.updated"), { variant: "success" });
        router.push("/admin-panel/contacts");
      }}
    />
  );
}

export default withPageRequiredAuth(EditContactPage, {
  roles: [RoleEnum.ADMIN],
});
