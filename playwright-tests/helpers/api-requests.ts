import { Page, expect, request } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export async function APIcreateNewUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(
    apiURL + "/v1/auth/email/register",
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

export async function UIlogin(email: string, password: string, page: Page) {
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  const apiUserLoggedIn = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/email/login") && response.status() === 200
  );
  await page.getByTestId("sign-in-submit").click();
  await apiUserLoggedIn;
}
