"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { ClientItem } from "./client-item";
import { OpportunityFormData } from "./opportunity-form";
import FormSelectInput from "@/components/form/select/form-select";
import Box from "@mui/material/Box";
import { useGetCompaniesService } from "@/services/api/services/companies";
import { useGetUsersService } from "@/services/api/services/users";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import Drawer from "@mui/material/Drawer";
import { FormCreate as CreateCompanyForm } from "@/app/[language]/admin-panel/companies/create/page-content";

type Company = { id: number; name: string };
type User = { id: number; name: string };

interface ClientFieldArrayProps {
  emptyClient: {
    company: { id: number; name: string };
    contacts: { id: number; name: string }[];
  };
}

export function ClientFieldArray({ emptyClient }: ClientFieldArrayProps) {
  const { t } = useTranslation("opportunities");
  const fetchCompanies = useGetCompaniesService();
  const fetchUsers = useGetUsersService();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companyDrawerIndex, setCompanyDrawerIndex] = useState<number | null>(
    null
  );
  const { control, setValue } = useFormContext<OpportunityFormData>();

  // FieldArray pour "clients"
  const {
    fields: clientFields,
    append: appendClient,
    remove: removeClient,
  } = useFieldArray({
    control,
    name: "clients",
  });

  // Validation errors pour "clients"
  const { errors } = useFormState({ control });

  const loadCompanies = useCallback(async () => {
    const { status, data } = await fetchCompanies({ page: 1, limit: 50 });
    if (status === HTTP_CODES_ENUM.OK) {
      setCompanies(data.data as Company[]);
    }
  }, [fetchCompanies]);

  const loadUsers = useCallback(async () => {
    const { status, data } = await fetchUsers({ page: 1, limit: 50 });
    if (status === HTTP_CODES_ENUM.OK) {
      setUsers(data.data as User[]);
    }
  }, [fetchUsers]);

  const handleCompanyCreated = async (company: Company) => {
    if (companyDrawerIndex === null) return;
    await loadCompanies();
    setValue(`clients.${companyDrawerIndex}.company.id`, company.id);
    setValue(`clients.${companyDrawerIndex}.company.name`, company.name);
    setCompanyDrawerIndex(null);
  };

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <>
      {clientFields.map((clientField, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "5px",
            my: 1,
          }}
        >
          <Grid size={12} key={clientField.id}>
            {/* Champ "Company" pour chaque client */}
            <Grid container spacing={2}>
              <Grid size={5}>
                <Typography variant="subtitle1">Client #{index + 1}</Typography>
                <FormSelectInput<OpportunityFormData, Company>
                  name={`clients.${index}.company.id`}
                  label={t("form.clients.company.label")}
                  options={companies}
                  keyValue="id"
                  renderOption={(c) => c.name}
                  disabled={companies.length === 0}
                />
                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => setCompanyDrawerIndex(index)}
                >
                  {t("form.clients.createCompanyButton")}
                </Button>
              </Grid>

              {/* Si erreur sur la company */}
              {errors.clients &&
                Array.isArray(errors.clients) &&
                errors.clients[index]?.company && (
                  <Grid size={12}>
                    <Typography color="error" variant="body2">
                      Client’s company is required
                    </Typography>
                  </Grid>
                )}
              {/* Sous-composant pour gérer les "Contacts" de ce client */}
              <Grid size={7}>
                <ClientItem
                  clientIndex={index}
                  indexKey={clientField.id}
                  users={users}
                  onRemove={removeClient}
                />
              </Grid>
            </Grid>

            {/* Erreur de validation globale sur la liste "clients" */}
            {index === clientFields.length - 1 && errors.clients && (
              <Grid size={12} sx={{ mt: 1 }}>
                <Typography color="error" variant="body2">
                  {(errors.clients as any).message ||
                    t("validation.minClients")}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}

      {/* Add Client Button */}
      <Grid size={12}>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => appendClient(emptyClient)}
        >
          {t("form.clients.addButton")}
        </Button>
      </Grid>
      <Drawer
        anchor="right"
        open={companyDrawerIndex !== null}
        onClose={() => setCompanyDrawerIndex(null)}
        PaperProps={{ sx: { width: "50vw" } }}
      >
        <CreateCompanyForm
          onSuccess={handleCompanyCreated}
          onCancel={() => setCompanyDrawerIndex(null)}
        />
      </Drawer>
    </>
  );
}
