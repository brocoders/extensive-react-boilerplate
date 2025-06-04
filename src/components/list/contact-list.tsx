"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { TableVirtuoso } from "react-virtuoso";
import TableComponents from "@/components/table/table-components";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import { useDeleteContactService } from "@/services/api/services/contacts";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { contactsQueryKeys, useGetContactsQuery } from "@/app/[language]/admin-panel/contacts/queries/queries";

export default function ContactList() {
  const { t } = useTranslation("contacts");
  const query = useGetContactsQuery();
  const deleteContact = useDeleteContactService();
  const { confirmDialog } = useConfirmDialog();
  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    const isConfirmed = await confirmDialog({
      title: t("confirm.delete.title"),
      message: t("confirm.delete.message"),
    });

    if (isConfirmed) {
      const previousData = queryClient.getQueryData<
        InfiniteData<{ nextPage: number; data: any[] }>
      >(contactsQueryKeys.list().key);

      await queryClient.cancelQueries({ queryKey: contactsQueryKeys.list().key });

      const newData = {
        ...previousData,
        pages: previousData?.pages.map((page) => ({
          ...page,
          data: page?.data.filter((item) => item.id !== id),
        })),
      };

      queryClient.setQueryData(contactsQueryKeys.list().key, newData);

      await deleteContact({ id });
    }
  };

  const { fetchNextPage } = query;

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid size={12}>
          <Typography variant="h3" gutterBottom>
            {t("title.list")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            LinkComponent={Link}
            href="/admin-panel/contacts/create"
          >
            {t("title.create")}
          </Button>
        </Grid>
        <Grid size={12}>
          <TableVirtuoso
            data={query.data?.pages?.flatMap((page) => page?.data) || []}
            components={TableComponents}
            endReached={fetchNextPage}
            itemContent={(index, contact) => (
              <>
                <TableCell>{contact?.email}</TableCell>
                <TableCell>{contact?.firstname}</TableCell>
                <TableCell>{contact?.lastname}</TableCell>
                <TableCell>{contact?.phone}</TableCell>
                <TableCell>{contact?.job}</TableCell>
                <TableCell>{contact?.companies?.length}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    LinkComponent={Link}
                    href={`/admin-panel/contacts/${contact?.id}/edit`}
                  >
                    {t("actions.edit")}
                  </Button>
                  <Button
                    size="small"
                    color="inherit"
                    variant="contained"
                    onClick={() => contact?.id && handleDelete(contact.id)}
                    sx={{ ml: 1 }}
                  >
                    {t("actions.delete")}
                  </Button>
                </TableCell>
              </>
            )}
            fixedHeaderContent={() => (
              <TableRow>
                <TableCell>{t("table.column.email")}</TableCell>
                <TableCell>{t("table.column.firstname")}</TableCell>
                <TableCell>{t("table.column.lastname")}</TableCell>
                <TableCell>{t("table.column.phone")}</TableCell>
                <TableCell>{t("table.column.job")}</TableCell>
                <TableCell>{t("table.column.companies")}</TableCell>
                <TableCell>{t("table.column.actions")}</TableCell>
              </TableRow>
            )}
          />
          {query.isFetching && <LinearProgress />}
        </Grid>
      </Grid>
    </Container>
  );
}
