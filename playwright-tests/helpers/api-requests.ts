import { expect, request } from "@playwright/test";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiCreateNewUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(
    apiUrl + "/v1/auth/email/register",
    {
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    }
  );

  expect(response.status()).toBe(204);
}
