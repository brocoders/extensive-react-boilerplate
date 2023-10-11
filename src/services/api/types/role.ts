export enum RoleEnum {
  ADMIN = 1,
  USER = 2,
}

export type Role = {
  id: RoleEnum;
  name?: string;
};
