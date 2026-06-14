"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import { useGetUsersListQuery, usersQueryKeys } from "./queries/queries";
import { TableVirtuoso } from "react-virtuoso";
import ArrowDown from "lucide-react/dist/esm/icons/arrow-down";
import ArrowUp from "lucide-react/dist/esm/icons/arrow-up";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronsUpDown from "lucide-react/dist/esm/icons/chevrons-up-down";
import TableComponents from "@/components/table/table-components";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/services/api/types/user";
import Link from "@/components/link";
import useAuth from "@/services/auth/use-auth";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import { useDeleteUsersService } from "@/services/api/services/users";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import UserFilter from "./user-filter";
import { useRouter, useSearchParams } from "next/navigation";
import { UserFilterType, UserSortType } from "./user-filter-types";
import { SortEnum } from "@/services/api/types/sort-type";

type UsersKeys = keyof User;

function TableSortCellWrapper(
  props: PropsWithChildren<{
    width?: number;
    orderBy: UsersKeys;
    order: SortEnum;
    column: UsersKeys;
    handleRequestSort: (
      event: MouseEvent<HTMLButtonElement>,
      property: UsersKeys
    ) => void;
  }>
) {
  const isActive = props.orderBy === props.column;

  return (
    <TableHead style={{ width: props.width }}>
      <button
        type="button"
        onClick={(event) => props.handleRequestSort(event, props.column)}
        className="inline-flex items-center gap-1 font-medium hover:text-foreground"
      >
        {props.children}
        {isActive ? (
          props.order === SortEnum.ASC ? (
            <ArrowUp className="size-4" />
          ) : (
            <ArrowDown className="size-4" />
          )
        ) : (
          <ChevronsUpDown className="size-4 opacity-50" />
        )}
      </button>
    </TableHead>
  );
}

function Actions({ user }: { user: User }) {
  const { user: authUser } = useAuth();
  const { confirmDialog } = useConfirmDialog();
  const fetchUserDelete = useDeleteUsersService();
  const queryClient = useQueryClient();
  const canDelete = user.id !== authUser?.id;
  const { t: tUsers } = useTranslation("admin-panel-users");

  const handleDelete = async () => {
    const isConfirmed = await confirmDialog({
      title: tUsers("admin-panel-users:confirm.delete.title"),
      message: tUsers("admin-panel-users:confirm.delete.message"),
    });

    if (isConfirmed) {
      const searchParams = new URLSearchParams(window.location.search);
      const searchParamsFilter = searchParams.get("filter");
      const searchParamsSort = searchParams.get("sort");

      let filter: UserFilterType | undefined = undefined;
      let sort: UserSortType | undefined = {
        order: SortEnum.DESC,
        orderBy: "id",
      };

      if (searchParamsFilter) {
        filter = JSON.parse(searchParamsFilter);
      }

      if (searchParamsSort) {
        sort = JSON.parse(searchParamsSort);
      }

      const previousData = queryClient.getQueryData<
        InfiniteData<{ nextPage: number; data: User[] }>
      >(usersQueryKeys.list().sub.by({ sort, filter }).key);

      await queryClient.cancelQueries({ queryKey: usersQueryKeys.list().key });

      const newData = {
        ...previousData,
        pages: previousData?.pages.map((page) => ({
          ...page,
          data: page?.data.filter((item) => item.id !== user.id),
        })),
      };

      queryClient.setQueryData(
        usersQueryKeys.list().sub.by({ sort, filter }).key,
        newData
      );

      await fetchUserDelete({
        id: user.id,
      });
    }
  };

  const editButton = (
    <Button asChild size="sm" className={canDelete ? "rounded-r-none" : ""}>
      <Link href={`/admin-panel/users/edit/${user.id}`}>
        {tUsers("admin-panel-users:actions.edit")}
      </Link>
    </Button>
  );

  if (!canDelete) {
    return editButton;
  }

  return (
    <div className="inline-flex items-center">
      {editButton}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            aria-label="more actions"
            className="rounded-l-none border-l border-l-primary-foreground/20 px-2"
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            {tUsers("admin-panel-users:actions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Users() {
  const { t: tUsers } = useTranslation("admin-panel-users");
  const { t: tRoles } = useTranslation("admin-panel-roles");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: UsersKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.DESC, orderBy: "id" };
  });

  const handleRequestSort = (
    event: MouseEvent<HTMLButtonElement>,
    property: UsersKeys
  ) => {
    const isAsc = orderBy === property && order === SortEnum.ASC;
    const searchParams = new URLSearchParams(window.location.search);
    const newOrder = isAsc ? SortEnum.DESC : SortEnum.ASC;
    const newOrderBy = property;
    searchParams.set(
      "sort",
      JSON.stringify({ order: newOrder, orderBy: newOrderBy })
    );
    setSort({
      order: newOrder,
      orderBy: newOrderBy,
    });
    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) {
      return JSON.parse(searchParamsFilter) as UserFilterType;
    }

    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetUsersListQuery({ filter, sort: { order, orderBy } });

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as User[]) ?? ([] as User[]);

    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-3xl font-semibold">
            {tUsers("admin-panel-users:title")}
          </h3>
          <div className="flex items-center gap-2">
            <UserFilter />
            <Button
              asChild
              className="bg-success text-success-foreground hover:bg-success/90"
            >
              <Link href="/admin-panel/users/create">
                {tUsers("admin-panel-users:actions.create")}
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-2">
          <TableVirtuoso
            style={{ height: 500 }}
            data={result}
            components={TableComponents}
            endReached={handleScroll}
            overscan={20}
            useWindowScroll
            increaseViewportBy={400}
            fixedHeaderContent={() => (
              <>
                <TableRow>
                  <TableHead style={{ width: 50 }}></TableHead>
                  <TableSortCellWrapper
                    width={100}
                    orderBy={orderBy}
                    order={order}
                    column="id"
                    handleRequestSort={handleRequestSort}
                  >
                    {tUsers("admin-panel-users:table.column1")}
                  </TableSortCellWrapper>
                  <TableHead style={{ width: 200 }}>
                    {tUsers("admin-panel-users:table.column2")}
                  </TableHead>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="email"
                    handleRequestSort={handleRequestSort}
                  >
                    {tUsers("admin-panel-users:table.column3")}
                  </TableSortCellWrapper>

                  <TableHead style={{ width: 80 }}>
                    {tUsers("admin-panel-users:table.column4")}
                  </TableHead>
                  <TableHead style={{ width: 130 }}></TableHead>
                </TableRow>
                {isFetchingNextPage && (
                  <TableRow>
                    <TableHead colSpan={6} className="p-0">
                      <div className="h-1 w-full overflow-hidden bg-primary/20">
                        <div className="animate-progress-bar h-full w-full origin-left bg-primary" />
                      </div>
                    </TableHead>
                  </TableRow>
                )}
              </>
            )}
            itemContent={(_index, user) => {
              const initials =
                (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

              return (
                <>
                  <TableCell style={{ width: 50 }}>
                    <Avatar>
                      <AvatarImage
                        src={user?.photo?.path}
                        alt={user?.firstName + " " + user?.lastName}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell style={{ width: 100 }}>{user?.id}</TableCell>
                  <TableCell style={{ width: 200 }}>
                    {user?.firstName} {user?.lastName}
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell style={{ width: 80 }}>
                    {tRoles(`role.${user?.role?.id}`)}
                  </TableCell>
                  <TableCell style={{ width: 130 }}>
                    {!!user && <Actions user={user} />}
                  </TableCell>
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(Users, { roles: [RoleEnum.ADMIN] });
