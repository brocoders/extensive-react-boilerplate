"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useDeleteOpportunityService,
  useGetOpportunitiesService,
} from "@/services/api/services/opportunities";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { Opportunity } from "@/services/api/types/opportunity";
import { useSnackbar } from "@/hooks/use-snackbar";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import UserFilter from "@/app/[language]/admin-panel/users/user-filter";
import Link from "@/components/link";
import { TableVirtuoso } from "react-virtuoso";
import TableComponents from "@/components/table/table-components";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import { SortEnum } from "@/services/api/types/sort-type";
import {
  useGetUsersQuery,
  usersQueryKeys,
} from "@/app/[language]/admin-panel/users/queries/queries";
import { User } from "@/services/api/types/user";
import useAuth from "@/services/auth/use-auth";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import { useDeleteUsersService } from "@/services/api/services/users";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import {
  UserFilterType,
  UserSortType,
} from "@/app/[language]/admin-panel/users/user-filter-types";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

function Actions({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const { user: authUser } = useAuth();
  const { confirmDialog } = useConfirmDialog();
  const fetchUserDelete = useDeleteUsersService();
  const queryClient = useQueryClient();
  const anchorRef = useRef<HTMLDivElement>(null);
  const canDelete = user.id !== authUser?.id;
  const { t: tUsers } = useTranslation("admin-panel-users");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleDelete = async () => {
    const isConfirmed = await confirmDialog({
      title: tUsers("admin-panel-users:confirm.delete.title"),
      message: tUsers("admin-panel-users:confirm.delete.message"),
    });

    if (isConfirmed) {
      setOpen(false);

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

  const mainButton = (
    <Button
      size="small"
      variant="contained"
      LinkComponent={Link}
      href={`/admin-panel/users/edit/${user.id}`}
    >
      {tUsers("admin-panel-users:actions.edit")}
    </Button>
  );

  return (
    <>
      {[!canDelete].every(Boolean) ? (
        mainButton
      ) : (
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
          size="small"
        >
          {mainButton}

          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      )}
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {canDelete && (
                    <MenuItem
                      sx={{
                        bgcolor: "error.main",
                        color: `var(--mui-palette-common-white)`,
                        "&:hover": {
                          bgcolor: "error.light",
                        },
                      }}
                      onClick={handleDelete}
                    >
                      {tUsers("admin-panel-users:actions.delete")}
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

function OpportunitiesList() {
  const { t } = useTranslation("opportunities");
  const router = useRouter();
  const fetchOpportunities = useGetOpportunitiesService();
  const deleteOpportunity = useDeleteOpportunityService();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { status, data } = await fetchOpportunities({ page: 1, limit: 50 });
    if (status === HTTP_CODES_ENUM.OK) {
      setData(data.data as Opportunity[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id: number) => {
    const { status } = await deleteOpportunity({ id });
    if (
      status === HTTP_CODES_ENUM.OK ||
      status === HTTP_CODES_ENUM.NO_CONTENT
    ) {
      enqueueSnackbar("Deleted", { variant: "success" });
      load();
    } else {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} pt={3}>
        <Grid container spacing={3} size={{ xs: 12 }}>
          <Grid size="grow">
            <Typography variant="h3">{t("title.list")}</Typography>
          </Grid>
          <Grid container size="auto" wrap="nowrap" spacing={2}>
            <Grid size="auto">
              <Button
                variant="contained"
                onClick={() => router.push("/admin-panel/opportunities/create")}
                sx={{ mb: 2 }}
                color={"success"}
              >
                {t("title.create")}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }} mb={2}>
          <TableVirtuoso
            style={{ height: 500 }}
            data={data}
            components={TableComponents}
            overscan={20}
            useWindowScroll
            increaseViewportBy={400}
            fixedHeaderContent={() => (
              <>
                <TableRow>
                  <TableCell width={100} column="type">
                    {t("table.column.type")}
                  </TableCell>
                  <TableCell style={{ width: 200 }}>
                    {t("table.column.numClients")}
                  </TableCell>
                  <TableCell style={{ width: 200 }}>
                    {t("table.column.numPartners")}
                  </TableCell>
                  <TableCell column="createdAt">
                    {t("table.column.createdAt")}
                  </TableCell>

                  <TableCell style={{ width: 80 }}>
                    {t("table.column.actions")}
                  </TableCell>
                </TableRow>
                {/*{isFetchingNextPage && (*/}
                {/*  <TableRow>*/}
                {/*    <TableCellLoadingContainer colSpan={6}>*/}
                {/*      <LinearProgress />*/}
                {/*    </TableCellLoadingContainer>*/}
                {/*  </TableRow>*/}
                {/*)}*/}
              </>
            )}
            itemContent={(index, op) => (
              <>
                <TableCell>{op.type}</TableCell>
                <TableCell>
                  {op.clients.length} {t("table.column.numClients")}
                </TableCell>
                <TableCell>
                  {op.partners.length} {t("table.column.numPartners")}
                </TableCell>
                <TableCell>{op.createdAt?.slice(0, 10)}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => router.push(`/opportunities/${op.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(op.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell style={{ width: 130 }}>
                  {!!op && <Actions user={op} />}
                </TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default OpportunitiesList;
