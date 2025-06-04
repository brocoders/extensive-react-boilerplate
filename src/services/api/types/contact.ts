export interface Contact {
  id?: number;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  birthdate?: string;
  job: string;
  companies: { id: number; name: string }[];
}

export type ContactFormData = Omit<Contact, "id">;
