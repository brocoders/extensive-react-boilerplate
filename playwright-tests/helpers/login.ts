import { expect, request, type Page } from "@playwright/test";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function login(
  email: string,
  password: string,
  page: Page
): Promise<void> {
  const ctx = await request.newContext();
  const res = await ctx.post(`${apiUrl}/v1/auth/email/login`, {
    data: { email, password },
  });
  expect(res.ok()).toBeTruthy();
  const { token, refreshToken, tokenExpires } = await res.json();

  await page.context().addCookies([
    {
      name: "auth-token-data",
      value: encodeURIComponent(
        JSON.stringify({ token, refreshToken, tokenExpires })
      ),
      url: "http://localhost:3000",
    },
  ]);

  await page.goto("/");
  await expect(page.getByTestId("profile-menu-item")).toBeVisible();
}
