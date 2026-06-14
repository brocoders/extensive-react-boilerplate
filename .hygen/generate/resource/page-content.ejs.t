---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/page-content.tsx
---
"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import { useCallback, useMemo } from "react";
import { useGet<%= h.inflection.transform(name, ['pluralize']) %>ListQuery, <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys } from "./queries/queries";
import { TableVirtuoso } from "react-virtuoso";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import TableComponents from "@/components/table/table-components";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "@/components/link";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { <%= name %> } from "@/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>";
import { useDelete<%= name %>Service } from "@/services/api/services/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>";

function Actions({ entityItem }: { entityItem: <%= name %> }) {
  const { confirmDialog } = useConfirmDialog();
  const fetchDelete<%= name %> = useDelete<%= name %>Service();
  const queryClient = useQueryClient();
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>");

  const handleDelete = async () => {
    const isConfirmed = await confirmDialog({
      title: t("confirm.delete.title"),
      message: t("confirm.delete.message"),
    });

    if (isConfirmed) {
      const previousData = queryClient.getQueryData<
        InfiniteData<{ nextPage: number; data: <%= name %>[] }>
      >(<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys.list().key);

      await queryClient.cancelQueries({
        queryKey: <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys.list().key,
      });

      const newData = {
        ...previousData,
        pages: previousData?.pages.map((page) => ({
          ...page,
          data: page?.data.filter((item) => item.id !== entityItem.id),
        })),
      };

      queryClient.setQueryData(<%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys.list().key, newData);

      await fetchDelete<%= name %>({
        id: entityItem.id,
      });
    }
  };

  return (
    <div className="inline-flex items-center">
      <Button
        asChild
        size="sm"
        className="rounded-r-none"
        data-testid="edit-button"
      >
        <Link
          href={`/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/${entityItem.id}`}
        >
          {t("actions.edit")}
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            aria-label="actions"
            data-testid="actions-button"
            className="rounded-l-none border-l border-l-primary-foreground/20 px-2"
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
            data-testid="delete-button"
          >
            {t("actions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function <%= h.inflection.transform(name, ['pluralize']) %>PageContent() {
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>");

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGet<%= h.inflection.transform(name, ['pluralize']) %>ListQuery();

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tableData = useMemo(() => {
    const result = (data?.pages.flatMap((page) => page?.data ?? [])) ?? [];

    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-3xl font-semibold" data-testid="index-page-title">
            {t("title")}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="bg-success text-success-foreground hover:bg-success/90"
              data-testid="add-button"
            >
              <Link href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create">
                {t("actions.create")}
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-2">
          <TableVirtuoso
            useWindowScroll
            data={tableData}
            components={TableComponents}
            endReached={handleScroll}
            overscan={20}
            increaseViewportBy={400}
            fixedHeaderContent={() => (
              <>
                <TableRow>
                  <TableHead>{t("table.column1")}</TableHead>

                  {/* Do not remove this comment. <index-component-head-field />  */}

                  <TableHead style={{ width: 130 }}></TableHead>
                </TableRow>
                {isFetchingNextPage && (
                  <TableRow>
                    <TableHead colSpan={2} className="p-0">
                      <div className="h-1 w-full overflow-hidden bg-primary/20">
                        <div className="animate-progress-bar h-full w-full origin-left bg-primary" />
                      </div>
                    </TableHead>
                  </TableRow>
                )}
              </>
            )}
            itemContent={(_index, item) => (
              <>
                <TableCell>{item?.id}</TableCell>

                {/* Do not remove this comment. <index-component-body-field />  */}

                <TableCell style={{ width: 130 }} className="text-right">
                  {!!item && <Actions entityItem={item} />}
                </TableCell>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(<%= h.inflection.transform(name, ['pluralize']) %>PageContent, { roles: [RoleEnum.ADMIN] });
