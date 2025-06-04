"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "@/services/i18n/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormTextInput from "@/components/form/text-input/form-text-input";
import FormPhoneInput from "@/components/form/phone-input/form-phone-input";
import FormDatePickerInput from "@/components/form/date-pickers/date-picker";
import FormSelectInput from "@/components/form/select/form-select";
import { useGetCompaniesService } from "@/services/api/services/companies";
import { Company } from "@/services/api/types/company";
import { ContactFormData } from "@/services/api/types/contact";
import {
  usePostContactService,
  usePutContactService,
} from "@/services/api/services/contacts";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useSnackbar } from "@/hooks/use-snackbar";

const useValidationSchema = () => {
  const { t } = useTranslation("contacts");

  return yup.object({
    email: yup
      .string()
      .email(t("validation.required"))
      .required(t("validation.required")),
    phone: yup.string().required(t("validation.required")),
    firstname: yup.string().required(t("validation.required")),
    lastname: yup.string().required(t("validation.required")),
    birthdate: yup.date().nullable().notRequired(),
    job: yup.string().required(t("validation.required")),
    companies: yup
      .array()
      .of(
        yup.object({ id: yup.number().required(), name: yup.string().required() })
      )
      .min(1, t("validation.minCompanies"))
      .required(t("validation.minCompanies")),
  });
};

export default function ContactForm({
  initialValues,
  onSuccess,
}: {
  initialValues?: ContactFormData & { id?: number };
  onSuccess: () => void;
}) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("contacts");
  const schema = useValidationSchema();
  const postContact = usePostContactService();
  const putContact = usePutContactService();
  const fetchCompanies = useGetCompaniesService();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    (async () => {
      const { status, data } = await fetchCompanies({ page: 1, limit: 50 });
      if (status === HTTP_CODES_ENUM.OK) {
        setCompanies(data.data);
      }
    })();
  }, [fetchCompanies]);

  const methods = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues:
      initialValues ?? {
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        birthdate: undefined,
        job: "",
        companies: [],
      },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = initialValues?.id
      ? await putContact({ id: initialValues.id, data: formData })
      : await postContact(formData);

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof ContactFormData>).forEach((key) => {
        setError(key, { type: "manual", message: data.errors[key] });
      });
      return;
    }

    if (status === HTTP_CODES_ENUM.CREATED || status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(
        initialValues ? t("alerts.updated") : t("alerts.created"),
        { variant: "success" }
      );
      onSuccess();
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} autoComplete="off">
        <Grid container spacing={2} mb={3} mt={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">
              {initialValues ? t("title.edit") : t("title.create")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormTextInput<ContactFormData>
              name="email"
              label={t("form.email.label")}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormTextInput<ContactFormData>
              name="firstname"
              label={t("form.firstname.label")}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormTextInput<ContactFormData>
              name="lastname"
              label={t("form.lastname.label")}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormPhoneInput<ContactFormData>
              name="phone"
              label={t("form.phone.label")}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormDatePickerInput<ContactFormData>
              name="birthdate"
              label={t("form.birthdate.label")}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormTextInput<ContactFormData>
              name="job"
              label={t("form.job.label")}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormSelectInput<ContactFormData, Company>
              name="companies"
              label={t("form.companies.label")}
              options={companies}
              multiple
              keyValue="id"
              renderOption={(c) => c.name}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained">
              {t("buttons.submit")}
            </Button>
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              color="inherit"
              onClick={() => router.push("/admin-panel/contacts")}
            >
              {t("buttons.cancel")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
