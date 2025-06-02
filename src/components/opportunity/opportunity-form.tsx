"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormState,
} from "react-hook-form";
import { useEffect, useState } from "react";
import FormSelectInput from "@/components/form/select/form-select";
import { useGetCompaniesService } from "@/services/api/services/companies";
import { useGetUsersService } from "@/services/api/services/users";
import {
  usePostOpportunityService,
  usePutOpportunityService,
} from "@/services/api/services/opportunities";
import { useSnackbar } from "@/hooks/use-snackbar";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useRouter } from "next/navigation";

export const validationSchema = yup.object({
  type: yup
    .string()
    .oneOf(["factoring", "reverse_factoring", "credit_insurance"])
    .required(),
  clients: yup
    .array()
    .of(
      yup.object({
        company: yup
          .object({ id: yup.number().required(), name: yup.string().nullable() })
          .required(),
        contacts: yup
          .array()
          .of(
            yup.object({
              id: yup.number().required(),
              name: yup.string().nullable(),
            })
          )
          .min(1)
          .required(),
      })
    )
    .min(1)
    .required(),
  partners: yup
    .array()
    .of(
      yup.object({
        type: yup.string().oneOf(["factor", "credit_insurer"]).required(),
        company: yup
          .object({ id: yup.number().required(), name: yup.string().nullable() })
          .required(),
        contacts: yup
          .array()
          .of(
            yup.object({
              id: yup.number().required(),
              name: yup.string().nullable(),
            })
          )
          .min(1)
          .required(),
      })
    )
    .min(1)
    .required(),
});

export type OpportunityFormData = InferType<typeof validationSchema>;

const emptyClient = {
  company: { id: 0, name: "" },
  contacts: [{ id: 0, name: "" }],
};

const emptyPartner = {
  type: "factor" as const,
  company: { id: 0, name: "" },
  contacts: [{ id: 0, name: "" }],
};

type Props = {
  initialValues?: OpportunityFormData & { id?: number };
  onSuccess: () => void;
};

function OpportunityForm({ initialValues, onSuccess }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const fetchCompanies = useGetCompaniesService();
  const fetchUsers = useGetUsersService();
  const postOpportunity = usePostOpportunityService();
  const putOpportunity = usePutOpportunityService();

  const [companies, setCompanies] = useState<{ id: number; name: string }[]>([]);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // placeholder

  useEffect(() => {
    const loadCompanies = async () => {
      const { status, data } = await fetchCompanies({ page: 1, limit: 50 });
      if (status === HTTP_CODES_ENUM.OK) {
        setCompanies(data.data as { id: number; name: string }[]);
      }
    };
    loadCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const loadUsers = async () => {
      const { status, data } = await fetchUsers({ page: 1, limit: 50 });
      if (status === HTTP_CODES_ENUM.OK) {
        setUsers(data.data as { id: number; name: string }[]);
      }
    };
    loadUsers();
  }, [fetchUsers]);

  const methods = useForm<OpportunityFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues:
      initialValues ?? {
        type: undefined,
        clients: [emptyClient],
        partners: [emptyPartner],
      },
  });

  const { control, handleSubmit, setError } = methods;
  const { isSubmitting } = useFormState({ control });

  const clientsArray = useFieldArray({ control, name: "clients" });
  const partnersArray = useFieldArray({ control, name: "partners" });

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = formData;
    const { data, status } = initialValues?.id
      ? await putOpportunity({ id: initialValues.id, data: requestData })
      : await postOpportunity(requestData);
    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof OpportunityFormData>).forEach(
        (key) => {
          setError(key, { type: "manual", message: data.errors[key] });
        }
      );
      return;
    }
    if (status === HTTP_CODES_ENUM.CREATED || status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar("Saved", { variant: "success" });
      onSuccess();
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} mb={3} mt={3}>
          <Grid xs={12} item>
            <FormSelectInput<OpportunityFormData, { id: string }>
              name="type"
              label="Type"
              options={[
                { id: "factoring" },
                { id: "reverse_factoring" },
                { id: "credit_insurance" },
              ]}
              keyValue="id"
              renderOption={(opt) => opt.id}
            />
          </Grid>
          {clientsArray.fields.map((field, index) => (
            <Grid key={field.id || index} container spacing={2} xs={12} item>
              <Grid xs={12} sm={6} item>
                <FormSelectInput<OpportunityFormData, { id: number; name: string }>
                  name={`clients.${index}.company`}
                  label="Company"
                  options={companies}
                  keyValue="id"
                  renderOption={(c) => c.name}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormSelectInput<OpportunityFormData, { id: number; name: string }>
                  name={`clients.${index}.contacts.0` as never}
                  label="Contact"
                  options={users}
                  keyValue="id"
                  renderOption={(u) => u.name}
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => clientsArray.remove(index)}
                >
                  Remove Client
                </Button>
              </Grid>
            </Grid>
          ))}
          <Grid xs={12} item>
            <Button
              variant="contained"
              onClick={() => clientsArray.append(emptyClient)}
            >
              Add Client
            </Button>
          </Grid>
          {partnersArray.fields.map((field, index) => (
            <Grid key={field.id || index} container spacing={2} xs={12} item>
              <Grid xs={12} sm={4} item>
                <FormSelectInput<OpportunityFormData, { id: string }>
                  name={`partners.${index}.type`}
                  label="Partner Type"
                  options={[{ id: "factor" }, { id: "credit_insurer" }]}
                  keyValue="id"
                  renderOption={(o) => o.id}
                />
              </Grid>
              <Grid xs={12} sm={4} item>
                <FormSelectInput<OpportunityFormData, { id: number; name: string }>
                  name={`partners.${index}.company`}
                  label="Company"
                  options={companies}
                  keyValue="id"
                  renderOption={(c) => c.name}
                />
              </Grid>
              <Grid xs={12} sm={4} item>
                <FormSelectInput<OpportunityFormData, { id: number; name: string }>
                  name={`partners.${index}.contacts.0` as never}
                  label="Contact"
                  options={users}
                  keyValue="id"
                  renderOption={(u) => u.name}
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => partnersArray.remove(index)}
                >
                  Remove Partner
                </Button>
              </Grid>
            </Grid>
          ))}
          <Grid xs={12} item>
            <Button
              variant="contained"
              onClick={() => partnersArray.append(emptyPartner)}
            >
              Add Partner
            </Button>
          </Grid>
          <Grid xs={12} item>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Submit
            </Button>
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              color="inherit"
              onClick={() => router.push("/opportunities")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: "50vw" } }}
      >
        {/* TODO: create company or user forms */}
      </Drawer>
    </FormProvider>
  );
}

export default OpportunityForm;
