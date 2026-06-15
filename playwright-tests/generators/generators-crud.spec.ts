import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { loginAsAdmin } from "./helpers/admin-login";

/**
 * Phase 2 CRUD spec. Drives the generated Tag admin pages through a real
 * create → read → edit → delete cycle against the sister NestJS backend
 * (booted by run-crud.sh on host:3001 before this spec runs).
 *
 * Tag is the simplest entity (single `name: string` field) and is the
 * happy-path proof for the entire generator + backend pipeline. Richer
 * entities (BlogComment, Article with refs/files) can be added once this
 * MVP is stable.
 */

test.describe.configure({ mode: "serial" });

test.describe("Generators CRUD — Tag", () => {
  let createdName: string;
  let updatedName: string;

  test.beforeAll(() => {
    createdName = `tag-${faker.string.alphanumeric(8).toLowerCase()}`;
    updatedName = `${createdName}-edited`;
  });

  test("admin can log in and reach the tag list", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/en/admin-panel/tags");
    await expect(page.getByTestId("index-page-title")).toBeVisible();
    await expect(page.getByTestId("add-button")).toBeVisible();
  });

  test("creates a new tag", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/en/admin-panel/tags");
    await page.getByTestId("add-button").click();

    await expect(page).toHaveURL(/\/admin-panel\/tags\/create$/);
    await page.getByTestId("name").fill(createdName);

    const apiCreated = page.waitForResponse(
      (response) =>
        response.url().includes("/v1/tags") &&
        response.request().method() === "POST" &&
        response.status() === 201
    );
    await page.getByTestId("submit-button").click();
    await apiCreated;

    await expect(page).toHaveURL(/\/admin-panel\/tags$/);
    await expect(page.getByText(createdName).first()).toBeVisible();
  });

  test("edits the created tag", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/en/admin-panel/tags");
    await expect(page.getByText(createdName).first()).toBeVisible();

    const row = page.getByRole("row").filter({ hasText: createdName }).first();
    await row.getByTestId("edit-button").click();

    await expect(page).toHaveURL(/\/admin-panel\/tags\/edit\//);
    const input = page.getByTestId("name");
    await input.fill("");
    await input.fill(updatedName);

    const apiEdited = page.waitForResponse(
      (response) =>
        response.url().includes("/v1/tags/") &&
        response.request().method() === "PATCH" &&
        response.status() === 200
    );
    await page.getByTestId("submit-button").click();
    await apiEdited;

    await expect(page).toHaveURL(/\/admin-panel\/tags$/);
    await expect(page.getByText(updatedName).first()).toBeVisible();
  });

  test("deletes the tag", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/en/admin-panel/tags");
    await expect(page.getByText(updatedName).first()).toBeVisible();

    const row = page.getByRole("row").filter({ hasText: updatedName }).first();
    await row.getByTestId("actions-button").click();
    const deleteItem = page.getByTestId("delete-button");
    await expect(deleteItem).toBeVisible();
    await deleteItem.click({ force: true });

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 10000 });
    const yesButton = dialog.getByRole("button", { name: "Yes" });
    await expect(yesButton).toBeVisible();

    const apiDeleted = page.waitForResponse(
      (response) =>
        response.url().includes("/v1/tags/") &&
        response.request().method() === "DELETE" &&
        response.status() < 300
    );
    await yesButton.click();
    await apiDeleted;

    await expect(page.getByText(updatedName)).toHaveCount(0);
  });
});
