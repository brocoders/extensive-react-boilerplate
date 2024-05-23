import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { apiCreateNewUser } from "../helpers/api-requests.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/sign-up");
});

test.describe("Sign Up", () => {
  test("should be successful", async ({ page }) => {
    await page
      .getByTestId("first-name")
      .locator("input")
      .fill(faker.person.firstName());
    await page
      .getByTestId("last-name")
      .locator("input")
      .fill(faker.person.lastName());
    await page
      .getByTestId("email")
      .locator("input")
      .fill(
        faker.internet.email({
          provider: "example.com",
        })
      );
    await page
      .getByTestId("password")
      .locator("input")
      .fill(faker.internet.password());

    await page
      .getByTestId("privacy-policy")
      .locator("input[type=checkbox]")
      .check();

    await page.getByTestId("sign-up-submit").click();

    await expect(page).not.toHaveURL(/\/sign-up$/);
  });

  test("should fail with existing email", async ({ page }) => {
    const email = faker.internet.email({
      provider: "example.com",
    });
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const password = faker.internet.password();
    await apiCreateNewUser(email, password, firstName, lastName);
    await page
      .getByTestId("first-name")
      .locator("input")
      .fill(faker.person.firstName());
    await page
      .getByTestId("last-name")
      .locator("input")
      .fill(faker.person.lastName());
    await page.getByTestId("email").locator("input").fill(email);
    await page.getByTestId("password").locator("input").fill(password);
    await page
      .getByTestId("privacy-policy")
      .locator("input[type=checkbox]")
      .check();
    await page.getByTestId("sign-up-submit").click();
    await expect(page.getByTestId("email-error")).toBeVisible();
  });

  test("should show validation errors for required fields", async ({
    page,
  }) => {
    await page.getByTestId("sign-up-submit").click();
    await expect(page.getByTestId("first-name-error")).toBeVisible();
    await expect(page.getByTestId("last-name-error")).toBeVisible();
    await expect(page.getByTestId("email-error")).toBeVisible();
    await expect(page.getByTestId("password-error")).toBeVisible();
    await expect(page.getByTestId("privacy-error")).toBeVisible();

    await page
      .getByTestId("first-name")
      .locator("input")
      .fill(faker.person.firstName());
    await expect(page.getByTestId("first-name-error")).not.toBeVisible();

    await page
      .getByTestId("last-name")
      .locator("input")
      .fill(faker.person.lastName());
    await expect(page.getByTestId("last-name-error")).not.toBeVisible();

    await page
      .getByTestId("email")
      .locator("input")
      .fill(
        faker.internet.email({
          provider: "example.com",
        })
      );
    await expect(page.getByTestId("email-error")).not.toBeVisible();

    await page
      .getByTestId("password")
      .locator("input")
      .fill(faker.internet.password());
    await expect(page.getByTestId("password-error")).not.toBeVisible();

    await page
      .getByTestId("privacy-policy")
      .locator("input[type=checkbox]")
      .check();
    await expect(page.getByTestId("privacy-error")).not.toBeVisible();

    await page.getByTestId("sign-up-submit").click();

    await expect(page).not.toHaveURL(/\/sign-up$/);
  });

  test("should show validation errors for password field", async ({ page }) => {
    await page
      .getByTestId("first-name")
      .locator("input")
      .fill(faker.person.firstName());
    await page
      .getByTestId("last-name")
      .locator("input")
      .fill(faker.person.lastName());
    await page
      .getByTestId("email")
      .locator("input")
      .fill(
        faker.internet.email({
          provider: "example.com",
        })
      );

    await page.getByTestId("password").locator("input").fill("p");
    await page.getByTestId("sign-up-submit").click();
    await expect(page.getByTestId("password-error")).toBeVisible();

    await page.getByTestId("password").locator("input").fill("passw");
    await expect(page.getByTestId("password-error")).toBeVisible();

    await page.getByTestId("password").locator("input").fill("passw1");
    await expect(page.getByTestId("password-error")).not.toBeVisible();

    await page.getByTestId("password").locator("input").fill("passw");
    await expect(page.getByTestId("password-error")).toBeVisible();
  });
});
