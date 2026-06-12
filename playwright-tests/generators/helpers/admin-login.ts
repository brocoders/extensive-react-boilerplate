import type { Page } from "@playwright/test";

const ADMIN_EMAIL =
  process.env.GENERATOR_E2E_ADMIN_EMAIL ?? "admin@example.com";
const ADMIN_PASSWORD = process.env.GENERATOR_E2E_ADMIN_PASSWORD ?? "secret";

export const loginAsAdmin = async (page: Page): Promise<void> => {
  await page.goto("/en/sign-in");
  await page.getByTestId("email").locator("input").fill(ADMIN_EMAIL);
  await page.getByTestId("password").locator("input").fill(ADMIN_PASSWORD);
  const apiLoggedIn = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/email/login") && response.status() === 200
  );
  await page.getByTestId("sign-in-submit").click();
  await apiLoggedIn;
};
