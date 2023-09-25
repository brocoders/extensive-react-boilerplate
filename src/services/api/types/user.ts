import { FileEntity } from "./file-entity";

export enum UserProviderEnum {
  EMAIL = "email",
  GOOGLE = "google",
}

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  photo?: FileEntity;
  provider?: UserProviderEnum;
  socialId?: string;
};
