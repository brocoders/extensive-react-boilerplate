import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { apiCreateNewUser } from "../helpers/api-requests.js";

test.describe("Sign In", () => {
  let email: string;
  let password: string;

  test.beforeEach(async ({ page }) => {
    email = faker.internet.email({
      provider: "example.com",
    });
    password = faker.internet.password();
    await apiCreateNewUser(
      email,
      password,
      faker.person.firstName(),
      faker.person.lastName()
    );
    await page.goto("/sign-in");
  });

  test("should be successful", async ({ page }) => {
    await page.getByTestId("email").locator("input").fill(email);
    await page.getByTestId("password").locator("input").fill(password);
    await page.getByTestId("sign-in-submit").click();

    await expect(page.getByTestId("profile-menu-item")).toBeVisible();
    await expect(page.getByTestId("home-title")).toBeVisible();
  });

  test("should be successful with redirect", async ({ page }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/sign-in/);

    await page.getByTestId("email").locator("input").fill(email);
    await page.getByTestId("password").locator("input").fill(password);
    await page.getByTestId("sign-in-submit").click();

    await expect(page.getByTestId("user-email")).toBeVisible();
    await expect(page.getByTestId("user-name")).toBeVisible();
    await expect(page.getByTestId("user-icon")).toBeVisible();
  });

  test("should fail if password is incorrect", async ({ page }) => {
    await page.getByTestId("email").locator("input").fill(email);
    await page.getByTestId("password").locator("input").fill("password1");
    await page.getByTestId("sign-in-submit").click();

    await expect(page.getByTestId("password-error")).toBeVisible();
  });
});

test.describe("Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("should be display error messages if required fields are empty", async ({
    page,
  }) => {
    await page.getByTestId("sign-in-submit").click();
    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("password-error")).toBeVisible();
    await page
      .getByTestId("email")
      .locator("input")
      .fill("useremail@gmail.com");
    await expect(page.getByTestId("email-error")).not.toBeVisible();
    await page.getByTestId("sign-in-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();
    await page.getByTestId("password").locator("input").fill("password1");
    await expect(page.getByTestId("password-error")).not.toBeVisible();
    await page.getByTestId("email").locator("input").fill("");
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("should be display error message if email isn't registered in the system", async ({
    page,
  }) => {
    await page
      .getByTestId("email")
      .locator("input")
      .fill("notexistedemail@gmail.com");
    await page.getByTestId("password").locator("input").fill("password1");
    await page.getByTestId("sign-in-submit").click();

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
