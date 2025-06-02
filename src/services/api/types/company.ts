export type CompanyAddress = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export type Company = {
  id: string;
  name: string;
  legalForm: string;
  siren: string;
  siret: string;
  tvaNumber: string;
  creationDate: Date;
  isActive: boolean;
  email: string;
  phone: string;
  website: string;
  addresses: CompanyAddress[];
};
