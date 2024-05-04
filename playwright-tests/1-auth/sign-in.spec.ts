import { test, expect } from "@playwright/test";
import {
  generateFirstName,
  generateLastName,
} from "../helpers/name-generator.js";
import { ApiCreateNewUser } from "../helpers/api-requests.js";

let nanoid: string;
let email: string;
let password: string;

test.describe("Sign In", () => {
  test.beforeEach(async ({ page }) => {
    nanoid = String(Date.now());
    email = `test${nanoid}@example.com`;
    password = nanoid;
    await ApiCreateNewUser(
      email,
      password,
      generateFirstName(),
      generateLastName()
    );
    await page.goto("/sign-in");
  });

  test("should be successful", async ({ page }) => {
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    const apiUserLoggedIn = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/email/login") && response.status() === 200
    );
    await page.getByTestId("sign-in-submit").click();
    await apiUserLoggedIn;
    await expect(page.getByTestId("profile-menu-item")).toBeVisible();
    await expect(
      page.getByText(
        "Welcome to the reactjs-boilerplate example app. Full documentation can be found "
      )
    ).toBeVisible();
  });

  test("should be successful with redirect", async ({ page }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/sign-in/);
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    const apiUserLoggedIn = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/email/login") && response.status() === 200
    );
    await page.getByTestId("sign-in-submit").click();
    await apiUserLoggedIn;
    await expect(page.getByTestId("user-email")).toBeVisible();
    await expect(page.getByTestId("user-name")).toBeVisible();
    await expect(page.getByTestId("user-icon")).toBeVisible();
  });

  test("should fail if password is incorrect", async ({ page }) => {
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill("password1");
    const apiUserLoggedIn = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/email/login") && response.status() === 422
    );
    await page.getByTestId("sign-in-submit").click();
    await apiUserLoggedIn;
    await expect(page.getByTestId("password-error")).toBeVisible();
  });
});

test.describe("form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });
  test("should be display error messages if required fields are empty", async ({
    page,
  }) => {
    await page.getByTestId("sign-in-submit").click();
    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("password-error")).toBeVisible();
    await page.getByLabel("Email").fill("useremail@gmail.com");
    await expect(page.getByTestId("email-error")).not.toBeVisible();
    await page.getByTestId("sign-in-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();
    await page.getByLabel("Password", { exact: true }).fill("password1");
    await expect(page.getByTestId("password-error")).not.toBeVisible();
    await page.getByLabel("Email").fill("");
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("should be display error message if email isn't registered in the system", async ({
    page,
  }) => {
    await page.getByLabel("Email").fill("notexistedemail@gmail.com");
    await page.getByLabel("Password", { exact: true }).fill("password1");
    const apiUserLoggedIn = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/email/login") && response.status() === 422
    );
    await page.getByTestId("sign-in-submit").click();
    await apiUserLoggedIn;
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("should redirect from sing in to sign up page", async ({ page }) => {
    await page.getByTestId("create-account").click();
    await expect(page).toHaveURL(/\/sign-up$/);
  });

  test("should navigated to Forgot Password page", async ({ page }) => {
    await page.getByTestId("forgot-password").click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });
});
