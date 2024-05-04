import { test, expect } from "@playwright/test";
import {
  generateFirstName,
  generateLastName,
} from "../helpers/name-generator.js";
import { ApiCreateNewUser } from "../helpers/api-requests.js";

const nanoid = String(Date.now());

test.beforeEach(async ({ page }) => {
  await page.goto("/sign-up");
});

test.describe("Sign Up", () => {
  test("should be successful", async ({ page }) => {
    await page.getByLabel("First Name").fill(generateFirstName());
    await page.getByLabel("Last Name").fill(generateLastName());
    await page.getByLabel("Email").fill(`test${nanoid + 1}@example.com`);
    await page.getByLabel("Password", { exact: true }).fill(nanoid);
    const apiUserCreated = page.waitForResponse((request) =>
      request.url().endsWith("/auth/email/register")
    );
    await page.getByTestId("sign-up-submit").click();
    await apiUserCreated;
    await expect(page).not.toHaveURL(/\/sign-up$/);
  });

  test("should fail with existing email", async ({ page }) => {
    const email = `test${nanoid + 2}@example.com`;
    const firstName = generateFirstName();
    const lastName = generateLastName();
    await ApiCreateNewUser(email, nanoid, firstName, lastName);
    await page.getByLabel("First Name").fill(generateFirstName());
    await page.getByLabel("Last Name").fill(generateLastName());
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(nanoid);
    await page.getByTestId("sign-up-submit").click();
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("should show validation errors for required fields", async ({
    page,
  }) => {
    await page.click('[data-testid="sign-up-submit"]');
    await expect(page.getByTestId("first-name-error")).toBeVisible();
    await expect(page.getByTestId("last-name-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("password-error")).toBeVisible();

    await page.getByLabel("First Name").fill(generateFirstName());
    await expect(page.getByTestId("first-name-error")).not.toBeVisible();

    await page.getByLabel("Last Name").fill(generateLastName());
    await expect(page.getByTestId("last-name-error")).not.toBeVisible();

    await page.getByLabel("Email").fill(`test${nanoid + 3}@example.com`);
    await expect(page.getByTestId("email-error")).not.toBeVisible();

    await page.getByLabel("Password", { exact: true }).fill(nanoid);
    await expect(page.getByTestId("password-error")).not.toBeVisible();

    const apiUserCreated = page.waitForResponse((request) =>
      request.url().endsWith("/auth/email/register")
    );
    await page.getByTestId("sign-up-submit").click();
    await apiUserCreated;
    await expect(page).not.toHaveURL(/\/sign-up$/);
  });

  test("should show validation errors for password field", async ({ page }) => {
    await page.getByLabel("First Name").fill(generateFirstName());
    await page.getByLabel("Last Name").fill(generateLastName());
    await page.getByLabel("Email").fill(`test${nanoid + 4}@example.com`);

    await page.getByLabel("Password", { exact: true }).fill("p");
    await page.getByTestId("sign-up-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();

    await page.getByLabel("Password", { exact: true }).fill("passw");
    await expect(page.getByTestId("password-error")).toBeVisible();

    await page.getByLabel("Password", { exact: true }).fill("passw1");
    await expect(page.getByTestId("password-error")).not.toBeVisible();

    await page.getByLabel("Password", { exact: true }).fill("passw");
    await expect(page.getByTestId("password-error")).toBeVisible();
  });
});
