import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { apiCreateNewUser } from "../helpers/api-requests.js";
import { login } from "../helpers/login.js";

let email: string;
let password: string;

test.beforeEach(async () => {
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
});

test.describe("Auth robustness", () => {
  test("should render logged out when the auth cookie is corrupted", async ({
    page,
  }) => {
    await page.context().addCookies([
      {
        name: "auth-token-data",
        value: "not-valid-json",
        url: "http://localhost:3000",
      },
    ]);

    await page.goto("/");
    await expect(page.getByTestId("home-title")).toBeVisible();
    await expect(page.getByTestId("profile-menu-item")).not.toBeVisible();
  });

  test("should log out locally even when the logout request fails", async ({
    page,
  }) => {
    await login(email, password, page);

    await page.route("**/auth/logout", (route) => route.abort());

    await page.getByTestId("profile-menu-item").click();
    await page.getByTestId("logout-menu-item").click();

    await expect(page.getByTestId("profile-menu-item")).not.toBeVisible();
    const cookies = await page.context().cookies();
    expect(
      cookies.find((cookie) => cookie.name === "auth-token-data")
    ).toBeUndefined();
  });

  test("should recover from an invalid access token via refresh and retry", async ({
    page,
  }) => {
    await login(email, password, page);

    const cookies = await page.context().cookies();
    const authCookie = cookies.find(
      (cookie) => cookie.name === "auth-token-data"
    );
    expect(authCookie).toBeDefined();
    const tokens = JSON.parse(decodeURIComponent(authCookie!.value));

    // Keep the valid refresh token but corrupt the access token, with a
    // future tokenExpires so only the reactive 401 path can recover.
    await page.context().addCookies([
      {
        name: "auth-token-data",
        value: encodeURIComponent(
          JSON.stringify({
            token: "broken-token",
            refreshToken: tokens.refreshToken,
            tokenExpires: Date.now() + 15 * 60 * 1000,
          })
        ),
        url: "http://localhost:3000",
      },
    ]);

    await page.goto("/profile");
    await expect(page.getByTestId("user-email")).toBeVisible();
  });

  test("should log out other tabs", async ({ page, context }) => {
    await login(email, password, page);

    const secondPage = await context.newPage();
    await secondPage.goto("/");
    await expect(secondPage.getByTestId("profile-menu-item")).toBeVisible();

    await page.getByTestId("profile-menu-item").click();
    await page.getByTestId("logout-menu-item").click();
    await expect(page.getByTestId("profile-menu-item")).not.toBeVisible();

    await expect(secondPage.getByTestId("profile-menu-item")).not.toBeVisible();
  });
});
