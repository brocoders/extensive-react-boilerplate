import HTTP_CODES_ENUM from "./http-codes";

export type ValidationErrors = {
  status: HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY;
  data: {
    status: HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY;
    errors: Record<string, string>;
  };
};
