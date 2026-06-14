---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
---
"use client";

import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import useLeavePage from "@/services/leave-page/use-leave-page";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useRouter } from "next/navigation";
import { useCreate<%= name %>Service } from "@/services/api/services/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>";

type CreateFormData = {
  // types here
};

const defaultValues: CreateFormData = {
  // default values here
};

const useValidationSchema = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-create");

  return yup.object().shape({
    // Do not remove this comment. <create-form-validation-schema />
  });
};

// Do not remove this comment. <create-component-reference-field />

function CreateFormActions() {
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-create");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button type="submit" disabled={isSubmitting} data-testid="submit-button">
      {t("actions.submit")}
    </Button>
  );
}

function FormCreate() {
  const router = useRouter();
  const fetchCreate<%= name %> = useCreate<%= name %>Service();
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-create");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<CreateFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(
    async (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      formData
    ) => {
      const { data, status } = await fetchCreate<%= name %>({
        // Do not remove this comment. <create-form-submit-property />
      });

      if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
        (Object.keys(data.errors) as Array<keyof CreateFormData>).forEach(
          (key) => {
            setError(key, {
              type: "manual",
              message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
            });
          }
        );

        return;
      }

      if (status === HTTP_CODES_ENUM.CREATED) {
        enqueueSnackbar(t("alerts.success"), {
          variant: "success",
        });
        router.push("/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>");
      }
    }
  );

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-3xl px-4">
        <form onSubmit={onSubmit}>
          <div className="mt-6 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h1 className="text-xl font-semibold">{t("title")}</h1>
            </div>

            {/* Do not remove this comment. <create-component-field />  */}

            <div className="col-span-12">
              <CreateFormActions />
              <span className="ml-2">
                <Button asChild variant="secondary">
                  <Link href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>">
                    {t("actions.cancel")}
                  </Link>
                </Button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function Create() {
  return <FormCreate />;
}

export default withPageRequiredAuth(Create);
