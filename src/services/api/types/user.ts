import { FileEntity } from "./file-entity";
import { Role } from "./role";

export enum UserProviderEnum {
  EMAIL = "email",
  GOOGLE = "google",
}

export type User = {
  id: string;
  email: string;
  firstName?: string;
  username?: string;
  phone?: string;
  lastName?: string;
  photo?: FileEntity;
  provider?: UserProviderEnum;
  socialId?: string;
  role?: Role;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roles?: any;
};
