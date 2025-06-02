"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import {
  useDeleteOpportunityService,
  useGetOpportunitiesService,
} from "@/services/api/services/opportunities";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { Opportunity } from "@/services/api/types/opportunity";
import { useSnackbar } from "@/hooks/use-snackbar";

function OpportunitiesList() {
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
    if (status === HTTP_CODES_ENUM.OK || status === HTTP_CODES_ENUM.NO_CONTENT) {
      enqueueSnackbar("Deleted", { variant: "success" });
      load();
    } else {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => router.push("/opportunities/create")}
        sx={{ mb: 2 }}
      >
        Create Opportunity
      </Button>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Clients</TableCell>
            <TableCell>Partners</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((op) => (
            <TableRow key={op.id} hover>
              <TableCell>{op.type}</TableCell>
              <TableCell>{op.clients.length} clients</TableCell>
              <TableCell>{op.partners.length} partners</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <p>Loading...</p>}
    </>
  );
}

export default OpportunitiesList;
