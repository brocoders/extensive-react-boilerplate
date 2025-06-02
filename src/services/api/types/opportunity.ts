export type OpportunityPartner = {
  type: "factor" | "credit_insurer";
  company: { id: number; name?: string | null };
  contacts: { id: number; name?: string | null }[];
};

export type OpportunityClient = {
  company: { id: number; name?: string | null };
  contacts: { id: number; name?: string | null }[];
};

export type Opportunity = {
  id: number;
  type: "factoring" | "reverse_factoring" | "credit_insurance";
  clients: OpportunityClient[];
  partners: OpportunityPartner[];
  createdAt: string;
};
