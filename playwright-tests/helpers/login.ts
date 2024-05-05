import { Page } from "@playwright/test";

export async function login(email: string, password: string, page: Page) {
  await page.getByTestId("email").locator("input").fill(email);
  await page.getByTestId("password").locator("input").fill(password);
  const apiUserLoggedIn = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/email/login") && response.status() === 200
  );
  await page.getByTestId("sign-in-submit").click();
  await apiUserLoggedIn;
}
