"use client";

import { Button } from "@/components/ui/button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import FormTextInput from "@/components/form/text-input/form-text-input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useEffect } from "react";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import FormAvatarInput from "@/components/form/avatar-input/form-avatar-input";
import { FileEntity } from "@/services/api/types/file-entity";
import useLeavePage from "@/services/leave-page/use-leave-page";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import {
  useGetUserService,
  usePatchUserService,
} from "@/services/api/services/users";
import { useParams } from "next/navigation";
import { Role, RoleEnum } from "@/services/api/types/role";
import FormSelectInput from "@/components/form/select/form-select";

type EditUserFormData = {
  email: string;
  firstName: string;
  lastName: string;
  photo?: FileEntity;
  role: Role;
};

type ChangeUserPasswordFormData = {
  password: string;
  passwordConfirmation: string;
};

const useValidationEditUserSchema = () => {
  const { t } = useTranslation("admin-panel-users-edit");

  return yup.object().shape({
    email: yup
      .string()
      .email(t("admin-panel-users-edit:inputs.email.validation.invalid"))
      .required(
        t("admin-panel-users-edit:inputs.firstName.validation.required")
      ),
    firstName: yup
      .string()
      .required(
        t("admin-panel-users-edit:inputs.firstName.validation.required")
      ),
    lastName: yup
      .string()
      .required(
        t("admin-panel-users-edit:inputs.lastName.validation.required")
      ),
    role: yup
      .object()
      .shape({
        id: yup.mixed<string | number>().required(),
        name: yup.string(),
      })
      .required(t("admin-panel-users-edit:inputs.role.validation.required")),
  });
};

const useValidationChangePasswordSchema = () => {
  const { t } = useTranslation("admin-panel-users-edit");

  return yup.object().shape({
    password: yup
      .string()
      .min(6, t("admin-panel-users-edit:inputs.password.validation.min"))
      .required(
        t("admin-panel-users-edit:inputs.password.validation.required")
      ),
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        t("admin-panel-users-edit:inputs.passwordConfirmation.validation.match")
      )
      .required(
        t(
          "admin-panel-users-edit:inputs.passwordConfirmation.validation.required"
        )
      ),
  });
};

function EditUserFormActions() {
  const { t } = useTranslation("admin-panel-users-edit");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button type="submit" disabled={isSubmitting}>
      {t("admin-panel-users-edit:actions.submit")}
    </Button>
  );
}

function ChangePasswordUserFormActions() {
  const { t } = useTranslation("admin-panel-users-edit");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button type="submit" disabled={isSubmitting}>
      {t("admin-panel-users-edit:actions.submit")}
    </Button>
  );
}

function FormEditUser() {
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const fetchGetUser = useGetUserService();
  const fetchPatchUser = usePatchUserService();
  const { t } = useTranslation("admin-panel-users-edit");
  const validationSchema = useValidationEditUserSchema();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditUserFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: undefined,
      photo: undefined,
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const isEmailDirty = methods.getFieldState("email").isDirty;
    const { data, status } = await fetchPatchUser({
      id: userId,
      data: {
        ...formData,
        email: isEmailDirty ? formData.email : undefined,
      },
    });
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof EditUserFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(
              `admin-panel-users-edit:inputs.${key}.validation.server.${data.errors[key]}`
            ),
          });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      reset(formData);
      enqueueSnackbar(t("admin-panel-users-edit:alerts.user.success"), {
        variant: "success",
      });
    }
  });

  useEffect(() => {
    const getInitialDataForEdit = async () => {
      const { status, data: user } = await fetchGetUser({ id: userId });

      if (status === HTTP_CODES_ENUM.OK) {
        reset({
          email: user?.email ?? "",
          firstName: user?.firstName ?? "",
          lastName: user?.lastName ?? "",
          role: {
            id: Number(user?.role?.id),
          },
          photo: user?.photo,
        });
      }
    };

    getInitialDataForEdit();
  }, [userId, reset, fetchGetUser]);

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-md px-4">
        <form onSubmit={onSubmit}>
          <div className="mt-6 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h1 className="text-xl font-semibold">
                {t("admin-panel-users-edit:title1")}
              </h1>
            </div>
            <div className="col-span-12">
              <FormAvatarInput<EditUserFormData> name="photo" testId="photo" />
            </div>

            <div className="col-span-12">
              <FormTextInput<EditUserFormData>
                name="email"
                testId="email"
                label={t("admin-panel-users-edit:inputs.email.label")}
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<EditUserFormData>
                name="firstName"
                testId="first-name"
                label={t("admin-panel-users-edit:inputs.firstName.label")}
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<EditUserFormData>
                name="lastName"
                testId="last-name"
                label={t("admin-panel-users-edit:inputs.lastName.label")}
              />
            </div>

            <div className="col-span-12">
              <FormSelectInput<EditUserFormData, Pick<Role, "id">>
                name="role"
                testId="role"
                label={t("admin-panel-users-edit:inputs.role.label")}
                options={[
                  {
                    id: RoleEnum.ADMIN,
                  },
                  {
                    id: RoleEnum.USER,
                  },
                ]}
                keyValue="id"
                renderOption={(option) =>
                  t(`admin-panel-users-edit:inputs.role.options.${option.id}`)
                }
              />
            </div>

            <div className="col-span-12">
              <EditUserFormActions />
              <span className="ms-2">
                <Button asChild variant="secondary">
                  <Link href="/admin-panel/users">
                    {t("admin-panel-users-edit:actions.cancel")}
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

function FormChangePasswordUser() {
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const fetchPatchUser = usePatchUserService();
  const { t } = useTranslation("admin-panel-users-edit");
  const validationSchema = useValidationChangePasswordSchema();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<ChangeUserPasswordFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchPatchUser({
      id: userId,
      data: formData,
    });
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (
        Object.keys(data.errors) as Array<keyof ChangeUserPasswordFormData>
      ).forEach((key) => {
        setError(key, {
          type: "manual",
          message: t(
            `admin-panel-users-edit:inputs.${key}.validation.server.${data.errors[key]}`
          ),
        });
      });
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      reset();
      enqueueSnackbar(t("admin-panel-users-edit:alerts.password.success"), {
        variant: "success",
      });
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-md px-4">
        <form onSubmit={onSubmit}>
          <div className="mt-6 mb-6 grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h1 className="text-xl font-semibold">
                {t("admin-panel-users-edit:title2")}
              </h1>
            </div>

            <div className="col-span-12">
              <FormTextInput<ChangeUserPasswordFormData>
                name="password"
                type="password"
                label={t("admin-panel-users-edit:inputs.password.label")}
              />
            </div>

            <div className="col-span-12">
              <FormTextInput<ChangeUserPasswordFormData>
                name="passwordConfirmation"
                label={t(
                  "admin-panel-users-edit:inputs.passwordConfirmation.label"
                )}
                type="password"
              />
            </div>

            <div className="col-span-12">
              <ChangePasswordUserFormActions />
              <span className="ms-2">
                <Button asChild variant="secondary">
                  <Link href="/admin-panel/users">
                    {t("admin-panel-users-edit:actions.cancel")}
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

function EditUser() {
  return (
    <>
      <FormEditUser />
      <FormChangePasswordUser />
    </>
  );
}

export default withPageRequiredAuth(EditUser);
