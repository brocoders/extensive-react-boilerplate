"use client";

import FormMultipleSelectInput from "@/components/form/multiple-select/form-multiple-select";
import { Role, RoleEnum } from "@/services/api/types/role";
import { useTranslation } from "@/services/i18n/client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { UserFilterType } from "./user-filter-types";

type UserFilterFormData = UserFilterType;

function UserFilter() {
  const { t } = useTranslation("admin-panel-users");
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<UserFilterFormData>({
    defaultValues: {
      roles: [],
    },
  });

  const { handleSubmit, reset } = methods;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setOpen(false);
      const filterParsed = JSON.parse(filter);
      reset(filterParsed);
    }
  }, [searchParams, reset]);

  return (
    <FormProvider {...methods}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>{t("admin-panel-users:filter.actions.filter")}</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto min-w-[300px]">
          <form
            onSubmit={handleSubmit((data) => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("filter", JSON.stringify(data));
              router.push(
                window.location.pathname + "?" + searchParams.toString()
              );
            })}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <FormMultipleSelectInput<UserFilterFormData, Pick<Role, "id">>
                  name="roles"
                  testId="roles"
                  label={t("admin-panel-users:filter.inputs.role.label")}
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
                    t(
                      `admin-panel-users:filter.inputs.role.options.${option.id}`
                    )
                  }
                  renderValue={(values) =>
                    values
                      .map((value) =>
                        t(
                          `admin-panel-users:filter.inputs.role.options.${value.id}`
                        )
                      )
                      .join(", ")
                  }
                />
              </div>
              <div className="col-span-12">
                <Button type="submit">
                  {t("admin-panel-users:filter.actions.apply")}
                </Button>
              </div>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </FormProvider>
  );
}

export default UserFilter;
