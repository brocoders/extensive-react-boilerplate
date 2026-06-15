import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { apiCreateNewUser } from "../helpers/api-requests.js";
import { login } from "../helpers/login.js";
import path from "path";

let email: string;
let password: string;
let firstName: string;
let lastName: string;
let newPassword: string;

test.beforeEach(async ({ page }) => {
  await page.goto("/sign-in");
  email = faker.internet.email({
    provider: "example.com",
  });
  password = faker.internet.password();
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();

  await apiCreateNewUser(email, password, firstName, lastName);
  await login(email, password, page);
});

test.describe("User Profile", () => {
  test("should be successful open page and check data is displayed", async ({
    page,
  }) => {
    await page.getByTestId("profile-menu-item").click();
    await page.getByTestId("user-profile").click();
    await page.waitForURL(/\/profile/);
    await expect(page.getByTestId("user-name")).toHaveText(
      `${firstName} ${lastName}`
    );
    await expect(page.getByTestId("user-email")).toHaveText(email, {
      ignoreCase: true,
    });
    await page.getByTestId("edit-profile").click();
    await page.waitForURL(/\/profile\/edit/);
    await expect(page.getByTestId("first-name")).toHaveValue(firstName);
    await expect(page.getByTestId("last-name")).toHaveValue(lastName);
  });

  test("should be successful update user data", async ({ page }) => {
    await page.goto("/profile/edit");
    await page.getByTestId("first-name").fill("James");
    await expect(page.getByTestId("first-name")).toHaveValue("James");
    await page.getByTestId("last-name").fill("Bond");
    await expect(page.getByTestId("last-name")).toHaveValue("Bond");
    await page.getByTestId("save-profile").click();
    await page.waitForSelector(".Toastify > .Toastify__toast-container");

    await page.goto("/");
    await page.getByTestId("profile-menu-item").click();
    await page.getByTestId("user-profile").click();
    await page.waitForURL(/\/profile/);
    await expect(page.getByTestId("user-name")).toHaveText("James Bond");
    await expect(page.getByTestId("user-email")).toHaveText(email, {
      ignoreCase: true,
    });
    await page.getByTestId("edit-profile").click();
    await page.waitForURL(/\/profile\/edit/);
    await expect(page.getByTestId("first-name")).toHaveValue("James");
    await expect(page.getByTestId("last-name")).toHaveValue("Bond");
  });

  test("should be successful upload avatar", async ({ page }) => {
    await page.goto("/profile/edit");
    const apiImageUpload = page.waitForResponse(
      (response) =>
        response.url().endsWith("/files/upload") && response.status() === 201
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByTestId("photo").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      path.join(__dirname, "../helpers/profileImage.jpg")
    );
    await apiImageUpload;
    await page.getByTestId("save-profile").click();
    await page.waitForSelector(".Toastify > .Toastify__toast-container");
    await page.getByTestId("cancel-edit-profile").click();
    await expect(page.getByTestId("user-email")).toHaveText(email, {
      ignoreCase: true,
    });
    await expect(page.getByTestId("user-icon").getByRole("img")).toBeVisible();
    await expect(
      page.getByTestId("user-icon").getByRole("img")
    ).toHaveAttribute("src");
  });

  test("should be successful show leave page modal on unsaved changes", async ({
    page,
  }) => {
    await page.goto("/profile/edit");
    await page.getByTestId("first-name").fill("James");
    await page.getByTestId("cancel-edit-profile").click();
    await expect(page.getByTestId("want-to-leave-modal")).toBeVisible();
    await page.getByTestId("stay").click();

    await expect(page.getByTestId("want-to-leave-modal")).not.toBeVisible();
    await expect(page).toHaveURL(/\/profile\/edit/);
    await expect(page.getByTestId("first-name")).toHaveValue("James");

    await page.getByTestId("cancel-edit-profile").click();
    await expect(page.getByTestId("want-to-leave-modal")).toBeVisible();
    await page.getByTestId("leave").click();
    await expect(page).toHaveURL(/\/profile/);
    await expect(page.getByTestId("user-name")).toHaveText(
      `${firstName} ${lastName}`
    );
  });

  test("should be successful change user password", async ({ page }) => {
    newPassword = "password1";
    await page.goto("/profile/edit");
    await page.getByTestId("old-password").fill(password);
    await page.getByTestId("new-password").fill(newPassword);
    await page.getByTestId("password-confirmation").fill(newPassword);
    await page.getByTestId("save-password").click();
    await page.waitForSelector(".Toastify > .Toastify__toast-container");

    await page.getByTestId("profile-menu-item").click();
    const apiProfileUpdate = page.waitForResponse(
      (response) =>
        response.url().endsWith("auth/logout") && response.status() === 204
    );
    await page.getByTestId("logout-menu-item").click();
    await apiProfileUpdate;

    await page.getByTestId("email").fill(email);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("sign-in-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();

    await page.getByTestId("password").fill(newPassword);
    await page.getByTestId("sign-in-submit").click();
    await expect(page).not.toHaveURL(/\/sign-in/);
  });

  test("should be successful with validations for password", async ({
    page,
  }) => {
    newPassword = "password1";
    await page.goto("/profile/edit");
    await page.getByTestId("save-password").click();
    await expect(page.getByTestId("old-password-error")).toBeVisible();
    await expect(page.getByTestId("new-password-error")).toBeVisible();
    await expect(page.getByTestId("password-confirmation-error")).toBeVisible();

    await page.getByTestId("old-password").fill("incorrectpassword");
    await expect(page.getByTestId("old-password-error")).not.toBeVisible();

    await page.getByTestId("new-password").fill("passw");
    await expect(page.getByTestId("new-password-error")).toBeVisible();
    await page.getByTestId("new-password").fill(newPassword);
    await expect(page.getByTestId("new-password-error")).not.toBeVisible();

    await page.getByTestId("password-confirmation").fill(newPassword);
    await expect(
      page.getByTestId("password-confirmation-error")
    ).not.toBeVisible();
    await page.getByTestId("password-confirmation").fill("different password");
    await expect(page.getByTestId("password-confirmation-error")).toBeVisible();
    await page.getByTestId("password-confirmation").fill(newPassword);
    await expect(
      page.getByTestId("password-confirmation-error")
    ).not.toBeVisible();
    await page.getByTestId("save-password").click();
    await expect(page.getByTestId("old-password-error")).toBeVisible();

    await page.getByTestId("old-password").fill(password);
    await expect(page.getByTestId("old-password-error")).not.toBeVisible();
    await page.getByTestId("save-password").click();
    await page.waitForSelector(".Toastify > .Toastify__toast-container");
  });
});
