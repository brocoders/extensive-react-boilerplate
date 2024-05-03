import { test, expect } from "@playwright/test";
import {
  generateFirstName,
  generateLastName,
} from "../helpers/name-generator.js";
import { APIcreateNewUser } from "../helpers/api-requests.js";
import { getLatestEmail } from "../helpers/email.js";

let nanoid: string;
let email: string;
let password: string;
let newPassword: string;

test.describe("Forgot Password page with form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("should display forgot password link and navigate to the reset password page", async ({
    page,
  }) => {
    await expect(page.getByTestId("forgot-password")).toBeVisible();
    await page.getByTestId("forgot-password").click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });

  test("should show validation messages for invalid inputs", async ({
    page,
  }) => {
    await page.goto("/forgot-password");
    // Test submitting without entering an email
    await page.getByTestId("send-email").click();
    await expect(page.getByTestId("email-error")).toBeVisible();

    // Test submitting with an invalid email
    await page.getByLabel("Email").fill("invalidemail");
    await page.getByTestId("send-email").click();
    await expect(page.getByTestId("email-error")).toBeVisible();

    await page.getByLabel("Email").fill("someemail@email.com");
    await expect(page.getByTestId("email-error")).not.toBeVisible();
  });

  test("should handle errors for an invalid email", async ({ page }) => {
    await page.goto("/forgot-password");
    await page.getByLabel("Email").fill("nonexistentemail@mail.com");
    await page.getByTestId("send-email").click();
    const apiEmailSent = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/forgot/password") &&
        response.status() === 422
    );
    await page.getByTestId("send-email").click();
    await apiEmailSent;
    await expect(page.getByTestId("email-error")).toBeVisible();
  });
});

test.describe("change password", () => {
  test.beforeEach(async ({ page }) => {
    nanoid = String(Date.now());
    email = `test${nanoid}@example.com`;
    password = nanoid;
    newPassword = "p1ssword";
    await APIcreateNewUser(
      email,
      password,
      generateFirstName(),
      generateLastName()
    );
    await page.goto("/forgot-password");
    await page.getByLabel("Email").fill(email);
    const apiEmailSent = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/forgot/password") &&
        response.status() === 204
    );
    await page.getByTestId("send-email").click();
    await apiEmailSent;
    await expect(page.locator("#notistack-snackbar")).toBeVisible();
  });

  test("should send a password reset email and navigate to reset password page", async ({
    page,
  }) => {
    const resultEmail = await getLatestEmail({ email });
    const url = resultEmail.text?.split(" ")[0];
    if (url) {
      page.goto(url);
    }
    await page.waitForURL(/\/password-change/);
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByTestId("password-confirmation")).toBeVisible();
  });

  test("should handle errors for invalid password", async ({ page }) => {
    const resultEmail = await getLatestEmail({ email });
    const url = resultEmail.text?.split(" ")[0];
    if (url) {
      page.goto(url);
    }
    await page.waitForURL(/\/password-change/);

    await page.getByTestId("set-password").click();
    await expect(page.getByTestId("password-error")).toBeVisible();
    await expect(page.getByTestId("password-confirmation-error")).toBeVisible();
    await page.getByLabel("Password", { exact: true }).fill(newPassword);
    await expect(page.getByTestId("password-error")).not.toBeVisible();
    await page.getByLabel("Password confirmation").fill("mismatchpassword");
    await expect(page.getByTestId("password-confirmation-error")).toBeVisible();
    await page.getByLabel("Password confirmation").fill(newPassword);
    await expect(
      page.getByTestId("password-confirmation-error")
    ).not.toBeVisible();
  });

  test("should reset password successfully", async ({ page }) => {
    const resultEmail = await getLatestEmail({ email });
    const url = resultEmail.text?.split(" ")[0];
    if (url) {
      page.goto(url);
    }
    await page.waitForURL(/\/password-change/);
    await page.getByLabel("Password", { exact: true }).fill(newPassword);
    await page.getByLabel("Password confirmation").fill(newPassword);
    const apiPasswordReset = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/reset/password") &&
        response.status() === 204
    );
    await page.getByTestId("set-password").click();
    await apiPasswordReset;
    await expect(page.locator("#notistack-snackbar")).toBeVisible();
    await expect(page).toHaveURL(/\/sign-in/);

    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    const apiLogInFailed = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/email/login") && response.status() === 422
    );
    await page.getByTestId("sign-in-submit").click();
    await apiLogInFailed;

    await page.getByLabel("Password", { exact: true }).fill(newPassword);
    const apiUserLoggedIn = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/email/login") && response.status() === 200
    );
    await page.getByTestId("sign-in-submit").click();
    await apiUserLoggedIn;
  });
});
