import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { apiCreateNewUser } from "../helpers/api-requests.js";
import { getLatestEmail } from "../helpers/email.js";

test.describe("Forgot Password page with form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("should display forgot password link and navigate to the reset password page", async ({
    page,
  }) => {
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
    await page.getByTestId("email").locator("input").fill("invalidemail");
    await page.getByTestId("send-email").click();
    await expect(page.getByTestId("email-error")).toBeVisible();

    await page
      .getByTestId("email")
      .locator("input")
      .fill("someemail@email.com");
    await expect(page.getByTestId("email-error")).not.toBeVisible();
  });

  test("should handle errors for an invalid email", async ({ page }) => {
    await page.goto("/forgot-password");
    await page
      .getByTestId("email")
      .locator("input")
      .fill("nonexistentemail@mail.com");
    await page.getByTestId("send-email").click();

    await expect(page.getByTestId("email-error")).toBeVisible();
  });
});

test.describe("Change password", () => {
  let email: string;
  let password: string;
  let newPassword: string;

  test.beforeEach(async ({ page }) => {
    email = faker.internet.email({
      provider: "example.com",
    });
    password = faker.internet.password();
    newPassword = "p1ssword";
    await apiCreateNewUser(
      email,
      password,
      faker.person.firstName(),
      faker.person.lastName()
    );
    await page.goto("/forgot-password");
    await page.getByTestId("email").locator("input").fill(email);
    await page.getByTestId("send-email").click();
    await expect(
      page.locator(".Toastify > .Toastify__toast-container")
    ).toBeVisible();
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
    await page.getByTestId("password").locator("input").fill(newPassword);
    await expect(page.getByTestId("password-error")).not.toBeVisible();
    await page
      .getByTestId("password-confirmation")
      .locator("input")
      .fill("mismatchpassword");
    await expect(page.getByTestId("password-confirmation-error")).toBeVisible();
    await page
      .getByTestId("password-confirmation")
      .locator("input")
      .fill(newPassword);
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
    await page.getByTestId("password").locator("input").fill(newPassword);
    await page
      .getByTestId("password-confirmation")
      .locator("input")
      .fill(newPassword);
    await page.getByTestId("set-password").click();
    await expect(page).toHaveURL(/\/sign-in/);

    await page.getByTestId("email").locator("input").fill(email);
    await page.getByTestId("password").locator("input").fill(password);
    await page.getByTestId("sign-in-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();

    await page.getByTestId("password").locator("input").fill(newPassword);
    await page.getByTestId("sign-in-submit").click();
    await expect(page).not.toHaveURL(/\/sign-in/);
  });
});
