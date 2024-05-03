import { test, expect } from "@playwright/test";
import {
  generateFirstName,
  generateLastName,
} from "../helpers/name-generator.js";
import { APIcreateNewUser, UIlogin } from "../helpers/api-requests.js";
import path from "path";

let nanoid: string;
let email: string;
let password: string;
let firstName: string;
let lastName: string;
let newPassword: string;

test.beforeEach(async ({ page }) => {
  await page.goto("/sign-in");
  nanoid = String(Date.now());
  email = `test${nanoid}@example.com`;
  password = nanoid;
  firstName = generateFirstName();
  lastName = generateLastName();

  await APIcreateNewUser(email, password, firstName, lastName);
  await UIlogin(email, password, page);
});

test("should be successful open page and check data is displayed", async ({
  page,
}) => {
  await page.getByTestId("profile-menu-item").click();
  await page.getByTestId("user-profile").click();
  await page.waitForURL(/\/profile/);
  await expect(page.getByTestId("user-name")).toHaveText(
    firstName + " " + lastName
  );
  await expect(page.getByTestId("user-email")).toHaveText(email);
  await page.getByTestId("edit-profile").click();
  await page.waitForURL(/\/profile\/edit/);
  await expect(page.getByLabel("First Name")).toHaveValue(firstName);
  await expect(page.getByLabel("Last Name")).toHaveValue(lastName);
});

test("should be successful update user data", async ({ page }) => {
  await page.goto("/profile/edit");
  await page.getByLabel("First Name").fill("James");
  await expect(page.getByLabel("First Name")).toHaveValue("James");
  await page.getByLabel("Last Name").fill("Bond");
  await expect(page.getByLabel("Last Name")).toHaveValue("Bond");
  const apiProfileUpdate = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/me") && response.status() === 200
  );
  await page.getByTestId("save-profile").click();
  await apiProfileUpdate;

  await page.goto("/");
  await page.getByTestId("profile-menu-item").click();
  await page.getByTestId("user-profile").click();
  await page.waitForURL(/\/profile/);
  await expect(page.getByTestId("user-name")).toHaveText("James Bond");
  await expect(page.getByTestId("user-email")).toHaveText(email);
  await page.getByTestId("edit-profile").click();
  await page.waitForURL(/\/profile\/edit/);
  await expect(page.getByLabel("First Name")).toHaveValue("James");
  await expect(page.getByLabel("Last Name")).toHaveValue("Bond");
});

test("should be successful upload avatar", async ({ page }) => {
  await page.goto("/profile/edit");
  const apiImageUpload = page.waitForResponse(
    (response) =>
      response.url().endsWith("/files/upload") && response.status() === 201
  );
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "Select an image" }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(
    path.join(__dirname, "../helpers/profileImage.jpg")
  );
  await apiImageUpload;

  const apiProfileUpdate = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/me") && response.status() === 200
  );
  await page.getByTestId("save-profile").click();
  await apiProfileUpdate;
  await page.getByTestId("cancel-edit-profile").click();
  await expect(page.getByTestId("user-email")).toHaveText(email);
  await expect(page.getByTestId("user-icon").getByRole("img")).toBeVisible();
  await expect(page.getByTestId("user-icon").getByRole("img")).toHaveAttribute(
    "src"
  );
});

test("should be successful show leave page modal on unsaved changes", async ({
  page,
}) => {
  await page.goto("/profile/edit");
  await page.getByLabel("First Name").fill("James");
  await page.getByTestId("cancel-edit-profile").click();
  await expect(page.getByTestId("want-to-leave-modal")).toBeVisible();
  await page.getByTestId("stay").click();

  await expect(page.getByTestId("want-to-leave-modal")).not.toBeVisible();
  await expect(page).toHaveURL(/\/profile\/edit/);
  await expect(page.getByLabel("First Name")).toHaveValue("James");

  await page.getByTestId("cancel-edit-profile").click();
  await expect(page.getByTestId("want-to-leave-modal")).toBeVisible();
  await page.getByTestId("leave").click();
  await expect(page).toHaveURL(/\/profile/);
  await expect(page.getByTestId("user-name")).toHaveText(
    firstName + " " + lastName
  );
});

test("should be successful change user password", async ({ page }) => {
  newPassword = "password1";
  await page.goto("/profile/edit");
  await page.getByLabel("Old Password").fill(password);
  await page.getByLabel("New Password").fill(newPassword);
  await page.getByLabel("Password confirmation").fill(newPassword);
  const apiPasswordUpdate = page.waitForResponse(
    (response) =>
      response.url().endsWith("api/v1/auth/me") && response.status() === 200
  );
  await page.getByTestId("save-password").click();
  await apiPasswordUpdate;

  await page.getByTestId("profile-menu-item").click();
  const apiProfileUpdate = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/logout") && response.status() === 204
  );
  await page.getByTestId("logout-menu-item").click();
  await apiProfileUpdate;

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  const apiUserLoginFailed = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/email/login") && response.status() === 422
  );
  await page.getByTestId("sign-in-submit").click();
  await apiUserLoginFailed;
  await expect(page.getByTestId("password-error")).toBeVisible();

  await page.getByLabel("Password", { exact: true }).fill(newPassword);
  const apiUserLoggedIn = page.waitForResponse(
    (response) =>
      response.url().endsWith("auth/email/login") && response.status() === 200
  );
  await page.getByTestId("sign-in-submit").click();
  await apiUserLoggedIn;
  await expect(page).not.toHaveURL(/\/sign-in/);
});

test("should be successful with validations for password", async ({ page }) => {
  newPassword = "password1";
  await page.goto("/profile/edit");
  await page.getByTestId("save-password").click();
  await expect(page.getByTestId("old-password-error")).toBeVisible();
  await expect(page.getByTestId("new-password-error")).toBeVisible();
  await expect(page.getByTestId("password-confirmation-error")).toBeVisible();

  await page.getByLabel("Old Password").fill("incorrectpassword");
  await expect(page.getByTestId("old-password-error")).not.toBeVisible();

  await page.getByLabel("New Password").fill("passw");
  await expect(page.getByTestId("new-password-error")).toBeVisible();
  await page.getByLabel("New Password").fill(newPassword);
  await expect(page.getByTestId("new-password-error")).not.toBeVisible();

  await page.getByLabel("Password confirmation").fill(newPassword);
  await expect(
    page.getByTestId("password-confirmation-error")
  ).not.toBeVisible();
  await page.getByLabel("Password confirmation").fill("different password");
  await expect(page.getByTestId("password-confirmation-error")).toBeVisible();
  await page.getByLabel("Password confirmation").fill(newPassword);
  await expect(
    page.getByTestId("password-confirmation-error")
  ).not.toBeVisible();

  const apiPasswordUpdateFailed = page.waitForResponse(
    (response) =>
      response.url().endsWith("api/v1/auth/me") && response.status() === 422
  );
  await page.getByTestId("save-password").click();
  await apiPasswordUpdateFailed;
  await expect(page.getByTestId("old-password-error")).toBeVisible();

  await page.getByLabel("Old Password").fill(password);
  await expect(page.getByTestId("old-password-error")).not.toBeVisible();

  const apiPasswordUpdate = page.waitForResponse(
    (response) =>
      response.url().endsWith("api/v1/auth/me") && response.status() === 200
  );
  await page.getByTestId("save-password").click();
  await apiPasswordUpdate;
});
