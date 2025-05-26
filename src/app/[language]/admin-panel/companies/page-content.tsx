"use client";

import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { RoleEnum } from "@/services/api/types/role";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@/components/link";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableComponents from "@/components/table/table-components";
import { useGetCompaniesQuery, companiesQueryKeys } from "./queries/queries";
import LinearProgress from "@mui/material/LinearProgress";
import { useDeleteCompaniesService } from "@/services/api/services/companies";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

function PageContent() {
  const { t } = useTranslation("admin-panel-companies");
  const query = useGetCompaniesQuery();
  const deleteCompany = useDeleteCompaniesService();
  const { confirmDialog } = useConfirmDialog();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDialog({
      title: t("confirm.delete.title"),
      message: t("confirm.delete.message"),
    });

    if (isConfirmed) {
      const previousData = queryClient.getQueryData<
        InfiniteData<{ nextPage: number; data: any[] }>
      >(companiesQueryKeys.list().key);

      await queryClient.cancelQueries({ queryKey: companiesQueryKeys.list().key });

      const newData = {
        ...previousData,
        pages: previousData?.pages.map((page) => ({
          ...page,
          data: page?.data.filter((item) => item.id !== id),
        })),
      };

      queryClient.setQueryData(companiesQueryKeys.list().key, newData);

      await deleteCompany({ id });
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {t("title")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            LinkComponent={Link}
            href="/admin-panel/companies/create"
          >
            {t("actions.create")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableVirtuoso
            data={query.data?.pages.flatMap((page) => page.data) || []}
            components={TableComponents({ loading: query.isLoading })}
            endReached={query.fetchNextPage}
            itemContent={(index, company) => (
              <>
                <TableCell>{company.id}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    LinkComponent={Link}
                    href={`/admin-panel/companies/edit/${company.id}`}
                  >
                    {t("actions.edit")}
                  </Button>
                  <Button
                    size="small"
                    color="inherit"
                    variant="contained"
                    onClick={() => handleDelete(company.id)}
                    style={{ marginLeft: 8 }}
                  >
                    {t("actions.delete")}
                  </Button>
                </TableCell>
              </>
            )}
            fixedHeaderContent={() => (
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{t("table.column2")}</TableCell>
                <TableCell>{t("table.column3")}</TableCell>
              </TableRow>
            )}
          />
          {query.isFetching && <LinearProgress />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(PageContent, { roles: [RoleEnum.ADMIN] });
