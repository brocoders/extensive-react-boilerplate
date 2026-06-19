"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";

function AdminPanel() {
  const { t } = useTranslation("admin-panel-home");

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="flex gap-6 pt-6">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">{t("title")}</h1>
          <p>{t("description")}</p>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(AdminPanel, { roles: [RoleEnum.ADMIN] });
