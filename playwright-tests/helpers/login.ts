import type { Page } from "@playwright/test";

export async function login(
  email: string,
  password: string,
  page: Page
): Promise<void> {
  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  const apiUserLoggedIn = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/email/login") && response.status() === 200
  );
  await page.getByTestId("sign-in-submit").click();
  await apiUserLoggedIn;

  await page.waitForURL((url) => !url.pathname.endsWith("/sign-in"));
}
