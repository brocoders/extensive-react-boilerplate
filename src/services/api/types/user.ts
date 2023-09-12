import { FileEntity } from "./file-entity";

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  photo?: FileEntity;
};
