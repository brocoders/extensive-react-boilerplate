---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/page-content.tsx
---
"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useRef, useState } from "react";
import { useGet<%= h.inflection.transform(name, ['pluralize']) %>Query, <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys } from "./queries/queries";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TableComponents from "@/components/table/table-components";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Link from "@/components/link";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { <%= name %> } from "@/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>";
import { useDelete<%= name %>Service } from "@/services/api/services/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>";

const TableCellLoadingContainer = styled(TableCell)(() => ({
  padding: 0,
}));

function Actions({ entityItem }: { entityItem: <%= name %> }) {
  const [open, setOpen] = useState(false);
  const { confirmDialog } = useConfirmDialog();
  const fetchDelete<%= name %> = useDelete<%= name %>Service();
  const queryClient = useQueryClient();
  const anchorRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>");

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
      title: t("confirm.delete.title"),
      message: t("confirm.delete.message"),
    });

    if (isConfirmed) {
      setOpen(false);

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

  const mainButton = (
    <Button
      size="small"
      variant="contained"
      LinkComponent={Link}
      href={`/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/${entityItem.id}`}
      data-testid="edit-button"
    >
      {t("actions.edit")}
    </Button>
  );

  return (
    <>
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
          aria-label="select"
          aria-haspopup="menu"
          onClick={handleToggle}
          data-testid="actions-button"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

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
                  <MenuItem
                    sx={{
                      bgcolor: "error.main",
                      color: `var(--mui-palette-common-white)`,
                      "&:hover": {
                        bgcolor: "error.light",
                      },
                    }}
                    onClick={handleDelete}
                    data-testid="delete-button"
                  >
                    {t("actions.delete")}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

function <%= h.inflection.transform(name, ['pluralize']) %>() {
  const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>");

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGet<%= h.inflection.transform(name, ['pluralize']) %>Query();

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tableData = useMemo(() => {
    const result = (data?.pages.flatMap((page) => page?.data ?? [])) ?? [];

    return removeDuplicatesFromArrayObjects(result, "id");
  }, [data]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} pt={3}>
        <Grid container size={{ xs: 12 }} spacing={3}>
          <Grid size="grow">
            <Typography variant="h3" data-testid="index-page-title">{t("title")}</Typography>
          </Grid>
          <Grid container size="auto" wrap="nowrap" spacing={2}>
            <Grid size="auto">
              <Button
                variant="contained"
                LinkComponent={Link}
                href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create"
                color="success"
                data-testid="add-button"
              >
                {t("actions.create")}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }} mb={2}>
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
                  <TableCell>{t("table.column1")}</TableCell>

                  {/* Do not remove this comment. <index-component-head-field />  */}

                  <TableCell style={{ width: 130 }}></TableCell>
                </TableRow>
                {isFetchingNextPage && (
                  <TableRow>
                    <TableCellLoadingContainer colSpan={2}>
                      <LinearProgress />
                    </TableCellLoadingContainer>
                  </TableRow>
                )}
              </>
            )}
            itemContent={(index, item) => (
              <>
                <TableCell>{item?.id}</TableCell>

                {/* Do not remove this comment. <index-component-body-field />  */}

                <TableCell style={{ width: 130 }} align="right">
                  {!!item && <Actions entityItem={item} />}
                </TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(<%= h.inflection.transform(name, ['pluralize']) %>, { roles: [RoleEnum.ADMIN] });
